import { db } from "./db";
import { employerScores, jobFingerprints } from "@shared/models/auth";
import { eq, sql, and, gte } from "drizzle-orm";
import { normalizeCompany } from "./fingerprint";

export interface EmployerReputationData {
  company: string;
  reputationScore: number;
  totalListings: number;
  repostCount: number;
  avgGhostScore: number;
  highRiskCount: number;
  vaguePayCount: number;
  perpetualHiring: boolean;
  lastUpdated: string | null;
}

function calculateReputationScore(data: {
  totalListings: number;
  repostCount: number;
  avgGhostScore: number;
  highRiskCount: number;
  vaguePayCount: number;
  perpetualHiring: boolean;
}): number {
  let score = 50;

  if (data.totalListings > 0) {
    const repostRate = data.repostCount / data.totalListings;
    if (repostRate > 0.5) score -= 20;
    else if (repostRate > 0.3) score -= 12;
    else if (repostRate > 0.1) score -= 5;
  }

  if (data.avgGhostScore > 70) score -= 20;
  else if (data.avgGhostScore > 50) score -= 12;
  else if (data.avgGhostScore > 30) score -= 5;
  else if (data.avgGhostScore < 20) score += 15;
  else if (data.avgGhostScore < 30) score += 8;

  if (data.totalListings > 0) {
    const highRiskRate = data.highRiskCount / data.totalListings;
    if (highRiskRate > 0.5) score -= 15;
    else if (highRiskRate > 0.2) score -= 8;
  }

  if (data.totalListings > 0) {
    const vaguePayRate = data.vaguePayCount / data.totalListings;
    if (vaguePayRate > 0.7) score -= 10;
    else if (vaguePayRate > 0.4) score -= 5;
  }

  if (data.perpetualHiring) score -= 10;

  return Math.max(0, Math.min(100, Math.round(score)));
}

export async function updateEmployerScore(
  company: string,
  ghostScore: number,
  riskLevel: string,
  hasVaguePay: boolean,
  isRepost: boolean
): Promise<void> {
  const normalized = normalizeCompany(company);
  if (!normalized) return;

  const existing = await db
    .select()
    .from(employerScores)
    .where(eq(employerScores.company, normalized))
    .limit(1);

  if (existing.length === 0) {
    const repScore = calculateReputationScore({
      totalListings: 1,
      repostCount: isRepost ? 1 : 0,
      avgGhostScore: ghostScore,
      highRiskCount: riskLevel === "high" ? 1 : 0,
      vaguePayCount: hasVaguePay ? 1 : 0,
      perpetualHiring: false,
    });

    await db.insert(employerScores).values({
      company: normalized,
      totalListings: 1,
      repostCount: isRepost ? 1 : 0,
      avgGhostScore: ghostScore,
      highRiskCount: riskLevel === "high" ? 1 : 0,
      vaguePayCount: hasVaguePay ? 1 : 0,
      perpetualHiringFlag: false,
      reputationScore: repScore,
      lastUpdated: new Date(),
    });
  } else {
    const current = existing[0];
    const newTotal = current.totalListings + 1;
    const newRepostCount = current.repostCount + (isRepost ? 1 : 0);
    const newAvgScore = ((current.avgGhostScore || 0) * current.totalListings + ghostScore) / newTotal;
    const newHighRisk = current.highRiskCount + (riskLevel === "high" ? 1 : 0);
    const newVaguePay = current.vaguePayCount + (hasVaguePay ? 1 : 0);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentListings = await db
      .select({ count: sql<number>`count(*)` })
      .from(jobFingerprints)
      .where(
        and(
          eq(jobFingerprints.normalizedCompany, normalized),
          gte(jobFingerprints.createdAt, thirtyDaysAgo)
        )
      );

    const perpetualHiring = (recentListings[0]?.count || 0) >= 10;

    const repScore = calculateReputationScore({
      totalListings: newTotal,
      repostCount: newRepostCount,
      avgGhostScore: newAvgScore,
      highRiskCount: newHighRisk,
      vaguePayCount: newVaguePay,
      perpetualHiring,
    });

    await db
      .update(employerScores)
      .set({
        totalListings: newTotal,
        repostCount: newRepostCount,
        avgGhostScore: newAvgScore,
        highRiskCount: newHighRisk,
        vaguePayCount: newVaguePay,
        perpetualHiringFlag: perpetualHiring,
        reputationScore: repScore,
        lastUpdated: new Date(),
      })
      .where(eq(employerScores.company, normalized));
  }
}

export async function getEmployerScore(company: string): Promise<EmployerReputationData | null> {
  const normalized = normalizeCompany(company);
  if (!normalized) return null;

  const results = await db
    .select()
    .from(employerScores)
    .where(eq(employerScores.company, normalized))
    .limit(1);

  if (results.length === 0) return null;

  const r = results[0];
  return {
    company: normalized,
    reputationScore: r.reputationScore || 50,
    totalListings: r.totalListings,
    repostCount: r.repostCount,
    avgGhostScore: Math.round(r.avgGhostScore || 0),
    highRiskCount: r.highRiskCount,
    vaguePayCount: r.vaguePayCount,
    perpetualHiring: r.perpetualHiringFlag,
    lastUpdated: r.lastUpdated ? r.lastUpdated.toISOString() : null,
  };
}

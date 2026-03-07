import { createHash } from "crypto";
import { db } from "./db";
import { jobFingerprints } from "@shared/models/auth";
import { eq, and, sql, desc } from "drizzle-orm";

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeCompany(company: string): string {
  return company
    .toLowerCase()
    .replace(/\b(inc|llc|ltd|corp|co|company|limited|incorporated|corporation|group|holdings)\b\.?/gi, "")
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function generateFingerprint(title: string, company: string, description: string): string {
  const normalized = [
    normalizeText(title || ""),
    normalizeText(company || ""),
    normalizeText(description || ""),
  ].join("|");

  return createHash("sha256").update(normalized).digest("hex");
}

export function generateSimilarityKey(title: string, company: string): string {
  const normalized = [
    normalizeText(title || ""),
    normalizeCompany(company || ""),
  ].join("|");

  return createHash("sha256").update(normalized).digest("hex").substring(0, 16);
}

export interface RepostDetectionResult {
  isRepost: boolean;
  repostCount: number;
  firstSeen: string | null;
  sites: string[];
  similarListings: Array<{
    title: string;
    source: string;
    date: string;
    ghostScore: number | null;
  }>;
}

export async function detectReposts(
  fingerprint: string,
  similarityKey: string,
  normalizedCompanyName: string
): Promise<RepostDetectionResult> {
  const companyFilter = normalizedCompanyName
    ? eq(jobFingerprints.normalizedCompany, normalizedCompanyName)
    : undefined;

  const exactMatchFilters = companyFilter
    ? and(eq(jobFingerprints.fingerprint, fingerprint), companyFilter)
    : eq(jobFingerprints.fingerprint, fingerprint);

  const exactMatches = await db
    .select()
    .from(jobFingerprints)
    .where(exactMatchFilters)
    .orderBy(jobFingerprints.createdAt);

  const similarMatchFilters = companyFilter
    ? and(
        eq(jobFingerprints.similarityKey, similarityKey),
        sql`${jobFingerprints.fingerprint} != ${fingerprint}`,
        companyFilter
      )
    : and(
        eq(jobFingerprints.similarityKey, similarityKey),
        sql`${jobFingerprints.fingerprint} != ${fingerprint}`
      );

  const similarMatches = await db
    .select()
    .from(jobFingerprints)
    .where(similarMatchFilters)
    .orderBy(desc(jobFingerprints.createdAt))
    .limit(10);

  const allMatches = [...exactMatches, ...similarMatches];
  const totalMatchCount = allMatches.length;
  const isRepost = totalMatchCount > 0;
  const firstSeen = allMatches.length > 0 && allMatches[0].createdAt
    ? allMatches[0].createdAt.toISOString()
    : null;

  const sitesSet = new Set<string>();
  for (const m of allMatches) {
    if (m.source) sitesSet.add(m.source);
  }

  const similarListings = similarMatches.slice(0, 5).map((m) => ({
    title: m.title || "",
    source: m.source || "unknown",
    date: m.createdAt ? m.createdAt.toISOString() : "",
    ghostScore: m.ghostScore,
  }));

  return {
    isRepost,
    repostCount: totalMatchCount,
    firstSeen,
    sites: Array.from(sitesSet),
    similarListings,
  };
}

export async function storeFingerprint(data: {
  fingerprint: string;
  similarityKey: string;
  title: string;
  company: string;
  normalizedCompany: string;
  description: string;
  location?: string;
  salary?: string;
  source?: string;
  ghostScore: number;
  riskLevel: string;
  analysisId?: string;
}): Promise<void> {
  await db.insert(jobFingerprints).values({
    fingerprint: data.fingerprint,
    similarityKey: data.similarityKey,
    title: data.title,
    company: data.company,
    normalizedCompany: data.normalizedCompany,
    description: data.description?.substring(0, 5000),
    location: data.location || null,
    salary: typeof data.salary === "string" ? data.salary : data.salary ? String(data.salary) : null,
    source: data.source || null,
    ghostScore: data.ghostScore,
    riskLevel: data.riskLevel,
    analysisId: data.analysisId || null,
  });
}

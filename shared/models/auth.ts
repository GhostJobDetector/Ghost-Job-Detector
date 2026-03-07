import { sql } from "drizzle-orm";
import { index, jsonb, pgTable, timestamp, varchar, integer, real, boolean, text, uniqueIndex } from "drizzle-orm/pg-core";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)]
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Job analyses table for saving analysis history
export const analyses = pgTable(
  "analyses",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    userId: varchar("user_id").notNull().references(() => users.id),
    jobTitle: varchar("job_title").notNull(),
    company: varchar("company").notNull(),
    ghostScore: integer("ghost_score").notNull(),
    riskLevel: varchar("risk_level").notNull(),
    confidence: integer("confidence").notNull(),
    recommendation: varchar("recommendation", { length: 1000 }).notNull(),
    redFlagsCount: integer("red_flags_count").notNull(),
    jobPosting: jsonb("job_posting").notNull(),
    analysisResult: jsonb("analysis_result").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [index("IDX_analyses_user_id").on(table.userId)]
);

export const pageViews = pgTable("page_views", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  path: varchar("path").notNull(),
  userAgent: varchar("user_agent"),
  referrer: varchar("referrer"),
  ip: varchar("ip"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const jobFingerprints = pgTable(
  "job_fingerprints",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    fingerprint: varchar("fingerprint").notNull(),
    similarityKey: varchar("similarity_key").notNull(),
    title: varchar("title"),
    company: varchar("company"),
    normalizedCompany: varchar("normalized_company"),
    description: text("description"),
    location: varchar("location"),
    salary: varchar("salary"),
    source: varchar("source"),
    ghostScore: integer("ghost_score"),
    riskLevel: varchar("risk_level"),
    analysisId: varchar("analysis_id"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("IDX_fingerprint").on(table.fingerprint),
    index("IDX_similarity_key").on(table.similarityKey),
    index("IDX_normalized_company").on(table.normalizedCompany),
  ]
);

export const employerScores = pgTable(
  "employer_scores",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    company: varchar("company").notNull().unique(),
    totalListings: integer("total_listings").default(0).notNull(),
    repostCount: integer("repost_count").default(0).notNull(),
    avgGhostScore: real("avg_ghost_score").default(0),
    highRiskCount: integer("high_risk_count").default(0).notNull(),
    vaguePayCount: integer("vague_pay_count").default(0).notNull(),
    perpetualHiringFlag: boolean("perpetual_hiring_flag").default(false).notNull(),
    reputationScore: integer("reputation_score").default(50),
    lastUpdated: timestamp("last_updated").defaultNow(),
    createdAt: timestamp("created_at").defaultNow(),
  }
);

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export type InsertAnalysis = typeof analyses.$inferInsert;
export type Analysis = typeof analyses.$inferSelect;

export type InsertPageView = typeof pageViews.$inferInsert;
export type PageView = typeof pageViews.$inferSelect;

export type InsertJobFingerprint = typeof jobFingerprints.$inferInsert;
export type JobFingerprint = typeof jobFingerprints.$inferSelect;

export type InsertEmployerScore = typeof employerScores.$inferInsert;
export type EmployerScore = typeof employerScores.$inferSelect;

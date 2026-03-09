# Technical Disclosure Document

## GHOST JOB DETECTOR: System and Method for Automated Detection of Fraudulent, Inactive, and Deceptive Employment Listings Using Hybrid AI Analysis, Crowdsourced Fingerprinting, and Multi-Platform Content Extraction

---

**Inventor(s):** [INVENTOR FULL LEGAL NAME(S)]

**Date of Disclosure:** March 9, 2026

**Date of First Public Use/Disclosure:** [INSERT DATE APPLICATION FIRST WENT LIVE]

**Document Prepared For:** Use by a registered patent attorney or agent in preparing a utility patent application for submission to the United States Patent and Trademark Office (USPTO).

---

## NOTICE

This document is a technical disclosure intended to assist a patent attorney in drafting a formal patent application. It does not constitute a patent application itself. The inventor(s) should engage a registered patent attorney or agent licensed to practice before the USPTO to prepare and file the formal application. This document describes the invention in sufficient technical detail to support claims of novelty, utility, and non-obviousness.

---

## TABLE OF CONTENTS

1. [Field of the Invention](#1-field-of-the-invention)
2. [Background of the Invention](#2-background-of-the-invention)
3. [Summary of the Invention](#3-summary-of-the-invention)
4. [Detailed Description of the Invention](#4-detailed-description-of-the-invention)
   - 4.1 [System Architecture Overview](#41-system-architecture-overview)
   - 4.2 [Multi-Platform Content Extraction System](#42-multi-platform-content-extraction-system)
   - 4.3 [Hybrid Analysis Engine](#43-hybrid-analysis-engine)
   - 4.4 [Crowdsourced Job Fingerprinting and Repost Detection](#44-crowdsourced-job-fingerprinting-and-repost-detection)
   - 4.5 [Employer Reputation Scoring System](#45-employer-reputation-scoring-system)
   - 4.6 [Risk Scoring and Classification](#46-risk-scoring-and-classification)
   - 4.7 [User Interface and Interaction Design](#47-user-interface-and-interaction-design)
   - 4.8 [Privacy-Preserving Architecture](#48-privacy-preserving-architecture)
5. [Novel Aspects and Claims of Novelty](#5-novel-aspects-and-claims-of-novelty)
6. [Preferred Embodiments](#6-preferred-embodiments)
7. [Alternative Embodiments](#7-alternative-embodiments)
8. [Glossary of Terms](#8-glossary-of-terms)
9. [System Flow Diagrams](#9-system-flow-diagrams)
10. [Data Schemas](#10-data-schemas)

---

## 1. FIELD OF THE INVENTION

The present invention relates generally to the field of automated content analysis and fraud detection in online employment platforms, and more particularly to a system and method for detecting ghost job listings, employment scams, resume harvesting schemes, and deceptive hiring practices through hybrid artificial intelligence analysis, crowdsourced fingerprint-based repost detection, multi-dimensional heuristic rule evaluation, and cross-platform content extraction.

---

## 2. BACKGROUND OF THE INVENTION

### 2.1 The Ghost Job Problem

The online employment marketplace suffers from a pervasive and growing problem of "ghost jobs" -- job listings posted by employers without a genuine intent to fill the advertised position. These listings are created and maintained for various purposes unrelated to actual hiring, including but not limited to:

- **Data harvesting:** Collecting resumes and personal information for marketing, resale, or identity theft purposes.
- **Benchmarking:** Employers posting listings to gauge the labor market, assess salary expectations, or evaluate the talent pool without intending to hire.
- **Regulatory compliance appearance:** Companies maintaining the appearance of active hiring to satisfy stakeholders, investors, or regulatory requirements regarding workforce growth.
- **Employee demoralization:** Existing employers posting positions to signal replaceability to current staff, or to justify understaffing.
- **Talent pipeline building:** Accumulating a database of qualified candidates for future (often indefinite) openings.
- **Brand presence:** Maintaining visibility on job platforms as a marketing strategy.

A 2024 survey by Clarify Capital found that approximately 68% of hiring managers admitted to keeping job postings active for over 30 days after they were filled. A separate study by Revelio Labs estimated that up to 21% of job postings on major platforms may be ghost listings.

### 2.2 Limitations of Prior Art

Existing approaches to job listing verification are limited in several ways:

**Manual review:** Job seekers currently rely on manual research -- checking company websites, reading reviews, and cross-referencing listings -- which is time-consuming and unreliable.

**Platform-level filtering:** Job platforms (LinkedIn, Indeed, Glassdoor, ZipRecruiter) offer limited filtering (e.g., "posted within last 24 hours") but do not perform content-level analysis for ghost listing indicators.

**Static rule engines:** Some browser extensions and tools provide keyword-based warnings but lack the contextual understanding needed to differentiate between legitimate postings with certain keywords and genuinely suspicious listings.

**AI-only approaches:** Pure AI/LLM-based analysis lacks the deterministic reliability needed for consistent detection and cannot access historical posting data for repost pattern analysis.

No known prior art combines (a) multi-layered content extraction across multiple job platforms, (b) hybrid AI and rule-based analysis, (c) crowdsourced fingerprint-based repost detection, (d) employer reputation scoring derived from aggregate historical data, and (e) a privacy-preserving architecture that performs no server-side scraping, all within a unified system accessible through both a browser extension and a web application.

---

## 3. SUMMARY OF THE INVENTION

The invention is a system and method for automated detection of fraudulent, inactive, and deceptive job listings. The system comprises:

1. **A multi-platform content extraction module** implemented as a browser extension that operates client-side to extract structured job posting data from diverse employment platform DOM structures using a three-tier extraction strategy: structured data parsing (JSON-LD/Schema.org), platform-specific CSS selector mapping, and generic fallback extraction.

2. **A hybrid analysis engine** that evaluates extracted job data through two complementary processing layers: (a) a deterministic rule-based engine that applies weighted pattern matching across nine distinct fraud indicator categories with market rate comparison, email domain analysis, and linguistic pattern detection; and (b) an AI/LLM-based semantic analysis layer that evaluates contextual meaning across four analytical dimensions (content quality, company legitimacy, posting patterns, and communication).

3. **A crowdsourced job fingerprinting and repost detection system** that generates cryptographic hashes (SHA-256) at two granularity levels -- exact match fingerprints and fuzzy similarity keys -- to identify identical and near-identical job listings across multiple platforms and time periods, creating a global database of listing patterns that benefits all system users.

4. **An employer reputation scoring algorithm** that aggregates historical analysis data per employer to compute a dynamic reputation score based on repost frequency, average ghost score, high-risk listing proportion, compensation transparency, and perpetual hiring patterns.

5. **A privacy-preserving architecture** in which the server component never contacts external job sites; all content extraction occurs client-side in the user's browser, and only user-submitted text is transmitted for analysis.

---

## 4. DETAILED DESCRIPTION OF THE INVENTION

### 4.1 System Architecture Overview

The system comprises five principal components operating across three execution environments:

**Client-Side (Browser Extension):**
- Content extraction engine
- Floating action button (FAB) user interface
- Extension popup interface
- Job page detection module

**Client-Side (Web Application):**
- Manual job posting input interface
- Analysis results display
- User authentication and history management

**Server-Side:**
- API endpoint for analysis requests
- Hybrid analysis engine (rule-based + AI)
- Fingerprint generation and repost detection service
- Employer reputation scoring service
- Persistent data storage (PostgreSQL)

The system operates on a request-response model. Job posting data is submitted to the server API either from the browser extension (which extracts data client-side from the active web page) or from the web application (where users manually enter job posting details). The server processes the data through the hybrid analysis engine, queries the fingerprint database for repost detection, updates employer reputation scores, and returns a comprehensive analysis result.

### 4.2 Multi-Platform Content Extraction System

#### 4.2.1 Three-Tier Extraction Strategy

The content extraction module employs a hierarchical three-tier strategy to maximize extraction accuracy across diverse platform architectures:

**Tier 1 -- Structured Data Parsing (JSON-LD):**
The system first attempts to extract job posting data from Schema.org `JobPosting` structured data embedded in the page as JSON-LD (`<script type="application/ld+json">`). This approach provides the highest accuracy as it reads machine-readable data that employers have explicitly structured. The parser:
- Iterates all `application/ld+json` script elements on the page
- Handles both direct `JobPosting` types and `@graph` arrays containing multiple schema objects
- Extracts: title, description, hiring organization name, base salary (handling nested `value` objects with `minValue`/`maxValue` and `unitText`), estimated salary, and job location (including nested address objects with locality, region, and country)
- Normalizes all extracted text by decoding HTML entities and collapsing whitespace

**Tier 2 -- Platform-Specific Selector Mapping:**
If Tier 1 yields insufficient data, the system applies platform-specific CSS selector mappings for four major job platforms. Each platform mapping defines ordered arrays of CSS selectors for five data fields (title, company, description, salary, location), tried in priority order. The supported platforms and their selector strategies include:

- **LinkedIn (linkedin.com):** 10+ title selectors covering authenticated views (`h1.t-24`), public job views (`h1.topcard__title`), unified top card views (`h1.job-details-jobs-unified-top-card__job-title`), and search card views (`h3.base-search-card__title`). Company selectors handle both link-wrapped and text-only company name elements. Description selectors cover the jobs description content container, show-more markup, and legacy job details containers.

- **Indeed (indeed.com):** Selectors target test-id attributed elements (`[data-testid="jobsearch-JobInfoHeader-title"]`), legacy class-based elements (`.jobsearch-JobInfoHeader-title`), inline header components, and fallback heading elements.

- **Glassdoor (glassdoor.com):** Selectors target data-test attributes (`[data-test="job-title"]`), dynamically generated class names (`.JobDetails_jobTitle__Rbnx1`), and generic fallback elements.

- **ZipRecruiter (ziprecruiter.com):** Selectors cover both legacy class-based elements (`h1.job_title`) and modern test-id attributed elements (`[data-testid="job-title"]`), with fallback to generic selectors.

**Tier 3 -- Generic Fallback Extraction:**
For unsupported platforms or when Tiers 1 and 2 yield insufficient data, the system employs a generic extraction strategy:
- Title: Extracted from `og:title` meta tag or `document.title`
- Company: Extracted from `og:site_name` or `author` meta tags
- Description: Extracted from the first element matching common class/ID patterns (`*description*`, `*job-detail*`), then `<article>`, then `<main>`, then `document.body`, truncated to 4,000 characters

#### 4.2.2 Data Merging Strategy

When both Tier 1 and Tier 2 yield data, the system employs a merge strategy: Tier 1 (JSON-LD) values take precedence for each field, with Tier 2 (platform-specific) values filling in any gaps. This produces the most complete extraction possible.

#### 4.2.3 Job Page Detection

The system includes an intelligent job page detection module that determines whether the current web page contains a job listing, using platform-specific URL pattern matching and DOM element detection:

- **LinkedIn:** URL path contains `/jobs/` or URL contains `currentJobId=`
- **Indeed:** URL path contains `/viewjob`, `/rc/clk`, or `/jobs`, or URL contains `vjk=`
- **Glassdoor:** URL path contains `/job-listing`, `/Job`, `/Jobs`, `/partner/jobListing`; or DOM contains elements with `data-test="jobListing"`, `data-test="job-title"`, or class names containing `JobDetails`
- **ZipRecruiter:** URL path contains `/jobs`, `/c/`, `/job`, `/k/`, `/ojob`; or URL contains `job_id=`, `mid=`, `source=`; or DOM contains elements with classes/attributes matching job content patterns
- **Any platform:** Presence of Schema.org `JobPosting` JSON-LD data

The detection module runs on page load (with delays of 500ms, 2000ms, and 4000ms to handle asynchronous rendering), on SPA navigation events (by intercepting `history.pushState` and `history.replaceState`), on `popstate` events, and via a periodic polling interval (1500ms) to detect URL changes in single-page applications.

### 4.3 Hybrid Analysis Engine

The analysis engine processes job posting data through two complementary layers, producing a unified risk assessment.

#### 4.3.1 Rule-Based Analysis Layer

The rule-based engine evaluates the job posting across four analytical dimensions, each producing a sub-score and an array of specific flag messages:

**Dimension 1 -- Content Analysis (max 90 points):**

The content analyzer evaluates the posting text against nine categories of suspicious patterns:

1. **Payment/Financial Request Detection:** Scans for keywords indicating the listing requests money from applicants (e.g., "pay for training", "buy equipment", "send money", "deposit check", "wire transfer", "processing fee", "registration fee", "upfront cost", "investment required"). Match penalty: +25 points.

2. **Unrealistic Promise Detection:** Identifies language indicating too-good-to-be-true offers (e.g., "get rich quick", "unlimited income", "work 2 hours", "6 figures", "no experience needed", "guaranteed income", "make money fast", "financial freedom", "passive income", "unlimited earning potential"). Match penalty: +20 points.

3. **Vague Requirements Analysis:** Counts instances of minimally qualified requirement language (e.g., "must be 18", "no experience necessary", "no skills required", "no resume needed", "start immediately"). Two or more matches: +15 points; one match: +8 points. Additionally flags requirements sections under 30 words: +10 points.

4. **Urgency/Pressure Language Detection:** Identifies pressure tactics (e.g., "immediate start", "apply now", "limited spots", "act fast", "don't miss out", "urgent hiring", "positions filling fast", "last chance"). Match penalty: +8 points.

5. **Scam Indicator Detection:** Flags known scam-associated terminology (e.g., "mlm", "multi-level", "network marketing", "pyramid", "cryptocurrency opportunity", "forex trading", "binary options"). Match penalty: +20 points.

6. **Salary Market Rate Comparison:** Compares the listed salary against a curated dictionary of median market rates for 25+ job categories (e.g., Software Engineer median $120,000, range $70,000-$200,000; Data Scientist median $130,000, range $85,000-$200,000; Customer Service median $40,000, range $28,000-$55,000). Penalties are graduated:
   - Salary exceeds 150% of market ceiling: +25 points ("likely bait")
   - Salary exceeds market ceiling: +12 points
   - Salary below 60% of market floor: +18 points ("possible exploitative offer")
   - Salary below market floor: +10 points
   - Vague compensation language ("competitive salary"): +3 points
   - "Depends on experience" without range: +5 points

7. **Resume Harvesting Detection:** Evaluates two complementary indicator sets -- direct resume submission requests (e.g., "send your resume to", "email your resume", "reply with your resume") and pipeline/pool language (e.g., "always hiring", "talent pool", "talent pipeline", "future opportunities", "evergreen position", "rolling basis", "general application"). Scoring is combinatorial:
   - Two or more pipeline patterns: +20 points
   - One pipeline pattern plus one submission indicator: +15 points
   - One pipeline pattern alone: +8 points
   - Two or more submission indicators alone: +10 points

8. **Excessive Personal Data Requests:** Detects premature requests for sensitive information (e.g., "social security", "SSN", "date of birth", "bank account", "driver's license number", "passport number", "credit card", "mother's maiden name", "routing number"). Two or more matches: +25 points; one match: +15 points.

9. **Formatting Anomaly Detection:** Flags excessive exclamation marks (>5: +5 points) and excessive ALL CAPS words of 4+ characters (>3 instances: +5 points).

**Dimension 2 -- Company Verification (scored additively):**

1. **Email Domain Analysis:** A multi-factor email evaluation system that checks:
   - Whether the email uses a disposable/temporary domain (from a list of 20+ known disposable services): +30 points
   - Whether the email uses a personal domain (from a list of 30+ personal email services including international providers): +20 points
   - Whether the email local part contains 4+ digits (possible auto-generation): +8 points
   - Whether the email domain matches the company name (using substring matching of the first 5 characters of the normalized company name against the domain, and vice versa): +12 points if no match
   - Whether the email uses a free website builder domain (wix.com, weebly.com, squarespace.com, wordpress.com, etc.): +15 points

2. **Website-Email Cross-Verification:** If both a company website and contact email are provided, the system extracts root domains from both and compares them. Mismatch penalty: +8 points.

3. **Company Name Analysis:** Evaluates the company name against a list of 15 generic/vague terms (e.g., "success", "unlimited", "solutions", "global", "enterprise", "opportunity", "elite", "wealth", "dream", "destiny"). Two or more matches: +15 points; one match with short name (<15 chars): +8 points. Names under 4 characters: +10 points.

**Dimension 3 -- Posting Pattern Analysis (scored additively):**

Evaluates temporal and structural patterns including:
- Description length analysis (unusually short descriptions)
- Posting date analysis (listings older than 60-90 days with graduated scoring)
- Contact method analysis (unusual methods like text-only or in-person only)

**Dimension 4 -- Communication Analysis (scored additively):**

Evaluates communication-related signals including:
- Response time expectations (unusually fast demands for response)
- Contact method appropriateness

#### 4.3.2 AI/LLM Analysis Layer

The AI layer uses a large language model (currently GPT-5-mini) with a specialized system prompt that instructs it to act as "an expert job market analyst specializing in detecting ghost jobs, scam postings, and misleading listings." The model evaluates the same four dimensions as the rule-based engine:

1. Content quality: vague descriptions, unrealistic promises, payment requests, MLM indicators
2. Company legitimacy: generic names, missing info, mismatched domains
3. Posting patterns: urgency tactics, evergreen listings, talent pool language
4. Communication: suspicious emails, excessive data requests, unusual contact methods

The model returns structured JSON with:
- `ghostScore`: 0-100 numeric risk score
- `confidence`: 0-100 confidence percentage
- `riskLevel`: categorical classification
- `recommendation`: actionable advice string
- `redFlags`: array of categorized flag objects with severity levels
- `detailedAnalysis`: sub-scores and flags for each of the four dimensions

The system enforces strict JSON output format using the model's `response_format: { type: "json_object" }` parameter.

#### 4.3.3 Score Synthesis

The final ghost score is produced by combining the rule-based and AI scores. The rule-based engine provides deterministic, reproducible assessments based on known patterns, while the AI layer provides contextual semantic analysis that can catch novel or nuanced deception patterns. The combined score is clamped to the range 0-100.

Red flags from both engines are merged, deduplicated, and categorized by severity (critical, high, medium, low) and category (content, company, patterns, communication).

### 4.4 Crowdsourced Job Fingerprinting and Repost Detection

#### 4.4.1 Fingerprint Generation

Every analyzed job listing generates two cryptographic fingerprints:

**Exact Fingerprint (SHA-256):**
```
fingerprint = SHA-256(normalize(title) + "|" + normalize(company) + "|" + normalize(description))
```
Where `normalize()` converts to lowercase, removes non-word characters (except spaces), and collapses whitespace. This fingerprint identifies identical listings.

**Similarity Key (truncated SHA-256):**
```
similarityKey = SHA-256(normalize(title) + "|" + normalizeCompany(company))[0:16]
```
Where `normalizeCompany()` additionally strips common corporate suffixes (Inc, LLC, Ltd, Corp, Co, Company, Limited, Incorporated, Corporation, Group, Holdings). This truncated hash identifies listings for the same role at the same company even when descriptions differ (e.g., slight wording changes in reposts).

#### 4.4.2 Repost Detection Algorithm

Upon each analysis, the system queries the fingerprint database:

1. **Exact match query:** Retrieves all records with the same fingerprint hash, optionally filtered by normalized company name. Results are ordered chronologically.

2. **Similarity match query:** Retrieves up to 10 records with the same similarity key but a different exact fingerprint, representing variant postings of the same role.

3. **Result aggregation:** The system reports:
   - `isRepost`: Boolean indicating whether any prior matches exist
   - `repostCount`: Total number of times this listing (or similar variants) has been seen
   - `firstSeen`: ISO timestamp of the earliest match
   - `sites`: Deduplicated set of source platforms where the listing has appeared (enabling cross-platform detection, e.g., a listing appearing on both LinkedIn and Indeed)
   - `similarListings`: Up to 5 similar but not identical listings, including their title, source platform, date, and ghost score

#### 4.4.3 Crowdsourced Data Accumulation

Every analysis performed by any user contributes to the global fingerprint database. Each stored fingerprint record includes:
- The exact fingerprint hash
- The similarity key
- Original and normalized title and company name
- Description (truncated to 5,000 characters)
- Location and salary (if available)
- Source platform identifier
- Ghost score and risk level from the analysis
- Timestamp

This creates a network effect: the more users analyze listings, the more effective repost detection becomes for all users. A listing that one user scans on LinkedIn can be detected as a repost when another user later encounters it on Indeed.

### 4.5 Employer Reputation Scoring System

#### 4.5.1 Score Calculation Algorithm

The system maintains a per-employer reputation score (0-100) computed from aggregate historical data. The algorithm starts at a base score of 50 and applies the following adjustments:

**Repost Rate Penalty:**
- `repostRate = repostCount / totalListings`
- Rate > 50%: -20 points
- Rate > 30%: -12 points
- Rate > 10%: -5 points

**Average Ghost Score Adjustment:**
- Average > 70: -20 points
- Average > 50: -12 points
- Average > 30: -5 points
- Average < 20: +15 points (bonus for consistently clean listings)
- Average < 30: +8 points

**High-Risk Listing Proportion:**
- `highRiskRate = highRiskCount / totalListings`
- Rate > 50%: -15 points
- Rate > 20%: -8 points

**Vague Pay Proportion:**
- `vaguePayRate = vaguePayCount / totalListings`
- Rate > 70%: -10 points
- Rate > 40%: -5 points

**Perpetual Hiring Flag:**
- Triggered when an employer has 10 or more distinct listings within a 30-day window
- Penalty: -10 points

The final score is clamped to the range 0-100.

#### 4.5.2 Employer Data Normalization

Company names are normalized before storage and lookup by:
- Converting to lowercase
- Removing common corporate suffixes (Inc, LLC, Ltd, Corp, Co, Company, Limited, Incorporated, Corporation, Group, Holdings) with regex word boundary matching
- Removing non-word characters (except spaces)
- Collapsing whitespace and trimming

This ensures that "Acme Corp.", "ACME Corporation", and "acme" all resolve to the same employer record.

### 4.6 Risk Scoring and Classification

The system classifies risk levels based on the ghost score:

| Score Range | Risk Level | Color Code |
|------------|------------|------------|
| 70-100 | High Risk | Red (#EF4444) |
| 50-69 | Medium Risk | Amber (#F59E0B) |
| 30-49 | Some Risk | Orange (#F97316) |
| 0-29 | Low Risk | Green (#10B981) |

Each analysis result includes:
- **Ghost Score (0-100):** Composite numeric risk assessment
- **Confidence (0-100):** The system's confidence in its assessment
- **Risk Level:** Categorical classification (high, medium, low-medium, low)
- **Recommendation:** Actionable advice string
- **Red Flags:** Categorized array of specific concerns with severity levels
- **Detailed Analysis:** Sub-scores and flags for each of the four analytical dimensions
- **Repost Detection Data:** Cross-platform repost history and similar listings
- **Employer Reputation Data:** Historical employer trustworthiness metrics

### 4.7 User Interface and Interaction Design

#### 4.7.1 Browser Extension Floating Action Button (FAB)

The extension injects a floating ghost-themed button into supported job listing pages. The FAB features:

- **Draggable positioning:** Users can click and drag the FAB to any position on the viewport. The drag system uses pointer events and distinguishes between drag gestures (>4px movement) and click gestures to prevent accidental scans.
- **Result panel co-movement:** When the FAB is dragged while a result panel is displayed, the panel repositions in real-time relative to the FAB, maintaining its spatial relationship and automatically flipping to the opposite side when the FAB approaches a viewport edge.
- **Viewport-aware result positioning:** The result panel (340px width, max 80vh height, scrollable) automatically positions itself to the left of the FAB when sufficient space exists, otherwise to the right, and clamps its position to remain within the viewport bounds.
- **State-driven visual feedback:** The FAB cycles through visual states: idle (pulsing glow animation), scanning (spinner animation), and scored (color-coded to match risk level with score badge overlay).

#### 4.7.2 Web Application

The web application provides:
- Manual job posting input via structured form fields
- Tab-based input modes (manual entry, job site guidance)
- Animated results display with expandable detailed analysis sections
- Analysis history for authenticated users
- Administrative dashboard for aggregate analytics

### 4.8 Privacy-Preserving Architecture

A distinguishing architectural decision of this invention is that the server component never contacts external job sites or employment platforms. The privacy-preserving design operates as follows:

1. **Client-side extraction only:** All job posting data extraction occurs within the user's browser via the content script. The extension reads only the DOM of the active page that the user is already viewing.
2. **User-initiated transmission:** Job data is transmitted to the analysis server only when the user explicitly clicks the scan button (FAB) or submits the web form.
3. **No proxy scraping:** The server receives only the text content submitted by the user and never makes HTTP requests to job platforms.
4. **Minimal data retention:** Fingerprint records store only normalized text hashes and metadata needed for repost detection, not full job descriptions beyond what is needed for similarity comparison.

---

## 5. NOVEL ASPECTS AND CLAIMS OF NOVELTY

The following aspects of the invention are believed to be novel, either individually or in combination:

### Claim 1: Hybrid Analysis Architecture
A system combining deterministic rule-based analysis with AI/LLM semantic analysis for employment listing fraud detection, where the rule-based engine provides reproducible pattern matching across nine distinct fraud indicator categories and the AI layer provides contextual semantic understanding, with their results synthesized into a unified risk score.

### Claim 2: Crowdsourced Fingerprinting for Job Listing Repost Detection
A method for detecting reposted job listings using dual-granularity cryptographic fingerprints (exact match SHA-256 hash and truncated similarity key), where each user's analysis contributes to a global fingerprint database that enables cross-platform and cross-temporal repost detection for all system users.

### Claim 3: Multi-Tier Content Extraction Strategy
A three-tier hierarchical content extraction system for job listing data that first attempts structured data parsing (JSON-LD Schema.org), then applies platform-specific CSS selector mappings with ordered fallback selectors, then employs generic meta-tag and DOM-based extraction, with a merge strategy that prioritizes structured data while filling gaps from platform-specific extraction.

### Claim 4: Employer Reputation Scoring from Aggregate Analysis Data
A method for computing dynamic employer reputation scores from aggregate historical job listing analysis data, incorporating repost frequency, average ghost score, high-risk listing proportion, compensation transparency, and perpetual hiring detection (10+ listings within 30 days), with company name normalization that strips corporate suffixes for consistent entity resolution.

### Claim 5: Salary Market Rate Comparison for Fraud Detection
A method for evaluating employment listing legitimacy by comparing listed compensation against a curated dictionary of role-specific market rate ranges, with graduated penalty scoring for salaries that exceed 150% of the market ceiling (flagged as "bait"), exceed the ceiling, fall below 60% of the market floor (flagged as "exploitative"), or fall below the floor.

### Claim 6: Resume Harvesting Detection Algorithm
A method for detecting employment listings whose primary purpose is resume collection rather than genuine hiring, using combinatorial scoring of two complementary indicator categories: direct resume submission language and pipeline/talent pool language, with escalated scoring when indicators from both categories co-occur.

### Claim 7: Email Domain Analysis for Employer Verification
A multi-factor email analysis method for employment listing verification that evaluates: disposable domain detection, personal email domain detection, auto-generated local part detection (digit count analysis), company name-to-domain correlation (bidirectional substring matching), and free website builder domain detection.

### Claim 8: Privacy-Preserving Client-Side Extraction Architecture
A system architecture for employment listing analysis in which the server component never contacts external job platforms, all content extraction occurs client-side within the user's browser extension, and only user-submitted text is transmitted for analysis, eliminating the need for proxy scraping, web crawling, or platform API access.

### Claim 9: Draggable In-Page Analysis Interface with Co-Moving Result Panel
A browser extension user interface comprising a draggable floating action button that, when activated, displays an analysis result panel that maintains its spatial relationship to the button during drag operations, automatically repositioning relative to the button and flipping orientation when approaching viewport boundaries.

### Claim 10: Cross-Platform Repost Detection
A method for detecting when an identical or substantially similar job listing appears across multiple distinct employment platforms (e.g., LinkedIn and Indeed simultaneously), using platform-agnostic content fingerprinting that normalizes extracted text regardless of source platform formatting.

---

## 6. PREFERRED EMBODIMENTS

### 6.1 Primary Embodiment: Chrome Browser Extension + Web Application

The preferred embodiment comprises:
- A Chrome browser extension (Manifest V3) that provides in-page job listing analysis via a floating action button
- A React-based web application that provides manual job posting analysis, user authentication, and analysis history
- A Node.js/Express server that hosts the hybrid analysis engine, fingerprint database, and employer reputation system
- A PostgreSQL database for persistent storage of fingerprints, employer scores, user data, and analysis history

### 6.2 Mobile Embodiment

The system includes Capacitor-based iOS and Android application wrappers that load the web application within native WebView containers, providing mobile access to the analysis functionality.

---

## 7. ALTERNATIVE EMBODIMENTS

The following alternative implementations are contemplated:

1. **Firefox/Safari/Edge Extensions:** The content extraction and FAB systems could be adapted to other browser extension frameworks.
2. **API-Only Service:** The analysis engine could be exposed as a standalone API for integration by third-party job search tools, applicant tracking systems, or career counseling platforms.
3. **Platform Plugin:** The analysis could be integrated as a plugin within job platforms' own interfaces.
4. **Email Analysis:** The system could be extended to analyze job-related emails for the same fraud indicators.
5. **Bulk Analysis:** Enterprise users could submit CSV/JSON batches of job listings for aggregate analysis.
6. **Real-Time Browser Proxy:** A browser proxy approach could automatically analyze listings as they appear in search results, providing inline risk scores.
7. **Alternative AI Models:** The AI layer could use different language models, fine-tuned models, or locally-running models for enhanced privacy.
8. **Collaborative Flagging:** Users could submit manual flags or corrections to analysis results, creating a human-in-the-loop feedback mechanism.

---

## 8. GLOSSARY OF TERMS

| Term | Definition |
|------|-----------|
| **Ghost Job** | A job listing posted without genuine intent to fill the advertised position |
| **Fingerprint** | A SHA-256 cryptographic hash generated from normalized job listing content, used to identify identical listings |
| **Similarity Key** | A truncated (16-character) SHA-256 hash generated from normalized title and company name, used to identify near-identical listings |
| **Ghost Score** | A numeric value from 0 to 100 indicating the likelihood that a job listing is fraudulent, inactive, or deceptive, where higher values indicate greater risk |
| **FAB (Floating Action Button)** | A draggable button element injected into web pages by the browser extension, providing one-click access to job listing analysis |
| **Repost** | A job listing that has been previously seen in the system's fingerprint database, either as an exact match or a similar variant |
| **Perpetual Hiring** | A pattern where an employer maintains 10 or more active listings within a 30-day period, suggesting listings may not represent genuine open positions |
| **Resume Harvesting** | The practice of posting job listings primarily to collect resumes and personal information rather than to fill a genuine position |
| **Employer Reputation Score** | A numeric value from 0 to 100 representing an employer's aggregate trustworthiness based on historical job listing analysis data |
| **Content Script** | JavaScript code injected by a browser extension into web pages, running in the context of the visited page with access to its DOM |
| **JSON-LD** | JavaScript Object Notation for Linked Data, a method of embedding structured data in web pages using Schema.org vocabularies |
| **DOM** | Document Object Model, the programming interface for HTML documents that represents the page structure as a tree of objects |

---

## 9. SYSTEM FLOW DIAGRAMS

### 9.1 Analysis Request Flow (Browser Extension)

```
User visits job listing page
        |
        v
Content script detects job page (URL patterns + DOM checks)
        |
        v
FAB (floating ghost button) appears on page
        |
        v
User clicks FAB
        |
        v
Content script extracts job data:
  1. Try JSON-LD structured data extraction
  2. Try platform-specific CSS selector extraction
  3. Try generic fallback extraction
  4. Merge results (JSON-LD priority)
        |
        v
Extension sends extracted data to background service worker
        |
        v
Background service worker sends POST request to /api/analyze
        |
        v
Server receives job posting data
        |
        +---> Generate fingerprint (SHA-256 of normalized title|company|description)
        |     Generate similarity key (truncated SHA-256 of normalized title|company)
        |
        +---> Query fingerprint DB for repost detection
        |       - Exact matches (same fingerprint)
        |       - Similar matches (same similarity key, different fingerprint)
        |       - Aggregate: count, first seen date, source platforms, similar listings
        |
        +---> Rule-based analysis engine
        |       - Content analysis (9 pattern categories)
        |       - Company verification (email + website + name analysis)
        |       - Posting pattern analysis
        |       - Communication analysis
        |
        +---> AI/LLM analysis engine
        |       - Semantic evaluation across 4 dimensions
        |       - Structured JSON output with scores, flags, recommendation
        |
        +---> Score synthesis (combine rule-based + AI scores)
        |
        +---> Store fingerprint in database
        |
        +---> Update employer reputation score
        |
        v
Server returns AnalysisResult JSON
        |
        v
Extension displays result panel adjacent to FAB:
  - Ghost score with color-coded risk level
  - Confidence percentage
  - Recommendation text
  - Red flags (categorized by severity)
  - Repost detection data (count, first seen, sources, similar listings)
```

### 9.2 Employer Reputation Update Flow

```
New analysis completed for company "X"
        |
        v
Normalize company name:
  - Lowercase
  - Strip corporate suffixes (Inc, LLC, Ltd, Corp, etc.)
  - Remove non-word characters
  - Collapse whitespace
        |
        v
Query employer_scores table for normalized name
        |
        +---> [No existing record]
        |       Create new record with initial metrics
        |       Calculate initial reputation score
        |
        +---> [Existing record found]
                Update aggregate metrics:
                  - Increment totalListings
                  - Increment repostCount (if repost)
                  - Recalculate running average ghost score
                  - Increment highRiskCount (if risk level = "high")
                  - Increment vaguePayCount (if vague pay detected)
                        |
                        v
                Query fingerprint DB for listings
                from this employer in last 30 days
                        |
                        v
                Set perpetualHiring = true if count >= 10
                        |
                        v
                Calculate reputation score:
                  Base: 50
                  - Repost rate penalties (-5 to -20)
                  - Ghost score adjustment (-20 to +15)
                  - High risk rate penalties (-8 to -15)
                  - Vague pay rate penalties (-5 to -10)
                  - Perpetual hiring penalty (-10)
                  Clamp to [0, 100]
                        |
                        v
                Store updated employer record
```

---

## 10. DATA SCHEMAS

### 10.1 Job Posting Input Schema

```
JobPosting {
  title: string (default "")
  company: string (default "")
  description: string (required, min length 1)
  salary: string | number (optional)
  location: string (optional)
  source: string (optional) -- platform identifier
  requirements: string (optional)
  contactEmail: string, valid email format (optional)
  companyWebsite: string, valid URL format (optional)
  postingDate: string (optional)
  contactMethod: enum ["email", "phone", "text_only", "in_person", "other"] (optional)
  responseTime: string | number (optional)
}
```

### 10.2 Analysis Result Schema

```
AnalysisResult {
  ghostScore: number (0-100)
  confidence: number (0-100)
  recommendation: string
  riskLevel: enum ["high", "medium", "low-medium", "low"]
  redFlags: Array<{
    severity: enum ["critical", "high", "medium", "low"]
    message: string
    category: enum ["content", "company", "patterns", "communication"]
  }>
  detailedAnalysis: {
    contentAnalysis: { score: number (0-40), flags: string[] }
    companyVerification: { score: number (0-25), flags: string[] }
    postingPatterns: { score: number (0-20), flags: string[] }
    communication: { score: number (0-15), flags: string[] }
  }
  repostDetection: {
    isRepost: boolean
    repostCount: number
    firstSeen: string | null (ISO timestamp)
    sites: string[] (deduplicated platform list)
    similarListings: Array<{
      title: string
      source: string
      date: string (ISO timestamp)
      ghostScore: number | null
    }>
  } (optional)
  employerReputation: {
    company: string
    reputationScore: number (0-100)
    totalListings: number
    repostCount: number
    avgGhostScore: number
    highRiskCount: number
    vaguePayCount: number
    perpetualHiring: boolean
    lastUpdated: string | null (ISO timestamp)
  } (optional)
}
```

### 10.3 Job Fingerprint Database Record

```
JobFingerprint {
  id: serial (auto-generated primary key)
  fingerprint: string (SHA-256 hex, 64 characters)
  similarityKey: string (truncated SHA-256 hex, 16 characters)
  title: string
  company: string
  normalizedCompany: string
  description: text (max 5,000 characters)
  location: string (nullable)
  salary: string (nullable)
  source: string (nullable) -- platform identifier
  ghostScore: number
  riskLevel: string
  analysisId: string (nullable) -- reference to analysis record
  createdAt: timestamp (auto-generated)
}
```

### 10.4 Employer Score Database Record

```
EmployerScore {
  id: serial (auto-generated primary key)
  company: string (normalized)
  totalListings: integer
  repostCount: integer
  avgGhostScore: real (floating point)
  highRiskCount: integer
  vaguePayCount: integer
  perpetualHiringFlag: boolean
  reputationScore: integer (0-100)
  lastUpdated: timestamp
}
```

---

## APPENDIX A: SUSPICIOUS PATTERN DICTIONARIES

The rule-based engine uses the following curated dictionaries (representative samples):

**Payment Keywords (9 terms):** "pay for training", "buy equipment", "send money", "deposit check", "wire transfer", "processing fee", "registration fee", "upfront cost", "investment required"

**Too-Good-To-Be-True Keywords (13 terms):** "get rich quick", "unlimited income", "work 2 hours", "6 figures", "no experience needed", "anyone can apply", "guaranteed income", "make money fast", "financial freedom", "passive income", "work from home earn", "be your own boss", "unlimited earning potential"

**Vague Requirements (7 terms):** "must be 18", "no experience necessary", "anyone can apply", "no skills required", "no resume needed", "start immediately", "hiring immediately"

**Urgent Language (9 terms):** "immediate start", "apply now", "limited spots", "act fast", "don't miss out", "urgent hiring", "apply today", "positions filling fast", "last chance"

**Scam Indicators (9 terms):** "mlm", "multi-level", "network marketing", "pyramid", "cryptocurrency opportunity", "forex trading", "binary options", "work from home opportunity", "data entry from home"

**Resume Harvesting Indicators (8 terms):** "send your resume to", "submit your resume", "forward your cv", "email your resume", "send resume and cover letter", "attach your resume", "reply with your resume", "send your cv"

**Resume Harvesting Patterns (12 terms):** "always hiring", "always looking", "continuous recruitment", "ongoing recruitment", "talent pool", "talent pipeline", "future opportunities", "future openings", "building our team", "general application", "open application", "evergreen position", "evergreen role", "rolling basis", "no specific deadline"

**Excessive Data Requests (11 terms):** "social security", "ssn", "date of birth", "bank account", "driver's license number", "passport number", "credit card", "mother's maiden name", "bank details", "routing number", "account number"

**Personal Email Domains (30 domains):** gmail.com, yahoo.com, hotmail.com, outlook.com, aol.com, icloud.com, mail.com, protonmail.com, yandex.com, zoho.com, live.com, msn.com, me.com, inbox.com, fastmail.com, tutanota.com, gmx.com, gmx.net, mail.ru, qq.com, 163.com, 126.com, sina.com, rediffmail.com, ymail.com, rocketmail.com, att.net, verizon.net, comcast.net, sbcglobal.net, earthlink.net, cox.net, bellsouth.net, optonline.net

**Disposable Email Domains (20 domains):** tempmail.com, throwaway.email, guerrillamail.com, 10minutemail.com, mailinator.com, trashmail.com, fakeinbox.com, temp-mail.org, getnada.com, dispostable.com, maildrop.cc, yopmail.com, sharklasers.com, tmpmail.org, burnermail.io, mytemp.email, temp.email, tempmailo.com, mohmal.com, tempr.email

**Market Rate Dictionary (25+ roles):** Includes median, low, and high salary ranges for common job categories.

---

## APPENDIX B: PLATFORM-SPECIFIC CSS SELECTOR MAPPINGS

Detailed CSS selector arrays for each supported platform are maintained in the content extraction module. Each platform mapping includes ordered arrays of selectors for five data fields (title, company, description, salary, location), with selectors ordered from most specific/reliable to most generic.

The selector mappings are designed to accommodate:
- Authenticated vs. unauthenticated page views
- Legacy vs. modern platform UI versions
- Desktop vs. mobile-responsive layouts
- Dynamically generated class names (matched via partial class name selectors)
- Test ID attributed elements (matched via data-testid attributes)

---

## DECLARATION

I/we, the undersigned inventor(s), declare that the above technical disclosure accurately describes the invention to the best of my/our knowledge and belief. I/we understand that this document will be used by a patent attorney to prepare a formal patent application for submission to the USPTO.

Signature: ____________________________

Printed Name: ____________________________

Date: ____________________________

[Additional inventor signature blocks as needed]

---

*This document was prepared on March 9, 2026. The inventor(s) should consult with a registered patent attorney or agent before filing any patent application with the USPTO.*
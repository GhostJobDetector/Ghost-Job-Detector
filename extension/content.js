function decodeHtmlEntities(str = "") {
  const doc = new DOMParser().parseFromString(str, "text/html");
  return doc.body?.textContent || str;
}

function cleanText(str = "") {
  return decodeHtmlEntities(str)
    .replace(/\s+/g, " ")
    .replace(/\u00a0/g, " ")
    .trim();
}

function pickFirst(...vals) {
  for (const v of vals) {
    if (typeof v === "string" && cleanText(v)) return cleanText(v);
  }
  return "";
}

function getMeta(name) {
  const el =
    document.querySelector(`meta[name="${name}"]`) ||
    document.querySelector(`meta[property="${name}"]`);
  return el ? cleanText(el.getAttribute("content") || "") : "";
}

function safeJsonParse(text) {
  try { return JSON.parse(text); } catch { return null; }
}

function queryText(selectors) {
  if (typeof selectors === "string") selectors = [selectors];
  for (const sel of selectors) {
    try {
      const el = document.querySelector(sel);
      if (el) {
        const text = cleanText(el.innerText || el.textContent || "");
        if (text) return text;
      }
    } catch {}
  }
  return "";
}

function getJsonLdJobPosting() {
  const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
  for (const s of scripts) {
    const data = safeJsonParse(s.textContent || "");
    if (!data) continue;

    const nodes = Array.isArray(data) ? data : [data];

    for (const node of nodes) {
      const graph = node && node["@graph"] ? node["@graph"] : [node];
      for (const g of graph) {
        if (!g) continue;
        const type = g["@type"];
        if (type === "JobPosting" || (Array.isArray(type) && type.includes("JobPosting"))) {
          return g;
        }
      }
    }
  }
  return null;
}

function extractFromJsonLd() {
  const jp = getJsonLdJobPosting();
  if (!jp) return null;

  const title = cleanText(jp.title || "");
  const desc = cleanText(jp.description || "");
  const org = jp.hiringOrganization || jp.organization || {};
  const company = cleanText(typeof org === "string" ? org : (org.name || ""));

  let salary = "";
  const baseSalary = jp.baseSalary;
  if (baseSalary && typeof baseSalary === "object") {
    const val = baseSalary.value;
    if (val && typeof val === "object") salary = cleanText(val.value || "");
    if (typeof val === "string") salary = cleanText(val);
  }
  if (!salary && jp.estimatedSalary) {
    const est = Array.isArray(jp.estimatedSalary) ? jp.estimatedSalary[0] : jp.estimatedSalary;
    if (est && typeof est === "object") {
      const parts = [];
      if (est.currency) parts.push(est.currency);
      if (est.value && typeof est.value === "object") {
        if (est.value.minValue) parts.push(est.value.minValue);
        if (est.value.maxValue) parts.push("-", est.value.maxValue);
      }
      if (parts.length) salary = parts.join(" ");
    }
  }

  let location = "";
  if (jp.jobLocation) {
    const loc = Array.isArray(jp.jobLocation) ? jp.jobLocation[0] : jp.jobLocation;
    if (loc && loc.address) {
      const addr = loc.address;
      const locParts = [addr.addressLocality, addr.addressRegion, addr.addressCountry].filter(Boolean);
      location = locParts.join(", ");
    }
  }

  return { title, company, description: desc, salary, location };
}

function extractSiteSpecific() {
  const host = location.hostname;

  if (host.includes("linkedin.com")) {
    return {
      title: pickFirst(
        queryText([
          'h1.t-24',
          'h1.topcard__title',
          'h1.job-details-jobs-unified-top-card__job-title',
          'h1[class*="job-title"]',
          '.jobs-unified-top-card__job-title',
          'h1',
        ]),
        getMeta("og:title"),
        document.title
      ),
      company: pickFirst(
        queryText([
          '.jobs-unified-top-card__company-name a',
          '.jobs-unified-top-card__company-name',
          'a[data-tracking-control-name="public_jobs_topcard-org-name"]',
          '.topcard__org-name-link',
          'a.topcard__org-name-link',
          '.job-details-jobs-unified-top-card__company-name a',
          '[data-tracking-control-name="public_jobs_topcard-org-name"]',
        ])
      ),
      description: pickFirst(
        queryText([
          '.jobs-description__content',
          '.jobs-description-content__text',
          '.description__text',
          '.show-more-less-html__markup',
          '#job-details',
          '[data-automation-id="jobPostingDescription"]',
        ])
      )
    };
  }

  if (host.includes("indeed.com")) {
    return {
      title: pickFirst(
        queryText([
          'h1[data-testid="jobsearch-JobInfoHeader-title"]',
          '.jobsearch-JobInfoHeader-title',
          'h1',
        ]),
        getMeta("og:title")
      ),
      company: pickFirst(
        queryText([
          '[data-testid="inlineHeader-companyName"] a',
          '[data-testid="inlineHeader-companyName"]',
          '[data-testid="company-name"]',
          '[data-company-name="true"]',
          '.jobsearch-CompanyInfoWithoutHeaderImage a',
        ])
      ),
      description: pickFirst(
        queryText([
          '#jobDescriptionText',
          '.jobsearch-JobComponent-description',
          '#jobDescriptionSection',
        ])
      )
    };
  }

  if (host.includes("glassdoor.com")) {
    return {
      title: pickFirst(
        queryText([
          '[data-test="job-title"]',
          '.css-1vg6q84',
          'h1',
        ]),
        getMeta("og:title")
      ),
      company: pickFirst(
        queryText([
          '[data-test="employer-name"]',
          '[data-test="employerName"]',
          '.css-87ung5',
        ])
      ),
      description: pickFirst(
        queryText([
          '[data-test="jobDescriptionContent"]',
          '.jobDescriptionContent',
          '#JobDescriptionContainer',
        ])
      )
    };
  }

  if (host.includes("ziprecruiter.com")) {
    return {
      title: pickFirst(
        queryText([
          'h1',
          '.job_title',
        ]),
        getMeta("og:title"),
        document.title
      ),
      company: pickFirst(
        queryText([
          '[data-testid="company_name"]',
          '.hiring_company_text',
          '.jobList-introMeta',
          'a[data-testid="job-detail-company-name"]',
        ])
      ),
      description: pickFirst(
        queryText([
          '[data-testid="job_description"]',
          '.jobDescriptionSection',
          '#job_description',
          '.job_description',
        ])
      )
    };
  }

  return null;
}

function extractGenericFallback() {
  const title = pickFirst(getMeta("og:title"), document.title);
  const company = pickFirst(getMeta("og:site_name"), getMeta("author"));

  const descEl = document.querySelector('[class*="description"]') ||
    document.querySelector('[id*="description"]') ||
    document.querySelector('[class*="job-detail"]') ||
    document.querySelector('[id*="job-detail"]') ||
    document.querySelector("article") ||
    document.querySelector("main") ||
    document.body;

  const text = cleanText(descEl?.innerText || "");
  const description = text.slice(0, 4000);

  return { title, company, description };
}

function extractJobData() {
  const fromLd = extractFromJsonLd();
  if (fromLd && (fromLd.title || fromLd.company || fromLd.description)) return fromLd;

  const fromSite = extractSiteSpecific();
  if (fromSite && (fromSite.title || fromSite.company || fromSite.description)) {
    return {
      title: cleanText(fromSite.title),
      company: cleanText(fromSite.company),
      description: cleanText(fromSite.description),
      salary: cleanText(fromSite.salary || ""),
      location: cleanText(fromSite.location || "")
    };
  }

  const fromGeneric = extractGenericFallback();
  return {
    title: cleanText(fromGeneric.title),
    company: cleanText(fromGeneric.company),
    description: cleanText(fromGeneric.description),
    salary: cleanText(fromGeneric.salary || ""),
    location: cleanText(fromGeneric.location || "")
  };
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg?.type === "PING") {
    sendResponse({ ok: true });
    return;
  }
  if (msg?.type === "SCAN_PAGE") {
    const data = extractJobData();
    sendResponse({ ok: true, data });
  }
});

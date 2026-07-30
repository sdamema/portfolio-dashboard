(() => {
  "use strict";

  const CONFIG = {
    title: "",
    defaultSheetName: "Master Data",
    refreshMinutes: 5,
    persistSheetReference: false,
    ...(window.DASHBOARD_CONFIG || {})
  };

  const FIELD_ALIASES = {
    market: ["market", "country", "region", "mercato", "pays"],
    sourceFlow: ["source flow", "flow", "channel", "source", "workstream"],
    campaign: ["campaign name", "campaign", "project", "nome campagna", "campagne"],
    topic: ["campaign topic", "topic", "theme", "vertical", "argomento"],
    articleUrl: ["article url", "publication url", "placement url", "source url", "url article"],
    referringDomain: ["referring domain", "publisher", "domain", "source domain", "media"],
    targetUrl: ["backlink url", "target url", "landing page", "destination url", "client url"],
    dr: ["dr", "domain rating", "domain authority", "authority", "da"],
    newRd: ["new rd", "new referring domain", "new domain", "first placement"],
    year: ["year", "anno", "annee"],
    week: ["week", "week number", "settimana", "semaine"],
    date: ["date", "publication date", "published date", "data"],
    status: ["link status", "status", "placement status"],
    linkType: ["link type", "follow type", "rel"],
    anchorText: ["anchor text", "anchor", "testo anchor"],
    cost: ["cost", "placement cost", "price", "costo"],
    organicTraffic: ["organic traffic", "publisher traffic", "traffic"],
    topicalRelevance: ["topical relevance", "relevance", "pertinenza"],
    language: ["language", "lingua", "langue"],
    firstSeen: ["first seen", "discovered date"],
    lastChecked: ["last checked", "check date"],
    campaignTarget: ["campaign target", "target backlinks", "goal"]
  };

  const CORE_FIELDS = ["market", "campaign", "articleUrl", "referringDomain", "dr", "year", "week"];
  const FIELD_LABELS = {
    market: "Market",
    sourceFlow: "Outreach type",
    campaign: "Campaign",
    topic: "Topic",
    articleUrl: "Article URL",
    referringDomain: "Publisher domain",
    targetUrl: "Target URL",
    dr: "Domain Rating",
    newRd: "New domain",
    year: "Year",
    week: "Week",
    date: "Publication date",
    status: "Link status",
    linkType: "Link type",
    anchorText: "Anchor text",
    cost: "Cost",
    organicTraffic: "Organic traffic",
    topicalRelevance: "Topical relevance",
    language: "Language",
    firstSeen: "First seen",
    lastChecked: "Last checked",
    campaignTarget: "Campaign target"
  };
  const COLORS = window.DASHBOARD_THEME === "bounce"
    ? {
        ink: "#0a0a1e",
        muted: "#6c6c85",
        line: "#dfdfe5",
        blue: "#454ced",
        signal: "#def201",
        orange: "#ff7448",
        teal: "#008b75",
        paper: "#f7f7fc",
        surface: "#ffffff"
      }
    : {
        ink: "#14241d",
        muted: "#6e756f",
        line: "#d3cec2",
        blue: "#1455ff",
        signal: "#d9ff43",
        orange: "#ff6846",
        teal: "#00a78e",
        paper: "#f2eee5",
        surface: "#fffdf7"
      };

  const VIEW_META = {
    overview: ["REPORT / 01", "Overview"],
    workstreams: ["REPORT / 02", "Outreach types"],
    campaigns: ["REPORT / 03", "Campaigns"],
    publishers: ["REPORT / 04", "Publishers"],
    topics: ["REPORT / 05", "Topics"],
    trend: ["REPORT / 06", "Weekly trend"],
    quality: ["REPORT / 07", "Data checks"]
  };

  const GUIDE_CONTENT = {
    overview: {
      kicker: "GUIDE / OVERVIEW",
      title: "How to read the overview",
      summary: "Start here for a quick read of the filtered data. This page shows recent change, link quality and the main areas to review.",
      blocks: [
        ["FILTERS", "Choose what to include", "Market, year, week and outreach type control every number on the page. The row count shows how many records are included."],
        ["SUMMARY", "Read the main result", "Shows whether backlinks are up, down or stable, which campaign has the most links and whether publisher concentration or DR needs attention."],
        ["MAIN NUMBERS", "Check volume and quality", "The large cards show backlinks, new domains, median DR and the share of links from DR 50+ publishers. The smaller row adds articles, domains, campaigns, average DR and the share of links coming from the five most-used publishers."],
        ["RECENT RESULTS", "Check weekly change", "The chart shows backlinks and articles by week against the four-week average. Quick checks summarise change, DR, new domains and publisher concentration."],
        ["LINK MIX", "Check balance", "Topic share shows where links are going, DR ranges show publisher strength and publisher concentration shows reliance on the most-used domains."],
        ["NEXT STEPS", "Find items to review", "Shows the top five campaigns, the highest-DR placement and three recommendations based on fixed thresholds. These recommendations do not use AI."]
      ],
      metrics: ["Backlinks", "New domains", "Median DR", "Links from DR 50+ publishers", "Links from top 5 publishers"],
      watch: ["Check the comparison period", "For one selected week, the page compares it with the previous four-week average. With all weeks selected, it compares the latest four weeks with the four before them."],
      next: ["Compare the three outreach types behind these totals.", "workstreams", "Open Outreach types"]
    },
    workstreams: {
      kicker: "GUIDE / WORKSTREAMS",
      title: "Compare outreach types",
      summary: "Use this page to compare Editorial outreach, Digital PR and Volume outreach without mixing quantity and quality into one score.",
      blocks: [
        ["DEFINITIONS", "Understand the three types", "The first row explains how each type of outreach works and what it is mainly used for."],
        ["VOLUME + DR", "Compare backlinks and median DR", "Bars show backlink volume and the line shows median publisher DR. The two measures stay separate so high volume is not treated as high quality."],
        ["SUMMARY CARDS", "Check share, cost and status", "Each card shows share of backlinks, median DR, average recorded cost per link and the percentage of links still live."],
        ["TABLE", "Compare the exact values", "The table adds articles, backlinks per article, domains, new domains, DR 50+ share and average relevance for all three outreach types."]
      ],
      metrics: ["Backlinks", "Articles", "Backlinks / article", "Domains", "Median DR", "DR 50+", "Cost / link", "Live rate"],
      watch: ["Make sure costs are recorded in the same way", "A full Digital PR campaign cost cannot be compared directly with a single placement cost unless both are split across backlink rows using the same method."],
      next: ["See which campaigns produced these results.", "campaigns", "Open Campaigns"]
    },
    campaigns: {
      kicker: "GUIDE / CAMPAIGNS",
      title: "Compare campaigns",
      summary: "Use this page to compare backlink volume, publisher variety and DR for each campaign.",
      blocks: [
        ["FILTERS + SEARCH", "Narrow the campaign list", "The page applies the main filters first. Search then finds a campaign by name or topic."],
        ["VOLUME", "Check backlinks and articles", "Backlinks shows total link rows. Articles counts unique publication URLs, while Backlinks / article shows the average number of links in each article."],
        ["PUBLISHERS + DR", "Check variety and quality", "Domains counts unique publishers. Median DR and DR 50+ show publisher strength. New domains counts publishers marked “Yes” on their first appearance in the reporting dataset."],
        ["SORTING", "Change the ranking", "Select any column heading to sort the table. The arrow shows which column is active and the sort direction."],
        ["CAMPAIGN DETAILS", "Open the article list", "Select a campaign name to see its totals and published articles, ordered by highest recorded DR. The first 12 are shown initially; use Show all for the complete list."]
      ],
      metrics: ["Backlinks", "Articles", "Backlinks / article", "Domains", "Median DR", "DR 50+", "New domains"],
      watch: ["Do not judge a campaign on volume alone", "A campaign can have many links from only a few publishers. Check domain variety and DR before deciding that it performed well."],
      next: ["Review the publishers behind the campaign results.", "publishers", "Open Publishers"]
    },
    publishers: {
      kicker: "GUIDE / PUBLISHERS",
      title: "Review publishers",
      summary: "Use this page to see which domains provide the most backlinks, their DR and how often they appear.",
      blocks: [
        ["FILTERS + SEARCH", "Find a publisher", "The main filters control which backlink rows are counted. Search then finds a specific publisher domain."],
        ["TOP 10 CHART", "See the most-used domains", "Ranks the ten publishers with the most backlinks in the filtered data."],
        ["USAGE", "Check how often a domain appears", "Backlinks and articles show volume. Campaigns and active weeks show whether the domain is used across different work and periods."],
        ["DR + NEW STATUS", "Check publisher strength", "Average DR shows the typical recorded score, Highest DR shows the highest score and NEW marks a domain flagged “Yes” on its first appearance in the source data."],
        ["ARTICLE", "Check the actual placement", "Open the highest-DR article recorded for that publisher to review relevance and editorial quality."]
      ],
      metrics: ["Backlinks", "Articles", "Campaigns", "Average DR", "Highest DR", "Active weeks"],
      watch: ["Repeated use is not always a problem", "A frequent publisher may be a strong partner or a sign of over-reliance. Check relevance and article quality before deciding."],
      next: ["See whether backlink activity is growing or slowing.", "trend", "Open Weekly trend"]
    },
    topics: {
      kicker: "GUIDE / TOPICS",
      title: "Compare topics",
      summary: "Use this page to see which topics receive the most backlinks, how many campaigns support them and their average DR.",
      blocks: [
        ["FILTERS", "Choose which topics to include", "Market, year, week and outreach type control which backlink rows are grouped into topic cards."],
        ["BACKLINKS", "Check topic volume", "Backlinks shows how many filtered link rows are assigned to each topic."],
        ["CAMPAIGNS", "Check campaign support", "Campaigns shows how many different campaigns cover the topic. A value of one means the topic depends on a single campaign."],
        ["AVERAGE DR", "Check publisher strength", "Average DR shows the average recorded publisher score for backlinks assigned to the topic."]
      ],
      metrics: ["Backlinks", "Campaigns", "Average DR"],
      watch: ["An uneven topic mix may be intentional", "Compare the results with campaign priorities and seasonality before treating a small topic share as a problem."],
      next: ["See which campaigns support each topic.", "campaigns", "Open Campaigns"]
    },
    trend: {
      kicker: "GUIDE / TREND",
      title: "Read the weekly trend",
      summary: "Use this page to track backlinks, published articles and average DR over time.",
      blocks: [
        ["FILTERS", "Choose the series", "Market, year and outreach type control the chart. The Week filter is intentionally hidden because this page needs several weeks to show a trend."],
        ["BACKLINK BARS", "Track weekly link volume", "Each bar shows the number of backlink rows recorded in that week."],
        ["ARTICLE + DR LINES", "Compare activity and quality", "The article line helps explain changes in link volume. The Average DR line shows whether publisher strength changed at the same time."],
        ["WEEKLY TABLE", "Read the exact values", "The table lists backlinks, unique articles, unique domains, average DR and new domains for each week."]
      ],
      metrics: ["Weekly backlinks", "Articles", "Unique domains", "Average DR", "New domains"],
      watch: ["One week is not a trend", "Campaign launches and publication dates can create one-off peaks. Look for movement across several weeks and use the four-week average on Overview."],
      next: ["Check which campaigns caused a peak or slowdown.", "campaigns", "Open Campaigns"]
    },
    quality: {
      kicker: "GUIDE / DATA QUALITY",
      title: "Check the imported data",
      summary: "Use this page to find gaps in the core reporting fields, invalid article links and possible duplicate records.",
      blocks: [
        ["ALL IMPORTED ROWS", "Check the full source", "This page checks every imported row. The report filters do not apply, so they cannot hide data problems."],
        ["COMPLETENESS SCORE", "Check the core reporting fields", "The score checks whether market, campaign, article URL, publisher domain, DR, year and week are filled in. These fields are recommended for a complete report, but they are not all required to load a file. Possible duplicates reduce the score."],
        ["ISSUE CARDS", "See what needs fixing", "The cards count missing domains, missing DR, missing campaign names, invalid article URLs and possible duplicates."],
        ["COLUMN MATCHING", "Check how headers were read", "Shows which source headers were matched to dashboard fields and which optional columns were not found."]
      ],
      metrics: ["Completeness score", "Missing domains", "Missing DR", "Invalid URLs", "Possible duplicates"],
      watch: ["Complete data can still be wrong", "This page checks structure, not factual accuracy. Important values should still be checked in the original source."],
      next: ["Return to Overview after checking the source data.", "overview", "Open Overview"]
    }
  };

  const state = {
    rows: [],
    rawHeaders: [],
    columnMap: {},
    source: null,
    lastLoaded: null,
    view: "overview",
    filters: { market: "All", year: "All", week: "All", flow: "All" },
    campaignSearch: "",
    publisherSearch: "",
    campaignSort: { key: "bl", direction: "desc" },
    publisherSort: { key: "bl", direction: "desc" },
    charts: {},
    refreshTimer: null,
    clockTimer: null
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const numberFormat = new Intl.NumberFormat("en-US");

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function safeUrl(value) {
    try {
      const url = new URL(String(value || ""));
      return ["http:", "https:"].includes(url.protocol) ? url.href : "";
    } catch {
      return "";
    }
  }

  function normalizeHeader(value) {
    return String(value || "")
      .replace(/^\uFEFF/, "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\p{L}\p{N}]+/gu, " ")
      .trim()
      .toLowerCase();
  }

  function resolveColumns(headers) {
    const normalized = new Map(headers.map(header => [normalizeHeader(header), header]));
    const mapping = {};

    Object.entries(FIELD_ALIASES).forEach(([field, aliases]) => {
      const match = aliases.map(normalizeHeader).find(alias => normalized.has(alias));
      if (match) mapping[field] = normalized.get(match);
    });

    return mapping;
  }

  function parseNumber(value) {
    if (typeof value === "number") return Number.isFinite(value) ? value : null;
    const clean = String(value ?? "").trim().replace(",", ".").replace(/[^\d.-]/g, "");
    const number = Number.parseFloat(clean);
    return Number.isFinite(number) ? number : null;
  }

  function parseBoolean(value) {
    return ["yes", "y", "true", "1", "new", "si", "sì", "oui"].includes(String(value ?? "").trim().toLowerCase());
  }

  function domainFromUrl(value) {
    try {
      return new URL(String(value || "")).hostname.replace(/^www\./, "");
    } catch {
      return "";
    }
  }

  function isoWeek(dateValue) {
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return null;
    const utc = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const day = utc.getUTCDay() || 7;
    utc.setUTCDate(utc.getUTCDate() + 4 - day);
    const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1));
    return Math.ceil((((utc - yearStart) / 86400000) + 1) / 7);
  }

  function normalizeRecords(records) {
    if (!records.length) throw new Error("No data was found.");

    const headers = [...new Set(records.flatMap(record => Object.keys(record)))];
    const columnMap = resolveColumns(headers);
    const recognised = Object.keys(columnMap);

    if (!recognised.includes("campaign") && !recognised.includes("articleUrl") && !recognised.includes("referringDomain")) {
      throw new Error("The dashboard could not find a Campaign, Article URL or Publisher Domain column. Compare your headers with the CSV template.");
    }

    const rows = records
      .filter(record => Object.values(record).some(value => String(value ?? "").trim()))
      .map((record, index) => {
        const get = field => String(record[columnMap[field]] ?? "").trim();
        const date = get("date");
        const articleUrl = get("articleUrl");
        const explicitDomain = get("referringDomain").replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
        const yearFromDate = date && !Number.isNaN(new Date(date).getTime()) ? new Date(date).getFullYear() : null;
        const rawCampaign = get("campaign");
        const rawTopic = get("topic");
        const rawFlow = get("sourceFlow");
        const rawDomain = explicitDomain || domainFromUrl(articleUrl);

        return {
          id: index + 1,
          market: get("market") || "Unspecified",
          sourceFlow: rawFlow || "Unspecified",
          campaign: rawCampaign || "Unassigned",
          topic: rawTopic || "Uncategorised",
          articleUrl,
          referringDomain: rawDomain,
          targetUrl: get("targetUrl"),
          dr: parseNumber(get("dr")),
          newRd: parseBoolean(get("newRd")),
          year: Math.trunc(parseNumber(get("year")) || yearFromDate || 0),
          week: Math.trunc(parseNumber(get("week")) || isoWeek(date) || 0),
          date,
          status: get("status"),
          linkType: get("linkType"),
          anchorText: get("anchorText"),
          cost: parseNumber(get("cost")),
          organicTraffic: parseNumber(get("organicTraffic")),
          topicalRelevance: parseNumber(get("topicalRelevance")),
          language: get("language"),
          firstSeen: get("firstSeen"),
          lastChecked: get("lastChecked"),
          campaignTarget: parseNumber(get("campaignTarget")),
          missing: {
            campaign: !rawCampaign,
            topic: !rawTopic,
            domain: !rawDomain,
            dr: parseNumber(get("dr")) === null,
            articleUrl: !articleUrl,
            year: !(parseNumber(get("year")) || yearFromDate),
            week: !(parseNumber(get("week")) || isoWeek(date))
          },
          raw: record
        };
      });

    if (!rows.length) throw new Error("No usable data rows were found. Check that the file contains values below the header row.");
    return { rows, headers, columnMap };
  }

  function parseCsv(text) {
    const source = String(text || "").replace(/^\uFEFF/, "");
    const matrix = [];
    let row = [];
    let cell = "";
    let quoted = false;

    for (let index = 0; index < source.length; index += 1) {
      const character = source[index];
      const next = source[index + 1];

      if (character === '"' && quoted && next === '"') {
        cell += '"';
        index += 1;
      } else if (character === '"') {
        quoted = !quoted;
      } else if (character === "," && !quoted) {
        row.push(cell);
        cell = "";
      } else if ((character === "\n" || character === "\r") && !quoted) {
        if (character === "\r" && next === "\n") index += 1;
        row.push(cell);
        if (row.some(value => value.trim())) matrix.push(row);
        row = [];
        cell = "";
      } else {
        cell += character;
      }
    }

    row.push(cell);
    if (row.some(value => value.trim())) matrix.push(row);
    if (matrix.length < 2) throw new Error("The CSV needs one header row and at least one data row.");

    const headers = matrix[0].map(header => header.trim());
    return matrix.slice(1).map(values => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])));
  }

  function extractSheetId(value) {
    const match = String(value || "").match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
    return match?.[1] || (/^[a-zA-Z0-9_-]{20,}$/.test(String(value || "").trim()) ? String(value).trim() : "");
  }

  async function fetchSheet(sheetId, sheetName) {
    const endpoint = `https://docs.google.com/spreadsheets/d/${encodeURIComponent(sheetId)}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}&_=${Date.now()}`;
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`The Google Sheet could not be opened (error ${response.status}). Check Viewer access and the sheet tab name.`);
    const text = await response.text();
    if (/^\s*<!doctype html/i.test(text)) throw new Error("Google asked for a sign-in. Set the sheet to “Anyone with the link → Viewer” and try again.");
    return parseCsv(text);
  }

  function seededRandom(seed) {
    let value = seed % 2147483647;
    if (value <= 0) value += 2147483646;
    return () => ((value = value * 16807 % 2147483647) - 1) / 2147483646;
  }

  function buildDemoRecords() {
    const random = seededRandom(28072026);
    const markets = ["Italy", "Spain", "France", "Germany", "United Kingdom", "Netherlands"];
    const flows = ["Editorial outreach", "Digital PR", "Volume outreach"];
    const flowModels = {
      "Editorial outreach": {
        skipRate: 0.34,
        articleRange: [1, 2],
        backlinkRange: [1, 2],
        domainExponent: 1.2,
        costRange: [180, 480],
        relevanceRange: [76, 98],
        lostRate: 0.05
      },
      "Digital PR": {
        skipRate: 0.48,
        articleRange: [2, 4],
        backlinkRange: [1, 3],
        domainExponent: 1.9,
        costRange: [110, 320],
        relevanceRange: [68, 96],
        lostRate: 0.04
      },
      "Volume outreach": {
        skipRate: 0.18,
        articleRange: [2, 4],
        backlinkRange: [2, 5],
        domainExponent: 0.52,
        costRange: [35, 110],
        relevanceRange: [44, 78],
        lostRate: 0.12
      }
    };
    const topics = ["Energy", "Technology", "Mobility", "Sustainability", "Consumer", "Culture"];
    const campaigns = {
      Italy: ["Heat index", "Future homes", "EV cities", "Summer costs", "Smart living"],
      Spain: ["Solar pulse", "City mobility", "Cooling study", "Digital homes", "Green habits"],
      France: ["Home outlook", "Energy map", "EV barometer", "Winter index", "Tech habits"],
      Germany: ["Energy transition", "Urban mobility", "Smart households", "Heating outlook", "Digital lifestyles"],
      "United Kingdom": ["Home efficiency", "EV readiness", "Living costs", "Green cities", "Connected homes"],
      Netherlands: ["Circular living", "Heat pump adoption", "Cycling cities", "Home technology", "Climate habits"]
    };
    const campaignTopics = {
      "Heat index": "Energy",
      "Future homes": "Technology",
      "EV cities": "Mobility",
      "Summer costs": "Consumer",
      "Smart living": "Technology",
      "Solar pulse": "Energy",
      "City mobility": "Mobility",
      "Cooling study": "Sustainability",
      "Digital homes": "Technology",
      "Green habits": "Sustainability",
      "Home outlook": "Consumer",
      "Energy map": "Energy",
      "EV barometer": "Mobility",
      "Winter index": "Energy",
      "Tech habits": "Technology",
      "Energy transition": "Sustainability",
      "Urban mobility": "Mobility",
      "Smart households": "Technology",
      "Heating outlook": "Energy",
      "Digital lifestyles": "Culture",
      "Home efficiency": "Sustainability",
      "EV readiness": "Mobility",
      "Living costs": "Consumer",
      "Green cities": "Sustainability",
      "Connected homes": "Technology",
      "Circular living": "Sustainability",
      "Heat pump adoption": "Energy",
      "Cycling cities": "Mobility",
      "Home technology": "Technology",
      "Climate habits": "Sustainability"
    };
    const campaignActivity = {
      "Energy transition": 1.28,
      "Solar pulse": 1.18,
      "Future homes": 1.12,
      "Living costs": 0.78,
      "Climate habits": 0.68,
      "Digital lifestyles": 0.62
    };
    const publishers = [
      ["dailyatlas.example", 71, 2025, 1], ["currentjournal.example", 64, 2025, 1],
      ["northwire.example", 58, 2025, 1], ["urbanbrief.example", 52, 2025, 1],
      ["signalpost.example", 47, 2025, 1], ["fieldnotes.example", 42, 2025, 1],
      ["themorning.example", 38, 2025, 1], ["futuredesk.example", 34, 2025, 1],
      ["localview.example", 29, 2025, 1], ["weekreport.example", 24, 2025, 1],
      ["openledger.example", 19, 2025, 1], ["newspulse.example", 14, 2025, 1],
      ["brightwire.example", 55, 2026, 4], ["cityscope.example", 33, 2026, 9],
      ["ecodaily.example", 61, 2026, 15], ["regionalpost.example", 22, 2026, 20]
    ];
    const records = [];
    const seenDomains = new Set();
    const languages = {
      Italy: "Italian",
      Spain: "Spanish",
      France: "French",
      Germany: "German",
      "United Kingdom": "English",
      Netherlands: "Dutch"
    };
    const randomInt = (min, max) => min + Math.floor(random() * (max - min + 1));

    for (const year of [2025, 2026]) {
      const maxWeek = year === 2025 ? 52 : 28;
      for (let week = 1; week <= maxWeek; week += 1) {
        markets.forEach((market, marketIndex) => {
          campaigns[market].forEach((campaign, campaignIndex) => {
            const flow = flows[(campaignIndex + week + marketIndex) % flows.length];
            const model = flowModels[flow];
            const periodActivity = year === 2026
              ? week <= 8 ? 1.05 : week <= 14 ? 0.82 : week <= 22 ? 1.22 : 0.78
              : week >= 20 && week <= 34 ? 1.12 : 0.96;
            const activity = (campaignActivity[campaign] || 1) * periodActivity;
            const adjustedSkipRate = Math.max(0.05, Math.min(0.88, model.skipRate + (1 - activity) * 0.45));
            if (random() < adjustedSkipRate) return;
            const articleCount = randomInt(...model.articleRange);
            const topic = campaignTopics[campaign] || topics[(campaignIndex + marketIndex) % topics.length];
            const availablePublishers = publishers.filter(([, , startYear, startWeek]) => (
              year > startYear || (year === startYear && week >= startWeek)
            ));
            for (let article = 0; article < articleCount; article += 1) {
              const publisherIndex = Math.min(
                availablePublishers.length - 1,
                Math.floor((random() ** model.domainExponent) * availablePublishers.length)
              );
              const [domain, baseDr] = availablePublishers[publisherIndex];
              const backlinks = randomInt(...model.backlinkRange);
              const isNew = !seenDomains.has(domain);
              const publicationDate = new Date(Date.UTC(year, 0, 1 + (week - 1) * 7 + article)).toISOString().slice(0, 10);
              const status = random() < model.lostRate ? "Lost" : "Live";
              const relevance = randomInt(...model.relevanceRange);
              seenDomains.add(domain);

              for (let backlink = 0; backlink < backlinks; backlink += 1) {
                records.push({
                  Market: market,
                  "Source Flow": flow,
                  "Campaign Name": campaign,
                  "Campaign Topic": topic,
                  "Article URL": `https://${domain}/${year}/${week}/${campaign.toLowerCase().replaceAll(" ", "-")}-${article + 1}`,
                  "Referring Domain": domain,
                  "Target URL": `https://client.example/resources/${topic.toLowerCase()}/${backlink + 1}/`,
                  DR: Math.max(5, Math.min(88, Math.round(baseDr + (random() - 0.5) * 12))),
                  "New RD": isNew && backlink === 0 ? "Yes" : "No",
                  Year: year,
                  Week: week,
                  Date: publicationDate,
                  "Link Status": status,
                  "Link Type": random() < 0.78 ? "Follow" : "Nofollow",
                  "Anchor Text": `${topic.toLowerCase()} guide`,
                  Cost: randomInt(...model.costRange),
                  "Organic Traffic": Math.round((baseDr ** 2) * randomInt(8, 24)),
                  "Topical Relevance": relevance,
                  Language: languages[market],
                  "First Seen": publicationDate,
                  "Last Checked": "2026-07-28",
                  "Campaign Target": flow === "Volume outreach" ? 80 : flow === "Digital PR" ? 45 : 24
                });
              }
            }
          });
        });
      }
    }

    return records;
  }

  function showLoading(message = "Preparing the report…") {
    $("#welcome").hidden = true;
    $("#dashboard").hidden = true;
    $("#loading").hidden = false;
    $("#loading p").textContent = message;
  }

  function showWelcome() {
    $("#loading").hidden = true;
    $("#dashboard").hidden = true;
    $("#welcome").hidden = false;
    stopRefresh();
    closeMobileMenu();
  }

  function showSourceError(message) {
    const element = $("#source-error");
    element.textContent = message;
    element.hidden = false;
  }

  function clearSourceError() {
    $("#source-error").hidden = true;
  }

  function setData(records, source, preserveFilters = false) {
    const normalised = normalizeRecords(records);
    state.rows = normalised.rows;
    state.rawHeaders = normalised.headers;
    state.columnMap = normalised.columnMap;
    state.source = source;
    state.lastLoaded = new Date();

    if (!preserveFilters) {
      const availableYears = unique(state.rows.map(row => row.year).filter(Boolean)).sort((a, b) => b - a);
      state.filters = {
        market: "All",
        year: availableYears[0] ? String(availableYears[0]) : "All",
        week: "All",
        flow: "All"
      };
      state.view = "overview";
      state.campaignSearch = "";
      state.publisherSearch = "";
    }

    populateFilters();
    updateSourceStamp();
    $("#loading").hidden = true;
    $("#welcome").hidden = true;
    $("#dashboard").hidden = false;
    setView(state.view);
    startRefresh();
  }

  function unique(values) {
    return [...new Set(values)];
  }

  function optionList(values, selected, allLabel) {
    return `<option value="All"${selected === "All" ? " selected" : ""}>${escapeHtml(allLabel)}</option>` +
      values.map(value => `<option value="${escapeHtml(value)}"${String(value) === String(selected) ? " selected" : ""}>${escapeHtml(value)}</option>`).join("");
  }

  function filteredRows({ ignoreWeek = false, filters = state.filters } = {}) {
    return state.rows.filter(row => {
      if (filters.market !== "All" && row.market !== filters.market) return false;
      if (filters.year !== "All" && String(row.year) !== String(filters.year)) return false;
      if (!ignoreWeek && filters.week !== "All" && String(row.week) !== String(filters.week)) return false;
      if (filters.flow !== "All" && row.sourceFlow !== filters.flow) return false;
      return true;
    });
  }

  function populateFilters() {
    const markets = unique(state.rows.map(row => row.market).filter(Boolean)).sort();
    const years = unique(state.rows.map(row => row.year).filter(Boolean)).sort((a, b) => b - a);
    const flows = unique(state.rows.map(row => row.sourceFlow).filter(Boolean)).sort();

    $("#filter-market").innerHTML = optionList(markets, state.filters.market, "All markets");
    $("#filter-year").innerHTML = optionList(years, state.filters.year, "All years");
    $("#filter-flow").innerHTML = optionList(flows, state.filters.flow, "All outreach types");
    populateWeeks();
  }

  function populateWeeks() {
    const weeks = unique(filteredRows({ ignoreWeek: true }).map(row => row.week).filter(Boolean)).sort((a, b) => a - b);
    if (state.filters.week !== "All" && !weeks.map(String).includes(String(state.filters.week))) state.filters.week = "All";
    $("#filter-week").innerHTML = optionList(weeks, state.filters.week, "All weeks");
  }

  function updateSourceStamp() {
    const label = state.source?.type === "sheet"
      ? `Sheet · ${state.source.sheetName}`
      : state.source?.type === "csv"
        ? state.source.fileName
        : "Sample data";
    $("#source-label").textContent = label;
    updateClock();
    $("#refresh-data").disabled = state.source?.type !== "sheet";
    $("#refresh-data").title = state.source?.type === "sheet" ? "Update data" : "Only Google Sheets can be updated";
  }

  function updateClock() {
    if (!state.lastLoaded) return;
    const minutes = Math.floor((Date.now() - state.lastLoaded.getTime()) / 60000);
    $("#updated-label").textContent = minutes < 1 ? "Updated just now" : `Updated ${minutes}m ago`;
  }

  function startRefresh() {
    stopRefresh();
    state.clockTimer = window.setInterval(updateClock, 60000);
    if (state.source?.type !== "sheet") return;
    const interval = Math.max(1, Number(CONFIG.refreshMinutes) || 5) * 60000;
    state.refreshTimer = window.setInterval(() => refreshSheet(true), interval);
  }

  function stopRefresh() {
    if (state.refreshTimer) window.clearInterval(state.refreshTimer);
    if (state.clockTimer) window.clearInterval(state.clockTimer);
    state.refreshTimer = null;
    state.clockTimer = null;
  }

  async function refreshSheet(silent = false) {
    if (state.source?.type !== "sheet") return;
    const button = $("#refresh-data");
    if (!silent) button.classList.add("is-loading");
    try {
      const records = await fetchSheet(state.source.sheetId, state.source.sheetName);
      setData(records, state.source, true);
    } catch (error) {
      if (!silent) window.alert(`The data could not be updated. ${error.message}`);
    } finally {
      button.classList.remove("is-loading");
    }
  }

  function setView(view) {
    state.view = view;
    $$(".view").forEach(element => {
      const active = element.id === `view-${view}`;
      element.hidden = !active;
      element.classList.toggle("is-active", active);
    });
    $$(".nav-item").forEach(button => button.classList.toggle("is-active", button.dataset.view === view));
    $("#view-kicker").textContent = VIEW_META[view][0];
    $("#view-title").textContent = VIEW_META[view][1];
    $("#filter-bar").hidden = view === "quality";
    $("#filter-week-field").hidden = view === "trend";
    closeMobileMenu();
    render();
  }

  function metrics(rows) {
    const articles = new Set(rows.map(row => row.articleUrl).filter(Boolean));
    const domains = new Set(rows.map(row => row.referringDomain).filter(Boolean));
    const campaigns = new Set(rows.map(row => row.campaign).filter(value => value !== "Unassigned"));
    const drValues = rows.map(row => row.dr).filter(value => value !== null);
    const newDomains = new Set(rows.filter(row => row.newRd).map(row => row.referringDomain).filter(Boolean));
    const qualityLinks = rows.filter(row => row.dr !== null && row.dr >= 50).length;
    const statusRows = rows.filter(row => row.status);
    const liveLinks = statusRows.filter(row => ["live", "active", "published"].includes(row.status.toLowerCase())).length;
    const lostLinks = statusRows.filter(row => ["lost", "removed", "inactive"].includes(row.status.toLowerCase())).length;
    const linkTypeRows = rows.filter(row => row.linkType);
    const followLinks = linkTypeRows.filter(row => {
      const type = row.linkType.toLowerCase();
      return (type.includes("follow") && !type.includes("nofollow")) || type === "dofollow";
    }).length;
    const costs = rows.map(row => row.cost).filter(value => value !== null);
    return {
      bl: rows.length,
      articles: articles.size,
      domains: domains.size,
      avgDr: drValues.length ? drValues.reduce((sum, value) => sum + value, 0) / drValues.length : null,
      medianDr: median(drValues),
      qualityLinks,
      qualityShare: rows.length ? qualityLinks / rows.length * 100 : 0,
      campaigns: campaigns.size,
      newRd: newDomains.size,
      liveLinks: statusRows.length ? liveLinks : null,
      lostLinks: statusRows.length ? lostLinks : null,
      followShare: linkTypeRows.length ? followLinks / linkTypeRows.length * 100 : null,
      totalCost: costs.length ? costs.reduce((sum, value) => sum + value, 0) : null,
      costPerLink: costs.length ? costs.reduce((sum, value) => sum + value, 0) / costs.length : null
    };
  }

  function median(values) {
    if (!values.length) return null;
    const sorted = [...values].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
  }

  function averagePointMetrics(points) {
    if (!points.length) return null;
    const keys = ["bl", "articles", "domains", "avgDr", "medianDr", "campaigns", "newRd", "qualityShare"];
    return Object.fromEntries(keys.map(key => {
      const values = points.map(point => point[key]).filter(value => value !== null && value !== undefined);
      return [key, values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null];
    }));
  }

  function trendComparison(trends) {
    if (!trends.length) return { current: null, baseline: null, delta: null, label: "No earlier weeks to compare" };

    if (state.filters.week !== "All") {
      const currentIndex = trends.findIndex(point => String(point.week) === String(state.filters.week));
      if (currentIndex < 0) return { current: null, baseline: null, delta: null, label: "No earlier weeks to compare" };
      const current = trends[currentIndex];
      const baseline = averagePointMetrics(trends.slice(Math.max(0, currentIndex - 4), currentIndex));
      return {
        current,
        baseline,
        delta: baseline ? percentageDelta(current.bl, baseline.bl) : null,
        label: "vs previous 4-week average"
      };
    }

    const recent = trends.slice(-4);
    const previous = trends.slice(-8, -4);
    const current = averagePointMetrics(recent);
    const baseline = averagePointMetrics(previous);
    return {
      current,
      baseline,
      delta: current && baseline ? percentageDelta(current.bl, baseline.bl) : null,
      label: "last 4 weeks vs previous 4"
    };
  }

  function rollingAverage(values, windowSize = 4) {
    return values.map((_, index) => {
      const start = Math.max(0, index - windowSize + 1);
      const slice = values.slice(start, index + 1);
      return slice.reduce((sum, value) => sum + value, 0) / slice.length;
    });
  }

  function campaignGroups(rows) {
    const groups = new Map();
    rows.forEach(row => {
      if (!groups.has(row.campaign)) {
        groups.set(row.campaign, {
          name: row.campaign,
          topicCounts: new Map(),
          rows: [],
          articles: new Set(),
          domains: new Set(),
          dr: [],
          newDomains: new Set()
        });
      }
      const group = groups.get(row.campaign);
      group.rows.push(row);
      if (row.articleUrl) group.articles.add(row.articleUrl);
      if (row.referringDomain) group.domains.add(row.referringDomain);
      if (row.dr !== null) group.dr.push(row.dr);
      if (row.newRd && row.referringDomain) group.newDomains.add(row.referringDomain);
      group.topicCounts.set(row.topic, (group.topicCounts.get(row.topic) || 0) + 1);
    });

    return [...groups.values()].map(group => ({
      name: group.name,
      topic: [...group.topicCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || "Uncategorised",
      bl: group.rows.length,
      articles: group.articles.size,
      blPerArticle: group.articles.size ? group.rows.length / group.articles.size : 0,
      domains: group.domains.size,
      avgDr: group.dr.length ? group.dr.reduce((sum, value) => sum + value, 0) / group.dr.length : null,
      medianDr: median(group.dr),
      qualityShare: group.rows.length ? group.rows.filter(row => row.dr !== null && row.dr >= 50).length / group.rows.length * 100 : 0,
      bestDr: group.dr.length ? Math.max(...group.dr) : null,
      newRd: group.newDomains.size,
      rows: group.rows
    }));
  }

  function publisherGroups(rows) {
    const groups = new Map();
    rows.forEach(row => {
      const domain = row.referringDomain || "Unknown domain";
      if (!groups.has(domain)) {
        groups.set(domain, { domain, rows: [], articles: new Set(), campaigns: new Set(), weeks: new Set(), dr: [], isNew: false });
      }
      const group = groups.get(domain);
      group.rows.push(row);
      if (row.articleUrl) group.articles.add(row.articleUrl);
      if (row.campaign) group.campaigns.add(row.campaign);
      if (row.week) group.weeks.add(`${row.year}-${row.week}`);
      if (row.dr !== null) group.dr.push(row.dr);
      group.isNew ||= row.newRd;
    });

    return [...groups.values()].map(group => ({
      domain: group.domain,
      bl: group.rows.length,
      articles: group.articles.size,
      campaigns: group.campaigns.size,
      weeks: group.weeks.size,
      avgDr: group.dr.length ? group.dr.reduce((sum, value) => sum + value, 0) / group.dr.length : null,
      bestDr: group.dr.length ? Math.max(...group.dr) : null,
      isNew: group.isNew,
      bestUrl: [...group.rows].sort((a, b) => (b.dr || 0) - (a.dr || 0))[0]?.articleUrl || ""
    }));
  }

  function topicGroups(rows) {
    const groups = new Map();
    rows.forEach(row => {
      if (!groups.has(row.topic)) groups.set(row.topic, { name: row.topic, rows: [], campaigns: new Set(), articles: new Set(), dr: [] });
      const group = groups.get(row.topic);
      group.rows.push(row);
      group.campaigns.add(row.campaign);
      if (row.articleUrl) group.articles.add(row.articleUrl);
      if (row.dr !== null) group.dr.push(row.dr);
    });
    return [...groups.values()].map(group => ({
      name: group.name,
      bl: group.rows.length,
      articles: group.articles.size,
      campaigns: group.campaigns.size,
      avgDr: group.dr.length ? group.dr.reduce((sum, value) => sum + value, 0) / group.dr.length : null
    })).sort((a, b) => b.bl - a.bl);
  }

  function workstreamGroups(rows) {
    const order = ["Editorial outreach", "Digital PR", "Volume outreach"];
    return order.map(flow => {
      const flowRows = rows.filter(row => row.sourceFlow === flow);
      const result = metrics(flowRows);
      const relevanceValues = flowRows
        .map(row => row.topicalRelevance)
        .filter(value => value !== null);
      const statusRows = flowRows.filter(row => row.status);
      return {
        flow,
        ...result,
        blPerArticle: result.articles ? result.bl / result.articles : 0,
        avgRelevance: relevanceValues.length
          ? relevanceValues.reduce((sum, value) => sum + value, 0) / relevanceValues.length
          : null,
        liveRate: statusRows.length && result.liveLinks !== null
          ? result.liveLinks / statusRows.length * 100
          : null
      };
    });
  }

  function trendGroups() {
    const rows = filteredRows({ ignoreWeek: true });
    const groups = new Map();
    rows.forEach(row => {
      if (!row.week) return;
      const key = state.filters.year === "All" ? `${row.year}-W${String(row.week).padStart(2, "0")}` : row.week;
      if (!groups.has(key)) groups.set(key, { key, year: row.year, week: row.week, rows: [] });
      groups.get(key).rows.push(row);
    });
    return [...groups.values()]
      .sort((a, b) => a.year - b.year || a.week - b.week)
      .map(group => ({ ...group, ...metrics(group.rows) }));
  }

  function formatMetric(value, decimals = 0) {
    if (value === null || value === undefined || Number.isNaN(value)) return "—";
    return decimals ? Number(value).toFixed(decimals) : numberFormat.format(Math.round(value));
  }

  function percentageDelta(current, previous) {
    if (!previous && previous !== 0) return null;
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  }

  function render() {
    if (!state.rows.length || $("#dashboard").hidden) return;
    const rows = filteredRows();
    $("#filtered-count").textContent = numberFormat.format(rows.length);
    $("#selection-summary").textContent = selectionSummary();

    if (state.view === "overview") renderOverview(rows);
    if (state.view === "workstreams") renderWorkstreams(rows);
    if (state.view === "campaigns") renderCampaigns(rows);
    if (state.view === "publishers") renderPublishers(rows);
    if (state.view === "topics") renderTopics(rows);
    if (state.view === "trend") renderTrend();
    if (state.view === "quality") renderQuality();
  }

  function selectionSummary() {
    const parts = [
      state.filters.market === "All" ? "All markets" : state.filters.market,
      state.filters.year === "All" ? "All years" : state.filters.year,
      state.filters.week === "All" ? "All weeks" : `Week ${state.filters.week}`,
      state.filters.flow === "All" ? "All outreach types" : state.filters.flow
    ];
    return parts.join(" · ");
  }

  function renderOverview(rows) {
    const current = metrics(rows);
    const trends = trendGroups();
    const comparison = trendComparison(trends);
    const baseline = state.filters.week === "All" ? null : comparison.baseline;
    const definitions = [
      { label: "Backlinks", key: "bl", decimals: 0, deltaType: "percent", helper: "Link rows in this selection" },
      { label: "New domains", key: "newRd", decimals: 0, deltaType: "percent", helper: "Publishers marked as new" },
      { label: "Median DR", key: "medianDr", decimals: 0, deltaType: "points", helper: "Typical publisher DR" },
      { label: "DR 50+ share", key: "qualityShare", decimals: 0, suffix: "%", deltaType: "points", helper: "Links from DR 50+ publishers" }
    ];

    $("#kpi-grid").innerHTML = definitions.map((definition, index) => {
      const previousValue = baseline?.[definition.key];
      const delta = previousValue === null || previousValue === undefined
        ? null
        : definition.deltaType === "points"
          ? current[definition.key] - previousValue
          : percentageDelta(current[definition.key], previousValue);
      const deltaClass = delta > 0 ? "is-up" : delta < 0 ? "is-down" : "";
      const deltaCopy = delta === null
        ? (state.filters.week === "All" ? definition.helper : "Not enough earlier weeks")
        : `${delta > 0 ? "↑" : delta < 0 ? "↓" : "→"} ${Math.abs(delta).toFixed(0)}${definition.deltaType === "points" ? " pts" : "%"} vs 4-week average`;
      return `
        <article class="kpi-card">
          <div class="kpi-card__top"><p class="micro-label">${escapeHtml(definition.label)}</p><span class="kpi-card__index">0${index + 1}</span></div>
          <div class="kpi-card__value">${formatMetric(current[definition.key], definition.decimals)}${definition.suffix || ""}</div>
          <div class="kpi-card__delta ${deltaClass}">${escapeHtml(deltaCopy)}</div>
        </article>`;
    }).join("");

    const publishers = publisherGroups(rows).sort((a, b) => b.bl - a.bl);
    const topFiveShare = rows.length ? publishers.slice(0, 5).reduce((sum, publisher) => sum + publisher.bl, 0) / rows.length * 100 : 0;
    const secondary = [
      ["Articles", current.articles],
      ["Unique domains", current.domains],
      ["Campaigns", current.campaigns],
      ["Average DR", formatMetric(current.avgDr, 1)],
      ["Links from top 5 publishers", `${formatMetric(topFiveShare)}%`]
    ];
    $("#secondary-metrics").innerHTML = secondary.map(([label, value]) => `
      <div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("");

    const campaigns = campaignGroups(rows).sort((a, b) => b.bl - a.bl);
    const topics = topicGroups(rows);
    renderExecutiveBrief(rows, current, comparison, campaigns, topFiveShare);
    renderActivityChart(trends);
    renderTopicShare(topics, rows.length);
    renderAuthority(rows);
    renderPublisherMix(publishers, rows.length);
    renderPerformanceSignals(current, comparison, topFiveShare);
    renderActions(current, campaigns, topFiveShare);

    $("#leader-list").innerHTML = campaigns.length
      ? campaigns.slice(0, 5).map((campaign, index) => `
          <div class="leader-row">
            <span class="leader-row__rank">${String(index + 1).padStart(2, "0")}</span>
            <span class="leader-row__name">${escapeHtml(campaign.name)}</span>
            <span class="leader-row__metric"><strong>${formatMetric(campaign.bl)}</strong>links</span>
            <span class="leader-row__metric"><strong>${formatMetric(campaign.articles)}</strong>articles</span>
            <span class="leader-row__metric"><strong>${formatMetric(campaign.avgDr, 0)}</strong>avg. DR</span>
          </div>`).join("")
      : `<p class="empty-state">No campaigns match these filters.</p>`;

    const best = [...rows].filter(row => row.referringDomain).sort((a, b) => (b.dr || 0) - (a.dr || 0))[0];
    $("#best-placement").innerHTML = best
      ? `<div>
          <div class="placement-domain">${escapeHtml(best.referringDomain)}</div>
          <span>${escapeHtml(best.campaign)} · ${escapeHtml(best.market)}</span>
          ${safeUrl(best.articleUrl) ? `<a class="placement-link" href="${escapeHtml(safeUrl(best.articleUrl))}" target="_blank" rel="noopener noreferrer">OPEN ARTICLE ↗</a>` : ""}
        </div>
        <div class="placement-meta"><span>Publisher DR</span><strong>${formatMetric(best.dr)}</strong></div>`
      : `<div><div class="placement-domain">No placement found</div><span>Try resetting the filters.</span></div>`;
  }

  function renderWorkstreams(rows) {
    const groups = workstreamGroups(rows);
    const roleLabels = {
      "Editorial outreach": "Direct",
      "Digital PR": "Broad coverage",
      "Volume outreach": "High volume"
    };
    const toneClasses = {
      "Editorial outreach": "editorial",
      "Digital PR": "pr",
      "Volume outreach": "volume"
    };
    $("#workstream-selection-summary").textContent = selectionSummary();

    $("#workstream-profile-list").innerHTML = groups.map(group => {
      const share = rows.length ? group.bl / rows.length * 100 : 0;
      return `
        <div class="workstream-profile workstream-profile--${toneClasses[group.flow]}">
          <header><i aria-hidden="true"></i><div><strong>${escapeHtml(group.flow)}</strong><small>${escapeHtml(roleLabels[group.flow])}</small></div><em>${share.toFixed(0)}%</em></header>
          <div>
            <span><small>Median DR</small><strong>${formatMetric(group.medianDr)}</strong></span>
            <span><small>Cost / link</small><strong>${formatMetric(group.costPerLink)}</strong></span>
            <span><small>Live rate</small><strong>${group.liveRate === null ? "—" : `${formatMetric(group.liveRate)}%`}</strong></span>
          </div>
        </div>`;
    }).join("");

    $("#workstream-table").innerHTML = `
      <thead><tr>
        <th scope="col">Outreach type</th>
        <th scope="col">Backlinks</th>
        <th scope="col">Share of backlinks</th>
        <th scope="col">Articles</th>
        <th scope="col">Backlinks / article</th>
        <th scope="col">Domains</th>
        <th scope="col">New domains</th>
        <th scope="col">Median DR</th>
        <th scope="col">DR 50+</th>
        <th scope="col">Avg. relevance</th>
        <th scope="col">Cost / link</th>
        <th scope="col">Live rate</th>
      </tr></thead>
      <tbody>${rows.length ? groups.map(group => {
        const share = group.bl / rows.length * 100;
        return `
          <tr>
            <td class="cell-workstream"><i class="flow-dot flow-dot--${toneClasses[group.flow]}" aria-hidden="true"></i>${escapeHtml(group.flow)}</td>
            <td class="cell-primary">${formatMetric(group.bl)}</td>
            <td>${formatMetric(share)}%</td>
            <td>${formatMetric(group.articles)}</td>
            <td>${formatMetric(group.blPerArticle, 1)}</td>
            <td>${formatMetric(group.domains)}</td>
            <td class="${group.newRd ? "cell-good" : ""}">${group.newRd ? `+${formatMetric(group.newRd)}` : "—"}</td>
            <td>${formatMetric(group.medianDr)}</td>
            <td>${formatMetric(group.qualityShare)}%</td>
            <td>${group.avgRelevance === null ? "—" : formatMetric(group.avgRelevance)}</td>
            <td>${formatMetric(group.costPerLink)}</td>
            <td>${group.liveRate === null ? "—" : `${formatMetric(group.liveRate)}%`}</td>
          </tr>`;
      }).join("") : `<tr><td colspan="12" class="empty-state">No outreach data matches these filters.</td></tr>`}</tbody>`;

    renderWorkstreamChart(groups);
  }

  function renderWorkstreamChart(groups) {
    destroyChart("workstream");
    const canvas = $("#workstream-chart");
    if (!canvas || typeof Chart === "undefined") return;
    const options = baseChartOptions();
    options.plugins.legend = {
      display: true,
      align: "end",
      labels: {
        boxWidth: 10,
        boxHeight: 10,
        padding: 14,
        color: COLORS.muted,
        font: { family: "IBM Plex Mono", size: 10 }
      }
    };
    options.scales.y2 = {
      position: "right",
      min: 0,
      max: 100,
      grid: { display: false },
      border: { display: false },
      ticks: { color: COLORS.ink, font: { family: "IBM Plex Mono", size: 10 }, precision: 0 }
    };
    state.charts.workstream = new Chart(canvas, {
      data: {
        labels: groups.map(group => group.flow),
        datasets: [
          {
            type: "bar",
            label: "Backlinks",
            data: groups.map(group => group.bl),
            backgroundColor: [COLORS.blue, COLORS.orange, COLORS.signal],
            borderColor: COLORS.ink,
            borderWidth: 1,
            barPercentage: 0.62,
            categoryPercentage: 0.74,
            order: 2
          },
          {
            type: "line",
            label: "Median DR",
            data: groups.map(group => group.medianDr),
            yAxisID: "y2",
            borderColor: COLORS.ink,
            backgroundColor: COLORS.ink,
            pointBackgroundColor: COLORS.surface,
            pointBorderColor: COLORS.ink,
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            borderWidth: 2,
            tension: 0.22,
            order: 1
          }
        ]
      },
      options
    });
  }

  function renderExecutiveBrief(rows, current, comparison, campaigns, concentration) {
    if (!rows.length) {
      $("#executive-headline").textContent = "No data matches these filters.";
      $("#executive-summary").textContent = "Reset one or more filters to show the report again.";
      $("#period-comparison").innerHTML = `<strong>—</strong><span>No comparison</span>`;
      return;
    }

    const delta = comparison.delta;
    const headline = delta === null
      ? "Summary for the filtered data."
      : delta > 10
        ? "Backlink volume is up."
        : delta < -10
          ? "Backlink volume is down."
          : "Backlink volume is stable.";
    const topCampaign = campaigns[0];
    const campaignShare = topCampaign && current.bl ? topCampaign.bl / current.bl * 100 : 0;
    const changeCopy = delta === null
      ? "There are not enough earlier weeks for a comparison."
      : `Backlinks are ${Math.abs(delta).toFixed(0)}% ${delta >= 0 ? "above" : "below"} the comparison period.`;
    const campaignCopy = topCampaign
      ? `${topCampaign.name} has the most backlinks: ${formatMetric(topCampaign.bl)}, or ${campaignShare.toFixed(0)}% of the filtered total.`
      : "No campaign names are available.";
    const riskCopy = concentration >= 60
      ? `The top five publishers account for ${concentration.toFixed(0)}% of backlinks, so the results rely on a small group of domains.`
      : `${current.qualityShare.toFixed(0)}% of backlinks come from DR 50+ domains, and ${formatMetric(current.newRd)} domains are marked as new.`;

    $("#executive-headline").textContent = headline;
    $("#executive-summary").textContent = `${changeCopy} ${campaignCopy} ${riskCopy}`;
    $("#period-comparison").innerHTML = delta === null
      ? `<strong>—</strong><span>${escapeHtml(comparison.label)}</span>`
      : `<strong class="${delta >= 0 ? "is-positive" : "is-negative"}">${delta >= 0 ? "+" : ""}${delta.toFixed(0)}%</strong><span>${escapeHtml(comparison.label)}</span>`;
  }

  function renderPerformanceSignals(current, comparison, concentration) {
    const signals = [
      {
        label: "Recent change",
        value: comparison.delta === null ? "—" : `${comparison.delta >= 0 ? "+" : ""}${comparison.delta.toFixed(0)}%`,
        copy: comparison.delta === null ? "More weeks needed" : comparison.label,
        tone: comparison.delta > 5 ? "positive" : comparison.delta < -5 ? "warning" : "neutral"
      },
      {
        label: "Link quality",
        value: `${current.qualityShare.toFixed(0)}%`,
        copy: "links from DR 50+ publishers",
        tone: current.qualityShare >= 60 ? "positive" : current.qualityShare < 35 ? "warning" : "neutral"
      },
      {
        label: "New domains",
        value: formatMetric(current.newRd),
        copy: "marked as new",
        tone: current.newRd > 0 ? "positive" : "warning"
      },
      {
        label: "Top publishers",
        value: `${concentration.toFixed(0)}%`,
        copy: "links from the 5 most-used domains",
        tone: concentration >= 60 ? "warning" : "neutral"
      }
    ];
    $("#performance-signals").innerHTML = signals.map(signal => `
      <div class="signal-row signal-row--${signal.tone}">
        <i aria-hidden="true"></i>
        <div><span>${escapeHtml(signal.label)}</span><small>${escapeHtml(signal.copy)}</small></div>
        <strong>${escapeHtml(signal.value)}</strong>
      </div>`).join("");
  }

  function renderTopicShare(topics, totalRows) {
    const max = Math.max(1, ...topics.map(topic => topic.bl));
    $("#topic-share-list").innerHTML = topics.length
      ? topics.slice(0, 7).map(topic => `
          <div class="topic-share-row">
            <div><span>${escapeHtml(topic.name)}</span><strong>${totalRows ? (topic.bl / totalRows * 100).toFixed(0) : 0}%</strong></div>
            <div class="topic-share-track"><i style="width:${topic.bl / max * 100}%"></i></div>
          </div>`).join("")
      : `<p class="empty-state">No topic data matches these filters.</p>`;
  }

  function renderPublisherMix(publishers, totalRows) {
    const topPublishers = publishers.slice(0, 5);
    const max = Math.max(1, ...topPublishers.map(publisher => publisher.bl));
    $("#publisher-mix").innerHTML = topPublishers.length
      ? topPublishers.map((publisher, index) => `
          <div class="publisher-mix-row">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <div><strong>${escapeHtml(publisher.domain)}</strong><i><b style="width:${publisher.bl / max * 100}%"></b></i></div>
            <em>${totalRows ? (publisher.bl / totalRows * 100).toFixed(0) : 0}%</em>
          </div>`).join("")
      : `<p class="empty-state">No publisher data matches these filters.</p>`;
  }

  function renderActions(current, campaigns, concentration) {
    if (!current.bl) {
      $("#action-grid").innerHTML = `<p class="empty-state">No recommendations are available for these filters.</p>`;
      return;
    }
    const leadingCampaign = campaigns[0];
    const leadingShare = leadingCampaign && current.bl ? leadingCampaign.bl / current.bl * 100 : 0;
    const actions = [
      concentration >= 60
        ? ["Use a wider publisher mix", `${concentration.toFixed(0)}% of links come from the five most-used publishers. Add relevant new domains so the results depend less on this group.`, "warning"]
        : ["Keep adding relevant publishers", `${concentration.toFixed(0)}% of links come from the five most-used publishers. This is not a high concentration, but relevant new domains would make the mix more diverse.`, "positive"],
      current.qualityShare < 50
        ? ["Target more DR 50+ domains", `${current.qualityShare.toFixed(0)}% of links come from DR 50+ publishers. Consider targeting more strong and relevant domains in the next outreach cycle.`, "warning"]
        : ["Keep the current DR mix", `${current.qualityShare.toFixed(0)}% of links come from DR 50+ publishers. Check that this share stays stable if link volume increases.`, "positive"],
      leadingShare >= 35
        ? ["Spread links across more campaigns", `${leadingCampaign.name} provides ${leadingShare.toFixed(0)}% of filtered backlinks. Check whether other active campaigns need more support.`, "neutral"]
        : ["Review the leading campaign", leadingCampaign ? `${leadingCampaign.name} has the most backlinks but only ${leadingShare.toFixed(0)}% of the total. Check its topic, domains and DR before increasing activity.` : "Add campaign names to use this check.", "neutral"]
    ];
    $("#action-grid").innerHTML = actions.map(([title, copy, tone], index) => `
      <article class="action-card action-card--${tone}">
        <span>0${index + 1}</span><h4>${escapeHtml(title)}</h4><p>${escapeHtml(copy)}</p>
      </article>`).join("");
  }

  function renderAuthority(rows) {
    const bins = [
      ["00–20", 0, 20],
      ["21–40", 21, 40],
      ["41–60", 41, 60],
      ["61–80", 61, 80],
      ["81+", 81, Infinity]
    ].map(([label, min, max]) => ({
      label,
      value: rows.filter(row => row.dr !== null && row.dr >= min && row.dr <= max).length
    }));
    const max = Math.max(1, ...bins.map(bin => bin.value));
    const measured = bins.reduce((sum, bin) => sum + bin.value, 0);
    $("#authority-list").innerHTML = bins.map(bin => `
      <div class="authority-row">
        <span>${bin.label}</span>
        <div class="authority-track"><div class="authority-fill" style="width:${(bin.value / max) * 100}%"></div></div>
        <strong>${measured ? (bin.value / measured * 100).toFixed(0) : 0}%</strong>
      </div>`).join("");
  }

  function baseChartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: "index" },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: COLORS.ink,
          titleFont: { family: "IBM Plex Mono", size: 10 },
          bodyFont: { family: "Archivo", size: 11 },
          padding: 11,
          cornerRadius: 0
        }
      },
      scales: {
        x: {
          grid: { display: false },
          border: { color: COLORS.line },
          ticks: { color: COLORS.muted, font: { family: "IBM Plex Mono", size: 10 }, maxRotation: 0, autoSkip: true, maxTicksLimit: 14 }
        },
        y: {
          beginAtZero: true,
          grid: { color: "#e4dfd5" },
          border: { display: false },
          ticks: { color: COLORS.muted, font: { family: "IBM Plex Mono", size: 10 }, precision: 0 }
        }
      }
    };
  }

  function destroyChart(key) {
    if (state.charts[key]) state.charts[key].destroy();
    delete state.charts[key];
  }

  function renderActivityChart(trends) {
    destroyChart("activity");
    const canvas = $("#activity-chart");
    if (!canvas || typeof Chart === "undefined") return;
    const options = baseChartOptions();
    options.plugins.legend = {
      display: true,
      align: "end",
      labels: {
        boxWidth: 10,
        boxHeight: 10,
        padding: 14,
        color: COLORS.muted,
        font: { family: "IBM Plex Mono", size: 10 }
      }
    };
    options.scales.y2 = {
      position: "right",
      beginAtZero: true,
      grid: { display: false },
      border: { display: false },
      ticks: { color: COLORS.muted, font: { family: "IBM Plex Mono", size: 10 }, precision: 0 }
    };
    const backlinks = trends.map(point => point.bl);
    state.charts.activity = new Chart(canvas, {
      data: {
        labels: trends.map(point => state.filters.year === "All" ? point.key : `W${point.week}`),
        datasets: [
          { type: "bar", label: "Articles", data: trends.map(point => point.articles), yAxisID: "y2", backgroundColor: "#dce5ff", borderWidth: 0, barPercentage: 0.66, categoryPercentage: 0.82, order: 3 },
          { type: "line", label: "Backlinks", data: backlinks, borderColor: COLORS.blue, backgroundColor: COLORS.blue, pointRadius: 2, pointHoverRadius: 5, pointBackgroundColor: COLORS.surface, pointBorderWidth: 2, borderWidth: 2.5, tension: 0.22, order: 1 },
          { type: "line", label: "4w average", data: rollingAverage(backlinks), borderColor: COLORS.orange, backgroundColor: COLORS.orange, pointRadius: 0, borderDash: [6, 4], borderWidth: 2, tension: 0.3, order: 2 }
        ]
      },
      options
    });
  }

  function sortGroups(groups, sort) {
    const direction = sort.direction === "asc" ? 1 : -1;
    return [...groups].sort((a, b) => {
      const left = a[sort.key];
      const right = b[sort.key];
      if (typeof left === "string") return left.localeCompare(String(right)) * direction;
      return ((left ?? -Infinity) - (right ?? -Infinity)) * direction;
    });
  }

  function sortMark(sort, key) {
    return sort.key === key ? (sort.direction === "asc" ? " ↑" : " ↓") : "";
  }

  function renderCampaigns(rows) {
    const query = state.campaignSearch.toLowerCase();
    const groups = campaignGroups(rows).filter(group => !query || `${group.name} ${group.topic}`.toLowerCase().includes(query));
    const sorted = sortGroups(groups, state.campaignSort);
    const columns = [
      ["name", "Campaign"],
      ["topic", "Topic"],
      ["bl", "Backlinks"],
      ["articles", "Articles"],
      ["blPerArticle", "Backlinks / article"],
      ["domains", "Domains"],
      ["medianDr", "Median DR"],
      ["qualityShare", "DR 50+"],
      ["newRd", "New domains"]
    ];

    $("#campaign-table").innerHTML = `
      <thead><tr>${columns.map(([key, label]) => `<th data-sort="${key}" class="${state.campaignSort.key === key ? "is-sorted" : ""}">${label}${sortMark(state.campaignSort, key)}</th>`).join("")}</tr></thead>
      <tbody>${sorted.length ? sorted.map(group => `
        <tr>
          <td><button class="campaign-open" type="button" data-campaign-id="${escapeHtml(group.name)}">${escapeHtml(group.name)}</button></td>
          <td>${escapeHtml(group.topic)}</td>
          <td class="cell-primary">${formatMetric(group.bl)}</td>
          <td>${formatMetric(group.articles)}</td>
          <td>${formatMetric(group.blPerArticle, 1)}</td>
          <td>${formatMetric(group.domains)}</td>
          <td>${formatMetric(group.medianDr)}</td>
          <td>${formatMetric(group.qualityShare)}%</td>
          <td class="${group.newRd ? "cell-good" : ""}">${group.newRd ? `+${formatMetric(group.newRd)}` : "—"}</td>
        </tr>`).join("") : `<tr><td colspan="9" class="empty-state">No campaigns match the search and filters.</td></tr>`}</tbody>`;
  }

  function renderPublishers(rows) {
    const query = state.publisherSearch.toLowerCase();
    const groups = publisherGroups(rows).filter(group => !query || group.domain.toLowerCase().includes(query));
    const sorted = sortGroups(groups, state.publisherSort);
    const columns = [
      ["domain", "Domain"],
      ["bl", "Backlinks"],
      ["articles", "Articles"],
      ["campaigns", "Campaigns"],
      ["avgDr", "Avg. DR"],
      ["bestDr", "Highest DR"],
      ["weeks", "Active weeks"]
    ];

    $("#publisher-table").innerHTML = `
      <thead><tr>${columns.map(([key, label]) => `<th data-sort="${key}" class="${state.publisherSort.key === key ? "is-sorted" : ""}">${label}${sortMark(state.publisherSort, key)}</th>`).join("")}<th>Article</th></tr></thead>
      <tbody>${sorted.length ? sorted.map(group => `
        <tr>
          <td>${escapeHtml(group.domain)}${group.isNew ? ` <span class="cell-good">NEW</span>` : ""}</td>
          <td class="cell-primary">${formatMetric(group.bl)}</td>
          <td>${formatMetric(group.articles)}</td>
          <td>${formatMetric(group.campaigns)}</td>
          <td>${formatMetric(group.avgDr, 1)}</td>
          <td>${formatMetric(group.bestDr)}</td>
          <td>${formatMetric(group.weeks)}</td>
          <td>${safeUrl(group.bestUrl) ? `<a class="table-link" href="${escapeHtml(safeUrl(group.bestUrl))}" target="_blank" rel="noopener noreferrer">Open ↗</a>` : "—"}</td>
        </tr>`).join("") : `<tr><td colspan="8" class="empty-state">No publishers match the search and filters.</td></tr>`}</tbody>`;

    renderPublisherChart(sorted.slice(0, 10));
  }

  function renderPublisherChart(groups) {
    destroyChart("publisher");
    const canvas = $("#publisher-chart");
    if (!canvas || typeof Chart === "undefined") return;
    const options = baseChartOptions();
    options.indexAxis = "y";
    options.scales.x = options.scales.y;
    options.scales.y = {
      grid: { display: false },
      border: { display: false },
      ticks: { color: COLORS.muted, font: { family: "IBM Plex Mono", size: 10 }, callback(value) {
        const label = this.getLabelForValue(value);
        return label.length > 20 ? `${label.slice(0, 19)}…` : label;
      }}
    };
    state.charts.publisher = new Chart(canvas, {
      type: "bar",
      data: {
        labels: groups.map(group => group.domain),
        datasets: [{ data: groups.map(group => group.bl), backgroundColor: groups.map((_, index) => index === 0 ? COLORS.signal : COLORS.blue), borderWidth: 0 }]
      },
      options
    });
  }

  function renderTopics(rows) {
    const groups = topicGroups(rows);
    $("#topic-grid").innerHTML = groups.length
      ? groups.map((group, index) => `
          <article class="topic-card">
            <p class="micro-label">TOPIC / ${String(index + 1).padStart(2, "0")}</p>
            <h3>${escapeHtml(group.name)}</h3>
            <div class="topic-card__stats">
              <div><strong>${formatMetric(group.bl)}</strong><span>Backlinks</span></div>
              <div><strong>${formatMetric(group.campaigns)}</strong><span>Campaigns</span></div>
              <div><strong>${formatMetric(group.avgDr, 0)}</strong><span>Avg. DR</span></div>
            </div>
            <span class="topic-card__number" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
          </article>`).join("")
      : `<p class="empty-state">No topics match these filters.</p>`;
  }

  function renderTrend() {
    const trends = trendGroups();
    destroyChart("trend");
    const canvas = $("#trend-chart");
    if (canvas && typeof Chart !== "undefined") {
      const options = baseChartOptions();
      options.scales.y2 = {
        position: "right",
        min: 0,
        max: 100,
        grid: { display: false },
        border: { display: false },
        ticks: { color: COLORS.orange, font: { family: "IBM Plex Mono", size: 10 } }
      };
      options.plugins.legend = {
        display: true,
        align: "end",
        labels: { boxWidth: 10, boxHeight: 10, color: COLORS.muted, font: { family: "IBM Plex Mono", size: 10 } }
      };
      state.charts.trend = new Chart(canvas, {
        data: {
          labels: trends.map(point => state.filters.year === "All" ? point.key : `W${point.week}`),
          datasets: [
            { type: "bar", label: "Backlinks", data: trends.map(point => point.bl), backgroundColor: COLORS.blue, borderWidth: 0, order: 3 },
            { type: "line", label: "Articles", data: trends.map(point => point.articles), borderColor: COLORS.teal, backgroundColor: COLORS.teal, pointBackgroundColor: COLORS.surface, pointBorderColor: COLORS.teal, pointBorderWidth: 2, pointRadius: 2, pointHoverRadius: 5, borderWidth: 3, tension: 0.25, order: 1 },
            { type: "line", label: "Average DR", data: trends.map(point => point.avgDr), yAxisID: "y2", borderColor: COLORS.orange, backgroundColor: COLORS.orange, pointBackgroundColor: COLORS.surface, pointBorderColor: COLORS.orange, pointBorderWidth: 2, pointRadius: 2, pointHoverRadius: 5, borderDash: [7, 4], borderWidth: 3, tension: 0.25, order: 1 }
          ]
        },
        options
      });
    }

    $("#trend-table").innerHTML = `
      <thead><tr><th>Period</th><th>Backlinks</th><th>Articles</th><th>Domains</th><th>Avg. DR</th><th>New domains</th></tr></thead>
      <tbody>${[...trends].reverse().map(point => `
        <tr>
          <td>${state.filters.year === "All" ? escapeHtml(point.key) : `Week ${point.week}`}</td>
          <td class="cell-primary">${formatMetric(point.bl)}</td>
          <td>${formatMetric(point.articles)}</td>
          <td>${formatMetric(point.domains)}</td>
          <td>${formatMetric(point.avgDr, 1)}</td>
          <td class="${point.newRd ? "cell-good" : ""}">${point.newRd ? `+${formatMetric(point.newRd)}` : "—"}</td>
        </tr>`).join("") || `<tr><td colspan="6" class="empty-state">No weekly data is available.</td></tr>`}</tbody>`;
  }

  function dataQuality() {
    const rows = state.rows;
    const issues = {
      missingDomain: rows.filter(row => row.missing.domain).length,
      missingDr: rows.filter(row => row.missing.dr).length,
      missingCampaign: rows.filter(row => row.missing.campaign).length,
      invalidUrl: rows.filter(row => row.articleUrl && !safeUrl(row.articleUrl)).length
    };
    const duplicateKeys = new Set();
    let duplicates = 0;
    rows.forEach(row => {
      const key = `${row.articleUrl}|${row.targetUrl}|${row.campaign}|${row.week}`;
      if (duplicateKeys.has(key)) duplicates += 1;
      else duplicateKeys.add(key);
    });
    issues.duplicates = duplicates;

    const filledCells = rows.reduce((sum, row) => sum + CORE_FIELDS.filter(field => {
      if (field === "referringDomain") return Boolean(row.referringDomain);
      if (field === "dr") return row.dr !== null;
      return Boolean(row[field]);
    }).length, 0);
    const completeness = rows.length ? (filledCells / (rows.length * CORE_FIELDS.length)) * 100 : 0;
    const duplicatePenalty = rows.length ? Math.min(12, (duplicates / rows.length) * 30) : 0;
    return { issues, score: Math.max(0, Math.round(completeness - duplicatePenalty)) };
  }

  function renderQuality() {
    const quality = dataQuality();
    $("#quality-score").textContent = quality.score;
    const verdict = quality.score >= 95 ? "Ready to use." : quality.score >= 80 ? "Usable, with a few gaps." : quality.score >= 60 ? "Some fields need fixing." : "Fix the source data first.";
    $("#quality-verdict").textContent = verdict;
    $("#quality-description").textContent = `${numberFormat.format(state.rows.length)} rows were checked across seven core reporting fields. These fields support a complete report, but they are not all required to load a file. Fixed validation rules check missing values and possible duplicates; no AI is used. This does not confirm that the values are factually correct.`;

    const cards = [
      ["Missing publisher domains", quality.issues.missingDomain, "Rows with no publisher domain"],
      ["Missing DR", quality.issues.missingDr, "Rows with no Domain Rating"],
      ["Missing campaign names", quality.issues.missingCampaign, "Rows with no campaign name"],
      ["Invalid article links", quality.issues.invalidUrl, "Article links the dashboard cannot open"],
      ["Possible duplicates", quality.issues.duplicates, "Repeated article, target, campaign and week"]
    ];
    $("#quality-grid").innerHTML = cards.map(([label, value, description]) => `
      <article class="issue-card ${value ? "has-issues" : "is-clear"}">
        <p class="micro-label">${escapeHtml(label)}</p>
        <strong>${formatMetric(value)}</strong>
        <p>${escapeHtml(description)}</p>
      </article>`).join("");

    const recognisedFields = new Set(Object.keys(state.columnMap));
    $("#schema-list").innerHTML = state.rawHeaders.map(header => {
      const mappedField = Object.entries(state.columnMap).find(([, sourceHeader]) => sourceHeader === header)?.[0];
      return `<span class="schema-pill ${mappedField && CORE_FIELDS.includes(mappedField) ? "is-core" : ""}">${escapeHtml(header)}${mappedField ? ` → ${escapeHtml(FIELD_LABELS[mappedField] || mappedField)}` : " → Not used"}</span>`;
    }).join("") + Object.keys(FIELD_ALIASES)
      .filter(field => !recognisedFields.has(field))
      .map(field => `<span class="schema-pill">${CORE_FIELDS.includes(field) ? "Core" : "Optional"} column not found: ${escapeHtml(FIELD_LABELS[field] || field)}</span>`)
      .join("");
  }

  function openCampaign(name) {
    const group = campaignGroups(filteredRows()).find(item => item.name === name);
    if (!group) return;
    $("#dialog-title").textContent = group.name;
    const stats = [
      ["Backlinks", group.bl],
      ["Articles", group.articles],
      ["Domains", group.domains],
      ["Average DR", formatMetric(group.avgDr, 1)],
      ["New domains", group.newRd]
    ];
    $("#dialog-stats").innerHTML = stats.map(([label, value]) => `<div class="dialog-stat"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></div>`).join("");

    const publications = unique(group.rows.map(row => row.articleUrl).filter(Boolean))
      .map(url => group.rows.filter(row => row.articleUrl === url).sort((a, b) => (b.dr || 0) - (a.dr || 0))[0])
      .sort((a, b) => (b.dr || 0) - (a.dr || 0));
    const visibleLimit = 12;
    $("#dialog-body").innerHTML = publications.length
      ? `<div class="publication-list">${publications.map((row, index) => `
          <div class="publication"${index >= visibleLimit ? " hidden data-campaign-extra" : ""}>
            <div>
              ${safeUrl(row.articleUrl) ? `<a href="${escapeHtml(safeUrl(row.articleUrl))}" target="_blank" rel="noopener noreferrer">${escapeHtml(row.referringDomain || row.articleUrl)}</a>` : `<strong>${escapeHtml(row.referringDomain || "Unknown domain")}</strong>`}
              <small>${escapeHtml(row.articleUrl)}</small>
            </div>
            <strong>DR ${formatMetric(row.dr)}</strong>
          </div>`).join("")}</div>
          ${publications.length > visibleLimit ? `
            <div class="publication-list__footer">
              <span id="publication-count">Showing ${visibleLimit} of ${publications.length} articles</span>
              <button class="text-button" type="button" data-show-all-publications aria-expanded="false">Show all ${publications.length} articles →</button>
            </div>` : ""}`
      : `<p class="empty-state">No article links were found for this campaign.</p>`;
    $("#detail-dialog").showModal();
  }

  function closeMobileMenu() {
    $("#sidebar")?.classList.remove("is-open");
    $(".sidebar").classList.remove("is-open");
    $("#menu-toggle").setAttribute("aria-expanded", "false");
  }

  function toggleSort(type, key) {
    const sort = type === "campaign" ? state.campaignSort : state.publisherSort;
    if (sort.key === key) sort.direction = sort.direction === "asc" ? "desc" : "asc";
    else {
      sort.key = key;
      sort.direction = ["name", "topic", "domain"].includes(key) ? "asc" : "desc";
    }
    render();
  }

  function exportView() {
    const rows = filteredRows();
    if (!rows.length) return;
    const headers = [
      "Market", "Source Flow", "Campaign Name", "Campaign Topic", "Article URL",
      "Referring Domain", "Target URL", "DR", "New RD", "Year", "Week", "Date",
      "Link Status", "Link Type", "Anchor Text", "Cost", "Organic Traffic",
      "Topical Relevance", "Language", "First Seen", "Last Checked", "Campaign Target"
    ];
    const values = rows.map(row => [
      row.market, row.sourceFlow, row.campaign, row.topic, row.articleUrl, row.referringDomain,
      row.targetUrl, row.dr ?? "", row.newRd ? "Yes" : "No", row.year || "", row.week || "", row.date,
      row.status, row.linkType, row.anchorText, row.cost ?? "", row.organicTraffic ?? "",
      row.topicalRelevance ?? "", row.language, row.firstSeen, row.lastChecked, row.campaignTarget ?? ""
    ]);
    const csv = [headers, ...values].map(line => line.map(value => `"${String(value ?? "").replaceAll('"', '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `dashboard-export-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function setGuideTab(tabName, moveFocus = false) {
    $$(".guide-tab").forEach(button => {
      const active = button.dataset.guideTab === tabName;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
      button.tabIndex = active ? 0 : -1;
      if (active && moveFocus) button.focus();
    });
    $$(".guide-panel").forEach(panel => {
      panel.hidden = panel.id !== `guide-panel-${tabName}`;
    });
  }

  function renderGuideContext() {
    const guide = GUIDE_CONTENT[state.view] || GUIDE_CONTENT.overview;
    const currentView = VIEW_META[state.view]?.[1] || "Overview";
    $("#guide-current-view").textContent = currentView;
    $("#guide-context-kicker").textContent = guide.kicker;
    $("#guide-context-title").textContent = guide.title;
    $("#guide-context-summary").textContent = guide.summary;
    $("#guide-context-steps").innerHTML = guide.blocks.map(([label, title, copy], index) => `
      <li>
        <span>${String(index + 1).padStart(2, "0")}</span>
        <div><small>${escapeHtml(label)}</small><strong>${escapeHtml(title)}</strong><p>${escapeHtml(copy)}</p></div>
      </li>`).join("");
    $("#guide-context-metrics").innerHTML = guide.metrics
      .map(metric => `<span>${escapeHtml(metric)}</span>`)
      .join("");
    $("#guide-context-watch-title").textContent = guide.watch[0];
    $("#guide-context-watch-copy").textContent = guide.watch[1];
    $("#guide-next-copy").textContent = guide.next[0];
    const nextButton = $("#guide-next-view");
    nextButton.dataset.view = guide.next[1];
    nextButton.textContent = `${guide.next[2]} →`;
  }

  function bindEvents() {
    $$(".source-tab").forEach(button => {
      button.addEventListener("click", () => {
        $$(".source-tab").forEach(item => {
          const active = item === button;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-selected", String(active));
        });
        $$(".source-panel").forEach(panel => panel.hidden = panel.id !== `source-${button.dataset.sourceTab}`);
        clearSourceError();
      });
    });

    $("#connect-sheet").addEventListener("click", async () => {
      clearSourceError();
      const sheetId = extractSheetId($("#sheet-url").value);
      const sheetName = $("#sheet-name").value.trim() || CONFIG.defaultSheetName;
      if (!sheetId) {
        showSourceError("Paste a valid Google Sheet link or spreadsheet ID.");
        return;
      }
      showLoading("Opening Google Sheet…");
      try {
        const records = await fetchSheet(sheetId, sheetName);
        const source = { type: "sheet", sheetId, sheetName };
        if (CONFIG.persistSheetReference) localStorage.setItem("dashboard-sheet", JSON.stringify(source));
        setData(records, source);
      } catch (error) {
        showWelcome();
        showSourceError(error.message);
      }
    });

    $("#csv-file").addEventListener("change", async event => {
      clearSourceError();
      const file = event.target.files?.[0];
      if (!file) return;
      showLoading("Reading CSV file…");
      try {
        const records = parseCsv(await file.text());
        setData(records, { type: "csv", fileName: file.name });
      } catch (error) {
        showWelcome();
        showSourceError(error.message);
      } finally {
        event.target.value = "";
      }
    });

    $("#load-demo").addEventListener("click", () => {
      clearSourceError();
      showLoading("Creating sample data…");
      window.setTimeout(() => setData(buildDemoRecords(), { type: "demo" }), 240);
    });

    $$(".nav-item").forEach(button => button.addEventListener("click", () => setView(button.dataset.view)));
    $$("[data-go-view]").forEach(button => button.addEventListener("click", () => setView(button.dataset.goView)));

    ["market", "year", "week", "flow"].forEach(field => {
      $(`#filter-${field}`).addEventListener("change", event => {
        state.filters[field] = event.target.value;
        if (field !== "week") {
          state.filters.week = "All";
          populateWeeks();
        }
        render();
      });
    });

    $("#clear-filters").addEventListener("click", () => {
      state.filters = { market: "All", year: "All", week: "All", flow: "All" };
      populateFilters();
      render();
    });

    $("#campaign-search").addEventListener("input", event => {
      state.campaignSearch = event.target.value;
      render();
    });
    $("#publisher-search").addEventListener("input", event => {
      state.publisherSearch = event.target.value;
      render();
    });

    $("#campaign-table").addEventListener("click", event => {
      const sort = event.target.closest("[data-sort]");
      const campaign = event.target.closest("[data-campaign-id]");
      if (sort) toggleSort("campaign", sort.dataset.sort);
      if (campaign) openCampaign(campaign.dataset.campaignId);
    });

    $("#publisher-table").addEventListener("click", event => {
      const sort = event.target.closest("[data-sort]");
      if (sort) toggleSort("publisher", sort.dataset.sort);
    });

    $("#change-source").addEventListener("click", showWelcome);
    $("#refresh-data").addEventListener("click", () => refreshSheet(false));
    $("#export-data").addEventListener("click", exportView);

    const requirementsDialog = $("#requirements-dialog");
    $("#open-requirements").addEventListener("click", () => {
      requirementsDialog.scrollTop = 0;
      requirementsDialog.showModal();
    });
    $("#requirements-close").addEventListener("click", () => requirementsDialog.close());
    $("#requirements-done").addEventListener("click", () => requirementsDialog.close());
    requirementsDialog.addEventListener("click", event => {
      if (event.target === requirementsDialog) requirementsDialog.close();
    });

    const guideDialog = $("#guide-dialog");
    $("#open-guide").addEventListener("click", () => {
      renderGuideContext();
      setGuideTab("section");
      guideDialog.scrollTop = 0;
      guideDialog.showModal();
    });
    $("#guide-close").addEventListener("click", () => guideDialog.close());
    $$(".guide-tab").forEach(button => {
      button.addEventListener("click", () => setGuideTab(button.dataset.guideTab));
      button.addEventListener("keydown", event => {
        const tabs = $$(".guide-tab");
        const currentIndex = tabs.indexOf(button);
        const keyTargets = {
          ArrowRight: (currentIndex + 1) % tabs.length,
          ArrowLeft: (currentIndex - 1 + tabs.length) % tabs.length,
          Home: 0,
          End: tabs.length - 1
        };
        if (keyTargets[event.key] === undefined) return;
        event.preventDefault();
        setGuideTab(tabs[keyTargets[event.key]].dataset.guideTab, true);
      });
    });
    $("#guide-next-view").addEventListener("click", event => {
      const targetView = event.currentTarget.dataset.view;
      guideDialog.close();
      if (targetView) setView(targetView);
    });
    guideDialog.addEventListener("click", event => {
      if (event.target === guideDialog) guideDialog.close();
    });

    $("#dialog-close").addEventListener("click", () => $("#detail-dialog").close());
    $("#dialog-body").addEventListener("click", event => {
      const button = event.target.closest("[data-show-all-publications]");
      if (!button) return;
      $$("[data-campaign-extra]", $("#dialog-body")).forEach(item => {
        item.hidden = false;
        item.removeAttribute("data-campaign-extra");
      });
      const count = $("#publication-count");
      if (count) count.textContent = count.textContent.replace(/^Showing \d+ of /, "Showing all ");
      button.remove();
    });
    $("#detail-dialog").addEventListener("click", event => {
      if (event.target === $("#detail-dialog")) $("#detail-dialog").close();
    });

    $("#menu-toggle").addEventListener("click", () => {
      const open = $(".sidebar").classList.toggle("is-open");
      $("#menu-toggle").setAttribute("aria-expanded", String(open));
    });
  }

  function initialise() {
    if (CONFIG.title) {
      $("#dashboard-name").textContent = CONFIG.title.toUpperCase();
      document.title = CONFIG.title;
    }
    $("#sheet-name").value = CONFIG.defaultSheetName;
    bindEvents();

    if (CONFIG.persistSheetReference) {
      try {
        const saved = JSON.parse(localStorage.getItem("dashboard-sheet"));
        if (saved?.sheetId) {
          $("#sheet-url").value = `https://docs.google.com/spreadsheets/d/${saved.sheetId}/edit`;
          $("#sheet-name").value = saved.sheetName || CONFIG.defaultSheetName;
        }
      } catch {
        localStorage.removeItem("dashboard-sheet");
      }
    }
  }

  initialise();
})();

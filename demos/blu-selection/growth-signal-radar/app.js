const leads = [
  {
    id: "oqc",
    company: "Oxford Quantum Circuits",
    route: "United Kingdom → Barcelona",
    location: "barcelona",
    sector: "Quantum computing",
    published: "2026-07-08",
    dateLabel: "July 2026",
    hiringRank: 200,
    hiringLabel: "200+ planned roles",
    score: 97,
    signal: "A new quantum-computing centre is expected to begin its Barcelona setup in Q4 2026, with more than 200 planned employees.",
    whyNow: "The team is still before the stated setup window. That creates a time-sensitive opportunity to support talent mapping, compensation alignment and the first hiring waves before roles scale.",
    persona: "Country launch lead, VP People or Talent Acquisition lead (persona hypothesis; decision-maker still to enrich).",
    outreach: "Offer a short Barcelona quantum-talent map: priority roles, adjacent AI/data pools, salary pressure and a suggested sequence for the first 30 hires.",
    content: "AEO question: “How do you build a quantum-computing team in Barcelona?” Lead magnet: Barcelona Quantum Talent & Hiring Roadmap.",
    sourceName: "COFIDES — OQC Barcelona announcement",
    sourceUrl: "https://www.cofides.es/en/node/9641",
    scores: { "Market fit": [25, 25], "Expansion timing": [24, 25], "Hiring intensity": [25, 25], "Cross-border": [13, 15], "Evidence": [10, 10] }
  },
  {
    id: "a1-digital",
    company: "A1 Digital / Exoscale",
    route: "Austria → Spain",
    location: "madrid",
    sector: "Cloud & IoT",
    published: "2026-07-14",
    dateLabel: "14 July 2026",
    hiringRank: 80,
    hiringLabel: "Local team planned",
    score: 88,
    signal: "A1 Digital entered Spain with its sovereign-cloud platform and stated plans to expand a local team and partner ecosystem.",
    whyNow: "The Spanish entity is new and the company explicitly links market entry to local team growth. The mix of cloud, IoT, partnerships and B2B sales may require several specialized profiles.",
    persona: "Spain general manager, Head of People, Partner Ecosystem lead or regional Talent Acquisition.",
    outreach: "Lead with a Spain market-entry hiring sequence for cloud providers: solutions engineering, enterprise sales, partnerships and customer success.",
    content: "AEO question: “Which roles should a European cloud provider hire first when entering Spain?” Lead magnet: Spain Cloud GTM Hiring Checklist.",
    sourceName: "Data Center Dynamics — A1 Digital Spain expansion",
    sourceUrl: "https://www.datacenterdynamics.com/en/news/a1-digital-chooses-spain-to-expand-its-cloud-infrastructure-in-europe/",
    scores: { "Market fit": [25, 25], "Expansion timing": [23, 25], "Hiring intensity": [17, 25], "Cross-border": [13, 15], "Evidence": [10, 10] }
  },
  {
    id: "fresenius-kabi",
    company: "Fresenius Kabi",
    route: "Germany → Barcelona hub",
    location: "barcelona",
    sector: "Life sciences & IT",
    published: "2026-05-22",
    dateLabel: "22 May 2026",
    hiringRank: 60,
    hiringLabel: "60+ technology roles",
    score: 83,
    signal: "The company opened a Barcelona IT hub supporting global operations and announced more than 60 technology roles.",
    whyNow: "The hub is already active, so the opportunity may be execution support rather than market-entry strategy. The hiring volume and international remit still justify qualification.",
    persona: "Barcelona IT hub lead, Talent Acquisition lead or HR business partner for digital transformation.",
    outreach: "Share a concise Barcelona talent-market snapshot for platform, data and AI roles, then ask which functions are creating the longest time-to-hire.",
    content: "AEO question: “How competitive is Barcelona hiring for enterprise AI and platform teams?” Content bridge: existing blu AI Salary Guide + enterprise hiring timeline.",
    sourceName: "Invest in Spain — Fresenius Kabi Barcelona IT hub",
    sourceUrl: "https://www.investinspain.org/en/news/2026/fresenius",
    scores: { "Market fit": [25, 25], "Expansion timing": [16, 25], "Hiring intensity": [20, 25], "Cross-border": [12, 15], "Evidence": [10, 10] }
  },
  {
    id: "black-white",
    company: "Black & White Engineering",
    route: "United Kingdom → Madrid",
    location: "madrid",
    sector: "Data-centre engineering",
    published: "2026-07-09",
    dateLabel: "9 July 2026",
    hiringRank: 30,
    hiringLabel: "New office growth signal",
    score: 79,
    signal: "The engineering consultancy opened a Madrid office to enter Spain and support growth in the country’s data-centre market.",
    whyNow: "The market-entry signal is fresh and specialist talent may be scarce, but no explicit hiring target was published. The next step is to verify headcount plans before prioritizing outreach.",
    persona: "Spain country lead, European leadership or People lead supporting the Madrid launch.",
    outreach: "Ask about the first Spanish hiring bottleneck and offer a map of MEP, civil, structural and design-management talent in Madrid.",
    content: "AEO question: “Where can data-centre engineering firms find specialist talent in Spain?” Lead magnet: Spain Data-Centre Talent Map.",
    sourceName: "Black & White Engineering — Madrid office announcement",
    sourceUrl: "https://bw-engineering.com/insights/black-white-engineering-new-spain-office/",
    scores: { "Market fit": [25, 25], "Expansion timing": [22, 25], "Hiring intensity": [12, 25], "Cross-border": [10, 15], "Evidence": [10, 10] }
  }
];

const leadList = document.getElementById("leadList");
const accountPanel = document.getElementById("accountPanel");
const visibleCount = document.getElementById("visibleCount");
const sortSelect = document.getElementById("sortSelect");
const filterButtons = [...document.querySelectorAll(".filter-button")];

let activeFilter = "all";
let activeLeadId = "oqc";

function getVisibleLeads() {
  const filtered = activeFilter === "all"
    ? [...leads]
    : leads.filter((lead) => lead.location === activeFilter);

  return filtered.sort((a, b) => {
    if (sortSelect.value === "recent") return new Date(b.published) - new Date(a.published);
    if (sortSelect.value === "hiring") return b.hiringRank - a.hiringRank;
    return b.score - a.score;
  });
}

function renderLeadList() {
  const visibleLeads = getVisibleLeads();
  visibleCount.textContent = visibleLeads.length;

  if (!visibleLeads.length) {
    leadList.innerHTML = '<p class="empty-state">No source-backed signals match this filter.</p>';
    accountPanel.innerHTML = '<div class="account-panel__empty">Choose another filter to inspect an account.</div>';
    return;
  }

  if (!visibleLeads.some((lead) => lead.id === activeLeadId)) {
    activeLeadId = visibleLeads[0].id;
  }

  leadList.innerHTML = visibleLeads.map((lead) => `
    <button type="button" class="lead-card ${lead.id === activeLeadId ? "is-selected" : ""}" data-lead-id="${lead.id}" aria-pressed="${lead.id === activeLeadId}">
      <div class="lead-card__top">
        <div>
          <h3>${lead.company}</h3>
          <p class="lead-card__route">${lead.route} · ${lead.sector}</p>
        </div>
        <span class="lead-card__score" aria-label="Priority score ${lead.score} out of 100">${lead.score}</span>
      </div>
      <p class="lead-card__signal">${lead.signal}</p>
      <div class="lead-card__meta"><span>${lead.dateLabel}</span><span>${lead.hiringLabel}</span></div>
    </button>
  `).join("");

  leadList.querySelectorAll("[data-lead-id]").forEach((button) => {
    button.addEventListener("click", () => {
      activeLeadId = button.dataset.leadId;
      renderLeadList();
      renderAccountPanel();
    });
  });

  renderAccountPanel();
}

function renderAccountPanel() {
  const lead = leads.find((item) => item.id === activeLeadId);
  if (!lead) return;

  const scoreRows = Object.entries(lead.scores).map(([label, values]) => {
    const [value, max] = values;
    const width = Math.round((value / max) * 100);
    return `
      <div class="score-row">
        <span>${label}</span>
        <div class="score-track" aria-hidden="true"><div class="score-fill" style="width:${width}%"></div></div>
        <strong>${value}/${max}</strong>
      </div>
    `;
  }).join("");

  accountPanel.innerHTML = `
    <div class="account-head">
      <div>
        <p class="eyebrow">Selected account</p>
        <h2>${lead.company}</h2>
        <p>${lead.route} · ${lead.sector}</p>
      </div>
      <div class="account-score"><strong>${lead.score}</strong><span>prototype score</span></div>
    </div>
    <div class="account-grid">
      <article class="account-block account-block--full"><span>Why now</span><p>${lead.whyNow}</p></article>
      <article class="account-block"><span>Likely buyer</span><p>${lead.persona}</p></article>
      <article class="account-block"><span>Outreach angle</span><p>${lead.outreach}</p></article>
      <article class="account-block account-block--full"><span>Content / AEO bridge</span><p>${lead.content}</p></article>
      <article class="account-block account-block--full"><span>Score breakdown</span><div class="score-bars">${scoreRows}</div></article>
    </div>
    <a class="account-source" href="${lead.sourceUrl}" target="_blank" rel="noreferrer">Open public source: ${lead.sourceName}</a>
    <p class="account-caveat">Qualification still required: CRM ownership, existing client status, decision-maker identity, open vacancies and commercial timing have not been verified in this prototype.</p>
  `;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    renderLeadList();
  });
});

sortSelect.addEventListener("change", renderLeadList);

renderLeadList();

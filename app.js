const projects = [
  {
    id: "reviews",
    title: "Human-led Review Pages",
    shortTitle: "Review Pages",
    category: "SERP analysis + content SEO",
    status: "Intro + body HTML",
    summary: "Review pages built from <strong>scraped social comments</strong>, cluster analysis and weighted scoring to make supplier opinions easier to compare.",
    explanation: `<p>These are Italian <strong>energy supplier review pages</strong> created from public customer comments collected across social and community platforms. The tested cluster includes <strong>17 suppliers</strong>, with roughly <strong>40-200 comments analyzed per provider</strong> depending on source availability and quality.</p><p>The workflow turned messy social feedback into a structured SEO asset:</p><ul class="summary-process-list"><li>comments were scraped, filtered and cleaned;</li><li>opinions were grouped by user concern, such as bills, support, switching supplier or app experience;</li><li>the output became <strong>intro and body HTML demos</strong> ready to be adapted inside WordPress.</li></ul><p>The result is not just a written review. It combines <strong>scraping, sentiment analysis, topic clustering, scoring logic and WordPress-ready HTML</strong> so users can compare quickly, then investigate the area that matters to them.</p>`,
    summaryPoints: [],
    metrics: [
      ["14", "review pages in the CV"],
      ["40-200", "comments analyzed per provider"],
      ["17", "providers in this HTML comparison run"],
      ["20", "providers in the later official score report"]
    ],
    callouts: [
      ["Dataset", "<strong>Public social comments</strong> were turned into structured review evidence."],
      ["Output", "<strong>Intro and body HTML</strong> were separated for easier WordPress insertion."],
      ["Purpose", "The page serves both <strong>quick comparison</strong> and deeper cluster exploration."]
    ],
    deepDive: [
      {
        title: "Why the project was created",
        body: `<p>The initial problem was a <strong>SERP quality gap</strong>. For several supplier-review queries, generic editorial pages were not always the most convincing result. Often, both for us and for competitors, <strong>Reddit threads, public Facebook discussions or community posts</strong> appeared more aligned with what users were actually looking for: real experiences, complaints, doubts and concrete details.</p><p>The SEO reasoning was that Google was rewarding content with stronger <strong>human evidence</strong>. A normal supplier description could explain tariffs and company facts, but it did not necessarily answer the emotional and practical question behind the query: "What do real customers say?" It could also feel less authentic if every opinion was written directly by us, without an external evidence layer.</p><p>So the page format was redesigned around <strong>collected customer language</strong>. Instead of inventing opinions or writing a purely generic review, the content uses real comments as the evidence layer and turns them into a structured page that can be read, compared and audited.</p>`
      },
      {
        title: "How we worked: scraping, cleaning and clustering",
        body: `<p>The workflow started with <strong>AI-assisted scraping and research</strong>. Public comments were collected from social/community sources using tools such as Apify, Claude Code-assisted workflows and Codex-generated instructions for what to collect, what to exclude and how to keep the data useful.</p><div class="process-flow"><article><span>Collect</span><p>Prioritize direct customer experiences about price, bills, customer support, app, activation, cancellation, transparency and switching supplier.</p></article><article><span>Clean</span><p>Remove spam, referral codes, vague mentions, duplicated comments, unsupported claims and content that could not be connected to a real user experience.</p></article><article><span>Normalize</span><p>Preserve text, platform, visible author or handle, source URL, date/context and quality notes so the dataset stays auditable.</p></article><article><span>Cluster</span><p>Group comments by user concern, such as tariffs and savings, support, app/billing, activation, provider change and reputation.</p></article></div><p>This made the data usable for SEO content because the page could reflect <strong>real search intent</strong> instead of forcing all comments into one generic paragraph.</p>`
      },
      {
        title: "How the scoring and analysis worked",
        body: `<p>The score was designed as a <strong>weighted interpretation</strong>, not as a simple average of random comments. Each provider could have different source coverage and comment quality, so the same method had to balance <strong>sentiment, specificity, recency, reliability, cluster distribution</strong> and a small statistical correction for thin datasets.</p><div class="formula-accordion formula-single"><details open><summary><span>Full scoring formula and statistical logic</span></summary><div class="formula-grid"><article><span>1. Sentiment signal</span><p>Each valid comment received <strong>s_i</strong>, a sentiment score from <strong>-1 to +1</strong>. The key rule is that sentiment is measured toward the supplier being reviewed, not toward a competitor, the energy market in general or a confusing external situation.</p></article><article><span>2. Comment quality</span><p>The formula then uses <strong>q_i</strong> to reward comments that are more useful: direct experience, concrete details, a clear outcome and decision value. A detailed billing issue or switching experience therefore matters more than a vague "good" or "bad" opinion.</p></article><article><span>3. Recency factor</span><p><strong>r_i</strong> gives more weight to recent comments, because supplier service, app quality, prices and support can change over time. Missing dates are handled conservatively instead of being guessed from weak clues.</p></article><article><span>4. Comment weight</span><p>The final comment weight is <strong>w_i = 0.35 + 0.45*q_i + 0.20*r_i</strong>. Statistically, this keeps every approved comment in the calculation, but lets <strong>quality</strong> and <strong>freshness</strong> decide how much influence it has.</p></article><article><span>5. Cluster score</span><p>For each topic cluster, the method calculates <strong>mu_k = sum(w_i*s_i) / sum(w_i)</strong>. In practice this means every cluster score is a weighted sentiment average, not a simple count of positive and negative comments.</p></article><article><span>6. Robustness correction</span><p>The correction <strong>lambda_k = n_k / (n_k + 10)</strong> prevents a small cluster from moving too aggressively. With few comments, the score stays closer to a central baseline; with more comments, the observed user signal counts more.</p></article><article><span>7. Overall score</span><p>The final score combines the five cluster scores with fixed weights: <strong>Tariffs 0.30</strong>, <strong>Support 0.30</strong>, <strong>App/Billing 0.15</strong>, <strong>Activation 0.15</strong> and <strong>Reputation 0.10</strong>. Stable weights make supplier comparisons fair.</p></article><article><span>8. QA safeguards</span><p>Excluded comments are removed before scoring, not treated as neutral. Each included row needs a valid cluster, sentiment reason, quality score and recency value, so the final number can be traced back to the evidence.</p></article></div></details></div><p>Positive comments were also separated by theme, because a supplier can be appreciated for <strong>price</strong> but criticized for <strong>support</strong>, or the opposite. The goal was an explainable editorial score: users see the final number, but they can also understand <strong>which clusters influenced it</strong> and why the supplier is perceived that way.</p>`
      },
      {
        title: "How it helps users",
        body: `<p>The page is built for <strong>two user paths</strong>, because not every visitor arrives with the same decision process.</p><div class="user-path-grid"><article class="user-path-card"><span class="path-symbol">↕️</span><div><strong>Vertical user: one supplier, deeper check</strong><p>Someone already interested in one supplier can click the <strong>overall score</strong> or a <strong>cluster score</strong> in the intro and jump directly to the matching H2 section. This makes it easy to understand the provider in depth, especially for doubts about bills, support, activation or app experience.</p></div></article><article class="user-path-card"><span class="path-symbol">↔️</span><div><strong>Horizontal user: compare before choosing</strong><p>Someone comparing multiple suppliers can use the intro as a decision table: <strong>overall score, cluster scores and short evidence blocks</strong> show which provider is strongest for the area that matters most to them.</p></div></article></div><p>This helps avoid the typical weakness of review pages: either they are too vague, or they are too long. Here the intro gives a <strong>quick decision layer</strong>, while the body gives <strong>evidence-based depth</strong> for people who want to investigate.</p>`
      }
    ],
    hideSnapshot: true,
    hideKeyNumbers: true,
    performanceKey: "reviews",
    performancePlaceholder: "The first GSC dataset is displayed above. The next step can add <strong>URL-level or query-level before/after splits</strong> when you export more granular data.",
    urlPlaceholder: "The future URL inventory can list every review page created or modified, grouped by provider and date, with a note that the pages may have changed after delivery.",
    demos: [
      { label: "Intro HTML demo", path: "demos/reviews-octopus-intro.html" },
      { label: "Body HTML demo", path: "demos/reviews-octopus-body.html" }
    ]
  },
  {
    id: "scraping",
    title: "Social Comments Pipeline",
    shortTitle: "Scraping",
    category: "Data collection + QA",
    status: "Auditable workflow",
    summary: "A controlled pipeline for gathering <strong>real supplier comments</strong> from social platforms before turning them into SEO content.",
    explanation: `<p>This project is the data layer behind the review pages. It collects public comments from sources such as <strong>Reddit, YouTube, Facebook, Instagram and X</strong>, then filters and normalizes them so only useful, traceable and relevant comments move into the review workflow.</p><p>The objective was not to scrape as much as possible. The objective was to create a <strong>clean evidence base</strong> for pages that discuss real customer sentiment.</p>`,
    summaryPoints: ["Defined what comments to collect and exclude", "Used Codex-assisted rules for pre-cleaning", "Prepared exports for cluster and sentiment analysis"],
    metrics: [
      ["7,394", "raw comments in an early pipeline summary"],
      ["797", "comments kept after filters"],
      ["11", "raw provider datasets"],
      ["1", "canonical export schema"]
    ],
    callouts: [
      ["Sources", "Reddit, YouTube, Facebook, Instagram and X were considered with <strong>quality filters</strong>."],
      ["QA", "Spam, weak comments and unsupported claims were removed before analysis."],
      ["Use", "Clean exports fed <strong>cluster, sentiment and scoring</strong> workflows."]
    ],
    deepDive: [
      {
        title: "Why the pipeline was needed",
        body: `<p>The review system depends on the quality of the comments. Raw social data is messy: it can include <strong>duplicates, referral spam, jokes, off-topic mentions, missing dates, low-context complaints</strong> and comments that mention a provider without describing an actual experience.</p><p>If those comments entered the page directly, the final content would be weaker and less trustworthy. The pipeline was created to separate <strong>collection</strong> from <strong>selection</strong>: first preserve raw material, then decide what is editorially useful.</p><p>This also made the SEO work safer: pages based on public comments need a source trail, because the strongest value is not simply "having opinions", but being able to show that the opinions are <strong>traceable, relevant and usable</strong>.</p>`
      },
      {
        title: "How we worked: source rules and pre-cleaning",
        body: `<p>Codex was used to help define operational instructions: which comments to collect, which to ignore, why a comment is useful and how to document the source. The collection logic prioritized comments that described <strong>prices, bills, support, activation, app experience, cancellation, switching supplier and transparency</strong>.</p><div class="process-flow"><article><span>Targets</span><p>Use source lists and query packs by provider/platform, with Reddit, YouTube, public Facebook, Instagram or X considered when useful and accessible.</p></article><article><span>Rules</span><p>Keep comments with direct experience, concrete detail, identifiable topic and usable context; reject referral codes, spam, vague mentions and off-topic threads.</p></article><article><span>Schema</span><p>Normalize fields such as text, author, platform, source URL, date, scraped date and notes, so exports can move into the review pipeline.</p></article><article><span>Audit</span><p>Use source logs and validation notes to preserve where comments came from, what was excluded and which gaps still needed manual review.</p></article></div><p>This pre-cleaning made the downstream analysis more reliable because the dataset was already shaped around <strong>review intent</strong>, not generic brand mentions.</p>`
      },
      {
        title: "How it connected to analysis",
        body: `<p>After collection, comments were exported into a stable schema and then used for <strong>clustering, sentiment analysis and score calculation</strong>. This means scraping was not an isolated technical task. It was the first step of an SEO system where raw user language becomes structured content.</p><p>The pipeline also made the work more auditable: if a claim appeared in the page, it could be traced back to a source and a comment cluster. That matters both for <strong>editorial trust</strong> and for future updates, because new comments can be added without rebuilding the entire method from zero.</p>`
      }
    ],
    performancePlaceholder: "Future data could show source coverage by platform, valid-comment rate and how many comments were available for each provider cluster.",
    urlPlaceholder: "This section can later list raw source packs or provider CSV exports, without exposing private or sensitive working files.",
    demos: [
      { label: "Pipeline brief", path: "demos/social-data-pipeline.html" }
    ]
  },
  {
    id: "offers",
    title: "Supplier Offer Sheets",
    shortTitle: "Offer Sheets",
    category: "High-intent SEO pages",
    status: "Intro + body HTML",
    summary: "SEO landing pages for <strong>specific energy offers</strong>, built around price, conditions, supplier data and reusable HTML modules.",
    explanation: `<p>These pages target commercial searches where users are comparing or looking for a specific energy offer. Each page explains <strong>price, conditions, activation details, supplier context and practical pros/cons</strong> in a structure that can be inserted into WordPress.</p><p>The work is both editorial and technical: the page has to rank, answer high-intent questions and stay maintainable when offers or prices change.</p>`,
    summaryPoints: ["Built high-intent offer pages", "Structured price and condition modules", "Supported refreshes through offer-change tracking"],
    metrics: [
      ["50", "supplier offer pages in the CV"],
      ["% only", "public performance shown as relative trends"],
      ["3,515", "changed offers tracked"]
    ],
    callouts: [
      ["Pages", "<strong>50 offer pages</strong> created around supplier and tariff intent."],
      ["Tracking", "Offer changes were monitored to support future refreshes."],
      ["SEO role", "Pages support <strong>commercial-intent queries</strong> and internal linking."]
    ],
    deepDive: [
      {
        title: "Why the pages were created",
        body: `<p>Competitors such as Segugio already had dedicated offer pages, and the format matched a clear user need. Someone searching an offer name usually wants <strong>price, conditions, activation details, tariff rules and comparison context</strong>, not a generic supplier description.</p><p>The SEO risk was that many offer pages can become very similar: same supplier vocabulary, same price language, same FAQ and same internal links. The project therefore needed a scalable system that could target <strong>commercial-intent queries</strong> while avoiding thin, duplicated pages.</p><p>The page format also helped connect the wider supplier ecosystem: <strong>offer sheets</strong>, supplier pages, review pages and comparison pages could all reinforce the same provider entity.</p>`
      },
      {
        title: "How we worked: structure and data",
        body: `<p>The workflow combined <strong>keyword pre-analysis</strong>, data collection and a repeatable HTML architecture. Before generating a page, the process checked whether target queries were already covered by another Papernest URL, then produced a <strong>Differentiation Report</strong> to avoid copying the same H2, FAQ, anchors and content angle across the offer cluster.</p><div class="process-flow"><article><span>Intent</span><p>Validate branded and commercial keywords, check GSC cannibalization risk and decide how the page should differ from existing supplier or offer URLs.</p></article><article><span>Data</span><p>Collect offer facts from sources such as ARERA exports, supplier pages, PUN/PSV context and internal registries, without inventing missing prices or conditions.</p></article><article><span>Build</span><p>Create separate <strong>intro</strong> and <strong>body</strong> HTML with offer tables, practical explanations, FAQs, CTAs, internal links and WordPress-compatible modules.</p></article><article><span>Validate</span><p>Run structural checks, dedup checks, link checks and Italian proofreading so the page is specific, readable and safe to publish.</p></article></div><p>A key module was the <strong>price-history section</strong>: it uses historical offer data to explain whether the estimated monthly cost is moving up, down or staying stable. This turns the page from a static offer sheet into a more useful decision aid.</p>`
      },
      {
        title: "How it helps users",
        body: `<p>The page helps users compare an offer without jumping between supplier websites, generic articles and price tables. It centralizes the main decision points: <strong>how much it costs, what conditions apply, who it fits, what changed over time and what to check before activating</strong>.</p><p>The price-history module is especially useful because it gives context: for fixed offers, it explains that the public offer version can change for new activations without changing already signed contracts; for indexed offers, it can separate the index movement from the all-in monthly estimate.</p><p>From an SEO perspective, these sheets become a structured layer of a wider supplier database: <strong>offer pages, review pages, mother pages and comparison pages</strong> can all connect around the same provider and intent.</p>`
      }
    ],
    performancePlaceholder: "Once you provide the GSC cluster export, this panel can show <strong>percentage-only visibility, click-efficiency and position movements</strong> for all offer pages created or refreshed.",
    urlPlaceholder: "Future URL inventory: offer pages grouped by supplier, offer type and creation/modification date.",
    demos: [
      { label: "Offer intro", path: "demos/offer-next-energy-intro.html" },
      { label: "Offer body", path: "demos/offer-next-energy-body.html" },
      { label: "Price history summary", path: "demos/price-history-summary.html" }
    ]
  },
  {
    id: "ranking",
    title: "Supplier Review Ranking",
    shortTitle: "Provider Ranking",
    category: "Sentiment + comparison",
    status: "Updated intro/body",
    summary: "A ranking page that compares suppliers using <strong>real review evidence</strong>, review scores and sentiment/emotion analysis.",
    explanation: `<p>This page connects the individual review ecosystem into one comparison asset. It presents a <strong>top three</strong>, explains the ranking logic and then includes the full supplier ranking so users can compare providers based on collected review signals.</p><p>The reasoning is close to the review pages: if users and Google value real opinions, a best-supplier page should be grounded in <strong>actual customer comments</strong>, not invented claims.</p>`,
    summaryPoints: ["Connected all supplier reviews into one comparison page", "Used score and sentiment outputs", "Created top-three and full-ranking sections"],
    metrics: [
      ["17", "providers in the available body HTML demo"],
      ["20", "providers in the later official score report"],
      ["30", "comment cards in the June update"],
      ["1,500+", "social comments referenced in the page intro"]
    ],
    callouts: [
      ["Comparison", "The page links review work into a <strong>market-level ranking</strong>."],
      ["Evidence", "Scores are supported by comment analysis and sentiment outputs."],
      ["Versioning", "The demo has 17 providers; the later report expands to 20."]
    ],
    deepDive: [
      {
        title: "Why the ranking page was created",
        body: `<p>Individual review pages answer "What do people say about this supplier?". The ranking page answers a broader question: <strong>which suppliers look strongest when the review evidence is compared?</strong></p><p>This makes sense for SEO because best-provider queries are naturally comparative. A user does not only want one provider profile; they want a ranked overview, methodology and a way to go deeper into each supplier.</p><p>The strategic point is the same as the review cluster: if Google and users reward <strong>real customer evidence</strong>, then the ranking should not be a generic editorial list. It should be a comparison built from the same score, sentiment and comment system.</p>`
      },
      {
        title: "How we worked: scores, sentiment and page update",
        body: `<p>The page combines review scores, provider cards, comment cards and sentiment/emotion sections. The June update refreshed the podium, replaced outdated supplier references, moved scores to a <strong>0-10 review scale</strong> and made the sentiment area clearer.</p><div class="process-flow"><article><span>Podium</span><p>Show the top three providers first, because many users want a quick answer before reviewing the complete table.</p></article><article><span>Method</span><p>Explain that ranking values come from the approved comment scoring pipeline, including overall and cluster scores.</p></article><article><span>Evidence</span><p>Use real comment cards and sentiment outputs so the page feels grounded in customer language, not only in editorial claims.</p></article><article><span>Ranking</span><p>Keep the full provider list available so users can compare beyond the top three and move into each detailed review page.</p></article></div><p>The official score report later expanded the comparison to <strong>20 providers</strong>, with fixed cluster weights and tie-break logic, so the ranking could remain consistent across future updates.</p>`
      },
      {
        title: "How it helps users",
        body: `<p>The page gives users a faster way to compare suppliers without opening every review page first. The <strong>top-three area</strong> supports quick orientation, while the full ranking and provider links allow deeper exploration.</p><p>It also helps internal linking: the ranking page can point naturally to each review page, and each review page can point back to the market-level comparison. This creates a circular path between <strong>comparison intent</strong> and <strong>single-provider investigation</strong>.</p>`
      }
    ],
    performancePlaceholder: "Future data can compare search performance for the ranking page before and after the update, including queries around best suppliers and reviews.",
    urlPlaceholder: "This can later link the ranking page to all individual provider review URLs and show which ones were created or refreshed.",
    demos: [
      { label: "Ranking intro", path: "demos/provider-ranking-intro.html" },
      { label: "Ranking body", path: "demos/provider-ranking-body.html" }
    ]
  },
  {
    id: "summary",
    title: "Review Summary Blocks",
    shortTitle: "Review Summary",
    category: "Internal linking + revamp",
    status: "Standalone box",
    summary: "Compact review components for supplier mother pages, designed as <strong>soft revamp</strong>, trust layer and internal-linking entry point.",
    explanation: `<p>This is not the full review page. It is a compact block inserted into existing provider pages to show <strong>score, ranking, selected real comments</strong> and a CTA toward the full review or ranking page.</p><p>The goal is to refresh the mother page without rebuilding it completely, while giving users a visible reason to continue into the deeper review ecosystem.</p>`,
    summaryPoints: ["Added review evidence to mother pages", "Created a soft revamp without full rewrites", "Improved internal linking toward full reviews"],
    metrics: [
      ["17", "validated summary blocks"],
      ["3+1", "desktop comment-card pattern"],
      ["100%", "QA pass set in the workspace"],
      ["1", "CTA to the full ranking page"]
    ],
    callouts: [
      ["Soft revamp", "Improves existing provider pages without a full rewrite."],
      ["Internal link", "Creates a natural path toward the <strong>full review page</strong>."],
      ["Trust", "Uses score, rank and real comments from validated sources."]
    ],
    deepDive: [
      {
        title: "Why the block was created",
        body: `<p>Provider mother pages can be important SEO assets, but they do not always expose the strongest review evidence. The summary block adds a visible trust layer by showing <strong>review score, position in the ranking and real social comments</strong>.</p><p>This creates a small but meaningful revamp: the page feels more current, more evidence-based and more connected to the review work.</p><p>The block also solves an internal-linking problem. Instead of adding a generic link to the review page, it gives users a concrete reason to continue: they can see a score, a rank and a preview of the actual comments.</p>`
      },
      {
        title: "How we worked: component logic and QA",
        body: `<p>The component follows strict rules. Scores, rankings, authors, platforms, comments and URLs must come from validated review sources. The block also has a controlled layout: comment cards, CTA behavior, source labels and mobile/desktop states.</p><div class="process-flow"><article><span>Extract</span><p>Read score, rank, comment count and cluster anchors from the provider review outputs and official review facts.</p></article><article><span>Select</span><p>Choose real comments from the body files, preserving author, platform, URL and source label without inventing quotes.</p></article><article><span>Link</span><p>Use a clean review URL in the method note, a cluster anchor for the blurred teaser and the ranking URL for the final CTA.</p></article><article><span>Check</span><p>Validate desktop/mobile behavior, popup states, source consistency and HTML output for each generated provider block.</p></article></div><p>The workspace includes validated summary outputs for many providers, with a standard pattern: <strong>three real comments plus one blurred teaser on desktop</strong>, and a compact two-comment version on mobile.</p>`
      },
      {
        title: "How it helps users",
        body: `<p>The block gives users a quick preview of what people say about a supplier without forcing them to leave the page immediately. If the user wants more detail, the CTA and links continue the journey toward the full review.</p><p>For SEO, this creates a more natural internal link: the link is not just placed for crawlability, it is connected to the user's curiosity about <strong>score, ranking and real opinions</strong>. It is a soft revamp because it improves the page's usefulness without requiring a full page rewrite.</p>`
      }
    ],
    performancePlaceholder: "Future data could compare mother-page engagement or internal-click movement before and after adding the block, using percentage-only reporting.",
    urlPlaceholder: "Future URL inventory: mother pages where the summary block was inserted, plus the review URL each block points to.",
    demos: [
      { label: "Octopus summary", path: "demos/review-summary-octopus.html" }
    ]
  },
  {
    id: "nrj2-analysis",
    title: "NRJ2 SEO & Business Analysis",
    shortTitle: "NRJ2 Analysis",
    category: "SEO + business diagnosis",
    status: "Analysis case",
    summary: "A diagnostic analysis connecting <strong>SEO data, URL families, phone pickups and business signals</strong> for energia-luce.it.",
    explanation: `<p>This is an analysis project rather than an implemented page. The objective was to understand which page families were working, which ones were inefficient and how organic visibility connected to <strong>business outcomes</strong>.</p><p>The analysis helped separate pages that generate traffic from pages that generate useful commercial value.</p>`,
    summaryPoints: ["Grouped URLs by page family and intent", "Connected SEO signals with business outcomes", "Identified pages with traffic but weaker conversion value"],
    metrics: [
      ["2,954", "URLs in the broader analysis window"],
      ["992", "URLs covered by the GSC export"],
      ["659", "city branch pages in one key segment"],
      ["37", "branch hub pages matched in the map analysis"]
    ],
    callouts: [
      ["Scope", "SEO exports, crawl files and business KPI files were connected."],
      ["Finding", "Some visible pages had <strong>intent mismatch</strong> with business goals."],
      ["Use", "The analysis supported page-level recommendations and map reasoning."]
    ],
    deepDive: [
      {
        title: "Why the analysis was created",
        body: `<p>The site needed a diagnosis that went beyond traffic. A page can bring visits and still be weak from a business point of view if the user's intent is <strong>post-sale, support-oriented, local-only or not aligned with acquisition</strong>.</p><p>The question was therefore: <strong>which SEO areas are actually useful for the business</strong>, and which ones mostly create visibility without enough client value?</p><p>This mattered for the branch pages because local-intent pages can produce activity, calls or navigation signals, but they may not always turn into valuable clients. The analysis was designed to separate <strong>SEO visibility</strong> from <strong>commercial usefulness</strong>.</p>`
      },
      {
        title: "How we worked: SEO and business signals",
        body: `<p>The analysis combined <strong>SEO exports, crawl information and business KPI files</strong>. URLs were grouped into page families and then compared through traffic, phone pickups, expected clients and intent. The final workbook was organized around global trend, pre/post comparison, SEO winners, business winners, pages with pickup but no clients, next steps and URL families.</p><div class="process-flow"><article><span>Group</span><p>Classify URLs by family and intent, including city branch pages, branch hubs and other SEO page types.</p></article><article><span>Join</span><p>Connect GSC coverage, crawl status and business files so the analysis is not limited to ranking or clicks.</p></article><article><span>Compare</span><p>Read SEO winners against business winners, then isolate pages with visibility or phone pickup but weak client outcomes.</p></article><article><span>Decide</span><p>Use the findings to define next steps: refresh, redesign, consolidate, reframe intent or avoid overinvesting in low-value traffic.</p></article></div><p>The core insight is that <strong>not all organic traffic has the same value</strong>. A page can be strong in Search Console and still require a different UX or business expectation if the intent is local information rather than acquisition.</p>`
      },
      {
        title: "How it helps decision-making",
        body: `<p>The analysis helps avoid treating all organic traffic as equal. For example, support or branch-intent pages can be useful, but they need different expectations from commercial comparison pages.</p><p>This kind of work supports better prioritization: <strong>refresh pages with opportunity</strong>, redesign pages with intent friction, create modules that filter local intent more clearly and avoid investing too much in traffic that cannot reasonably convert.</p>`
      }
    ],
    performancePlaceholder: "This project already has analysis workbooks. If needed, this panel can later show sanitized charts from GSC and business KPIs without exposing sensitive raw values.",
    urlPlaceholder: "Future URL inventory can list page families and representative URLs, not necessarily every raw business URL.",
    demos: []
  },
  {
    id: "sportelli",
    title: "Interactive Branch Map",
    shortTitle: "Branch Map",
    category: "Local SEO module",
    status: "Prototype / not implemented",
    summary: "A prototype for a <strong>regional branch map</strong> that helps users navigate city/provider pages through local intent.",
    explanation: `<p>The branch map was not implemented, but it is important as a reasoning project. It transforms a large branch URL inventory into an interactive module where users can search by <strong>region, city, province or provider</strong> and reach the right page.</p><p>The idea came from the broader NRJ2 analysis: some branch hubs may generate activity without strong client outcomes, so the module acts as a <strong>local-intent filter</strong>.</p>`,
    summaryPoints: ["Mapped branch URLs into a searchable interface", "Filtered local intent before generic conversion actions", "Kept SEO value tied to crawlable links"],
    metrics: [
      ["1,788", "branches collected"],
      ["1,297", "publishable URLs in the widget"],
      ["20", "Italian regions in the map"],
      ["7,896", "municipalities indexed in the dataset"]
    ],
    callouts: [
      ["Prototype", "The module was designed and reasoned through, but <strong>not implemented</strong>."],
      ["Inventory", "Only validated URLs were intended for publishable links."],
      ["Caveat", "SEO value depends on crawlable links and indexable city pages."]
    ],
    deepDive: [
      {
        title: "Why the map was designed",
        body: `<p>The branch inventory was large and difficult to navigate through a flat page. If a user is searching for a local branch, the real task is not reading a generic paragraph: it is finding the closest or most relevant <strong>city/provider page</strong>.</p><p>The business reasoning was also important. If branch hubs generate calls but few clients, the page may be attracting users with <strong>local, navigational or support-like intent</strong>. A map can help filter that intent before pushing a generic conversion path.</p><p>The project was therefore a prototype, not an implemented final feature: the value was in building and testing the logic for a more useful local SEO module.</p>`
      },
      {
        title: "How we worked: data and module logic",
        body: `<p>The module combined <strong>sitemap data, crawl status, branch fields and geographic normalization</strong>. The publishable widget was designed to include only URLs that could realistically be used, not every historical URL found in old exports.</p><div class="process-flow"><article><span>Validate</span><p>Keep URLs present in the live sitemap or validated with local crawl status 200, while preserving historical exports only for analysis.</p></article><article><span>Normalize</span><p>Standardize city, province, region and provider fields, using Italian municipality data where geographic matching was needed.</p></article><article><span>Interface</span><p>Build an SVG Italy map by region, mobile fallback buttons, search by city/provider/province and direct links to local pages.</p></article><article><span>Publish</span><p>Package the module as scoped HTML/CSS/JS for Gutenberg, with no external dependencies and real crawlable HTML links.</p></article></div><p>This distinction is important for SEO: a beautiful visual map is not enough. The module needs <strong>real links</strong>, validated destinations and a structure that remains usable on mobile.</p>`
      },
      {
        title: "How it helps users and SEO",
        body: `<p>For users, the map makes local navigation faster and more intuitive: they can select a region, search a city or provider and move directly to the most relevant page.</p><p>For SEO, the value depends on implementation. If links are <strong>real crawlable HTML links</strong> and the destination pages are indexable, the module can support discovery and internal linking. If implemented only as a visual tool without crawlable links, the strongest value would be <strong>UX and business filtering</strong> rather than direct SEO impact.</p>`
      }
    ],
    performancePlaceholder: "If this project is revisited, this slot can show percentage-only movement for city-page traffic, map interactions and branch-hub conversion quality.",
    urlPlaceholder: "Future URL inventory: branch hub pages, city branch pages and the source status for each URL.",
    demos: [
      { label: "Branch map", path: "demos/sportelli-map.html" }
    ]
  },
  {
    id: "social-media",
    title: "Social Media & Event Content",
    shortTitle: "Ladywoods / BGSA",
    category: "Social media + event communication",
    status: "Secondary portfolio area",
    summary: "Social media and digital documentation work for <strong>Beach Golf Sport Association</strong> and the Ladywoods Golf EU Project.",
    explanation: `<p>This section covers the social media manager and content creator side of the Ladywoods Golf / BGSA experience. It includes <strong>posts, reels, videos, photos, vertical formats, promotional material and post-event documentation</strong>.</p><p>For now it stays as a lighter portfolio box, because the detailed content examples will be added later.</p>`,
    summaryPoints: ["Produced event and social content", "Supported communication in an international project", "Ready for future channel and content examples"],
    metrics: [
      ["225", "women trained across the EU project"],
      ["2", "Ladywoods/BGSA work phases in CV materials"],
      ["EN", "international participant support in English"],
      ["Future", "content examples to be added later"]
    ],
    callouts: [
      ["Role", "Social content, event communication and live documentation."],
      ["Context", "EU-funded sport project with international participants."],
      ["Next step", "Future upload can include channels, formats and sample posts."]
    ],
    deepDive: [
      {
        title: "Why it matters in the portfolio",
        body: `<p>This experience broadens the portfolio beyond SEO. It shows work with <strong>event communication, visual documentation, social formats and international coordination</strong>.</p><p>It is useful because SEO and content marketing both require audience understanding, clear messaging and the ability to package information for different channels.</p>`
      },
      {
        title: "How the work was done",
        body: `<p>The work included creating and supporting social content for the Ladywoods Golf EU Project: photos, videos, reels, vertical formats, promotional material and post-event archives. It also involved event logistics, participant support and coordination with partners or suppliers.</p><p>Because the content happened around live events, the workflow required speed, adaptability and the ability to document useful moments while also supporting operations on site.</p>`
      },
      {
        title: "What will be added later",
        body: `<p>When you provide more details, this section can include specific channels, screenshots, content types, goals and performance indicators. For now, it is intentionally presented as a <strong>secondary but relevant digital experience</strong>.</p>`
      }
    ],
    performancePlaceholder: "Future data could show selected social statistics, content examples or event communication outputs once you decide what can be shown publicly.",
    urlPlaceholder: "Future URL inventory: public posts, channels, event pages or selected media assets if available.",
    demos: []
  },
  {
    id: "offpage",
    title: "Off-page Articles & Backlinks",
    shortTitle: "Off-page Articles",
    category: "Off-page SEO + outreach",
    status: "Secondary SEO work",
    summary: "News-based articles written for <strong>online newspaper outreach</strong>, with internal links designed to support backlink acquisition.",
    explanation: `<p>This project covers the off-page side of the SEO work: finding relevant news sources, extracting reliable facts and writing short journalistic-style articles that could be sent to online newspapers or external publishers.</p><p>The goal was to support <strong>backlink acquisition for priority pages</strong>, while keeping the article useful, factual and natural rather than promotional.</p>`,
    summaryPoints: ["Found relevant news sources", "Wrote outreach-ready articles", "Integrated strategic internal links"],
    metrics: [
      ["500", "max body words in the off-page article workflow"],
      ["7", "internal links selected from a whitelist"],
      ["3", "H2 sections per article"],
      ["29", "authorized Papernest URLs in the whitelist"]
    ],
    callouts: [
      ["Research", "Articles started from <strong>real news sources</strong>, not generic rewritten content."],
      ["Link building", "Each article used selected internal links and descriptive anchors to support priority URLs."],
      ["Quality gate", "The workflow checked word count, source sufficiency, title data and Italian proofreading."]
    ],
    deepDive: [
      {
        title: "Why off-page articles were useful",
        body: `<p>Some SEO goals cannot be supported only by on-page work. Priority pages also need authority signals, and off-page content can help when it is used for outreach and backlink acquisition.</p><p>The idea was to create short articles that online newspapers or partner sites could publish: useful enough for readers, connected to current news and structured so that links toward Papernest pages felt natural.</p>`
      },
      {
        title: "How we worked: news research and article structure",
        body: `<p>The workflow started by finding a relevant source article or news item, then extracting the facts that could be used safely: dates, numbers, amounts, percentages and the main topic. If the source was too thin or inaccessible, the article should not be produced.</p><ul><li><strong>Source check:</strong> avoid inventing data when the source does not provide enough information.</li><li><strong>Article shape:</strong> maximum 500 words, one strong H1 with a real number, and exactly three H2 sections.</li><li><strong>Link selection:</strong> choose seven different internal URLs from an approved whitelist.</li><li><strong>Anchor text:</strong> use descriptive anchors connected to the topic, avoiding generic text such as "click here".</li></ul>`
      },
      {
        title: "How it helps SEO",
        body: `<p>The value is not only the article itself, but the combination of <strong>topical relevance, factual writing and backlink opportunity</strong>. A well-built off-page article can support target pages while keeping the external publication readable and non-spammy.</p><p>This also shows a different SEO skill: connecting news research, editorial judgment, link strategy and outreach-ready formatting.</p>`
      }
    ],
    performancePlaceholder: "Future data could show which priority URLs were supported by off-page articles, backlink status and any ranking or visibility movement after publication.",
    urlPlaceholder: "Future URL inventory: source news URLs, outreach article files and target Papernest URLs used as backlink destinations.",
    demos: []
  },
  {
    id: "creator",
    title: "Content Creator & Community",
    shortTitle: "Creator Work",
    category: "Broader digital experience",
    status: "Secondary portfolio area",
    summary: "Independent creator work across <strong>gaming and football communities</strong>, useful to show audience thinking and content analytics.",
    explanation: `<p>This is not the main SEO experience, but it gives useful context. Independent creator work means working with <strong>audiences, formats, retention, tutorials, recurring questions, community feedback and platform metrics</strong>.</p><p>It supports the broader profile because SEO is also about understanding intent, packaging information and improving content based on user response.</p>`,
    summaryPoints: ["Managed gaming and football communities", "Worked across long-form and short-form formats", "Used feedback and metrics to iterate content"],
    metrics: [
      ["70k+", "gaming YouTube subscribers reported in old CV"],
      ["35k+", "gaming TikTok followers reported in old CV"],
      ["30k", "football Instagram followers reported in old CV"],
      ["28k", "football YouTube subscribers reported in old CV"]
    ],
    callouts: [
      ["Audience", "Work across communities with recurring questions and feedback."],
      ["Formats", "Short-form, long-form, tutorials, analysis, news and interviews."],
      ["Value", "Useful background for SEO, content and social distribution."]
    ],
    deepDive: [
      {
        title: "Why it matters for the portfolio",
        body: `<p>Creator experience adds a practical audience layer. It shows that content is not only written for algorithms: it has to answer real questions, keep attention and adapt to platform behavior.</p><p>This connects well with SEO because search intent and community intent often overlap. The same ability to read user doubts can support better pages, better headings and better explanations.</p>`
      },
      {
        title: "How the work was done",
        body: `<p>The experience includes gaming tutorials and gameplay videos, plus football content such as analysis, news and interviews. The work required choosing topics, structuring explanations, reading comments and adapting formats to platform expectations.</p><p>Different channels required different logic: a tutorial needs clarity and searchability, short-form needs a fast hook, and community content needs consistency and recognizable positioning.</p>`
      },
      {
        title: "How it supports a digital marketing profile",
        body: `<p>This background is useful for roles where SEO, content and social distribution overlap. It shows comfort with publishing, feedback loops, audience analytics and content iteration.</p>`
      }
    ],
    performancePlaceholder: "Future data could show selected channel screenshots or public-facing performance highlights if you want to include them.",
    urlPlaceholder: "Future URL inventory: public channels or representative content examples, if you decide they are useful for applications.",
    demos: []
  }
];

const projectOrder = [
  "reviews",
  "offers",
  "sportelli",
  "summary",
  "ranking",
  "nrj2-analysis",
  "scraping",
  "offpage",
  "social-media",
  "creator"
];

const projectFilterOptions = [
  { id: "all", label: "Overview" },
  { id: "content", label: "Content SEO" },
  { id: "ai", label: "AI automation" },
  { id: "data", label: "Data analysis" },
  { id: "ux", label: "UX modules" },
  { id: "local", label: "Local SEO" },
  { id: "offpage", label: "Off-page SEO" },
  { id: "social", label: "Social / creator" }
];

const projectPortfolioMeta = {
  reviews: {
    areas: ["content", "ai", "data", "ux"],
    story: {
      main: "I redesigned supplier review pages as <strong>evidence-led SEO assets</strong>, using public customer comments instead of a generic editorial opinion format.",
      problem: "The SERP showed that users often trusted forums, Reddit threads or Facebook discussions more than standard review pages, both for us and for competitors.",
      analysis: "I read that as a search-intent signal: users wanted <strong>human proof</strong>. The solution was to scrape, clean and cluster comments, then connect each cluster to scores and WordPress-ready sections.",
      insight: "The page had to serve two paths: quick comparison for horizontal users, and deeper cluster exploration for users focused on one supplier.",
      output: "Final output: intro/body HTML demos, weighted scoring logic, sentiment clusters and a percentage-only GSC trend view for the 17-page review cluster."
    }
  },
  offers: {
    areas: ["content", "data", "ux"],
    story: {
      main: "I built supplier offer pages for high-intent energy searches where users need prices, conditions and activation context quickly.",
      problem: "Offer pages can easily become thin or repetitive because many suppliers use similar pricing language, FAQ patterns and commercial claims.",
      analysis: "The approach was to combine keyword checks, source data, differentiation reports and reusable HTML modules so each page had a clear reason to exist.",
      insight: "The strongest pages were not only descriptions of an offer; they helped users understand what changed, what to compare and what to check before activating.",
      output: "Final output: intro/body HTML pages, offer tables, price-history modules and a scalable structure for future Search Console performance slots."
    }
  },
  sportelli: {
    areas: ["local", "data", "ux"],
    story: {
      main: "I designed an interactive branch-map prototype to make a large local-SEO URL inventory easier to navigate.",
      problem: "Flat branch lists are hard to use, and branch-intent traffic can be local, navigational or support-oriented rather than immediately commercial.",
      analysis: "I connected sitemap/crawl status, branch data and geographic normalization to decide which URLs could become useful, crawlable destinations.",
      insight: "The map only has SEO value if the interface exposes real links and helps users filter local intent before pushing a generic conversion path.",
      output: "Final output: a non-implemented but fully reasoned map prototype with region/city/provider logic and a publishable HTML/CSS/JS direction."
    }
  },
  summary: {
    areas: ["content", "ux"],
    story: {
      main: "I created compact review-summary blocks for supplier mother pages, connecting existing pages to the new review ecosystem.",
      problem: "Mother pages could be important SEO assets but lacked visible review proof, making internal links toward review pages less compelling.",
      analysis: "The block needed to act as a soft revamp: add score, rank, selected real comments and a CTA without rewriting the whole page.",
      insight: "Internal linking works better when the link is attached to a user reason, not just inserted for crawlability.",
      output: "Final output: reusable review-summary HTML blocks with comment cards, score/rank signals and links toward full reviews or rankings."
    }
  },
  ranking: {
    areas: ["content", "data", "ux"],
    story: {
      main: "I updated a provider-ranking page so the comparison was grounded in the same real-comment system used by individual reviews.",
      problem: "A best-supplier page risks feeling generic if rankings are not supported by visible evidence or a clear scoring method.",
      analysis: "The page needed a podium, a full ranking, score explanation and sentiment signals that made the ranking easier to trust.",
      insight: "The strongest comparison page connects market-level intent with single-provider investigation through internal links and explainable scores.",
      output: "Final output: updated ranking intro/body HTML with top-three logic, full provider ranking and sentiment/comment evidence."
    }
  },
  "nrj2-analysis": {
    areas: ["data", "local"],
    story: {
      main: "I worked on an SEO and business diagnosis for energia-luce.it, connecting organic visibility with URL families and business signals.",
      problem: "Some pages can generate traffic or calls without producing useful commercial outcomes, especially when intent is local or support-oriented.",
      analysis: "The work grouped URLs by family, joined SEO exports with crawl and KPI files, and compared SEO winners with business winners.",
      insight: "Not all organic traffic has the same value. A page can look strong in Search Console while still needing a different UX or business expectation.",
      output: "Final output: analysis logic for page-family prioritization, branch-map reasoning and future percentage-only reporting."
    }
  },
  scraping: {
    areas: ["ai", "data"],
    story: {
      main: "I built the data-collection layer behind the review system, focused on gathering usable public customer comments.",
      problem: "Raw social data is noisy: spam, duplicates, vague mentions, off-topic posts and comments without decision value can weaken the final page.",
      analysis: "The workflow used Codex, Claude Code and Apify-style instructions to define what to collect, exclude and preserve before analysis.",
      insight: "Scraping was not the goal by itself. The real value was creating a clean, auditable evidence base for content, clustering and scoring.",
      output: "Final output: source rules, normalized exports, pre-cleaning logic and a pipeline that feeds sentiment/cluster analysis."
    }
  },
  offpage: {
    areas: ["offpage", "content"],
    story: {
      main: "I wrote news-based off-page articles designed for outreach and backlink acquisition toward priority pages.",
      problem: "Backlink content can become weak or promotional if it is not connected to real news, reliable facts and natural anchors.",
      analysis: "The workflow started from news research, extracted usable facts, then shaped short articles with controlled links from an approved whitelist.",
      insight: "Good off-page work sits between editorial judgment and link strategy: the article has to be useful before it can support SEO.",
      output: "Final output: outreach-ready article structures, source checks, anchor logic and internal-link selection rules."
    }
  },
  "social-media": {
    areas: ["social"],
    story: {
      main: "I supported social media and event communication for Ladywoods / BGSA, mainly through live content and documentation.",
      problem: "Event content has to be produced quickly while still being useful for promotion, archive and partner communication.",
      analysis: "The work required adapting formats across photos, videos, reels and post-event material while also supporting event logistics.",
      insight: "This experience adds a practical content-distribution layer to the SEO profile: audience, format and context matter.",
      output: "Final output: a secondary portfolio area ready for future channel screenshots, content examples and performance indicators."
    }
  },
  creator: {
    areas: ["social", "content"],
    story: {
      main: "I include independent creator work because it shows long-term audience thinking across gaming and football communities.",
      problem: "Content has to answer recurring questions, hold attention and adapt to platform behavior, not only exist as a finished post.",
      analysis: "The work involved tutorials, analysis, news and interviews, with feedback loops from comments, retention and platform metrics.",
      insight: "Community intent and search intent often overlap: both require understanding what people are really trying to solve.",
      output: "Final output: a broader digital profile showing publishing consistency, audience analytics and content iteration."
    }
  }
};

projects.forEach((project) => {
  Object.assign(project, projectPortfolioMeta[project.id] || {});
});

projects.sort((a, b) => projectOrder.indexOf(a.id) - projectOrder.indexOf(b.id));

let activeProjectId = projects[0].id;
let activeDemoIndex = 0;
let activeProjectFilter = "all";

const cvToggle = document.querySelector("#cvToggle");
const cvPanel = document.querySelector("#cvPanel");
const homeView = document.querySelector("#homeView");
const projectView = document.querySelector("#projectView");
const backButton = document.querySelector("#backButton");
const projectGrid = document.querySelector("#projectGrid");
const projectFilters = document.querySelector("#projectFilters");
const scrollProgress = document.querySelector("#scrollProgress");
const detailCategory = document.querySelector("#detailCategory");
const detailTitle = document.querySelector("#detailTitle");
const detailSummary = document.querySelector("#detailSummary");
const detailStatus = document.querySelector("#detailStatus");
const projectJumpNav = document.querySelector("#projectJumpNav");
const detailExplanation = document.querySelector("#detailExplanation");
const dataEvidenceSection = document.querySelector("#sectionEvidence");
const seoMetrics = document.querySelector("#seoMetrics");
const calloutGrid = document.querySelector("#calloutGrid");
const deepAccordion = document.querySelector("#deepAccordion");
const performanceSection = document.querySelector("#sectionPerformance");
const performanceTitle = document.querySelector("#performanceTitle");
const performancePeriod = document.querySelector("#performancePeriod");
const performanceNarrative = document.querySelector("#performanceNarrative");
const performanceChartMode = document.querySelector("#performanceChartMode");
const performanceChart = document.querySelector("#performanceChart");
const chartTooltip = document.querySelector("#chartTooltip");
const performanceComparison = document.querySelector("#performanceComparison");
const topPagesPanel = document.querySelector("#topPagesPanel");
const futureDataSection = document.querySelector("#sectionInventory");
const performanceSlotCard = document.querySelector("#performanceSlotCard");
const urlInventoryCard = document.querySelector("#urlInventoryCard");
const urlInventoryTitle = document.querySelector("#urlInventoryTitle");
const performancePlaceholder = document.querySelector("#performancePlaceholder");
const urlPlaceholder = document.querySelector("#urlPlaceholder");
const snapshotSection = document.querySelector("#sectionSnapshot");
const demoTabs = document.querySelector("#demoTabs");
const exampleArea = document.querySelector(".example-area");
const exampleTitle = document.querySelector("#exampleTitle");
const exampleLink = document.querySelector("#exampleLink");
const examplePath = document.querySelector("#examplePath");
const demoFrame = document.querySelector("#demoFrame");
let activeChartMode = "both";
let revealObserver;

const revealSelectors = [
  ".profile-hero",
  ".mini-cv div",
  ".cv-panel",
  ".resume-item",
  ".projects-section",
  ".project-filter-bar",
  ".project-box",
  ".project-page-head",
  ".project-jump-nav",
  ".story-panel",
  ".detail-section",
  ".deep-dive",
  ".seo-metric",
  ".callout-card",
  ".support-card",
  ".example-area",
  ".performance-comparison article",
  ".top-pages-list article",
  ".process-flow article",
  ".formula-grid article",
  ".user-path-card"
];

function updateScrollProgress() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  scrollProgress?.style.setProperty("--progress", `${clamp(progress, 0, 1) * 100}%`);
}

function ensureRevealObserver() {
  if (revealObserver || !("IntersectionObserver" in window)) {
    return;
  }

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-revealed");
      revealObserver.unobserve(entry.target);
    });
  }, {
    rootMargin: "0px 0px -8% 0px",
    threshold: 0.08
  });
}

function refreshScrollReveal(scope = document) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  ensureRevealObserver();

  scope.querySelectorAll(revealSelectors.join(",")).forEach((element, index) => {
    if (element.closest("[hidden]")) {
      return;
    }

    element.classList.add("reveal-on-scroll");
    if (!element.style.getPropertyValue("--reveal-index")) {
      element.style.setProperty("--reveal-index", index % 8);
    }

    if (reduceMotion || !revealObserver) {
      element.classList.add("is-revealed");
      return;
    }

    revealObserver.observe(element);
  });
}

function getActiveProject() {
  return projects.find((project) => project.id === activeProjectId) || projects[0];
}

function routeFromHash() {
  const match = window.location.hash.match(/^#project\/([\w-]+)$/);
  return match ? match[1] : null;
}

function setViewFromHash() {
  const projectId = routeFromHash();
  if (projectId && projects.some((project) => project.id === projectId)) {
    activeProjectId = projectId;
    activeDemoIndex = 0;
    homeView.hidden = true;
    projectView.hidden = false;
    renderProjectDetail(getActiveProject());
    window.scrollTo({ top: 0, behavior: "auto" });
    requestAnimationFrame(() => {
      refreshScrollReveal(projectView);
      updateScrollProgress();
    });
    return;
  }

  homeView.hidden = false;
  projectView.hidden = true;
  demoFrame.src = "about:blank";
  renderProjectGrid();
  requestAnimationFrame(() => {
    refreshScrollReveal(homeView);
    updateScrollProgress();
  });
}

function getAreaLabel(areaId) {
  return projectFilterOptions.find((option) => option.id === areaId)?.label || areaId;
}

function getFilteredProjects() {
  if (activeProjectFilter === "all") {
    return projects;
  }

  return projects.filter((project) => project.areas?.includes(activeProjectFilter));
}

function renderProjectFilters() {
  projectFilters.innerHTML = projectFilterOptions.map((option) => {
    const count = option.id === "all"
      ? projects.length
      : projects.filter((project) => project.areas?.includes(option.id)).length;

    return `
      <button
        class="${activeProjectFilter === option.id ? "is-active" : ""}"
        type="button"
        data-project-filter="${option.id}"
        aria-pressed="${activeProjectFilter === option.id}"
      >
        <span>${option.label}</span>
        <strong>${count}</strong>
      </button>
    `;
  }).join("");

  projectFilters.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      activeProjectFilter = button.dataset.projectFilter;
      renderProjectFilters();
      renderProjectGrid();
      requestAnimationFrame(() => refreshScrollReveal(projectGrid));
    });
  });
}

function renderProjectGrid() {
  const visibleProjects = getFilteredProjects();

  projectGrid.innerHTML = visibleProjects.map((project, index) => `
    <a class="project-box" href="#project/${project.id}" aria-label="Open ${project.title}" style="--reveal-index:${index}">
      <span class="project-box__index">${String(index + 1).padStart(2, "0")}</span>
      <span class="project-box__category">${project.category}</span>
      <strong>${project.shortTitle}</strong>
      <span class="project-box__summary">${project.summary.replace(/<[^>]*>/g, "")}</span>
      <span class="project-box__footer">
        <span class="project-area-tags">
          ${(project.areas || []).map((area) => `<i>${getAreaLabel(area)}</i>`).join("")}
        </span>
        <span>Open</span>
      </span>
    </a>
  `).join("");
}

const svgNamespace = "http://www.w3.org/2000/svg";

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  }[char]));
}

function formatInteger(value) {
  return new Intl.NumberFormat("en-US").format(Math.round(value));
}

function formatCompact(value) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: value >= 1000 ? 1 : 0
  }).format(value);
}

function formatSignedPercent(value) {
  if (!Number.isFinite(value)) {
    return "n/a";
  }
  const sign = value > 0 ? "+" : "";
  return `${sign}${(value * 100).toFixed(0)}%`;
}

function formatSignedPoints(value, suffix = "") {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}${suffix}`;
}

function formatPercent(value, digits = 2) {
  return `${(value * 100).toFixed(digits)}%`;
}

function formatShortDate(dateValue) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(`${dateValue}T00:00:00`));
}

function formatLongDate(dateValue) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(`${dateValue}T00:00:00`));
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function createSvgElement(name, attributes = {}) {
  const element = document.createElementNS(svgNamespace, name);
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, String(value));
  });
  return element;
}

function pointsToPath(points) {
  return points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
}

function getPerformanceDataset(project) {
  return project.performanceKey ? window.portfolioPerformanceData?.[project.performanceKey] : null;
}

function renderPerformanceChartMode(dataset) {
  const modes = [
    ["both", "Both"],
    ["clicks", "Clicks"],
    ["impressions", "Impressions"]
  ];

  performanceChartMode.innerHTML = modes.map(([mode, label]) => `
    <button
      class="${activeChartMode === mode ? "is-active" : ""}"
      type="button"
      data-chart-mode="${mode}"
      aria-pressed="${activeChartMode === mode}"
    >${label}</button>
  `).join("");

  performanceChartMode.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      activeChartMode = button.dataset.chartMode;
      hideChartTooltip();
      renderPerformanceChartMode(dataset);
      renderPerformanceChart(dataset);
    });
  });
}

function renderProjectJumpNav(project, dataset) {
  const links = [
    ["Summary", "sectionSummary"],
    ["Deep dive", "sectionDeepDive"],
    ...(!project.hideKeyNumbers ? [["Key numbers", "sectionEvidence"]] : []),
    ...(dataset ? [["GSC trend", "sectionPerformance"]] : []),
    ["URLs", "sectionInventory"],
    ...(!project.hideSnapshot ? [["Snapshot", "sectionSnapshot"]] : []),
    ...(project.demos.length ? [["HTML demo", "sectionExamples"]] : [])
  ];

  projectJumpNav.innerHTML = `
    <p>Click to jump to the section you want to review.</p>
    <div class="project-jump-list">
      ${links.map(([label, target]) => `
        <button type="button" data-section-target="${target}">${label}</button>
      `).join("")}
    </div>
  `;

  projectJumpNav.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector(`#${button.dataset.sectionTarget}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
}

function renderPerformance(project, dataset) {
  if (!dataset) {
    performanceSection.hidden = true;
    performanceChart.innerHTML = "";
    chartTooltip.hidden = true;
    return;
  }

  const { deltas } = dataset;

  performanceSection.hidden = false;
  performanceTitle.textContent = dataset.title;
  performancePeriod.textContent = dataset.source.dateRange;
  performanceNarrative.innerHTML = `
    <p>${dataset.narrative.summary}</p>
    ${dataset.narrative.insights?.length ? `<ul>
      ${dataset.narrative.insights.map((insight) => `<li>${insight}</li>`).join("")}
    </ul>` : ""}
  `;

  performanceComparison.innerHTML = `
    <article class="${deltas.clickTrend.direction === "improved" ? "is-improved" : "is-declined"}">
      <span>Click trend</span>
      <strong>${formatSignedPercent(deltas.clickTrend.percent)}</strong>
      <p>daily average variation after the update</p>
    </article>
    <article class="${deltas.impressionTrend.direction === "improved" ? "is-improved" : "is-declined"}">
      <span>Impression trend</span>
      <strong>${formatSignedPercent(deltas.impressionTrend.percent)}</strong>
      <p>daily visibility variation after the update</p>
    </article>
    <article class="${deltas.ctrTrend.direction === "improved" ? "is-improved" : "is-declined"}">
      <span>CTR trend</span>
      <strong>${formatSignedPercent(deltas.ctrTrend.percent)}</strong>
      <p>relative click-through variation</p>
    </article>
    <article class="${deltas.positionTrend.direction === "improved" ? "is-improved" : "is-declined"}">
      <span>Position trend</span>
      <strong>${formatSignedPercent(deltas.positionTrend.percent)}</strong>
      <p>relative improvement, lower position is better</p>
    </article>
  `;

  if (dataset.pageMovements?.length) {
    renderPageMovements(dataset);
  } else {
    renderTopPages(dataset, "total");
  }
  renderPerformanceChartMode(dataset);
  renderPerformanceChart(dataset);
}

function renderPageMovements(dataset) {
  const maxMovement = Math.max(...dataset.pageMovements.map((page) => Math.abs(page.clickChange || 0)), .01);

  topPagesPanel.innerHTML = `
    <div class="top-pages-head">
      <div>
        <p class="eyebrow">Percentage-only URL view</p>
        <h3>How key review pages moved</h3>
      </div>
    </div>
    <p class="top-pages-note">Only percentage variations are shown. Absolute Search Console values are not included in the public dataset.</p>
    <div class="top-pages-list" aria-label="Percentage-only page movements">
      ${dataset.pageMovements.map((page) => `
        <article>
          <div>
            <strong>${escapeHtml(page.provider)}</strong>
            <span>${formatSignedPercent(page.clickChange)} click trend · ${formatSignedPercent(page.impressionChange)} impression trend</span>
          </div>
          <i style="--bar:${Math.max(8, (Math.abs(page.clickChange || 0) / maxMovement) * 100).toFixed(1)}%"></i>
        </article>
      `).join("")}
    </div>
  `;
}

function renderTopPages(dataset, period) {
  const hasSplit = Boolean(dataset.topPagePeriodSplit?.available);
  const canShowPeriod = period === "total" || hasSplit;
  const topPages = canShowPeriod
    ? (period === "total" ? dataset.topPages : dataset.topPagesByPeriod?.[period] || []).slice(0, 6)
    : [];
  const activeLabel = {
    total: "Total period",
    before: "Before update",
    after: "After update"
  }[period];

  topPagesPanel.innerHTML = `
    <div class="top-pages-head">
      <div>
        <p class="eyebrow">Top contributing pages</p>
        <h3>Who carried the review cluster</h3>
      </div>
      <div class="top-pages-controls" aria-label="Top pages period filter">
        <button class="${period === "total" ? "is-active" : ""}" type="button" data-top-period="total" aria-pressed="${period === "total"}">Total period</button>
        <button class="${period === "before" ? "is-active" : ""}" type="button" data-top-period="before" aria-pressed="${period === "before"}">Before</button>
        <button class="${period === "after" ? "is-active" : ""}" type="button" data-top-period="after" aria-pressed="${period === "after"}">After</button>
      </div>
    </div>
    <p class="top-pages-note">${getTopPagesNote(dataset, period)}</p>
    ${topPages.length ? `<div class="top-pages-list" aria-label="${activeLabel}">
      ${topPages.map((page) => `
        <article>
          <div>
            <strong>${escapeHtml(page.provider)}</strong>
            <span>Percentage-only movement unavailable for this legacy export.</span>
          </div>
          <i style="--bar:36%"></i>
        </article>
      `).join("")}
    </div>` : `
      <div class="top-pages-empty">
        <strong>${activeLabel} URL ranking needs another export</strong>
        <p>Send a GSC export with both <strong>Page</strong> and <strong>Date</strong> dimensions to calculate a real before/after ranking for each URL.</p>
      </div>
    `}
  `;

  topPagesPanel.querySelectorAll("[data-top-period]").forEach((button) => {
    button.addEventListener("click", () => {
      renderTopPages(dataset, button.dataset.topPeriod);
    });
  });
}

function getTopPagesNote(dataset, period) {
  if (period === "total") {
    return escapeHtml("Ranking based on the total exported period.");
  }

  if (dataset.topPagePeriodSplit?.available) {
    const periodInfo = dataset.topPagePeriodSplit[period];
    return escapeHtml(`${periodInfo.label}: ${periodInfo.range}.`);
  }

  return escapeHtml(dataset.topPagePeriodSplit?.reason || "Page-by-date export needed for this view.");
}

function renderFutureData(project, dataset) {
  futureDataSection.hidden = false;

  if (dataset?.urlInventory?.length) {
    performanceSlotCard.hidden = true;
    urlInventoryCard.classList.add("is-wide");
    urlInventoryTitle.textContent = "Review URL inventory";
    urlPlaceholder.innerHTML = `
      <span class="url-inventory-note">These are the ${dataset.urlInventory.length} review URLs included in the cluster. They have not been changed again after my update and should remain unchanged until <strong>August 8, 2026</strong>; after that, future edits are possible.</span>
      <ul class="url-inventory-list">
        ${dataset.urlInventory.map((item) => `
          <li>
            <a href="${item.url}" target="_blank" rel="noreferrer">${escapeHtml(item.provider)}</a>
          </li>
        `).join("")}
      </ul>
    `;
    return;
  }

  performanceSlotCard.hidden = false;
  urlInventoryCard.classList.remove("is-wide");
  urlInventoryTitle.textContent = "URL Inventory Slot";
  performancePlaceholder.innerHTML = project.performancePlaceholder;
  urlPlaceholder.innerHTML = project.urlPlaceholder;
}

function renderPerformanceChart(dataset) {
  const data = dataset.chart;
  const width = 940;
  const height = 360;
  const margin = { top: 30, right: 76, bottom: 46, left: 58 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const baseline = margin.top + innerHeight;
  const showClicks = activeChartMode !== "impressions";
  const showImpressions = activeChartMode !== "clicks";
  const allValues = data.flatMap((row) => [
    showClicks ? row.clickChange : null,
    showImpressions ? row.impressionChange : null
  ]).filter(Number.isFinite);
  const minValue = Math.min(0, ...allValues);
  const maxValue = Math.max(...allValues);
  const padding = Math.max((maxValue - minValue) * .14, .2);
  const yMin = Math.max(-1, minValue - padding);
  const yMax = Math.max(.5, maxValue + padding);

  const xScale = (index) => margin.left + (index / (data.length - 1)) * innerWidth;
  const yScale = (value) => baseline - ((value - yMin) / (yMax - yMin)) * innerHeight;

  const clickPoints = data.map((row, index) => ({
    x: xScale(index),
    y: yScale(row.clickChange),
    row,
    index
  }));
  const impressionPoints = data.map((row, index) => ({
    x: xScale(index),
    y: yScale(row.impressionChange),
    row,
    index
  }));
  const splitIndex = data.findIndex((row) => row.phase === "after");
  const splitX = xScale(splitIndex);

  performanceChart.innerHTML = "";
  performanceChart.append(createSvgElement("title", {}));
  performanceChart.querySelector("title").textContent = "Indexed Google Search Console percentage variation for review pages";

  if (splitIndex > 0) {
    performanceChart.append(createSvgElement("rect", {
      class: "chart-phase chart-phase--before",
      x: margin.left,
      y: margin.top,
      width: splitX - margin.left,
      height: innerHeight
    }));
    performanceChart.append(createSvgElement("rect", {
      class: "chart-phase chart-phase--after",
      x: splitX,
      y: margin.top,
      width: width - margin.right - splitX,
      height: innerHeight
    }));

    const beforeLabel = createSvgElement("text", {
      class: "chart-phase-label",
      x: margin.left + 12,
      y: margin.top + 18
    });
    beforeLabel.textContent = "Before";
    performanceChart.append(beforeLabel);

    const afterLabel = createSvgElement("text", {
      class: "chart-phase-label chart-phase-label--after",
      x: splitX + 12,
      y: margin.top + 18
    });
    afterLabel.textContent = "After";
    performanceChart.append(afterLabel);
  }

  [0, .25, .5, .75, 1].forEach((ratio) => {
    const y = baseline - ratio * innerHeight;
    const value = yMin + (yMax - yMin) * ratio;
    performanceChart.append(createSvgElement("line", {
      class: "chart-grid-line",
      x1: margin.left,
      x2: width - margin.right,
      y1: y,
      y2: y
    }));
    const clickLabel = createSvgElement("text", {
      class: "chart-axis-label",
      x: margin.left - 10,
      y: y + 4,
      "text-anchor": "end"
    });
    clickLabel.textContent = formatSignedPercent(value);
    performanceChart.append(clickLabel);
  });

  const zeroY = yScale(0);
  performanceChart.append(createSvgElement("line", {
    class: "chart-zero-line",
    x1: margin.left,
    x2: width - margin.right,
    y1: zeroY,
    y2: zeroY
  }));

  [0, 14, 31, 45, data.length - 1].forEach((index) => {
    if (!data[index]) return;
    const x = xScale(index);
    const dateLabel = createSvgElement("text", {
      class: "chart-axis-label",
      x,
      y: height - 14,
      "text-anchor": "middle"
    });
    dateLabel.textContent = formatShortDate(data[index].date);
    performanceChart.append(dateLabel);
  });

  if (showImpressions) {
    performanceChart.append(createSvgElement("path", {
      class: "chart-line chart-line--impressions",
      d: pointsToPath(impressionPoints)
    }));
  }

  if (showClicks) {
    performanceChart.append(createSvgElement("path", {
      class: "chart-line chart-line--clicks",
      d: pointsToPath(clickPoints)
    }));
  }

  performanceChart.append(createSvgElement("line", {
    class: "chart-update-line",
    x1: splitX,
    x2: splitX,
    y1: margin.top,
    y2: baseline
  }));
  const updateLabel = createSvgElement("text", {
    class: "chart-update-label",
    x: splitX + 8,
    y: margin.top + 14
  });
  updateLabel.textContent = "update";
  performanceChart.append(updateLabel);

  if (showClicks) {
    clickPoints.forEach((point) => {
      performanceChart.append(createSvgElement("circle", {
        class: "chart-point chart-point--clicks",
        cx: point.x,
        cy: point.y,
        r: 2.7
      }));
    });
  }

  if (showImpressions) {
    impressionPoints.forEach((point) => {
      performanceChart.append(createSvgElement("circle", {
        class: "chart-point chart-point--impressions",
        cx: point.x,
        cy: point.y,
        r: 2.3
      }));
    });
  }

  const focusGroup = createSvgElement("g", { class: "chart-focus is-hidden" });
  focusGroup.append(createSvgElement("line", {
    class: "chart-focus-line",
    x1: margin.left,
    x2: margin.left,
    y1: margin.top,
    y2: baseline
  }));
  focusGroup.append(createSvgElement("circle", {
    class: "chart-focus-dot chart-focus-dot--clicks",
    cx: margin.left,
    cy: baseline,
    r: 6
  }));
  focusGroup.append(createSvgElement("circle", {
    class: "chart-focus-dot chart-focus-dot--impressions",
    cx: margin.left,
    cy: baseline,
    r: 5
  }));
  performanceChart.append(focusGroup);

  const hitWidth = innerWidth / data.length;
  data.forEach((row, index) => {
    const clickPoint = clickPoints[index];
    const impressionPoint = impressionPoints[index];
    const anchorY = Math.min(
      showClicks ? clickPoint.y : baseline,
      showImpressions ? impressionPoint.y : baseline
    );
    const point = {
      x: xScale(index),
      y: anchorY,
      clickY: clickPoint.y,
      impressionY: impressionPoint.y,
      row,
      index,
      showClicks,
      showImpressions
    };
    const marker = createSvgElement("rect", {
      class: "chart-hit",
      x: point.x - hitWidth / 2,
      y: margin.top,
      width: hitWidth,
      height: innerHeight,
      tabindex: "0",
      "aria-label": `${formatLongDate(row.date)}: ${formatSignedPercent(row.clickChange)} click variation and ${formatSignedPercent(row.impressionChange)} impression variation`
    });
    marker.addEventListener("mouseenter", () => showChartTooltip(point, dataset));
    marker.addEventListener("mousemove", () => showChartTooltip(point, dataset));
    marker.addEventListener("click", () => showChartTooltip(point, dataset));
    marker.addEventListener("focus", () => showChartTooltip(point, dataset));
    marker.addEventListener("blur", hideChartTooltip);
    marker.addEventListener("mouseleave", hideChartTooltip);
    performanceChart.append(marker);
  });
}

function showChartTooltip(point, dataset) {
  const chartShell = performanceChart.closest(".chart-shell");
  const chartRect = chartShell.getBoundingClientRect();
  const focusGroup = performanceChart.querySelector(".chart-focus");
  const focusLine = performanceChart.querySelector(".chart-focus-line");
  const focusClick = performanceChart.querySelector(".chart-focus-dot--clicks");
  const focusImpression = performanceChart.querySelector(".chart-focus-dot--impressions");

  focusGroup?.classList.remove("is-hidden");
  focusLine?.setAttribute("x1", point.x);
  focusLine?.setAttribute("x2", point.x);
  focusClick?.setAttribute("cx", point.x);
  focusClick?.setAttribute("cy", point.clickY);
  focusClick?.classList.toggle("is-hidden", !point.showClicks);
  focusImpression?.setAttribute("cx", point.x);
  focusImpression?.setAttribute("cy", point.impressionY);
  focusImpression?.classList.toggle("is-hidden", !point.showImpressions);

  chartTooltip.hidden = false;
  chartTooltip.className = "chart-tooltip";
  chartTooltip.innerHTML = `
    <strong>${formatLongDate(point.row.date)}</strong>
    <span>${point.row.phase === "before" ? dataset.periods.before.label : dataset.periods.after.label}</span>
    ${point.showClicks ? `<p><b class="tooltip-dot tooltip-dot--clicks"></b>${formatSignedPercent(point.row.clickChange)} click variation</p>` : ""}
    ${point.showImpressions ? `<p><b class="tooltip-dot tooltip-dot--impressions"></b>${formatSignedPercent(point.row.impressionChange)} impression variation</p>` : ""}
    <p class="tooltip-note">Compared with the May daily baseline</p>
  `;

  const anchorX = chartRect.left + (point.x / 940) * chartRect.width;
  const anchorY = chartRect.top + (point.y / 360) * chartRect.height;
  const tooltipWidth = chartTooltip.offsetWidth || 190;
  const tooltipHeight = chartTooltip.offsetHeight || 126;
  const gap = 14;
  const viewportPadding = 10;
  const left = clamp(anchorX - tooltipWidth / 2, viewportPadding, window.innerWidth - tooltipWidth - viewportPadding);
  let top = anchorY - tooltipHeight - gap;

  if (top < viewportPadding) {
    top = anchorY + gap;
    chartTooltip.classList.add("is-below");
  }

  chartTooltip.style.left = `${left}px`;
  chartTooltip.style.top = `${clamp(top, viewportPadding, window.innerHeight - tooltipHeight - viewportPadding)}px`;
}

function hideChartTooltip() {
  chartTooltip.hidden = true;
  performanceChart.querySelector(".chart-focus")?.classList.add("is-hidden");
}

function renderProjectStory(project) {
  if (!project.story) {
    return project.explanation;
  }

  const storyItems = [
    ["Main story", project.story.main],
    ["Problem", project.story.problem],
    ["My analysis", project.story.analysis],
    ["Core insight", project.story.insight],
    ["Final output", project.story.output]
  ];

  return `
    <div class="project-summary-story">
      ${storyItems.map(([label, body]) => `
        <article>
          <span>${label}</span>
          <p>${body}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function renderProjectDetail(project) {
  const performanceDataset = getPerformanceDataset(project);

  detailCategory.textContent = project.category;
  detailTitle.textContent = project.title;
  detailSummary.innerHTML = project.summary;
  detailStatus.textContent = project.status;
  renderProjectJumpNav(project, performanceDataset);
  dataEvidenceSection.hidden = Boolean(project.hideKeyNumbers);
  snapshotSection.hidden = Boolean(project.hideSnapshot);
  detailExplanation.innerHTML = `
    ${renderProjectStory(project)}
    ${project.summaryPoints?.length ? `
      <ul class="summary-points">
        ${project.summaryPoints.map((point) => `<li>${point}</li>`).join("")}
      </ul>
    ` : ""}
  `;

  seoMetrics.innerHTML = project.metrics.map(([value, label]) => `
    <div class="seo-metric">
      <strong>${value}</strong>
      <span>${label}</span>
    </div>
  `).join("");

  calloutGrid.innerHTML = project.callouts.map(([title, body]) => `
    <article class="callout-card">
      <span>${title}</span>
      <p>${body}</p>
    </article>
  `).join("");

  deepAccordion.innerHTML = project.deepDive.map((item, index) => `
    <details class="deep-dive" ${index === 0 ? "open" : ""}>
      <summary>${item.title}</summary>
      <div>${item.body}</div>
    </details>
  `).join("");

  renderPerformance(project, performanceDataset);
  renderFutureData(project, performanceDataset);
  renderDemos(project);
  requestAnimationFrame(() => refreshScrollReveal(projectView));
}

function renderDemos(project) {
  if (!project.demos.length) {
    exampleArea.classList.add("is-empty");
    demoTabs.innerHTML = `<span class="demo-empty">No HTML demo for this secondary portfolio area yet</span>`;
    exampleTitle.textContent = "Demo not available";
    exampleLink.removeAttribute("href");
    examplePath.textContent = "This section is ready for future public examples.";
    demoFrame.src = "about:blank";
    return;
  }

  exampleArea.classList.remove("is-empty");
  demoTabs.innerHTML = project.demos.map((demo, index) => `
    <button class="demo-tab ${index === activeDemoIndex ? "is-active" : ""}" type="button" data-demo-index="${index}">
      ${demo.label}
    </button>
  `).join("");

  demoTabs.querySelectorAll(".demo-tab").forEach((button) => {
    button.addEventListener("click", () => {
      activeDemoIndex = Number(button.dataset.demoIndex);
      renderDemos(getActiveProject());
    });
  });

  const activeDemo = project.demos[activeDemoIndex] || project.demos[0];
  exampleTitle.textContent = activeDemo.label;
  exampleLink.href = activeDemo.path;
  examplePath.textContent = activeDemo.path;
  demoFrame.src = activeDemo.path;
}

cvToggle.addEventListener("click", () => {
  const willOpen = cvPanel.hasAttribute("hidden");
  cvPanel.toggleAttribute("hidden", !willOpen);
  cvToggle.setAttribute("aria-expanded", String(willOpen));
  cvToggle.textContent = willOpen ? "Close full CV" : "Open full CV";
  if (willOpen) {
    requestAnimationFrame(() => refreshScrollReveal(cvPanel));
  }
});

backButton.addEventListener("click", () => {
  history.pushState("", document.title, window.location.pathname);
  setViewFromHash();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("hashchange", setViewFromHash);
window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);

renderProjectFilters();
renderProjectGrid();
setViewFromHash();
refreshScrollReveal();
updateScrollProgress();

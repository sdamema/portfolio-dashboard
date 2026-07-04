const projects = [
  {
    id: "reviews",
    title: "Human-led Review Pages",
    shortTitle: "Review Pages",
    category: "SERP analysis + content SEO",
    status: "SEO case study",
    summary: "Review pages built from <strong>scraped social comments</strong>, cluster analysis and weighted scoring to make supplier opinions easier to compare.",
    explanation: `<p>These are Italian <strong>energy supplier review pages</strong> created from public customer comments collected across social and community platforms. The tested cluster includes <strong>17 suppliers</strong>, with roughly <strong>40-200 comments analyzed per provider</strong> depending on source availability and quality.</p><p>The workflow turned messy social feedback into a structured SEO asset:</p><ul class="summary-process-list"><li>comments were scraped, filtered and cleaned;</li><li>opinions were grouped by user concern, such as bills, support, switching supplier or app experience;</li><li>the output became <strong>WordPress-ready HTML demos</strong> that could be adapted into publishable pages.</li></ul><p>The result is not just a written review. It combines <strong>scraping, sentiment analysis, topic clustering, scoring logic and WordPress-ready HTML</strong> so users can compare quickly, then investigate the area that matters to them.</p>`,
    summaryPoints: [],
    metrics: [
      ["14", "review pages in the CV"],
      ["40-200", "comments analyzed per provider"],
      ["17", "providers in this HTML comparison run"],
      ["20", "providers in the later official score report"]
    ],
    callouts: [
      ["Dataset", "<strong>Public social comments</strong> were turned into structured review evidence."],
      ["Output", "<strong>WordPress-ready HTML</strong> was structured for easier insertion and QA."],
      ["Purpose", "The page serves both <strong>quick comparison</strong> and deeper cluster exploration."]
    ],
    deepDive: [
      {
        title: "Why the project was created",
        body: `<p>The initial problem was a <strong>SERP quality gap</strong>. For several supplier-review queries, generic editorial pages were not always the most convincing result. Often, both for us and for competitors, <strong>Reddit threads, public Facebook discussions or community posts</strong> appeared more aligned with what users were actually looking for: real experiences, complaints, doubts and concrete details.</p><p>The SEO reasoning was that Google was rewarding content with stronger <strong>human evidence</strong>. A normal supplier description could explain tariffs and company facts, but it did not necessarily answer the emotional and practical question behind the query: "What do real customers say?" It could also feel less authentic if every opinion was written directly by us, without an external evidence layer.</p><p>So the page format was redesigned around <strong>collected customer language</strong>. Instead of inventing opinions or writing a purely generic review, the content uses real comments as the evidence layer and turns them into a structured page that can be read, compared and audited.</p>`
      },
      {
        title: "How we worked: scraping, cleaning and clustering",
        body: `<p>The workflow started with <strong>AI-assisted scraping and research</strong>. Public comments were collected through <strong>Apify scraping runs operated from Claude Code via the Apify integration</strong>, with Codex-generated instructions defining what to collect, what to exclude and how to keep the data useful.</p><div class="process-flow"><article><span>Collect</span><p>Prioritize direct customer experiences about price, bills, customer support, app, activation, cancellation, transparency and switching supplier.</p></article><article><span>Clean</span><p>Remove spam, referral codes, vague mentions, duplicated comments, unsupported claims and content that could not be connected to a real user experience.</p></article><article><span>Normalize</span><p>Preserve text, platform, visible author or handle, source URL, date/context and quality notes so the dataset stays auditable.</p></article><article><span>Cluster</span><p>Group comments by user concern, such as tariffs and savings, support, app/billing, activation, provider change and reputation.</p></article></div><p>This made the data usable for SEO content because the page could reflect <strong>real search intent</strong> instead of forcing all comments into one generic paragraph.</p>`
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
    performancePlaceholder: "The first performance dataset is displayed above. The next step can add <strong>URL-level or query-level before/after splits</strong> when you export more granular data.",
    urlPlaceholder: "The future URL inventory can list every review page created or modified, grouped by provider and date, with a note that the pages may have changed after delivery.",
    demos: [
      { label: "Intro", title: "Review demo", path: "demos/reviews-octopus-intro.html" },
      { label: "Body", title: "Review demo", path: "demos/reviews-octopus-body.html" }
    ]
  },
  {
    id: "scraping",
    title: "Social Comments Scraping Pipeline",
    shortTitle: "Social Scraping",
    category: "Social scraping + QA",
    status: "Auditable workflow",
    summary: "A time-saving scraping workflow for collecting <strong>higher-quality public social comments</strong>. Manual collection would have required too much reading and source checking, so <strong>Apify handled the scraping</strong> from <strong>Claude Code through the Apify integration</strong>, while Codex helped structure instructions that reduced comments less useful for the review-page pipeline.",
    explanation: `<p>This project is the data layer behind the review pages. It prepares <strong>clean, traceable and review-ready inputs</strong> from public sources such as Reddit, YouTube, Facebook, X, forums and other verifiable pages.</p><p>The first time gain came from scraping itself: Apify collected comments that would have been unrealistic to gather manually at scale. The second gain came from <strong>better instructions</strong>. Without clear rules, scraping can still return many comments that are too generic or less aligned with the target themes, so the workflow used <strong>Claude Code as the operating environment</strong>, <strong>Apify as the scraping tool</strong> and <strong>Codex for collection rules</strong> to prioritize useful evidence: tariffs, assistance, bills, app experience, activation, switching supplier and transparency.</p>`,
    summaryPoints: [],
    jumpSummaryCard: {
      kicker: "Estimated time saved",
      value: "4.5 hours",
      text: "The scraping workflow already saved the manual collection work. The instruction layer added another gain by avoiding roughly <strong>815 generic comments</strong>, estimated from the 543 useful comments delivered and a central 1.5x generic-comment scenario.",
      chips: ["543 usable comments", "12 suppliers", "23 min saved per supplier"]
    },
    summaryPointStyle: "rich",
    metrics: [],
    callouts: [],
    deepDive: [
      {
        title: "Why the pipeline was needed",
        body: `<p>The review system needed real customer comments, but collecting them manually would have been <strong>too time-consuming</strong>: every supplier required source discovery, platform checks, comment reading, URL validation and manual selection.</p><p>Scraping solved the collection bottleneck, because it allowed public comments to be gathered at scale from social and community sources. The next step was optimization: if the scraper collected too many generic comments, part of the time gained during collection would still be spent during manual review.</p><p>The pipeline was created to make scraping more selective from the beginning: not "collect everything and clean later", but <strong>define what counts as useful evidence before the run starts</strong>. This also made the SEO work safer, because every useful comment needed to stay <strong>traceable, relevant, non-promotional and usable</strong>.</p><p>The workflow used <strong>Apify</strong> for the scraping layer, operated from <strong>Claude Code through the Apify integration</strong>, while <strong>Codex</strong> helped structure the instructions, exclusion rules, query packs and QA logic.</p>`
      },
      {
        title: "How the scraping instructions were built",
        body: `<p>The optimization work was about turning editorial judgment into <strong>clear collection instructions</strong>. The goal was to tell the workflow what a useful review comment looked like before the dataset reached the manual review phase.</p><p>The instructions focused on two sides: <strong>what to collect</strong> and <strong>what not to collect</strong>. Useful comments had to describe a real experience, contain enough context to be meaningful and connect to topics that could support the review page.</p><div class="process-flow"><article><span>Collect</span><p>Prioritize direct customer experiences about <strong>bills, assistance, tariffs, app issues, activation, switching supplier, transparency and contract management</strong>.</p></article><article><span>Exclude</span><p>Avoid referral codes, spam, generic brand mentions, jokes, comments from company accounts, duplicated rows and posts without concrete customer experience.</p></article><article><span>Preserve</span><p>Keep exact comment text, platform, visible author or anonymous label, source URL, date/context and notes needed for later validation.</p></article><article><span>Score-ready</span><p>Prefer comments that could later support <strong>topic clustering, sentiment analysis, quality scoring</strong> and evidence-based copy.</p></article></div><p>In practice, the instructions worked like a <strong>pre-cleaning layer</strong>. Scraping already saved a large amount of time by collecting comments automatically; the instruction layer made that gain stronger by reducing the amount of generic material that still needed to be reviewed later.</p>`
      },
      {
        title: "Time saved calculation",
        body: `<p>The logic is simple: scraping saves the time needed to <strong>find and collect comments manually</strong>. The instruction layer then protects part of that gain by reducing the number of lower-value rows that still need manual reading.</p><p>The time-saving estimate was built only on comments that were <strong>on-topic but too generic</strong>: comments that a naive filter might have kept, but that the quality rules excluded because they lacked concrete detail. It does <strong>not</strong> count obvious spam, emoji, sponsorship noise or off-topic posts that would have been discarded anyway.</p><p>The <strong>815 figure is an estimate, not a raw exported count</strong>. The project delivered <strong>543 useful comments</strong> across 12 suppliers. Since generic on-topic opinions are usually more frequent than detailed experiences, the central scenario assumes that the quality rules avoided another <strong>1.5 generic comments for every useful comment delivered</strong>: 543 x 1.5 = 814.5, rounded to roughly <strong>815 comments</strong>.</p><div class="process-flow process-flow--summary"><article><span>Solid base</span><p><strong>543 usable comments</strong> were delivered across <strong>12 suppliers</strong>, counted as real CSV records rather than inflated line counts.</p></article><article><span>Central estimate</span><p><strong>543 x 1.5 = 814.5</strong>, rounded to about <strong>815 generic comments</strong> that likely did not need manual reading/evaluation.</p></article><article><span>Time model</span><p>At roughly <strong>20 seconds per comment</strong> for reading and deciding if it was usable, that equals about <strong>4.5 hours saved</strong>.</p></article><article><span>Scaling</span><p>The average is around <strong>23 minutes saved per supplier</strong>; applying the same method to 20-30 suppliers would scale toward a full working day or more.</p></article></div><p>This is especially relevant for social sources. A generic query can return vague brand mentions, promotional comments or off-topic discussions. A targeted query pack can instead look for comments about <strong>assistance problems, high bills, app issues, switching supplier, activation delays or price comparisons</strong>.</p><p>That means the value of the workflow is not automation for automation's sake. The value is a more efficient funnel: <strong>automated collection, better queries, fewer generic rows, faster validation, cleaner exports</strong> and a dataset that is easier to use inside the review-page system.</p>`
      },
      {
        title: "How raw comments became review-ready inputs",
        body: `<p>After collection and validation, comments were exported into the historical format used by the review project: <strong>TEXT, AUTHOR, PLATFORM, SOURCE_URL, DATE/CONTEXT, NOTES, N</strong>. From there they could move into clustering, sentiment analysis, score calculation and finally page generation.</p><p>The workflow kept strict safeguards: copy the <strong>full exact comment</strong>, avoid rewriting or translating it, preserve the URL, keep platform labels stable, deduplicate carefully, keep the date or context when available, and use notes to explain quality/context decisions.</p><p>This means scraping was not an isolated technical task. It was the first step of an SEO system where raw user language becomes <strong>structured review evidence</strong>. If a claim appeared in the page, it could be traced back to a source, a comment row, a cluster and a sentiment/scoring decision.</p>`
      }
    ],
    hideKeyNumbers: true,
    hideSnapshot: true,
    hideFutureData: true,
    hideExamples: true,
    performancePlaceholder: "",
    urlPlaceholder: "",
    demos: []
  },
  {
    id: "offers",
    title: "Supplier Offer Sheets",
    shortTitle: "Offer Sheets",
    category: "High-intent SEO pages",
    status: "SEO case study",
    summary: "SEO landing pages for <strong>specific energy offers</strong>, built around <strong>transactional search intent</strong>, price context, supplier data and reusable HTML modules.",
    explanation: `<p>This project covered <strong>91 supplier offer sheets</strong>. The pages target <strong>commercial searches</strong> where users are close to comparing, switching or subscribing to a specific energy offer, so each page needed to explain <strong>price, conditions, activation details, supplier context and practical pros/cons</strong> in a WordPress-ready structure.</p><p>Publication started on <strong>March 18, 2026</strong>, but the project was initially secondary. From mid-April, it became more constant and prioritized, with a target of roughly <strong>two new pages per day</strong>. From early May, the work shifted toward <strong>quality and differentiation</strong>: price-trend modules, cleaner H2 structures, AI-assisted duplicate checks, reduced spammy headings and richer comparison content on new pages and already-published URLs.</p>`,
    summaryPoints: [],
    metrics: [
      ["91", "supplier offer sheets in the project"],
      ["% only", "public performance shown as relative trends"],
      ["3,515", "changed offers tracked"]
    ],
    callouts: [
      ["Pages", "<strong>91 offer pages</strong> created around supplier and tariff intent, then refined where needed."],
      ["Tracking", "Offer changes were monitored to support future refreshes."],
      ["SEO role", "Pages support <strong>commercial-intent queries</strong> and internal linking."]
    ],
    deepDive: [
      {
        title: "Why the pages were created",
        body: `<p>The starting point was a <strong>competitor gap</strong>. Competitors already had dedicated pages for specific energy offers, while we did not cover many of those <strong>transactional queries</strong> with a focused page.</p><p>That mattered because a user searching for an offer name is usually close to action: they are <strong>comparing tariffs</strong>, checking conditions or deciding whether to subscribe. A generic supplier page could not answer that intent as precisely as a dedicated offer sheet.</p><p>The objective was not just to copy the competitor format. The page had to be <strong>more useful and visually clearer</strong>: stronger H2 structure, cleaner offer tables, practical decision sections and unique content such as a <strong>price-trend/history module</strong> that explains how the offer cost moved over time.</p>`
      },
      {
        title: "How we worked: structure and data",
        body: `<p>The workflow combined <strong>keyword pre-analysis</strong>, data collection and a repeatable HTML architecture. Before generating a page, the process checked whether target queries were already covered by another Papernest URL, then produced a <strong>Differentiation Report</strong> to avoid copying the same H2, FAQ, anchors and content angle across the offer cluster.</p><div class="process-flow"><article><span>Intent</span><p>Validate <strong>branded and commercial keywords</strong>, check GSC cannibalization risk and decide how the page should differ from existing supplier or offer URLs.</p></article><article><span>Data</span><p>Collect offer facts from sources such as <strong>ARERA exports</strong>, supplier pages, PUN/PSV context and internal registries, without inventing missing prices or conditions.</p></article><article><span>Build</span><p>Create reusable <strong>HTML page modules</strong> with offer tables, practical explanations, FAQs, CTAs, internal links and WordPress-compatible sections.</p></article><article><span>Validate</span><p>Run structural checks, <strong>dedup checks</strong>, link checks and Italian proofreading so the page is specific, readable and safe to publish.</p></article></div><p>The March core update is useful context: repeated offer pages may have been perceived as <strong>too similar</strong> across suppliers and tariffs. From early May, the work became more deliberate: adding <strong>price-history / unique content sections</strong>, using AI-assisted checks to avoid duplicated content, removing weak or spammy H2 patterns and making each page more complete than a standard offer description.</p>`
      },
      {
        title: "How it helps users",
        body: `<p>The page helps users compare an offer without jumping between supplier websites, generic articles and price tables. It centralizes the main decision points: <strong>how much it costs, what conditions apply, who it fits, what changed over time and what to check before activating</strong>.</p><p>The price-history module is especially useful because it gives context: for fixed offers, it explains that the public offer version can change for new activations without changing already signed contracts; for indexed offers, it can separate the index movement from the all-in monthly estimate.</p><p>From an SEO perspective, these sheets become a structured layer of a wider supplier database: <strong>offer pages, review pages, mother pages and comparison pages</strong> can all connect around the same provider and intent.</p>`
      }
    ],
    hideKeyNumbers: true,
    performanceKey: "offers",
    performancePlaceholder: "Once you provide the cluster export, this panel can show <strong>percentage-only visibility, click-efficiency and position movements</strong> for all offer pages created or refreshed.",
    urlPlaceholder: "Future URL inventory: offer pages grouped by supplier, offer type and creation/modification date.",
    demos: [
      { label: "Intro", title: "Pulsee Gas Relax", path: "demos/offer-pulsee-gas-relax-intro.html" },
      { label: "Body", title: "Pulsee Gas Relax", path: "demos/offer-pulsee-gas-relax-body.html" }
    ]
  },
  {
    id: "change-residence",
    title: "Change-of-Residence City Pages",
    shortTitle: "Change Residence",
    category: "Informational SEO cluster",
    status: "Secondary SEO case",
    summary: "A cluster of <strong>9 new informational SEO pages</strong> around Italian change-of-residence searches, built with local research, Gemini-assisted drafting and WordPress-ready content production.",
    performanceKey: "changeResidence",
    explanation: `<p>This was a <strong>secondary SEO content cluster</strong>: 9 new city pages around Italian change-of-residence searches. The work sits in an intermediate/early phase of my SEO experience, before the more advanced Codex/Claude Code systems, and focused on <strong>local research, clear informational content, Gemini-assisted drafting</strong> and WordPress-ready production.</p><p>The intent was mostly informational: users wanted city-specific instructions, online procedure details, forms, timing and where to submit the request. The performance view therefore reads the pages as <strong>new-page growth</strong>, not as a before/after optimization test.</p>`,
    summaryPoints: [
      `<span>Intent</span><strong>Informational and local</strong><em>The pages answer city-specific change-of-residence searches, not a strongly transactional energy flow.</em>`,
      `<span>Workflow</span><strong>Simple AI-supported content production</strong><em>Gemini helped with drafting support, while research and QA focused on local procedure accuracy.</em>`,
      `<span>Data</span><strong>Indexed data trend</strong><em>The chart is shown as a simplified trend because absolute numerical values are not public.</em>`
    ],
    summaryPointStyle: "rich",
    metrics: [],
    callouts: [],
    deepDive: [
      {
        title: "Why the pages were created",
        body: `<p>The cluster targeted a clear informational pattern: users search for <strong>how to change residence in a specific city</strong>, often with practical follow-up needs such as online forms, required documents, timing, municipal portals or appointment logic.</p><p>These searches are not highly transactional. The objective was to build <strong>organic coverage</strong> around a useful moving-related topic, while keeping each city page specific enough to avoid feeling like a generic template with only the location changed.</p>`
      },
      {
        title: "Workflow and content QA",
        body: `<p>The workflow was intentionally lighter than the later Codex/Claude projects. It used <strong>Gemini as a basic support tool</strong> for drafting and organization, then focused on human checks: city-specific procedure, page structure, keyword intent and clarity for users.</p><div class="process-flow"><article><span>Research</span><p>Find the practical information users expect: <strong>online procedure</strong>, forms, documents, timing, portals and city-specific terminology.</p></article><article><span>Structure</span><p>Build a repeatable SEO layout around the main query, related questions and useful H2s without overcomplicating the page.</p></article><article><span>Draft</span><p>Use Gemini for first-pass drafting support, then adapt the copy so it stays readable, local and consistent with the site style.</p></article><article><span>QA</span><p>Check that the page answers the real search need and does not become a generic duplicate of another city page.</p></article></div>`
      },
      {
        title: "How to read the data trend",
        body: `<p>All URLs in this cluster were <strong>new pages</strong>, so the performance view should not be read as a classic before/after optimization test. The chart is kept intentionally simple: it shows a <strong>sanitized indexed trend</strong> while absolute numerical values remain hidden.</p><p>The graph should be read as <strong>indexed new-page growth</strong>: first visibility signals, then a clearer upward trend across city, online-procedure and form-related searches.</p>`
      }
    ],
    hideKeyNumbers: true,
    hideSnapshot: true,
    hideExamples: true,
    performancePlaceholder: "",
    urlPlaceholder: "",
    demos: []
  },
  {
    id: "ranking",
    title: "Supplier Review Ranking",
    shortTitle: "Provider Ranking",
    category: "Sentiment + comparison",
    status: "Ranking case study",
    summary: "A ranking page that compares suppliers using <strong>real review evidence</strong>, review scores and sentiment/emotion analysis.",
    performanceKey: "ranking",
    explanation: `<p>This page connects the individual review ecosystem into one comparison asset. It presents a <strong>top three</strong>, explains the ranking logic and then includes the full supplier ranking so users can compare providers based on collected review signals.</p><p>The reasoning is close to the review pages: if users and Google value real opinions, a best-supplier page should be grounded in <strong>actual customer comments</strong>, not invented claims.</p>`,
    summaryPoints: [
      `<span>Coherence</span><strong>Aligned the ranking with review pages</strong><em>The comparison page uses the same real-comment logic as the supplier reviews.</em>`,
      `<span>Sentiment</span><strong>Added emotional signals beyond the score</strong><em>Sentiment analysis gives the page unique evidence instead of a simple ordered list.</em>`,
      `<span>Interlinking</span><strong>Connected generic comparison to provider reviews</strong><em>Users can move from the market-level ranking into single-supplier investigations.</em>`
    ],
    summaryPointStyle: "rich",
    metrics: [],
    callouts: [],
    deepDive: [
      {
        title: "Why the ranking page was created",
        body: `<p>The page already targeted a broad comparison intent: users searching for the <strong>best energy suppliers</strong> need a fast ranking, but also a reason to trust that ranking. After the individual review pages were created, the comparison page had to become more coherent with that new ecosystem.</p><p>The goal was therefore to update a generic "best suppliers" page by including signals from the new review system: <strong>real comments, visible evidence, explainable ranking logic and internal links</strong> toward the individual supplier reviews.</p><p>This made the page useful in two directions. It could still answer the market-level question, "Who looks strongest overall?", while also sending users toward the deeper review page when they wanted to understand <strong>why one supplier ranked better than another</strong>.</p>`
      },
      {
        title: "How we worked: ranking logic and sentiment analysis",
        body: `<p>The score system comes from the review-page workflow, where comments are cleaned, clustered and weighted before becoming supplier scores. I do not repeat the full formula here because it is explained in more detail in the <strong>Human-led Review Pages</strong> section; for this page, the score is the base layer that makes the ranking comparable.</p><p>The extra layer is the <strong>sentiment and emotion analysis</strong>. It was not a generic manual label or a vague AI summary: the workflow used <strong>FEEL-IT</strong>, an Italian BERT-based sentiment/emotion approach available through HuggingFace models, specifically <strong>MilaNLProc/feel-it-italian-sentiment</strong> and <strong>MilaNLProc/feel-it-italian-emotion</strong>.</p><div class="process-flow"><article><span>Model</span><p>Run Italian comments through FEEL-IT to classify <strong>positive/negative sentiment</strong>, confidence, a score from negative to positive and emotions such as joy, anger, sadness and fear.</p></article><article><span>Normalize</span><p>Split longer texts when needed, preserve source context and connect each output back to the original supplier comment instead of losing the evidence trail.</p></article><article><span>Aggregate</span><p>Summarize sentiment and emotion signals by provider, then use them as an explanatory layer next to the ranking and review-score system.</p></article><article><span>QA</span><p>Keep score logic and sentiment logic separate: the ranking comes from the approved review scoring method, while FEEL-IT adds a readable emotional signal.</p></article></div><p>This prevents the page from becoming a simple leaderboard. The final output combines a <strong>top-three podium</strong>, the full ranking, score explanation, selected comment evidence and sentiment signals that make the comparison easier to understand.</p>`
      },
      {
        title: "How it helps users",
        body: `<p>The page is built for users who want a comparison first and a detailed explanation second. The <strong>podium</strong> gives quick orientation, the <strong>full ranking</strong> lets users compare beyond the top providers, and the links toward individual reviews support deeper checks.</p><p>The sentiment layer helps users understand the <strong>tone behind the ranking</strong>. Two suppliers can have close scores, but very different emotional patterns: one may generate more joy and reassurance, while another may concentrate anger or sadness around billing, support or activation. That makes the ranking easier to interpret as <strong>real customer perception</strong>, not just a number.</p><p>From a content architecture point of view, this also improves coherence: the generic ranking page no longer lives alone. It becomes the hub that connects the new review pages, while the review pages can point back to a broader comparison. That creates a cleaner path between <strong>market-level intent</strong> and <strong>single-provider investigation</strong>.</p>`
      }
    ],
    hideKeyNumbers: true,
    hideSnapshot: true,
    livePageTitle: "Live page",
    livePageUrl: "https://www.papernest.it/luce-gas/compara/classifica-recensioni-fornitori/",
    livePageLabel: "Supplier review ranking page",
    livePageNote: "This live page should match the example shown here until <strong>August 8, 2026</strong>; after that, future edits are possible.",
    performancePlaceholder: "",
    urlPlaceholder: "",
    demos: [
      { label: "Intro", title: "User-based Supplier Ranking", path: "demos/provider-ranking-intro.html" },
      { label: "Body", title: "User-based Supplier Ranking", path: "demos/provider-ranking-body.html" }
    ]
  },
  {
    id: "summary",
    title: "Review Summary Blocks",
    shortTitle: "Review Summary",
    category: "Internal linking + revamp",
    status: "Standalone box",
    summary: "Compact review components for supplier mother pages, designed as a <strong>soft revamp</strong>, visual/content alignment layer and internal-linking bridge toward the full review ecosystem.",
    explanation: `<p>After the full review pages were created, the supplier mother pages needed a more coherent way to connect with them. A review section already existed, but it showed different information and felt visually weaker than the new review components.</p><p>This module works like a <strong>compact overview of the review page</strong> inside the mother page: <strong>score, short strengths/weaknesses summary, selected real comments</strong>, a method note and links toward the full review or the supplier ranking.</p>`,
    summaryPoints: [
      `<span>Coherence</span><strong>Aligned mother pages with new reviews</strong><em>The block brings score, copy and comments closer to the new review-page experience.</em>`,
      `<span>Revamp</span><strong>Created a soft refresh without full rewrites</strong><em>The mother page becomes fresher and more useful while keeping its original structure.</em>`,
      `<span>Links</span><strong>Made review links more inviting</strong><em>Users see a preview first, then have a stronger reason to open the full review page.</em>`
    ],
    summaryPointStyle: "rich",
    metrics: [],
    callouts: [],
    deepDive: [
      {
        title: "Why the block was created",
        body: `<p>After building the full review pages, the next step was to make the supplier mother pages feel connected to them. The mother pages already had a review area, but it was not fully aligned with the new system: <strong>different information, older visual style and weaker connection</strong> with the new review components.</p><p>The review-summary block was designed as a <strong>soft revamp</strong>. Instead of rewriting each mother page from zero, it adds a modern review overview with <strong>average score, ranking position, strengths/weaknesses copy, selected social comments</strong> and clear links toward the full review or ranking page.</p><p>The point was not only to add a link. The point was to make the page itself better: more coherent with the new review pages, visually fresher and more useful for users who want a quick opinion before deciding whether to open the full analysis.</p>`
      },
      {
        title: "How we worked: component logic and QA",
        body: `<p>The workspace used a repeatable system rather than one-off manual blocks. Each provider block was generated from a <strong>shared HTML/CSS/JS template</strong>, provider facts, source review pages and a QA script.</p><div class="process-flow process-flow--summary"><article><span>Facts</span><p>Use the local provider table for <strong>score, ranking, total providers and analyzed-comment count</strong>, avoiding legacy values from older intro files.</p></article><article><span>Comments</span><p>Select <strong>real social comments</strong> from the review body file, preserving author, platform, source URL and original wording.</p></article><article><span>Layout</span><p>Use a controlled pattern: <strong>3 visible comments + 1 blurred teaser on desktop</strong>, and a compact mobile version with 2 visible comments that can be understood in about <strong>one or two scrolls</strong>.</p></article><article><span>QA</span><p>Validate links, source consistency, popup IDs, mobile states, CTA behavior and HTML output for each provider.</p></article></div><p>This matters because the block contains many details that are easy to break: method notes, source labels, modals, anchor links, ranking CTA and responsive behavior. The workflow made the module <strong>scalable across providers</strong> without losing accuracy.</p>`
      },
      {
        title: "How linking and intent were handled",
        body: `<p>The block uses three different link types with different purposes. The <strong>method note</strong> links to the clean provider review URL, so users can understand where the analysis comes from. The <strong>blurred teaser card</strong> links directly to a real review cluster anchor, usually the first useful H2 section in the review body. The <strong>bottom CTA</strong> points to the complete supplier ranking page.</p><p>The blurred last comment is especially important for the user journey. The user scrolls through real visible comments, then finds a final card that is intentionally obscured: this creates curiosity and invites them to continue on the full review page to read more comments and analysis.</p><p>This makes the internal link feel natural rather than forced. A user can first understand the supplier's score and comments inside the mother page, usually within a <strong>short mobile scroll</strong>, then choose the depth they want: provider review, specific comment cluster or market-level ranking.</p>`
      },
      {
        title: "What the finished module includes",
        body: `<p>The final output is a reusable <strong>WordPress-ready HTML component</strong> for supplier pages. It includes a score area, ranking card, selected social comments, source links, popup handling for longer comments, a blurred teaser card and a ranking CTA.</p><p>The content rules were strict: no invented scores, no invented authors, no invented platforms, no rewritten quotes and no vague marketing language. The copy stays <strong>neutral, compact and practical</strong>, because the purpose is to help users evaluate the supplier before moving into the full review ecosystem.</p><p>The result is a small but strategic page upgrade: it adds trust, makes the page feel fresher and turns internal linking into a visible user journey instead of a hidden SEO-only action.</p>`
      }
    ],
    hideKeyNumbers: true,
    hideSnapshot: true,
    hideFutureData: true,
    performancePlaceholder: "",
    urlPlaceholder: "",
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
    summary: "A weekly SEO/business monitoring project that turned <strong>Search Console, crawl data, page families and business KPIs</strong> into recommendations for future actions on energia-luce.it.",
    explanation: "",
    summaryPoints: [
      `<span>Monitoring role</span><strong>Started from weekly site reporting</strong><em>I was following SEO and business movement every week, then turned that monitoring into a deeper action-oriented diagnosis.</em>`,
      `<span>Business KPIs</span><strong>Connected PP, clients, TR and CM3</strong><em>The analysis checked whether page families were creating valuable outcomes, not just traffic or phone-pickup activity.</em>`,
      `<span>Technical SEO</span><strong>Reviewed crawl and noindex signals</strong><em>Indexability, crawl status and URL families were used to separate pages to protect, fix, re-index or redesign.</em>`,
      `<span>Outcome</span><strong>Produced future-action recommendations</strong><em>The work led to a <strong>personal branch-map proposal</strong> (<a href="#project/sportelli">Interactive Branch Map</a>) and to noindex pages being reviewed and re-indexed where useful.</em>`
    ],
    resultSummary: {
      kicker: "Indexation outcome",
      title: "Noindex review turned into a concrete re-indexation list",
      text: "The analysis started from <strong>732 noindex URLs</strong>. I matched them with older business signals such as <strong>PP, clients and CM3</strong>, then prioritized pages that had already shown value: positive CM3, previous client signals, useful PP activity or a clear SEO/local-intent role. The result was a filtered list of <strong>51 pages</strong> to bring back into the indexation flow, instead of re-indexing everything blindly.",
      stats: [
        ["732", "noindex URLs reviewed"],
        ["51", "pages selected for re-indexation"],
        ["PP · Clients · CM3", "pre-indexation business signals checked"]
      ]
    },
    summaryPointStyle: "rich",
    summaryPointLayout: "analysis",
    hideProjectStory: true,
    hideJumpNav: true,
    hideKeyNumbers: true,
    hideSnapshot: true,
    metrics: [
      ["2,954", "URLs in the broader analysis window"],
      ["992", "URLs covered by the export"],
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
        title: "Why the analysis was requested",
        body: `<p>I was already responsible for <strong>weekly monitoring</strong> of the site's SEO and business data. That meant looking at movement regularly and understanding whether changes in visibility were also reflected in business outcomes.</p><p>From that monitoring, the next request was to prepare an analysis for <strong>possible future actions</strong>: where to intervene, which page families deserved attention and which pages should not be touched because they were already working.</p><p>The important point was that this was not a simple SEO traffic report. The analysis had to connect <strong>Search Console visibility</strong> with business metrics such as <strong>PP, clients, TR, CM3 and CM3/PP</strong>, plus technical signals like <strong>crawl status, indexability and noindex pages</strong>. The question became: which URLs are visible, which URLs create value, and where is the gap between the two?</p>`
      },
      {
        title: "How I analysed SEO, business and indexability",
        body: `<p>The work started by bringing different sources into the same reading frame: <strong>Google Search Console exports</strong>, crawl/indexability checks, URL lists and business KPI files. Each URL was then interpreted as part of a page family instead of being read as an isolated row.</p><div class="process-flow"><article><span>Classify</span><p>Group URLs by intent and family: <strong>sportelli hubs</strong>, city/local sportelli pages, contact pages, number-verde pages, supplier areas and other SEO clusters.</p></article><article><span>Join</span><p>Connect SEO data with business signals: clicks/impressions on one side, then <strong>PP, clients, TR, CM3 and CM3/PP</strong> on the other.</p></article><article><span>Indexability</span><p>Check crawl status and <strong>noindex</strong> signals to find pages that were potentially useful but not available to search in the right way.</p></article><article><span>Compare</span><p>Separate <strong>SEO winners</strong>, <strong>business winners</strong>, pages with PP but no clients, pages with weak CM3 and pages that needed technical/indexation action.</p></article></div><p>This method made the analysis more operational. Instead of saying "this area has traffic", it could say: this family has traffic but weak clients, this page gets PP but poor CM3, this local page is closer to qualified intent, and this noindex group should be reviewed because it may be blocking useful organic visibility.</p>`
      },
      {
        title: "What I understood from the data",
        body: `<p>The main insight was that <strong>not all organic activity had the same value</strong>. Some pages were visible and could generate PP, but did not necessarily produce clients or healthy CM3. That suggested an intent mismatch: the page was capturing a search need, but the conversion path was not always aligned with what the user wanted.</p><p>This was especially relevant for the <strong>sportelli</strong> area. Hub pages could receive local-intent users, but those users were often looking for a physical branch, a city page, an address or local support information. If the page pushed them immediately into a generic commercial action, the result could be <strong>low-quality PP</strong> rather than qualified clients.</p><p>The second insight was technical: some useful pages needed an <strong>indexability review</strong>. A noindex page is not only a technical status; it is a business decision. If a page family has potential search demand and can support the user journey, leaving it out of the index may mean losing qualified visibility.</p>`
      },
      {
        title: "What happened after the analysis",
        body: `<p>The analysis produced two concrete directions. The first was a <strong>personal branch-map proposal</strong>, developed as an extra initiative and shown separately in this portfolio as the <a href="#project/sportelli"><strong>Interactive Branch Map</strong></a> project: a way to make sportelli hub pages work less like static lists and more like local-intent routers. A user could search or select a region/city, then move faster toward the relevant local page instead of getting stuck in a generic hub experience.</p><p>The second direction was the <strong>noindex review</strong>. Pages that looked useful from an SEO/business perspective were checked and, where appropriate, brought back into the indexation flow. This turned the analysis into action: not only identifying a technical issue, but deciding which pages deserved to be re-indexed because they could support organic acquisition.</p><p>The final value of the project was prioritization. It helped define where to redesign, where to re-index, where to monitor and where to avoid unnecessary changes. In other words: the output was not a single page, but a clearer decision system for future SEO and business work on the site.</p>`
      }
    ],
    hideFutureData: true,
    hideExamples: true,
    performancePlaceholder: "",
    urlPlaceholder: "",
    demos: []
  },
  {
    id: "sportelli",
    title: "Interactive Branch Map",
    shortTitle: "Branch Map",
    category: "Local SEO module",
    status: "Prototype / not implemented",
    summary: "A <strong>not-implemented prototype</strong> for an Iren branch map, designed after an SEO/business analysis showed that branch hub pages received local-intent traffic but did not always send users toward the city pages that converted better.",
    explanation: `<p>This project was created after my <strong>NRJ2 sportelli analysis</strong>. The issue was not only SEO visibility: several branch hub pages were receiving <strong>organic demand and phone-pickup signals</strong>, but the conversion path was weak because many users were looking for a <strong>specific physical branch</strong>, not a generic commercial action.</p><p>The proposed solution was an <strong>interactive branch map</strong>: a cleaner visual module where users can select a region, search by city and move directly to the relevant local page. The demo shown here is the <strong>Iren-specific prototype</strong>, because that was the provider version prepared as a publishable branch-map block.</p>`,
    summaryPoints: [
      `<span>Routing</span><strong>Mapped local URLs into a searchable path</strong><em>Region and city filters replace long hub lists and multi-step accordions.</em>`,
      `<span>Intent</span><strong>Filtered local intent before generic CTAs</strong><em>Users looking for a branch can reach the city page before being pushed into a broad commercial flow.</em>`,
      `<span>SEO</span><strong>Kept value tied to crawlable links</strong><em>The prototype preserves real HTML links, so the visual module is not only decorative.</em>`
    ],
    summaryPointStyle: "rich",
    metrics: [],
    callouts: [],
    deepDive: [
      {
        title: "Why the map was designed",
        body: `<p>The idea came from the broader <strong>energia-luce.it SEO/business analysis</strong>. I had already compared Search Console visibility, crawl/indexability data and business KPIs such as <strong>PP, clients, TR and CM3</strong>, and the sportelli area showed a clear pattern: some branch hub pages could create activity, but not always qualified outcomes.</p><p>In practical terms, some hubs generated <strong>PP or phone-pickup signals</strong> while clients and CM3 stayed weak, null or negative. At the same time, local child pages were often closer to the user's real need: a branch in a specific city, an address, opening hours or local support information. That suggested that the page was not necessarily failing at ranking; it was failing at <strong>guiding the user's intent</strong> after the click.</p><p>The branch map was designed to solve that pain point. Instead of treating the hub as a generic landing page, it turns it into a <strong>local-intent router</strong>: the user selects a region or searches a city, then reaches the relevant local page with less friction. The project was not published, but the reasoning is useful because it connects <strong>SEO, UX and business conversion quality</strong>.</p>`
      },
      {
        title: "How the analysis shaped the solution",
        body: `<p>The analysis compared <strong>37 branch hub pages</strong> with <strong>659 city/local branch pages</strong>. The important insight was that several mother hubs were creating activity but weak client outcomes, while related city pages showed stronger conversion signals. In plain terms: the value was not missing from the sportelli area; it was often sitting deeper in the architecture.</p><div class="process-flow process-flow--sportelli"><article><span>Hub signal</span><p>Read hub pages as <strong>entry points</strong>: GSC visibility, PP, phone-pickup activity, clients and CM3 helped identify possible intent mismatch.</p></article><article><span>Child pages</span><p>Compared the hub with city-level pages, where users are closer to the concrete local need and where conversion/CM3 signals could be stronger.</p></article><article><span>Intent filter</span><p>Defined the map as a bridge from broad hub traffic to the <strong>more qualified local destination</strong>, before a generic commercial CTA.</p></article><article><span>Measurement</span><p>Prepared the logic for post-rollout tracking: map clicks, hub PP quality, city-page movement, client quality and CM3 movement.</p></article></div><p>This is why the map was not just a design idea. It was a response to a business question: if people arrive on a hub because they want a local branch, can we help them reach the local page before they enter a generic conversion flow?</p>`
      },
      {
        title: "How the prototype solves user pain points",
        body: `<p>The prototype addresses three practical problems in the old branch-hub experience: <strong>too much scanning</strong>, <strong>too much manual filtering</strong> and <strong>unclear intent before the CTA</strong>. A user who already has a city in mind should not need to inspect a long national list or open many regional accordions before finding the right branch page.</p><div class="user-path-grid"><article class="user-path-card"><span>Mobile user</span><p><strong>Select a region</strong> or search a city, then open the relevant Iren branch page with fewer scrolls.</p></article><article class="user-path-card"><span>Local-intent user</span><p>Reach the city page first, where address, local context and page-specific content are more aligned with the query.</p></article></div><p>For SEO, the key rule was crawlability. The map keeps <strong>real HTML links</strong> in the source, so the widget can support internal linking and page discovery instead of becoming a purely visual element hidden behind JavaScript.</p>`
      },
      {
        title: "Implementation notes and limits",
        body: `<p>This was a <strong>personal extra initiative</strong>. After completing the wider analysis of the secondary site <strong>energia-luce.it</strong>, I decided to prototype the map outside normal working hours because the data suggested a practical opportunity: hub pages were receiving local-intent activity, but the user journey could be clearer and more qualified.</p><p>The module was prepared as a <strong>scoped HTML/CSS/JS block</strong> for WordPress/Gutenberg, with no external dependency. The data flow used sitemap/crawl validation, normalized city and region fields, URL checks and a region-based interface with a mobile fallback.</p><p>It was still a <strong>prototype</strong>, not a published feature. That matters for the portfolio: the value shown here is the <strong>strategic and technical reasoning</strong>, not post-publication performance data. If it were implemented, the next step would be to monitor whether branch-hub calls become more qualified, whether more users click toward city pages and whether local pages capture more of the intent that was already present in search.</p>`
      }
    ],
    hideKeyNumbers: true,
    hideSnapshot: true,
    hideFutureData: true,
    performancePlaceholder: "",
    urlPlaceholder: "",
    demos: [
      { label: "Branch map", path: "demos/sportelli-map.html" }
    ]
  },
  {
    id: "social-media",
    title: "Ladywoods / BGSA Social & Event Content",
    shortTitle: "Ladywoods / BGSA",
    category: "Social media + event communication",
    status: "Internship + event staff",
    summary: "Internship experience in <strong>social content management, event preparation and live-event support</strong> for a non-profit European-funded sport project.",
    explanation: `<p>I worked on <strong>Ladywoods Golf</strong>, a European-funded non-profit project created by <strong>Beach Golf Sport Association</strong>. My internship sat between two areas: <strong>social media content planning</strong> before the event and <strong>live staff/content support</strong> during the event itself.</p><p>The role was practical and hybrid: preparing communication, adapting content for different social channels, supporting logistics and capturing usable photo/video material while helping the activities run smoothly.</p>`,
    summaryPoints: [],
    summaryPointStyle: "rich",
    metrics: [],
    callouts: [],
    eventShowcase: [
      {
        label: "Project context",
        title: "European-funded non-profit sport project",
        body: "<strong>Beach Golf Sport Association</strong> created Ladywoods Golf as a European project using <strong>beach golf</strong> and sports management training to involve girls from different countries, then bring the learning back into local communities.",
        points: [
          "International training phase with groups of <strong>five girls from 15 European countries</strong>.",
          "Lessons on <strong>sports management, beach golf rules</strong> and project activities.",
          "Final September challenge with <strong>one representative girl from each country</strong>."
        ]
      },
      {
        label: "Social content",
        title: "Editorial planning for multiple platforms",
        body: "The social work started before the event with a <strong>weekly editorial plan</strong>: educational posts to explain beach golf, lighter videos with viral potential and content designed to prepare the audience for the final event.",
        points: [
          "Created <strong>informational posts</strong> about beach golf rules, format and project goals.",
          "Planned <strong>funny or viral-style short videos</strong> to make the project feel less institutional.",
          "Prepared <strong>event-build-up posts</strong> for Facebook, Instagram, TikTok and X, adapting copy and tone by platform."
        ]
      },
      {
        label: "Event staff",
        title: "Live operations, logistics and content capture",
        body: "During the event, the role mixed <strong>staff support</strong> and <strong>content production</strong>: helping the activities run smoothly while documenting useful moments for social and post-event communication.",
        points: [
          "Prepared materials for <strong>beach golf lessons</strong>, hotel welcome and participant support.",
          "Supported <strong>movements, schedules and practical needs</strong> during the event.",
          "Captured <strong>photos, videos, posts and short-form material</strong> while working with the staff."
        ]
      }
    ],
    socialChannels: [
      {
        label: "Ladywoods Golf",
        url: "https://www.instagram.com/ladywoodsgolf?igsh=NHd0cXdzbGs4cXJr"
      },
      {
        label: "Beach Golf Sport Association",
        url: "https://www.instagram.com/beach_golf?igsh=MXQ3bjF6c3J1dTk4Mw=="
      }
    ],
    deepDive: [
      {
        title: "Editorial planning and channel adaptation",
        body: `<p>The content work started before the final event. The goal was to create a <strong>weekly editorial plan</strong> that could prepare the audience, explain the project and keep the channels active with a mix of useful and lighter content.</p><p>The same message could not be copied everywhere. Facebook, Instagram, TikTok and X needed different logic: <strong>tone of voice, caption length, visual rhythm, format and timing</strong> had to change depending on the channel. The work therefore included both planning and adapting content so the project did not feel like a static institutional update.</p>`
      },
      {
        title: "Event preparation and on-site staff work",
        body: `<p>The internship was also operational. Before and during the event, the work included preparing practical materials for <strong>beach golf lessons</strong>, welcome moments at the hotel, participant activities and staff needs.</p><p>During the event, content creation happened while working as part of the staff. That meant supporting movements, helping participants, organizing materials, facilitating activities and capturing content at the same time. The useful part of this experience is precisely that mix: <strong>communication, logistics, speed and responsibility in a live context</strong>.</p>`
      },
      {
        title: "Tools and production workflow",
        body: `<p>The production workflow used a mix of design, editing and capture tools: <strong>Canva, Photoshop, Premiere Pro, CapCut, camera, gimbal/stabilizer and microphone</strong>.</p><p>The goal was not only to create polished content after the event, but also to produce usable material while activities were happening. That required fast decisions: what to film, when to take photos, how to capture interviews or group moments and how to turn raw material into posts, reels or videos that could explain the project clearly.</p>`
      }
    ],
    hideKeyNumbers: true,
    hideSnapshot: true,
    hideFutureData: true,
    hideExamples: true,
    performancePlaceholder: "",
    urlPlaceholder: "",
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
    summaryPoints: [
      `<span>Research</span><strong>Found relevant news sources</strong><em>Articles started from real facts, numbers and current news context.</em>`,
      `<span>Draft</span><strong>Wrote outreach-ready articles</strong><em>The format was short, factual and suitable for external publishers.</em>`,
      `<span>Links</span><strong>Integrated strategic internal links</strong><em>Anchors and target URLs were selected to support priority SEO pages.</em>`
    ],
    summaryPointStyle: "rich",
    metrics: [
      ["17", "off-page articles written for outreach"],
      ["81", "republications across online newspapers"],
      ["559", "backlinks acquired to priority pages"],
      ["22.2", "average Domain Rating (DR) of the sources"]
    ],
    callouts: [
      ["Research", "Articles started from <strong>real news sources</strong>, not generic rewritten content."],
      ["Link building", "Each article used selected internal links and descriptive anchors to support priority URLs."],
      ["Quality gate", "The workflow checked word count, source sufficiency, title data and Italian proofreading."]
    ],
    deepDive: [
      {
        title: "How we worked: news research and topic selection",
        body: `<p>The first step was choosing news that could work for outreach. The article had to start from a <strong>real, recent and verifiable source</strong>, not from a generic SEO idea. Priority went to topics that had public interest, clear numbers or concrete consequences: energy bills, government bonuses, renewables, fuel prices, climate, technology, regulation or consumer spending.</p><p>A topic was useful only if it could support both sides of the work: it had to be <strong>publishable for an online newspaper</strong> and still close enough to Papernest's SEO universe to justify a natural link. If the source was too thin, too promotional or did not provide enough facts, the article should not be produced.</p><div class="process-flow"><article><span>Source</span><p>Start from news with dates, numbers, institutional context, market impact or public relevance.</p></article><article><span>Angle</span><p>Turn the source into a clear article angle that a local or digital newspaper could publish without sounding like advertising.</p></article><article><span>Fit</span><p>Check whether the topic can naturally connect to energy, savings, bills, home efficiency, consumers or sustainability.</p></article><article><span>Risk</span><p>Avoid weak sources, invented data, over-optimized titles or stories where the link would feel forced.</p></article></div>`
      },
      {
        title: "How we wrote the article",
        body: `<p>The writing had to feel like a short editorial article, not like a brand page. The structure was controlled: a strong title, a compact introduction, clear sections and a factual tone. The text needed to explain <strong>what happened, why it matters and what changes for people</strong>.</p><p>The article could include numbers from the source, but the rule was simple: <strong>do not invent missing data</strong>. If a detail was not in the source or could not be checked, it stayed out. This kept the article usable for outreach and reduced the risk of sending weak or inaccurate content to publishers.</p><ul><li><strong>Readable structure:</strong> short paragraphs, clear H2s and no unnecessary technical density.</li><li><strong>Factual writing:</strong> dates, amounts, percentages and policy details only when supported by the source.</li><li><strong>Neutral tone:</strong> useful for an external publisher, not promotional copy for Papernest.</li><li><strong>SEO fit:</strong> the article still needed a topic bridge toward the priority page being supported.</li></ul>`
      },
      {
        title: "How links were inserted",
        body: `<p>The link was not treated as an afterthought. It had to fit inside the article's logic, with an anchor that made sense for the reader and for the target page. The goal was to support priority URLs while keeping the article <strong>natural, readable and acceptable for publication</strong>.</p><p>When a link points to an external newspaper page in the inventory, it means the article was published by one of the contacted online newspapers. If a future link points to Papernest, it should be read as a publication on the <strong>Papernest blog</strong>.</p><ul><li><strong>Anchor choice:</strong> descriptive anchors connected to the sentence, avoiding generic labels like "click here".</li><li><strong>Target selection:</strong> links chosen around the topic and the SEO priority of the destination page.</li><li><strong>Editorial fit:</strong> the link should add context, not interrupt the article.</li><li><strong>Tracking:</strong> the inventory keeps article date, backlinks, referring pages, Domain Rating and example publication links when available.</li></ul>`
      },
      {
        title: "How the value was estimated: Earned Media Value, benchmarks & method",
        body: `<p>To translate the off-page work into a business figure, I estimated its <strong>Earned Media Value (EMV)</strong>: how much it would have cost to obtain the same publications through a paid link-building marketplace. It is a <strong>cost-based, verifiable metric</strong> — a replacement cost, not a hypothetical revenue claim.</p><p>The unit of value is the <strong>placement</strong> (one published article on a news outlet), not the single backlink: on a marketplace you pay for the publication, which then carries several links. Most republications carried about <strong>4 to 6 backlinks</strong> toward priority pages, around <strong>5 on average</strong>, but every placement is counted <strong>once</strong> — not per link — so the multiple links are never double-counted. Each placement is priced by the <strong>Domain Rating (DR)</strong> of the hosting outlet — the same authority signal marketplaces price on. These are honestly <strong>low-authority, syndicated pickups</strong> on small Italian outlets, so every band is valued at the <strong>lowest</strong> published market price.</p><div class="formula-accordion formula-single"><details><summary><span>The benchmarks and the full calculation</span></summary><div class="formula-grid"><article><span>Where the prices come from</span><p>Not from a single vendor. The per-DR rates come from <strong>public 2026 marketplace pricing studies</strong>: Serpzilla reports <strong>DR 0–20 ≈ $80–130</strong>, <strong>DR 20–40 ≈ $130–220</strong>, <strong>DR 40–60 ≈ $220–400</strong> per placement, and Adsy's analysis of <strong>37,542 sites</strong> finds an average of <strong>~$280 per link</strong> (median $216).</p></article><article><span>How the estimate stays conservative</span><p>I used the <strong>floor</strong> of each band (never the average), converted to euro <strong>rounding down</strong>, and priced DR&lt;10 sites at €50 — below the marketplace entry point. For reference, the market <em>average</em> for a DR 11–40 guest post is $351–390, so this sits well under list price.</p></article><article><span>DR &lt; 20 · 32 placements</span><p>Small local/niche outlets at <strong>€50–75</strong> each → about <strong>€2,200</strong>.</p></article><article><span>DR 20–40 · 41 placements</span><p>The core of the set, at the DR 20–40 floor of <strong>€120–140</strong> → about <strong>€5,000</strong>.</p></article><article><span>DR 40+ · 8 placements</span><p>Stronger domains at <strong>€200</strong> each → about <strong>€1,600</strong>.</p></article><article><span>Total EMV</span><p>Roughly <strong>€9,000</strong> (an approximate figure, not a precise total), i.e. about <strong>€16 per backlink</strong> — below the cheapest paid "link insertion" (~€50), so it reads as a floor.</p></article><article><span>What it does not claim</span><p>It is a replacement cost, not SEO equity or revenue. The links sit on <strong>19 unique domains</strong> with heavy syndication, so their ranking value is lower than the raw count suggests, and no traffic or conversion is attributed.</p></article></div></details></div><p><strong>Earned, not bought.</strong> These 81 placements were obtained through <strong>manual outreach</strong> to online newspapers, with <strong>no paid budget</strong> — the euro figure is only a benchmark for what the same coverage would have cost on a paid link-building marketplace. The reference rates come from two public 2026 sources: <strong>Serpzilla</strong> (<a href="https://serpzilla.com/blog/how-much-should-you-pay-for-a-guest-post/" target="_blank" rel="noreferrer">guest-post pricing by DR</a> — $80–130 for DR 0–20, $130–220 for DR 20–40, $220–400 for DR 40–60) and <strong>Adsy</strong> (<a href="https://adsy.com/blog/how-much-should-you-pay-for-guest-post" target="_blank" rel="noreferrer">analysis of 37,542 websites</a> — about $280 average per link, $216 median). I applied the <strong>lowest</strong> value in each band, so the estimate stays below real marketplace list prices.</p>`
      }
    ],
    articleSummary: {
      scope: "Italian market · weekly news-based articles (Feb–Jun 2026)",
      written: "17",
      republished: "81",
      backlinks: "559",
      avgDr: "22.2",
      outlets: "19",
      emv: {
        value: "≈ €9K",
        perBacklink: "≈ €16 / backlink",
        note: "Estimated Earned Media Value: the conservative cost of acquiring the same 81 placements through a paid link-building marketplace, priced at the low end of each DR band."
      },
      examples: [
        { title: "Bonus fotovoltaico 2026: cambiano le regole", outlet: "corrierenazionale.it", dr: "57", url: "https://www.corrierenazionale.it/2026/03/30/bonus-fotovoltaico-2026-cambiano-le-regole-cosa-fare-per-non-perdere-lincentivo-in-arrivo/" },
        { title: "Decreto Bollette: sostegni da 5 miliardi diventa legge", outlet: "arenadigitale.it", dr: "50", url: "https://arenadigitale.it/2026/04/13/via-libera-del-senato-il-decreto-bollette-diventa-legge-e-introduce-sostegni-da-5-miliardi/" },
        { title: "L'addio allo smart working nelle grandi aziende", outlet: "corrierepl.it", dr: "47", url: "https://www.corrierepl.it/2026/03/01/laddio-allo-smart-working-rivoluziona-la-gestione-delle-grandi-aziende-italiane/" }
      ]
    },
    hideKeyNumbers: true,
    hideSnapshot: true,
    hideFutureData: true,
    hideExamples: true,
    performancePlaceholder: "",
    urlPlaceholder: "",
    demos: []
  },
  {
    id: "creator",
    title: "Content Creator & Community Management",
    shortTitle: "Creator Work",
    category: "Broader digital experience",
    status: "Creator + community management",
    summary: "Independent creator work across <strong>gaming tutorials and football content</strong>, useful to show audience building, <strong>community management</strong>, editing and content iteration.",
    explanation: `<p>Creator work means working directly with <strong>audiences, platform formats, retention, comments, community feedback and repeatable content systems</strong>.</p><p>The value for a digital marketing portfolio is practical: you need to understand what people are looking for, package the answer well, help users after publishing and improve formats based on real reactions.</p>`,
    summaryPoints: [
      `<span>Gaming</span><strong>Tutorials, community and support</strong><em>Created gaming tutorials, answered recurring questions and managed a large Telegram community.</em>`,
      `<span>Football</span><strong>Viral research and interviews</strong><em>Produced football content from 2021, including short-form formats, interviews and topic research.</em>`,
      `<span>Tools</span><strong>Editing and visual production</strong><em>Used Premiere Pro, Photoshop and CapCut depending on platform and format.</em>`
    ],
    summaryPointStyle: "rich",
    metrics: [
      ["78k / 40k", "gaming YouTube and TikTok audience peaks"],
      ["5k+", "Telegram gaming community members"],
      ["30k / 28k", "football Instagram and YouTube audiences"],
      ["2020-24", "digital-product sales and customer-support period"]
    ],
    callouts: [
      ["Audience", "Built content for communities with recurring questions, feedback loops and platform-specific behavior."],
      ["Formats", "Worked across YouTube tutorials, TikTok/Instagram short-form, football interviews, news and analysis."],
      ["Value", "Shows practical experience with publishing, customer support, editing tools and content distribution."]
    ],
    creatorShowcase: [
      {
        label: "Gaming channel ecosystem",
        title: "Tutorials, comments and community support since 2014",
        accent: "gaming",
        description: "Gaming content started in 2014 and focused mainly on tutorials and practical help: users watched the video, asked follow-up questions in the comments and often needed extra support through the community.",
        stats: [
          ["78k", "YouTube audience peak"],
          ["40k", "TikTok followers"],
          ["5k+", "Telegram community"]
        ],
        items: [
          "Created tutorials and gameplay/help content for recurring user needs.",
          "Managed comments and community questions, turning feedback into new content ideas.",
          "Sold digital products during 2020-2024, with customer assistance and post-purchase support."
        ],
        tools: ["Premiere Pro", "Photoshop", "YouTube", "TikTok", "Telegram"],
        period: "Channel since 2014 · Digital-product sales: 2020-2024"
      },
      {
        label: "Football content project",
        title: "Viral topic research and short-form production",
        accent: "football",
        description: "Football content focused on finding topics with viral potential and adapting them into short-form or interview formats across Instagram, TikTok and YouTube.",
        stats: [
          ["30k", "Instagram audience"],
          ["20k", "TikTok audience"],
          ["28k", "YouTube audience"]
        ],
        items: [
          "Researched football topics, personalities and moments with strong platform potential.",
          "Produced short-form content, interviews, news-style clips and analysis formats.",
          "Used fast editing workflows to package content for discovery and repeat viewing."
        ],
        tools: ["CapCut", "Instagram", "TikTok", "YouTube"],
        period: "Since 2021"
      }
    ],
    deepDive: [
      {
        title: "Gaming creator work: tutorials, support and digital products",
        body: `<p>The gaming project started in <strong>2014</strong> and was based on <strong>practical tutorial content</strong>: users arrived because they needed help with a specific action, watched the video and often continued the interaction through comments or community channels.</p><p>From <strong>2019</strong>, the project entered a stronger <strong>growth phase</strong>: content became more consistent, the audience expanded and the community side became more important. Comments were not just engagement: they showed what was unclear, which questions came back often and what needed a new tutorial, update or explanation. Managing that loop helped build experience with <strong>audience support, content iteration and community trust</strong>.</p><div class="process-flow process-flow--summary"><article><span>Tutorials</span><p>Structure videos around a clear user problem, with steps, visual explanation and practical outcome.</p></article><article><span>Comments</span><p>Answer recurring doubts and use them to understand where the content needed more clarity.</p></article><article><span>Community</span><p>Manage a Telegram community of <strong>5,000+ people</strong>, keeping support and discussion organized.</p></article><article><span>Products</span><p>Sell digital products during <strong>2020-2024</strong>, handling basic customer support and post-purchase assistance.</p></article></div><p>The production side used <strong>Premiere Pro</strong> for editing and <strong>Photoshop</strong> for visual assets, thumbnails or supporting graphics.</p>`
      },
      {
        title: "Football creator work: viral research and short-form formats",
        body: `<p>The football project started in <strong>2021</strong> and followed a different logic from gaming. Instead of tutorial intent, the work was based on <strong>topic selection, timing and format adaptation</strong>: choosing football stories, moments or personalities that could perform well on social platforms.</p><p>The content included <strong>interviews, news-style clips, analysis and short-form videos</strong>. The challenge was to turn a football idea into something that could be understood quickly, hold attention and feel native to the platform.</p><div class="process-flow"><article><span>Research</span><p>Look for topics with viral potential: players, interviews, news, debates, moments and story angles.</p></article><article><span>Format</span><p>Adapt the same idea differently for Instagram, TikTok or YouTube depending on pace and audience expectation.</p></article><article><span>Edit</span><p>Use <strong>CapCut</strong> for faster short-form production and platform-native packaging.</p></article><article><span>Iterate</span><p>Read engagement signals and comments to understand which formats deserved to be repeated.</p></article></div>`
      },
      {
        title: "How it supports a digital marketing profile",
        body: `<p>This background is useful for roles where <strong>content, social distribution and digital marketing</strong> overlap. It shows comfort with publishing, feedback loops, audience analytics, editing tools and community management.</p><p>Most importantly, it shows a practical habit: identifying what people need, making the answer easy to consume, watching how they react and improving the next piece of content based on real behavior.</p>`
      }
    ],
    performancePlaceholder: "Future data could show selected screenshots or public-facing performance highlights if you decide to include them.",
    urlPlaceholder: "Selected channel links can be added later if you want this secondary section to become more public-facing.",
    hideKeyNumbers: true,
    hideSnapshot: true,
    hideFutureData: true,
    hideExamples: true,
    demos: []
  }
];

const projectOrder = [
  "reviews",
  "offers",
  "sportelli",
  "offpage",
  "scraping",
  "nrj2-analysis",
  "summary",
  "ranking",
  "social-media",
  "creator",
  "change-residence"
];

const projectFilterOptions = [
  { id: "all", label: "Overview" },
  { id: "seo", label: "SEO" },
  { id: "technical", label: "Technical" },
  { id: "social", label: "Social Media" }
];

const projectPortfolioMeta = {
  reviews: {
    visualTheme: "content-seo",
    icon: "★",
    areas: ["seo"],
    topicTags: ["Sentiment", "AI workflow", "Data"],
    cardSummary: "Review pages powered by real comments and scoring.",
    story: {
      main: "I redesigned supplier review pages as <strong>evidence-led SEO assets</strong>, using <strong>public customer comments</strong> instead of a generic editorial opinion format.",
      problem: "The SERP showed that users often trusted <strong>forums, Reddit threads or Facebook discussions</strong> more than standard review pages, both for us and for competitors.",
      analysis: "I read that as a <strong>search-intent signal</strong>: users wanted <strong>human proof</strong>. The solution was to <strong>scrape, clean and cluster comments</strong>, then connect each cluster to scores and WordPress-ready sections.",
      insight: "The page had to serve <strong>two user paths</strong>: quick comparison for horizontal users, and <strong>deeper cluster exploration</strong> for users focused on one supplier.",
      output: "Final output: <strong>HTML demos</strong>, weighted scoring logic, sentiment clusters and a <strong>percentage-only data trend view</strong> for the 17-page review cluster."
    }
  },
  offers: {
    visualTheme: "content-seo",
    icon: "€",
    areas: ["seo"],
    topicTags: ["UX", "AI workflow", "Price data"],
    cardSummary: "Offer pages with prices, context and HTML modules.",
    story: {
      main: "I built and revamped supplier offer pages for <strong>high-intent energy searches</strong> where users need <strong>prices, conditions and activation context</strong> quickly.",
      problem: "There was a <strong>transactional SEO gap</strong>: competitors had dedicated offer pages, while many of our URLs did not yet target users searching specific tariffs before comparing or subscribing.",
      analysis: "The solution was to create offer sheets that were not only present in the SERP, but stronger than standard competitor pages: <strong>clearer H2s</strong>, richer pricing context, cleaner HTML modules and <strong>unique price-trend content</strong>.",
      insight: "The strongest offer pages work like <strong>decision tools</strong>, not simple descriptions: they help users understand the offer, compare it and decide what to check before activation.",
      output: "Final output: <strong>91 offer sheets</strong>, HTML page modules, offer tables, <strong>price-history modules</strong> and a percentage-only performance recovery view."
    }
  },
  "change-residence": {
    visualTheme: "content-seo",
    icon: "↘",
    areas: ["seo"],
    topicTags: ["Informational SEO", "Gemini", "Data"],
    cardSummary: "New city pages for change-of-residence queries.",
    story: null
  },
  sportelli: {
    visualTheme: "content-seo",
    icon: "⌖",
    areas: ["seo"],
    topicTags: ["Local SEO", "Map UX", "Crawl"],
    cardSummary: "Local map prototype from branch URL data.",
    story: {
      main: "I designed an <strong>interactive branch-map prototype</strong> to make a large local-SEO URL inventory easier to navigate and more useful from a UX perspective.",
      problem: "Flat branch lists are <strong>hard to use</strong>, especially on mobile, and branch-intent traffic can be local, navigational or support-oriented rather than immediately commercial. The existing UX was not ideal, so I wanted to propose a <strong>cleaner, more useful design</strong>.",
      analysis: "Before proposing the design, I analysed <strong>37 hub pages</strong> and <strong>659 local child pages</strong>, connecting GSC, PP, clients, TR and CM3. The key signal was that some hubs generated <strong>PP</strong> but not enough clients or CM3, while local child pages were closer to qualified intent.",
      insight: "The solution was an <strong>interactive map</strong> that is visually stronger but also practical: it helps users select a region or city and reach the page they were actually looking for faster.",
      output: "Final output: a <strong>not-implemented but fully reasoned prototype</strong> with region/city logic, crawlable destination links and a publishable HTML/CSS/JS direction."
    }
  },
  summary: {
    visualTheme: "content-seo",
    icon: "↗",
    areas: ["seo"],
    topicTags: ["Interlinking", "UX block", "HTML"],
    cardSummary: "Review blocks for mother pages and internal links.",
    story: {
      main: "After building the full review pages, I created <strong>review-summary blocks</strong> to connect those pages back to the supplier mother pages in a more coherent way.",
      problem: "The mother pages already linked to reviews, but the review area showed <strong>different information</strong> and felt less aligned with the new page design. It needed a soft refresh that improved the page itself and made the new reviews more inviting.",
      analysis: "The component had to work as a <strong>compact overview</strong> of the full review page: score, short strengths/weaknesses copy, selected comments and clear links, without rewriting the mother page.",
      insight: "The strongest interlinking path is not just a link. It is a <strong>preview</strong>: users see useful review signals first, then have a reason to open the full review page. On mobile, the component was also designed to be understood in roughly <strong>one or two scrolls</strong>, so the preview stays compact instead of becoming another long section.",
      output: "Final output: reusable <strong>review-summary HTML blocks</strong> with comment cards, method links, blurred teaser cards and ranking CTAs."
    }
  },
  ranking: {
    visualTheme: "content-seo",
    icon: "№",
    areas: ["seo"],
    topicTags: ["Comparison", "Sentiment", "UX"],
    cardSummary: "Supplier ranking built from scores and sentiment.",
    story: {
      main: "I updated a <strong>supplier-ranking page</strong> so a generic best-provider comparison became consistent with the new review ecosystem.",
      problem: "A best-supplier page can feel <strong>generic</strong> if the ranking is not connected to visible evidence, real comments and a clear path toward individual reviews.",
      analysis: "The page had to be <strong>aligned with the new review pages</strong>: same evidence logic, stronger content coherence and more useful internal linking between the ranking and each supplier review.",
      insight: "The strongest version was not a simple ordered list. It included <strong>review comments</strong>, added <strong>sentiment analysis</strong> as extra unique content and helped users understand why each provider was positioned that way.",
      output: "Final output: updated <strong>ranking HTML</strong> with podium logic, full supplier ranking, sentiment/comment evidence and links toward the review pages."
    }
  },
  "nrj2-analysis": {
    visualTheme: "technical-ai",
    icon: "◈",
    areas: ["technical"],
    topicTags: ["Data analysis", "Crawl", "Business"],
    cardSummary: "SEO diagnosis across URL families and intent.",
    story: null
  },
  scraping: {
    visualTheme: "technical-ai",
    icon: "⌁",
    areas: ["technical"],
    topicTags: ["Scraping", "AI rules", "QA"],
    cardSummary: "Scraping rules for cleaner review evidence.",
    story: {
      main: "I built the <strong>scraping and data-collection layer</strong> behind the review system, focused on turning public social comments into cleaner, traceable review evidence while reducing manual reading time.",
      problem: "Collecting supplier comments manually would have been <strong>too time-consuming</strong>: every provider required platform research, source checks, comment reading and manual selection.",
      insight: "I used <strong>Apify through the Claude Code integration</strong> to collect public comments at scale, while <strong>Codex</strong> helped structure the collection instructions.",
      output: "Final output: reusable <strong>scraping rules, query packs, validation checks and normalized exports</strong> feeding clustering, sentiment analysis, scoring and review-page generation, with an estimated <strong>4.5 hours of manual reading/evaluation saved</strong> on the first 12 suppliers."
    },
    storySteps: [
      ["Problem", "Collecting comments manually would have required too much time: source discovery, platform checks, URL validation and reading hundreds of comments provider by provider."],
      ["Solution", "Use <strong>Apify from Claude Code through the Apify integration</strong> to automate the collection phase and bring public social comments into a workable dataset."],
      ["Difficulty", "Scraping already saved a lot of collection time, but without precise rules part of that gain could be reduced by reviewing <strong>less relevant or too generic comments</strong>."],
      ["Improvement", "I used <strong>Codex-built instructions</strong> to define themes, exclusion rules and quality criteria before collection, reducing unnecessary review work and saving an estimated <strong>4.5 hours</strong> of reading/evaluation."]
    ]
  },
  offpage: {
    visualTheme: "content-seo",
    icon: "⇄",
    areas: ["seo"],
    topicTags: ["Off-page", "Backlinks", "AI draft"],
    cardSummary: "News-based articles for outreach and backlinks.",
    hideProjectStory: true,
    hideSummaryPanel: true,
    story: {
      main: "I wrote and tracked <strong>news-based off-page articles</strong> designed for outreach and backlink acquisition toward priority pages. The work combined <strong>news research, factual editorial writing, natural anchor selection and publication tracking</strong>: each article started from a real source, was shaped so it could be sent to online newspapers, and included links only where they made sense for the reader and the target page.",
      problem: "Backlink content can become weak or promotional if it is not connected to <strong>real news, reliable facts and natural anchors</strong>.",
      analysis: "The workflow started from news research, extracted usable facts, then shaped short articles that could be sent to <strong>online newspapers or published on Papernest</strong> when appropriate.",
      insight: "Good off-page work sits between editorial judgment and link strategy: the article has to be useful before it can support SEO through links.",
      output: "Final output: an aggregated inventory of <strong>17 off-page articles</strong> (about one per week), republished <strong>81 times</strong> across online newspapers and generating <strong>559 backlinks</strong> to priority pages, with an average source <strong>Domain Rating of 22.2</strong>."
    }
  },
  "social-media": {
    visualTheme: "social-content",
    icon: "●",
    areas: ["social"],
    topicTags: ["Social", "Events", "EU project"],
    cardSummary: "Social planning and live-event content for Ladywoods / BGSA.",
    hideJumpNav: true,
    story: null
  },
  creator: {
    visualTheme: "social-content",
    icon: "▶",
    areas: ["social"],
    topicTags: ["Content", "Community", "Analytics"],
    cardSummary: "Creator work across communities and formats.",
    hideJumpNav: true,
    story: null
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
const floatingBackButton = document.querySelector("#floatingBackButton");
const projectGrid = document.querySelector("#projectGrid");
const projectFilters = document.querySelector("#projectFilters");
const scrollProgress = document.querySelector("#scrollProgress");
const detailCategory = document.querySelector("#detailCategory");
const detailTitle = document.querySelector("#detailTitle");
const detailSummary = document.querySelector("#detailSummary");
const detailStatus = document.querySelector("#detailStatus");
const projectJumpNav = document.querySelector("#projectJumpNav");
const sectionSummary = document.querySelector("#sectionSummary");
const storyPanel = document.querySelector("#sectionSummary .story-panel");
const detailExplanation = document.querySelector("#detailExplanation");
const articleInventoryLead = document.querySelector("#articleInventoryLead");
const dataEvidenceSection = document.querySelector("#sectionEvidence");
const seoMetrics = document.querySelector("#seoMetrics");
const calloutGrid = document.querySelector("#calloutGrid");
const deepAccordion = document.querySelector("#deepAccordion");
const performanceSection = document.querySelector("#sectionPerformance");
const performanceTitle = document.querySelector("#performanceTitle");
const performancePeriod = document.querySelector("#performancePeriod");
const performanceNarrative = document.querySelector("#performanceNarrative");
const performanceBaselineLabel = document.querySelector("#performanceBaselineLabel");
const performanceLegendSplit = document.querySelector("#performanceLegendSplit");
const performanceLegendSplitItem = performanceLegendSplit?.parentElement;
const performanceLegendCoreItem = document.querySelector("#performanceLegendCoreItem");
const performanceChartMode = document.querySelector("#performanceChartMode");
const performanceChart = document.querySelector("#performanceChart");
const chartTooltip = document.querySelector("#chartTooltip");
const chartFootnote = document.querySelector("#chartFootnote");
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

document.addEventListener("pointerdown", (event) => {
  if (!chartTooltip.hidden && !event.target.closest(".chart-shell")) {
    hideChartTooltip();
  }
});
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
  ".user-path-card",
  ".offpage-article-card"
];

function updateScrollProgress() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  scrollProgress?.style.setProperty("--progress", `${clamp(progress, 0, 1) * 100}%`);
}

let lastScrollY = window.scrollY;
let upwardScrollDistance = 0;

function resetFloatingBackButton() {
  if (!floatingBackButton) {
    return;
  }

  upwardScrollDistance = 0;
  lastScrollY = window.scrollY;
  floatingBackButton.hidden = true;
}

function updateFloatingBackButton() {
  if (!floatingBackButton || !projectView || projectView.hidden) {
    upwardScrollDistance = 0;
    lastScrollY = window.scrollY;
    if (floatingBackButton) {
      floatingBackButton.hidden = true;
    }
    return;
  }

  const currentY = window.scrollY;
  const delta = currentY - lastScrollY;

  if (currentY < 360) {
    upwardScrollDistance = 0;
    lastScrollY = currentY;
    floatingBackButton.hidden = true;
    return;
  }

  if (delta < 0) {
    upwardScrollDistance += Math.abs(delta);
  } else if (delta > 0) {
    upwardScrollDistance = 0;
    floatingBackButton.hidden = true;
  }

  floatingBackButton.hidden = upwardScrollDistance < 70;
  lastScrollY = currentY;
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
    document.body.classList.add("is-project-view");
    document.body.classList.remove("is-home-view");
    renderProjectDetail(getActiveProject());
    window.scrollTo({ top: 0, behavior: "auto" });
    requestAnimationFrame(() => {
      refreshScrollReveal(projectView);
      updateScrollProgress();
      resetFloatingBackButton();
    });
    return;
  }

  homeView.hidden = false;
  projectView.hidden = true;
  document.body.classList.add("is-home-view");
  document.body.classList.remove("is-project-view");
  demoFrame.src = "about:blank";
  resetFloatingBackButton();
  renderProjectGrid();
  requestAnimationFrame(() => {
    refreshScrollReveal(homeView);
    updateScrollProgress();
  });
}

function getAreaLabel(areaId) {
  return projectFilterOptions.find((option) => option.id === areaId)?.label || areaId;
}

function getProjectThemeClass(project) {
  return `project-box--${project.visualTheme || "content-seo"}`;
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
    <a class="project-box ${getProjectThemeClass(project)}" href="#project/${project.id}" aria-label="Open ${project.title}" style="--reveal-index:${index}">
      <span class="project-box__body">
        <span class="project-box__top">
          <span class="project-box__index">${String(index + 1).padStart(2, "0")}</span>
          <span class="project-box__icon" aria-hidden="true">${project.icon || "•"}</span>
        </span>
        <span class="project-box__category">${project.category}</span>
        <strong>${project.shortTitle}</strong>
        <span class="project-box__summary">${project.cardSummary || project.summary.replace(/<[^>]*>/g, "")}</span>
      </span>
      <span class="project-box__footer">
        <span class="project-topic-tags">
          ${(project.topicTags || project.areas || []).slice(0, 3).map((tag) => `<i>${escapeHtml(tag)}</i>`).join("")}
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
  if (project.id === "offpage" || project.hideJumpNav) {
    projectJumpNav.hidden = true;
    projectJumpNav.innerHTML = "";
    return;
  }

  projectJumpNav.hidden = false;
  projectJumpNav.classList.toggle("project-jump-nav--summary", Boolean(project.jumpSummaryCard));
  projectJumpNav.setAttribute("aria-label", project.jumpSummaryCard ? "Project time-saving summary" : "Project sections");

  if (project.jumpSummaryCard) {
    const card = project.jumpSummaryCard;
    projectJumpNav.innerHTML = `
      <div class="time-saved-card">
        <div>
          <span>${card.kicker}</span>
          <strong>${card.value}</strong>
        </div>
        <p>${card.text}</p>
        ${card.chips?.length ? `
          <ul>
            ${card.chips.map((chip) => `<li>${chip}</li>`).join("")}
          </ul>
        ` : ""}
      </div>
    `;
    return;
  }

  const links = [
    ...(project.articleSummary ? [["Article inventory", "sectionArticleInventory"]] : []),
    ["Summary", "sectionSummary"],
    ["Deep dive", "sectionDeepDive"],
    ...(!project.hideKeyNumbers ? [["Key numbers", "sectionEvidence"]] : []),
    ...(dataset ? [["Data trend", "sectionPerformance"]] : []),
    ...(!project.hideSnapshot ? [["Snapshot", "sectionSnapshot"]] : []),
    ...(project.demos.length && !project.hideExamples ? [["HTML demo", "sectionExamples"]] : []),
    ...(!project.hideFutureData ? [["URLs", "sectionInventory"]] : [])
  ];

  projectJumpNav.innerHTML = `
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
  performanceBaselineLabel.textContent = dataset.chartBaseline?.label || "Percentage baseline";
  performanceLegendSplit.textContent = dataset.update?.legendLabel || dataset.update?.chartLabel || dataset.update?.label || "Performance split";
  if (performanceLegendSplitItem) {
    performanceLegendSplitItem.hidden = Boolean(dataset.hideSplitLegend);
  }
  performanceLegendCoreItem.hidden = !dataset.events?.some((event) => event.kind === "google-core");
  chartFootnote.textContent = dataset.chartFootnote || "Hover or tap the chart to inspect each date. Absolute numerical values cannot be shown publicly, so this view uses percentage variations only.";
  performanceNarrative.innerHTML = `
    <p>${dataset.narrative.summary}</p>
    ${dataset.narrative.insights?.length ? `<ul>
      ${dataset.narrative.insights.map((insight) => `<li>${insight}</li>`).join("")}
    </ul>` : ""}
  `;

  const metricCards = dataset.metricCards || [
    { label: "Click trend", value: deltas.clickTrend.percent, direction: deltas.clickTrend.direction, description: "daily average variation after the update" },
    { label: "Impression trend", value: deltas.impressionTrend.percent, direction: deltas.impressionTrend.direction, description: "daily visibility variation after the update" },
    { label: "CTR trend", value: deltas.ctrTrend.percent, direction: deltas.ctrTrend.direction, description: "relative click-through variation" },
    { label: "Position trend", value: deltas.positionTrend.percent, direction: deltas.positionTrend.direction, description: "relative improvement, lower position is better" }
  ];

  if (dataset.hideMetricCards || !metricCards.length) {
    performanceComparison.hidden = true;
    performanceComparison.innerHTML = "";
  } else {
    performanceComparison.hidden = false;
    performanceComparison.innerHTML = metricCards.map((card) => `
      <article class="${card.direction === "improved" ? "is-improved" : "is-declined"}">
        <span>${escapeHtml(card.label)}</span>
        <strong>${formatSignedPercent(card.value)}</strong>
        <p>${escapeHtml(card.description)}</p>
      </article>
    `).join("");
  }

  if (dataset.hideTopPagesPanel || dataset.topPagesPanel?.hidden) {
    topPagesPanel.hidden = true;
    topPagesPanel.innerHTML = "";
  } else if (dataset.pageMovements?.length) {
    topPagesPanel.hidden = false;
    renderPageMovements(dataset);
  } else {
    topPagesPanel.hidden = false;
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
    <p class="top-pages-note">Only percentage variations are shown. Absolute numerical values are not included in the public dataset.</p>
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
  const panel = dataset.topPagesPanel || {};
  const hasSplit = Boolean(dataset.topPagePeriodSplit?.available);
  const canShowPeriod = period === "total" || hasSplit;
  const topPages = canShowPeriod
    ? (period === "total" ? dataset.topPages : dataset.topPagesByPeriod?.[period] || []).slice(0, 6)
    : [];
  const activeLabel = {
    total: "Total period",
    before: "Before",
    after: "After"
  }[period];

  topPagesPanel.innerHTML = `
    <div class="top-pages-head">
      <div>
        <p class="eyebrow">${escapeHtml(panel.eyebrow || "Top contributing pages")}</p>
        <h3>${escapeHtml(panel.title || "Who carried the review cluster")}</h3>
      </div>
      ${hasSplit ? `<div class="top-pages-controls" aria-label="Top pages period filter">
        <button class="${period === "total" ? "is-active" : ""}" type="button" data-top-period="total" aria-pressed="${period === "total"}">Total period</button>
        <button class="${period === "before" ? "is-active" : ""}" type="button" data-top-period="before" aria-pressed="${period === "before"}">Before</button>
        <button class="${period === "after" ? "is-active" : ""}" type="button" data-top-period="after" aria-pressed="${period === "after"}">After</button>
      </div>` : ""}
    </div>
    <p class="top-pages-note">${getTopPagesNote(dataset, period)}</p>
    ${topPages.length ? `<div class="top-pages-list" aria-label="${activeLabel}">
      ${topPages.map((page) => `
        <article>
          <div>
            ${page.url ? `<a href="${escapeHtml(page.url)}" target="_blank" rel="noreferrer"><strong>${escapeHtml(page.provider)}</strong></a>` : `<strong>${escapeHtml(page.provider)}</strong>`}
            <span>${escapeHtml(panel.itemNote || "Percentage-only movement unavailable for this legacy export.")}</span>
          </div>
          ${panel.showBars === false ? "" : `<i style="--bar:36%"></i>`}
        </article>
      `).join("")}
    </div>` : `
      <div class="top-pages-empty">
        <strong>${activeLabel} URL ranking needs another export</strong>
        <p>Send an export with both <strong>Page</strong> and <strong>Date</strong> dimensions to calculate a real before/after ranking for each URL.</p>
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
  const panel = dataset.topPagesPanel || {};

  if (period === "total") {
    return escapeHtml(panel.totalNote || "Ranking based on the total exported period.");
  }

  if (dataset.topPagePeriodSplit?.available) {
    const periodInfo = dataset.topPagePeriodSplit[period];
    return escapeHtml(`${periodInfo.label}: ${periodInfo.range}.`);
  }

  return escapeHtml(panel.unavailableNote || dataset.topPagePeriodSplit?.reason || "Page-by-date export needed for this view.");
}

function renderFutureData(project, dataset) {
  if (project.hideFutureData) {
    futureDataSection.hidden = true;
    return;
  }

  futureDataSection.hidden = false;

  if (project.livePageUrl) {
    performanceSlotCard.hidden = true;
    urlInventoryCard.classList.add("is-wide");
    urlInventoryTitle.textContent = project.livePageTitle || "Live page";
    urlPlaceholder.innerHTML = `
      <span class="url-inventory-note">
        Live page:
        <a href="${escapeHtml(project.livePageUrl)}" target="_blank" rel="noreferrer">${escapeHtml(project.livePageLabel || project.livePageUrl)}</a>.
        ${project.livePageNote || `This live page should match the example shown here until <strong>August 8, 2026</strong>; after that, future edits are possible.`}
      </span>
    `;
    return;
  }

  if (dataset?.urlInventory?.length) {
    performanceSlotCard.hidden = true;
    urlInventoryCard.classList.add("is-wide");
    urlInventoryTitle.textContent = dataset.urlInventoryTitle || "Review URL inventory";
    urlPlaceholder.innerHTML = `
      <span class="url-inventory-note">${dataset.urlInventoryNote || `These are the ${dataset.urlInventory.length} review URLs included in the cluster. They have not been changed again after my update and should remain unchanged until <strong>August 8, 2026</strong>; after that, future edits are possible.`}</span>
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
  const height = 390;
  const margin = { top: 62, right: 76, bottom: 48, left: 62 };
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
  const yMin = minValue - padding;
  const yMax = Math.max(.5, maxValue + padding);

  const xScale = (index) => margin.left + (index / (data.length - 1)) * innerWidth;
  const yScale = (value) => baseline - ((value - yMin) / (yMax - yMin)) * innerHeight;
  const dateStart = new Date(`${data[0].date}T00:00:00`).getTime();
  const dateEnd = new Date(`${data[data.length - 1].date}T00:00:00`).getTime();
  const dateToX = (dateValue) => {
    const time = new Date(`${dateValue}T00:00:00`).getTime();
    const ratio = dateEnd === dateStart ? 0 : (time - dateStart) / (dateEnd - dateStart);
    return margin.left + clamp(ratio, 0, 1) * innerWidth;
  };

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
  performanceChart.querySelector("title").textContent = dataset.title || "Indexed percentage variation";

  if (!dataset.hidePhaseBackground && splitIndex > 0) {
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
  }

  renderChartEvents(dataset, dateToX, margin, baseline, innerHeight, width);

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

  [...new Set([0, Math.round((data.length - 1) * .25), Math.round((data.length - 1) * .5), Math.round((data.length - 1) * .75), data.length - 1])].forEach((index) => {
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

  const hitWidth = Math.max(innerWidth / data.length, 12);
  let lastTouchTooltipAt = 0;
  const isRecentTouchTooltip = () => Date.now() - lastTouchTooltipAt < 1200;
  const hideChartTooltipAfterMouse = () => {
    if (!isRecentTouchTooltip()) {
      hideChartTooltip();
    }
  };

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
    marker.addEventListener("mouseenter", () => {
      if (!isRecentTouchTooltip()) {
        showChartTooltip(point, dataset);
      }
    });
    marker.addEventListener("mousemove", () => {
      if (!isRecentTouchTooltip()) {
        showChartTooltip(point, dataset);
      }
    });
    marker.addEventListener("click", () => {
      if (isRecentTouchTooltip()) {
        return;
      }
      showChartTooltip(point, dataset);
    });
    marker.addEventListener("focus", () => {
      if (!isRecentTouchTooltip()) {
        showChartTooltip(point, dataset);
      }
    });
    marker.addEventListener("blur", hideChartTooltipAfterMouse);
    marker.addEventListener("mouseleave", hideChartTooltipAfterMouse);
    performanceChart.append(marker);
  });

  const pointAtClientX = (clientX) => {
    const rect = performanceChart.getBoundingClientRect();
    const svgX = ((clientX - rect.left) / rect.width) * width;
    const index = Math.round(((clamp(svgX, margin.left, width - margin.right) - margin.left) / innerWidth) * (data.length - 1));
    const row = data[index];

    if (!row) {
      return null;
    }

    const clickPoint = clickPoints[index];
    const impressionPoint = impressionPoints[index];
    const anchorY = Math.min(
      showClicks ? clickPoint.y : baseline,
      showImpressions ? impressionPoint.y : baseline
    );

    return {
      x: xScale(index),
      y: anchorY,
      clickY: clickPoint.y,
      impressionY: impressionPoint.y,
      row,
      index,
      showClicks,
      showImpressions
    };
  };

  const showPointFromClientX = (clientX, clientY = null, isTouchInput = false) => {
    const point = pointAtClientX(clientX);
    if (point) {
      if (isTouchInput) {
        lastTouchTooltipAt = Date.now();
      }
      showChartTooltip(point, dataset, isTouchInput && Number.isFinite(clientY) ? { clientX, clientY } : null);
    }
  };

  performanceChart.onpointerdown = (event) => {
    const isTouchInput = event.pointerType === "touch" || event.pointerType === "pen";
    showPointFromClientX(event.clientX, event.clientY, isTouchInput);
  };

  performanceChart.onpointermove = (event) => {
    if (event.pointerType === "touch" || event.pointerType === "pen") {
      showPointFromClientX(event.clientX, event.clientY, true);
    }
  };

  performanceChart.onclick = (event) => {
    if (!isRecentTouchTooltip()) {
      showPointFromClientX(event.clientX);
    }
  };

  performanceChart.ontouchstart = (event) => {
    const touch = event.touches?.[0] || event.changedTouches?.[0];
    if (touch) {
      showPointFromClientX(touch.clientX, touch.clientY, true);
    }
  };
}

function renderChartEvents(dataset, dateToX, margin, baseline, innerHeight, width) {
  const events = dataset.events || [];

  events.forEach((event, index) => {
    const lane = event.lane ?? (event.kind === "google-core" ? 0 : 1);
    const labelY = 18 + lane * 18;

    if (event.type === "range") {
      const x1 = dateToX(event.start);
      const x2 = dateToX(event.end);
      const x = Math.min(x1, x2);
      const rangeWidth = Math.max(Math.abs(x2 - x1), 2);

      performanceChart.append(createSvgElement("rect", {
        class: `chart-event-range chart-event-range--${event.kind || "context"}`,
        x,
        y: margin.top,
        width: rangeWidth,
        height: innerHeight
      }));

      const label = createSvgElement("text", {
        class: `chart-event-label chart-event-label--${event.kind || "context"}`,
        x: clamp(x + rangeWidth / 2, margin.left + 24, width - margin.right - 24),
        y: labelY,
        "text-anchor": "middle"
      });
      label.textContent = event.label;
      performanceChart.append(label);
      return;
    }

    const x = dateToX(event.date);
    performanceChart.append(createSvgElement("line", {
      class: `chart-event-marker chart-event-marker--${event.kind || "context"}`,
      x1: x,
      x2: x,
      y1: margin.top,
      y2: baseline
    }));

    const labelAnchor = x > width - margin.right - 96 ? "end" : "start";
    const labelOffset = labelAnchor === "end" ? -8 : 8;
    const label = createSvgElement("text", {
      class: `chart-event-label chart-event-label--${event.kind || "context"}`,
      x: x + labelOffset,
      y: labelY,
      "text-anchor": labelAnchor
    });
    label.textContent = event.label;
    performanceChart.append(label);
  });
}

function showChartTooltip(point, dataset, touchAnchor = null) {
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
  chartTooltip.classList.toggle("is-touch", Boolean(touchAnchor));
  chartTooltip.innerHTML = `
    <strong>${formatLongDate(point.row.date)}</strong>
    <span>${point.row.phase === "before" ? dataset.periods?.before?.label || "Before" : dataset.periods?.after?.label || "After"}</span>
    ${point.showClicks ? `<p><b class="tooltip-dot tooltip-dot--clicks"></b>${formatSignedPercent(point.row.clickChange)} click variation</p>` : ""}
    ${point.showImpressions ? `<p><b class="tooltip-dot tooltip-dot--impressions"></b>${formatSignedPercent(point.row.impressionChange)} impression variation</p>` : ""}
    <p class="tooltip-note">${escapeHtml(dataset.chartBaseline?.tooltipNote || "Compared with the chart baseline")}</p>
  `;

  const anchorX = touchAnchor?.clientX ?? chartRect.left + (point.x / 940) * chartRect.width;
  const anchorY = touchAnchor?.clientY ?? chartRect.top + (point.y / 390) * chartRect.height;
  const tooltipWidth = chartTooltip.offsetWidth || 190;
  const tooltipHeight = chartTooltip.offsetHeight || 126;
  const isTouchTooltip = Boolean(touchAnchor);
  const gap = isTouchTooltip ? 12 : 14;
  const viewportPadding = 10;
  const left = clamp(anchorX - tooltipWidth / 2, viewportPadding, window.innerWidth - tooltipWidth - viewportPadding);
  let top = anchorY - tooltipHeight - gap;

  if (isTouchTooltip) {
    const topBelow = anchorY + gap;
    const hasRoomBelow = topBelow + tooltipHeight <= window.innerHeight - viewportPadding;
    top = hasRoomBelow ? topBelow : anchorY - tooltipHeight - gap;
    chartTooltip.classList.toggle("is-below", hasRoomBelow);
  } else if (top < viewportPadding) {
    top = anchorY + gap;
    chartTooltip.classList.add("is-below");
  }

  if (isTouchTooltip && top + tooltipHeight > window.innerHeight - viewportPadding) {
    top = window.innerHeight - tooltipHeight - viewportPadding;
  }

  chartTooltip.style.left = `${left}px`;
  chartTooltip.style.top = `${clamp(top, viewportPadding, window.innerHeight - tooltipHeight - viewportPadding)}px`;
}

function hideChartTooltip() {
  chartTooltip.hidden = true;
  performanceChart.querySelector(".chart-focus")?.classList.add("is-hidden");
}

function renderProjectStory(project) {
  if (project.hideProjectStory) {
    return "";
  }

  if (!project.story) {
    return project.explanation;
  }

  if (project.summaryOnly) {
    return `
      <div class="project-summary-story project-summary-story--single">
        <article class="project-summary-story__summary">
          <span>Summary</span>
          <p>${project.story.main}</p>
        </article>
      </div>
    `;
  }

  const storyItems = project.storySteps || [
    ["Problem", project.story.problem],
    ["Analysis", project.story.analysis],
    ["Solution", project.story.insight],
    ["Output", project.story.output]
  ];

  return `
    <div class="project-summary-story">
      <article class="project-summary-story__summary">
        <span>Summary</span>
        <p>${project.story.main}</p>
      </article>
      <div class="project-summary-flow project-summary-flow--${storyItems.length}" aria-label="Project story flow">
        ${storyItems.map(([label, body], index) => `
          <article data-step="${String(index + 1).padStart(2, "0")}">
            <span>${label}</span>
            <p>${body}</p>
          </article>
        `).join("")}
      </div>
    </div>
  `;
}

function getArticleLinkMeta(url) {
  if (!url) {
    return {
      label: "Publication link pending",
      note: "A public example link will be added when available.",
      host: ""
    };
  }

  let host = "";
  try {
    host = new URL(url).hostname.replace(/^www\./, "");
  } catch {
    host = "";
  }

  const isPapernest = host.includes("papernest.");

  return {
    label: isPapernest ? "Open Papernest blog article" : "Open published article",
    note: isPapernest
      ? "This link points to an article published on the Papernest blog."
      : "This link points to an article published by one of the contacted online newspapers.",
    host
  };
}

function getArticleEmvMethod(project) {
  if (project.id !== "offpage") {
    return null;
  }

  return project.deepDive.find((item) => item.title.startsWith("How the value was estimated")) || null;
}

function renderArticleEmvMethod(project) {
  const method = getArticleEmvMethod(project);
  if (!method) {
    return "";
  }

  return `
    <div class="offpage-emv-method">
      <details open>
        <summary><span>${escapeHtml(method.title)}</span></summary>
        <div>${method.body}</div>
      </details>
    </div>
  `;
}

function renderArticleInventory(project) {
  const summary = project.articleSummary;
  if (!summary) {
    return "";
  }

  const kpis = [
    [summary.written, "off-page articles written"],
    [summary.republished, "republications across news outlets"],
    [summary.backlinks, "backlinks acquired to priority pages"],
    [summary.avgDr, "average source Domain Rating (DR)"]
  ];

  return `
    <section class="offpage-article-section" id="sectionArticleInventory" aria-label="Off-page article inventory summary">
      <div class="offpage-article-head">
        <span>Article inventory — aggregated</span>
        <p>Aggregated view of the off-page work${summary.scope ? ` (${escapeHtml(summary.scope)})` : ""}. Each article started from a real news source and was syndicated to online newspapers; most republications carried about <strong>4 to 6 backlinks</strong> toward priority Papernest pages, around <strong>5 on average</strong>${summary.outlets ? `, across <strong>${escapeHtml(summary.outlets)} distinct outlets</strong>` : ""}. <strong>DR</strong> is the average Domain Rating of the linking sources.</p>
      </div>
      <dl class="offpage-summary-grid">
        ${kpis.map(([value, label]) => `
          <div class="offpage-summary-kpi">
            <dt>${escapeHtml(value)}</dt>
            <dd>${escapeHtml(label)}</dd>
          </div>
        `).join("")}
      </dl>
      ${summary.emv ? `
        <div class="offpage-emv">
          <div class="offpage-emv__figure">
            <span>Earned Media Value</span>
            <strong>${escapeHtml(summary.emv.value)}</strong>
            <em>${escapeHtml(summary.emv.perBacklink)}</em>
          </div>
          <p>${escapeHtml(summary.emv.note)}</p>
        </div>
        ${renderArticleEmvMethod(project)}
      ` : ""}
      ${summary.examples?.length ? `
        <div class="offpage-summary-examples">
          <h4>Selected published examples (best DR)</h4>
          <ul>
            ${summary.examples.map((example) => `
              <li>
                <a href="${escapeHtml(example.url)}" target="_blank" rel="noreferrer">
                  <strong>${escapeHtml(example.title)}</strong>
                  <span class="offpage-example-meta">
                    <b>${escapeHtml(example.outlet)}</b>
                    ${example.dr ? `<i>DR ${escapeHtml(example.dr)}</i>` : ""}
                    ${example.date ? `<small>${escapeHtml(example.date)}</small>` : ""}
                  </span>
                </a>
              </li>
            `).join("")}
          </ul>
        </div>
      ` : ""}
    </section>
  `;
}

function renderResultSummary(summary) {
  if (!summary) {
    return "";
  }

  return `
    <section class="result-summary-card" aria-label="${escapeHtml(summary.kicker)}">
      <div class="result-summary-card__head">
        <span>${escapeHtml(summary.kicker)}</span>
        <h3>${summary.title}</h3>
        <p>${summary.text}</p>
      </div>
      ${summary.stats?.length ? `
        <dl class="result-summary-card__stats">
          ${summary.stats.map(([value, label]) => `
            <div>
              <dt>${escapeHtml(value)}</dt>
              <dd>${escapeHtml(label)}</dd>
            </div>
          `).join("")}
        </dl>
      ` : ""}
    </section>
  `;
}

function renderProjectDetail(project) {
  const performanceDataset = getPerformanceDataset(project);
  const articleEmvMethod = getArticleEmvMethod(project);
  const deepDiveItems = project.deepDive.filter((item) => item !== articleEmvMethod);
  const leadHtml = project.articleSummary
    ? renderArticleInventory(project)
    : renderResultSummary(project.resultSummary);
  const storyPanelHidden = Boolean(project.hideSummaryPanel);
  const summaryPanelHtml = storyPanelHidden ? "" : `
    ${renderProjectStory(project)}
    ${project.summaryPoints?.length ? `
      <ul class="summary-points ${[
        project.summaryPointStyle === "rich" ? "summary-points--rich" : "",
        project.summaryPointLayout ? `summary-points--${project.summaryPointLayout}` : ""
      ].filter(Boolean).join(" ")}">
        ${project.summaryPoints.map((point) => `<li>${point}</li>`).join("")}
      </ul>
    ` : ""}
    ${renderEventShowcase(project)}
    ${renderCreatorShowcase(project)}
  `;
  const hasSummaryPanel = Boolean(summaryPanelHtml.trim());
  const hasLead = Boolean(leadHtml.trim());

  detailCategory.textContent = project.category;
  detailTitle.textContent = project.title;
  detailSummary.innerHTML = project.summary;
  detailStatus.textContent = project.status;
  renderProjectJumpNav(project, performanceDataset);
  if (sectionSummary) {
    sectionSummary.hidden = !hasSummaryPanel && !hasLead;
  }
  if (storyPanel) {
    storyPanel.hidden = !hasSummaryPanel;
  }
  if (articleInventoryLead) {
    articleInventoryLead.hidden = !hasLead;
    articleInventoryLead.innerHTML = leadHtml;
  }
  dataEvidenceSection.hidden = Boolean(project.hideKeyNumbers);
  snapshotSection.hidden = Boolean(project.hideSnapshot);
  detailExplanation.innerHTML = summaryPanelHtml;

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

  deepAccordion.innerHTML = deepDiveItems.map((item, index) => `
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

function renderEventShowcase(project) {
  if (!project.eventShowcase?.length) {
    return "";
  }

  return `
    <section class="event-showcase" aria-label="Event and social media work highlights">
      <div class="event-showcase__grid">
        ${project.eventShowcase.map((item, index) => `
          <article class="event-card event-card--${index + 1}">
            <span>${escapeHtml(item.label)}</span>
            <strong class="event-card__title">${escapeHtml(item.title)}</strong>
            <p>${item.body}</p>
            <ul>
              ${item.points.map((point) => `<li>${point}</li>`).join("")}
            </ul>
          </article>
        `).join("")}
      </div>
      ${project.socialChannels?.length ? `
        <div class="event-channel-strip">
          <span>Public channels</span>
          <div>
            ${project.socialChannels.map((channel) => `
              <a href="${escapeHtml(channel.url)}" target="_blank" rel="noreferrer">${escapeHtml(channel.label)}</a>
            `).join("")}
          </div>
        </div>
      ` : ""}
    </section>
  `;
}

function renderCreatorShowcase(project) {
  if (!project.creatorShowcase?.length) {
    return "";
  }

  return `
    <section class="creator-showcase" aria-label="Creator work highlights">
      ${project.creatorShowcase.map((channel) => `
        <article class="creator-card creator-card--${escapeHtml(channel.accent || "default")}">
          <div class="creator-card__header">
            <span>${escapeHtml(channel.label)}</span>
            <strong>${escapeHtml(channel.title)}</strong>
            <em>${escapeHtml(channel.period)}</em>
          </div>
          <p>${escapeHtml(channel.description)}</p>
          <div class="creator-stat-strip">
            ${channel.stats.map(([value, label]) => `
              <div>
                <strong>${escapeHtml(value)}</strong>
                <span>${escapeHtml(label)}</span>
              </div>
            `).join("")}
          </div>
          <ul>
            ${channel.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
          <div class="creator-tool-row">
            ${channel.tools.map((tool) => `<span>${escapeHtml(tool)}</span>`).join("")}
          </div>
        </article>
      `).join("")}
    </section>
  `;
}

function renderDemos(project) {
  if (project.hideExamples) {
    exampleArea.hidden = true;
    demoFrame.src = "about:blank";
    return;
  }

  exampleArea.hidden = false;

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
  exampleTitle.textContent = activeDemo.title || activeDemo.label;
  exampleLink.href = activeDemo.path;
  examplePath.textContent = "Public HTML example loaded in the preview below.";
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

function returnToPortfolio() {
  history.pushState("", document.title, window.location.pathname);
  setViewFromHash();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

backButton.addEventListener("click", returnToPortfolio);
floatingBackButton?.addEventListener("click", returnToPortfolio);

window.addEventListener("hashchange", setViewFromHash);
window.addEventListener("scroll", () => {
  updateScrollProgress();
  updateFloatingBackButton();
}, { passive: true });
window.addEventListener("resize", () => {
  updateScrollProgress();
  updateFloatingBackButton();
});

renderProjectFilters();
renderProjectGrid();
setViewFromHash();
refreshScrollReveal();
updateScrollProgress();
updateFloatingBackButton();

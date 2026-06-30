# Cluster Structure Guide

Use this guide when adding a new portfolio cluster, so every project keeps the same logic and visual rhythm.

## Project Detail Structure

Each project detail should follow this order:

1. Project header with category, title, short summary and status.
2. Jump links immediately after the header, with a short phrase explaining that the visitor can jump to the preferred section.
3. Project Summary with a human-readable explanation of what the project is.
4. Deep dive accordions:
   - why the project was created;
   - how the work was done;
   - technical/data workflow;
   - how it helps users;
   - SEO or business reasoning where relevant.
5. Key numbers, unless the project works better with the numbers integrated into the summary or performance section.
6. Search Console or Analytics trend, only when real data exists.
7. URL inventory or future URL slot.
8. Project snapshot callout cards.
9. Example link and original Italian HTML demo.

## Writing Style

- Dashboard UI stays in English.
- Original page examples stay in Italian.
- Start each project with a plain summary before the deep dive.
- If short summary cards become repetitive, integrate the points into the summary as a compact bullet list instead.
- Use bold text for important concepts, but keep it natural.
- Use bullets, callout cards, tables, accordions and charts to reduce long walls of text.
- In deep dives, use colored labels, compact step cards and subtle gradients when a workflow has several operational phases.
- Explain not only what was done, but why it was done and what problem it solved.
- Avoid making claims that the data cannot support.
- When a project has a corresponding source folder, read its README, skill/spec files and reference docs before deepening the portfolio copy.
- Keep secondary projects lighter only when source examples, URLs or public performance data are still missing.

## Home And CV Layout Rules

- Keep the mini profile highlight cards stacked vertically on desktop, so the right side reads like a compact CV sidebar.
- Keep mobile profile cards compact; two columns are acceptable when labels are short and no horizontal overflow appears.
- Skills & Tools should use three aligned groups on desktop: SEO/content, data/AI/automation and publishing/creative.
- Do not add a separate Workflow skill card; fold useful workflow concepts into the three main skill groups or the experience text.
- Portfolio filters should stay simple: `SEO`, `Technical`, and `Social Media`.
- Do not use `AI` as a project filter. AI is a transversal workflow/tooling layer, not a separate portfolio category.
- Use the `Technical` filter only for analysis/scraping/data workflow projects, such as NRJ2 analysis and social comment scraping.

## Performance Data Rules

- Keep raw GSC exports in `analytics-data/google-search-console/raw/`.
- `analytics-data/google-search-console/raw/` must stay ignored by git.
- Publish only sanitized or aggregated GSC datasets from `analytics-data/google-search-console/processed/`.
- When performance data cannot be public, processed datasets must contain only percentage variations, never raw clicks, impressions, CTR or average-position values.
- For static GitHub Pages and `file://` preview, prefer a processed `.js` dataset that attaches data to `window.portfolioPerformanceData`.
- Also keep a `.json` version for auditability.
- Use cache-busting query parameters when updating CSS, JS or processed datasets.

## GSC Chart Pattern

For cluster performance charts:

- show click and impression variation as clean percentage lines;
- use GSC-like colors: blue for click variation, purple for impression variation;
- do not fill the area under the lines;
- show a vertical marker for the update/publication date;
- add hover/click tooltip with full date and percentage variations only;
- compare pre/post periods with daily-average percentage deltas when periods have different length;
- color positive metric cards subtly, especially growth and position improvement, but show only percentages.
- On desktop, place the short narrative above the chart and let the chart use the full section width.

## Top Pages And URL Inventory

- Use `Pages.csv` to list cluster URLs when available.
- If `Pages.csv` is total-period only, do not create fake before/after page filters.
- Before/after top-page filtering requires a page-by-date export.
- If page-level pre/post data is unavailable, show:
  - Total period active;
  - Before/After as clickable states that explain why URL-level data is unavailable;
  - a short note explaining that page-by-date export is needed.
- When a real dataset exists, remove or hide the old `Performance Data Slot`.
- URL inventories can show only links, not performance numbers.
- If page-level data is public, show only percentage movements per page.
- On mobile, URL inventories can use two compact cards per row when the labels are short enough.

## Mobile Rules

- Keep project boxes compact.
- Key numbers should use two columns on mobile when the cards are short.
- Long lists such as URL inventories and top pages should collapse to one column on mobile.
- Performance comparison cards can use two columns on mobile if the text still fits.
- When compact mobile grids have an odd number of buttons/cards, center the final item instead of leaving it aligned to the left.
- Always verify no horizontal overflow.

## Current Review Cluster Decisions

Dataset:

- `analytics-data/google-search-console/raw/reviews/full-may-june-2026/`
- `analytics-data/google-search-console/raw/reviews/may-2026/`
- `analytics-data/google-search-console/raw/reviews/june-2026/`
- `analytics-data/google-search-console/processed/reviews-gsc-performance.json`
- `analytics-data/google-search-console/processed/reviews-gsc-performance.js`

Date range:

- May 1, 2026 to June 29, 2026.

Comparison:

- May 1-31, 2026 as before update.
- June 1-29, 2026 as after update.
- Daily averages are used because June is not a full month in the export.

Main results:

- Click daily average variation: +145%.
- Impression daily average variation: +44%.
- CTR relative variation: +70%.
- Average-position relative improvement: +9%.

Top pages:

- Public top-page panel shows 6 key URLs with percentage-only movements.
- Total, May-only and June-only raw exports stay local in `analytics-data/google-search-console/raw/`.
- Do not expose raw page-level clicks, impressions, CTR or average-position values in processed JSON/JS.
- Key numbers are hidden as a separate block for the review cluster. The important numbers are integrated in the project summary: 17 suppliers and roughly 40-200 comments analyzed per provider.
- Review URL inventory should show only page links, not performance data, with a note that the pages have not been changed again after the update and should remain unchanged until August 8, 2026.
- The review cluster hides the generic project snapshot because it repeated concepts already explained in the summary and deep dive.
- Demo tabs use explicit labels such as `Intro HTML demo` and `Body HTML demo`.
- Review scoring should be explained with a nested formula accordion inside the scoring deep dive.
- The scoring explanation should mention `s_i`, `q_i`, `r_i`, `w_i`, cluster robustness with `lambda_k`, fixed cluster weights and QA exclusions.
- The user explanation should distinguish the vertical path, where someone clicks score/cluster jump links to reach the matching H2, from the horizontal path, where someone compares overall and cluster scores in the intro.
- Use one formula accordion containing internal colored explanation cards, not several small formula accordions.
- When showing four-step workflows such as Collect, Clean, Normalize and Cluster, give each step a different color treatment.
- Use two visual cards for review user paths: vertical user with `↕️` and horizontal comparison user with `↔️`.

## Current Offer Sheets Cluster Decisions

Dataset:

- `analytics-data/google-search-console/raw/offers/full-mar-jun-2026/`
- `analytics-data/google-search-console/processed/offers-gsc-performance.json`
- `analytics-data/google-search-console/processed/offers-gsc-performance.js`

Date range:

- March 17, 2026 to June 28, 2026.

Comparison:

- These are new pages, so do not describe the chart as a classic before/after update.
- Publication started on March 18, 2026. Until mid-April, the offer-page project existed but was still secondary / not fully prioritized.
- Use April 22-30, 2026 as the final pre-quality baseline: publication had become more regular, but the larger quality/differentiation work had not started yet.
- From mid-April, the cluster became more structured and prioritized, with weekly goals and a target of roughly two new offer pages per day.
- From early May, the work shifted toward quality: unique price-trend content, cleaner H2s, fewer spammy heading patterns, AI-assisted duplicate checks and better transactional UX on new pages or already-published URLs.
- Compare May 1-June 28, 2026 with that pre-quality baseline using daily averages, not totals, so a shorter baseline can be compared with a longer quality period.
- The chart uses 7-day smoothed percentage movement against the pre-quality baseline.
- Explain the March core update as context: repeated offer templates may have been perceived as too similar, then the cluster improved after stronger unique content, price-history modules, cleaner H2s and AI-assisted duplicate checks.
- Show Google core-update windows as context only: March 27-April 8, 2026 and May 21-June 2, 2026.

Public reporting:

- Show only percentage/relative movements, never raw clicks, impressions, CTR or average-position values.
- It is acceptable to show public URLs from `Pages.csv`, but do not attach performance values to them.
- Explain the chart as a recovery/optimization trend after early algorithm context, not as proof that a Google update caused the movement.
- The full project includes 91 offer sheets; the URL inventory reflects URLs available in the GSC export.
- If URL-level phase comparison is needed later, request a page-by-date export; total-period `Pages.csv` is not enough for before/after or launch/latest URL movement.

# Analytics Data Workspace

This folder keeps Search Console or Analytics exports organized before they are turned into public portfolio visuals.

- `google-search-console/raw/`: original GSC exports copied locally for analysis. This folder is ignored by git because raw exports can contain sensitive URLs, queries or account data.
- `google-search-console/processed/`: sanitized and aggregated GSC datasets that can be used by the static portfolio dashboard.

Current dataset:

- `google-search-console/raw/reviews/full-may-june-2026`: Google Search Console export for 17 supplier review pages, covering May 1, 2026 to June 29, 2026.
- `google-search-console/raw/reviews/may-2026`: May-only GSC export used for before-update top pages.
- `google-search-console/raw/reviews/june-2026`: June-only GSC export used for after-update top pages.
- `google-search-console/processed/reviews-gsc-performance.json` and `.js`: public aggregated dataset used by the dashboard.
- `google-search-console/raw/offers/full-mar-jun-2026`: Google Search Console export for supplier offer sheets, covering the launch/growth period.
- `google-search-console/processed/offers-gsc-performance.json` and `.js`: public percentage-only trend for new offer pages, comparing May 1-June 28 daily averages with the Apr 22-30 pre-quality baseline and using indexed/smoothed chart movement instead of raw values.
- `google-search-console/raw/change-residence/full-mar-jun-2026`: Google Search Console export for 9 new change-of-residence city pages, covering March 31, 2026 to June 30, 2026.
- `google-search-console/processed/change-residence-gsc-performance.json` and `.js`: public indexed trend for new change-of-residence pages, using Apr 22-30 as a reference point only so the chart can show percentage movement without raw Search Console values.

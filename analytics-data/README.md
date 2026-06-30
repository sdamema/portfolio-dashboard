# Analytics Data Workspace

This folder keeps Search Console or Analytics exports organized before they are turned into public portfolio visuals.

- `raw/`: original exports copied locally for analysis. This folder is ignored by git because raw exports can contain sensitive URLs, queries or account data.
- `processed/`: sanitized and aggregated datasets that can be used by the static portfolio dashboard.

Current dataset:

- `raw/gsc/reviews/full-may-june-2026`: Google Search Console export for 17 supplier review pages, covering May 1, 2026 to June 29, 2026.
- `raw/gsc/reviews/may-2026`: May-only GSC export used for before-update top pages.
- `raw/gsc/reviews/june-2026`: June-only GSC export used for after-update top pages.
- `processed/reviews-gsc-performance.json` and `.js`: public aggregated dataset used by the dashboard.

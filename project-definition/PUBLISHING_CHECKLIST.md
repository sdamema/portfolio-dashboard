# Publishing Checklist

## Before Public GitHub Pages

- Keep `output/` out of Git.
- Keep `.DS_Store` out of Git.
- Do not publish raw client exports.
- Do not publish full GSC/GA4 exports.
- Do not publish large operational files unless they are intentionally public.
- Use summary pages for sensitive or oversized datasets.
- Keep raw analytics exports in `analytics-data/raw/`.
- Publish only sanitized files from `analytics-data/processed/`.
- When adding before/after URL filters, verify the export contains page-by-date data. Do not infer page-level changes from total-period `Pages.csv`.
- Update `project-definition/CLUSTER_STRUCTURE_GUIDE.md` whenever the dashboard structure or data rules change.

## Current Public Preview Decisions

- `demos/price-history.html` is ignored because it is a large operational file.
- `demos/price-history-summary.html` is used for the public dashboard preview.
- `analytics-data/raw/` is ignored because it stores original GSC/GA exports.
- `analytics-data/processed/` can contain public aggregated JSON/JS datasets.
- The remaining HTML demos should still be reviewed before using the URL in job applications.

## GitHub Pages Steps

1. Create a GitHub repository.
2. Push this folder to the repository.
3. Enable Pages from `Settings > Pages`.
4. Use source `Deploy from a branch`.
5. Select branch `main` and folder `/root`.
6. Open the generated Pages URL.

## Recommended Repository Name

`seo-portfolio-dashboard`

## Target GitHub Owner

`sdamema`

Expected repository URL:

```text
https://github.com/sdamema/seo-portfolio-dashboard
```

Expected GitHub Pages URL after activation:

```text
https://sdamema.github.io/seo-portfolio-dashboard/
```

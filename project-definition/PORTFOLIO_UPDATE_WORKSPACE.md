# Portfolio Update Workspace

Last reviewed: 27 July 2026.

## Working Baseline

- Working branch: `codex/portfolio-update`.
- Primary remote: `https://github.com/sdamema/portfolio-dashboard.git`.
- Public URL: `https://sdamema.github.io/portfolio-dashboard/`.
- Delivery: static GitHub Pages site, with no build step or package dependency.
- Main files: `index.html`, `styles.css` and `app.js`.
- Supporting material: 16 sanitized HTML demos and processed, public-safe GSC
  datasets.
- Local preview: run `python3 -m http.server 5173` from the repository root,
  then open `http://localhost:5173/`.

## Source Of Truth

Use the following local sources before changing claims or project copy:

| Topic | Local source | Use |
|---|---|---|
| Positioning and current headline | `../01_Profilo/profilo_candidato.md` | Profile, target roles and strongest evidence |
| Structured profile data | `../01_Profilo/profile_data.json` | Tools, languages and logistics; cross-check dates and metrics |
| Portfolio evidence map | `../09_CV_Portfolio_Update/02_portfolio_to_cv_evidence_map.md` | Prioritized case-study facts and public-safe metrics |
| Open decisions | `../09_CV_Portfolio_Update/05_questions_to_confirm.md` | Availability, naming, URL and metric consistency |
| Current CV draft | `../00_CV/Emanuele_Sorgona_CV_2026_portfolio_update_v2.md` | Latest CV-facing wording |
| Bounce Barcelona case study | `../13_Bounce_Barcelona_Project/` | New external audit, datasets, map, presentation and pitch |
| Existing portfolio rules | `project-definition/CLUSTER_STRUCTURE_GUIDE.md` | Case structure, reporting and mobile conventions |
| Editorial backlog | `project-definition/PORTFOLIO_REVIEW_BACKLOG.md` | Recruiter-facing improvements already identified |

Paths beginning with `../` are local authoring sources and must not be exposed
as links on the public site.

## Recommended Update Order

1. Resolve global identity and logistics:
   - choose `Sorgona` or `Sorgonà` consistently;
   - use one availability date;
   - confirm the final CV and portfolio links.
2. Refresh the first screen:
   - sharpen the SEO and digital marketing positioning;
   - make the project and CV actions obvious;
   - keep the strongest proof concise and recruiter-readable.
3. Add the Bounce Barcelona audit as a high-priority external case study:
   - clearly label it as a public-data interview project;
   - avoid claims of access to analytics, rankings, bookings or revenue;
   - reuse only verified metrics from the processed datasets and final audit.
4. Recheck project hierarchy:
   - lead with the strongest SEO cases;
   - keep technical/data workflows distinct;
   - keep creator, event and CRM evidence secondary.
5. Run public-safety and responsive QA before publishing.

## Content Guardrails

- Never publish raw GSC, GA4, client or operational exports.
- Use sanitized percentage trends and public URLs only where already approved.
- Describe performance as a trend or comparison, not proven causality.
- Keep the branch-map work labelled as a prototype, not a deployed feature.
- Keep the Bounce work labelled as an external audit based on public pages.
- Treat EMV as estimated replacement cost, never revenue.
- Cross-check profile metrics: `profile_data.json` still contains some older
  May figures, while the evidence map and profile narrative contain newer June
  figures.

## Verification Checklist

- Home and project navigation work with JavaScript enabled.
- Direct demo links return successfully.
- No missing local CSS, JavaScript, image or processed-data references.
- No horizontal overflow at mobile widths.
- Keyboard focus and buttons remain usable.
- Reduced-motion behavior remains acceptable.
- Metadata, contact links, CV link and canonical/public URL are current.
- `git status` contains only intended portfolio-update files before commit.

# Evidence statistics — September 19, 2026

## Delivery

- A compact, source-linked research callout on Home and Problems We Solve.
- Publisher links use the full Harvard Business Review and McKinsey & Company names, with article titles in accessible labels and hover titles. They open in new tabs with an accessible announcement and `noopener noreferrer`. These are source citations, not endorsement badges or client logos.
- A separate, company-reported track-record preview on Home and Results, above the illustrative cases.
- Static numbers, restrained dividers, existing typography, and no new carousel, count-up, dependency, or scroll behavior.
- Company claims appear only when the runtime is `development`. They are absent from production HTML and serialized page data, including review query URLs.
- Local implementation only; this change does not publish the site.

## Sources and limits

| Record | Source | Publication / scope | Status |
| --- | --- | --- | --- |
| Strategy execution | [HBR article](https://hbr.org/2017/11/executives-fail-to-execute-strategy-because-theyre-too-internally-focused) | Historical estimate cited by a secondary source; underlying survey was not independently inspected. | Attributed context, not a current universal benchmark. |
| Corporate transformation | [McKinsey interview](https://www.mckinsey.com/capabilities/transformation/our-insights/why-do-most-transformations-fail-a-conversation-with-harry-robinson) | July 10, 2019; corporate transformations, not all projects. | Attributed historical context. |
| Company track record | [120VC Leadership System](https://www.120vc.com/leadership-system/) and user-supplied image | First-party marketing claims; source appearance is not validation. | Review only. |

Sources checked September 19, 2026. These records are not directly comparable populations, definitions, or periods.

## Before company figures can be published

- Performance improvement: original evidence, measured outcome, baseline/comparison group, period, calculation, and authorized wording.
- Success rate: definition of success, numerator and denominator, included/excluded work, measurement period, and original evidence.
- Tenure: confirmed start date, continuity, and the scope supporting the global-enterprise wording.
- All: named approval owner, approval date, permission, and review date.

Do not infer the performance claim from success-rate arithmetic. Do not treat the proposed industry failure statistic as its comparator. No “proven” headline has been added to unsupported company figures.

Implementation: `app/data/evidence-statistics.ts`, `app/components/evidence-statistics.tsx`, and scoped `app/evidence-statistics.css`. Existing case-proof gates remain unchanged.

## Validation

- Production build and all 37 rendered-output checks passed, including source/date/scope checks and exclusion of company preview claims from production HTML and embedded serialized data.
- ESLint, TypeScript, and whitespace checks passed.
- Rendered Home inspected at 320, 390, 768, 1024, and 1440 pixels: no horizontal document or statistics-container overflow.
- Mobile number/label spacing corrected after visual inspection; minimum measured gap at 320 pixels exceeds 10 pixels.
- Source controls measure at least 44 pixels high; keyboard traversal shows a visible focus ring and moves naturally into the existing case controls.
- Enter on Next case study still changes the case; the Results-to-Problems journey and problem-section anchor work.
- Problem and Results pages inspected on tablet. No browser console errors observed in the checked preview.
- Reduced-motion preview retains all five values at full opacity with no number animation. No new animation or JavaScript dependency was introduced.
- Public deployment and validation of the company's underlying evidence were not performed.

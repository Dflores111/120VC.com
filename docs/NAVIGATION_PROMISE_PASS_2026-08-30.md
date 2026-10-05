# 120VC Navigation Promise and Redundancy Pass

## Objective

Every primary destination should immediately answer the promise made by its navigation label. The visitor should not have to translate an abstract tagline, read a breadcrumb, or combine several small labels before understanding the page.

## Primary navigation contract

| Navigation label | First-page answer | Page job |
| --- | --- | --- |
| What We Solve | We solve the execution problems blocking your most important priorities. | Name the five recognizable execution problems and help the buyer identify the closest one. |
| How We Help | We help leadership teams fix execution where it is breaking. | Explain the three commercial areas where 120VC can help. |
| How It Works | We diagnose the break, install the system, and transfer ownership. | Explain the Execution Leadership System and its four-stage installation. |
| Resources | Tools and insights for turning strategy into execution. | Help the visitor choose a practical tool or an insight. |
| Results | See the results of better execution. | Present attributable, measurable evidence through case studies. |

## Homepage chapter contract

The homepage chapters now use the same direct language:

1. Five execution problems we solve.
2. We help leadership teams fix execution across three core areas.
3. See the results of changing how teams execute.
4. We install the system in four stages.

## Redundancy removed

- Removed breadcrumb-like route labels above all five primary experience H1s.
- Removed the decorative page eyebrow from shared supporting-page heroes.
- Removed the generic **What to understand** label beside supporting-page hero introductions and from section-index fallbacks.
- Removed abstract chapter taglines that repeated the job of the following component.
- Preserved labels only when they provide functional orientation, such as carousel progress, step names, or a real case-study status.

## Readability rules

- The H1 is the first semantic and visual answer inside the hero.
- The description adds specifics; it does not restate the headline.
- Section H2s name the problem, service, result, method, or decision represented below them.
- Headings use responsive wrapping rather than authored line breaks.
- Primary H1s stay within four rendered lines at 320px and 390px; two or three lines remain preferred where the composition permits.

## Files changed

- `app/components/problem-page.tsx`
- `app/components/how-we-help-experience.tsx`
- `app/components/how-it-works-experience.tsx`
- `app/components/resources-experience.tsx`
- `app/components/results-experience.tsx`
- `app/components/content-page.tsx`
- `app/page.tsx`
- `app/hierarchy.css`
- `tests/rendered-html.test.mjs`

## Verification standard

- Assert every primary destination H1 fulfills its navigation promise.
- Assert primary heroes contain no breadcrumb markup.
- Assert supporting-page heroes do not begin with route-style eyebrow copy.
- Check H1 wrapping at 1440px, 390px, and 320px.
- Run lint, TypeScript, rendered tests, and the production build.
- Inspect the rendered page; automated checks alone do not approve hierarchy.

## Verified result

- `npm run lint` passed.
- `npx tsc --noEmit --incremental false` passed.
- `npm test` passed: production build plus 22/22 rendered tests.
- Desktop H1 audit completed at 1440px.
- Mobile H1 audit completed at 390px and 320px; every primary H1 stays within four rendered lines.
- Shared supporting-page hero audit completed at 1440px, 390px, and 320px; no route eyebrow or generic **What to understand** label remains.
- Browser console audit reported no errors or warnings.

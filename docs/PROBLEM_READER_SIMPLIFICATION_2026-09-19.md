# Problem explorer: in-place reading

Date: September 19, 2026
Status: Implemented and checked locally; not published.

## Visitor job

Recognize an execution problem, understand its cost, and find relevant help without connecting a selector to a separate panel.

## Changes

- Replaced the flip-card rail, selected-problem banner, connecting arrow, and scroll-controlled diagnostic with five familiar native disclosure rows.
- All problem headlines and short recognition descriptions are visible initially. Optional detail opens immediately beneath its own heading, one problem at a time.
- Detail follows one reading order: symptoms, cost, required change, then relevant service, tool, and reading links. Labels, dividers, restrained color, and type hierarchy support that order.
- Preserved approved problem copy, the hero and its human image, service/resource destinations, legacy problem routes, and research citations. Moved the research callout below the problem choices on this page.
- Opening uses a 200ms, 5px reveal and a rotating plus. No hover-only information, forced scroll, fixed-height canvas, or extra step navigation.
- Selection preserves shareable condition URLs, refresh, and browser history. Existing analytics selection events remain.
- Homepage problem links and other site experiences were not redesigned in this change.

## Implementation

- `app/components/problem-explorer.tsx`: native details/summary, one-open state, optional arrow/Home/End keyboard navigation, condition/history handling.
- `app/problem-reader.css`: scoped typography, spacing, disclosure states, visible focus, mobile layout, and reduced-motion behavior.
- `app/components/problem-page.tsx`: concise introduction and research placement.
- `app/layout.tsx`: stylesheet import.
- `tests/rendered-html.test.mjs`: replaced obsolete selector/diagnostic assertions with the new disclosure contract; retained copy, route, and link coverage.

## Verification

- ESLint, TypeScript, whitespace check, production build, and all 37 automated tests passed.
- Browser checked at 320, 390, 768, 1024, and 1440px widths: no page or disclosure horizontal overflow. Visually inspected desktop overview/open states and phone open state.
- Exercised all five problem choices, direct switching, Enter/Space, arrow focus movement, visible focus, condition URLs, refresh, and browser back/forward.
- A legacy strategy-execution-gap URL restored its corresponding problem.
- Development reduced-motion override disabled both the reveal animation and indicator transition after hydration. The production OS media-query rule was checked in source; no OS preference was changed.
- Followed the decision problem's practical tool and embedded-leadership links to rendered destination pages; returning restored the selected problem.
- No error-level console entries in the fresh verification tab. A prior automation tab stalled during navigation; the same journeys completed in a fresh preview.

## Boundaries

Native details and all body copy are server-rendered, providing a no-JavaScript fallback. A JavaScript-disabled browser session and physical-device/screen-reader testing were not performed. Responsive checks used the browser viewport override. This is local implementation evidence, not publication or representative-user validation.

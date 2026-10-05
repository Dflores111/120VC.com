# CTA and supporting-text legibility — September 19, 2026

## Implemented locally

- Important secondary actions now have a visible outline at rest, 16–17px type, and comfortable padding. They no longer depend on hover or a small underline to look actionable.
- Shared primary, secondary, disclosure, and contextual action controls use a 6px radius, including hover/focus surfaces. Removed the quiet-link underline pseudo-element that cut across the square hover background.
- Service controls keep their padding when hovered/focused, avoiding text reflow. Directional arrows and existing interaction handlers are preserved.
- Increased useful eyebrows, category labels, service-fit labels, problem-detail headings, system-stage names, and footer links to 16–17px. Research context and notes are 15px. Small counters and incidental review notices remain secondary.
- Matched the four homepage pathway button heights on desktop/tablet; long labels wrap on phones rather than shrinking.
- Reduced internal phone flip-card padding and gaps to accommodate larger body/action text without increasing the 500px card height.

## Preserved

Copy, destinations, page inventory, photography, section order, hover previews, keyboard/click behavior, existing motion and reduced-motion handling, proof approval gates, and the truthful email-draft inquiry handoff. No dependencies added. No publishing performed.

## Changed files

- `app/hierarchy.css`: shared CTA geometry, supporting labels, service/pain cards, footer.
- `app/sitemap-refresh.css`: hero/category labels, pathway CTAs, resource labels.
- `app/reading-paths.css`: system and case labels/actions.
- `app/problem-reader.css`: problem labels/actions.
- `app/evidence-statistics.css`: evidence headings, sources, context and notes.
- `tests/rendered-html.test.mjs`: regression coverage for readability, consistent radii, visible rest-state borders, and stable hover/focus dimensions.

## Verification

- ESLint, TypeScript, diff whitespace check, production build, and all 43 automated tests passed.
- Rendered spot checks at 320, 390, 768, 1024, and 1440px. No document-level horizontal overflow in the checked views.
- At 320px, all five flip-card backs fit their 500px panels after the spacing adjustment; four-pathway CTAs wrapped without horizontal overflow.
- Desktop pathway actions showed rounded, high-contrast keyboard focus with unchanged padding and no underline overlay.
- Service-card pointer preview was observed, and Enter expansion remained functional.
- Phone system-detail action was inspected on its dark background. Problem actions and resource categories were checked through rendered DOM sizes.
- This is focused visual/keyboard/layout verification, not a full screen-reader, physical-device, or WCAG certification. No public-site verification or deployment is claimed.

Review locally at `http://127.0.0.1:3000/#four-ts-title`.

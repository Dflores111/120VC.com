# Buyer clarity follow-up — September 19, 2026

## Scope and decision

Implement the accepted follow-up recommendations while preserving hover, as Diego explicitly requested. Keep the existing layout, navigation, motion, and click/tap/keyboard alternatives. No publishing was requested or performed.

## Completed locally

- **Problem explanations:** The five current problem disclosures now read in one direction: what it costs → what 120VC does → what changes. Removed the repeated symptom list from these expanded panels; recognition copy stays visible in the summary. Older problem URLs retain their existing explanations and destinations.
- **Visible service fit:** Each of the three service cards on the homepage and service hub now shows a concise “Best when” sentence without interaction. Optional details contain the first shift and visible difference, without repeating the fit sentence.
- **Preserved hover:** Mouse entry still previews optional service detail; leaving closes an unpinned preview. Click/tap pins it, keyboard focus previews it, and Escape dismisses it. Existing ripple and reduced-motion handling remain unchanged. The disclosure label now says “See what changes.”
- **Hierarchy:** Fit receives a small accent label and divider. Problem details distinguish the 120VC action from the sage outcome block. No additional dependency or component pattern was introduced.

## Waiting for approved inputs

1. **One real client story:** Both the homepage and general approved-case arrays are empty. Development examples are explicitly demos and remain excluded from production. Need an approved story, result evidence/methodology, and permission for the proposed attribution. An existing website mention is not treated as reuse approval.
2. **Direct inquiry delivery:** No approved receiving endpoint or form embed is configured. Need the existing CRM/form destination and its approved field mapping. The current email handoff remains explicit that nothing has been sent; no false submission success or new transport was introduced.

These two inputs were requested from Diego. Do not describe this wave as complete proof or conversion integration.

## Verification

- ESLint: passed.
- TypeScript `--noEmit`: passed.
- `git diff --check`: passed.
- Production build and all **40 automated tests**: passed.
- Tests cover the current problem reading order, legacy URL behavior, visible service fit outside disclosure, preserved interaction handlers, reduced-motion contracts, route/link resolution, and proof/form honesty.
- Local preview was started and `/leadership-services` returned HTTP 200.
- **Visual and live interaction QA remains unverified this wave.** In-app browser tab attachment timed out; Chrome was not available through the browser connector. Source and server-rendered tests are not substitutes for a fresh rendered mouse, touch, keyboard, reduced-motion, and responsive pass.
- Public ChatGPT site: not updated.

## Review destinations

- `http://127.0.0.1:3000/leadership-services`
- `http://127.0.0.1:3000/problems-we-solve?condition=decision-bottlenecks`
- `http://127.0.0.1:3000/`

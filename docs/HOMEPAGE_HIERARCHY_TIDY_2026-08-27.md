# 120VC Homepage Hierarchy Tidy

**Date:** 2026-08-27  
**Scope:** Focused visual-hierarchy, copy-tidy, and proof-simplification pass. The homepage architecture, imagery, motion language, card system, navigation, and conversion path were preserved.

## What changed

- Kept the hero category label and removed the five redundant homepage section eyebrows.
- Standardized normal section introductions to headline, one description when needed, then the component.
- Changed pain-card category text to quiet sentence case.
- Replaced the two labelled pain-card back sections with one consequence sentence and one separated outcome sentence.
- Removed duplicate service-name eyebrows so each service title appears once.
- Removed the redundant active-panel `Step 01` layer while retaining the useful stage numbers in the stepper controls.
- Reduced proof to one vertical narrative: case title, quiet context, one primary result, one Before → 120VC → After visual, one intervention sentence, one quote, and one next step.
- Removed supporting proof metrics and the parallel three-column summary strip from the homepage component. Supporting metrics remain governed in data for future full case-study pages.
- Combined quote role and enterprise context into one quiet attribution line.
- Updated the homepage and global design-system sources of truth to match the simplified hierarchy.

## Components preserved and why

- **Human cinematic hero:** establishes the enterprise and emotional context without changing the stable value promise.
- **Logo marquee:** provides a restrained enterprise-experience cue.
- **Pain carousel with explicit reveal:** lets visitors browse parallel conditions and inspect one condition without loading every consequence at once.
- **Service cards with disclosure:** compares three parallel commercial scopes while keeping secondary detail optional.
- **Manual proof carousel:** presents independent evidence stories without autoplay.
- **Before → 120VC → After evidence visual:** explains the operating change more efficiently than another block of prose.
- **Installation stepper:** communicates an ordered Diagnose → Install → Operate → Own sequence.

No new saved component was added. Adding another pattern would have worked against the simplification objective.

## Interaction and accessibility

- Pain-card reveal remains available through pointer, touch, Enter, and semantic controls.
- Service detail remains an explicit button with `aria-expanded` and a labelled region.
- Proof controls remain manual, labelled, keyboard-operable, and adjacent to the case title on desktop; they follow the case story on mobile.
- Installation stages remain semantic tabs with arrow-key, Home, and End behavior.
- Animated proof retains a screen-reader description and renders its final state immediately under reduced motion.
- Removed copy was visible marketing microcopy only; visually hidden accessible names were preserved.

## Verification

- `npm run lint` — passed
- `npx tsc --noEmit --incremental false` — passed
- `npm test` — 20/20 passed
- `npm run build` — passed
- Rendered widths: 320, 390, 768, 1024, 1440 — no horizontal overflow
- Heading contract: all H1/H2 elements rendered in four lines or fewer
- Proof: one primary result, no supporting metric component, mobile order verified
- Pain-card back fit: passed at all five widths; tested controls measured 48px or larger
- Pointer and keyboard checks: pain reveal, service disclosure, case navigation, installation stepper
- Reduced-motion proof review: final result and final evidence state rendered immediately
- Browser console: no errors or warnings

## Screenshot evidence

Stored in `docs/homepage-hierarchy-tidy-2026-08-27/screenshots/after/`:

- `homepage-desktop.png`
- `homepage-mobile-390.png`
- `pain-desktop.png`
- `services-desktop.png`
- `proof-desktop.png`
- `proof-mobile-390-top.png`
- `proof-mobile-390-bottom.png`
- `how-it-works-desktop.png`
- `final-cta-desktop.png`

## Publication gate retained

The homepage proof shown in local development is demo proof. Production still renders only records where `proofStatus === "approved"` and `approvedForHomepage === true`. Real approved cases, metrics, quotations, attribution, and display permission remain required before public proof publication.

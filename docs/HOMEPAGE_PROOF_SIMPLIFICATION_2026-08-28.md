# 120VC Homepage Proof Simplification

**Date:** 2026-08-28  
**Scope:** Focused hierarchy and proof-clarity pass on the current homepage. The established architecture, visual language, motion system, imagery, navigation, service cards, installation experience, final CTA, and footer were preserved.

## Outcome

The homepage now moves directly from the three How We Help cards into **See what changed.** The former service-routing sentence and its competing consultation prompt are gone.

Each proof story now has one obvious reading path:

1. Transformation title
2. Quiet enterprise context
3. Before → 120VC Changed → After
4. One result inside the After state
5. One intervention sentence
6. One attributed quote
7. One honest next action

The abstract SVG evidence diagram and detached result block were replaced by one familiar transformation comparison. Supporting results remain governed in the data model for future full case-study pages but do not render on the homepage.

## Why these changes matter

### A. Removing the orphan line

The service cards already complete the How We Help story. The additional “Not sure which scope fits?” sentence and consultation row looked added after the composition was complete, created a second ending, and weakened the direct transition into proof. The final CTA remains the stronger consultation path.

### B. Simplifying proof

Enterprise proof must be inspectable quickly. The prior layout asked visitors to reconcile a title, detached metric, abstract diagram, intervention, quote, and controls as separate information systems. The new composition turns those fragments into one case narrative.

### C. Before → Change → After

This is a familiar comparison model. It answers what was happening, what 120VC changed, and what improved without requiring the visitor to learn a new diagram.

### D. One metric

The homepage renders one primary result per case. For the first review case, **42% faster cross-functional decisions in 16 weeks** belongs visibly to After. The 37% and 18% supporting results do not render on the homepage.

### E. Less microcopy

No new eyebrow, component-role label, transition sentence, “What 120VC did” heading, testimonial label, or context label was added. The title, comparison headings, sentence, quote, and controls provide all necessary orientation.

### F. Visual explanation

Motion explains the relationship instead of decorating it: the orange path draws once, After reveals once, the result counts once, and the carousel changes only through manual navigation. Reduced motion renders the completed state immediately.

## Responsive behavior

- Desktop and tablet use approximate `32 / 24 / 44` column proportions for Before, 120VC Changed, and After.
- After receives the most room because it owns both the improved operating state and result.
- At 760px and below, the comparison becomes a vertical Before ↓ 120VC Changed ↓ After sequence.
- The mobile DOM remains meaningful without CSS or motion.
- Carousel controls remain 48 × 48px and follow the story on mobile.
- No horizontal overflow was present at 320, 390, 768, 1024, or 1440px.
- All H1/H2 elements rendered in four lines or fewer at those widths.

## Accessibility and interaction

- The case carousel remains manual and has no autoplay.
- Previous and Next are semantic buttons with accessible names, disabled states, visible focus, 48px targets, and Home/End keyboard behavior.
- Native horizontal scrolling preserves touch and trackpad browsing.
- Inactive slides remain outside the active accessibility path.
- The comparison uses visible headings and lists in meaningful source order.
- A concise screen-reader comparison description remains available.
- The animated result retains a static screen-reader value.
- `prefers-reduced-motion` and the nonproduction `?motion=reduce` review path expose the completed comparison and result immediately.

## Proof governance retained

The three local cases remain fictional layout-review data with `proofStatus: "demo"`, `approvedForHomepage: false`, no client name, no logo, and no public story URL. Production still renders only evidence-approved records. Because the demo records have no approved case-study destination, their CTA remains **Discuss a similar challenge** rather than inventing a “Read the client story” link.

Before public proof launch, replace at least one demo case with approved evidence, result methodology, quotation, attribution, display permission, and an approved case-story URL when applicable.

## Tests added or updated

- The orphan service-routing sentence and wrapper are absent.
- How We Help ends immediately after `SolutionScopeCards` and transitions directly to proof.
- Before, 120VC Changed, and After are present in semantic order.
- Exactly one animated primary result appears in the case template.
- Supporting metrics and the abstract SVG/dashboard system are absent from the homepage component.
- The quote and one attribution line remain present.
- Carousel semantics, accessible controls, analytics, reduced motion, and production proof guards remain enforced.

## Screenshot evidence

Stored in `docs/homepage-proof-simplification-2026-08-28/screenshots/`:

- `homepage-1440-full.png`
- `homepage-390-full.png`
- `how-we-help-to-proof-1440.png`
- `proof-1440.png`
- `proof-1024.png`
- `proof-768.png`
- `proof-390.png`
- `proof-320.png`

The browser’s native full-page stitch was rejected because it duplicated sticky and animated regions. The two final full-page images were assembled from verified, overlapping viewport captures with the repeated fixed header removed.

## Final validation

- `npm run lint` — passed
- `npx tsc --noEmit --incremental false` — passed
- `npm test` — 20/20 passed
- `npm run build` — passed
- Browser console — no errors or warnings
- Reduced-motion final state — verified
- Keyboard End → case 3 and Home → case 1 — verified
- Proof result settled at 42% in every required screenshot width


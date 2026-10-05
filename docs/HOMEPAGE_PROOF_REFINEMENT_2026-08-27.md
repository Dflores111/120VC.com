# Homepage Client Results Refinement

**Date:** 2026-08-27  
**Scope:** The homepage Client Results chapter only. All other homepage chapters, order, navigation, and conversion paths were preserved.

## Outcome

Client Results now reads as one premium enterprise case study at a time rather than an internal report. The active story answers, in order:

1. Who is this about?
2. What changed?
3. What was the measurable result?
4. How did the operating condition move from Before to After?
5. What did the accountable executive experience?
6. What is the next honest action?

The homepage order remains Hero → logos → pain recognition → kinetic statement → How We Help → Client Results → How It Works → final CTA → footer.

## Component selection

### Selected

- **Manual case-study carousel:** three peer stories are parallel browseable examples. Visible Previous/Next controls, `1 / 3` status, native touch/trackpad scroll snap, and Home/End keyboard support make the outcome predictable. It never autoplays.
- **Stats-style result block:** the primary number is the section’s dominant focal point. Timeframe and two supporting results remain visibly subordinate.
- **Custom SVG operating-change graphic:** each case gets a specific transformation model rather than a generic decorative chart. It explains the relationship once and then holds the final state.
- **One quote per case:** the executive voice humanizes the evidence without creating a second testimonial system.

### Considered and rejected

- Flip cards and tabs: they would hide essential proof.
- Stepper or node explorer: they imply an ordered system-learning task rather than parallel case browsing.
- Testimonial columns, wall, or circular orbit: they would compete with the case narrative. The Circular Testimonials pattern may be reconsidered later on a dedicated Results page for multiple independent executive voices.
- Spotlight, marquee, or auto-scroll: they add attention demand without improving evidence comprehension.
- Saved `Stats 2` source: only public catalog metadata was available, not auditable source. Its high-level number-first hierarchy informed the custom result block; no unavailable implementation was invented or copied.

## Demo proof model

`app/data/homepage-case-proof.ts` contains three structured fictional review cases:

| Case | Transformation | Primary demo result |
| --- | --- | --- |
| Global Technology Enterprise | Priority churn → decisions that hold | 42% faster cross-functional decisions |
| Fortune 500 Transformation Organization | Transformation activity → operating change | 31% less execution rework |
| Enterprise Project Portfolio | Too many priorities → deliberate investment | 2.3× faster portfolio prioritization decisions |

Every record remains `proofStatus: "demo"`, `approvedForHomepage: false`, `clientName: null`, and `clientLogo: null`. The full review-only condition, intervention, and after-state copy remains in the data model; the homepage presents deliberately concise summaries.

## Proof governance and production guard

- Development may render demo cases so the finished composition can be evaluated.
- Nonproduction `?review=1` may render them and adds one small `DEMO PROOF` badge outside the case.
- Production returns only records where `proofStatus === "approved" && approvedForHomepage === true`, even if `review=1` is present.
- With no approved case, production renders no Client Results chapter and the internal readiness gate remains `PROOF CONTENT REQUIRED BEFORE PRODUCTION CONVERSION LAUNCH`.
- The customer-facing case contains no legal, fictional-data, or internal-governance warning copy.
- Demo cases never attach an approved experience logo to a fictional outcome.
- A demo has no invented “Read story” destination. Its real CTA is **Discuss a similar challenge**, which leads to the consultation route. An approved case may provide `fullStoryUrl` and receive the **Read the client story** label.

## Motion and reduced motion

- The primary result counts from zero to its final value over approximately 820ms the first time a case becomes active.
- The SVG holds the initial operating condition briefly, transforms over approximately 900ms, and remains still in the final state.
- Neither behavior loops or requires interaction.
- Reopening the same active case does not restart its animation.
- `prefers-reduced-motion: reduce` renders the final number and final graphic state immediately.
- A nonproduction `?motion=reduce` QA route exposes the exact static state without displaying the review panel.
- All essential meaning is also present as visible text and an accessible graphic description.

## Accessibility and interaction

- Exactly one case owns `data-active="true"`; inactive cases use `aria-hidden="true"` and their links leave the tab order.
- Carousel controls are semantic buttons with accessible names, clear disabled states, and 48 × 48px targets.
- Slide position is announced through an atomic polite live region.
- Native horizontal swipe/trackpad scrolling is paired with visible Previous and Next controls.
- Animated numbers retain a screen-reader-readable final value.
- Each evidence graphic has a textual description and uses no animation-only information.
- The visible Before → 120VC Changed → After chain is never hidden behind interaction.
- Focus, pressed, disabled, and reduced-motion states remain explicit; static evidence does not look clickable.

## Analytics

The case experience emits:

- `case_story_viewed`
- `case_story_next`
- `case_story_previous`
- `case_story_cta_clicked`

Each includes `case_id`, `case_context`, `case_index`, `proof_status`, and `source_page`, plus the existing privacy-safe page attribution. Demo proof can never enter production analytics because demo records cannot enter the production DOM.

## Responsive evidence

Required viewports were checked at 320, 390, 768, 1024, and 1440px.

- No page-level horizontal overflow was present.
- One case was active at every width.
- Case-title line counts were 4 / 3 / 2 / 2 / 2 respectively.
- Both controls remained 48 × 48px.
- Mobile intentionally stacks context → title → primary metric → supporting metrics → graphic → transformation chain → quote → CTA → controls.
- Desktop preserves the strong result / evidence split and keeps the controls beside the story header.

Screenshots are stored in `docs/homepage-proof-refinement-2026-08-27/screenshots/after/`:

- `proof-case-1-desktop.png`
- `proof-case-2-desktop.png`
- `proof-case-3-desktop.png`
- `proof-case-1-mobile-390.png`
- `proof-case-1-mobile-reduced-motion.png`

## Validation

| Check | Result |
| --- | --- |
| ESLint | Passed |
| TypeScript (`npx tsc --noEmit --incremental false`) | Passed |
| Tests | 20 passed, 0 failed |
| Production build | Passed |
| Required responsive widths | Passed |
| Manual cases 1–3 | Passed; correct title, result, final graphic state, quote, and one active slide |
| Reduced-motion QA | Passed; `data-reduced-motion="true"`, final evidence state, final number |
| Browser console | No proof-related errors observed |

## Launch requirement: real evidence still needed

Before this chapter can appear to production visitors, replace at least one demo record with an evidence-approved case containing:

- supportable enterprise/client context;
- approved client identity and display permission where named;
- sourced baseline, result, timeframe, and supporting outcomes;
- verified intervention and operating change;
- approved quotation and role/company attribution;
- source reference and approval owner;
- explicit `approvedForHomepage: true`;
- an approved case-story URL if the CTA should say **Read the client story**.

Do not copy fictional records into the approved collection or weaken the production predicate to make the chapter visible.

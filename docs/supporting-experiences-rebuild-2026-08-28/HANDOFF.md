# 120VC supporting-experience rebuild handoff

Date: 2026-08-29

## Outcome

The six primary supporting experiences now use a shared brand system but different buyer-oriented structures. Each page answers one question, gives one component the dominant explanatory job, and ends with one logical next decision.

The homepage architecture and visual language were preserved.

## Pages improved

### How We Help — `/leadership-services`

- Buyer question: Which 120VC starting point fits the outcome I own?
- Dominant component: three editorial solution cards with an optional disclosure.
- Conversion outcome: choose a service family or bring the condition to a consultation.
- Removed: the separate four-factor fit grid and its second decision system.

### How It Works — `/leadership-system`

- Buyer question: What is the system, and how does it become real inside our work?
- Dominant component: the six-node Execution Leadership System explorer.
- Ordered component: Diagnose → Install → Operate → Own installation stepper.
- Conversion outcome: inspect a system link, use its related practice, explore service fit, or discuss a condition.
- Removed: the separate toolbench and duplicate installation-scope chooser.

### What We Solve — `/problems-we-solve`

- Buyer question: Which execution condition looks like ours?
- Dominant component: manual horizontal condition browser with an optional front/impact flip and one selected detail.
- Familiar icon system: compass for drift, leadership group for fragmentation, paused cycle for stalled transformation, stacked layers for portfolio overload, and alert bell for reactive work.
- Flip relationship: the front names the visible condition; the back previews its cost and the shift required. Fine-pointer hover and keyboard focus preview the back. The separate `View details` button selects the condition; there is no redundant click-to-flip mode.
- Conversion outcome: understand the selected condition, use a relevant tool, or explore the relevant service.
- Essential next steps remain outside the flip state and always visible after selection.
- Removed: mode tabs, condition-specific execution diagrams, and separate problem-page journeys.

### Results — `/results`

- Buyer question: What changed, and can I inspect the evidence?
- Dominant component in development/review: Before → 120VC Changed → After case carousel.
- Production behavior: an honest proof gate appears while no evidence-approved cases exist; demo metrics and quotes do not render.
- Conversion outcome: inspect the proof method or discuss the evidence a buying group needs.
- Removed: the proof-framework dashboard, competing proof grids, and disconnected result paths.

### Consultation — `/consultation`

- Buyer question: Is this a useful, low-risk conversation for the condition I own?
- Dominant component: two-step consultation request immediately after the hero.
- Conversion outcome: prepare a concise request and open the visitor's email client to send it.
- Truthful state: nothing is described as sent until the visitor sends the prepared email.
- Removed: the three expectation cards and six-item diagnostic checklist.

### Resources — `/resources`

- Buyer question: Do I need a tool to use now, or material that creates shared understanding?
- Dominant component: accessible `USE IT` / `UNDERSTAND IT` tabs with horizontal resource rails.
- Conversion outcome: open a verified tool/resource, get the book, or discuss a live condition.
- Removed: the book-first hero and generic resource-category grid.

## Imagery and visual meaning

- Problem imagery communicates pressure, overload, disagreement, and execution friction.
- Working-session imagery communicates installation in live work.
- Aligned-team imagery communicates the desired operating state.
- The book appears once, in the educational chapter of Resources.
- Stock imagery is never presented as client proof.
- Informative images have meaningful alternative text; repeated card thumbnails are decorative to assistive technology.

## Interaction contracts

- Solution disclosures reveal fit and first change; essential service meaning and the destination remain visible without opening them.
- Problem cards select one parallel condition and update the recoverable URL state.
- Problem cards mirror the homepage interaction: mouse hover previews and focus provides keyboard parity. Selection remains a separate, explicit control so reveal and navigation never masquerade as one action.
- System tabs select one node, update the recoverable URL state, and expose a related practice.
- Resource tabs switch between two alternate views of one library.
- Installation controls represent an ordered four-stage sequence.
- Results controls manually navigate parallel case studies; there is no aggressive autoplay.
- All controls support keyboard and touch input, visible focus, and reduced motion.

## Components considered but rejected

- Flip cards outside the What We Solve condition browser: rejected because service fit, proof, and next steps need to remain inspectable without a reveal state. The condition browser is the one place where front symptom and back impact are two sides of the same subject.
- Separate mode tabs on What We Solve: rejected because Understand, Work, and Get Help are simultaneous next-step choices, not alternate views.
- A toolbench on How It Works: rejected because one related practice per system node answers the question with less context switching.
- Proof dashboards and multiple statistic grids: rejected because they create competing reading paths and imply evidence depth not yet available.
- Autoplay carousels: rejected because buyers need control over comparison and proof inspection.
- Decorative hover effects on static cards and images: rejected to avoid false affordance.

## Launch gates

1. Replace every illustrative Results case, metric, and quote with evidence-approved material before enabling the public Results route.
2. Confirm licenses, releases, provenance, and final crops for all supplied stock images.
3. Connect the consultation form to an approved receiving workflow if a direct web submission is required. The current mailto handoff is truthful but not a CRM/backend submission.
4. Verify production analytics destinations and consent behavior in the deployment environment.

## Verification

- `npm run lint` — pass
- `npx tsc --noEmit --incremental false` — pass
- `node --test tests/rendered-html.test.mjs` — 21/21 pass
- `npm run build` — pass
- Rendered desktop QA at 1440×900 — six heroes and six primary decision components
- Rendered mobile QA at 390×844 — six heroes and six primary decision components
- Headline-line audit at 390px and 320px — all primary H1s at four lines or fewer
- Horizontal page-overflow audit at 390px and 320px — none
- Interaction checks — solution disclosure, condition selection/history state, system tabs/history state, resource tabs, and consultation progression
- Fresh Results render after hydration — no browser console errors or warnings
- Reduced-motion behavior remains present in component and CSS contracts
- What We Solve flip QA: optional hover/focus preview, separate `View details` selection control, and no hover-only essential meaning.
- Narrow-card QA caught and corrected a mobile text/action collision by increasing the reveal panel height rather than reducing type size.
- Homepage proof QA: repeated semantic point markers now guide Before, 120VC Changed, and After statements without introducing another reading system.
- 390px and 1440px fresh renders confirm no horizontal page overflow in the updated experiences.

## Screenshot evidence

- `screenshots/after/desktop/` — 12 desktop captures
- `screenshots/after/mobile/` — 12 mobile captures

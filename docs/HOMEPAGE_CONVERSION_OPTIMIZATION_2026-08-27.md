# Homepage Conversion Optimization Handoff

> Superseded for homepage chapter order and development proof behavior by `HOMEPAGE_PROOF_REFINEMENT_2026-08-27.md`. This file remains a record of the preceding implementation wave.

**Date:** 2026-08-27  
**Scope:** Homepage conversion, hierarchy, component semantics, proof governance, navigation, form friction, attribution, and responsive behavior.

## Outcome

The homepage now follows one commercial argument:

1. **Position:** name the outcome and offer one diagnostic next step.
2. **Trust:** show approved enterprise-experience marks without implying outcomes or endorsement.
3. **Remember:** reinforce three concise operating outcomes with one kinetic statement.
4. **Recognize:** let buyers browse five parallel execution conditions.
5. **Choose a scope:** show three ways 120VC can help, with essential meaning visible.
6. **Understand the difference:** explain the ordered installation model.
7. **Act:** close with one still consultation decision and one quiet learning path.

Approved client-result evidence belongs between stages six and seven. It remains intentionally omitted until the claims, evidence, attribution, and display permissions are complete.

## Components selected

| Component | Visitor question | Why this pattern | Interaction and outcome | Accessibility / motion adaptation |
| --- | --- | --- | --- | --- |
| Approved enterprise logo marquee | “Have they worked at our level?” | Parallel brand marks are a familiar, quickly scanned authority pattern | A calm rail moves continuously; a real Pause/Play control changes the movement state | One semantic list, two visual-only copies, tab-hidden pause, focus/hover pause, and a static responsive grid under reduced motion |
| Continuous kinetic statement | “What should I remember?” | One repeated sentence band gives the three value outcomes visual memory without adding another explanation block | A faster rail moves in the same direction as the logo rail; a real Pause/Play control changes its state | One semantic copy, duplicated visual-only text, tab-hidden pause, focus/hover pause, and a wrapped static statement under reduced motion |
| Manual pain-card carousel | “Does 120VC understand my situation?” | Five conditions are parallel, browseable items—not ordered steps or a connected system | Arrows, swipe, trackpad, and arrow keys move between peer cards | Visible controls, native scroll snap, focus movement, no autoplay |
| Flip/reveal state, adapted from the saved `flip-card` prompt | “What is this condition costing, and where should I go next?” | The front and back are two sides of the same condition | Mouse hover or keyboard focus previews the second side; tap/click can lock it; Back restores recognition | Pointer, focus, tap, Enter, and Space; `aria-expanded`; one card at a time; immediate face replacement instead of 3D motion under reduced motion |
| Editorial solution cards with disclosure | “Which commercial scope fits?” | The three scopes are parallel choices, while “What changes first” is optional detail about each choice | A button expands secondary change detail; a separate link opens the selected service | Essential offer and destination remain visible without interaction; only real controls receive hover/focus treatment |
| Manual installation stepper | “How does the engagement unfold?” | Diagnose → Install → Operate → Own is an ordered sequence | Tabs and arrow keys select one stage and update one supporting panel | All stage names remain visible; correct tab semantics; vertical mobile layout; no autoplay |
| Progressive consultation form | “What information do I need to provide?” | Identity/relevance first and execution context second is staged commitment | Step 1 collects four business fields; Step 2 collects one required condition plus optional goal and timing | Persistent labels, required state, keyboard operation, honest review state; no false submission success |

## Components considered but rejected

- **Animated or rotating hero copy:** it would destabilize the value proposition.
- **Autoplay image slideshow:** it makes parallel scenes look like required sequential content and competes with reading. One human image now uses finite atmospheric movement.
- **System diagram on the homepage:** a diagram implies a connected operating model. That relationship belongs on How It Works, not in pain recognition.
- **Autoplay carousel:** buyers control browse order and pace.
- **Spotlight, shader, and ripple cards:** they added novelty and control-like signals without a corresponding commercial outcome.
- **Testimonials, metrics, and case carousel:** still require approved identity, claim, attribution, timeframe, permission, and review data. They were not replaced with invented proof.
- **Generic reveal animation on every section:** it would create attention competition instead of hierarchy.

## Primary interactions and outcomes

- **Book a Leadership System Consultation:** opens the staged consultation path and preserves the originating homepage section.
- **See how we help:** moves to the commercial-scope section.
- **Pause/Play logos:** stops or resumes the approved enterprise-experience rail.
- **Pause/Play statement:** stops or resumes the kinetic value statement.
- **Pain arrows / swipe / keyboard:** browse the five peer conditions.
- **See what this is costing:** reveals secondary detail about the same condition.
- **Explore this problem:** opens What We Solve with that condition selected.
- **What changes first:** expands optional detail inside one service scope.
- **Explore [service]:** opens the corresponding commercial detail page.
- **Installation stages:** update the supporting image and explanation for the selected ordered step.
- **Read The Strategy Execution Gap:** opens the existing book path as a quiet learning option.

## Misleading affordances removed or converted

- The hero no longer auto-rotates among unrelated still images.
- Both continuous rails provide explicit pause/play controls, stop on focus/hover, pause while the tab is hidden, and become static when reduced motion is requested.
- Service cards may preview their optional “What changes first” detail on fine-pointer hover or keyboard focus, but the container never impersonates a navigation link; only the labelled disclosure and destination link are controls.
- Service disclosure and navigation are separate, labelled controls with different predictable outcomes.
- Decorative media does not use pointer cursors, arrows, or hover states.
- Results is absent from both header and footer while proof remains gated.

## Proof governance

`app/data/approved-experience-logos.ts` is the bounded registry for the 17 marks explicitly approved in the user-supplied `120vc-approved-client-logos.zip`. Its display statement is deliberately limited to “120VC has worked with leaders and teams at.” A logo does not claim endorsement or a client outcome.

`app/data/proof-governance.ts` remains the separate gate for public client-result proof. Approval of the experience rail does not populate or open the case/result registry. A case record still requires context, baseline, intervention, first operating shift, result, timeframe, qualification, client voice, attribution, source, dates, and case permissions.

`publicProofPresentationReady` remains `false`. Approved data alone cannot expose Results or open indexing; the gate may change only after reviewed logo and case components actually consume the approved arrays.

While no client-result record is approved:

- no testimonial, case result, or proof metric appears;
- Results is absent from public navigation;
- proof routes remain out of the sitemap;
- proof routes return `noindex, follow` metadata;
- the nonproduction `?review=1` panel states the blocker outside the audience experience.

**Launch requirement:** replace the empty registry only with approved, supportable proof. Never switch the gate merely to expose the section.

## Conversion transport and measurement

The homepage records privacy-safe events for consultation clicks, secondary CTA clicks, carousel navigation, pain-card reveals, problem selections, solution selections, installation-step selections, and book clicks. Context includes page, section, selection, session entry route, and available UTM values. Free-text form answers are excluded.

The bridge emits `120vc:analytics` locally and pushes to `window.dataLayer` when an approved adapter is present.

**Launch requirements:**

1. Connect the consultation flow to an approved CRM or form endpoint and show success only after confirmed transport.
2. Configure the approved analytics and consent layer.
3. Confirm licenses, model releases, crop permission, and provenance for supplied images.
4. Add approved client-result records before calling the full proof journey conversion-complete.

## Verification contract

- Code: lint, TypeScript, production build, and rendered-HTML tests.
- Viewports: approximately 1440, 1024, 768, 390, and 320 pixels.
- Readability: one H1, no authored hard breaks, no H1/H2 over four lines; two to three desktop lines preferred.
- Layout: no horizontal page overflow; pain heading and description share one centered bounded composition and a compact mobile stack.
- Interaction: pointer, keyboard, touch-equivalent controls, focus visibility, predictable outcomes, and no essential hover state.
- Motion: manual carousels/steppers, finite hero media, pausable continuous logo/text rails, and complete reduced-motion output.
- Proof: only the explicitly approved 17-brand experience rail appears; no unapproved metrics, quotes, case claims, or public Results navigation.

Current screenshot evidence is stored under `docs/homepage-conversion-2026-08-27-logo-motion/screenshots/`.

## Verification results

| Check | Result |
| --- | --- |
| ESLint | Passed |
| TypeScript (`npx tsc --noEmit`) | Passed |
| Production build | Passed |
| Rendered-HTML tests | 18 passed, 0 failed |
| Viewports | 1440, 1024, 768, 390, and 320 px passed without horizontal overflow |
| Headline wrapping | H1: 3 / 2 / 2 / 4 / 4 lines respectively; every H2 remained at three lines or fewer |
| Heading composition | H1 uses an 800 / 780 / 700 / 346 / 276 px responsive measure; body copy uses 690 px on tablet+ and the same bounded mobile measure |
| Image loading | 44 of 44 rendered homepage image elements loaded after their relevant browse/scroll context; the logo rail contains 17 distinct eager-loaded files duplicated only for visual continuity |
| Touch targets | No tested homepage control fell below 44 × 44 px |
| Pointer / keyboard / touch | Logo/text Pause/Play, pain hover/focus/tap, Back focus restoration, service preview/disclosure, carousel controls, and stepper selection passed |
| Finite hero motion | Pause, play, completed “Replay motion” state, and replay passed |
| Continuous motion | Logo and text rails move in one direction at different speeds, pause on direct control/focus/fine-pointer hover/tab hiding, and do not autoplay the pain carousel or stepper |
| Reduced motion | Static hero, one responsive logo grid, one complete wrapped value statement, nonanimated carousel/stepper state, zero hydration or console errors |
| Progressive form | Step 2 appeared, focus moved to the condition field, and goal/timing remained optional |
| Accessibility | Automated WCAG 2.2 AA scan returned zero violations at desktop/mobile and in active flip, dark-card, and selected-step states |
| Console | Zero page errors or console errors in the final matrix |

Final evidence:

- `docs/homepage-conversion-2026-08-27-logo-motion/screenshots/after/desktop.png`
- `docs/homepage-conversion-2026-08-27-logo-motion/screenshots/after/laptop.png`
- `docs/homepage-conversion-2026-08-27-logo-motion/screenshots/after/tablet.png`
- `docs/homepage-conversion-2026-08-27-logo-motion/screenshots/after/mobile.png`
- `docs/homepage-conversion-2026-08-27-logo-motion/screenshots/after/small.png`
- `docs/homepage-conversion-2026-08-27-logo-motion/screenshots/after/mobile-reduced-motion.png`

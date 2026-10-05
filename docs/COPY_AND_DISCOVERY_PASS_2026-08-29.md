# 120VC Copy and Discovery Pass

## Purpose

This pass preserves the current visual system while making the homepage, What We Solve, and How We Help easier to understand. The governing rule is simple: headings explain the service, problem, or outcome in ordinary language; interaction instructions state what the visitor can do and what will happen.

## Homepage

- Removed the three abstract micro-taglines below the hero.
- Removed the small reassurance fragment beneath the hero actions so the hero now contains one category, one promise, one explanation, and two predictable actions.
- Renamed the logo control to **Pause movement / Resume movement** while retaining a more explicit accessible name.
- Replaced the abstract pain-section prompt with **Five execution problems we solve.** so the chapter immediately fulfills the What We Solve promise.
- Changed the pain-section route label to **Explore all five problems**.

## What We Solve

- The page now opens with **We solve the execution problems blocking your most important priorities.** The supporting sentence names the five problems in plain language.
- Removed the route-style label above the hero headline. The page answer is now the first text visitors encounter.

- Replaced abstract condition names with direct problem language:
  - Priorities keep changing
  - Leaders pull in different directions
  - Transformation loses momentum
  - Too many projects compete for capacity
  - Internal teams are stuck reacting
- Replaced “Find the familiar pattern” and “Five conditions leaders recognize” with direct problem-oriented copy.
- Added visible `1 / 5` progress, previous/next buttons, scroll/swipe instructions, partial-card visibility, and transparent edge fades.
- Removed click-to-flip. Mouse hover and keyboard focus provide an optional impact preview; moving away returns the front.
- Kept one explicit **View details** action per card. Its observable outcome is a selected state, URL update, and matching detail panel below.
- Connected the detail panel back to the selected card with **Your selected problem: [problem]**, then explained exactly what the diagnostic helps the visitor understand.
- Reframed the selected detail as three direct questions: **What you may be seeing**, **Why it matters**, and **What leaders must change**.
- Introduced the three contextual links with **Choose the next step that fits your situation** so the buyer understands why the choices are relevant before encountering them.
- On coarse pointers, hover-only cue text is hidden. Essential signals, cost, change, resources, tools, and service paths remain available through **View details**.

## How We Help

- Replaced the self-diagnosis headline with **We help leadership teams fix execution where it is breaking.**
- Replaced the article-like section headline with **Our work focuses on leadership, transformation, and portfolio execution.**
- Changed CTAs and closing copy from “condition” to the more familiar “problem.”

## Navigation promise and redundancy

- What We Solve, How We Help, How It Works, Resources, and Results now open with an H1 that directly answers the selected navigation label.
- Removed breadcrumb-like route labels from the five primary experience heroes.
- Removed decorative hero labels and the generic **What to understand** label from shared supporting-page heroes.
- Tightened page and homepage section headings so they state the problem, service, method, resource, or evidence rather than introducing another tagline.

## Component decisions

- Retained the existing flip-card composition because front and back communicate two sides of the same problem.
- Converted the flip to hover/focus preview only because a second click mode duplicated the selection action and obscured the outcome.
- Added familiar carousel/browse controls because the five cards are parallel items and not a sequence or connected-system diagram.
- Rejected a new diagram, tabs, auto-advance, and extra animated labels because each would add another reading or interaction system.

## Accessibility and motion

- Card selection remains a native button with `aria-pressed`, a labelled outcome, visible focus, and a controlled detail region.
- Arrow-key, Home, and End navigation remains available across the five selection buttons.
- Rail controls use native buttons with disabled boundary states.
- Touch users do not depend on hover.
- Reduced motion uses non-smooth rail movement and the existing reduced-motion flip behavior.

## Verification

- `npm run lint`
- `npx tsc --noEmit --incremental false`
- `npm test` — 22/22 tests passed, including the production build
- Rendered desktop QA at 1440px
- Rendered mobile QA at 390px
- Verified mouse hover enters and leaves the preview state
- Verified selection does not lock the flip after the pointer leaves
- Verified URL and detail-panel updates after selection
- Verified browse controls advance progress and rail position
- Verified mobile hides hover instructions and has zero page-level horizontal overflow

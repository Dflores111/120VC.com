# 120VC Hierarchy Rebuild Handoff

> Historical handoff: superseded by `docs/INTERACTIVE_EXPERIENCE_REBUILD_PLAN.md`, `docs/ROUTE_CONSOLIDATION_DECISIONS.md`, and the current page specifications. Retained only as implementation history.

**Status:** Implemented and validated locally  
**Governing source:** `120VC Hierarchy and Simplification Rebuild`

## Outcome

The site now uses one page question, one argument, and one next step. Visual emphasis follows the same sequence throughout the commercial journey:

1. Recognize the condition.
2. Understand the cost.
3. See what must change.
4. Evaluate approved proof when it exists.
5. Take one sensible next step.

Paper is used for explanation, clay for the problem, charcoal for the mechanism, sage for the outcome, and saturated orange only for action, active state, and focus. Static content does not receive control-like styling.

## Pages and conversion outcomes

| Surface | Primary job | Primary outcome |
| --- | --- | --- |
| Homepage | Explain the execution gap and orient the buyer | Choose the problem that best matches the current condition |
| What’s Breaking hub | Route visitors without making them compare five full cards | Open one relevant problem page |
| Strategy Execution Gap | Connect strategic drift to operating behavior | Explore the Leadership System |
| Leadership Team Alignment | Make post-meeting drift recognizable | Explore Leadership Team Transformation |
| Transformation Execution | Distinguish launch activity from normalized adoption | Explore Enterprise Transformation |
| Project Portfolio ROI | Move the conversation from status to investment decisions | Explore Project Portfolio Services |
| Internal Function Performance | Reframe activity as measurable business value | Explore Enterprise Transformation |
| Remaining content routes | Keep the primary answer visible and defer supporting detail | Continue through one declared next step |

The homepage contains five major chapters. The problem hub contains its router and next step. Each problem page contains four audience-facing chapters while proof remains unapproved. All configured content routes are capped at five major sections.

## Components selected

### Grouped headline entrance

- **Question answered:** What matters first?
- **Why it helps:** A short, finite entrance establishes the H1 without adding another object to interpret.
- **Outcome:** The primary claim resolves as one phrase, then remains still.
- **Adaptation:** The saved Text Effect concept was reduced to a CSS-only grouped entrance on the homepage; there is no looping or per-word spectacle. Reduced-motion users receive the completed state immediately.

### Problem hub shared preview

- **Question answered:** Which problem sounds like us?
- **Why it helps:** Five direct linked rows are easier to compare than five competing feature cards.
- **Outcome:** Focus or selection updates one shared contextual image; activating a row opens the relevant page.
- **Accessibility:** Every route remains a normal link. The image is supplementary, and no meaning depends on hover.

### Connected mechanism flow

- **Question answered:** What does 120VC actually change?
- **Why it helps:** One Diagnose → Install → Transfer sequence communicates causality more clearly than three independent cards.
- **Outcome:** Viewport progress supports reading order without creating a false control.
- **Accessibility:** The complete sequence is present in the document; reduced motion removes the transition.

### Transformation and portfolio decision selectors

- **Question answered:** Where is adoption or investment getting stuck?
- **Why it helps:** One shared stage prevents several panels from competing at once.
- **Outcome:** Click, tap, Enter, Space, or arrow keys change the visible stage. Mobile shows the complete static sequence.
- **Accessibility:** Semantic tab roles, roving focus, visible selected state, and noninteractive mobile fallbacks are provided.

### Supporting-detail disclosure

- **Question answered:** Where can I find detail without reading it all now?
- **Why it helps:** The principal answer stays visible while secondary sections and FAQ answers become opt-in.
- **Outcome:** A button expands or collapses its associated panel.
- **Accessibility:** Buttons expose `aria-expanded` and `aria-controls`; click, tap, Enter, and Space all work; focus is visible.

## Components considered and rejected

- Flip cards: rejected because they hide information, weaken scanning, and create unnecessary interaction cost.
- Spotlight and glow cards: rejected because they make static content look interactive and give equal visual weight to multiple ideas.
- Testimonial carousels: rejected because approved attributed quotations are not yet available and motion would not solve that proof gap.
- Shader and cursor effects: rejected because they compete with the buying argument.
- Repeated image masks: rejected because the current imagery works better as restrained editorial context than as a recurring visual gimmick.
- Generic book forms: removed because the resource must have a real delivery workflow and page-specific lead intent before it can be presented as a conversion path.

## Imagery

- Frustrated-leader imagery establishes the human consequence of strategic drift, leadership fragmentation, transformation fatigue, portfolio ambiguity, and reactive internal demand.
- The aligned-team outcome image is reserved for the change from launch activity to normal operating behavior.
- Every informative image has descriptive alternative text.
- Illustrative images are explicitly captioned as illustrative and are never presented as client proof.
- Decorative and informative images use a default cursor and do not receive hover affordances.

## Proof and publication requirements

No invented testimonial or result is shown in audience mode. The problem-page data records the evidence each page still needs, but the proof chapter is omitted until the evidence is approved.

Before publication, obtain at least one approved case with:

- the original condition;
- the operating change;
- the measured business outcome;
- timeframe and attribution limits;
- a named, approved quotation;
- permission for any client logo or identity.

Held routes remain nonindexable. Internal readiness information is available only through the nonproduction `?review=1` review panel, outside the audience composition.

## Interaction contract

- Orange, arrows, hover, lift, pointer cursor, and control styling indicate real outcomes only.
- Navigation menus support pointer, keyboard, touch, Escape, outside-click dismissal, focus return, and mobile focus containment.
- Problem selectors and disclosures preserve complete information on mobile.
- No essential information is available through hover alone.
- Motion is finite and resolves immediately under `prefers-reduced-motion`.

## Verification performed

- TypeScript: `npx tsc --noEmit --incremental false`
- Lint: `npm run lint`
- Production build and rendered contract suite: `npm test`
- 16 automated tests passing
- All 68 configured production routes rendered without governance leakage or more than five major sections
- Responsive browser review at approximately 320, 390, 768, 1024, and 1440 pixels
- No horizontal overflow on the reviewed core routes
- H1 and H2 headings remain within four rendered lines on the reviewed widths
- Mobile header controls meet a 44-pixel minimum target
- Menu Escape/focus-return, selectors, disclosures, and mobile fallbacks verified
- Reduced-motion and semantic surface rules covered by the automated suite
- No rendered console errors observed

## Primary implementation files

- `app/page.tsx`
- `app/components/problem-page.tsx`
- `app/problem-page-data.ts`
- `app/components/content-page.tsx`
- `app/components/progressive-disclosure.tsx`
- `app/components/journey-interactions.tsx`
- `app/components/site-header.tsx`
- `app/components/site-footer.tsx`
- `app/hierarchy.css`
- `tests/rendered-html.test.mjs`

# Selected Problem Context and Affordance Pass

Date: 2026-08-30

## Outcome

The selected-problem area on What We Solve now identifies what the visitor selected, explains what the diagnostic is for, connects symptoms to business relevance and leadership change, and introduces the three next-step choices before presenting them. The problem cards and result now read as one linked selector-and-diagnostic component rather than unrelated sections.

The intended reading path is now:

1. Your selected problem
2. Problem headline
3. Why this diagnostic is useful
4. What you may be seeing
5. Why it matters
6. What leaders must change
7. Choose the next step that fits your situation
8. Understand it / Work on it / Get help

## Component decision

No saved 21st.dev component was added. The information is one selected diagnostic followed by three parallel readiness choices. A semantic diagnostic brief and ordinary link cards communicate that relationship more clearly than a carousel, tabs, stepper, or flip state:

- a carousel would suggest parallel browseable cases;
- tabs would hide parts of one argument;
- a stepper would imply a required order;
- a flip state would hide essential commercial meaning.

The existing problem-card hover flip remains appropriate because its front and back are two sides of the same problem. The detailed diagnostic remains fully visible without interaction.

The saved tab, stepper, diagram, and additional flip-card patterns were rejected for the selected result. This relationship is a direct selection with one matching detail panel, so the existing card selector is the familiar model.

## Interaction feedback

- Selected-problem action cards switch immediately to a near-black surface with white text and orange emphasis on hover and focus.
- Browse arrows and `Show diagnostic` controls use high-contrast dark or orange states.
- Each control predicts that its diagnostic will appear below; after selection, the matching diagnostic is brought into view without moving keyboard focus.
- The selected card, vertical connector, and diagnostic top border share the orange selection accent.
- The selected card automatically moves into the visible rail—whether chosen on-page, restored from browser history, or opened from a condition URL—so the connector never points away from an off-screen selection.
- The connector tracks the selected card's horizontal position while the rail moves, creating a literal card-to-result path rather than a generic centered divider.
- The three diagnostic lenses use familiar eye, warning, and target icons for recognition, consequence, and leadership change. The icons are decorative beside visible headings and are hidden from assistive technology.
- Missing hover/focus feedback was added to the brand links, mobile menu controls and links, homepage section links, proof links, How It Works practice links, Results accordions, consultation contact links, and the form edit control.
- Static diagnostic columns retain no hover, pointer, lift, arrow, or control-like styling.

## Accessibility and responsive behavior

- The diagnostic article is labelled by its visible problem headline.
- DOM order follows the visual reading order.
- Mobile stacks the diagnostic lenses and the three next-step links top-to-bottom.
- At 390px and 320px there is no page-level horizontal overflow.
- The diagnostic headline renders in three lines at both narrow widths.
- Reduced-motion behavior remains intact; essential meaning never depends on motion or hover.
- Reduced motion replaces smooth scrolling with immediate positioning.

## Verification

- `npm run lint` — pass
- `npx tsc --noEmit --incremental false` — pass
- `npm test` — 22/22 pass, including production build
- Desktop rendered QA — 1440px
- Tablet layout QA — 768px
- Mobile rendered QA — 390px and 320px
- Desktop action-card hover computed as `rgb(23, 20, 21)` with white body text and orange label text
- Keyboard/focus selectors and native control semantics retained

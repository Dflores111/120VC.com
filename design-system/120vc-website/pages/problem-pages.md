# What We Solve Specification

## Shared job

Help the buyer recognize one of five common execution problems, understand the cost, see the leadership change required, and choose a contextual next step without navigating through five separate problem pages.

Primary question: **Where does the work keep breaking?**

## Three-section journey

1. **Orient / paper** — state the shared question in direct language and explain that the visitor can start with the problem they can see.
2. **Explore / white** — five image-led problem cards in one horizontal browse rail, followed by one active detail panel with warning signs, cost, required change, and contextual next steps.
3. **Reconnect / deep ink** — show the repaired Spine and direct the visitor to How It Works or Consultation.

## Five condition states

| Visitor-facing problem | Broken point | Human consequence |
| --- | --- | --- |
| Priorities keep changing | Intent fragments before priorities settle | Teams execute competing versions of the direction |
| Leaders pull in different directions | Decisions split into separate commitments | Sponsors become the dependency resolver |
| Transformation loses momentum | Commitments loop back into old work | Activity and fatigue rise without operating change |
| Too many projects compete for capacity | Priorities exceed execution capacity | Valuable people are spread across unequal work |
| Internal teams are stuck reacting | Activity circulates without reaching outcomes | Necessary functions stay overloaded and undervalued |

## Progressive disclosure

The card front keeps the recognizable problem visible. Fine-pointer hover and keyboard focus may preview the same card's cost and required change, but clicking the card does not lock or expand that preview. Essential information remains available through the explicit **View details** control and the active detail panel below.

The rail exposes:

- visible `1 / 5` progress;
- previous and next buttons;
- native horizontal scroll and scroll snap;
- a partial next card and a transparent edge fade;
- the instruction “Scroll, swipe, or use the arrows to see all five problems.”

On coarse pointers, hover-only cue text is removed. Selecting **View details** updates the URL, identifies the active card, and updates the detail panel. The detail panel presents three contextual paths:

1. **Understand it** — one problem-relevant insight, video, or book path.
2. **Work on it** — one relevant practical tool.
3. **Get help** — one relevant 120VC scope.

Condition controls work through click, tap, Enter, Space, arrow keys, Home, and End. The active problem updates the URL and restores through refresh and browser history.

The hover flip is an optional preview of two sides of the same problem. It is never the only route to cost, change, next steps, or conversion.

## Selected-problem diagnostic

The active detail panel must identify itself before presenting detail. Its reading order is:

1. **Your selected problem: [problem]**
2. the problem-specific headline;
3. one sentence explaining that the panel is a diagnostic;
4. **What you may be seeing**;
5. **Why it matters**;
6. **What leaders must change**;
7. **Choose the next step that fits your situation**;
8. three parallel links: **Understand it**, **Work on it**, and **Get help**.

The three diagnostic lenses remain visible together because they form one short argument. The three links remain visible together because they are parallel readiness choices. Do not convert either group into tabs, a carousel, a stepper, or a flip state. Those patterns would either hide essential meaning or imply a relationship the content does not have.

All true controls need unmistakable hover and focus feedback. Primary detail links use a near-black surface with white text and an orange accent on hover/focus. Static diagnostic columns do not move, lift, or receive a pointer cursor.

## Route behavior

The audience destination is `/problems-we-solve`. The five former detail URLs remain compatibility aliases so inbound links keep working. Each alias:

- returns the shared experience with the relevant condition selected;
- canonicalizes to `/problems-we-solve`;
- uses `noindex, follow`;
- becomes the canonical parent URL after the visitor changes state.

## Imagery, proof, and motion

- Each card uses one relevant human image to make the problem recognizable; the shared hero adds one additional orienting image.
- Images never imply that stock subjects are clients or named staff.
- No testimonial or result appears until it is approved and attributable.
- Selection feedback lasts 220–320ms; no loops, auto-rotation, scroll hijacking, or essential hover-only content.
- Reduced motion renders the selected state immediately.

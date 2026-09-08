# 120VC Website Design System

**Status:** commercial homepage and consolidated interactive-experience source of truth

**Updated:** 2026-08-30

**Implementation:** `app/hierarchy.css`, loaded after the legacy styles

Page-specific files in `pages/` may specialize the composition, but may not weaken the attention, interaction, proof, or accessibility rules below.

## Experience principle

The site is one guided executive conversation:

1. Here is what is happening.
2. Here is why it keeps happening.
3. Here is what must change.
4. Here is credible evidence, when approved.
5. Here is the next useful step.

The operating standard is: **one page, one question, one argument, one next step.** The homepage earns commercial attention; the deeper What We Solve and How It Works pages support diagnosis and learning. The primary buyer experience is seven connected destinations: Home, What We Solve, How We Help, How It Works, Results, Resources, and Consultation. Results stays out of audience navigation until approved evidence exists, and proof approval remains a publication gate.

## Attention contract

Every page has:

- one primary buyer question;
- one primary argument;
- one dominant visual idea;
- one primary next step and one quiet secondary path;
- no more than five major sections by default; the homepage may use a sixth approved proof section when evidence is ready, while a clearly labelled fictional proof prototype may exist only in nonproduction review;
- no more than one meaningful motion language per section. If two adjacent transition bands use continuous motion, they must move in the same direction, differ clearly in pace and purpose, provide pause controls, stop on focus/hover/tab hiding, become static under reduced motion, and use enough visual separation that they do not compete.

Every section has:

- one clear job and one conclusion-oriented headline;
- one short explanation;
- no more than three supporting points, except when four choices are intrinsic;
- one visual treatment;
- no more than one primary action.

The default homepage content hierarchy is headline, one description, then the component or visual. A visible eyebrow is justified only when it adds audience or category context that the headline and component do not already provide. Sentence case is the default for category text; uppercase orange microcopy is reserved for genuine orientation, action, or state.

Use cards only when the visitor is choosing a problem, solution, or tool. Do not turn facts, paragraphs, or process steps into cards.

## Component semantics and familiarity

Before implementing an interactive component, record the buyer question, the information relationship, the familiar pattern, the meaning visible before interaction, and the outcome the visitor should predict.

| Information relationship | Use | Do not use it for |
| --- | --- | --- |
| Parallel browseable items | Manual carousel with visible controls and position | Ordered steps, required comparison, or autoplay reading content |
| Parallel choices or destinations | Cards with distinct labels and outcomes | Facts, paragraphs, or process stages |
| Two sides of the same subject | Explicit reveal or flip with subject identity preserved | Essential claims, proof, limitations, or the only CTA |
| Ordered sequence or dependency | Stepper or path | Peer options that may be chosen in any order |
| Connected or causal system | Diagram paired with a textual explanation | Decoration or meaning carried only by motion, position, or color |
| Alternate views of one subject | Accessible tabs with stable subject and labelled panels | Unrelated content or a replacement for primary navigation |
| Independent optional detail | Accordion or expand-in-place disclosure | The page's core argument or information needed to evaluate the offer |
| Categorized optional detail | Accessible tabs plus accordions | A small flat question set or information needed before the visitor can evaluate the offer |
| Staged commitment | Progressive form with clear progress and final outcome | Extra steps that exist only to appear sophisticated |
| Approved organization relationships | Static grid or pausable logo rail with an accurate label | Unapproved marks, implied endorsement, ambiguous client status, or uncontrolled autoplay |
| Confirmed completion | Restrained success feedback | A click, pending request, navigation, consultation intent, or unverified submission |
| One linear idea | Semantic text, media, or a still explanatory visual | An interactive shell without a comprehension benefit |

The visitor should understand the component's familiar behavior and predict its outcome before acting. Essential commercial meaning must remain understandable when interaction, animation, JavaScript, or hover is unavailable.

Modernity comes from Barlow Condensed and Inter, human imagery, spacing, motion, transitions, component craft, and composition—not from teaching visitors a novel interaction model before they can understand 120VC.

Create richness across the complete journey, not density inside each viewport. Use varied components when they improve comprehension, but every component must make the relationship clearer than plain text would. A familiar static layout is preferred when it communicates the idea best.

Saved-component boundaries:

- **Logos3:** it may inform the approved enterprise-experience rail, but it does not authorize new logos or the claim “Trusted by.” Use the approved relationship statement, make movement pausable, render a static reduced-motion grid, and keep duplicated loop content out of the accessibility tree. Do not replace an already compliant site-native rail merely to adopt the demo.
- **Confetti Button:** use only after a meaningful action has been confirmed successful, such as a completed assessment or delivered resource. Never fire it when a consultation, form, download, or tool action is merely clicked or still pending. Prefer a quiet confirmation when celebration does not fit the executive context.
- **Social Card:** use only where following real founder, author, speaker, or community profiles is part of the visitor's task. Every icon needs a real approved destination and accessible name; a standard bio or contact block is preferred otherwise.
- **FAQ 4:** use only when verified questions form meaningful categories. Complete both tab and accordion semantics; use a simple accordion for one question set and visible copy for information essential to the decision.

## Semantic color system

| Meaning | Token | Value | Use |
| --- | --- | --- | --- |
| Ink | `--ink` | `#221e1f` | Primary text |
| Deep ink | `--ink-deep` | `#171415` | Mechanism and system sections |
| Paper | `--paper` | `#f7f4f0` | General content and orientation |
| White | `--white` | `#ffffff` | Clean content and contrast |
| Clay | `--clay` | `#e9d8cf` | Current condition and consequence |
| Sage | `--sage` | `#dde5d9` | Outcome, reassurance, next step |
| Mist | `--mist` | `#e7e2de` | Dividers and quiet structure |
| Graphite | `--graphite` | `#625d5f` | Supporting copy |
| Action orange | `--action-orange` | `#d03b00` | Real action, active state, focus |
| Orange hover | `--action-orange-hover` | `#b83300` | Primary-action feedback |
| Pale orange | `--pale-orange` | `#fff0e8` | Selected or focused choice |

Orange is not a decoration or full-section background. It means action, selection, current state, focus, or the line that connects a mechanism.

Color is never the only signal. Labels, position, typography, and semantic state must communicate the same meaning.

## Typography

- Display: Barlow Condensed, 800 weight, sentence case.
- Body and controls: Inter.
- Desktop H1: normally up to `64px`; the homepage may use up to `70px` inside a bounded `720–820px` measure, with `.98` line height.
- Desktop H2: up to `48px`, about `16ch`, `1` line height.
- Mobile H1: up to `44px`; mobile H2: up to `36px`.
- Body measure: no more than `62–68ch`.
- No headline may exceed four rendered lines at 320px, 390px, tablet, or desktop. Prefer rewriting before shrinking.
- Do not use all caps for H1 or H2. Reserve uppercase for short orientation labels.

## Global navigation

Desktop order:

1. What We Solve
2. How We Help
3. How It Works
4. Results, only after the proof gate is met
5. Resources
6. Book a Consultation

For Leaders, About, J. Scott, Careers, Contact, and FAQ belong in the footer or relevant contextual paths, not the primary header.

The active destination uses a visible underline and `aria-current`. The primary header uses direct links rather than taxonomy dropdowns. Mobile uses one Menu control, an accessible dialog, focus containment, Escape dismissal, and the same direct labels.

## Interaction contract

Every signal must map to an outcome:

| Signal | Allowed only when |
| --- | --- |
| Pointer cursor | The element activates or navigates |
| Arrow | The element moves the visitor or changes state |
| Underline animation | The text is a link or menu trigger |
| Background/edge change | The choice is linked, selected, focused, or pressed |
| Tab styling | A keyboard-operable control updates a labelled panel |

Static images, facts, process steps, and explanatory containers remain visually inert. Hover is never required for information or action. All controls use semantic markup, visible focus, 44px minimum targets, keyboard and touch support, an accessible name, and an observable outcome.

## Motion

Motion may create atmosphere, orient, explain a relationship, or confirm interaction. One section owns one dominant motion language.

- Homepage hero: one muted cinematic human-media treatment with a pause control; the value proposition stays stable.
- Approved enterprise experience: one slow, pausable logo rail; render a static responsive grid under reduced motion.
- Pain points: manual carousel movement and deliberate card reveal; never autoplay.
- Brand thesis: one faster, pausable text rail after pain recognition, moving in the same direction as the logo rail; render the complete wrapped statement immediately under reduced motion.
- Solution cards: static article surfaces with feedback only on real disclosure buttons and destination links.
- Client results: one dominant, manual case-study carousel after the solution scope and before installation. Each homepage case must show a transformation title, quiet enterprise context, one readable Before → 120VC Changed → After comparison, the one primary result inside the After state, one sentence describing the intervention, and one attributed quotation in that reading order. Supporting metrics and abstract diagrams belong on the full case-study page, not the homepage. The comparison arrow, After reveal, and result count play once and hold their final state.
- Installation path: a manual stepper with all stage labels visible and one active supporting panel.
- Deeper shared-preview changes: a short 220–320ms crossfade or slide.
- Execution Spine: a draw-once or state-change explanation when useful.
- Menu and control feedback: 160–240ms.
- No pulsing, scroll-jacking, or generic reveal on every section.
- Animate opacity and transform where possible.
- Under `prefers-reduced-motion: reduce`, render the final static state immediately.

## Proof and review mode

Unapproved logos, metrics, case results, testimonials, or attribution do not appear in the production audience page. Explicitly approved experience logos may appear with a narrowly truthful statement, but they do not open the case/result gate. Omit an unavailable result-proof chapter from production entirely; do not replace it with a warning.

Fictional proof data may render only on localhost/development or in nonproduction review mode so the case-study composition can be evaluated before real evidence is approved. Every such record must use `proofStatus: "demo"`, `approvedForHomepage: false`, generic enterprise context, no real logo or identity, and no fictional story destination. Demo status belongs in the review layer: `?review=1` may add one small `DEMO PROOF` badge outside the case, but internal warning copy must not distort the buyer-facing evidence layout. The production selector must allow only `proofStatus: "approved"` and `approvedForHomepage: true`. If no case passes that predicate, the internal launch gate is `PROOF CONTENT REQUIRED BEFORE PRODUCTION CONVERSION LAUNCH` and the production section is absent.

Nonproduction review mode is available through `?review=1`. It may display proof, image-rights, CRM, form, indexing, and publication status in the fixed review panel outside `<main>`. Internal approval notes never appear inside the audience composition. Held proof routes remain `noindex, follow` and stay out of the sitemap. The five retired problem-detail URLs are compatibility aliases: they render the shared What We Solve experience with the relevant state restored, canonicalize to `/problems-we-solve`, and use `noindex, follow`.

## Imagery

Use one primary image when it helps the buyer recognize the human condition or outcome. Documentary working scenes are preferred. Masks and crops must support composition, not demonstrate an effect. Informative images require meaningful alt text; duplicated or decorative versions use empty alt text. Stock subjects are never presented as named 120VC staff.

## Shared surfaces

- Paper or white: orientation and explanation.
- Clay: present condition and cost.
- Deep ink: mechanism, system, or operating change.
- Sage: desired outcome and next step.

Sections should differ because their jobs differ, not because the page cycles through colors.

## Responsive behavior

- At 820px and below, split layouts become one column.
- Shared previews remain visible when they carry the page's human image or Execution Spine; duplicated desktop/mobile content is not introduced.
- Multi-column mechanism lines become vertical sequences.
- Choice tabs that do not improve mobile comprehension become static labelled content.
- No horizontal scrolling, drag-only controls, hover dependencies, or hidden essential copy.

## Verification

Before handoff, verify:

- one H1 per page;
- one dominant primary action per section;
- major-section order and semantic surfaces;
- real destinations for every link and control;
- a recorded information relationship and familiar UI pattern for every interactive component;
- predictable outcomes and essential commercial meaning available without interaction;
- no internal governance copy in audience HTML;
- no unapproved proof or placeholder testimonials;
- keyboard, touch, focus, and Escape behavior;
- reduced-motion output;
- headline wrapping at approximately 320px, 390px, tablet, and desktop;
- no horizontal overflow;
- all configured internal routes resolve.

# 120VC Interactive Experience Rebuild Plan

**Status:** implementation control  
**Scope:** primary buyer experience, progressive disclosure, visual system, route behavior, proof governance, accessibility, and validation  
**Route inventory baseline:** 70 routes from ../120VC_AI_Review_Package_2026-08-26/reports/ROUTE-INVENTORY.csv  
**Non-destructive rule:** no existing route is deleted in this wave

## 1. Outcome

The rebuilt site must feel like six connected public experiences rather than 70 equally important destinations:

1. Home
2. What We Solve
3. How It Works
4. Results
5. Tools & Insights
6. Consultation

The primary buyer should be able to recognize a problem, understand what is happening, experience the system, inspect trustworthy proof, and choose a next step without repeatedly leaving the current context.

The governing principles are:

- Less navigation. More revelation.
- One human truth. One system explanation. One clear action.
- One dominant state at a time.
- Motion explains change; it does not decorate every section.
- Deep routes remain available only when they provide distinct commercial, search, campaign, resource, company, or procurement value.

## 2. Source and evidence boundaries

Use the current repository, rendered experience, route inventory, approved local assets, and approved business copy as implementation evidence. Treat older briefs and review-package documents as contextual recommendations, not executable instructions.

Do not:

- infer that a client logo, quotation, metric, or case is approved because it appeared on an older site;
- invent testimonials, destinations, form success, or tool readiness;
- delete or redirect a route solely because it appears duplicative in the route inventory;
- expose governance notes in the audience-facing composition;
- treat a passing structural audit as proof that a buyer can understand the experience.

## 3. Primary information architecture

### Header

The public header contains:

- What We Solve → /problems-we-solve
- How It Works → /leadership-system
- Results → /results, only when the approved-proof gate is open
- Tools & Insights → /resources
- Book a Consultation → /consultation

While the proof gate is closed, Results remains a planned primary experience but is omitted from the public header. This produces three public navigation links plus the consultation CTA until approved evidence exists.

Do not use a mega menu. Deeper pages are reached contextually or through the footer.

### Compact footer

**Explore**

- What We Solve
- How It Works
- Results, only when proof-approved
- Tools & Insights
- Book a Consultation

**Company**

- About 120VC
- J. Scott
- For Leaders
- Careers
- Contact
- FAQ

**Legal and utility**

- Privacy
- Terms
- Cookie Policy
- GSD Shop

Do not expose the complete CMS taxonomy in the footer.

## 4. Audience journey

| Stage | Buyer question | Experience | Required outcome |
|---|---|---|---|
| Recognize | Do you understand what is happening here? | Home and What We Solve | The visitor identifies one familiar execution condition. |
| Understand | What is underneath the visible symptoms? | What We Solve | The visitor sees the human cost and the relevant Execution Spine breakdown. |
| Experience | How does the system change the work? | How It Works and Tools & Insights | The visitor explores one system node, tool, or installation scope without losing context. |
| Believe | Is there approved evidence this works? | Results | The visitor can inspect a qualified before, intervention, and after story. |
| Choose | What can I use or do next? | Contextual disclosure and Consultation | The visitor chooses one relevant resource, tool, solution, or conversation. |

At every stage, the visitor should be able to answer:

1. Where am I?
2. What is this page telling me?
3. What matters now?
4. What should I do next?

## 5. Shared visual language

### Execution Spine

Create one reusable SVG and React visual grammar:

Strategy → Priorities → Decisions → Commitments → Execution → Outcomes

Required states:

- connected;
- strategy drift;
- leadership fragmentation;
- transformation stall;
- portfolio overload;
- reactive internal function;
- active system node;
- installation or repair;
- before, operating shift, and after;
- reduced-motion final state.

The same grammar changes by page:

- Home: the line reaches execution and breaks before outcomes.
- What We Solve: the selected condition changes the break pattern.
- How It Works: the selected node explains one part of the system.
- Results: the visual compares before, operating shift, and after.
- Tools & Insights: the relevant node activates for the selected tool.

The visual must be understandable through accompanying text. No essential meaning may exist only in animation or color.

### Custom icon family

Create a small inline-SVG family derived from the Execution Spine, not a generic icon pack.

Required concepts:

- Strategy, Priorities, Decisions, Commitments, Dependencies, Execution, Outcomes
- Strategy drift, Leadership fragmentation, Transformation stall, Portfolio overload, Reactive internal function
- Challenge · Opportunity, 1-3-1, 2×2, Daily Focusing, Weekly Team DOING, Three Pillars

Style:

- monoline and geometric;
- approximately two-pixel stroke;
- ink or white base;
- one orange active point;
- legible at 24px and 80px;
- no icon beside every paragraph.

Icons orient, explain, or show state. Static icons do not receive pointer, hover, pressed, or focus styling.

## 6. Component semantics gate

No interactive component enters a page blueprint or implementation until its selection note records:

1. the buyer question and section job;
2. the information relationship being communicated;
3. the familiar UI pattern that matches that relationship;
4. why the component improves comprehension over plain text or a static layout;
5. the essential commercial meaning visible before interaction;
6. the action and outcome a visitor should predict;
7. keyboard, touch, responsive, and reduced-motion behavior.

Apply the global mapping in `design-system/120vc-website/MASTER.md`:

- carousels browse parallel items;
- cards present parallel choices or destinations;
- flip or reveal states expose a second side of the same subject;
- steppers and paths communicate order or dependency;
- diagrams explain connected or causal systems;
- tabs switch among alternate views of one stable subject;
- accordions reveal independent optional detail;
- progressive forms stage a real commitment;
- semantic text, media, or a still visual remains the default for one linear idea.

Reject the component when its familiar meaning conflicts with the content relationship, its outcome is not predictable, it hides essential commercial meaning, or it adds interaction without reducing cognitive work.

Modernity is applied after this gate through typography, human imagery, spacing, motion, transitions, polish, and composition. The complete journey should feel rich and varied, but no page or viewport receives a component quota.

## 7. Saved component selection

Use website-component-prompts as a capability library, not as a checklist or untouchable product specification.

### Image Mask — selected

**Visitor question:** What does this organizational condition feel like for real people?

**Placement:** homepage hero, active What We Solve human canvas, How It Works human moment, and consultation hero where the crop strengthens the composition.

**Why stronger than a plain rectangle:** a disciplined mask integrates documentary photography with the Execution Spine and restores visual personality without adding another content block.

**Interaction and outcome:** none. The image is presentation, not a control.

**Required adaptation:**

- use approved local 120VC images rather than demo imagery;
- remove the source demo’s inert hover scale;
- keep decorative overlays out of hit testing;
- use meaningful alt text for informative images and empty alt text only for decoration;
- provide a stable rectangular or simplified mask when a complex crop harms mobile comprehension;
- never use stock imagery as client evidence.

### Text Effect — selected

**Visitor question:** What is the one idea I should notice first?

**Placement:** one short, high-priority headline on Home and, only if the motion budget permits, one major transition headline elsewhere.

**Why stronger than a static entrance:** a restrained word-level reveal can establish sequence and energy while preserving a single focal point.

**Interaction and outcome:** none. It is a one-time entrance treatment, not a control.

**Required adaptation:**

- use word-level motion by default;
- repair the source prompt’s broken line-splitting branch rather than copying it blindly;
- do not loop, auto-cycle, or animate paragraphs;
- preserve one coherent accessible text alternative;
- render the final text immediately under reduced motion;
- do not combine it with Text Roll in the same view.

### Conditional additions from the saved library

The saved library also contains four conditional capabilities. Their presence in the library is not approval to add them or replace a compliant site-native component:

- **Logos3 — approved pattern, conditional implementation basis:** it may inform the existing approved enterprise-experience rail only if it preserves the exact approved logo set and relationship statement, includes visible pause/play behavior, hides loop duplicates from assistive technology, and becomes a static grid under reduced motion. Keep the current site-native rail when it already meets those requirements.
- **FAQ 4 — conditional for the FAQ experience:** use it only when verified questions have genuine categories and visitors benefit from choosing a topic before opening optional answers. Complete tab and accordion keyboard relationships. Use a simpler accordion or visible answers when categorization adds work.
- **Social Card — conditional profile utility:** reserve it for a founder, author, speaker, or community context with real approved social destinations. Do not use it as company proof, generic team decoration, or a shell for placeholder links.
- **Confetti Button — conditional success feedback:** trigger it only after the underlying action is confirmed successful. Never celebrate a consultation click, a pending form submission, routine navigation, or a failed request; use restrained static confirmation under reduced motion and whenever the enterprise tone calls for quiet completion.

### Deliberately not selected for primary disclosure

- FlipCard and Flipping Card: essential problem meaning would disappear and the interaction would add memory and mobile costs. Use accessible expand-in-place panels or tabs instead. A flip may later support a concise optional before/after artifact, never the only claim, proof, or CTA.
- Animated Hero: the Execution Spine, Image Mask, and Text Effect already use the hero motion budget.
- Spotlight Card and Feature Shader Cards: they would add competing pointer or card signals without improving the core decision journey.
- Auto-moving testimonial layouts: proof must remain readable, static, approved, and easy to scrutinize.

## 8. Page implementation blueprints

### Home

**Job:** establish relevance, preview the condition and system, provide approved legitimacy, and direct one next step.

No more than five chapters:

1. Hero and legitimacy
2. Interactive problem preview
3. System preview
4. Featured proof, only when approved
5. Final consultation CTA

When proof is unavailable, omit the proof chapter without replacing it with stock imagery or unsupported authority.

The problem preview shows five choices but only one active state. Selecting a condition updates the image, icon, Execution Spine state, one problem sentence, and one change sentence. It links to the same selected state on What We Solve.

### What We Solve

**Job:** let the buyer explore all five execution conditions as one cohesive experience.

Conditions:

1. Strategy drift
2. Leadership fragmentation
3. Transformation stall
4. Portfolio overload
5. Reactive internal function

Desktop uses one shared visual canvas and one controlled selector. A sticky canvas is permitted only when normal document scrolling remains intact.

Mobile uses five collapsed condition controls with only one expanded state at a time. Do not render five complete narrative chapters simultaneously.

Each active condition shows:

- human image;
- custom icon;
- short headline;
- three recognizable signals;
- what it is costing;
- what changes first;
- one active progressive-disclosure mode.

Modes:

- Understand it: one relevant resource and one action.
- Work on it: one relevant functional tool or truthful preview and one action.
- Get help: one relevant commercial scope and one consultation or detail action.

Only one mode is visible. Tabs use semantic roles, arrow-key behavior, visible focus, touch support, and stable panel relationships.

Legacy problem URLs continue to return 200 and render the same shared experience with their matching condition selected. They use canonical /problems-we-solve and robots noindex,follow. UTM and source parameters remain intact.

### How It Works

**Job:** explain the system, let the visitor experience its tools, and reveal where it can be installed.

Sections:

1. Human opening and interactive Execution Spine
2. One-at-a-time toolbench
3. One-at-a-time installation-scope selector
4. See it → Change it → Run it → Own it
5. Consultation CTA

System-node, tool, and scope selections must be recoverable from the URL and browser history. A tool action renders publicly only when the tool is functional.

### Results

**Job:** provide approved, qualified evidence.

The proof gate requires:

- approval status;
- source;
- baseline;
- population;
- time period;
- attribution qualification;
- permission status;
- review date.

While the gate is closed:

- omit Results from the public header and footer;
- omit the homepage proof chapter;
- keep /results and its detail routes 200 with noindex,follow;
- show no unapproved logos, metrics, testimonials, cases, or stock substitutes;
- expose governance status only in review mode.

When the gate opens, Results includes one dominant featured case, no more than three secondary cases, static approved testimonials, and optional methodology disclosure.

### Tools & Insights

**Job:** let visitors use the system or understand its thinking without first choosing a CMS format.

Primary modes:

- Use it
- Understand it

Use it presents one active tool preview plus a short selector. Understand it organizes resources by buyer problem, not by article, book, podcast, or download format.

Individual tools, assessments, topics, and resources remain direct routes when they offer functional, search, or sharing value.

### Consultation

**Job:** move from research to a truthful, low-pressure fit conversation.

Use one calm human image and a two-step form:

1. First name, work email, company, role
2. Where work is breaking, what the visitor is trying to accomplish, and optional timing

No phone requirement. No legacy service taxonomy. No success claim unless a real transport confirms submission. Preserve attribution without sending free-text responses to general analytics.

## 9. Interaction contract

| Intent | Signal | Trigger | Feedback | Outcome |
|---|---|---|---|---|
| Select a problem | Semantic selected control with icon and label | Click, tap, Enter, Space, arrows where the widget pattern permits | Selected state, updated canvas, announced label | Matching problem becomes active and URL state updates |
| Choose disclosure depth | Accessible tab | Click, tap, arrow keys | aria-selected and visible panel | One Understand, Work, or Help panel appears |
| Select a system node | Semantic node control | Click, tap, keyboard | Active node and explanatory state | One node explanation and practice appears |
| Choose a tool or scope | Semantic selector | Click, tap, keyboard | Selected preview | One tool or installation scope becomes prominent |
| Follow a next step | Link or button with real destination | Click, tap, Enter | Standard pressed or navigation feedback | Resource, tool, commercial detail, or consultation opens |
| View static photography or iconography | No control-like signal | None | None | The visual supports recognition or comprehension only |

Every pointer cursor must activate something. Hover may preview a state, but essential content and selection require click, tap, or keyboard parity.

## 10. URL, SEO, and route behavior

State examples:

- /problems-we-solve?condition=strategy-drift
- /problems-we-solve?condition=portfolio-overload&mode=work
- /leadership-system?node=decisions
- /leadership-system?scope=enterprise-transformation
- /resources?mode=use&tool=1-3-1

Requirements:

- direct links restore the selected state;
- state changes use history without full reloads;
- back and forward restore prior state;
- UTM and source parameters survive state changes and aliases;
- canonical tags do not create duplicate indexed experiences;
- the experience remains understandable without JavaScript;
- no route is deleted during this rebuild.

The complete route-by-route policy is recorded in docs/ROUTE_CONSOLIDATION_DECISIONS.md.

## 11. Implementation sequence

### Phase 0 — protect and baseline

- Read repository instructions and preserve unrelated or user-owned changes.
- Record current git status, route inventory, tests, and screenshots.
- Verify image dimensions, licensing status, and approved proof state.

### Phase 1 — shared foundation

- Centralize primary navigation, proof gate, problem-state data, system-node data, tool previews, and route aliases.
- Build or refactor ExecutionSpine, ExecutionIcon, ImageMask, TextEffect, and URL-state helpers.
- Establish semantic color and motion tokens.

### Phase 2 — primary journey

- Rebuild Home around five chapters.
- Replace the problem hub and five separate problem narratives with one What We Solve experience.
- Rebuild How It Works around one system explorer, toolbench, and scope selector.
- Build the unified Tools & Insights modes.
- Refactor Consultation around truthful transport states.

### Phase 3 — proof and contextual routes

- Implement the proof approval gate.
- Keep deeper commercial, role, company, tool, assessment, insight, and legal routes available according to the route register.
- Apply canonical, noindex, and shared-state behavior without deleting URLs.

### Phase 4 — validation and handoff

- Run lint, type checking, tests, and production build.
- Test pointer, keyboard, touch, no-JavaScript fallback, reduced motion, and browser history.
- Inspect 320px, 390px, 768px, 1024px, and 1440px.
- Capture required state-specific screenshots.
- Regenerate route and responsive reports.

## 12. Validation gates

### Comprehension and hierarchy

- Six primary experiences are legible as one journey.
- Home contains no more than five major chapters.
- One problem, node, tool, scope, or proof state dominates at a time.
- No headline exceeds four rendered lines at supported widths.
- One primary action appears per major section or active disclosure panel.
- Every interactive component has a selection note that names its information relationship and familiar pattern.
- Each component makes the relationship clearer than the plain-text or static alternative would.
- Visitors can predict the outcome of each interaction before activating it.

### Accessibility

- WCAG 2.2 AA target.
- One H1 and logical heading order per page.
- Skip link and landmarks.
- Visible focus and 44×44 critical targets.
- Accurate accessible names, labels, tab relationships, and live-state announcements.
- No hover-only outcomes, scroll trapping, horizontal overflow, or meaning conveyed only by color.
- Reduced-motion users receive complete final states.
- Essential commercial meaning remains understandable without hover, motion, or JavaScript-driven disclosure.

### Integrity

- No static surface looks clickable.
- No unapproved proof appears in audience mode.
- No false form success appears.
- No nonfunctional tool receives an audience-facing action.
- Stock photography is labeled or contextualized as illustrative and never presented as client evidence.

### Responsive and browser behavior

- Header does not overlap content.
- Images preserve meaningful crops.
- Shared visual canvases degrade to understandable mobile compositions.
- URL state, browser back/forward, and UTM preservation work.
- Console is free of unexpected warnings and errors.

## 13. External launch gates

The following require evidence or authority outside the interface build:

- client-logo and quotation permission;
- metric methodology and publication approval;
- production form transport and credentials;
- image licensing confirmation;
- analytics and consent configuration;
- backlink, traffic, campaign, and search-intent evidence before permanent redirects;
- moderated comprehension testing with representative enterprise buyers.

Automated and heuristic checks can establish conformance. They cannot prove that real buyers understand the site without user research.

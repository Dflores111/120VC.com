# Simplified case studies and system reading path

## Decision

The previous case reader nested a three-stage scroll presentation inside a case carousel. The system spread each idea across navigation, an icon/label, a headline, a second column, an outcome band, and a practice footer. Both asked readers to learn the component before understanding the message.

This refinement replaces those two patterns only. The new sitemap, positioning, typography, palette, routes, working tool links, analytics, and publication approval gates remain intact. The separate problem diagnostic and installation stepper are unchanged.

## New patterns

- **Cases:** one complete, compact Before → What 120VC changed → After narrative. One primary result and one useful action. One set of explicit Previous/Next controls, placed above the changing story so browsing never strands the reader below a new headline. No inner steps, duplicated numbering, stage icons, hidden outcome, or scroll runway.
- **System:** six visible summaries in a single reading column. Native expandable rows reveal an explanation, the practical shift, and a real practice link. One row open at a time with JavaScript. No spatially separated input list, outcome banner, or duplicate stage status. The existing detailed content records are retained in the data source.
- **Motion:** a finite 240ms, 6px entrance when a case changes or a detail opens; the existing short result count-up retains a static assistive-text equivalent. No autoplay or scroll interception. Reduced motion shows the final state immediately.
- **Fallback:** system disclosures use native details/summary, so opening and closing does not inherently depend on JavaScript. The case's complete initial narrative is server-rendered; browsing further cases requires JavaScript. No-JavaScript behavior was structurally inspected, not tested with browser scripting disabled.

## Selection and provenance

Applied the installed `120vc-website-experience` and `website-component-prompts` guidance: select the smallest familiar pattern for the information relationship, preserve one reading path, and reserve interaction for useful depth or browsing. Adaptation mode: **inspiration / site-native implementation**. No saved third-party demo was copied; no dependency was added.

Preserved: brand typography/colors, section context, system meaning and all six practice destinations, case analytics, manual browsing, URL-backed system selection, production proof governance.

Removed from these readers: nested control systems, forced scroll distance, repeated state labels/icons, side-to-side reading partitions, oversized fixed panels, and displayed demo testimonials. Existing legacy CSS remains isolated from the new reader classes; shared diagnostic styles were not changed.

## Verification

- Production build, ESLint, TypeScript, and 35 regression checks pass. The suite covers configured routes, internal destinations, SEO/proof gates, system deep-link server rendering, and the new reading-path contracts.
- Rendered the new patterns at 320, 390, 768, 1024, and 1440px. No horizontal document overflow observed. Case controls have 44px-high hit targets. The first case is roughly 660–690px tall at laptop/desktop widths instead of a multi-stage scroll canvas.
- Exercised case Previous/Next, arrow keys, Home, and end-boundary behavior. Only the current case is rendered; there is one control group.
- Exercised system click/tap-equivalent, Enter, Space, arrow focus movement, Home/End, collapse, URL updates, refresh, Back, and Forward. Keyboard focus was visibly outlined. Opened a practice link and confirmed its destination headline.
- Verified the development `?motion=reduce` override in computed styles: no reader animation, zero toggle-transition duration, final result value shown. CSS also contains the OS reduced-motion media rule. Normal-motion layouts were visually inspected separately.
- No browser console errors observed during the final interaction check.

## Boundaries

Local implementation and rendered QA only; the public ChatGPT site was not republished. Illustrative cases remain explicitly marked and excluded from production. No client evidence or testimonial approval was implied or added. This is an implementation check, not representative-user validation or proof of conversion improvement.

## Follow-up: depth without additional complexity

Refined the same two readers after the request for clearer formatting, color, sizing, and dividers. This is a presentation-only refinement; content, claims, destinations, controls, motion timing, and proof approval gates are unchanged.

- Case headlines now use a stronger 36–48px scale. Context, source-status notice, narrative labels, and body copy have distinct roles without becoming separate panels.
- Thin rules separate Before / What 120VC changed / After. Orange identifies the intervention; semantic emphasis gives the outcome more weight. The single metric sits in a restrained sage-tinted band with a matching edge, keeping the result and measurement context together.
- Open system rows have an orange edge and a subtle surface change. A divider and heavier, slightly larger takeaway distinguish the practical change from its explanation. Practice links stay readable but visually secondary.
- There are still no competing reading columns, added steps, forced scroll distance, or fixed-height panels. Native disclosures, manual case browsing, visible focus, and reduced-motion support remain intact.

Verification for this refinement: production build, lint, TypeScript, all 35 regression checks, and diff whitespace check passed. Added regression assertions for semantic outcome emphasis, narrative dividers, intervention color, result surface, and selected-row hierarchy. Rendered both readers at 320, 390, 768, 1024, and 1440px with no horizontal document overflow; inspected phone, tablet, and desktop views. Case controls remain 44px high. Exercised case Previous/Next, arrow/Home navigation, system Enter and arrow-focus navigation, and visible keyboard focus. The case reduced-motion override reports no animation. Local preview only, not a public deployment.

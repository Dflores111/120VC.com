# Purposeful motion: idea, disclosure, response

Date: September 19, 2026
Status: Built locally; not published.

## Preserve

Keep the simple in-place problem and system disclosures, approved copy, routes, research citations, semantic controls, manual navigation, and normal page scrolling. Motion must not add reading steps or a longer scroll runway. Heroes retain their existing treatment; closing conversion sections remain quiet.

## Catalog selection and provenance

Adaptation mode: mechanism extraction, rebuilt with site-native React, CSS, IntersectionObserver, and Web Animations. No new dependencies or remote demo assets.

- **Text Effect**, saved `website-component-prompts/references/text-effect.prompt.md`, source https://21st.dev/@ibelick/components/text-effect: retain word-level segmentation and a short bounded stagger. Remove demo looping, randomness, blur, character scattering, duplicate accessible text, hidden server output, and the extra motion-library import. Use ordinary text spans with real whitespace in existing H2s, not replacement heading semantics.
- **Material Design Ripple**, first prompt in `website-component-prompts/references/shader-cards-and-material-ripple.prompts.md`, source https://21st.dev/community/components/larsen66/motion-material-design-ripple: retain one brief activation response. Replace button-wide ripples and pointer tracking with two bounded, pointer-transparent orange rings around the disclosure indicator. Initial/deep-link open states do not trigger a pulse; new openings do. Repeated toggles cancel rather than stack responses.
- Confetti/particles were not selected: these interactions reveal information, not a completed business result. There is no success message or implied business outcome.

## Motion contract

| Location | Trigger | Purpose and stopping point |
| --- | --- | --- |
| Selected chapter H2s across home, problems, services, system, resources, results, and offer pages | First viewport entry | Words settle in reading order; 28ms stagger capped at eight intervals, 480ms travel. Then remain still. No word motion in H1s or closing actions. |
| Five problem rows; six system rows | Each row's first viewport entry | A 10px, 420ms entrance helps track the next choice. Unobserved after entry. |
| Problem/system disclosure and homepage service disclosure | A new opening/explicit service selection | Two 620ms signal rings, 90ms apart, plus rotating open/close mark. Rings return to invisible within 710ms. |
| Open problem/system detail | A new opening | Three offset strokes align into one direction in 560ms with a capped 90ms stagger. This symbolizes disconnected work becoming aligned; it does not claim a business result or show task progress. |
| Lazy editorial ImageMask photographs/book imagery | First section entry | Image settles 10px into its existing frame over 720ms. The frame and mask remain intact. Eager heroes and diagrams are excluded; there is no pointer tracking, hover zoom, or scroll loop. |
| Homepage manually locked problem flip | Deliberate click/keyboard flip, not hover | Short accent line resolves across the revealed side. No autoplay or extra particles. |

Each component still gives its useful outcome immediately. Nothing waits for an animation to finish. Keyboard focus reveals skipped-ahead content immediately. Selected deep-link rows stay visible. Before JavaScript enhancement, all summaries/headlines are readable. Native disclosure fallback is preserved.

Reduced-motion preference removes entrances, pulses, and selection-trace animation while preserving readable content and selected/open state. The local `?motion=reduce` review override follows the same static presentation. OS preference changes are subscribed to by the existing shared motion hook/controller.

## Implementation

- `scroll-words.tsx`: server-rendered word segmentation; no effect or hidden default.
- `disclosure-cue.tsx`: shared decorative indicator, cancelable double ripple, and alignment trace.
- `scroll-narrative-motion.tsx`: per-row one-time observer, selected-row guard, and focus reveal.
- `purposeful-motion.css`: scoped word entrances, row entrances, indicator styling, manual-flip trace, and reduced-motion rules.
- Wired into `problem-explorer`, `system-explorer`, `solution-scope-cards`, selected headings in `problem-page`, `how-it-works-experience`, and homepage, plus the root stylesheet import.
- Regression coverage added to `tests/rendered-html.test.mjs`; a chapter-order assertion now compares visible text rather than raw markup because words have span wrappers.

## Verification (latest refinement)

- Production build and all 39 automated checks passed, including all routes/internal destinations, disclosure feedback constraints, editorial image targeting, and the preserved problem/system reading contracts. Lint, TypeScript, and whitespace checks passed.
- Browser observed the problem chapter before scrolling (pending words/rows) and after native PageDown (visible words and in-view rows, later row still pending). Focus navigation to the last row made it immediately visible.
- Browser observed both ring elements and actual opacity/scale immediately after mouse and keyboard opening, alignment stroke transforms resolving to none, and ring opacity zero after completion. Open/close still works with Space/Enter and retains visible focus. Arrow-key summary navigation works.
- Problem, homepage, services, resources, and representative coaching-offer layouts checked at 320, 390, 768, 1024, and 1440px with no horizontal page overflow. System layout checked across phone/tablet/desktop sizes. Mobile problem detail, desktop image/heading composition, and homepage chapter screenshots were inspected. Resizing an already-scrolled page can alter its anchor position; that is not headline clipping within its layout.
- The lazy system photo was observed pending at translateY(10px), then visible at transform none/opacity one after native navigation to its section. Its polygon mask remained intact. H1 media and the execution diagram were not motion targets.
- Homepage service opening produced the pulse; closing did not. Manual problem flip exposed its existing detail/focus destination and the new noninteractive selection trace.
- Reduced-motion review rendered words fully visible with zero transitions, no detail animation, and no pulse ring. No OS setting was modified.
- Header navigation through Services, Resources, and Results, the coaching offer link, and return-home navigation were exercised. Results' publication gates and original copy remain unchanged.

Physical-device, screen-reader, and JavaScript-disabled browser sessions were not run. Source/SSR checks establish fallback structure, not independent accessibility certification or conversion effectiveness. No public deployment was performed.

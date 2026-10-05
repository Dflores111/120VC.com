# Buyer clarity cleanup and focused QA — September 19, 2026

This follow-up supersedes the earlier browser-attachment limitation for the checks listed below. It is not a full accessibility certification or a published-site verification.

## Implemented locally

- Removed repeated category labels from both faces of the homepage pain cards. Each face now has one primary headline. Hover, click, and keyboard handlers are preserved.
- Explained system installation on offer cards without an unexplained ELPA acronym. The system page and program detail page introduce the full Executive Leadership Performance Accelerator name before the acronym.
- Changed the installation headline to focus on putting the system into the team's daily work. Routes and inquiry destinations are unchanged.
- Corrected the service-card tablet breakpoint: the old 660px desktop minimum persisted after the cards stacked. At 1024px the collapsed cards now measured approximately 394–418px tall.
- Applied the compact phone headline treatment to long offer-page headlines. The installation H1 measured three lines at both 320px and 390px.

## Verified

- ESLint, TypeScript, production build, and diff whitespace checks passed.
- All 42 automated tests passed. Added regression coverage for one headline per pain-card face, installation wording, and the phone headline/tablet height rules. Existing route, fragment, proof-gating, and honest form-state tests remain green.
- Rendered spot checks in the in-app browser at 320, 390, 768, 1024, and 1440px. Inspected pain cards, service cards, and the installation hero at relevant breakpoints. No document-level horizontal overflow appeared in these checks.
- Pain cards: Enter opens and moves focus to the detail link; Escape closes and restores the original control; arrow-key navigation advances the carousel. At 320px all five back faces had content fitting their 500px panel height. A pointer-triggered pain-card preview was observed.
- Service cards: explicit expansion and Escape worked; content stayed local to the card. Essential “Best when” copy remained visible before expansion. Hover event handling was preserved and regression-checked in source.
- Mobile navigation: opening moved focus into the menu; Shift+Tab wrapped to the final link; Escape closed it and restored focus to the menu trigger.
- Followed the service-card link to the system page and the installation link to the ELPA detail page. Confirmed the updated copy in the rendered pages.
- Reduced-motion development mode: headings stayed visible, disclosure-mark transitions were 0s, and ripple rings were hidden. The operating-system media-query fallbacks were inspected in source; OS preference switching was not performed.

## Still separate / pending

- Physical touch-device and screen-reader testing; representative-buyer usability sessions.
- An approved client story and supporting result evidence. Existing development-only examples remain excluded from production.
- An approved form/CRM receiving endpoint and field mapping. The email-draft handoff remains truthful; nothing was sent during QA.
- Public publishing: not requested or performed in this wave. Review at `http://127.0.0.1:3000/`.

## Short buyer check to run next

With three to five representative visitors, ask without coaching: “What does 120VC do?”, “Which service fits this situation, and why?”, and “What would you expect after clicking Let's Talk?” Record first choices, hesitation, and misunderstood terms. This protocol is prepared, not executed.

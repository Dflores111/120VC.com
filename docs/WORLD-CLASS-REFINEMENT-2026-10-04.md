# 120VC experience refinement — October 4, 2026

Status: implemented locally; not published to ChatGPT Sites in this pass.

## Improved

- Preserved the nine-part homepage journey, established typography, orange/ink/clay/sage palette, keyword highlights, human imagery, direct problem links, and existing interaction rewards.
- Tightened section spacing and supporting copy. Replaced four equal Four Ts cards with compact editorial rows. Promoted the existing real founder portrait; did not invent new client photography.
- Added a compact illustrative launch visual: decision → owner → commitment → review. All meaning is server-rendered. A finite connection animation enhances entry; normal scrolling and reduced-motion content remain intact.
- Added offer-specific working outputs, participants, delivery responsibility, and first useful progress signals. Replaced redundant chapters rather than increasing offer pages beyond five major sections.
- Upgraded the ungated Execution Decision Brief with optional outcome, decision, accountable owner, commitment, and review date. Context changes meeting evidence, agenda, examples, and follow-up guidance. Fields remain in transient page state; refreshing clears them.
- Copy and the unsent review-email draft use the current filled record. Print styling includes the record without the editor. Download requests a text file and offers alternatives without claiming it was saved.
- Centralized explicit availability for 19 legal/tool/assessment routes, including two resource hubs. Preserved useful explanations, genuine destinations, and indexing holds; removed visible drafting notes and unavailable-tool promises.

## Verification

- Production build and 71 automated tests pass. Checks cover configured routes, navigation/fragment resolution, proof gates, section counts, motion contracts, all 4,096 brief answer combinations, optional records, and valid calendar dates.
- TypeScript passes. ESLint has no errors and one existing native-image optimization warning on the founder image. Whitespace/diff checks pass.
- Homepage rendered at 320, 390, 768, 1024, and 1440 pixels without horizontal overflow or off-screen interactive controls in the checked viewport layouts.
- Three offer pages, privacy, and assessment hub rendered at 390 pixels without horizontal overflow. Offer pages retain five major sections.
- Followed the mobile menu into What We Do. Keyboard Space expanded a service card and exposed its actual detail.
- Verified filled brief copy and review-date synchronization. The prepared mailto body included the current record; no email was sent.
- Developer reduced-motion preview showed no signature animation and kept meaning visible. This was a forced review state, not an operating-system preference change.
- The in-app browser did not report a completed download after two bounded checks. Download compatibility was improved, but actual file saving remains unverified. Copy works. Print CSS was inspected; OS print/save-PDF completion was not tested.
- No representative-buyer usability or conversion experiment has been completed. Design improvement is not a conversion-performance claim.

## Required inputs to finish authority and live conversion

1. One case approved for public use: client naming permission, situation, 120VC's specific role, verified result, period, and source/method. Keep unapproved examples and 227%/98%/25+ figures behind their existing gates until substantiated.
2. Actual 120VC working-session photographs with permission to use the people and locations shown. Existing generated imagery stays labeled as illustration.
3. Approved contact/CRM destination, follow-up owner, applicable privacy requirements, and response expectations. Current consultation/review handoffs are email drafts, not CRM submissions or receipts.
4. Approved privacy, terms, and cookie policies reflecting the actual deployed stack. Current concept-site notices are not substitute legal policies.
5. Explicit instruction to publish this local revision to the ChatGPT Site. All current pages/routes remain in the implementation; this pass has not changed the public deployment.

## Main implementation files

- `app/page.tsx`, `app/data/homepage-content.ts`, `app/components/four-ts.tsx`
- `app/components/execution-signature.tsx`, `app/world-class-refinement.css`
- `app/components/engagement-evaluation.tsx`, `app/components/offer-experience.tsx`, `app/data/engagement-expectations.ts`, `app/engagement-expectations.css`
- `app/components/execution-decision-brief.tsx`, `app/data/execution-decision-brief.ts`, `app/decision-record.css`
- `app/components/content-page.tsx`, `app/data/page-availability.ts`, `app/page-availability.css`, two audience-copy strings in `app/site-data.ts`
- `app/layout.tsx` imports the four new style layers.
- New signature/engagement/availability tests and expanded brief tests.

Unrelated existing untracked files were left untouched. No new dependency, account, external message, CRM write, public deployment, or memory update was added.

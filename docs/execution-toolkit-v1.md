# 120VC Execution Toolkit — local v1

Completed locally on 2026-10-04. Entry: `http://localhost:3000/resources/tools`.
This change has not been published to ChatGPT Sites.

## What is included

The resource library now links to nine working tools, with a shared toolkit navigation:

| Tool | Route suffix under `/resources/tools/` | Purpose |
| --- | --- | --- |
| 2×2 Focus Board | `2x2-prioritization-matrix` | Rank owned outcomes by value and effort; matrix/list; move, archive, restore. |
| Weekly Focusing | `weekly-focusing-exercise` | Review, choose dated advances, inspect capacity and dependencies, reserve time. |
| Daily Focusing | `daily-focusing-exercise` | Reflect, resolve unfinished work, prepare tomorrow and a shareable Eyes Up report. |
| 1–3–1 Decision Builder | `1-3-1-decision-builder` | Save one problem, three distinct approaches and one reasoned recommendation. |
| Three Pillars Filter | `three-pillars-decision-filter` | Inspect customer satisfaction, team member satisfaction and profitability separately. |
| Challenge / Opportunity | `challenge-opportunity-builder` | Separate facts and assumptions, define a bounded next state, capture actual stakeholder feedback. |
| Weekly Team DOING | `weekly-team-doing` | Facilitate the 60-minute team agenda using the same local work and capacity records. |
| Work Rationalization | `work-rationalization-tool` | Record evidence, tradeoffs and a human-authorized decision to continue, narrow, pause or stop work. |
| Your First Execution Week | `execution-week-planner` | A practical starting path through the connected tools. |

The existing Buyer Decision Brief remains available and separate from the operating toolkit.

## Shared behavior and boundaries

- Objectives describe outcomes; weekly commitments describe dated advances against those outcomes. Stable IDs preserve these relationships.
- The matrix uses **value × effort**, not urgency × importance.
- Working time minus meetings, recurring work and reserve defines available capacity. For each commitment, demand uses the larger of remaining effort and confirmed calendar blocks, avoiding double counting.
- Parking retains the work with a reason and revisit date. Archiving an objective cannot orphan active commitments.
- Calendar validation rejects overlapping blocks, invalid dates, the wrong week, after-deadline blocks and dependency cycles. An ICS export is a file for calendar import, not calendar synchronization or confirmation.
- Harm to any pillar means “Needs revision.” Unknown does not become neutral. Readiness labels prepare a human discussion, never approve a decision.
- Saved challenge framing can explicitly create a linked 1–3–1 draft. Actual decisions can explicitly create linked objectives. No options, approvals or stakeholder demand are invented.
- Editors save explicitly, show draft status and protect unsaved edits. One pillar is shown at a time to reduce form density.
- Example data is clearly fictional. Blank workspaces and local backup/restore are available.
- Reports are visible, selectable text with copy, download and print controls. Eyes Up reports exclude private reflection; full workspace backups include it.
- Content and tool schemas live in `app/data/`; shared state, primitives and tool views live in `app/components/toolkit/`. No new dependency was added.

## Persistence and delivery

This is a browser-local toolkit. Saving writes to localStorage on this origin, not a server. It has no account, cross-device sync, live collaboration, CRM submission, automatic email or connected calendar. Clearing browser storage removes local records unless a backup exists. A temporary in-memory workspace is offered when browser storage is unavailable, with explicit status.

Backup imports are versioned and bounded; invalid types, IDs, relationships, dates, cycles and oversized records are rejected. Storage conflicts pause saving instead of silently overwriting another tab.

## Homepage numbers

The compact local review strip includes **227% better performance**, **98% success rate** and **25+ years across global enterprises**. These remain labeled company-reported and pending verification. Existing evidence gating keeps them out of production until the underlying definitions, comparison, sample, period and approval are supplied. Their presence in a design preview does not establish substantiation.

## Verification

- `npm test`: production build succeeded; **92 tests passed, 0 failed**.
- `npx tsc --noEmit`: passed.
- `npm run lint`: 0 errors; one existing image-optimization warning in `app/page.tsx`.
- `git diff --check`: passed.
- Server-rendered route coverage includes the hub and all nine tools, complete toolkit links, one H1 and a no-JavaScript guide fallback.
- Browser checks verified blank/example entry, matrix/list controls, keyboard-safe moves, rank changes, objective creation and persistence after reload.
- Weekly example capacity showed a real overage; activating work was rejected while over capacity. Explicit parking preserved the commitment and released the expected capacity.
- Native date input, step navigation and saved editor state were checked. Daily completion rejected missing required entries; private reflection was absent from the visible Eyes Up report.
- Saved challenge facts appeared in the linked decision draft. Incomplete 1–3–1 cases retained draft/gap status. Pillar harm produced “Needs revision,” including after switching pillar panes and saving.
- Team and rationalization records saved successfully; first-week guidance and all tool navigation rendered.
- Focus Board had no document-level horizontal overflow at **320, 390, 768, 1024 and 1440px**. Representative editors were checked at 320, 768, 1024 and 1440px. Mobile tool navigation is intentionally a contained horizontal rail.
- Final inspected browser console contained no errors. Finite entry/press feedback and reduced-motion CSS are implemented; no scroll interception is used.
- Rendered evidence: `docs/qa/execution-toolkit-focus-board.jpg`.

### Verification limits

Domain tests cover backup round trips, rejection cases, report privacy, capacity and calendar serialization. The in-app browser did not expose a completed file-download event during the report download check, so actual downloaded-file delivery is **not independently verified**. Clipboard UI reported success, but browser clipboard readback did not confirm the contents. Visible/selectable report text remains available. Native print preview, UI file restore, storage-failure and multi-tab conflict behavior were not exercised end to end; their code paths are present, not independently certified.

No existing related-app database or user work was changed. Browser QA used only clearly labeled fictional example records. Existing unrelated workspace changes were preserved.

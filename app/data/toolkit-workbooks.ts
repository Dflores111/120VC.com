import type { Workbook } from "./toolkit";
export type WorkbookStep = { title: string; fields: { key: string; label: string; hint?: string; options?: string[] }[]; pillars?: boolean; team?: boolean };
export const workbookSteps: Record<Workbook["kind"], WorkbookStep[]> = {
  challenge: [
    { title: "Describe the condition", fields: [{ key: "current", label: "Current state", hint: "What is happening now, and to whom?" }, { key: "facts", label: "Observed facts / sources" }, { key: "assumptions", label: "Assumptions / unknowns" }, { key: "inaction", label: "Cost of leaving it unchanged" }] },
    { title: "Define a better future", fields: [{ key: "future", label: "Desired future state" }, { key: "risks", label: "Risks and constraints" }, { key: "classification", label: "Value classification", options: ["Innovation", "Prevention", "Appraisal elimination", "Failure elimination"] }], pillars: true },
    { title: "Find the smallest useful next state", fields: [{ key: "baby", label: "Bounded baby future state", hint: "A smaller valuable outcome—not a pilot whose success is assumed." }, { key: "boundary", label: "Boundary, evidence, and stop / proceed decision", hint: "Keep the genuine option not to proceed." }, { key: "question1", label: "Experience-share question 1", hint: "Ask about a real past experience, not whether someone likes your solution." }, { key: "question2", label: "Experience-share question 2" }, { key: "question3", label: "Experience-share question 3" }] },
    { title: "Record what stakeholders actually said", fields: [{ key: "stakeholder", label: "Stakeholder / date" }, { key: "recognition", label: "Did they recognize this condition? What is the evidence?" }, { key: "challenge", label: "What challenged your assumptions?" }, { key: "next", label: "Agreed next step / owner / date", hint: "A completed workbook is not proof of demand or agreement." }] },
  ],
  team: [
    { title: "Check in · 5 minutes", fields: [{ key: "facilitator", label: "Facilitator / participants / date" }, { key: "checkin", label: "What matters coming into this meeting?" }] },
    { title: "Align the work · 20 minutes", team: true, fields: [{ key: "changes", label: "What changed since the last review?" }, { key: "decisions", label: "Decisions actually made / authority / date" }, { key: "followups", label: "Follow-through / owner / done-by", hint: "Add agreed deliverables to Weekly Focusing so they enter the shared capacity plan." }] },
    { title: "Surface challenges / opportunities · 15 minutes", fields: [{ key: "conditions", label: "Conditions worth investigating", hint: "Capture and triage here; develop the full case in Challenge / Opportunity." }, { key: "triage", label: "Who will frame each condition, by when?" }] },
    { title: "Build mastery · 20 minutes", fields: [{ key: "learning", label: "What practice did we inspect together?" }, { key: "experiment", label: "What will we practice before the next meeting?" }, { key: "next", label: "Next review date / owner / evidence to bring" }] },
  ],
  rationalize: [
    { title: "Inspect the investment", fields: [{ key: "owner", label: "Initiative owner / sponsor" }, { key: "evidence", label: "Outcome evidence so far" }, { key: "demand", label: "Evidence of current demand" }, { key: "cost", label: "Remaining cost, effort, and capacity" }], pillars: true },
    { title: "Make the tradeoff visible", fields: [{ key: "dependencies", label: "Dependencies / obligations / constraints" }, { key: "risks", label: "Risks and costs of stopping or changing" }, { key: "alternatives", label: "Alternatives / what capacity would be released?" }, { key: "recommendation", label: "Recommendation", options: ["Gather evidence", "Continue", "Narrow", "Pause", "Stop"] }] },
    { title: "Put it to the authorized decision-maker", fields: [{ key: "rationale", label: "Rationale and evidence gaps" }, { key: "authority", label: "Required decision authority" }, { key: "safeguards", label: "Safeguards before any action", hint: "Check contractual, customer, regulatory, and dependency commitments." }, { key: "recorded", label: "Actual decision / decision-maker / date (if decided)" }, { key: "next", label: "Next review / owner / evidence needed" }] },
  ],
  pillars: [{ title: "Test the impact", fields: [{ key: "proposal", label: "What change are you considering?" }], pillars: true }],
};

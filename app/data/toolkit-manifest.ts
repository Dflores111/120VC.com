export const toolkitTools = [
  { id: "focus", slug: "2x2-prioritization-matrix", title: "2×2 Focus Board", short: "Focus", description: "Choose the outcomes worth your capacity. A prioritization matrix based on value and effort.", group: "Focus" },
  { id: "weekly", slug: "weekly-focusing-exercise", title: "Weekly Focusing", short: "Plan the week", description: "Turn priorities into commitments your calendar can support.", group: "Focus" },
  { id: "daily", slug: "daily-focusing-exercise", title: "Daily Focusing", short: "Reset the day", description: "Close today, reset your calendar, and prepare an Eyes Up report.", group: "Focus" },
  { id: "decision", slug: "1-3-1-decision-builder", title: "1–3–1 Decision Builder", short: "Make a decision", description: "One problem. Three options. One reasoned recommendation.", group: "Decide" },
  { id: "pillars", slug: "three-pillars-decision-filter", title: "Three-Pillar Filter", short: "Test the impact", description: "Inspect customer, team, and profitability effects without averaging away harm.", group: "Decide" },
  { id: "challenge", slug: "challenge-opportunity-builder", title: "Challenge / Opportunity", short: "Frame a challenge", description: "Separate facts from assumptions before you prescribe a solution.", group: "Decide" },
  { id: "team", slug: "weekly-team-doing", title: "Weekly Team DOING", short: "Align the team", description: "A local facilitation record for decisions, blockers, and follow-through.", group: "Team" },
  { id: "rationalize", slug: "work-rationalization-tool", title: "Work Rationalization", short: "Review the work", description: "Record the case to continue, narrow, pause, or stop an initiative.", group: "Team" },
  { id: "starter", slug: "execution-week-planner", title: "Your First Execution Week", short: "Start here", description: "Use the connected tools through one practical week.", group: "Start" },
] as const;
export type ToolId = typeof toolkitTools[number]["id"] | "home";
export const toolHref = (id: ToolId) => id === "home" ? "/resources/tools" : `/resources/tools/${toolkitTools.find(t => t.id === id)!.slug}`;
export function toolForRoute(route: string): ToolId | undefined { return route === "resources/tools" ? "home" : toolkitTools.find(t => route === `resources/tools/${t.slug}`)?.id; }

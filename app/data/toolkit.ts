// Shared, browser-local domain. No network, inferred approvals, or scored pillar averages.
export const quadrants = {
  drive: { title: "Do first / drive daily", value: "High", effort: "Low" },
  invest: { title: "Selectively invest", value: "High", effort: "High" },
  workin: { title: "Work in", value: "Low", effort: "Low" },
  delay: { title: "Ignore / delay", value: "Low", effort: "High" },
} as const;
export type Quadrant = keyof typeof quadrants;
export const pillarNames = ["Customer satisfaction", "Team member satisfaction", "Profitability"] as const;
export type Impact = { effect: "unknown" | "positive" | "neutral" | "negative"; mechanism: string; evidence: string; measure: string; downside: string };
export type Objective = { id: string; title: string; outcome: string; owner: string; initiative: string; quadrant: Quadrant; rank: number; archived: boolean; decisionId: string; pillars: Impact[] };
export type Block = { id: string; date: string; start: string; end: string; confirmed: boolean };
export type Commitment = { id: string; objectiveId: string; title: string; owner: string; due: string; hours: number; status: "draft" | "active" | "done" | "parked"; support: string; dependsOn: string; blocks: Block[]; parkingReason: string; revisit: string };
export type Person = { id: string; name: string; week: string; working: number; meetings: number; recurring: number; reserve: number };
export type Option = { title: string; description: string; benefits: string; drawbacks: string; cost: string; pillars: Impact[] };
export type Decision = { id: string; title: string; problem: string; facts: string; assumptions: string; inaction: string; classification: string; options: Option[]; recommended: number; rationale: string; authority: string; decision: string; decidedOn: string };
export type Daily = { id: string; date: string; gratitude: string[]; today: string; tomorrow: string; reflection: string; calendarReviewed: boolean; completed: boolean };
export type Workbook = { id: string; kind: "challenge" | "team" | "rationalize" | "pillars"; title: string; objectiveId: string; decisionId: string; fields: Record<string, string>; pillars: Impact[] };
export type Toolkit = { version: 1; revision: string; demo: boolean; objectives: Objective[]; commitments: Commitment[]; people: Person[]; decisions: Decision[]; daily: Daily[]; workbooks: Workbook[] };
export const STORAGE_KEY = "120vc.execution-toolkit.v1";
export const newId = () => crypto.randomUUID();
export const emptyPillars = (): Impact[] => pillarNames.map(() => ({ effect: "unknown", mechanism: "", evidence: "", measure: "", downside: "" }));
export const emptyToolkit = (): Toolkit => ({ version: 1, revision: newId(), demo: false, objectives: [], commitments: [], people: [], decisions: [], daily: [], workbooks: [] });
export const emptyDecision = (): Decision => ({ id: newId(), title: "", problem: "", facts: "", assumptions: "", inaction: "", classification: "Innovation", options: Array.from({ length: 3 }, () => ({ title: "", description: "", benefits: "", drawbacks: "", cost: "", pillars: emptyPillars() })), recommended: 0, rationale: "", authority: "", decision: "", decidedOn: "" });
export function dateISO(date = new Date()): string { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`; }
export function validDate(value: string) { if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number(value.slice(0, 4)) < 2000 || Number(value.slice(0, 4)) > 2100) return false; const date = new Date(`${value}T12:00:00Z`); return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value; }
export function shiftDate(value: string, days: number) { const date = new Date(`${value}T12:00:00`); date.setDate(date.getDate() + days); return dateISO(date); }
export function weekOf(value = dateISO()) { if (!validDate(value)) return ""; const day = new Date(`${value}T12:00:00`).getDay(); return shiftDate(value, -(day === 0 ? 6 : day - 1)); }
export function blockHours(block: Block) { const minutes = (time: string) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3)); return Math.max(0, (minutes(block.end) - minutes(block.start)) / 60); }
export function plannedHours(commitment: Commitment) { return commitment.blocks.filter(b => b.confirmed).reduce((sum, b) => sum + blockHours(b), 0); }
export function commitmentState(commitment: Commitment) {
  if (commitment.status === "done" || commitment.status === "parked") return commitment.status;
  return plannedHours(commitment) >= commitment.hours && commitment.blocks.length > 0 ? "calendar-backed" : "needs calendar time";
}
export function capacity(person: Person, commitments: Commitment[], week: string) {
  const available = Math.max(0, person.working - person.meetings - person.recurring - person.reserve);
  const relevant = commitments.filter(c => c.owner === person.name && weekOf(c.due) === week && c.status !== "parked" && c.status !== "done");
  // Estimate and reserved blocks are alternatives, never added together.
  const demand = relevant.reduce((sum, c) => sum + Math.max(c.hours, plannedHours(c)), 0);
  return { available, demand, over: Math.max(0, demand - available), remaining: Math.max(0, available - demand), percent: available ? Math.round(demand / available * 100) : demand ? null : 0 };
}
export function pillarReadiness(pillars: Impact[]) {
  if (pillars.some(p => p.effect === "negative")) return "Needs revision";
  if (pillars.some(p => p.effect === "unknown" || !p.mechanism.trim() || !p.evidence.trim()) || !pillars.some(p => p.effect === "positive")) return "Needs evidence";
  if (pillars.some(p => p.effect === "positive" && !p.measure.trim())) return "Needs evidence";
  return "Ready for discussion";
}
export function decisionIssues(decision: Decision): string[] {
  const issues: string[] = [];
  if (![decision.title, decision.problem, decision.facts, decision.inaction].every(v => v.trim())) issues.push("Describe the problem, facts, and cost of inaction.");
  if (decision.options.some(o => ![o.title, o.description, o.benefits, o.drawbacks].every(v => v.trim()))) issues.push("Develop all three options, including benefits and drawbacks.");
  if (new Set(decision.options.map(o => o.title.trim().toLowerCase())).size < 3 || new Set(decision.options.map(o => o.description.trim().toLowerCase())).size < 3) issues.push("Give the three options distinct titles and approaches.");
  if (!decision.rationale.trim()) issues.push("Explain why the recommendation beats both alternatives.");
  if (pillarReadiness(decision.options[decision.recommended].pillars) !== "Ready for discussion") issues.push("Resolve the recommended option’s pillar evidence or harm before stakeholder review.");
  if (decision.options.some(o => o.pillars.some(p => p.effect === "unknown" || !p.mechanism.trim() || !p.evidence.trim()))) issues.push("Inspect the pillar effects and evidence for all three alternatives.");
  return issues;
}
export function validateCommitment(item: Commitment, data: Toolkit): string[] {
  const issues: string[] = [];
  if (!data.objectives.some(o => o.id === item.objectiveId && (!o.archived || item.status === "done" || item.status === "parked"))) issues.push("Choose an active objective.");
  if (!item.title.trim() || !item.owner.trim()) issues.push("Name the measurable advance and its owner.");
  if (!validDate(item.due) || item.hours <= 0 || item.hours > 168 || !Number.isFinite(item.hours)) issues.push("Add a valid done-by date and 0–168 remaining hours.");
  if (item.status === "parked" && (!item.parkingReason.trim() || !validDate(item.revisit))) issues.push("Give parked work a reason and revisit date.");
  for (const block of item.blocks) {
    if (!validDate(block.date) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(block.start) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(block.end) || blockHours(block) <= 0) { issues.push("Calendar blocks need a valid date and an end after the start."); continue; }
    if (weekOf(block.date) !== weekOf(item.due) || block.date > item.due) issues.push("Keep blocks in the commitment’s week and on or before its done-by date.");
    const others = [...item.blocks.filter(b => b.id !== block.id), ...data.commitments.filter(c => c.id !== item.id && c.owner === item.owner && !["done", "parked"].includes(c.status)).flatMap(c => c.blocks)];
    if (item.status !== "parked" && item.status !== "done" && others.some(b => b.date === block.date && b.start < block.end && block.start < b.end)) issues.push("Calendar blocks overlap for this owner. Move or shorten one.");
  }
  if (item.dependsOn === item.id) issues.push("A commitment cannot depend on itself.");
  if (item.dependsOn) {
    const seen = new Set([item.id]); let next = item.dependsOn;
    while (next) { if (seen.has(next)) { issues.push("This creates a circular dependency."); break; } seen.add(next); next = data.commitments.find(c => c.id === next)?.dependsOn || ""; }
  }
  return [...new Set(issues)];
}

// Validate backups before using them. Reject unsupported/corrupt data without overwriting it.
export function parseToolkit(raw: string): Toolkit {
  if (raw.length > 2_000_000) throw new Error("Backup is too large (maximum 2 MB).");
  const data: unknown = JSON.parse(raw);
  const fail = () => { throw new Error("This is not a supported, complete toolkit backup. Your current work is unchanged."); };
  const object = (v: unknown): v is Record<string, unknown> => Boolean(v && typeof v === "object" && !Array.isArray(v));
  const strings = (v: Record<string, unknown>, names: string[]) => names.every(n => typeof v[n] === "string" && (v[n] as string).length <= 12000);
  const number = (v: unknown, max = 168) => typeof v === "number" && Number.isFinite(v) && v >= 0 && v <= max;
  const list = (v: unknown, check: (item: Record<string, unknown>) => boolean): boolean => Array.isArray(v) && v.length <= 500 && v.every(item => object(item) && check(item));
  const impacts = (v: unknown): boolean => Array.isArray(v) && v.length === 3 && v.every(p => object(p) && strings(p, ["effect", "mechanism", "evidence", "measure", "downside"]) && ["unknown", "positive", "neutral", "negative"].includes(p.effect as string));
  if (!object(data) || data.version !== 1 || !strings(data, ["revision"]) || !data.revision || typeof data.demo !== "boolean") return fail();
  if (!list(data.objectives, o => strings(o, ["id", "title", "outcome", "owner", "initiative", "decisionId", "quadrant"]) && Object.hasOwn(quadrants, o.quadrant as string) && number(o.rank, 1e15) && typeof o.archived === "boolean" && impacts(o.pillars))) return fail();
  if (!list(data.commitments, c => strings(c, ["id", "objectiveId", "title", "owner", "due", "status", "support", "dependsOn", "parkingReason", "revisit"]) && validDate(c.due as string) && (!c.revisit || validDate(c.revisit as string)) && number(c.hours) && (c.hours as number) > 0 && ["draft", "active", "done", "parked"].includes(c.status as string) && list(c.blocks, b => strings(b, ["id", "date", "start", "end"]) && validDate(b.date as string) && /^([01]\d|2[0-3]):[0-5]\d$/.test(b.start as string) && /^([01]\d|2[0-3]):[0-5]\d$/.test(b.end as string) && (b.end as string) > (b.start as string) && typeof b.confirmed === "boolean"))) return fail();
  if (!list(data.people, p => strings(p, ["id", "name", "week"]) && validDate(p.week as string) && [p.working, p.meetings, p.recurring, p.reserve].every(v => number(v)))) return fail();
  if (!list(data.decisions, d => strings(d, ["id", "title", "problem", "facts", "assumptions", "inaction", "classification", "rationale", "authority", "decision", "decidedOn"]) && (!d.decidedOn || validDate(d.decidedOn as string)) && number(d.recommended, 2) && Number.isInteger(d.recommended) && Array.isArray(d.options) && d.options.length === 3 && list(d.options, o => strings(o, ["title", "description", "benefits", "drawbacks", "cost"]) && impacts(o.pillars)))) return fail();
  if (!list(data.daily, d => strings(d, ["id", "date", "today", "tomorrow", "reflection"]) && validDate(d.date as string) && Array.isArray(d.gratitude) && d.gratitude.length === 3 && d.gratitude.every(g => typeof g === "string" && g.length <= 12000) && typeof d.calendarReviewed === "boolean" && typeof d.completed === "boolean")) return fail();
  if (!list(data.workbooks, w => strings(w, ["id", "kind", "title", "objectiveId", "decisionId"]) && ["challenge", "team", "rationalize", "pillars"].includes(w.kind as string) && object(w.fields) && Object.keys(w.fields).length <= 40 && Object.values(w.fields).every(v => typeof v === "string" && v.length <= 12000) && impacts(w.pillars))) return fail();
  const result = data as Toolkit;
  const rows = [...result.objectives, ...result.commitments, ...result.people, ...result.decisions, ...result.daily, ...result.workbooks, ...result.commitments.flatMap(c => c.blocks)];
  if (rows.some(r => !r.id) || new Set(rows.map(r => r.id)).size !== rows.length) return fail();
  if (result.commitments.some(c => !result.objectives.some(o => o.id === c.objectiveId) || (c.dependsOn && !result.commitments.some(d => d.id === c.dependsOn)))) return fail();
  if (result.objectives.some(o => o.decisionId && !result.decisions.some(d => d.id === o.decisionId))) return fail();
  if (result.workbooks.some(w => (w.objectiveId && !result.objectives.some(o => o.id === w.objectiveId)) || (w.decisionId && !result.decisions.some(d => d.id === w.decisionId)))) return fail();
  if (new Set(result.people.map(p => `${p.name}|${p.week}`)).size !== result.people.length || new Set(result.daily.map(d => d.date)).size !== result.daily.length) return fail();
  if (result.people.some(p => p.week !== weekOf(p.week) || p.meetings + p.recurring + p.reserve > p.working || !p.name.trim())) return fail();
  if (result.commitments.some(c => validateCommitment(c, result).length > 0)) return fail();
  return result;
}

export function demoToolkit(today = dateISO()): Toolkit {
  const data = emptyToolkit(); data.demo = true; const week = weekOf(today);
  ["Agree the launch scope", "Complete the migration", "Reduce support handoffs", "Refresh the report format", "Explore a new dashboard", "Align the approval path"].forEach((title, i) => data.objectives.push({ id: `demo-objective-${i}`, title, outcome: ["Sponsor signs one achievable launch scope.", "All critical records pass the reconciliation check.", "Every open customer handoff has one named owner.", "The weekly report uses the agreed format.", "Decide whether a new dashboard is worth funding.", "Each launch decision has a named authority."][i], owner: i % 2 ? "Morgan" : "Alex", initiative: "Illustrative enterprise launch", quadrant: (["drive", "invest", "drive", "workin", "delay", "invest"] as Quadrant[])[i], rank: i, archived: false, decisionId: "", pillars: emptyPillars() }));
  data.people = ["Alex", "Morgan"].map(name => ({ id: newId(), name, week, working: 40, meetings: 12, recurring: 4.5, reserve: 3.5 }));
  data.commitments = [
    { objective: 0, title: "Sponsor accepts the scoped launch plan", owner: "Alex", hours: 14 },
    { objective: 2, title: "Owners accept all five customer handoffs", owner: "Alex", hours: 10 },
    { objective: 1, title: "Migration rehearsal passes the agreed checks", owner: "Morgan", hours: 13 },
  ].map((c, i) => ({ id: `demo-commitment-${i}`, objectiveId: `demo-objective-${c.objective}`, title: c.title, owner: c.owner, hours: c.hours, due: shiftDate(week, 4), status: "draft", support: i === 2 ? "Needs Alex to confirm the launch scope." : "", dependsOn: i === 2 ? "demo-commitment-0" : "", blocks: [], parkingReason: "", revisit: "" }));
  return data;
}

export function dailyReport(day: Daily) {
  return `Eyes Up Report ${day.date.slice(8)}${day.date.slice(5, 7)}${day.date.slice(0, 4)}\n\nGratitude\n${day.gratitude.map((g, i) => `${i + 1}. ${g || "Not entered"}`).join("\n")}\n\nToday — actions and outcomes\n${day.today || "Not entered"}\n\nTomorrow — planned actions and intended outcomes\n${day.tomorrow || "Not entered"}`;
}
export function decisionReport(d: Decision) {
  return `1–3–1 Decision Brief: ${d.title || "Untitled draft"}\n${decisionIssues(d).length ? "Draft — gaps remain" : "Prepared for human review — not an approval"}\n\nProblem\n${d.problem}\n\nFacts / evidence\n${d.facts}\n\nAssumptions\n${d.assumptions}\n\nCost of inaction\n${d.inaction}\n\nValue classification: ${d.classification}\n\n${d.options.map((o, i) => `Option ${i + 1}: ${o.title}\n${o.description}\nBenefits: ${o.benefits}\nDrawbacks: ${o.drawbacks}\nCost / effort / timing: ${o.cost || "Not assessed"}\n${pillarReport(o.pillars)}`).join("\n\n")}\n\nRecommendation: Option ${d.recommended + 1}\n${d.rationale}\n\nDecision authority: ${d.authority || "Not recorded"}\nRecorded decision: ${d.decision || "No decision recorded"}\nDate: ${d.decidedOn || "Not recorded"}`;
}
export function pillarReport(pillars: Impact[]) { return pillars.map((p, i) => `${pillarNames[i]}: ${p.effect}\nMechanism: ${p.mechanism || "Unknown"}\nEvidence: ${p.evidence || "Missing"}\nMeasure: ${p.measure || "Not defined"}\nDownside: ${p.downside || "Not recorded"}`).join("\n\n"); }
export function weekReport(data: Toolkit, week: string) { return `120VC Weekly Plan · ${week}\nLocal planning record — not a shared or synced calendar\n\n${data.people.filter(p => p.week === week).map(p => { const c = capacity(p, data.commitments, week); return `${p.name}: ${c.demand}h demand / ${c.available}h available${c.over ? ` — ${c.over}h over capacity` : ""}`; }).join("\n")}\n\n${data.commitments.filter(c => weekOf(c.due) === week).map(c => `${c.title}\nObjective: ${data.objectives.find(o => o.id === c.objectiveId)?.title}\nOwner: ${c.owner} · Done by: ${c.due} · Remaining: ${c.hours}h · ${commitmentState(c)}\nSupport: ${c.support || "None recorded"}\n${c.status === "parked" ? `Parked: ${c.parkingReason} · Revisit ${c.revisit}` : c.blocks.map(b => `${b.date} ${b.start}–${b.end} · ${b.confirmed ? "User confirmed" : "Draft block"}`).join("\n")}`).join("\n\n")}`; }
export function calendarExport(commitments: Commitment[]) {
  const escape = (s: string) => s.replaceAll("\\", "\\\\").replace(/\r?\n/g, "\\n").replaceAll(",", "\\,").replaceAll(";", "\\;");
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//120VC//Execution Toolkit//EN", "CALSCALE:GREGORIAN"];
  for (const c of commitments.filter(c => c.status !== "done" && c.status !== "parked")) for (const b of c.blocks) lines.push("BEGIN:VEVENT", `UID:${b.id}@120vc-toolkit`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")}`, `DTSTART:${b.date.replaceAll("-", "")}T${b.start.replace(":", "")}00`, `DTEND:${b.date.replaceAll("-", "")}T${b.end.replace(":", "")}00`, `SUMMARY:${escape(c.title)}`, `DESCRIPTION:${escape(`Owner: ${c.owner}. Export is not calendar confirmation. Check your calendar and timezone.`)}`, "END:VEVENT");
  lines.push("END:VCALENDAR");
  // RFC 5545 line folding, bounded below the 75-octet limit even for Unicode.
  return lines.map(line => { const pieces: string[] = []; let piece = ""; for (const char of line) { if (new TextEncoder().encode(piece + char).length > 70) { pieces.push(piece); piece = " " + char; } else piece += char; } pieces.push(piece); return pieces.join("\r\n"); }).join("\r\n") + "\r\n";
}

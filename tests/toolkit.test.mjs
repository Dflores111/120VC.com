import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { capacity, calendarExport, commitmentState, dailyReport, decisionIssues, decisionReport, demoToolkit, emptyDecision, emptyPillars, emptyToolkit, parseToolkit, pillarReadiness, plannedHours, quadrants, shiftDate, validDate, validateCommitment, weekOf, weekReport } from "../app/data/toolkit.ts";
import { toolkitTools, toolForRoute, toolHref } from "../app/data/toolkit-manifest.ts";
const example = () => demoToolkit("2026-10-05");
const roundtrip = data => parseToolkit(JSON.stringify(data));
const block = (extra = {}) => ({ id: "test-block", date: "2026-10-09", start: "09:00", end: "11:00", confirmed: true, ...extra });

test("the matrix is value by effort, never urgency by importance", () => {
  assert.deepEqual(Object.values(quadrants).map(q => [q.value, q.effort]), [["High", "Low"], ["High", "High"], ["Low", "Low"], ["Low", "High"]]);
  assert.match(quadrants.drive.title, /drive daily/);
});
test("demo has six objectives and visibly different capacity, with stable relationships", () => {
  const data = example(); assert.equal(data.objectives.length, 6); assert.equal(roundtrip(data).demo, true);
  const alex = capacity(data.people[0], data.commitments, "2026-10-05"); const morgan = capacity(data.people[1], data.commitments, "2026-10-05");
  assert.deepEqual(alex, { available: 20, demand: 24, over: 4, remaining: 0, percent: 120 }); assert.equal(morgan.percent, 65);
  assert.equal(data.commitments[2].dependsOn, data.commitments[0].id);
});
test("parking and moving work resolves overage while retaining displaced work", () => {
  const data = example(); const count = data.commitments.length;
  data.commitments[1].status = "parked"; data.commitments[1].parkingReason = "Scope decision takes precedence"; data.commitments[1].revisit = "2026-10-12";
  assert.equal(capacity(data.people[0], data.commitments, "2026-10-05").over, 0); assert.equal(roundtrip(data).commitments.length, count);
  data.commitments[1].status = "draft"; data.commitments[1].due = shiftDate(data.commitments[1].due, 7);
  assert.equal(capacity(data.people[0], data.commitments, "2026-10-05").demand, 14); assert.equal(data.commitments[1].due, "2026-10-16");
});
test("capacity excludes done and parked work; zero capacity stays explicit", () => {
  const data = example(); data.commitments[0].status = "done"; assert.equal(capacity(data.people[0], data.commitments, "2026-10-05").demand, 10);
  assert.equal(capacity({ ...data.people[0], working: 0 }, data.commitments, "2026-10-05").percent, null);
});
test("confirmed blocks and estimates are not double counted", () => {
  const data = example(); const c = data.commitments[0]; c.hours = 2; c.blocks = [block()]; data.commitments[1].status = "done";
  assert.equal(plannedHours(c), 2); assert.equal(capacity(data.people[0], data.commitments, "2026-10-05").demand, 2); assert.equal(commitmentState(c), "calendar-backed");
  c.hours = 3; assert.equal(commitmentState(c), "needs calendar time"); assert.equal(capacity(data.people[0], data.commitments, "2026-10-05").demand, 3);
  c.blocks[0].confirmed = false; assert.equal(plannedHours(c), 0); assert.equal(commitmentState(c), "needs calendar time");
});
test("calendar validation rejects overlaps, wrong weeks, after-deadline and invalid blocks", () => {
  const data = example(); const c = data.commitments[0]; c.blocks = [block()]; assert.deepEqual(validateCommitment(c, data), []);
  data.commitments[1].blocks = [block({ id: "another", start: "10:00", end: "12:00" })]; assert.match(validateCommitment(c, data).join(" "), /overlap/);
  data.commitments[1].blocks = []; c.blocks = [block({ date: "2026-10-12" })]; assert.match(validateCommitment(c, data).join(" "), /week/);
  c.blocks = [block({ date: "2026-10-10" })]; assert.match(validateCommitment(c, data).join(" "), /done-by/);
  c.blocks = [block({ start: "99:00" })]; assert.match(validateCommitment(c, data).join(" "), /valid/);
});
test("dependency cycles and unlinked commitments cannot be saved or imported", () => {
  const data = example(); data.commitments[0].dependsOn = data.commitments[2].id;
  assert.match(validateCommitment(data.commitments[0], data).join(" "), /circular/); assert.throws(() => roundtrip(data));
  data.commitments[0].dependsOn = ""; data.commitments[0].objectiveId = "missing"; assert.throws(() => roundtrip(data));
});
test("archiving an objective cannot orphan active work; completed history can stay linked", () => {
  const data = example(); data.objectives[0].archived = true; assert.throws(() => roundtrip(data)); data.commitments[0].status = "done"; assert.equal(roundtrip(data).objectives[0].archived, true);
});
test("pillar logic never averages away harm and unknown never becomes neutral", () => {
  const pillars = emptyPillars(); pillars[2].effect = "positive"; pillars[1].effect = "negative"; assert.equal(pillarReadiness(pillars), "Needs revision");
  pillars[1].effect = "unknown"; assert.equal(pillarReadiness(pillars), "Needs evidence");
  pillars.forEach((p, i) => { p.effect = i === 2 ? "positive" : "neutral"; p.mechanism = "Stated mechanism"; p.evidence = "Source provided"; p.measure = "Check at review"; }); assert.equal(pillarReadiness(pillars), "Ready for discussion");
  pillars[2].measure = ""; assert.equal(pillarReadiness(pillars), "Needs evidence");
});
test("two options or identical options are not presented as a ready 1-3-1", () => {
  const d = emptyDecision(); d.options.slice(0, 2).forEach((o, i) => { o.title = `Option ${i}`; o.description = `Approach ${i}`; o.benefits = "Benefits"; o.drawbacks = "Drawbacks"; });
  assert.match(decisionIssues(d).join(" "), /all three options/); d.options[2] = structuredClone(d.options[1]); assert.match(decisionIssues(d).join(" "), /distinct/); assert.match(decisionReport(d), /Draft — gaps remain/);
});
test("a complete case is only prepared for human review, not approved", () => {
  const d = emptyDecision(); d.title = "Decision"; d.problem = "Problem"; d.facts = "Facts"; d.inaction = "Impact"; d.rationale = "Why this beats the others";
  d.options.forEach((o, i) => { o.title = `Title ${i}`; o.description = `Approach ${i}`; o.benefits = "Benefits"; o.drawbacks = "Tradeoff"; o.pillars.forEach((p, j) => { p.effect = j === 2 ? "positive" : "neutral"; p.mechanism = "Mechanism"; p.evidence = "Source"; p.measure = "Measure"; }); });
  assert.deepEqual(decisionIssues(d), []); assert.match(decisionReport(d), /not an approval/); assert.match(decisionReport(d), /No decision recorded/);
  d.options[1].pillars[1].effect = "negative"; assert.deepEqual(decisionIssues(d), [], "a rejected harmful alternative does not block a supported recommendation"); d.recommended = 1; assert.match(decisionIssues(d).join(" "), /harm/);
});
test("Eyes Up reports exclude private reflections and preserve the requested subject format", () => {
  const day = { date: "2026-10-05", gratitude: ["One", "Two", "Three"], today: "Outcome today", tomorrow: "Intended outcome", reflection: "PRIVATE REFLECTION" };
  const report = dailyReport(day); assert.match(report, /^Eyes Up Report 05102026/); assert.doesNotMatch(report, /PRIVATE REFLECTION/); assert.match(report, /Outcome today/);
});
test("date helpers reject invalid dates and use local calendar days", () => {
  for (const date of ["2026-02-30", "2026-13-01", "2026-00-10", "", "10/05/2026"]) assert.equal(validDate(date), false, date);
  assert.equal(validDate("2028-02-29"), true); assert.equal(weekOf("2026-10-04"), "2026-09-28"); assert.equal(shiftDate("2026-12-31", 1), "2027-01-01");
});
test("backup roundtrip retains IDs, linked records, private entries and version", () => {
  const data = example(); data.decisions.push(emptyDecision()); data.objectives[0].decisionId = data.decisions[0].id; data.daily.push({ id: "day", date: "2026-10-05", gratitude: ["", "", ""], today: "", tomorrow: "", reflection: "private", calendarReviewed: false, completed: false });
  assert.deepEqual(roundtrip(data), data); assert.deepEqual(roundtrip(emptyToolkit()).objectives, []);
});
test("corrupt, unsupported, oversized or duplicate-ID backups are rejected", () => {
  assert.throws(() => parseToolkit("broken")); assert.throws(() => parseToolkit(" ".repeat(2_000_001))); assert.throws(() => roundtrip({ ...example(), version: 2 }));
  const data = example(); data.objectives[1].id = data.objectives[0].id; assert.throws(() => roundtrip(data));
  const damaged = example(); damaged.people[0].reserve = -1; assert.throws(() => roundtrip(damaged));
  const oversized = example(); oversized.objectives[0].outcome = "a".repeat(12001); assert.throws(() => roundtrip(oversized));
});
test("calendar export is escaped, folded, local-time and does not confirm reservations", () => {
  const data = example(); data.commitments[0].title = "Review, scope;\n" + "é".repeat(100); data.commitments[0].blocks = [block({ confirmed: false })];
  const ics = calendarExport(data.commitments); assert.match(ics, /DTSTART:20261009T090000/); assert.match(ics, /Review\\, scope\\;\\n/); assert.match(ics, /Export is not calendar/); assert.equal(data.commitments[0].blocks[0].confirmed, false);
  assert.ok(ics.split("\r\n").every(line => Buffer.byteLength(line) <= 75)); assert.match(ics, /END:VCALENDAR\r\n$/);
});
test("weekly export exposes unmet capacity and dependencies through named records", () => {
  const report = weekReport(example(), "2026-10-05"); assert.match(report, /4h over capacity/); assert.match(report, /Needs Alex/); assert.match(report, /needs calendar time/);
});
test("all nine frameworks have stable working routes and a common hub", () => {
  assert.equal(toolkitTools.length, 9); for (const tool of toolkitTools) assert.equal(toolForRoute(toolHref(tool.id).slice(1)), tool.id);
  assert.equal(toolForRoute("resources/tools"), "home"); assert.equal(toolForRoute("resources/assessments"), undefined);
});
test("toolkit content is not sent to analytics, APIs, or automatic email", () => {
  for (const name of ["workspace", "focus-board", "commitments", "weekly", "daily", "decision-builder", "workbooks", "primitives"]) { const source = readFileSync(new URL(`../app/components/toolkit/${name}.tsx`, import.meta.url), "utf8"); assert.doesNotMatch(source, /fetch\(|sendBeacon|data-analytics-selection|track120vcEvent|mailto:/); }
  const source = readFileSync(new URL("../app/components/toolkit/workspace.tsx", import.meta.url), "utf8"); assert.match(source, /parseToolkit\(raw\)\.revision/); assert.match(source, /setConflict\(true\)/); assert.match(source, /Download recovery copy/);
});

test("editors protect button-driven drafts and native date input; temporary restores do not reload", () => {
  const primitives = readFileSync(new URL("../app/components/toolkit/primitives.tsx", import.meta.url), "utf8");
  assert.match(primitives, /serialized !== savedVersion/);
  assert.match(primitives, /beforeunload/);
  assert.match(primitives, /onInput=\{type === "date"/);
  const workspace = readFileSync(new URL("../app/components/toolkit/workspace.tsx", import.meta.url), "utf8");
  const restore = workspace.slice(workspace.indexOf("async function restore"), workspace.indexOf("if (!loaded)"));
  assert.doesNotMatch(restore, /location.reload/);
  assert.match(restore, /setGeneration/);
  const daily = readFileSync(new URL("../app/components/toolkit/daily.tsx", import.meta.url), "utf8");
  assert.match(daily, /if \(saveDay\(\)\) setEditing\(c\)/);
});

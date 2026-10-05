import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { answerOptions, briefQuestions, buildDecisionBrief, deliveryContexts, meetingRecordFields } from "../app/data/execution-decision-brief.ts";

const clear = () => Object.fromEntries(briefQuestions.map(q => [q.id, "clear"]));
test("every valid answer combination returns transparent guidance and a complete portable brief", () => {
  for (const context of deliveryContexts) for (let code = 0; code < 1024; code++) {
    let remaining = code;
    const answers = Object.fromEntries(briefQuestions.map(q => { const value = answerOptions[remaining % 4].value; remaining = Math.floor(remaining / 4); return [q.id, value]; }));
    const brief = buildDecisionBrief(context, answers);
    const expected = briefQuestions.find(q => answers[q.id] === "missing") || briefQuestions.find(q => answers[q.id] === "partly") || briefQuestions.find(q => answers[q.id] === "unknown");
    assert.equal(brief.focus?.id, expected?.id);
    assert.equal(brief.agenda.length, 4);
    assert.ok(brief.text.includes(brief.reason));
    assert.ok(brief.text.includes(brief.artifact));
    assert.ok(brief.text.includes(brief.signal));
    for (const q of briefQuestions) assert.ok(brief.text.includes(q.label));
    assert.match(brief.text, /not an organizational benchmark/i);
  }
});
test("unknown answers prompt confirmation, not a corrective diagnosis", () => {
  const brief = buildDecisionBrief(deliveryContexts[0], { ...clear(), ownership: "unknown" });
  assert.equal(brief.mode, "confirm");
  assert.match(brief.action, /confirm/i);
  assert.match(brief.artifact, /evidence inspected/);
  assert.doesNotMatch(brief.text, /Name one outcome owner|Surface the blocked decision/);
});
test("all-clear asks leaders to inspect agreements without claiming organizational health", () => {
  const brief = buildDecisionBrief(deliveryContexts[0], clear());
  assert.equal(brief.mode, "clear");
  assert.doesNotMatch(brief.text, /Surface the blocked decision|100%|healthy organization/i);
  assert.match(brief.text, /Inspect one recent decision/);
});
test("incomplete or invalid answers are rejected", () => {
  assert.throws(() => buildDecisionBrief(deliveryContexts[0], {}));
  assert.throws(() => buildDecisionBrief("not a context", clear()));
  assert.throws(() => buildDecisionBrief(deliveryContexts[0], { ...clear(), alignment: "invalid" }));
});
test("delivery contexts change meeting evidence, agenda, and follow-up without changing answer selection", () => {
  const briefs = deliveryContexts.map(context => buildDecisionBrief(context, { ...clear(), ownership: "missing" }));
  assert.equal(new Set(briefs.map(brief => brief.bring)).size, deliveryContexts.length);
  assert.equal(new Set(briefs.map(brief => brief.agenda[0])).size, deliveryContexts.length);
  assert.equal(new Set(briefs.map(brief => brief.signal)).size, deliveryContexts.length);
  for (const brief of briefs) {
    assert.equal(brief.focus.id, "ownership");
    assert.match(brief.text, /Name one outcome owner/);
    assert.ok(brief.text.includes(brief.contextPlan.bring));
    assert.ok(brief.text.includes(brief.contextPlan.check));
  }
  assert.match(briefs[0].bring, /milestone/);
  assert.match(briefs[1].signal, /adoption/);
  assert.match(briefs[2].agenda[0], /capacity/);
  assert.match(briefs[3].bring, /internal customer/);
});
test("the meeting record is optional and blank fields do not prevent guidance or export", () => {
  const noRecord = buildDecisionBrief(deliveryContexts[0], clear());
  const blankRecord = buildDecisionBrief(deliveryContexts[0], clear(), { outcome: "   ", reviewDate: "" });
  assert.equal(noRecord.hasMeetingRecord, false);
  assert.equal(blankRecord.hasMeetingRecord, false);
  assert.equal(blankRecord.text, noRecord.text);
  assert.doesNotMatch(noRecord.text, /Your meeting record/);
});
test("entered meeting fields are included in the portable brief without changing its guidance", () => {
  const answers = { ...clear(), "decision-bottlenecks": "missing" };
  const record = {
    outcome: " Complete the agreed migration milestone. ",
    blockedDecision: "Agree which team owns the cross-functional handoff.",
    accountableOwner: "Transformation sponsor",
    nextCommitment: "Confirm the handoff and its acceptance evidence.",
    reviewDate: "2026-10-16",
  };
  const brief = buildDecisionBrief(deliveryContexts[0], answers, record);
  const withoutRecord = buildDecisionBrief(deliveryContexts[0], answers);
  assert.equal(brief.hasMeetingRecord, true);
  assert.equal(brief.action, withoutRecord.action);
  assert.deepEqual(brief.agenda, withoutRecord.agenda);
  assert.match(brief.text, /Your meeting record/);
  for (const field of meetingRecordFields) assert.ok(brief.text.includes(`${field.label}: ${record[field.key].trim()}`));
  assert.equal(record.outcome.startsWith(" "), true, "normalizing the exported record must not mutate the entered object");
});
test("a partial record distinguishes undecided fields and does not reinterpret unknown answers", () => {
  const brief = buildDecisionBrief(deliveryContexts[1], { ...clear(), ownership: "unknown" }, { outcome: "Adopt the shared operating process." });
  assert.equal(brief.mode, "confirm");
  assert.equal(brief.meetingRecord.accountableOwner, "");
  assert.match(brief.text, /Accountable owner: To agree in the meeting/);
  assert.match(brief.text, /Outcome to deliver: Adopt the shared operating process\./);
  assert.doesNotMatch(brief.text, /Name one outcome owner/);
});
test("record exports are bounded and dates must be calendar-valid ISO dates", () => {
  const brief = buildDecisionBrief(deliveryContexts[0], clear(), { outcome: "a".repeat(300), accountableOwner: "b".repeat(200), reviewDate: "2026-02-30" });
  assert.equal(brief.meetingRecord.outcome.length, 160);
  assert.equal(brief.meetingRecord.accountableOwner.length, 80);
  assert.equal(brief.meetingRecord.reviewDate, "");
  assert.equal(buildDecisionBrief(deliveryContexts[0], clear(), { reviewDate: "2028-02-29" }).meetingRecord.reviewDate, "2028-02-29");
  assert.equal(buildDecisionBrief(deliveryContexts[0], clear(), { reviewDate: "10/16/2026" }).hasMeetingRecord, false);
});
test("brief answers and contacts are not transmitted or stored; contact state is only a draft", () => {
  const source = readFileSync(new URL("../app/components/execution-decision-brief.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(source, /fetch\(|localStorage|sessionStorage|data-analytics-selection/);
  assert.match(source, /mailto:info@120vc\.com/);
  assert.match(source, /Nothing has been sent/);
  assert.match(source, /defaultValue=\{contactDraft\.email\}/);
  assert.match(source, /clipboard\.writeText/);
  assert.match(source, /new Blob/);
  assert.match(source, /window\.print/);
});

import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { answerOptions, briefQuestions, buildDecisionBrief, deliveryContexts } from "../app/data/execution-decision-brief.ts";

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

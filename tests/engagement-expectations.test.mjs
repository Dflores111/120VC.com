import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { engagementExpectations, engagementOfferForRoute, engagementScopeNote, getEngagementExpectation } from "../app/data/engagement-expectations.ts";

const source = path => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("each commercial route has its own outputs, participants, boundary, and first signal", () => {
  assert.deepEqual(engagementExpectations.map(item => item.id), ["coaching", "installation", "embedded"]);
  for (const item of engagementExpectations) {
    assert.equal(engagementOfferForRoute(item.route.slice(1)), item.id);
    assert.equal(getEngagementExpectation(item.id), item);
    assert.equal(item.outputs.length, 2);
    for (const field of ["roleSplit", "participation", "boundary", "firstSignal"]) assert.ok(item[field].length > 30, `${item.id}: ${field}`);
    assert.ok(item.sourceRefs.length >= 2, `${item.id} retains source provenance`);
  }
  assert.equal(engagementOfferForRoute("an-unrelated-offer"), undefined);
  assert.equal(getEngagementExpectation("installation").href, "/leadership-system");
  assert.match(getEngagementExpectation("installation").roleSplit, /Executive Leadership Performance Accelerator \(ELPA\)/);
  assert.equal(new Set(engagementExpectations.map(item => item.roleSplit)).size, 3);
  assert.equal(new Set(engagementExpectations.map(item => item.firstSignal)).size, 3);
});

test("expectations separate delivery responsibility without inventing packages or guarantees", () => {
  const coaching = getEngagementExpectation("coaching");
  const installation = getEngagementExpectation("installation");
  const embedded = getEngagementExpectation("embedded");
  assert.match(coaching.roleSplit, /Your leaders own delivery/);
  assert.match(installation.boundary, /cannot delegate their own leadership responsibility/);
  assert.match(embedded.boundary, /Client leaders remain accountable/);
  assert.match(engagementScopeNote, /duration, and fee.*before deciding/);
  const copy = JSON.stringify(engagementExpectations);
  assert.doesNotMatch(copy, /\bguarantee(?:d)?\b|\b\d+\s*(?:days|weeks|months)\b|\d+%|\$\d+|certified|Fortune 500/i);
});

test("essential evaluation content is server-rendered and visible without interaction", () => {
  const component = source("app/components/engagement-evaluation.tsx");
  assert.match(component, /<dl className="engagement-expectations-list"/);
  for (const field of ["outputs", "participation", "boundary", "firstSignal"]) assert.ok(component.includes(`expectation.${field}`));
  assert.doesNotMatch(component, /"use client"|<details|\shidden=|onClick|onMouseEnter|setInterval|onWheel/);
  assert.match(component, /data-journey-stage="evaluate"/);
  assert.match(component, /data-choice-action/);
});

test("the caller supplies offer context and integrates expectations instead of adding a chapter", () => {
  const caller = source("app/components/offer-experience.tsx");
  assert.match(caller, /engagementOfferForRoute\(page\.slug\)/);
  assert.match(caller, /<EngagementEvaluation offer=\{engagementOffer\}/);
  assert.match(caller, /isElpa && section\.title === "What installation involves\."/);
  assert.match(caller, /section\.title === "Make the practices part of how your team operates\."/);
  assert.match(caller, /section\.title === "Apply the Execution Leadership System in delivery\."/);
  assert.match(caller, /relatedLinks=\{expectationLinks\}/);
  assert.match(source("app/components/engagement-evaluation.tsx"), /: "Who leads the work\?"/);
  assert.match(source("app/components/how-we-help-experience.tsx"), /<EngagementEvaluation \/>/);
});

test("responsive evaluation retains a single mobile reading lane and visible focus", () => {
  const css = source("app/engagement-expectations.css");
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*grid-template-columns: 1fr/);
  assert.match(css, /\.engagement-offer-link:focus-visible/);
  assert.match(css, /min-height: 44px/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.doesNotMatch(css, /position: (?:fixed|sticky)|height:.*vh/);
});

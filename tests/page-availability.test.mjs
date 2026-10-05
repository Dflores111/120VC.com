import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { pageAvailability } from "../app/data/page-availability.ts";

let workerPromise;
const renderedPages = new Map();

async function getWorker() {
  if (!workerPromise) {
    const workerUrl = new URL("../dist/server/index.js", import.meta.url);
    workerUrl.searchParams.set("availability-test", `${process.pid}-${Date.now()}`);
    workerPromise = import(workerUrl.href).then(({ default: worker }) => worker);
  }
  return workerPromise;
}

async function render(path) {
  if (!renderedPages.has(path)) {
    renderedPages.set(path, (async () => {
      const worker = await getWorker();
      const response = await worker.fetch(
        new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
        { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
        { waitUntil() {}, passThroughOnException() {} },
      );
      return { status: response.status, html: await response.text() };
    })());
  }
  return renderedPages.get(path);
}

function mainMarkup(html) {
  const match = html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i);
  assert.ok(match, "expected a main element");
  return match[0];
}

function visibleText(markup) {
  return markup
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/(?:&#x27;|&#39;|&apos;)/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

const legalRoutes = ["privacy", "terms", "cookie-policy"];
const toolRoutes = [
  "resources/tools/challenge-opportunity-builder",
  "resources/tools/1-3-1-decision-builder",
  "resources/tools/2x2-prioritization-matrix",
  "resources/tools/daily-focusing-exercise",
  "resources/tools/weekly-focusing-exercise",
  "resources/tools/weekly-team-doing",
  "resources/tools/execution-week-planner",
  "resources/tools/three-pillars-decision-filter",
  "resources/tools/work-rationalization-tool",
];
const assessmentRoutes = [
  "resources/assessments/execution-health-diagnostic",
  "resources/assessments/leadership-team-execution-assessment",
  "resources/assessments/high-stakes-initiative-readiness",
  "resources/assessments/portfolio-roi-diagnostic",
  "resources/assessments/cost-center-to-value-engine-assessment",
];
const hubRoutes = ["resources/assessments"];
const practiceRoutes = [...assessmentRoutes];
const controlledRoutes = [...legalRoutes, ...hubRoutes, ...practiceRoutes];

test("centralizes every held legal, tool, and assessment route in a typed availability inventory", () => {
  assert.deepEqual(Object.keys(pageAvailability).sort(), controlledRoutes.sort());
  assert.equal(Object.keys(pageAvailability).length, 9);
  assert.ok(toolRoutes.every(slug => pageAvailability[slug] === undefined), "working tools no longer carry an unavailable notice");
  assert.ok(legalRoutes.every((slug) => pageAvailability[slug].kind === "legal-policy"));
  assert.ok(hubRoutes.every((slug) => pageAvailability[slug].kind === "resource-collection"));
  assert.ok(practiceRoutes.every((slug) => pageAvailability[slug].kind === "practice-explanation"));
  assert.ok([...legalRoutes, ...practiceRoutes].every((slug) => pageAvailability[slug].state === "unavailable"));
  assert.ok(hubRoutes.every((slug) => pageAvailability[slug].state === "partially-available"));
  assert.ok(controlledRoutes.every((slug) => pageAvailability[slug].indexing === "hold"));
  assert.equal(pageAvailability["resources/execution-decision-brief"], undefined, "the working Decision Brief remains available");

  const controlledPaths = new Set(controlledRoutes.map((slug) => `/${slug}`));
  for (const slug of [...hubRoutes, ...practiceRoutes]) {
    const destination = pageAvailability[slug].primaryAction.href.split("#")[0];
    assert.ok(!controlledPaths.has(destination), `${slug}: the primary alternative must itself be available`);
  }
});

test("keeps resource hubs useful while replacing internal planning notes with explicit availability", async () => {
  const routes = [
    { slug: "resources/assessments", links: assessmentRoutes, forbidden: /Assessment results should|sufficient validated benchmark data|Publishing hold|HubSpot routing/i },
  ];

  for (const { slug, links, forbidden } of routes) {
    const { status, html } = await render(`/${slug}`);
    const main = mainMarkup(html);
    const text = visibleText(main);
    assert.equal(status, 200, slug);
    assert.match(main, /data-page-availability="partially-available"/i, slug);
    assert.match(text, /explanations? available|explore how|explore what/i, `${slug}: customer-facing collection state`);
    assert.match(text, /not available|unavailable|does not provide/i, `${slug}: unavailable experience is explicit`);
    assert.match(main, /href="\/resources\/execution-decision-brief"/i, `${slug}: working alternative`);
    assert.equal((main.match(/data-primary-action/g) || []).length, 1, `${slug}: one primary action`);
    assert.doesNotMatch(main, /class="final-cta"/i, `${slug}: no generic sales ending`);
    assert.doesNotMatch(text, forbidden, `${slug}: internal planning language is removed`);
    for (const destination of links) assert.match(main, new RegExp(`href="/${destination}"`, "i"), `${slug}: preserves ${destination}`);
    assert.match(html, /name="robots" content="noindex, nofollow"/i, `${slug}: publishing hold remains`);
  }
});

test("renders legal routes as honest concept-site notices with direct contact instead of invented policy copy", async () => {
  for (const slug of legalRoutes) {
    const { status, html } = await render(`/${slug}`);
    const main = mainMarkup(html);
    const text = visibleText(main);
    assert.equal(status, 200, slug);
    assert.match(main, /data-page-availability="unavailable"/i, slug);
    assert.match(text, /not available on this concept site/i, slug);
    assert.match(main, /href="mailto:info@120vc\.com"/i, slug);
    assert.match(text, /info@120vc\.com/i, slug);
    assert.equal((main.match(/data-primary-action/g) || []).length, 1, `${slug}: one direct action`);
    assert.doesNotMatch(main, /href="\/(?:contact|consultation)/i, `${slug}: no marketing form`);
    assert.doesNotMatch(text, /final policy|approved platform|owner-only prototype|legal publishing hold|APPROVAL REQUIRED|HubSpot routing/i, slug);
    assert.match(html, /name="robots" content="noindex, nofollow"/i, `${slug}: legal hold remains`);
  }
});

test("keeps practice explanations visible while clearly withholding unfinished tool and assessment experiences", async () => {
  const draftingLanguage = /\[APPROVAL REQUIRED\]|activation status|requires approval|not active yet|remain(?:s)? disabled|not yet supplied|have not yet been supplied|not yet published|confirm (?:the|every)[\s\S]{0,100}before activat|HubSpot routing|The tool is method proof/i;

  for (const slug of practiceRoutes) {
    const { status, html } = await render(`/${slug}`);
    const main = mainMarkup(html);
    const text = visibleText(main);
    const availability = pageAvailability[slug];
    assert.equal(status, 200, slug);
    assert.match(main, /data-page-availability="unavailable"/i, slug);
    assert.match(text, /(?:practice|framework|sequence|prompts|purpose|rhythm|question|dimensions|decision standard)/i, `${slug}: practice remains understandable`);
    assert.match(text, /not available/i, `${slug}: unavailable experience is explicit`);
    assert.match(main, new RegExp(`href="${availability.primaryAction.href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`, "i"), `${slug}: truthful available alternative`);
    assert.equal((main.match(/data-primary-action/g) || []).length, 1, `${slug}: one primary alternative`);
    assert.doesNotMatch(main, /<form\b|<input\b|<textarea\b/i, `${slug}: no simulated unfinished experience`);
    assert.doesNotMatch(main, /class="final-cta"/i, `${slug}: no generic consultation ending`);
    assert.doesNotMatch(text, draftingLanguage, `${slug}: internal implementation notes stay out of audience copy`);
    assert.match(html, /name="robots" content="noindex, nofollow"/i, `${slug}: approval hold remains`);
  }
});

test("routes relevant held practices to the real ungated Execution Decision Brief", async () => {
  const decisionBriefRoutes = practiceRoutes.filter((slug) => pageAvailability[slug].primaryAction.href === "/resources/execution-decision-brief");
  assert.equal(decisionBriefRoutes.length, 5);

  const { status, html } = await render("/resources/execution-decision-brief");
  const main = mainMarkup(html);
  const briefSource = readFileSync(new URL("../app/components/execution-decision-brief.tsx", import.meta.url), "utf8");
  assert.equal(status, 200);
  assert.doesNotMatch(main, /data-page-availability=/i);
  assert.match(main, /Build my decision brief/i);
  assert.match(briefSource, /Copy the brief/i);
  assert.match(briefSource, /Download text/i);
});

test("styles availability states as static information with a responsive action hierarchy", () => {
  const css = readFileSync(new URL("../app/page-availability.css", import.meta.url), "utf8");
  const component = readFileSync(new URL("../app/components/content-page.tsx", import.meta.url), "utf8");
  assert.match(component, /getPageAvailability\(page\.slug\)/);
  assert.match(component, /data-page-availability=\{availability\.state\}/);
  assert.match(component, /!availability && \(/, "generic conversion ending is withheld on unavailable pages");
  assert.match(css, /\.page-availability\s*\{/);
  assert.match(css, /\.page-availability-legal-policy\s*\{[^}]*background:\s*var\(--clay\)/s);
  assert.match(css, /\.page-availability-resource-collection\s*\{[^}]*background:\s*var\(--sage\)/s);
  assert.match(css, /@media \(max-width: 680px\)[\s\S]*?grid-template-columns:\s*1fr/s);
  assert.doesNotMatch(css, /cursor:\s*pointer|animation:|transition:/i, "the static status marker does not imply interaction");
});

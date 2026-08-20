import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the buyer-first 120VC homepage", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Make strategy/i);
  assert.match(html, /Install the system behind delivery/i);
  assert.match(html, /Book a consultation/i);
  assert.match(html, /Evidence leaders can inspect/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|98%|227%/i);
});

test("server-renders representative commercial and role pages", async () => {
  for (const [path, pattern] of [
    ["/leadership-system", /Install the system that carries strategy/i],
    ["/roi-driven-project-portfolio-services", /Stop funding activity/i],
    ["/for-the-chief-operating-officer", /coordinated execution across the business/i],
    ["/contact", /Find where execution is breaking/i],
  ]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    assert.match(await response.text(), pattern, path);
  }
});

test("server-renders every configured buyer-journey route", async () => {
  const source = readFileSync(new URL("../app/site-data.ts", import.meta.url), "utf8");
  const slugs = [...source.matchAll(/^\s{2}"([^"]+)": \{/gm)].map((match) => match[1]);
  assert.ok(slugs.length >= 20, `expected at least 20 configured routes, found ${slugs.length}`);

  for (const slug of slugs) {
    const response = await render(`/${slug}`);
    assert.equal(response.status, 200, slug);
    const html = await response.text();
    assert.match(html, /<h1/i, slug);
    assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|98%|227%/i, slug);
  }
});

test("keeps the consultation request focused and low-friction", async () => {
  const response = await render("/contact");
  const html = await response.text();
  assert.match(html, /Full name/i);
  assert.match(html, /What is breaking/i);
  assert.match(html, /Prepare email request/i);
  assert.doesNotMatch(html, /Which condition best describes|First name|Last name/i);
});

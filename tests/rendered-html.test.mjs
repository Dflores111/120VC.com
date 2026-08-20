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
  assert.match(html, /Proof before process/i);
  assert.match(html, /Book a consultation/i);
  assert.match(html, /98%/i);
  assert.match(html, /227%/i);
  assert.match(html, /J\. Scott, founder and CEO of 120VC/i);
  assert.equal((html.match(/<section\b/g) || []).length, 7);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Name the outcome|Leadership transfer/i);
});

test("keeps homepage affordances truthful", async () => {
  const response = await render("/");
  const html = await response.text();
  assert.match(html, /<a href="[^"]+" class="path-v3-card">/i);
  assert.match(html, /<a href="[^"]+" class="founder-v3-link">/i);

  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.doesNotMatch(css, /\.outcome-v3-item:hover|\.proof-logo:hover|\.proof-stat:hover|\.how-v3-steps li:hover|\.value-hero-media:hover/i);
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
    assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i, slug);
  }
});

test("shows the real founder portrait on the J. Scott page", async () => {
  const response = await render("/founder-jason-scott");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /Jason-Scott-120VC-CEO-Founder-img\.webp/i);
  assert.match(html, /J\. Scott, founder and CEO of 120VC/i);
});

test("keeps the consultation request focused and low-friction", async () => {
  const response = await render("/contact");
  const html = await response.text();
  assert.match(html, /Full name/i);
  assert.match(html, /What is breaking/i);
  assert.match(html, /Prepare email request/i);
  assert.doesNotMatch(html, /Which condition best describes|First name|Last name/i);
});

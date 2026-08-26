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

test("server-renders the seven-job source-of-truth homepage", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Close the gap between strategy and execution/i);
  assert.match(html, /shared Execution Leadership System inside live work/i);
  assert.match(html, /See How It Works/i);
  assert.match(html, /Understand the Strategy Execution Gap/i);
  assert.match(html, /Installed in the work\. Built to hold without us/i);
  assert.match(html, /Where is execution breaking/i);
  assert.match(html, /Evidence should survive scrutiny/i);
  assert.match(html, /Where is execution breaking in your organization/i);
  assert.equal((html.match(/<section\b/g) || []).length, 7);
  const chooser = html.slice(html.indexOf('<section class="solution-section"'), html.indexOf('<section class="evidence-section"'));
  const chooserOrder = ["Leadership Team Transformation", "Executive Leadership Performance Accelerator", "Enterprise Transformation", "ROI-Driven Project Portfolio Services"];
  let lastSolution = -1;
  for (const title of chooserOrder) {
    const index = chooser.indexOf(title);
    assert.ok(index > lastSolution, `${title} must follow the master-spec chooser order`);
    lastSolution = index;
  }
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("keeps the canonical homepage sequence", async () => {
  const html = await (await render("/")).text();
  const classes = [
    "master-hero",
    "authority-section",
    "diagnostic-section",
    "system-section",
    "solution-section",
    "evidence-section",
    "closing-section",
  ];
  let last = -1;
  for (const className of classes) {
    const index = html.indexOf(className);
    assert.ok(index > last, `${className} must appear after the previous homepage job`);
    last = index;
  }
});

test("uses the exact static proof set without publishing unresolved performance claims", async () => {
  const html = await (await render("/")).text();
  for (const name of ["Sony", "DIRECTV", "Activision", "Blizzard Entertainment", "Trader Joe", "ResMed", "Sysco"]) {
    assert.match(html, new RegExp(name, "i"), name);
  }
  assert.doesNotMatch(html, /Cisco|98%|227%|logo-marquee|CountUpValue/i);
  assert.match(html, /public launch still requires relationship, logo-permission, and proof-governance confirmation/i);
});

test("makes every visually interactive homepage surface a real control", async () => {
  const html = await (await render("/")).text();
  assert.match(html, /<a href="[^"]+" class="solution-card">/i);
  assert.match(html, /<a href="\/resources\/tools\/2x2-prioritization-matrix" class="tool-link">/i);
  assert.match(html, /<a href="\/resources\/tools\/1-3-1-decision-builder" class="tool-link">/i);
  assert.match(html, /<a href="\/resources\/tools\/daily-focusing-exercise" class="tool-link">/i);
  assert.match(html, /aria-expanded="false" aria-controls="mega-problems"/i);
  assert.match(html, /aria-expanded="false" aria-controls="mobile-navigation"/i);

  const css = `${readFileSync(new URL("../app/globals.css", import.meta.url), "utf8")}\n${readFileSync(new URL("../app/master.css", import.meta.url), "utf8")}`;
  assert.doesNotMatch(css, /animation:[^;]*infinite|logo-marquee/i);
  assert.doesNotMatch(css, /\.image-mask[^\n,{]*:hover|\.authority-logo-grid[^\n,{]*:hover/i);
  assert.match(css, /prefers-reduced-motion[\s\S]*\.reveal/i);
});

test("adds purposeful human imagery and restrained motion without false interaction", async () => {
  const html = await (await render("/")).text();
  for (const image of [
    "team-working-together.jpg",
    "execution-friction.jpg",
    "aligned-leadership-team.jpg",
    "strategy-execution-gap-book.jpg",
  ]) {
    assert.match(html, new RegExp(image, "i"), image);
  }
  assert.match(html, /aria-label="Close the gap between strategy and execution\.?"/i);
  assert.match(html, /person-img-with-orange-back\.webp/i);
  assert.match(html, /href="https:\/\/www\.120vc\.com\/book-download-the-strategy-execution-gap\/"/i);
  assert.doesNotMatch(html, /flip-card|testimonial-marquee|testimonials-columns|circular-testimonials/i);

  const css = `${readFileSync(new URL("../app/globals.css", import.meta.url), "utf8")}\n${readFileSync(new URL("../app/master.css", import.meta.url), "utf8")}`;
  const textEffect = readFileSync(new URL("../app/components/text-effect.tsx", import.meta.url), "utf8");
  assert.match(css, /\.text-effect-word/i);
  assert.match(css, /prefers-reduced-motion[\s\S]*\.text-effect-word/i);
  assert.match(textEffect, /useReducedMotion/i);
  assert.doesNotMatch(textEffect, /repeat\s*:/i);
  assert.doesNotMatch(css, /\.image-mask[^\n,{]*:hover|\.closing-outcome[^\n,{]*:hover|animation:[^;]*infinite/i);
});

test("keeps navigation language congruent with real destinations and activation state", async () => {
  const html = await (await render("/")).text();
  assert.match(html, /href="\/resources\/insights"/i);
  assert.doesNotMatch(html, /href="\/insights"/i);
  assert.match(html, /href="\/consultation"/i);
  assert.doesNotMatch(html, /href="\/contact"/i);
  assert.match(html, /Explore the Execution Health Framework/i);
  assert.doesNotMatch(html, /Take the Execution Health Diagnostic|Case Studies|Client References/i);
});

test("renders the commercial core and progressive-disclosure hubs", async () => {
  for (const [path, pattern] of [
    ["/leadership-system", /One shared system to prioritize/i],
    ["/leadership-system/installation", /Install the system inside the work/i],
    ["/leadership-services", /One system\. Installed where execution is breaking/i],
    ["/leadership-services/compare-solutions", /Choose the installation scope/i],
    ["/results", /Evidence should make the decision easier/i],
    ["/results/methodology", /Every claim needs a definition/i],
    ["/resources", /Understand the condition\. See the system in practice/i],
    ["/resources/tools", /See the system in practice/i],
    ["/for-leaders", /Built for executives accountable/i],
    ["/about/the-120-standard", /Not a slogan\. A way of operating/i],
  ]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    assert.match(await response.text(), pattern, path);
  }
});

test("repeats each content page's declared next step instead of forcing consultation", async () => {
  const guide = await (await render("/resources/guides-and-books")).text();
  const guideEnding = guide.slice(guide.indexOf('<section class="final-cta"'));
  assert.match(guideEnding, /Download The Strategy Execution Gap/i);
  assert.doesNotMatch(guideEnding, /Book a Consultation/i);

  const solution = await (await render("/leadership-services")).text();
  const solutionEnding = solution.slice(solution.indexOf('<section class="final-cta"'));
  assert.match(solutionEnding, /Book a Leadership System Consultation/i);
});

test("server-renders every configured buyer-journey route", async () => {
  const source = readFileSync(new URL("../app/site-data.ts", import.meta.url), "utf8");
  const slugs = [...source.matchAll(/^\s+slug: "([^"]+)"/gm)].map((match) => match[1]);
  assert.ok(slugs.length >= 67, `expected at least 67 configured routes plus the homepage, found ${slugs.length}`);

  for (const slug of slugs) {
    const response = await render(`/${slug}`);
    assert.equal(response.status, 200, slug);
    const html = await response.text();
    assert.match(html, /<h1/i, slug);
    assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i, slug);
  }
});

test("keeps every internal navigation outcome resolvable", async () => {
  const source = readFileSync(new URL("../app/site-data.ts", import.meta.url), "utf8");
  const slugs = [...source.matchAll(/^\s+slug: "([^"]+)"/gm)].map((match) => match[1]);
  const entryPaths = ["/", "/contact", "/consultation", ...slugs.map((slug) => `/${slug}`)];
  const destinations = new Set();

  for (const path of entryPaths) {
    const html = await (await render(path)).text();
    for (const match of html.matchAll(/href="(\/[^"#]*)"/g)) {
      const destination = match[1].split("?")[0].replace(/\/$/, "") || "/";
      if (!destination.startsWith("/_next") && !destination.startsWith("/images/")) destinations.add(destination);
    }
  }

  for (const destination of destinations) {
    const response = await render(destination);
    assert.equal(response.status, 200, `broken internal destination: ${destination}`);
  }
});

test("renders a differentiated first wave and keeps draft proof out of production", async () => {
  const journeys = [
    ["/problems-we-solve/strategy-execution-gap", "strategy", /Why clear strategy still fragments/i, /The breakdown begins after agreement/i],
    ["/problems-we-solve/leadership-team-alignment", "alignment", /Strong executives\. Separate functions/i, /Agreement in the room can hide drift after it/i],
    ["/problems-we-solve/transformation-execution", "transformation", /A launch is not a transformation/i, /Move from launch to normal work/i],
    ["/problems-we-solve/project-portfolio-roi", "portfolio", /A well-reported portfolio can still be poorly invested/i, /Every initiative needs a next decision/i],
    ["/problems-we-solve/internal-function-performance", "function", /When a necessary function becomes a cost center/i, /Move from request to recommendation to outcome/i],
  ];

  for (const [path, variant, headline, visualConcept] of journeys) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, new RegExp(`problem-site-${variant}`), path);
    assert.match(html, headline, path);
    assert.match(html, visualConcept, path);
    assert.match(html, /Condition at a glance/i, path);
    assert.doesNotMatch(html, /data-proof-status="placeholder"/i, path);
    assert.doesNotMatch(html, /PLACEHOLDER TESTIMONIAL — NOT APPROVED FOR PUBLICATION/i, path);
    assert.match(html, /name="robots" content="noindex, nofollow"/i, path);
    assert.doesNotMatch(html, /flip-card|testimonial-marquee|testimonials-columns|circular-testimonials/i, path);
  }

  const proofData = readFileSync(new URL("../app/problem-page-data.ts", import.meta.url), "utf8");
  const proofComponent = readFileSync(new URL("../app/components/problem-page.tsx", import.meta.url), "utf8");
  assert.equal((proofData.match(/name: "Placeholder Name"/g) || []).length, 5);
  assert.match(proofComponent, /PLACEHOLDER TESTIMONIAL — NOT APPROVED FOR PUBLICATION/);
  assert.match(proofComponent, /process\.env\.NODE_ENV !== "production"/);
});

test("makes the problem hub a progressive-disclosure router with real linked outcomes", async () => {
  const html = await (await render("/problems-we-solve")).text();
  assert.match(html, /Start with what is breaking/i);
  assert.match(html, /Which pattern looks most like your organization/i);
  for (const path of [
    "/problems-we-solve/strategy-execution-gap",
    "/problems-we-solve/leadership-team-alignment",
    "/problems-we-solve/transformation-execution",
    "/problems-we-solve/project-portfolio-roi",
    "/problems-we-solve/internal-function-performance",
  ]) {
    assert.match(html, new RegExp(`<a href="${path}" class="problem-hub-card">`, "i"), path);
  }
  assert.match(html, /Explore the Execution Health Framework/i);
});

test("adds two contextual book lead-path previews without claiming a connected capture", async () => {
  for (const [path, sourcePage, sourceCta] of [
    ["/problems-we-solve/strategy-execution-gap", "strategy-execution-gap", "problem-book"],
    ["/problems-we-solve/transformation-execution", "transformation-execution", "transformation-book"],
  ]) {
    const html = await (await render(path)).text();
    assert.match(html, /strategy-gap-book\.png/i, path);
    assert.match(html, /Work email/i, path);
    assert.match(html, /Company/i, path);
    assert.match(html, /Role or title/i, path);
    assert.match(html, new RegExp(`name="source_page" value="${sourcePage}"`, "i"), path);
    assert.match(html, new RegExp(`name="source_cta" value="${sourceCta}"`, "i"), path);
    assert.match(html, /OWNER PREVIEW — LEAD CAPTURE NOT CONNECTED/i, path);
    assert.match(html, /Contact details are not sent or stored/i, path);
  }

  const portfolio = await (await render("/problems-we-solve/project-portfolio-roi")).text();
  const internalFunction = await (await render("/problems-we-solve/internal-function-performance")).text();
  assert.doesNotMatch(portfolio, /strategy-gap-book\.png/i);
  assert.doesNotMatch(internalFunction, /strategy-gap-book\.png/i);
});

test("keeps static problem media inert and limits spotlight feedback to linked cards", async () => {
  const css = readFileSync(new URL("../app/problem-pages.css", import.meta.url), "utf8");
  assert.doesNotMatch(css, /\.problem-(?:hero-media|clipped-media|section-outcome)[^\n,{]*:hover/i);
  assert.doesNotMatch(css, /animation:[^;]*infinite/i);
  assert.match(css, /prefers-reduced-motion[\s\S]*\.problem-site \.glow-card::before/i);

  const portfolio = await (await render("/problems-we-solve/project-portfolio-roi")).text();
  assert.match(portfolio, /<a href="\/roi-driven-project-portfolio-services" class="problem-link-card">/i);
  assert.match(portfolio, /<a href="\/results\/methodology" class="problem-link-card">/i);
  assert.match(portfolio, /<a href="\/resources\/assessments\/portfolio-roi-diagnostic" class="problem-link-card">/i);
});

test("shows the authentic founder portrait without treating founder authority as client proof", async () => {
  const home = await (await render("/")).text();
  assert.match(home, /person-img-with-orange-back\.webp/i);
  assert.match(home, /Founder authority—not client proof/i);

  const founder = await (await render("/founder-jason-scott")).text();
  assert.match(founder, /Jason-Scott-120VC-CEO-Founder-img\.webp/i);
  assert.match(founder, /J\. Scott, founder and CEO of 120VC/i);
});

test("keeps the consultation request progressive and honest about its prototype outcome", async () => {
  const response = await render("/consultation");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Diagnose where execution is breaking/i);
  assert.match(html, /First name/i);
  assert.match(html, /Last name/i);
  assert.match(html, /What are you accountable for delivering/i);
  assert.match(html, />Continue</i);
  assert.match(html, /prepares a direct email request/i);
  assert.doesNotMatch(html, /Your request has been submitted/i);
});

test("ships social metadata, canonical routes, and structured data", async () => {
  const home = await (await render("/")).text();
  assert.match(home, /application\/ld\+json/);
  assert.match(home, /"@type":"Organization"/);
  assert.match(home, /og\.png/);

  const faq = await (await render("/faq")).text();
  assert.match(faq, /"@type":"FAQPage"/);

  const consultation = await (await render("/consultation")).text();
  assert.match(consultation, /rel="canonical" href="https:\/\/www\.120vc\.com\/consultation"/i);

  const contact = await (await render("/contact")).text();
  assert.match(contact, /rel="canonical" href="https:\/\/www\.120vc\.com\/consultation"/i);
  assert.match(contact, /name="robots" content="noindex, follow"/i);

  const held = await (await render("/privacy")).text();
  assert.match(held, /name="robots" content="noindex, nofollow"/i);

  const sitemapResponse = await render("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  assert.doesNotMatch(sitemap, /\/privacy<|\/terms<|\/cookie-policy</i);
});

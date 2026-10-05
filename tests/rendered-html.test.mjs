import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import test from "node:test";
import { toolkitTools, toolHref } from "../app/data/toolkit-manifest.ts";

const readSource = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("all toolkit routes render the shared shell, complete navigation and a no-script fallback", async () => {
  for (const id of ["home", ...toolkitTools.map(tool => tool.id)]) {
    const { status, html } = await render(toolHref(id));
    assert.equal(status, 200);
    assert.match(html, new RegExp(`data-toolkit="${id}"`));
    assert.equal((mainMarkup(html).match(/<h1\b/g) || []).length, 1);
    assert.match(html, /<noscript>[\s\S]*need JavaScript[\s\S]*weekly rhythm guide/);
    for (const tool of toolkitTools) assert.ok(html.includes(`href="${toolHref(tool.id)}"`));
    assert.doesNotMatch(mainMarkup(html), /Interactive tool not available|tool is not yet available/);
  }
});

function findSourceFiles(path) {
  const directory = new URL(`../${path}/`, import.meta.url);
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = `${path}/${entry.name}`;
    if (entry.isDirectory()) return findSourceFiles(entryPath);
    return /\.(?:ts|tsx|mjs)$/.test(entry.name) ? [entryPath] : [];
  });
}

let workerPromise;
const renderedPages = new Map();

async function getWorker() {
  if (!workerPromise) {
    const workerUrl = new URL("../dist/server/index.js", import.meta.url);
    workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
    workerPromise = import(workerUrl.href).then(({ default: worker }) => worker);
  }
  return workerPromise;
}

async function render(path = "/") {
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

function extractElement(html, tag, className) {
  const classLookahead = className ? `(?=[^>]*class="[^"]*\\b${className}\\b[^"]*")` : "";
  const match = html.match(new RegExp(`<${tag}\\b${classLookahead}[^>]*>[\\s\\S]*?<\\/${tag}>`, "i"));
  assert.ok(match, `expected <${tag}>${className ? `.${className}` : ""}`);
  return match[0];
}

function mainMarkup(html) {
  return extractElement(html, "main");
}

function majorSections(html) {
  const main = mainMarkup(html);
  const stack = [];
  const sections = [];

  for (const match of main.matchAll(/<\/?section\b[^>]*>/gi)) {
    if (match[0].startsWith("</")) {
      const opening = stack.pop();
      assert.ok(opening, "encountered a closing </section> without an opening tag");
      if (opening.major) sections.push({ start: opening.start, end: match.index + match[0].length });
    } else {
      stack.push({ start: match.index, major: /\bdata-major-section(?:=|\s|>)/i.test(match[0]) });
    }
  }

  assert.equal(stack.length, 0, "encountered an unclosed <section>");
  return sections.sort((a, b) => a.start - b.start).map(({ start, end }) => main.slice(start, end));
}

function attributeValues(markup, attribute) {
  return [...markup.matchAll(new RegExp(`${attribute}="([^"]+)"`, "g"))].map((match) => match[1]);
}

function assertOrdered(markup, needles, label) {
  let previous = -1;
  for (const needle of needles) {
    const index = markup.indexOf(needle);
    assert.ok(index > previous, `${label}: ${needle} must follow the previous item`);
    previous = index;
  }
}

function assertOnePrimaryActionPerSection(html, label) {
  const sections = majorSections(html);
  assert.ok(sections.length > 0, `${label}: expected at least one major section`);
  for (const [index, section] of sections.entries()) {
    const actions = (section.match(/data-primary-action/g) || []).length;
    assert.ok(actions <= 1, `${label}: section ${index + 1} exposes ${actions} primary actions`);
  }
}

function assertSignalsMapToControls(markup, label) {
  for (const attribute of ["data-primary-action", "data-secondary-action", "data-choice-action"]) {
    const signals = (markup.match(new RegExp(attribute, "g")) || []).length;
    const controls = (markup.match(new RegExp(`<(?:a|button)\\b[^>]*${attribute}`, "gi")) || []).length;
    assert.equal(controls, signals, `${label}: every ${attribute} signal must be on a link or button`);
  }
}

function assertHeadlineStructure(markup, label) {
  assert.equal((markup.match(/<h1\b/gi) || []).length, 1, `${label}: expected exactly one H1`);
  for (const heading of markup.matchAll(/<h[12]\b[^>]*>[\s\S]*?<\/h[12]>/gi)) {
    assert.doesNotMatch(heading[0], /<br\b/i, `${label}: headings must wrap naturally rather than use hard line breaks`);
  }
}

function visibleText(markup) {
  return markup
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/(?:&#x27;|&#39;|&apos;)/gi, "'")
    .replace(/(?:&#x2014;|&mdash;)/gi, "—")
    .replace(/(?:&#x2013;|&ndash;)/gi, "–")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .replace(/\s+([.,;:!?])/g, "$1")
    .trim();
}

function primaryHero(html) {
  if (html.includes('class="tk-page-heading"')) return extractElement(html, "header", "tk-page-heading");
  const [hero] = majorSections(html);
  assert.ok(hero, "expected a primary hero section");
  return hero;
}

function assertExactH1(markup, expected, label) {
  const h1 = extractElement(markup, "h1");
  assert.equal(visibleText(h1), expected, `${label}: canonical H1`);
}

function assertAccessibleLocalImages(markup, label) {
  const localImages = [...markup.matchAll(/<img\b[^>]*\bsrc="(\/images\/[^"]+)"[^>]*>/gi)];
  assert.ok(localImages.length > 0, `${label}: expected at least one local editorial image`);
  for (const [tag, src] of localImages) {
    assert.match(tag, /\balt="[^"]*"/i, `${label}: ${src} needs an alt attribute`);
    assert.match(tag, /\bwidth="\d+"/i, `${label}: ${src} needs an explicit width`);
    assert.match(tag, /\bheight="\d+"/i, `${label}: ${src} needs an explicit height`);
  }
}

const newSitemapSlugs = [
  "execution-leadership-coaching",
  "embedded-execution-leadership",
  "resources/guides/weekly-operating-rhythm",
  "resources/guides/ownership-across-teams",
  "resources/insights/why-digital-transformations-stall",
  "resources/insights/when-to-bring-in-a-program-management-consultant"
];

const internalGovernanceCopy = /\[APPROVAL REQUIRED\]|PLACEHOLDER TESTIMONIAL|OWNER PREVIEW|LEAD CAPTURE NOT CONNECTED|publication hold|publishing gate|current publishing status|client-specific proof is still gated|content governance|activation status|legal publishing hold|owner-only prototype|remain(?:s)? (?:held|disabled)|approval-dependent|approval-controlled|public interactive implementations remain subject|requires (?:legal )?approval|before (?:public )?(?:launch|publication|activation)|must (?:come from|be supplied and approved)/i;

const publicPlaceholderCopy = /\[APPROVAL REQUIRED\]|\bPLACEHOLDER\b|PLACEHOLDER TESTIMONIAL|FICTIONAL DEMO|ILLUSTRATIVE CASE STUD(?:Y|IES)|OWNER PREVIEW|\bLOREM IPSUM\b|\bTBD\b|\bTODO\b|COMING SOON|UNDER CONSTRUCTION|NOT APPROVED FOR (?:PUBLICATION|PUBLIC)/i;

const canonicalPrimaryCopy = [
  {
    "label": "Home",
    "path": "/",
    "h1": "Strategy execution that delivers on your commitments.",
    "opening": "120VC works alongside enterprise leaders to deliver the initiatives they’ve committed to.",
    "action": "Let’s Talk"
  },
  {
    "label": "What We Solve",
    "path": "/problems-we-solve",
    "h1": "Your strategy is clear. Why isn't it getting executed?",
    "opening": "The strategy execution gap appears when agreed priorities lose momentum between leadership decisions and the work your teams deliver.",
    "action": "See the five problems"
  },
  {
    "label": "What We Do",
    "path": "/leadership-services",
    "h1": "Execution Leadership, from coaching to leading the work.",
    "opening": "Choose the level of involvement your team needs to turn commitments into delivered outcomes.",
    "action": "Find your starting point"
  },
  {
    "label": "How It Works",
    "path": "/leadership-system",
    "h1": "The Execution Leadership System: a shared way to turn strategy into results.",
    "opening": "A practical operating model for how leaders align their teams, make decisions, and follow through on commitments.",
    "action": "See how it works"
  },
  {
    "label": "Results",
    "path": "/results",
    "h1": "Know what evidence to ask for.",
    "opening": "Looking for experience relevant to your priorities? Talk with us about your situation and the client evidence available to review."
  },
  {
    "label": "Resources",
    "path": "/resources",
    "h1": "Practical tools and ideas for better strategy execution.",
    "opening": "Frameworks, step-by-step guides, and insights to help your team set priorities, make decisions, and follow through.",
    "action": "Explore the library"
  },
  {
    "label": "Contact",
    "path": "/contact",
    "h1": "What does your team need to deliver?",
    "opening": "Tell us what's at stake, what's getting stuck, and where you need support.",
    "action": "Start the request"
  },
  {
    "label": "About",
    "path": "/about",
    "h1": "Meet the people behind 120VC.",
    "opening": "We lead critical initiatives with enterprise teams and build the leadership practices that sustain execution.",
    "action": "Meet J. Scott"
  }
];

const canonicalOfferAndToolHeadlines = [
  ["Leadership Team Transformation", "/transformation-leadership-team-development-coaching-and-program", "Leadership team development that changes how executives run the business together."],
  ["ELPA", "/executive-leadership-coaching-and-development-performance-accelerator", "Install the Execution Leadership System in your team's daily work."],
  ["Enterprise Transformation", "/enterprise-digital-transformation", "Business transformation that becomes how the business actually operates."],
  ["Project Portfolio Services", "/roi-driven-project-portfolio-services", "Project portfolio management that makes every initiative earn its funding."],
  ["Project Leadership Managed Services", "/project-leadership-managed-services", "Enterprise project management for initiatives that cannot afford to drift."],
  ["Smartsheet Portfolio Visibility", "/smartsheet-dashboards", "Smartsheet project portfolio management."],
  ["Prioritization Matrix", "/resources/tools/2x2-prioritization-matrix", "2×2 Focus Board"],
  ["1-3-1 Decision Builder", "/resources/tools/1-3-1-decision-builder", "1–3–1 Decision Builder"],
  ["Weekly Team DOING", "/resources/tools/weekly-team-doing", "Weekly Team DOING"],
];

const canonicalOfferActions = [
  ["Leadership Team Transformation", "/transformation-leadership-team-development-coaching-and-program", "Discuss Your Leadership Team"],
  ["ELPA", "/executive-leadership-coaching-and-development-performance-accelerator", "Discuss installation"],
  ["Enterprise Transformation", "/enterprise-digital-transformation", "Discuss Your Transformation"],
  ["Project Portfolio Services", "/roi-driven-project-portfolio-services", "Discuss Your Portfolio"],
  ["Project Leadership Managed Services", "/project-leadership-managed-services", "Discuss the Initiative"],
  ["Smartsheet Portfolio Visibility", "/smartsheet-dashboards", "Discuss Portfolio Visibility"],
];

const searchIntentContracts = [
  [
    "/",
    "Strategy Execution for Enterprise Teams | 120VC",
    [
      "Execution Leadership",
      "strategy execution",
      "enterprise leaders",
      "organizational alignment",
      "leadership accountability",
      "decision rights",
      "too many priorities",
      "strategy implementation",
      "disciplined execution",
      "operating model",
      "operating rhythm",
      "executive team coaching",
      "project portfolio management",
      "enterprise transformation",
      "strategy execution framework"
    ]
  ],
  [
    "/problems-we-solve",
    "The Strategy Execution Gap — Problems We Solve | 120VC",
    [
      "strategy execution gap"
    ]
  ],
  [
    "/leadership-services",
    "Execution Leadership — Coaching, System and Embedded Leadership | 120VC",
    [
      "Execution Leadership Coaching",
      "Execution Leadership System",
      "Embedded Execution Leadership"
    ]
  ],
  [
    "/leadership-system",
    "Execution Leadership System — A Shared Operating Model | 120VC",
    [
      "Execution Leadership System",
      "ELPA",
      "operating rhythm"
    ]
  ],
  [
    "/resources",
    "Strategy Execution Resources — Frameworks, Guides and Insights | 120VC",
    [
      "strategy execution",
      "prioritization",
      "decision"
    ]
  ],
  [
    "/execution-leadership-coaching",
    "Execution Leadership Coaching for Executive Teams | 120VC",
    [
      "Execution Leadership Coaching",
      "executive team"
    ]
  ],
  [
    "/embedded-execution-leadership",
    "Embedded Execution Leadership for Initiatives and Portfolios | 120VC",
    [
      "portfolios",
      "transformation"
    ]
  ],
  [
    "/executive-leadership-coaching-and-development-performance-accelerator",
    "ELPA — Execution Leadership System Installation | 120VC",
    [
      "Executive Leadership Performance Accelerator"
    ]
  ],
  [
    "/enterprise-digital-transformation",
    "Business Transformation Consulting for Measurable Value | 120VC",
    [
      "business transformation consulting"
    ]
  ],
  [
    "/roi-driven-project-portfolio-services",
    "Project Portfolio Management & PMO Consulting | 120VC",
    [
      "project portfolio management",
      "resource allocation"
    ]
  ]
];

const problemAliases = [
  {
    path: "/problems-we-solve/strategy-execution-gap",
    condition: "strategy-drift",
    label: "Priorities keep changing",
    headline: /The strategy is clear\. The work keeps drifting/i,
    image: "/images/problems/strategy-overload.jpg",
  },
  {
    path: "/problems-we-solve/leadership-team-alignment",
    condition: "leadership-fragmentation",
    label: "Leaders pull in different directions",
    headline: /Leaders agree, then execute separately/i,
    image: "/images/problems/alignment-friction.jpg",
  },
  {
    path: "/problems-we-solve/transformation-execution",
    condition: "transformation-stall",
    label: "Transformation loses momentum",
    headline: /Launched\. The work stayed the same/i,
    image: "/images/problems/transformation-fatigue.jpg",
  },
  {
    path: "/problems-we-solve/project-portfolio-roi",
    condition: "portfolio-overload",
    label: "Too many projects compete for capacity",
    headline: /Too much work competes for the same capacity/i,
    image: "/images/problems/portfolio-review.jpg",
  },
  {
    path: "/problems-we-solve/internal-function-performance",
    condition: "reactive-function",
    label: "Internal teams are stuck reacting",
    headline: /The team stays busy\. The value stays unclear/i,
    image: "/images/problems/function-overload.jpg",
  },
];

test("test harness preserves major-section boundaries across nested markup", () => {
  const fixture = '<main><section data-major-section="true" data-journey-stage="recognize"><div><section><p>nested support</p></section></div><p>outer ending</p></section><section data-major-section="true" data-journey-stage="act"><p>next step</p></section></main>';
  const sections = majorSections(fixture);
  assert.equal(sections.length, 2);
  assert.match(sections[0], /nested support[\s\S]*outer ending/);
  assert.doesNotMatch(sections[0], /next step/);
  assert.match(sections[1], /next step/);
  assert.deepEqual(attributeValues(fixture, "data-journey-stage"), ["recognize", "act"]);
});

test("renders the canonical buyer-first copy hierarchy on primary destinations", async () => {
  for (const { label, path, h1, opening } of canonicalPrimaryCopy) {
    const { status, html } = await render(path);
    assert.equal(status, 200, path);
    const hero = primaryHero(html);
    assertExactH1(hero, h1, label);
    assert.ok(visibleText(hero).includes(opening), `${label}: canonical opening copy`);
  }
});

test("keeps navigation labels as orientation and primary H1s as buyer-facing promises", async () => {
  const weakPageLabelHeadlines = /^(?:the five problems we solve|how we help\b|how we install\b|case studies(?:\b| that)|tools and guides\b|consultation\b)/i;

  for (const { label, path } of canonicalPrimaryCopy.filter(({ path }) => path !== "/")) {
    const h1 = visibleText(extractElement(primaryHero((await render(path)).html), "h1"));
    assert.notEqual(h1.toLowerCase(), label.toLowerCase(), `${label}: the H1 must do more than repeat the navigation label`);
    assert.doesNotMatch(h1, weakPageLabelHeadlines, `${label}: the H1 must lead with a buyer-relevant promise`);
  }
});

test("uses the canonical buyer-facing H1 on priority offer and tool pages", async () => {
  for (const [label, path, h1] of canonicalOfferAndToolHeadlines) {
    const { status, html } = await render(path);
    assert.equal(status, 200, path);
    assertExactH1(primaryHero(html), h1, label);
  }
});

test("keeps each priority page aligned to its configured search intent", async () => {
  for (const [path, expectedTitle, phrases] of searchIntentContracts) {
    const { status, html } = await render(path);
    assert.equal(status, 200, path);
    assert.equal(visibleText(extractElement(html, "title")), expectedTitle, `${path}: SEO title`);
    const body = visibleText(mainMarkup(html)).toLowerCase();
    for (const phrase of phrases) {
      assert.ok(body.includes(phrase.toLowerCase()), `${path}: visible copy includes ${phrase}`);
    }
  }
});

test("primary heroes begin with the page answer rather than decorative microcopy", async () => {
  const routes = [
    ...canonicalPrimaryCopy.map(({ label, path }) => [label, path]),
    ...canonicalOfferAndToolHeadlines.map(([label, path]) => [label, path]),
  ];

  for (const [label, path] of routes) {
    const hero = primaryHero((await render(path)).html);
    assert.doesNotMatch(hero, /aria-label="Breadcrumb"|problem-breadcrumb/i, `${label}: no hero breadcrumb`);
    if (path !== "/") assert.doesNotMatch(hero, /class="[^"]*(?:orientation-label|hero-eyebrow|hero-kicker|hero-label)[^"]*"/i, `${label}: no decorative label before the answer`);
    assert.doesNotMatch(hero, /<small\b/i, `${label}: no fine-print tagline in the hero`);
  }
});

test("uses concise consultation vocabulary without introducing the proprietary system in the CTA", async () => {
  for (const { label, path, action } of canonicalPrimaryCopy) {
    if (!action) continue;
    const heroText = visibleText(primaryHero((await render(path)).html));
    assert.ok(heroText.toLowerCase().includes(action.toLowerCase()), `${label}: ${action}`);
  }

  for (const [label, path, action] of canonicalOfferActions) {
    const heroText = visibleText(primaryHero((await render(path)).html));
    assert.ok(heroText.toLowerCase().includes(action.toLowerCase()), `${label}: ${action}`);
  }

  const source = [
    readSource("app/page.tsx"),
    readSource("app/site-data.ts"),
    readSource("app/components/site-header.tsx"),
    readSource("app/components/site-footer.tsx"),
  ].join("\n");
  assert.doesNotMatch(source, /Book a Leadership System Consultation/i, "consultation CTA must remain human and familiar");
  assert.match(readSource("app/components/consultation-form.tsx"), /Prepare email request/i, "the form action describes its email-draft outcome honestly");

  const { html } = await render("/");
  const header = extractElement(html, "header", "global-header");
  assert.match(header, /href="\/contact(?:\?[^"]*)?"[^>]*>Let(?:&#x27;|&#39;|&apos;|')s Talk/i, "the persistent action opens contact");
  assert.equal((visibleText(mainMarkup(html)).match(/Let[’']s Talk/g) || []).length, 2, "both homepage contact moments use the same action");
});

test("renders the new sitemap as a complete commercial buyer journey", async () => {
  const { status, html } = await render("/");
  assert.equal(status, 200);
  const main = mainMarkup(html);
  assertExactH1(primaryHero(html), canonicalPrimaryCopy[0].h1, "home");
  const { homepage } = await import(new URL("../app/data/homepage-content.ts", import.meta.url));
  assertOrdered(visibleText(main), [homepage.hero, homepage.problem, homepage.fourTs, homepage.why, homepage.system, homepage.offers, homepage.roles, homepage.resources, homepage.close].map(section => section.title), "homepage chapters");
  assert.equal(majorSections(html).length, 9, "nine clear chapters without extra transition sections");
  assert.equal((main.match(/class="home-logo-item"/g) || []).length, 34);
  assert.equal((main.match(/class="homepage-problem-card"/g) || []).length, 4);
  assert.equal((main.match(/class="four-ts-card"/g) || []).length, 4);
  assert.equal((main.match(/class="homepage-offer-card"/g) || []).length, 3);
  assert.equal((main.match(/class="homepage-offer-links"/g) || []).length, 3);
  for (const title of ["Technology", "Talent", "Training", "Transformation"]) assert.match(main, new RegExp(title));
  for (const href of ["/execution-leadership-coaching", "/leadership-system", "/embedded-execution-leadership"]) assert.match(main, new RegExp('href="' + href + '"'));
  const offers = majorSections(html).find(section => section.includes('id="what-we-do"'));
  assert.match(offers, /Executive Leadership Performance Accelerator \(ELPA\) installs the system/, "ELPA is explained within the System offer, not a fourth service");
  assert.match(offers, /href="\/executive-leadership-coaching-and-development-performance-accelerator"/, "the System card links to its installation method");
  assertOnePrimaryActionPerSection(html, "homepage");
  assertSignalsMapToControls(main, "homepage");
  assertHeadlineStructure(main, "homepage");
  assertAccessibleLocalImages(main, "homepage");
  assert.doesNotMatch(main, internalGovernanceCopy);
  assert.doesNotMatch(main, /Illustrative Case Study|42%|data-review-panel/);
});

test("makes homepage problem choices visible and links directly to each populated explanation", async () => {
  const main = mainMarkup((await render("/")).html);
  const { homepage } = await import(new URL("../app/data/homepage-content.ts", import.meta.url));
  const cards = [...main.matchAll(/<article\b[^>]*class="homepage-problem-card"[^>]*>[\s\S]*?<\/article>/g)].map(match => match[0]);
  assert.equal(cards.length, 4);
  for (const [index, card] of cards.entries()) {
    const expected = homepage.problem.cards[index];
    assert.equal((card.match(/<h3>/g) || []).length, 1);
    assert.ok(visibleText(card).includes(expected.title));
    assert.ok(visibleText(card).includes(expected.description));
    assert.ok(card.includes(`href="${expected.href}"`));
    assert.equal((card.match(/<a\b/g) || []).length, 1, "one whole-card native destination, no nested links");
    assert.doesNotMatch(card, /aria-label=/, "do not replace the full readable card content with a short link name");
    assert.ok(card.includes(`class="homepage-problem-keyword">${expected.title.split(/(?<=[:?]) /)[0]}</span>`));
    assert.doesNotMatch(card, /<button|<details|aria-expanded|\shidden=/, "essential meaning does not need interaction");
    const [path, id] = expected.href.split("#");
    const destination = (await render(path)).html;
    assert.match(destination, new RegExp(`<details[^>]*id="${id}"[^>]*open=""`), "the linked problem is already expanded");
  }
});

test("scopes the homepage spotlight to actionable cards and respects reduced motion", () => {
  const source = readSource("app/components/problem-spotlight-link.tsx");
  const css = readSource("app/homepage-refresh.css");
  assert.match(source, /onPointerMove=\{trackPointer\}/);
  assert.match(source, /reduceMotion \|\| event.pointerType !== "mouse"/);
  assert.doesNotMatch(source, /addEventListener|preventDefault|canvas|shaders-react/);
  assert.match(css, /homepage-problem-spotlight:focus-visible/);
  assert.match(css, /homepage-problem-spotlight\[data-reduced-motion\]::before[^}]*display: none/);
  assert.match(css, /homepage-problem-spotlight::after[^}]*pointer-events: none/);
});

test("keeps the homepage chapter order and approved-only proof architecture explicit", async () => {
  const homeSource = readSource("app/page.tsx");
  const proofComponent = readSource("app/components/featured-case-carousel.tsx");
  const kineticSource = readSource("app/components/kinetic-statement.tsx");
  const heroOutcomeSource = readSource("app/components/hero-outcome-rotation.tsx");
  const carouselSource = readSource("app/components/pain-point-carousel.tsx");
  const solutionSource = readSource("app/components/solution-scope-cards.tsx");
  const installationSource = readSource("app/components/installation-stepper.tsx");
  const css = readSource("app/hierarchy.css");
  const readerCss = readSource("app/reading-paths.css");

  assertOrdered(homeSource, ['id="execution-gap"', '<FourTs', 'id="why-120vc"', '<LogoMarquee', 'id="execution-leadership-system"', 'id="what-we-do"', 'id="who-we-help"', 'id="resources"', 'id="lets-talk"'], "homepage source chapters");
  assert.doesNotMatch(homeSource, /Not sure which scope fits\?|Bring the condition, not a predetermined offer\.|home-solution-routing/i, "the orphan service-routing line and wrapper are removed");
  assert.match(homeSource, /approvedHomepageCaseProof\.filter\(caseMayRenderForProductionAudience\)/, "local homepage and production both require approved results");
  assert.doesNotMatch(homeSource, /getHomepageCaseProof|KineticStatement|PainPointCarousel|SolutionScopeCards/, "homepage keeps visible direct choices rather than nested interactive readers");
  assertOrdered(homeSource, ["<IndustryStatistics", 'id="execution-gap"'], "industry context precedes problem recognition");
  assert.match(homeSource, /<CompanyTrackRecord/, "company-reported figures are restored through the development-only evidence gate");
  assert.match(carouselSource, /onPointerEnter=/i, "pain cards preview on fine-pointer hover");
  assert.match(carouselSource, /onPointerLeave=/i, "pain cards return after fine-pointer hover");
  assert.match(carouselSource, /onFocusCapture=/i, "pain-card hover behavior is mirrored for keyboard focus");
  assert.match(carouselSource, /onBlurCapture=/i, "pain-card focus preview returns when focus leaves");
  assert.match(kineticSource, /Get the right work done\./i);
  assert.match(kineticSource, /resource allocation, capacity planning, and decision-making/i);
  assert.doesNotMatch(kineticSource, /setInterval|linear\s+infinite|Pause statement/i, "the value transition reveals once instead of demanding ongoing attention");
  assert.match(heroOutcomeSource, /strategy into execution\.[\s\S]*priorities into action\.[\s\S]*decisions into ownership\.[\s\S]*work into outcomes\./i);
  assert.match(heroOutcomeSource, /index >= heroOutcomes\.length - 1/i, "the hero copy rotation reaches a deliberate stopping point");
  assert.doesNotMatch(heroOutcomeSource, /setInterval/i, "the hero copy does not loop indefinitely");
  assert.match(css, /\.home-kinetic-copy\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1\.1fr\)\s+minmax\(320px,\s*\.9fr\)/is, "the value transition has a clear headline-to-explanation reading order");
  assert.match(css, /\.home-stepper-tabs\s*\{[^}]*grid-template-columns:\s*repeat\(4,minmax\(0,1fr\)\)/is, "desktop installation tabs remain equal-width stages");
  assert.match(css, /\.home-stepper-tabs button\s*\{[^}]*width:\s*100%[^}]*min-width:\s*0/is, "stage labels cannot expand one tab beyond its grid track");
  assert.match(css, /\.commercial-home \.home-stepper-panel\s*\{[^}]*height:\s*560px[^}]*overflow:\s*hidden/is, "portrait photography cannot make one homepage stage longer than the others");
  assert.match(installationSource, /<dt>Inside the work<\/dt>[\s\S]*<dt>What this gives you<\/dt>/i, "each selected stage earns its interaction with operating detail and value");
  assert.match(proofComponent, /aria-roledescription="carousel"/i);
  assert.match(proofComponent, /aria-label="Previous case study"/i);
  assert.match(proofComponent, /aria-label="Next case study"/i);
  assert.doesNotMatch(proofComponent, /setInterval|autoPlay|autoplay/i, "featured cases remain manual");
  assert.match(proofComponent, /const \[current, setCurrent\] = useState\(0\)/i, "one carousel index owns the active case");
  assert.match(proofComponent, /const caseStudy = cases\[current\]/i);
  assert.match(proofComponent, /data-active="true"[\s\S]*aria-label=\{`Case \$\{current \+ 1\} of \$\{cases\.length\}/i, "only the current case enters the rendered reading path");
  assert.doesNotMatch(proofComponent, /useScrollScene|ProofComparison|case-story-nav|Scroll to advance|ProofStageIcon|ProofPointIcon/, "cases have no nested story controls or scroll runway");
  assert.match(proofComponent, /className="case-reader-value">\{caseStudy.resultValue\}/, "the actual metric remains immediately readable without animation");
  assert.equal((proofComponent.match(/className="case-reader-result"/g) || []).length, 1, "each case renders one primary result");
  assert.doesNotMatch(proofComponent, /supportingResults\.map/, "secondary metrics stay off the homepage");
  assert.match(proofComponent, /Client story/);
  assert.match(proofComponent, /Illustrative placeholder — not client proof and not approved for publication/i, "development examples are unmistakably marked");
  assert.match(proofComponent, /proofStatus === "approved" && caseStudy\.quote/, "invented demo testimonials are not shown");
  assertOrdered(proofComponent.slice(proofComponent.indexOf('className="case-reader-story"')), ["case-reader-context", "<h3>", "case-reader-result", "case-reader-intervention", '<details className="case-reader-detail"', "<dt>Before", "<dt>Intervention", "<dt>After", "case-reader-link"], "result and intervention precede optional supporting detail");
  assertOrdered(proofComponent.slice(proofComponent.indexOf("export function FeaturedCaseCarousel")), ["case-reader-story", "case-reader-controls"], "browsing follows the case in the reading path");
  assert.match(proofComponent, /cases\.length > 1 && <div className="case-reader-controls"/, "one case does not show meaningless browsing controls");
  assert.match(proofComponent, /if \(!caseStudy\) return null/, "empty governed proof cannot crash the shared carousel");
  assert.match(readerCss, /\.case-reader-narrative dd\s*\{[^}]*font-size:\s*17px/is);
  assert.match(proofComponent, /className="case-reader-after"[\s\S]*?<strong>\{caseStudy\.afterState\}<\/strong>/, "expanded detail preserves the full outcome");
  assert.match(readerCss, /\.case-reader-narrative > div \+ div\s*\{[^}]*border-top:/is, "quiet dividers separate the narrative beats");
  assert.match(readerCss, /\.case-reader-change dt\s*\{[^}]*var\(--accent-on-dark\)/is, "orange distinguishes the intervention");
  assert.match(readerCss, /\.case-reader-result\s*\{[^}]*border-inline-start:[^;]*var\(--sage\)[^}]*background:/is, "one restrained result surface carries the payoff");
  assert.match(readerCss, /\.system-reader-item\[open\]\s*\{[^}]*border-inline-start-color:[^}]*background:/is, "expanded rows are distinguished by both an edge and a surface");
  assert.match(readerCss, /\.system-reader-detail \.system-reader-shift\s*\{[^}]*border-top:[^}]*font-size:/is, "the practical takeaway is distinct from its explanation");
  assert.match(readerCss, /\.case-reader-controls button\s*\{[^}]*min-height:\s*44px/is);
  assert.doesNotMatch(readerCss, /position:\s*sticky|\d+svh|grid-template-columns/, "the new readers have neither artificial scroll length nor competing columns");
  for (const redundantLabel of ["What gets in the way", "How we help", "Client results", "How it works", "The next useful step"]) {
    assert.doesNotMatch(homeSource, new RegExp(`>${redundantLabel}<`, "i"), `${redundantLabel}: redundant homepage eyebrow removed`);
  }
  assert.doesNotMatch(solutionSource, /<small>\{scope\.label\}<\/small>/i, "service names do not repeat as eyebrows");
  assert.doesNotMatch(installationSource, /Step \{current\.number\}/i, "the active step does not add a redundant Step label");
  assert.match(carouselSource, /pain-card-cost[\s\S]*pain-card-change/i, "pain-card backs use natural editorial statements");
  assert.match(readSource("app/components/scroll-narrative-motion.tsx"), /motion.*reduce/, "scroll entrances retain their reduced-motion QA state");
  assert.match(proofComponent, /useHydratedReducedMotion\(\) \|\| forceReducedMotion/i);
  assert.match(proofComponent, /case_story_viewed[\s\S]*case_story_next[\s\S]*case_story_previous|case_story_next[\s\S]*case_story_previous[\s\S]*case_story_viewed/i);
  assert.match(proofComponent, /case_story_cta_clicked/i);
  assert.match(proofComponent, /sourcePage\?: "homepage" \| "results"/i, "shared case analytics identify the page that rendered the story");
  assert.match(proofComponent, /IntersectionObserver/i, "a case view is recorded only after the carousel enters the viewport");
  assert.match(readSource("app/components/results-experience.tsx"), /FeaturedCaseCarousel cases=\{cases\} sourcePage="results"/i);
  assert.match(readerCss, /prefers-reduced-motion:\s*reduce[\s\S]*animation:\s*none/is, "the complete reading path remains static under reduced motion");
  assert.match(css, /\.hierarchy-site \.heading-wide\s*\{[^}]*900px/is);
  assert.match(css, /\.hierarchy-site \.heading-medium\s*\{[^}]*780px/is);
  assert.match(css, /\.hierarchy-site \.heading-narrow\s*\{[^}]*620px/is);
});

test("gives conversion controls a contrasting and directional interaction system", async () => {
  const css = readSource("app/hierarchy.css");

  assert.match(css, /\.button-primary:hover,[\s\S]*?\.button-primary:focus-visible\s*\{[^}]*border-color:\s*var\(--ink\)[^}]*background:\s*var\(--white\)[^}]*color:\s*var\(--ink\)/is, "primary buttons reverse to a light high-contrast surface");
  assert.match(css, /\.button-light:hover,[\s\S]*?\.button-light:focus-visible\s*\{[^}]*background:\s*var\(--action-orange\)[^}]*color:\s*var\(--white\)/is, "light buttons reverse to the brand action surface");
  assert.match(css, /\.quiet-link:hover,[\s\S]*?\.quiet-link:focus-visible\s*\{[^}]*background:\s*var\(--ink-deep\)[^}]*color:\s*var\(--white\)/is, "quiet CTAs gain a visible surface rather than a minor shade change");
  assert.match(css, /\.quiet-link-light:hover,[\s\S]*?\.quiet-link-light:focus-visible\s*\{[^}]*background:\s*var\(--white\)[^}]*color:\s*var\(--ink\)/is, "quiet CTAs on dark surfaces reverse to light");
  assert.match(css, /\.global-header \.header-cta:hover,[\s\S]*?\.global-header \.header-cta:focus-visible\s*\{[^}]*background:\s*var\(--white\)[^}]*color:\s*var\(--ink\)/is, "the persistent header CTA uses the same contrast contract");
  assert.match(css, /\.hierarchy-site \.form-actions \.button-secondary:hover,[\s\S]*?\.hierarchy-site \.form-actions \.button-secondary:focus-visible\s*\{[^}]*background:\s*var\(--white\)[^}]*color:\s*var\(--ink\)/is, "secondary form buttons reverse against the dark form surface");
  assert.match(css, /span\[data-direction="down"\][^}]*transform:\s*translateY\(4px\)/is, "in-page arrows move downward");
  assert.match(css, /span\[data-direction="out"\][^}]*transform:\s*translate\(4px,\s*-4px\)/is, "external arrows move outward");
  assert.match(css, /span\[data-direction="left"\][^}]*transform:\s*translateX\(-5px\)/is, "back arrows move backward");
  assert.match(css, /prefers-reduced-motion:\s*reduce[\s\S]*:is\(\.button, \.quiet-link, \.home-section-link, \.home-solution-link\):hover > span\[aria-hidden="true"\][\s\S]*transform:\s*none\s*!important/is, "reduced motion retains color feedback without directional movement");

  for (const path of ["/", "/problems-we-solve", "/leadership-services", "/leadership-system", "/resources", "/contact"]) {
    const main = mainMarkup((await render(path)).html);
    for (const match of main.matchAll(/<span\b([^>]*)>(↓|↗|←)<\/span>/g)) {
      assert.match(match[1], /data-direction="(?:down|out|left)"/, `${path}: ${match[2]} needs an intentional movement direction`);
    }
  }
});

test("makes supporting labels and secondary actions readable before interaction", () => {
  const css = readSource("app/hierarchy.css");
  const sitemapCss = readSource("app/sitemap-refresh.css");
  assert.match(css, /--control-radius:\s*6px/);
  for (const selector of [".hierarchy-site .button", ".global-header .header-cta", ".quiet-link", ".home-section-link", ".home-solution-link", ".home-solution-disclosure"]) {
    const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.match(css, new RegExp(escaped + "\\s*\\{[^}]*border-radius:\\s*var\\(--control-radius\\)"), selector + ": consistent rounded control");
  }
  assert.match(css, /\.quiet-link\s*\{[^}]*min-height:\s*48px[^}]*border:\s*1px solid[^}]*font-size:\s*16px/s);
  assert.match(css, /\.home-section-link\s*\{[^}]*font-size:\s*17px/);
  assert.match(css, /\.quiet-link::after\s*\{\s*content:\s*none/, "no square underline layer across the rounded hover surface");
  for (const selector of [".home-solution-link", ".home-solution-disclosure"]) {
    const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const interaction = css.match(new RegExp(escaped + ":focus-visible\\s*\\{([^}]*)\\}"));
    assert.ok(interaction);
    assert.doesNotMatch(interaction[1], /padding|font-size|border-radius/, "feedback does not resize the target");
  }
  assert.match(css, /\.orientation-label\s*\{[^}]*font-size:\s*16px/s);
  assert.match(css, /\.home-solution-fit dt\s*\{[^}]*font-size:\s*16px/);
  assert.match(sitemapCss, /\.four-ts-label\s*\{[^}]*font-size:\s*17px/);
  assert.match(sitemapCss, /\.four-ts-card \.quiet-link\s*\{[^}]*font-size:\s*16px/);
  assert.match(sitemapCss, /small\.resource-category\s*\{[^}]*font-size:\s*16px/);
});

test("never renders demo or unapproved case proof to the production audience", async () => {
  const proof = await import(new URL("../app/data/homepage-case-proof.ts", import.meta.url));
  const proofSource = readSource("app/data/homepage-case-proof.ts");

  assert.equal(proof.demoHomepageCaseProof.length, 3);
  assert.equal(proof.getHomepageCaseProof("development").length, 3);
  assert.equal(proof.getHomepageCaseProof("test", true).length, 3, "review mode exposes demos outside production");
  assert.deepEqual(proof.getHomepageCaseProof("production"), []);
  assert.deepEqual(proof.getHomepageCaseProof("production", true), [], "review mode cannot bypass the production guard");
  assert.ok(proof.demoHomepageCaseProof.every((caseStudy) => caseStudy.proofStatus === "demo" && caseStudy.approvedForHomepage === false));
  assert.ok(proof.demoHomepageCaseProof.every((caseStudy) => caseStudy.clientLogo === null && caseStudy.clientName === null), "demo outcomes never attach to real client identity");
  assert.deepEqual(proof.demoHomepageCaseProof.map((caseStudy) => caseStudy.resultValue), ["42%", "31%", "2.3×"]);
  assert.ok(proof.demoHomepageCaseProof.every((caseStudy) => caseStudy.supportingResults.length === 2));
  assert.ok(proof.demoHomepageCaseProof.every((caseStudy) => caseStudy.beforePoints.length >= 3 && caseStudy.changePoints.length === 1 && caseStudy.afterPoints.length >= 3));
  assert.ok(proof.demoHomepageCaseProof.every((caseStudy) => caseStudy.quote && caseStudy.quoteRole && caseStudy.quoteOrganization));
  assert.equal(proof.homepageProductionProofRequirement, "PROOF CONTENT REQUIRED BEFORE PRODUCTION CONVERSION LAUNCH");
  assert.match(proofSource, /caseStudy\.proofStatus === "approved" && caseStudy\.approvedForHomepage === true/i);

  for (const path of ["/", "/?review=1"]) {
    const { html } = await render(path);
    const main = mainMarkup(html);
    assert.doesNotMatch(main, /home-client-results|FICTIONAL DEMO DATA|Faster cross-functional decision cycles|Less execution rework|Faster portfolio prioritization decisions/i, `${path}: development proof must be absent from production output`);
    assert.doesNotMatch(main, publicPlaceholderCopy, `${path}: proof placeholders must remain outside production output`);
  }

  const results = mainMarkup((await render("/results?review=1")).html);
  assert.doesNotMatch(results, /results-case-section|Illustrative Case Stud(?:y|ies)|\b\d+%\b|2\.3×/i, "production Results cannot expose review-mode proof");
  assert.doesNotMatch(results, publicPlaceholderCopy, "production Results cannot expose placeholder labels");
});

test("keeps industry statistics sourced, dated, and scoped to the research", async () => {
  const { industryStatistics } = await import(new URL("../app/data/evidence-statistics.ts", import.meta.url));
  assert.deepEqual(industryStatistics.map((stat) => stat.value), ["67%", "~70%"]);
  assert.ok(industryStatistics.every((stat) => stat.sourceHref.startsWith("https://") && stat.checkedOn === "2026-09-22"));

  for (const path of ["/", "/problems-we-solve"]) {
    const { status, html } = await render(path);
    assert.equal(status, 200);
    const statistics = extractElement(mainMarkup(html), "aside", "evidence-industry");
    assert.equal((statistics.match(/class="evidence-stat"/g) || []).length, 2);
    for (const stat of industryStatistics) {
      assert.ok(statistics.includes(stat.value));
      assert.ok(statistics.includes(stat.label));
      assert.ok(statistics.includes(stat.context));
      assert.ok(statistics.includes(`href="${stat.sourceHref}"`));
      const sourceLink = [...statistics.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/g)].map((match) => match[0]).find((link) => link.includes(`href="${stat.sourceHref}"`));
      assert.ok(sourceLink, `${path}: publisher must link directly to the cited piece`);
      assert.match(sourceLink, /target="_blank"/);
      assert.match(sourceLink, /rel="noopener noreferrer"/);
      assert.match(sourceLink, /opens in a new tab/);
      assert.ok(sourceLink.includes(stat.sourceTitle));
      assert.ok(visibleText(sourceLink).includes(stat.sourceLabel));
    }
    assert.match(statistics, /Historical estimates from different research contexts/);
    assert.match(statistics, /not a failure rate for every project or a direct comparison with 120VC/);
    assert.doesNotMatch(statistics, /69%|70% of projects fail|never get executed/);
  }
});

test("keeps company statistics in local design review, never production or RSC output", async () => {
  const { getCompanyStatisticsForReview } = await import(new URL("../app/data/evidence-statistics.ts", import.meta.url));
  const statistics = getCompanyStatisticsForReview("development", true);
  assert.deepEqual(statistics.map((stat) => stat.value), ["227%", "98%", "25+"]);
  assert.ok(statistics.every((stat) => /to be confirmed/.test(stat.qualification)));
  assert.deepEqual(getCompanyStatisticsForReview("development"), []);
  assert.deepEqual(getCompanyStatisticsForReview("development", false), []);
  for (const environment of ["production", "test", undefined]) {
    assert.deepEqual(getCompanyStatisticsForReview(environment), []);
    assert.deepEqual(getCompanyStatisticsForReview(environment, true), []);
  }
  const component = readSource("app/components/evidence-statistics.tsx");
  assert.match(component, /Review only · Not approved for publication/);
  assert.match(component, /Company-reported figures; not independently validated/);
  for (const path of ["/", "/?review=1", "/results", "/results?review=1"]) {
    const { html } = await render(path);
    // Includes serialized RSC data, not just the visible main element.
    assert.doesNotMatch(html, /evidence-track-record|227%|98%|25\+|Review only · Not approved for publication/);
  }
});

test("does not leak placeholder or owner-review language across public routes", async () => {
  const source = readSource("app/site-data.ts");
  const slugs = [...new Set([...source.matchAll(/^\s+slug: "([^"]+)"/gm)].map((match) => match[1]).concat(newSitemapSlugs))];
  const paths = ["/", "/contact", "/consultation", "/problems-we-solve", ...slugs.map((slug) => `/${slug}`)];
  const failures = [];

  for (const path of paths) {
    const { status, html } = await render(path);
    if (status !== 200) {
      failures.push(`${path}: status ${status}`);
      continue;
    }
    const match = visibleText(mainMarkup(html)).match(publicPlaceholderCopy);
    if (match) failures.push(`${path}: leaked ${match[0]}`);
  }

  assert.deepEqual(failures, []);
});

test("uses the complete sitemap navigation while keeping proof approval independent", async () => {
  const { html } = await render("/");
  const navigationSource = readSource("app/data/primary-experience.ts");
  const proofSource = readSource("app/data/proof-governance.ts");
  const experienceLogoSource = readSource("app/data/approved-experience-logos.ts");
  const header = extractElement(html, "header", "global-header");
  const desktopNav = extractElement(header, "nav", "desktop-nav");
  const footer = extractElement(html, "footer", "master-footer");

  const declaredNavigation = navigationSource.slice(navigationSource.indexOf("export const primaryNavigation"), navigationSource.indexOf("export const problemRouteConditions"));
  assertOrdered(declaredNavigation, ["What We Solve", "What We Do", "How It Works", "Results", "Resources"], "five declared primary destinations");
  assert.equal((declaredNavigation.match(/href:/g) || []).length, 5);
  assert.match(proofSource, /approvedLogoProof:\s*readonly ApprovedLogoProof\[\]\s*=\s*\[\]/i);
  assert.match(proofSource, /approvedCaseProof:\s*readonly ApprovedCaseProof\[\]\s*=\s*\[\]/i);
  assert.equal((experienceLogoSource.match(/src:\s*"\/images\/client-logos\//g) || []).length, 17, "all 17 supplied experience marks are registered");
  assert.match(experienceLogoSource, /does not claim endorsement or a specific business outcome/i);
  assert.match(experienceLogoSource, /120vc-approved-client-logos\.zip \/ manifest\.csv/i);
  assert.match(proofSource, /logoEvidenceIsComplete/i);
  assert.match(proofSource, /caseEvidenceIsComplete/i);
  assert.match(proofSource, /publicProofPresentationReady\s*=\s*false/i);
  assert.match(proofSource, /hasApprovedFeaturedProof\s*=\s*publicProofPresentationReady[\s\S]*approvedHomepageLogos\.length\s*>\s*0[\s\S]*approvedHomepageCases\.length\s*>\s*0/i);
  for (const field of ["status", "baseline", "intervention", "firstOperatingShift", "qualification", "clientVoice", "sourceReference", "homepageLogo", "homepageCase", "resultsIndex"]) {
    assert.match(proofSource, new RegExp(`${field}:`), `proof governance requires ${field}`);
  }

  assertOrdered(desktopNav, ["What We Solve", "What We Do", "How It Works", "Results", "Resources"], "primary navigation");
  assert.equal((desktopNav.match(/<a\b/gi) || []).length, 5, "all five sitemap destinations are navigable");
  assert.doesNotMatch(desktopNav, />\s*(?:For Leaders|About|J\.Scott|FAQ)\s*</i);
  assert.doesNotMatch(desktopNav, /<button\b|aria-expanded|mega-menu/i, "desktop navigation uses direct links, not disclosure menus");
  assert.match(header, /href="\/contact(?:\?[^"]*)?"/i);
  assert.match(header, /aria-expanded="false" aria-controls="mobile-navigation"/i);

  assert.match(footer, /Turn strategy into measurable results/i);
  assertOrdered(footer, ["Explore", "Company"], "footer columns");
  assert.match(footer, /What We Do/i);
  assert.match(footer, />Results</i);
  for (const label of ["About 120VC", "J. Scott", "For Leaders", "Careers", "Contact", "FAQ", "Privacy", "Terms", "Cookie Policy", "GSD Shop"]) {
    assert.match(footer, new RegExp(label.replace(".", "\\."), "i"), `footer: ${label}`);
  }
  assert.match(footer, /coach enterprise leaders, install a shared way to execute/i);
});

test("makes each primary destination answer its navigation promise without hero breadcrumbs", async () => {
  for (const { label, path, h1: answer } of canonicalPrimaryCopy.filter(({ path }) => path !== "/")) {
    const main = mainMarkup((await render(path)).html);
    const h1 = main.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/i)?.[0] || "";
    assert.equal(visibleText(h1), answer, `${label}: the H1 should immediately answer the navigation promise`);
    assert.doesNotMatch(main, /aria-label="Breadcrumb"|problem-breadcrumb/i, `${label}: the hero should not repeat its route as a breadcrumb`);
  }

  const homepage = mainMarkup((await render("/")).html);
  assertOrdered(visibleText(homepage), [
    "Close the strategy execution gap between plans and results.",
    "New tools, skills, or people still need clear direction.",
    "Choose the level of Execution Leadership your team needs.",
  ], "homepage navigation-aligned chapters");
  assert.doesNotMatch(homepage, /Which of these looks familiar\?|One system\. Applied where execution is breaking\.|Installed in the work\. Built to hold without us\./i, "homepage chapter headings avoid abstract or redundant taglines");

  const about = mainMarkup((await render("/about")).html);
  assert.doesNotMatch(about, /<div class="inner-hero-copy">\s*<p class="orientation-label"/i, "supporting page heroes should begin with the page answer, not a route label");
  assert.doesNotMatch(about, />What to understand</i, "generic explanatory labels should not repeat the section's job");
});

test("uses semantic color surfaces for the consolidated primary experiences", async () => {
  const css = readSource("app/hierarchy.css");
  for (const [token, value] of [
    ["--ink", "#221e1f"], ["--ink-deep", "#171415"], ["--paper", "#f7f4f0"],
    ["--clay", "#e9d8cf"], ["--sage", "#dde5d9"], ["--mist", "#e7e2de"],
    ["--graphite", "#625d5f"], ["--action-orange", "#d03b00"], ["--action-orange-hover", "#b83300"],
  ]) {
    assert.match(css, new RegExp(`${token}:\\s*${value}`, "i"), token);
  }
  assert.match(css, /\.experience-problems\s*\{[^}]*background:\s*var\(--clay\)/is);
  assert.match(css, /\.experience-system\s*\{[^}]*background:\s*var\(--ink-deep\)/is);
  assert.match(css, /\.experience-close,[\s\S]*?background:\s*var\(--sage\)/i);
  assert.match(css, /\.problem-experience-workspace\s*\{[^}]*background:\s*var\(--white\)/is);
  assert.match(css, /\.problem-experience-repair\s*\{[^}]*background:\s*var\(--sage\)/is, "the closing solution chapter must separate from the white workspace above and dark footer below");
  assert.match(css, /\.master-footer\s*\{[^}]*background:\s*var\(--ink-deep\)/is, "the footer retains its distinct dark foundation");
  assert.match(css, /\.button-primary\s*\{[^}]*background:\s*var\(--action-orange\)/is);
});

test("gives each homepage section one purposeful motion language and a reduced-motion state", async () => {
  const css = readSource("app/hierarchy.css");
  const homeSource = readSource("app/page.tsx");
  const heroSource = readSource("app/components/hero-motion-media.tsx");
  const heroOutcomeSource = readSource("app/components/hero-outcome-rotation.tsx");
  const kineticSource = readSource("app/components/kinetic-statement.tsx");
  const logoSource = readSource("app/components/logo-marquee.tsx");
  const carouselSource = readSource("app/components/pain-point-carousel.tsx");
  const installationSource = readSource("app/components/installation-stepper.tsx");
  const problemSource = readSource("app/components/problem-explorer.tsx");
  const systemSource = readSource("app/components/system-explorer.tsx");
  const scrollSceneSource = readSource("app/components/use-scroll-scene.ts");
  const { html } = await render("/");

  assert.doesNotMatch(css, /animation:[^;}]*(?:pulse)/i);
  assert.doesNotMatch(css, /home-thesis-track/i);
  assert.match(css, /@keyframes home-marquee-left/i);
  assert.match(css, /\.home-logo-marquee-track[\s\S]*animation:\s*home-marquee-left\s+46s\s+linear\s+infinite/i);
  assert.doesNotMatch(css, /\.home-kinetic-track|\.home-kinetic-group|\.home-kinetic-separator/i);
  assert.match(kineticSource, /data-scroll-reveal-section/i);
  assert.match(heroOutcomeSource, /useHydratedReducedMotion\(\)/i);
  assert.match(heroOutcomeSource, /document\.hidden/i);
  assert.match(heroOutcomeSource, /visibleIndex = reduceMotion \? 0 : index/i, "reduced motion keeps the server-rendered first phrase");
  assert.match(logoSource, /useHydratedReducedMotion\(\)/i);
  assert.match(logoSource, /document\.hidden/i);
  assert.match(logoSource, /Pause movement/i);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.execution-spine \*[\s\S]*?animation:\s*none\s*!important/is);
  for (const [label, source] of [["hero media", heroSource], ["hero outcome", heroOutcomeSource], ["logo marquee", logoSource], ["carousel", carouselSource], ["installation stepper", installationSource], ["problem explorer", problemSource], ["scroll scenes", scrollSceneSource]]) {
    assert.match(source, /use(?:Hydrated)?ReducedMotion\(\)/i, `${label}: reduced-motion hook`);
  }
  assert.match(systemSource, /useHydratedReducedMotion\(/i, "system disclosure respects reduced motion without a scroll scene");
  assert.match(heroSource, /document\.hidden/i);
  assert.match(heroSource, /Pause motion/i);
  assert.doesNotMatch(heroSource, /setInterval|slides\.map|activeSlide/i, "hero uses one finite cinematic treatment rather than an autoplay slideshow");
  assert.doesNotMatch(carouselSource, /setInterval|autoPlay|autoplay/i, "pain carousel remains manual");
  assert.doesNotMatch(homeSource, /<TextEffect\b/i, "the hero avoids word-by-word motion that would fragment the headline");
  assert.doesNotMatch(`${homeSource}\n${problemSource}`, /<Reveal\b|<GlowCard\b/i);
  assert.doesNotMatch(mainMarkup(html), /class="[^"]*\breveal\b|glow-card/i);
});

test("adds a restrained scroll narrative without hiding meaning or motion preferences", () => {
  const layoutSource = readSource("app/layout.tsx");
  const motionSource = readSource("app/components/scroll-narrative-motion.tsx");
  const sceneSource = readSource("app/components/use-scroll-scene.ts");
  const css = readSource("app/hierarchy.css");

  assert.match(layoutSource, /<ScrollNarrativeMotion\s*\/>/i);
  assert.match(motionSource, /main \[data-major-section\]/i);
  assert.match(motionSource, /scene\.querySelector\("h1"\)/i, "heroes keep their existing motion language");
  assert.match(motionSource, /journeyStage === "act"/i, "closing actions remain visually calm");
  assert.match(motionSource, /prefers-reduced-motion:\s*reduce/i);
  assert.match(motionSource, /process\.env\.NODE_ENV !== "production"[\s\S]*motion[\s\S]*reduce/i, "nonproduction QA can force the static scroll state");
  assert.match(motionSource, /IntersectionObserver/i);
  assert.match(motionSource, /main \[data-scroll-step\]/i, "decision-sized story beats reveal independently");
  assert.match(motionSource, /scrollStepState = "pending"/i);
  assert.match(css, /idea, line, explanation/i);
  assert.match(css, /data-scroll-role="headline"/i);
  assert.match(css, /data-scroll-role="keyword"/i);
  assert.match(css, /prefers-reduced-motion:\s*reduce[\s\S]*?data-scroll-role[\s\S]*?opacity:\s*1\s*!important/is);
  assert.match(sceneSource, /addEventListener\("scroll", update, \{ passive: true \}\)/i, "fixed scenes follow native page scroll without intercepting it");
  assert.doesNotMatch(sceneSource, /wheel|touchmove|preventDefault/i, "fixed scenes never hijack wheel or touch scrolling");
  assert.match(css, /scroll-swap-scene\[data-scroll-scene-ready="true"\] \.scroll-swap-stage\s*\{[^}]*position:\s*sticky/is, "story canvases stay fixed while their content changes");
});

test("adds finite text entrances and truthful disclosure feedback without changing the reading path", async () => {
  const words = readSource("app/components/scroll-words.tsx");
  const cue = readSource("app/components/disclosure-cue.tsx");
  const controller = readSource("app/components/scroll-narrative-motion.tsx");
  const css = readSource("app/purposeful-motion.css");

  for (const [path, expectedCount] of [["/", 7], ["/problems-we-solve", 1], ["/leadership-system", 3], ["/leadership-services", 2], ["/resources", 2], ["/results", 3]]) {
    const main = mainMarkup((await render(path)).html);
    assert.equal((main.match(/class="scroll-words"/g) || []).length, expectedCount, `${path}: a bounded set of motion headlines`);
    const hero = main.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/i)?.[0] || "";
    assert.doesNotMatch(hero, /scroll-word/, "the essential hero does not wait for staggered words");
    assert.doesNotMatch(main, /data-scroll-enter-state="pending"/, "server/no-JS output starts readable");
  }
  const problems = mainMarkup((await render("/problems-we-solve")).html);
  assert.equal((problems.match(/data-scroll-enter="true"/g) || []).length, 5);
  assert.match(visibleText(problems), /Which problem keeps coming back\?/);
  assert.match(problems, /class="disclosure-cue[^"]*" aria-hidden="true"/);
  assert.doesNotMatch(words, /useEffect|aria-hidden|opacity|setInterval/, "word segmentation preserves the original accessible text and visible default");
  assert.match(words, /Math\.min\(order\+\+, 8\)/, "long headlines cannot accumulate unbounded stagger");
  assert.match(controller, /readingObserver\?\.unobserve/);
  assert.match(controller, /document\.addEventListener\("focusin", revealFocusedContent\)/);
  assert.match(controller, /item\.matches\("\[open\]"\)/, "deep-linked detail remains visible immediately");
  assert.doesNotMatch(controller, /preventDefault|wheel|touchmove|setInterval/, "entrances do not trap or extend scrolling");
  assert.match(cue, /activated && !previous\.current/, "pulse only follows a new deliberate activation");
  assert.match(cue, /useRef\(activated\)/, "initial/deep-link open state does not celebrate");
  assert.match(cue, /duration: 620/);
  assert.match(cue, /response\?\.cancel\(\)/, "rapid changes do not stack pulses");
  assert.match(cue, /prefers-reduced-motion: reduce/);
  assert.doesNotMatch(cue, /setInterval|confetti|success|aria-live/);
  assert.match(css, /transition-delay: calc\(var\(--word-order, 0\) \* 28ms\)/);
  assert.match(css, /\[data-locked="true"\] \.pain-card-back::after/, "only a confirmed flip gets a selection trace, not hover previews");
  assert.match(css, /\.disclosure-cue-ring[^}]*pointer-events: none/s);
  assert.match(css, /prefers-reduced-motion: reduce[\s\S]*\.disclosure-cue-ring \{ display: none; \}/);
  assert.doesNotMatch(css, /infinite|sticky|100vh|100svh/);
});

test("connects disclosure feedback to alignment and keeps editorial images quiet after entry", async () => {
  const cue = readSource("app/components/disclosure-cue.tsx");
  const controller = readSource("app/components/scroll-narrative-motion.tsx");
  const css = readSource("app/purposeful-motion.css");
  for (const path of ["/problems-we-solve", "/leadership-system"]) {
    const main = mainMarkup((await render(path)).html);
    assert.match(main, /class="disclosure-alignment"[^>]*aria-hidden="true"[^>]*focusable="false"/);
    assert.match(main, /class="disclosure-cue-rings"><span class="disclosure-cue-ring"><\/span><span class="disclosure-cue-ring">/);
    assert.doesNotMatch(main, /role="progressbar"/, "the decorative line must not imply task completion");
  }
  const alignment = cue.slice(cue.indexOf("export function DisclosureAlignment"));
  assert.equal((alignment.match(/<path\b/g) ?? []).length, 1, "the shaft and head share one shape");
  assert.match(alignment, /trace\.current\?\.animate\?\./, "the entire arrow moves together");
  assert.match(alignment, /duration: 320/, "the forward response has a short finite duration");
  assert.doesNotMatch(alignment, /children|offsets|scale\(|delay:/, "no staggered fragments or distorted arrowhead");
  assert.match(alignment, /return \(\) => response\?\.cancel\(\)/, "rapid toggles and preference changes cancel the response");
  assert.match(alignment, /!newlyOpened \|\| reduceMotion \|\| window\.matchMedia/, "deep links and reduced motion stay still");
  assert.match(css, /\.disclosure-alignment[^}]*width: 64px; height: 16px;/, "the compact arrow retains its aspect ratio");
  assert.match(controller, /\.image-mask img\[loading='lazy'\]/, "image motion excludes eager hero images and diagrams");
  assert.match(controller, /scene\.dataset\.scrollState === "visible"/, "a motion preference change does not replay read chapters");
  assert.match(css, /data-scroll-role="image"[^}]*transition:[^}]*720ms/s);
  assert.doesNotMatch(css, /image[^}]*:hover|image[^}]*cursor:\s*pointer/);
  assert.match(readSource("app/hierarchy.css"), /\[data-scroll-role\]:not\(\[data-scroll-role="image"\]\)/, "reduced motion preserves art-directed image masks");
  for (const source of ["how-we-help-experience", "offer-experience"]) {
    assert.match(readSource(`app/components/${source}.tsx`), /className="solution-reassurance" data-major-section data-journey-stage="act"/, "the final action stays still");
  }
});

test("keeps navigation, problem choices, and system exploration keyboard-operable", async () => {
  const headerSource = readSource("app/components/site-header.tsx");
  const nativeLinkSource = readSource("app/components/native-link.tsx");
  const problemSource = readSource("app/components/problem-explorer.tsx");
  const systemSource = readSource("app/components/system-explorer.tsx");
  const carouselSource = readSource("app/components/pain-point-carousel.tsx");
  const installationSource = readSource("app/components/installation-stepper.tsx");
  const css = readSource("app/hierarchy.css") + readSource("app/reading-paths.css") + readSource("app/problem-reader.css");

  assert.match(headerSource, /aria-expanded=\{mobileOpen\}/i);
  assert.match(headerSource, /aria-controls="mobile-navigation"/i);
  assert.match(headerSource, /event\.key === "Escape"/);
  assert.match(headerSource, /mobileButtonRef\.current\?\.focus\(\)/);
  assert.match(headerSource, /role="dialog" aria-modal="true"/);
  assert.match(headerSource, /element\.inert = true/);
  assert.match(headerSource, /event\.key !== "Tab"/);
  assert.doesNotMatch(headerSource, /<Link[^>]+onClick=\{closeMobile\}/, "mobile links stay mounted until the browser begins navigation");
  assert.match(nativeLinkSource, /return <a href=\{href\}/, "hosted navigation uses dependable native anchors");
  for (const sourcePath of findSourceFiles("app")) {
    assert.doesNotMatch(readSource(sourcePath), /from ["']next\/link["']/, `${sourcePath}: avoids the broken hosted Next Link prefetch runtime`);
  }

  assert.match(problemSource, /<details className="problem-reader-item"/i);
  assert.match(problemSource, /name="execution-problems"/i, "native no-JS accordion group");
  assert.match(problemSource, /open=\{selected === item\.id\}/i, "at most one problem opens");
  assert.match(problemSource, /aria-controls=\{\x60problem-detail-/i);
  assert.match(problemSource, /initialCondition \?\? null/i, "no preselected problem");
  assert.match(problemSource, /item\.headline[\s\S]*item\.preview[\s\S]*item\.cost[\s\S]*item\.response\.action[\s\S]*item\.response\?\.outcome/i);
  assert.match(problemSource, /problem-reader-links[\s\S]*actionOrder\.map/i);
  assert.doesNotMatch(problemSource, /scrollIntoView|scrollTo\(|useScrollScene|AnimatePresence|onPointerEnter|onFocusCapture|problem-selection-|problem-story-nav/i, "no detached updates, hover content, or driven scroll");
  assert.match(problemSource, /event\.key === "ArrowDown"/);
  assert.match(problemSource, /event\.key === "ArrowUp"/);
  for (const [label, source] of [["problem", problemSource], ["system", systemSource]]) {
    assert.match(source, /event\.key === "Home"/, label + ": Home key");
    assert.match(source, /event\.key === "End"/, label + ": End key");
  }
  assert.match(carouselSource, /event\.key !== "Escape"/i, "homepage interactions remain unchanged");
  assert.match(systemSource, /<details className="system-reader-item"/i, "system: familiar native disclosure");
  assert.match(systemSource, /open=\{activeNode === node\.id\}/i, "system: only one detail opens");
  assert.match(systemSource, /aria-controls=\{\x60system-detail-/i, "system: summaries identify their detail");
  assert.doesNotMatch(systemSource, /useScrollScene|scrollIntoView|scrollTo\(/i, "disclosure never drives page scroll");
  assert.match(problemSource, /window\.history\.pushState/i, "problem state is recoverable through browser history");
  assert.match(problemSource, /window\.addEventListener\("popstate"/i);
  assert.match(systemSource, /window\.history\.pushState/i);
  assert.match(systemSource, /window\.addEventListener\("popstate"/i);
  assert.match(css, /:focus-visible/i);
  for (const selector of [
    "problem-reader-links a:hover",
    "direct-mobile-drawer nav > a:hover",
    "mobile-drawer-header button:hover",
    "home-section-link:hover",
    "case-reader-link:hover",
    "system-reader-detail a:hover",
    "results-methodology-list summary:hover",
    "consultation-direct a:hover",
  ]) assert.match(css, new RegExp(selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `${selector}: explicit hover feedback`);
  for (const [label, source] of [["pain carousel", carouselSource], ["installation stepper", installationSource]]) {
    assert.match(source, /event\.key === "ArrowRight"/i, `${label}: ArrowRight`);
    assert.match(source, /event\.key === "Home"/i, `${label}: Home`);
    assert.match(source, /event\.key === "End"/i, `${label}: End`);
  }
});

test("keeps five problem summaries and inline detail in one natural reading path", async () => {
  const data = readSource("app/data/sitemap-problems.ts");
  const paths = [
    ["/problems-we-solve", null],
    ["/problems-we-solve?condition=ownership", "ownership"],
    ["/problems-we-solve?condition=strategy-drift&mode=understand", "strategy-drift"],
    ["/problems-we-solve?condition=invalid", null],
  ];
  for (const [path, selected] of paths) {
    const { status, html } = await render(path);
    assert.equal(status, 200, path);
    const main = mainMarkup(html);
    assert.deepEqual(attributeValues(main, "data-journey-stage"), ["recognize", "understand", "solution"]);
    assert.equal(majorSections(html).length, 3);
    const rows = [...main.matchAll(/<details\b[^>]*class="problem-reader-item"[^>]*>[\s\S]*?<\/details>/g)].map(match => match[0]);
    assert.equal(rows.length, 5);
    assert.equal(rows.filter(row => /<details\b[^>]*\bopen(?:=""|(?=\s|>))/.test(row)).length, selected ? 1 : 0);
    for (const row of rows) {
      const id = row.match(/data-condition="([^"]+)"/)[1];
      assert.ok(row.includes('aria-controls="problem-detail-' + id + '"'));
      assert.ok(row.includes('id="problem-detail-' + id + '"'));
      const summary = extractElement(row, "summary");
      assert.match(summary, /<h3>/);
      assert.match(summary, /<p>/, "recognition copy remains visible when closed");
      if (selected === "strategy-drift") {
        assertOrdered(row, ["<summary", "problem-reader-detail", "What you may notice", "What it costs", "What needs to change", "problem-reader-links"], "preserved legacy reading path");
        assert.equal((row.match(/<li>/g) || []).length, 3);
      } else {
        assertOrdered(row, ["<summary", "problem-reader-detail", "What it costs", "What 120VC does", "What changes", "problem-reader-links"], "cost, intervention, then outcome");
        assert.doesNotMatch(row, /What you may notice|problem-reader-signals|<li>/, "do not repeat the symptoms already explained in the summary");
        assert.equal((row.match(/<h4>/g) || []).length, 3, "one label for each useful part of the answer");
      }
      for (const mode of ["help", "work", "understand"]) assert.ok(row.includes('data-action-mode="' + mode + '"'));
      if (id === selected) assert.match(row, /<details\b[^>]*\bopen(?:=""|(?=\s|>))/);
    }
    assert.doesNotMatch(main, /Hover to see|Your selected problem|Scroll to advance|problem-selection-|problem-condition-rail|scroll-swap|problem-story-nav/i);
    assert.match(main, /class="execution-spine execution-spine-repair/i);
    assertAccessibleLocalImages(main, path);
    assertOnePrimaryActionPerSection(html, path);
    assertSignalsMapToControls(main, path);
    assertHeadlineStructure(main, path);
  }
  const defaultMain = mainMarkup((await render("/problems-we-solve")).html);
  for (const match of data.matchAll(/(?:headline|preview|cost|action|outcome): "([^"]+)"/g)) assert.ok(visibleText(defaultMain).includes(match[1]), "render current buyer copy: " + match[1]);
  for (const match of data.matchAll(/"(\/(?:resources|execution-leadership-coaching|leadership-system|embedded-execution-leadership)[^"]*)"/g)) assert.ok(defaultMain.includes('href="' + match[1] + '"'), "retain destination " + match[1]);
  const css = readSource("app/problem-reader.css");
  assert.match(css, /problem-detail-reveal 200ms ease-out/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /data-reduced-motion="true"[^}]*animation: none/);
  assert.match(css, /summary:focus-visible/);
  assert.doesNotMatch(css, /svh|sticky|position:\s*absolute|scroll-snap|overflow:\s*hidden/i);
});

test("shows service fit before interaction while retaining hover, click, and keyboard disclosure", async () => {
  for (const path of ["/leadership-services"]) {
    const main = mainMarkup((await render(path)).html);
    const cards = [...main.matchAll(/<article\b[^>]*class="home-solution-card"[^>]*>[\s\S]*?<\/article>/g)].map(match => match[0]);
    assert.equal(cards.length, 3, path);
    for (const card of cards) {
      const fit = extractElement(card, "dl", "home-solution-fit");
      assert.match(fit, /<dt>Best when<\/dt>\s*<dd>[^<]+<\/dd>/);
      assert.doesNotMatch(fit, /aria-hidden|hidden=/);
      assertOrdered(card, ["home-solution-fit", "home-solution-disclosure", "home-solution-change", "home-solution-links"], "fit is outside and before optional detail");
      assert.equal((card.match(/<dt>Best when<\/dt>/g) || []).length, 1, "no repeated fit copy");
      assert.match(card, /aria-expanded="false"/, "details are optional at first render");
      assert.match(card, /See what changes/, "control describes the newly optional detail");
    }
  }
  const source = readSource("app/components/solution-scope-cards.tsx");
  assert.match(source, /onPointerEnter=[\s\S]*event\.pointerType === "mouse" && !expanded/);
  assert.match(source, /onPointerLeave=[\s\S]*setPreview\(null\)/);
  assert.match(source, /onFocusCapture=[\s\S]*setPreview\(scope\.label\)/);
  assert.match(source, /onBlurCapture=[\s\S]*event\.currentTarget\.contains\(event\.relatedTarget/);
  assert.match(source, /event\.key !== "Escape"/);
  assert.match(source, /<button[\s\S]*aria-expanded=\{isRevealed\}[\s\S]*onClick=[\s\S]*setExpanded/);
  assert.match(source, /isExpanded \|\| \(!expanded && preview === scope\.label\)/, "a clicked card stays open while the pointer moves elsewhere");
  assert.match(source, /activated=\{isExpanded\}/, "ripple rewards explicit expansion, not incidental hover");
  const css = readSource("app/hierarchy.css");
  assert.match(css, /@media \(max-width: 1080px\)\s*\{\s*\.supporting-v2 \.supporting-hero,[\s\S]*?\.solutions-experience-site\.supporting-v2 \.home-solution-card\s*\{\s*min-height: 360px;/, "stacked tablet cards do not retain the tall desktop minimum");
});

test("fades horizontal card rails only where more content remains", async () => {
  const home = mainMarkup((await render("/")).html);

  const resources = mainMarkup((await render("/resources")).html);

  assert.doesNotMatch(home, /pain-carousel-rail-window|horizontal-card-edge-fade/, "homepage choices do not hide in horizontal rails");

  assert.match(resources, /class="resource-card-rail-window horizontal-card-rail-window"[^>]*data-at-start="true"[^>]*data-at-end="false"/i);
  for (const markup of [resources]) {
    assert.match(markup, /horizontal-card-edge-fade-left/i);
    assert.match(markup, /horizontal-card-edge-fade-right/i);
  }

  for (const sourcePath of ["app/components/pain-point-carousel.tsx", "app/components/resource-explorer.tsx"]) {
    const source = readSource(sourcePath);
    assert.match(source, /scrollWidth\s*-\s*\w+\.clientWidth/i, `${sourcePath}: measures remaining horizontal content`);
    assert.match(source, /setAtStart/i, `${sourcePath}: updates the leading-edge cue`);
    assert.match(source, /setAtEnd/i, `${sourcePath}: updates the trailing-edge cue`);
  }

  const css = readSource("app/hierarchy.css");
  assert.match(css, /\.horizontal-card-edge-fade-right\s*\{[^}]*linear-gradient\(270deg/is);
  assert.match(css, /data-at-start="true"[^}]*horizontal-card-edge-fade-left/is);
  assert.match(css, /data-at-end="true"[^}]*horizontal-card-edge-fade-right/is);
});

test("renders every legacy problem alias as the shared selected experience with safe metadata", async () => {
  for (const alias of problemAliases) {
    const { status, html } = await render(alias.path);
    assert.equal(status, 200, alias.path);
    const main = mainMarkup(html);

    assert.match(html, /class="site-shell hierarchy-site problem-experience-site supporting-v2"/i, alias.path);
    assert.match(visibleText(main), /Your strategy is clear\. Why isn.t it getting executed/i, alias.path);
    assert.match(main, alias.headline, alias.path);
    const selectedRow = [...main.matchAll(/<details\b[^>]*class="problem-reader-item"[^>]*>[\s\S]*?<\/details>/g)].map(match => match[0]).find(row => row.includes('data-condition="' + alias.condition + '"'));
    assert.ok(selectedRow, alias.path + ": selected problem remains reachable");
    assert.match(selectedRow, /<details\b[^>]*\bopen(?:=""|(?=\s|>))/, alias.path + ": opens the matching inline detail");

    assert.match(html, /rel="canonical" href="https:\/\/www\.120vc\.com\/problems-we-solve"/i, `${alias.path}: canonical parent`);
    assert.match(html, /name="robots" content="noindex, follow"/i, `${alias.path}: alias indexing policy`);
    assert.equal(majorSections(html).length, 3, alias.path);
    assertOnePrimaryActionPerSection(html, alias.path);
    assertSignalsMapToControls(main, alias.path);
    assertHeadlineStructure(main, alias.path);
    assertAccessibleLocalImages(main, alias.path);
    assert.doesNotMatch(main, internalGovernanceCopy, alias.path);
  }
});

test("renders six readable system summaries with optional native details", async () => {
  const { status, html } = await render("/leadership-system?node=decisions");
  assert.equal(status, 200);
  const main = mainMarkup(html);
  assert.match(visibleText(main), /The Execution Leadership System: a shared way to turn strategy into results/i);
  assert.equal(majorSections(html).length, 5);
  assert.equal((main.match(/class="system-reader-item"/g) || []).length, 6);
  assert.equal((main.match(/<summary aria-controls="system-detail-/g) || []).length, 6);
  for (const label of ["Intent", "Priorities", "Decisions", "Commitments", "Execution", "Outcomes"]) {
    assert.match(main, new RegExp(">" + label + "<", "i"), label);
  }
  const system = majorSections(html).find((section) => section.includes('id="explore-system"'));
  assert.ok(system);
  assert.equal((system.match(/<details\b[^>]*\bopen(?:=""|(?=\s|>))/g) || []).length, 1);
  assert.match(system, /<details\b[^>]*data-system-node="decisions"[^>]*open/i);
  assert.match(system, /Make a clear decision that will hold/i);
  assert.match(system, /Meetings end with a decision that does not need to be reopened/i);
  assert.match(system, /href="\/resources\/tools\/1-3-1-decision-builder"/i);
  assert.doesNotMatch(system, /Leaders make visible|What changes in the work|Related practice|Scroll to advance|scroll-swap|system-story-nav/, "no duplicated labels or multi-panel reading path");
  assertOrdered(extractElement(main, "div", "home-stepper-tabs"), ["Diagnose", "Install", "Operate", "Own"], "installation sequence");
  const defaultSystem = majorSections((await render("/leadership-system")).html).find((section) => section.includes('id="explore-system"'));
  assert.ok(defaultSystem);
  assert.doesNotMatch(defaultSystem, /<details\b[^>]*\bopen(?:=""|(?=\s|>))/, "overview starts with six concise summaries");
  assertAccessibleLocalImages(main, "How It Works");
  assertHeadlineStructure(main, "How It Works");
});

test("uses local human imagery and keeps supporting icons accessible", async () => {
  for (const path of ["/", "/problems-we-solve", "/leadership-system", ...problemAliases.map(({ path }) => path)]) {
    const main = mainMarkup((await render(path)).html);
    assertAccessibleLocalImages(main, path);
    for (const match of main.matchAll(/<svg\b(?=[^>]*class="execution-icon[^"]*")[^>]*>/gi)) {
      assert.match(match[0], /aria-hidden="true"/i, `${path}: icon beside visible text should be decorative`);
      assert.doesNotMatch(match[0], /role="img"/i, `${path}: decorative icon should not duplicate its visible label`);
    }
    if (path === "/") {
      assert.match(main, /<figure class="hero-motion-media"[^>]*aria-label="[^"]+"/i, "homepage motion media needs a text alternative");
    } else if (path === "/leadership-system") {
      assert.match(main, /class="system-reader"/i, "the system uses a plain reading path");
      assert.equal((main.match(/class="system-reader-item"/g) || []).length, 6);
    } else {
      assert.match(main, /<figure class="execution-spine[\s\S]*?<svg[^>]*aria-hidden="true"[\s\S]*?<figcaption>[^<]+<\/figcaption>/i, `${path}: the execution graphic needs a text alternative`);
    }
  }

  const iconSource = readSource("app/components/execution-icon.tsx");
  assert.match(iconSource, /role=\{label \? "img" : undefined\}/i);
  assert.match(iconSource, /aria-label=\{label\}/i);
  assert.match(iconSource, /aria-hidden=\{label \? undefined : true\}/i);
});

test("keeps audience mode clean and review mode outside the audience composition", async () => {
  for (const path of ["/", "/?review=1", "/problems-we-solve/strategy-execution-gap", "/problems-we-solve/strategy-execution-gap?review=1"]) {
    const { status, html } = await render(path);
    assert.equal(status, 200, path);
    assert.doesNotMatch(mainMarkup(html), internalGovernanceCopy, path);
    assert.doesNotMatch(html, /data-review-panel/i, `${path}: production output must remain audience-safe`);
  }

  const homeSource = readSource("app/page.tsx");
  const routeSource = readSource("app/[...slug]/page.tsx");
  const problemSource = readSource("app/components/problem-page.tsx");
  const contentSource = readSource("app/components/content-page.tsx");
  const panelSource = readSource("app/components/review-mode-panel.tsx");

  assert.doesNotMatch(homeSource, /getHomepageCaseProof/, "homepage never injects illustrative case studies");
  assert.match(homeSource, /process\.env\.NODE_ENV === "development" && query\.review === "1"/, "homepage statistics require explicit development review");
  for (const [label, source] of [["dynamic route", routeSource]]) {
    assert.match(source, /query\.review === "1" && process\.env\.NODE_ENV !== "production"/, `${label}: explicit nonproduction review query`);
  }
  for (const [label, source] of [["home", homeSource], ["problem", problemSource], ["content", contentSource]]) {
    assert.ok(source.indexOf("reviewMode &&") < source.indexOf("<main"), `${label}: review panel must be outside <main>`);
  }
  assert.match(panelSource, /<aside[^>]*data-review-panel[^>]*aria-label="Owner review status"/i);
  assert.match(panelSource, /Not audience content/i);
});

test("enforces the responsive headline contract structurally", async () => {
  const css = readSource("app/hierarchy.css");
  assert.match(css, /\.hierarchy-site h1\s*\{[^}]*max-width:\s*15ch[^}]*font-size:\s*clamp\(48px,\s*5vw,\s*64px\)/is);
  assert.match(css, /\.hierarchy-site h2\s*\{[^}]*max-width:\s*16ch[^}]*font-size:\s*clamp\(40px,\s*4\.1vw,\s*48px\)/is);
  assert.match(css, /@media \(max-width: 680px\)[\s\S]*?\.hierarchy-site h1\s*\{[^}]*max-width:\s*100%[^}]*font-size:\s*clamp\(40px,\s*11\.4vw,\s*44px\)/is);
  assert.match(css, /@media \(max-width: 680px\)[\s\S]*?\.hierarchy-site h2\s*\{[^}]*font-size:\s*clamp\(32px,\s*9vw,\s*36px\)/is);
  assert.match(css, /@media \(max-width: 420px\)[\s\S]*?\.guided-content-page \.inner-hero h1\.headline-compact-mobile\s*\{[^}]*font-size:\s*30px/is);
  assert.match(css, /text-wrap:\s*balance/i);
  const sitemapCss = readSource("app/sitemap-refresh.css");
  assert.match(sitemapCss, /@media \(max-width: 420px\)[\s\S]*?\.offer-experience \.supporting-hero-copy h1\.headline-compact-mobile\s*\{[^}]*font-size:\s*clamp\(30px,\s*9\.6vw,\s*40px\)/is);

  for (const [, path] of canonicalOfferAndToolHeadlines.filter((entry) => entry[2].length > 58)) {
    const hero = primaryHero((await render(path)).html);
    assert.match(hero, /<h1\b[^>]*class="headline-compact-mobile"[^>]*>/i, path + ": long phone headline receives the three-line responsive treatment");
  }

  for (const path of ["/", "/problems-we-solve", "/leadership-system", ...problemAliases.map(({ path }) => path)]) {
    assertHeadlineStructure(mainMarkup((await render(path)).html), path);
  }
});

test("server-renders every configured route without governance leakage or section overload", async () => {
  const source = readSource("app/site-data.ts");
  const slugs = [...new Set([...source.matchAll(/^\s+slug: "([^"]+)"/gm)].map((match) => match[1]).concat(newSitemapSlugs))];
  assert.ok(slugs.length >= 67, `expected at least 67 configured routes plus the homepage, found ${slugs.length}`);

  const failures = [];
  for (const slug of slugs) {
    const path = `/${slug}`;
    const { status, html } = await render(path);
    if (status !== 200) failures.push(`${path}: status ${status}`);
    const main = mainMarkup(html);
    const sectionCount = majorSections(html).length;
    if ((main.match(/<h1\b/gi) || []).length !== 1) failures.push(`${path}: expected one H1`);
    if (sectionCount > (newSitemapSlugs.includes(slug) && slug.startsWith("resources/") ? 6 : 5)) failures.push(`${path}: ${sectionCount} major sections`);
    if (internalGovernanceCopy.test(main)) failures.push(`${path}: internal governance copy in <main>`);
    if (/data-review-panel|codex-preview|react-loading-skeleton/i.test(main)) failures.push(`${path}: audience-only markup violation`);
    if ([...main.matchAll(/<h[12]\b[^>]*>[\s\S]*?<\/h[12]>/gi)].some((match) => /<br\b/i.test(match[0]))) failures.push(`${path}: hard line break in H1/H2`);
    for (const [index, section] of majorSections(html).entries()) {
      const actionCount = (section.match(/data-primary-action/g) || []).length;
      if (actionCount > 1) failures.push(`${path}: section ${index + 1} has ${actionCount} primary actions`);
    }
  }
  assert.deepEqual(failures, []);
});

test("keeps the commercial core and declared content-page next steps intact", async () => {
  for (const [path, pattern] of [
    ["/leadership-system", /The Execution Leadership System: a shared way to turn strategy into results/i],
    ["/leadership-system/installation", /Install the system inside the work/i],
    ["/leadership-services", /Execution Leadership, from coaching to leading the work/i],
    ["/leadership-services/compare-solutions", /Choose the level of Execution Leadership/i],
    ["/results", /Know what evidence to ask for/i],
    ["/results/methodology", /Every claim needs a definition/i],
    ["/resources", /Practical tools and ideas for better strategy execution/i],
    ["/resources/tools", /Turn clarity into action/i],
    ["/for-leaders", /Built for executives accountable/i],
    ["/about/the-120-standard", /Not a slogan\. A way of operating/i],
  ]) {
    const { status, html } = await render(path);
    assert.equal(status, 200, path);
    assert.match(visibleText(html), pattern, path);
  }

  const guide = (await render("/resources/guides-and-books")).html;
  const guideEnding = extractElement(guide, "section", "final-cta");
  assert.match(guideEnding, /Download The Strategy Execution Gap/i);
  assert.doesNotMatch(guideEnding, /Book a Consultation/i);

  const solution = (await render("/leadership-services")).html;
  const solutionEnding = extractElement(solution, "section", "solution-reassurance");
  assert.match(visibleText(solutionEnding), /Let's Talk/i);
});

test("keeps every internal navigation outcome resolvable", async () => {
  const source = readSource("app/site-data.ts");
  const slugs = [...new Set([...source.matchAll(/^\s+slug: "([^"]+)"/gm)].map((match) => match[1]).concat(newSitemapSlugs))];
  const entryPaths = ["/", "/contact", "/consultation", "/problems-we-solve", ...slugs.map((slug) => `/${slug}`)];
  const destinations = new Set();

  for (const path of entryPaths) {
    const { html } = await render(path);
    for (const match of html.matchAll(/href="(\/[^"#]*)"/g)) {
      const destination = match[1].split("?")[0].replace(/\/$/, "") || "/";
      if (!destination.startsWith("/_next") && !destination.startsWith("/images/")) destinations.add(destination);
    }
  }

  const failures = [];
  for (const destination of destinations) {
    const { status } = await render(destination);
    if (status !== 200) failures.push(`${destination}: status ${status}`);
  }
  assert.deepEqual(failures, []);
});

test("keeps the consultation request progressive and honest about its outcome", async () => {
  const { status, html } = await render("/consultation");
  const formSource = readSource("app/components/consultation-form.tsx");
  assert.equal(status, 200);
  assert.match(html, /What does your team need to deliver/i);
  assert.match(html, />Name</i);
  assert.match(html, /Work email/i);
  assert.match(html, /Company/i);
  assert.match(html, /Role or title/i);
  assert.match(html, /Where is the work breaking/i);
  assert.match(html, /What are you trying to deliver/i);
  assert.doesNotMatch(html, /Last name|Who else is involved|What happens if this does not improve/i);
  assert.match(formSource, /name="goal"[\s\S]*?defaultValue=\{draft\.goal\}/i);
  assert.doesNotMatch(formSource, /name="goal"[^>]*required/i);
  assert.doesNotMatch(formSource, /name="timing"[^>]*required/i);
  assert.match(html, />Continue</i);
  assert.match(formSource, /Prepare email request/i);
  assert.match(formSource, /Nothing has been sent yet/i);
  assert.match(formSource, /mailto:info@120vc\.com/i);
  assert.match(formSource, /htmlFor="first-name"/i);
  assert.match(formSource, /id="first-name"/i);
  assert.equal(majorSections(html).length, 4);
  assert.doesNotMatch(mainMarkup(html), /private prototype|HubSpot form|before public launch/i);
  assert.doesNotMatch(html, /Your request has been submitted/i);
});

test("gives the priority supporting pages distinct jobs and familiar interaction models", async () => {
  const help = mainMarkup((await render("/leadership-services")).html);
  for (const title of ["Execution Leadership Coaching", "Execution Leadership System", "Embedded Execution Leadership"]) assert.match(help, new RegExp(title));
  assert.match(visibleText(help), /Execution Leadership, from coaching to leading the work/i);
  assert.equal((help.match(/class="home-solution-card"/g) || []).length, 3);
  assert.equal((help.match(/<dl class="home-solution-change-list">/g) || []).length, 3);
  assert.equal((help.match(/<dt>(?:Best when|First shift|Visible difference)<\/dt>/g) || []).length, 9);
  assert.doesNotMatch(help, /What determines fit|solution-fit-grid/i);

  const results = mainMarkup((await render("/results")).html);
  assert.match(visibleText(results), /Know what evidence to ask for/i);
  assert.match(results, /Client case studies are not yet available/i);
  assert.match(results, /Ask about relevant client experience/i);
  assert.doesNotMatch(results, /\b\d+%\b|Illustrative Case Study|Client logo/i);

  const resources = mainMarkup((await render("/resources")).html);
  assert.match(resources, /role="tablist" aria-label="Choose how to use the resource library"/i);
  assert.match(resources, /role="tab"[^>]*aria-selected="true"/i);
  assert.match(resources, /role="tabpanel"/i);
  assert.match(resources, /2×2 Focus Board/i);
  assert.match(resources, /FRAMEWORKS/i);
  for (const filter of ["all", "frameworks", "guides", "insights"]) assert.match(resources, new RegExp(`id="resource-tab-${filter}"`));
  assert.match(readSource("app/components/resource-explorer.tsx"), /Save your working records in this browser/i, "framework tools describe their actual local saving boundary");

  const consultation = mainMarkup((await render("/consultation")).html);
  assertOrdered(consultation, ["Tell us what", "Review the context", "Talk about the real condition", "Leave with a recommendation"], "consultation journey");

  const resourceSource = readSource("app/components/resource-explorer.tsx");
  assert.match(resourceSource, /ArrowRight|ArrowLeft|Home|End/i);
  assert.match(resourceSource, /tabIndex=\{activeId === group\.id \? 0 : -1\}/i);

  const contentSource = readSource("app/components/content-page.tsx");
  assert.match(contentSource, /hasIntentionalPresentation/i, "offer-page disclosure follows an explicit content decision");
  assert.doesNotMatch(contentSource, /More about this work/i, "generic template narration is removed");

  const css = readSource("app/hierarchy.css");
  assert.match(css, /\.guided-content-page \.orientation-label,[\s\S]*?font-size:\s*16px/is);






  assert.match(css, /\.solution-family-heading h2\s*\{[^}]*max-width:\s*32ch/is);
  assert.match(css, /\.headline-keyword\s*\{[^}]*linear-gradient/is);
  assert.match(css, /\.resource-card-rail small\s*\{[^}]*font-size:\s*16px/is);
});

test("uses headline emphasis as a scarce attention signal", async () => {
  const highlightedHeadlines = async (path) => {
    const main = mainMarkup((await render(path)).html);
    return (main.match(/class="[^"]*\bheadline-keyword\b[^"]*"/g) || []).length;
  };

  assert.equal(await highlightedHeadlines("/"), 5, "homepage restores selective emphasis across buyer recognition, mechanism, and outcomes");
  assert.ok(await highlightedHeadlines("/problems-we-solve") <= 1, "/problems-we-solve: emphasis is optional and restrained");
  assert.ok(await highlightedHeadlines("/leadership-system") <= 1, "/leadership-system: emphasis is optional and restrained");
  assert.ok(await highlightedHeadlines("/results") <= 1, "/results: emphasis is optional and restrained");
  assert.ok(await highlightedHeadlines("/leadership-services") <= 1, "/leadership-services: emphasis is optional and restrained");
  assert.ok(await highlightedHeadlines("/resources") <= 1, "/resources: emphasis is optional and restrained");
  assert.equal(await highlightedHeadlines("/consultation"), 0, "Consultation remains visually quiet");

  const css = readSource("app/hierarchy.css");
  assert.match(css, /\.headline-keyword-on-dark\s*\{[^}]*rgba\(255,\s*138,\s*76,\s*\.48\)/is);
});

test("instruments the available homepage journey without collecting form answers", async () => {
  const homeSource = readSource("app/page.tsx");
  const carouselSource = readSource("app/components/pain-point-carousel.tsx");
  const solutionSource = readSource("app/components/solution-scope-cards.tsx");
  const stepperSource = readSource("app/components/installation-stepper.tsx");
  const bridgeSource = readSource("app/components/analytics-bridge.tsx");
  const combined = [homeSource, carouselSource, solutionSource, stepperSource].join("\n");

  for (const eventName of [
    "homepage_consultation_clicked",
    "homepage_secondary_cta_clicked",
    "pain_carousel_navigated",
    "pain_card_hovered",
    "pain_card_flipped",
    "pain_problem_selected",
    "solution_card_selected",
    "how_it_works_step_selected",

  ]) assert.match(combined, new RegExp(eventName), eventName);

  assert.match(bridgeSource, /entry_route/i);
  assert.match(bridgeSource, /utm_source/i);
  assert.match(bridgeSource, /window\.dataLayer\?\.push/i);
  assert.match(bridgeSource, /track120vcEvent/i);
  assert.match(bridgeSource, /entry_route:\s*window\.location\.pathname/i);
  assert.doesNotMatch(bridgeSource, /entry_route[^\n]*location\.search/i);
  assert.doesNotMatch(bridgeSource, /textarea|FormData|free.?text/i);
  assert.match(carouselSource, /track120vcEvent/i);
  assert.match(stepperSource, /track120vcEvent/i);
  assert.match(homeSource, /\/contact\?source=homepage-hero/i);
  assert.doesNotMatch(homeSource, /\/consultation\?source=homepage-solutions/i, "How We Help no longer adds a competing consultation prompt");
  assert.match(homeSource, /\/contact\?source=homepage-final/i);
});

test("ships social metadata, canonical routes, structured data, and indexing holds", async () => {
  const home = (await render("/")).html;
  assert.match(home, /application\/ld\+json/);
  assert.match(home, /"@type":"Organization"/);
  assert.match(home, /og\.png/);

  const faq = (await render("/faq")).html;
  assert.match(faq, /"@type":"FAQPage"/);

  const consultation = (await render("/consultation")).html;
  assert.match(consultation, /rel="canonical" href="https:\/\/www\.120vc\.com\/contact"/i);

  const contact = (await render("/contact")).html;
  assert.match(contact, /rel="canonical" href="https:\/\/www\.120vc\.com\/contact"/i);
  assert.doesNotMatch(contact, /name="robots" content="noindex/);
  assert.match(consultation, /name="robots" content="noindex, follow"/i);

  const held = (await render("/privacy")).html;
  assert.match(held, /name="robots" content="noindex, nofollow"/i);

  for (const path of ["/results", "/results/methodology", "/results/operating-shifts", "/results/client-references", "/case-studies"]) {
    const proofGated = (await render(path)).html;
    assert.match(proofGated, /name="robots" content="noindex, follow"/i, path);
  }

  for (const { path } of problemAliases) {
    const alias = (await render(path)).html;
    assert.match(alias, /rel="canonical" href="https:\/\/www\.120vc\.com\/problems-we-solve"/i, path);
    assert.match(alias, /name="robots" content="noindex, follow"/i, path);
  }

  const sitemap = await render("/sitemap.xml");
  assert.equal(sitemap.status, 200);
  assert.doesNotMatch(sitemap.html, /\/privacy<|\/terms<|\/cookie-policy</i);
  assert.doesNotMatch(sitemap.html, /\/results(?:\/|<)|\/case-studies</i);
  assert.match(sitemap.html, /https:\/\/www\.120vc\.com\/problems-we-solve</i);
  for (const { path } of problemAliases) assert.doesNotMatch(sitemap.html, new RegExp(`${path}<`, "i"), path);
});

test("connects the three offers, ELPA installation, and the unified resource library", async () => {
  const offers = mainMarkup((await render("/leadership-services")).html);
  for (const slug of ["execution-leadership-coaching", "leadership-system", "embedded-execution-leadership"]) {
    assert.match(offers, new RegExp('href="/' + slug + '"'));
  }
  assert.doesNotMatch(offers, /href="\/executive-leadership-coaching-and-development-performance-accelerator"/);
  const system = mainMarkup((await render("/leadership-system")).html);
  assert.match(system, /href="\/executive-leadership-coaching-and-development-performance-accelerator"/);
  const elpa = mainMarkup((await render("/executive-leadership-coaching-and-development-performance-accelerator")).html);
  assert.match(elpa, /href="\/contact\?inquiry=elpa&amp;source=elpa"/);
  assert.doesNotMatch(elpa, /\$\d+|\b\d+[- ]weeks?\b/);
  const contact = mainMarkup((await render("/contact?inquiry=elpa&source=elpa")).html);
  assert.match(contact, /Regarding:[\s\S]*ELPA installation/);
  const embedded = mainMarkup((await render("/embedded-execution-leadership")).html);
  for (const id of ["initiatives", "portfolios", "enterprise"]) assert.match(embedded, new RegExp('id="' + id + '"'));
  const resources = mainMarkup((await render("/resources")).html);
  assert.match(resources, /id="resource-tab-all"[^>]*aria-selected="true"/);
  for (const slug of newSitemapSlugs.filter(slug => slug.startsWith("resources/"))) {
    assert.match(resources, new RegExp('href="/' + slug + '"'));
    assert.equal((await render("/" + slug)).status, 200);
  }
  const sitemap = (await render("/sitemap.xml")).html;
  for (const slug of newSitemapSlugs) assert.ok(sitemap.includes("https://www.120vc.com/" + slug + "<"));
});

test("explains installation before introducing the ELPA acronym", async () => {
  for (const path of ["/leadership-services"]) {
    const main = mainMarkup((await render(path)).html);
    const cards = [...main.matchAll(/<article\b[^>]*class="home-solution-card"[^>]*>[\s\S]*?<\/article>/g)].map(match => match[0]);
    assert.equal(cards.length, 3);
    assert.doesNotMatch(cards.join(""), /\bELPA\b/, "offer comparison explains the service without an unexplained program name");
    assert.match(visibleText(cards.join("")), /We install shared practices for priorities, ownership, decisions, and follow-through/);
  }
  for (const path of ["/", "/leadership-system", "/executive-leadership-coaching-and-development-performance-accelerator"]) {
    const main = mainMarkup((await render(path)).html);
    assert.match(visibleText(main), /Executive Leadership Performance Accelerator \(ELPA\)/);
  }
});

test("renders the supplied homepage copy, meaningful next steps, and metadata without interaction", async () => {
  const { homepage } = await import(new URL("../app/data/homepage-content.ts", import.meta.url));
  const { html } = await render("/");
  const main = mainMarkup(html);
  const text = visibleText(main);
  for (const section of Object.values(homepage).filter(value => typeof value === "object")) {
    assert.ok(text.includes(section.title), section.title);
    if (section.description) assert.ok(text.includes(section.description), section.description);
    for (const paragraph of section.paragraphs || []) assert.ok(text.includes(paragraph), paragraph);
    for (const item of section.cards || section.items || section.outcomes || []) {
      assert.ok(text.includes(item.title), item.title);
      // Resource categories now orient beneath a usable brief instead of
      // competing with it as three equally prominent offers.
      if (section !== homepage.resources && item.description) assert.ok(text.includes(item.description), item.description);
      if (section !== homepage.resources && item.action) assert.ok(text.includes(item.action), item.action);
      if (item.href) assert.ok(main.includes(`href="${item.href}"`), item.href);
    }
  }
  assert.ok(html.includes(`name="description" content="${homepage.seoDescription}"`));
  assert.match(primaryHero(html), /href="#execution-gap"/);
  assert.doesNotMatch(main, /data-scroll-enter-state="pending"|data-scroll-state="pending"|<details|home-solution-disclosure/, "server/no-JS homepage is fully readable");
  const roles = extractElement(main, "nav", "homepage-role-links");
  assert.equal((roles.match(/<a /g) || []).length, 5);
  assert.doesNotMatch(roles, /<h3/);
  const offers = majorSections(html).find(section => section.includes('id="what-we-do"'));
  assert.doesNotMatch(offers, /role="tab|<ol|Step [123]|<button/, "engagement levels are choices, not required steps");
  const css = readSource("app/homepage-refresh.css");
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*homepage-problem-grid[^}]*grid-template-columns: 1fr/);
  assert.match(css, /\.homepage-refresh \.hero-motion-control\s*\{[^}]*top: auto;[^}]*bottom: 38px;/, "mobile top and bottom offsets cannot stretch the motion control over the copy");
  assert.match(css, /\.homepage-refresh \.hero-motion-media\s*\{[^}]*z-index: auto;/, "motion controls remain above the image overlay");
});

test("offers executive value before contact details and keeps method examples distinct from client evidence", async () => {
  const path = "/resources/execution-decision-brief";
  const { status, html } = await render(path);
  const main = mainMarkup(html);
  assert.equal(status, 200);
  assert.equal((main.match(/<h1\b/g) || []).length, 1);
  assert.match(visibleText(main), /No email required/);
  assert.match(visibleText(main), /A 20-minute meeting agenda/);
  assert.match(visibleText(main), /Refreshing clears them/);
  assert.doesNotMatch(main, /type="email"/, "contact details are not required to start");
  assert.match(main, /<noscript>[\s\S]*ownership-across-teams/);
  for (const route of ["/", "/resources"]) {
    const markup = mainMarkup((await render(route)).html);
    assert.ok(markup.includes(`href="${path}"`), route);
    assert.match(visibleText(markup), /No email required/);
    assert.doesNotMatch(markup, /class="executive-brief-sample"/, "the invitation does not compete with a second sample reading lane");
  }
  for (const route of ["/leadership-system", "/results"]) {
    assert.match(visibleText(mainMarkup((await render(route)).html)), /Illustrative working record · Not client evidence/);
  }
});

test("opens homepage resource links in the matching populated category before hydration", async () => {
  const { homepage } = await import(new URL("../app/data/homepage-content.ts", import.meta.url));
  const { resourceItems } = await import(new URL("../app/data/resource-library.ts", import.meta.url));
  for (const item of homepage.resources.items) {
    const url = new URL(item.href, "http://localhost");
    const category = url.searchParams.get("category");
    const { html, status } = await render(url.pathname + url.search);
    assert.equal(status, 200);
    const main = mainMarkup(html);
    assert.match(main, new RegExp(`id="resource-tab-${category}"[^>]*aria-selected="true"`));
    const panel = extractElement(main, "section", "resource-panel");
    const expected = resourceItems.filter(resource => resource.category === category);
    assert.ok(expected.length > 0, category + " is populated");
    assert.equal((panel.match(/class="resource-category"/g) || []).length, expected.length);
    for (const resource of expected) assert.ok(visibleText(panel).includes(resource.title));
  }
  const fallback = mainMarkup((await render("/resources?category=unknown")).html);
  assert.match(fallback, /id="resource-tab-all"[^>]*aria-selected="true"/);
});

test("restores the homepage visual hierarchy with original generated assets and truthful evidence", async () => {
  const main = mainMarkup((await render("/")).html);
  assertOrdered(main, ['class="hero-motion-media"', 'class="homepage-industry-context"', 'id="execution-gap"'], "research context immediately follows the hero");
  assert.equal((main.match(/AI-generated illustration/g) || []).length, 4, "hero alternative, hero caption and two editorial captions disclose generated imagery");
  const manifest = JSON.parse(readSource("assets/generated-homepage/prompts.json"));
  assert.equal(manifest.mode, "built-in image_gen, generate");
  assert.equal(manifest.assets.length, 3);
  for (const asset of manifest.assets) {
    const data = readFileSync(new URL(`../${asset.web}`, import.meta.url));
    assert.equal(data.toString("ascii", 8, 12), "WEBP");
    assert.ok(data.length < 150_000, `${asset.name}: optimized delivery size`);
    assert.ok(main.includes(asset.web.replace("public", "")), `${asset.name}: used in the page`);
    assert.ok(asset.prompt.includes("photorealistic"));
  }
  const offers = [...main.matchAll(/<article class="homepage-offer-card"[\s\S]*?<\/article>/g)].map(match => match[0]);
  assert.equal(offers.length, 3);
  assert.ok(offers.every(card => card.includes("Best when") && card.includes("<strong>")));
  const css = readSource("app/homepage-refresh.css");
  assert.match(css, /homepage-offer-card:nth-child\(1\)[^}]*var\(--clay\)/);
  assert.match(css, /homepage-offer-card:nth-child\(2\)[^}]*var\(--sage\)/);
  assert.match(css, /homepage-offer-card:nth-child\(3\)[^}]*var\(--ink-deep\)/);
  assert.match(css, /homepage-heading h2[^}]*max-width: 40ch/);
  assert.match(css, /@media \(prefers-reduced-motion: no-preference\)[\s\S]*data-scroll-role="image"/);
  assert.doesNotMatch(main, /This Isn’t Theory|227%|98%|25\+/, "the requested proof block remains a qualified local design preview, not public evidence");
});

test("resolves internal fragment links on every new sitemap page", async () => {
  const paths = ["/", "/leadership-services", "/leadership-system", "/resources", "/contact", ...newSitemapSlugs.map(slug => "/" + slug)];
  const failures = [];
  for (const path of paths) {
    const { html } = await render(path);
    for (const match of mainMarkup(html).matchAll(/href="([^"]*#[^"]+)"/g)) {
      const href = match[1].replaceAll("&amp;", "&");
      if (!href.startsWith("/") && !href.startsWith("#")) continue;
      const [target, hash] = href.split("#");
      const destination = target || path;
      const destinationHtml = (await render(destination)).html;
      if (!destinationHtml.includes('id="' + hash + '"')) failures.push(path + " → " + href);
    }
  }
  assert.deepEqual(failures, []);
});

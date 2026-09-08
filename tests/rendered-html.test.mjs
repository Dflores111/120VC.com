import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import test from "node:test";

const readSource = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

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

const internalGovernanceCopy = /\[APPROVAL REQUIRED\]|PLACEHOLDER TESTIMONIAL|OWNER PREVIEW|LEAD CAPTURE NOT CONNECTED|publication hold|publishing gate|current publishing status|client-specific proof is still gated|content governance|activation status|legal publishing hold|owner-only prototype|remain(?:s)? (?:held|disabled)|approval-dependent|approval-controlled|public interactive implementations remain subject|requires (?:legal )?approval|before (?:public )?(?:launch|publication|activation)|must (?:come from|be supplied and approved)/i;

const publicPlaceholderCopy = /\[APPROVAL REQUIRED\]|\bPLACEHOLDER\b|PLACEHOLDER TESTIMONIAL|FICTIONAL DEMO|ILLUSTRATIVE CASE STUD(?:Y|IES)|OWNER PREVIEW|\bLOREM IPSUM\b|\bTBD\b|\bTODO\b|COMING SOON|UNDER CONSTRUCTION|NOT APPROVED FOR (?:PUBLICATION|PUBLIC)/i;

const canonicalPrimaryCopy = [
  {
    label: "Home",
    path: "/",
    h1: "We install the system that makes strategy deliver.",
    opening: "120VC improves strategy execution by giving enterprise leadership teams one shared way to set priorities, make decisions, own commitments, and turn cost centers into measurable growth engines. We install it inside work already underway and stay until the accountable team can run it without us.",
    action: "Book a Consultation",
  },
  {
    label: "What We Solve",
    path: "/problems-we-solve",
    h1: "Priorities compete. Decisions reopen. Execution stalls.",
    opening: "These strategy execution problems appear when leaders set different priorities, decisions lack owners, and portfolios exceed capacity. 120VC installs one shared way to prioritize, decide, and run the work.",
    action: "See the Five Problems",
  },
  {
    label: "How We Help",
    path: "/leadership-services",
    h1: "Align leaders. Make change stick. Focus the portfolio.",
    opening: "Our strategy execution consulting changes the decisions and operating rhythms inside executive teams, business transformations, and project portfolios—so people know what matters, who owns it, and what moves next.",
    action: "Compare Our Services",
  },
  {
    label: "How It Works",
    path: "/leadership-system",
    h1: "One system for priorities, decisions, and ownership.",
    opening: "120VC installs its Execution Leadership System—a leadership operating system for enterprise teams—inside current priorities and initiatives. We diagnose the break, clarify decision rights, establish the operating rhythm, run it under pressure, and transfer ownership to your team.",
    action: "See How It Works",
  },
  {
    label: "Results",
    path: "/results",
    h1: "Clear priorities. Decisions that hold. Measurable results.",
    opening: "Our strategy execution case studies show the starting condition, what 120VC changed in the work, the measurable result, the timeframe, and the evidence behind it.",
  },
  {
    label: "Resources",
    path: "/resources",
    h1: "Prioritize the work. Make the decision. Protect capacity.",
    opening: "Explore practical strategy execution tools, including prioritization matrices and decision-making frameworks for clarifying resource allocation, strengthening accountability, and keeping enterprise work moving.",
    action: "Explore the Library",
  },
  {
    label: "Consultation",
    path: "/consultation",
    h1: "Where is execution breaking down?",
    opening: "Bring the outcome at risk, the decision that will not hold, or the work that keeps slipping. We will help clarify the condition, determine whether 120VC is relevant, and identify the most useful next step.",
    action: "Start the Request",
  },
  {
    label: "About",
    path: "/about",
    h1: "120VC makes strategy deliver.",
    opening: "120VC installs a leadership operating system inside live enterprise work so teams can align priorities, decision rights, ownership, accountability, and execution.",
    action: "See How It Works",
  },
];

const canonicalOfferAndToolHeadlines = [
  ["Leadership Team Transformation", "/transformation-leadership-team-development-coaching-and-program", "Leadership team development for executives."],
  ["ELPA", "/executive-leadership-coaching-and-development-performance-accelerator", "Executive coaching in live work."],
  ["Enterprise Transformation", "/enterprise-digital-transformation", "Business transformation that sticks."],
  ["Project Portfolio Services", "/roi-driven-project-portfolio-services", "Project portfolio decisions made clear."],
  ["Project Leadership Managed Services", "/project-leadership-managed-services", "Enterprise project management for critical initiatives."],
  ["Smartsheet Portfolio Visibility", "/smartsheet-dashboards", "Smartsheet project portfolio management."],
  ["Prioritization Matrix", "/resources/tools/2x2-prioritization-matrix", "A prioritization matrix for making real trade-offs."],
  ["1-3-1 Decision Builder", "/resources/tools/1-3-1-decision-builder", "Turn one problem into one recommendation."],
  ["Weekly Team DOING", "/resources/tools/weekly-team-doing", "Weekly meetings for decisions and action."],
];

const canonicalOfferActions = [
  ["Leadership Team Transformation", "/transformation-leadership-team-development-coaching-and-program", "Discuss Your Leadership Team"],
  ["ELPA", "/executive-leadership-coaching-and-development-performance-accelerator", "Discuss ELPA"],
  ["Enterprise Transformation", "/enterprise-digital-transformation", "Discuss Your Transformation"],
  ["Project Portfolio Services", "/roi-driven-project-portfolio-services", "Discuss Your Portfolio"],
  ["Project Leadership Managed Services", "/project-leadership-managed-services", "Discuss the Initiative"],
  ["Smartsheet Portfolio Visibility", "/smartsheet-dashboards", "Discuss Portfolio Visibility"],
];

const searchIntentContracts = [
  ["/", "Strategy Execution for Enterprise Leadership Teams | 120VC", ["strategy execution", "Execution Leadership System"]],
  ["/problems-we-solve", "Strategy Execution Problems: Why Good Strategies Fail | 120VC", ["strategy execution problems"]],
  ["/leadership-services", "Strategy Execution, Transformation & PMO Consulting | 120VC", ["strategy execution consulting", "leadership team development", "business transformation consulting", "project portfolio management"]],
  ["/leadership-system", "Leadership Operating System for Strategy Execution | 120VC", ["leadership operating system", "decision rights", "operating rhythm"]],
  ["/results", "Enterprise Results and Strategy Execution Case Studies | 120VC", ["strategy execution case studies"]],
  ["/resources", "Strategy Execution Tools for Priorities, Decisions & Accountability | 120VC", ["strategy execution tools", "prioritization matrices", "decision-making frameworks"]],
  ["/transformation-leadership-team-development-coaching-and-program", "Leadership Team Development for Executive Teams | 120VC", ["leadership team development", "leadership team coaching"]],
  ["/executive-leadership-coaching-and-development-performance-accelerator", "Executive Leadership Development Inside Live Work | ELPA | 120VC", ["executive leadership development"]],
  ["/enterprise-digital-transformation", "Business Transformation Consulting for Measurable Value | 120VC", ["business transformation consulting"]],
  ["/roi-driven-project-portfolio-services", "Project Portfolio Management & PMO Consulting | 120VC", ["project portfolio management", "allocate resources"]],
  ["/project-leadership-managed-services", "Enterprise Project Management Consulting for Critical Initiatives | 120VC", ["project management consulting"]],
  ["/smartsheet-dashboards", "Smartsheet Project Portfolio Dashboards & Consulting | 120VC", ["Smartsheet project portfolio management"]],
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
    assert.doesNotMatch(hero, /class="[^"]*(?:orientation-label|hero-eyebrow|hero-kicker|hero-label)[^"]*"/i, `${label}: no decorative label before the answer`);
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
  assert.match(header, /href="\/consultation(?:\?[^"]*)?"[^>]*>Book a Consultation/i, "the persistent commercial action uses the concise label");
  assert.equal((mainMarkup(html).match(/>Book a Consultation\s*</gi) || []).length, 2, "both homepage consultation moments use the same familiar action");
});

test("renders the homepage as a complete commercial buyer journey", async () => {
  const { status, html } = await render("/");
  assert.equal(status, 200);
  const main = mainMarkup(html);

  assert.match(main, /We install the system that[\s\S]*headline-keyword headline-keyword-on-dark[\s\S]*makes strategy deliver/i);
  assert.match(main, /enterprise leadership teams one shared way to set priorities, make decisions, own commitments, and turn cost centers into measurable growth engines/i);
  assert.doesNotMatch(main, /Inside live work|With the accountable team|Built for ownership|No scripted sales presentation/i, "hero avoids abstract micro-taglines");
  assert.deepEqual(attributeValues(main, "data-journey-stage"), ["position", "recognize", "solution", "difference", "act"]);
  const sections = majorSections(html);
  assert.equal(sections.length, 5);
  assertOrdered(main, ["Five strategy execution problems we solve.", "We help leaders change how critical work runs.", "A leadership operating system installed in four stages.", "Bring us the problem that keeps returning."], "homepage attention journey");
  assert.match(main, /class="hero-motion-media"/i);
  assert.match(main, /class="home-logo-marquee"/i);
  assert.match(main, /120VC has worked with leaders and teams at/i);
  assert.equal((main.match(/class="home-logo-item"/g) || []).length, 34, "17 approved marks render in two visual marquee copies");
  assertOrdered(main, ["We install the system", "120VC has worked with leaders and teams at", "Five strategy execution problems we solve.", "CLEAR PRIORITIES", "We help leaders change how critical work runs."], "homepage trust, recognition, and memory sequence");
  assert.match(main, /class="pain-carousel"/i);
  assert.equal((main.match(/class="pain-card"/g) || []).length, 5);
  assert.equal((main.match(/class="home-solution-card"/g) || []).length, 3);
  assert.equal((main.match(/class="home-solution-link"/g) || []).length, 5, "service families expose every offer they name");
  assert.equal((main.match(/<dt>Best when<\/dt>/g) || []).length, 3, "each solution disclosure starts with fit context");
  assert.equal((main.match(/<dt>First shift<\/dt>/g) || []).length, 3, "each solution disclosure explains the initial operating shift");
  assert.equal((main.match(/<dt>Visible difference<\/dt>/g) || []).length, 3, "each solution disclosure states the visible difference");
  assert.equal((main.match(/Is this the right fit\?/g) || []).length, 3, "each disclosure promises a decision-useful answer");
  assert.doesNotMatch(main, /What changes first/i, "the low-value one-line disclosure label is removed");
  assert.equal((main.match(/class="pain-card-face pain-card-front"/g) || []).length, 5);
  assert.equal((main.match(/class="pain-card-face pain-card-back"/g) || []).length, 5);
  assert.match(main, /role="tablist" aria-label="120VC installation sequence"/i);
  assert.equal((main.match(/id="installation-step-\d"/g) || []).length, 4);
  assert.equal((main.match(/class="home-stepper-tab-value"/g) || []).length, 4, "every stage carries a mobile-readable value statement");
  assert.match(main, /class="home-stepper-value"[\s\S]*Inside the work[\s\S]*What this gives you/i, "the selected stage explains both the operating work and buyer value");
  assertOrdered(main, ["Diagnose", "one shared diagnosis", "Install", "one practical way to prioritize", "Operate", "Decisions hold longer", "Own", "without depending on 120VC"], "installation stage value sequence");
  assert.doesNotMatch(main, /class="problem-explorer|class="system-explorer/i);
  assertOnePrimaryActionPerSection(html, "homepage");
  assertSignalsMapToControls(main, "homepage");
  assertHeadlineStructure(main, "homepage");
  assertAccessibleLocalImages(main, "homepage");
  assert.doesNotMatch(main, internalGovernanceCopy);
  assert.doesNotMatch(main, /featured-proof|testimonial|glow-card|data-review-panel|APPROVAL REQUIRED/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("keeps the homepage chapter order and development proof architecture explicit", async () => {
  const homeSource = readSource("app/page.tsx");
  const proofComponent = readSource("app/components/featured-case-carousel.tsx");
  const kineticSource = readSource("app/components/kinetic-statement.tsx");
  const carouselSource = readSource("app/components/pain-point-carousel.tsx");
  const solutionSource = readSource("app/components/solution-scope-cards.tsx");
  const installationSource = readSource("app/components/installation-stepper.tsx");
  const css = readSource("app/hierarchy.css");
  const comparisonSource = proofComponent.slice(proofComponent.indexOf("function ProofComparison"), proofComponent.indexOf("function analyticsProperties"));

  assertOrdered(homeSource, ["<LogoMarquee", "className=\"home-pains\"", "<KineticStatement", "className=\"home-solutions\"", "className=\"home-client-results\"", "className=\"home-installation\"", "className=\"experience-close home-commercial-close\""], "homepage source chapters");
  assert.doesNotMatch(homeSource, /Not sure which scope fits\?|Bring the condition, not a predetermined offer\.|home-solution-routing/i, "the orphan service-routing line and wrapper are removed");
  assert.match(homeSource, /<SolutionScopeCards scopes=\{solutionScopes\} \/>\s*<\/section>\s*\{featuredCases\.length/i, "How We Help ends cleanly and transitions directly to proof");
  assert.match(carouselSource, /onPointerEnter=/i, "pain cards preview on fine-pointer hover");
  assert.match(carouselSource, /onPointerLeave=/i, "pain cards return after fine-pointer hover");
  assert.match(carouselSource, /onFocusCapture=/i, "pain-card hover behavior is mirrored for keyboard focus");
  assert.match(carouselSource, /onBlurCapture=/i, "pain-card focus preview returns when focus leaves");
  assert.doesNotMatch(kineticSource, /CLEAR PRIORITIES\.|DECISIONS THAT HOLD\.|TEAMS THAT DELIVER\./i);
  assert.match(kineticSource, /home-kinetic-separator/i);
  assert.match(css, /\.home-kinetic-separator\s*\{[^}]*color:\s*var\(--action-orange\)/is);
  assert.match(css, /\.home-kinetic-group\s*\{[^}]*gap:\s*clamp\(48px,\s*5vw,\s*96px\)/is);
  assert.match(css, /\.home-stepper-tabs\s*\{[^}]*grid-template-columns:\s*repeat\(4,minmax\(0,1fr\)\)/is, "desktop installation tabs remain equal-width stages");
  assert.match(css, /\.home-stepper-tabs button\s*\{[^}]*width:\s*100%[^}]*min-width:\s*0/is, "stage labels cannot expand one tab beyond its grid track");
  assert.match(css, /\.commercial-home \.home-stepper-panel\s*\{[^}]*height:\s*560px[^}]*overflow:\s*hidden/is, "portrait photography cannot make one homepage stage longer than the others");
  assert.match(installationSource, /<dt>Inside the work<\/dt>[\s\S]*<dt>What this gives you<\/dt>/i, "each selected stage earns its interaction with operating detail and value");
  assert.match(proofComponent, /aria-roledescription="carousel"/i);
  assert.match(proofComponent, /aria-label="Previous case study"/i);
  assert.match(proofComponent, /aria-label="Next case study"/i);
  assert.doesNotMatch(proofComponent, /setInterval|autoPlay|autoplay/i, "featured cases remain manual");
  assert.match(proofComponent, /const isActive = index === current/i, "one carousel index owns the active state");
  assert.match(proofComponent, /data-active=\{isActive \? "true" : "false"\}/i);
  assert.match(proofComponent, /aria-hidden=\{!isActive\}/i, "inactive cases leave the accessibility reading path");
  assert.match(comparisonSource, /Before[\s\S]*120VC Changed[\s\S]*After/i, "the complete transformation chain remains visible");
  assert.match(proofComponent, /AnimatedResultValue[\s\S]*sr-only/i, "animated results retain a static text equivalent");
  assert.equal((proofComponent.match(/<AnimatedResultValue\b/g) || []).length, 1, "each case template renders one primary result");
  assert.doesNotMatch(proofComponent, /supportingResults\.map|featured-case-supporting-results/i, "secondary metrics stay off the homepage");
  assert.doesNotMatch(proofComponent, /conditionSummary|interventionSummary|afterSummary|featured-case-story|case-evidence-/i, "no parallel dashboard or abstract evidence diagram remains");
  assert.equal((proofComponent.match(/<ProofStageIcon stage=/g) || []).length, 3, "each transformation stage has one restrained semantic icon");
  assert.match(proofComponent, /case-stage-icon[^>]*aria-hidden="true"[\s\S]*<svg[^>]*focusable="false"/i, "proof icons remain decorative beside visible stage labels");
  assert.equal((proofComponent.match(/<ProofPointIcon stage=/g) || []).length, 3, "each proof list uses one consistent semantic guide rather than unrelated decorative icons");
  assert.match(proofComponent, /case-point-icon[^>]*aria-hidden="true"[\s\S]*<svg[^>]*focusable="false"/i, "proof-point icons remain decorative beside visible statements");
  assert.match(proofComponent, /proofStatus === "approved" \? "Case Study" : "Illustrative Case Study"/i, "case-study orientation remains truthful for approved and illustrative proof");
  assert.match(css, /\.featured-case-kicker\s*\{[^}]*font-size:\s*clamp\(18px,\s*1\.45vw,\s*22px\)/is, "the case-study orientation is readable rather than tiny eyebrow text");
  assert.doesNotMatch(css, /\.featured-case-kicker\s*\{[^}]*text-transform:\s*uppercase/is, "the case-study orientation is not reduced to decorative all-caps microcopy");
  assert.match(css, /\.featured-case-header h3\s*\{[^}]*max-width:\s*24ch/is, "proof headlines use a wider desktop measure to favor two lines");
  assert.match(css, /@media \(max-width:\s*760px\)[\s\S]*\.featured-case-header h3\s*\{[^}]*max-width:\s*100%/is, "proof headlines use the full available mobile measure");
  assert.match(css, /\.featured-case-type\s*\{[^}]*font-size:\s*18px/is, "case context remains readable");
  assert.match(css, /\.case-stage h4\s*\{[^}]*font-size:\s*clamp\(16px,\s*1\.1vw,\s*18px\)/is, "transformation-stage labels remain readable");
  assert.match(css, /\.featured-case-result > span\s*\{[^}]*font-size:\s*16px/is, "result timeframe is not fine print");
  assert.match(css, /\.featured-case blockquote footer\s*\{[^}]*font-size:\s*16px/is, "testimonial attribution is not fine print");
  assert.match(css, /\.featured-case-outcome\s*\{[^}]*font-size:\s*16px/is, "case-study CTA is not fine print");
  assert.match(css, /\.featured-case-controls p\s*\{[^}]*font-size:\s*16px/is, "case carousel progress is readable");
  assertOrdered(comparisonSource, ["case-stage-before", "Before", "case-stage-change", "120VC Changed", "case-stage-after", "After", "<AnimatedResultValue"], "comparison reading order");
  assertOrdered(proofComponent, ["<header className=\"featured-case-header\">", "featured-case-kicker", "<h3>{caseStudy.title}</h3>", "{caseStudy.context}", "<div className=\"featured-case-core\">", "<ProofComparison", "featured-case-intervention", "<blockquote>", "featured-case-outcome"], "proof reading order");
  assert.match(proofComponent, /<blockquote>[\s\S]*caseStudy\.quote[\s\S]*caseStudy\.quoteRole[\s\S]*caseStudy\.quoteOrganization/i, "the client quote closes each proof story with one attribution line");
  for (const redundantLabel of ["What gets in the way", "How we help", "Client results", "How it works", "The next useful step"]) {
    assert.doesNotMatch(homeSource, new RegExp(`>${redundantLabel}<`, "i"), `${redundantLabel}: redundant homepage eyebrow removed`);
  }
  assert.doesNotMatch(solutionSource, /<small>\{scope\.label\}<\/small>/i, "service names do not repeat as eyebrows");
  assert.doesNotMatch(installationSource, /Step \{current\.number\}/i, "the active step does not add a redundant Step label");
  assert.match(carouselSource, /pain-card-cost[\s\S]*pain-card-change/i, "pain-card backs use natural editorial statements");
  assert.match(homeSource, /query\.motion === "reduce" && process\.env\.NODE_ENV !== "production"/i, "nonproduction QA can expose the exact reduced-motion proof state");
  assert.match(proofComponent, /useHydratedReducedMotion\(\) \|\| forceReducedMotion/i);
  assert.match(proofComponent, /case_story_viewed[\s\S]*case_story_next[\s\S]*case_story_previous|case_story_next[\s\S]*case_story_previous[\s\S]*case_story_viewed/i);
  assert.match(proofComponent, /case_story_cta_clicked/i);
  assert.match(proofComponent, /sourcePage\?: "homepage" \| "results"/i, "shared case analytics identify the page that rendered the story");
  assert.match(proofComponent, /IntersectionObserver/i, "a case view is recorded only after the carousel enters the viewport");
  assert.match(readSource("app/components/results-experience.tsx"), /FeaturedCaseCarousel cases=\{cases\} sourcePage="results"/i);
  assert.match(css, /prefers-reduced-motion:\s*reduce[\s\S]*\.case-stage-after > ul[\s\S]*opacity:\s*1\s*!important/is, "reduced motion exposes the final comparison state without animation");
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

test("does not leak placeholder or owner-review language across public routes", async () => {
  const source = readSource("app/site-data.ts");
  const slugs = [...source.matchAll(/^\s+slug: "([^"]+)"/gm)].map((match) => match[1]);
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

test("uses direct public navigation and withholds Results until proof is approved", async () => {
  const { html } = await render("/");
  const navigationSource = readSource("app/data/primary-experience.ts");
  const proofSource = readSource("app/data/proof-governance.ts");
  const experienceLogoSource = readSource("app/data/approved-experience-logos.ts");
  const header = extractElement(html, "header", "global-header");
  const desktopNav = extractElement(header, "nav", "desktop-nav");
  const footer = extractElement(html, "footer", "master-footer");

  const declaredNavigation = navigationSource.slice(navigationSource.indexOf("export const primaryNavigation"), navigationSource.indexOf("export const problemRouteConditions"));
  assertOrdered(declaredNavigation, ["What We Solve", "How We Help", "How It Works", "Results", "Resources"], "five declared primary destinations");
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

  assertOrdered(desktopNav, ["What We Solve", "How We Help", "How It Works", "Resources"], "primary navigation");
  assert.equal((desktopNav.match(/<a\b/gi) || []).length, 4, "four audience-ready destinations render while Results is gated");
  assert.doesNotMatch(desktopNav, />\s*(?:Results|For Leaders|About|J\.Scott|FAQ)\s*</i);
  assert.doesNotMatch(desktopNav, /<button\b|aria-expanded|mega-menu/i, "desktop navigation uses direct links, not disclosure menus");
  assert.match(header, /href="\/consultation(?:\?[^"]*)?"[^>]*>Book a Consultation/i);
  assert.match(header, /aria-expanded="false" aria-controls="mobile-navigation"/i);

  assert.match(footer, /Turn strategy into measurable results/i);
  assertOrdered(footer, ["Explore", "Company"], "footer columns");
  assert.match(footer, /How We Help/i);
  assert.doesNotMatch(footer, /Results &amp; Evidence|>Results</i);
  for (const label of ["About 120VC", "J. Scott", "For Leaders", "Careers", "Contact", "FAQ", "Privacy", "Terms", "Cookie Policy", "GSD Shop"]) {
    assert.match(footer, new RegExp(label.replace(".", "\\."), "i"), `footer: ${label}`);
  }
  assert.match(footer, /install a shared way to prioritize, decide, and own the work/i);
});

test("makes each primary destination answer its navigation promise without hero breadcrumbs", async () => {
  for (const { label, path, h1: answer } of canonicalPrimaryCopy.filter(({ path }) => path !== "/")) {
    const main = mainMarkup((await render(path)).html);
    const h1 = main.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/i)?.[0] || "";
    assert.equal(visibleText(h1), answer, `${label}: the H1 should immediately answer the navigation promise`);
    assert.doesNotMatch(main, /aria-label="Breadcrumb"|problem-breadcrumb/i, `${label}: the hero should not repeat its route as a breadcrumb`);
  }

  const homepage = mainMarkup((await render("/")).html);
  assertOrdered(homepage, [
    "Five strategy execution problems we solve.",
    "We help leaders change how critical work runs.",
    "A leadership operating system installed in four stages.",
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
  const kineticSource = readSource("app/components/kinetic-statement.tsx");
  const logoSource = readSource("app/components/logo-marquee.tsx");
  const carouselSource = readSource("app/components/pain-point-carousel.tsx");
  const installationSource = readSource("app/components/installation-stepper.tsx");
  const problemSource = readSource("app/components/problem-explorer.tsx");
  const systemSource = readSource("app/components/system-explorer.tsx");
  const { html } = await render("/");

  assert.doesNotMatch(css, /animation:[^;}]*(?:pulse)/i);
  assert.doesNotMatch(css, /home-thesis-track/i);
  assert.match(css, /@keyframes home-marquee-left/i);
  assert.match(css, /\.home-logo-marquee-track[\s\S]*animation:\s*home-marquee-left\s+46s\s+linear\s+infinite/i);
  assert.match(css, /\.home-kinetic-track[\s\S]*animation:\s*home-marquee-left\s+19s\s+linear\s+infinite/i);
  assert.match(kineticSource, /useHydratedReducedMotion\(\)/i);
  assert.match(kineticSource, /document\.hidden/i);
  assert.match(kineticSource, /Pause statement/i);
  assert.match(logoSource, /useHydratedReducedMotion\(\)/i);
  assert.match(logoSource, /document\.hidden/i);
  assert.match(logoSource, /Pause movement/i);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.execution-spine \*[\s\S]*?animation:\s*none\s*!important/is);
  for (const [label, source] of [["hero media", heroSource], ["logo marquee", logoSource], ["kinetic statement", kineticSource], ["carousel", carouselSource], ["installation stepper", installationSource], ["problem explorer", problemSource], ["system explorer", systemSource]]) {
    assert.match(source, /use(?:Hydrated)?ReducedMotion\(\)/i, `${label}: reduced-motion hook`);
  }
  assert.match(heroSource, /document\.hidden/i);
  assert.match(heroSource, /Pause motion/i);
  assert.doesNotMatch(heroSource, /setInterval|slides\.map|activeSlide/i, "hero uses one finite cinematic treatment rather than an autoplay slideshow");
  assert.doesNotMatch(carouselSource, /setInterval|autoPlay|autoplay/i, "pain carousel remains manual");
  assert.doesNotMatch(homeSource, /<TextEffect\b/i, "hero copy remains stable while media owns motion");
  assert.doesNotMatch(`${homeSource}\n${problemSource}`, /<Reveal\b|<GlowCard\b/i);
  assert.doesNotMatch(mainMarkup(html), /class="[^"]*\breveal\b|glow-card/i);
});

test("keeps navigation, problem choices, and system exploration keyboard-operable", async () => {
  const headerSource = readSource("app/components/site-header.tsx");
  const nativeLinkSource = readSource("app/components/native-link.tsx");
  const problemSource = readSource("app/components/problem-explorer.tsx");
  const systemSource = readSource("app/components/system-explorer.tsx");
  const carouselSource = readSource("app/components/pain-point-carousel.tsx");
  const installationSource = readSource("app/components/installation-stepper.tsx");
  const css = readSource("app/hierarchy.css");

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

  assert.match(problemSource, /role="region" aria-label="Five execution problems"/i);
  assert.match(problemSource, /aria-pressed=\{selected === item\.id\}/i);
  assert.match(problemSource, /aria-controls="selected-condition-detail"/i);
  assert.match(problemSource, /View details below for/i, "the selection control predicts where its result will appear");
  assert.match(problemSource, /event\.key !== "Escape"/i, "keyboard users can dismiss hover-revealed content");
  assert.match(carouselSource, /event\.key !== "Escape"/i, "homepage flip cards can be dismissed with Escape");
  assert.match(problemSource, /centeredLeft[\s\S]*element\.scrollTo\(\{ left:[\s\S]*behavior: reduceMotion/i, "the selected card is brought into view above its result");
  assert.match(problemSource, /cardCenter[\s\S]*setSelectionAnchor/i, "the visual connector tracks the selected card while the rail moves");
  assert.match(problemSource, /scrollIntoView\(\{ behavior: reduceMotion \? "auto" : "smooth", block: "start" \}\)/i, "selection brings its linked diagnostic into view");
  assert.match(problemSource, /problem-selection-connector/i, "the card selector is visually connected to its result");
  assert.match(problemSource, /problem-selection-status[\s\S]*Your selected problem[\s\S]*condition\.label/i, "selection context sits in the bridge above the diagnostic");
  assert.doesNotMatch(problemSource, /problem-diagnostic-header[\s\S]{0,300}Your selected problem/i, "selection context does not compete with the diagnostic headline");
  assert.doesNotMatch(problemSource, /problem-condition-flip-control|toggleCondition|aria-expanded=\{isFlipped\}/i, "condition cards do not add a redundant click-to-flip mode");
  assert.match(problemSource, /Hover to see impact/i, "fine-pointer preview is stated without looking like a control");
  assert.match(problemSource, /onPointerEnter=/i, "fine-pointer hover previews the condition impact");
  assert.match(problemSource, /onPointerLeave=/i, "the preview returns when the pointer leaves");
  assert.match(problemSource, /onFocusCapture=/i, "keyboard focus mirrors the hover preview");
  assert.match(problemSource, /onBlurCapture=/i, "the focus preview closes when focus leaves the card");
  assert.match(problemSource, /problem-condition-card-front[\s\S]*item\.preview[\s\S]*problem-condition-card-back[\s\S]*item\.cost[\s\S]*item\.change/i, "front and back communicate two sides of the same condition");
  assert.match(problemSource, /problem-action-grid[\s\S]*actionOrder\.map/i, "essential next-step choices remain outside the flip state");
  assert.match(problemSource, /problem-next-steps[\s\S]*Choose the next step that fits your situation/i, "next-step choices are introduced before the links");
  assert.match(problemSource, /pointerType !== "mouse"/i, "hover preview is limited to mouse pointers");
  assert.match(problemSource, /Scroll, swipe, or use the arrows to see all five problems/i, "horizontal discovery is explicit");
  assert.match(problemSource, /Previous execution problem/i);
  assert.match(problemSource, /Next execution problem/i);
  for (const [label, source] of [["problem", problemSource], ["system", systemSource]]) {
    assert.match(source, /"ArrowRight"|event\.key === "ArrowRight"/, `${label}: arrow keys`);
    assert.match(source, /event\.key === "Home"/, `${label}: Home key`);
    assert.match(source, /event\.key === "End"/, `${label}: End key`);
  }
  assert.match(systemSource, /role="tablist"/, "system: tablist");
  assert.match(systemSource, /role="tab"/, "system: tabs");
  assert.match(systemSource, /role="tabpanel"/, "system: panel");
  assert.match(problemSource, /window\.history\.pushState/i, "problem state is recoverable through browser history");
  assert.match(problemSource, /window\.addEventListener\("popstate"/i);
  assert.match(systemSource, /window\.history\.pushState/i);
  assert.match(systemSource, /window\.addEventListener\("popstate"/i);
  assert.match(css, /:focus-visible/i);
  for (const selector of [
    "problem-action-card:hover",
    "direct-mobile-drawer nav > a:hover",
    "mobile-drawer-header button:hover",
    "home-section-link:hover",
    "featured-case-outcome a:hover",
    "system-node-practice a:hover",
    "results-methodology-list summary:hover",
    "consultation-direct a:hover",
  ]) assert.match(css, new RegExp(selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `${selector}: explicit hover feedback`);
  for (const [label, source] of [["pain carousel", carouselSource], ["installation stepper", installationSource]]) {
    assert.match(source, /event\.key === "ArrowRight"/i, `${label}: ArrowRight`);
    assert.match(source, /event\.key === "Home"/i, `${label}: Home`);
    assert.match(source, /event\.key === "End"/i, `${label}: End`);
  }
});

test("renders five parallel conditions and three visible next steps in one What We Solve experience", async () => {
  const { status, html } = await render("/problems-we-solve?condition=strategy-drift&mode=understand");
  assert.equal(status, 200);
  const main = mainMarkup(html);

  assert.match(visibleText(main), /Priorities compete\. Decisions reopen\. Execution stalls/i);
  assert.match(main, /Which problem keeps coming back/i);
  assert.match(main, /See the five problems/i);
  assert.doesNotMatch(main, /Find the familiar pattern|Five conditions leaders recognize/i);
  assert.deepEqual(attributeValues(main, "data-journey-stage"), ["recognize", "understand", "solution"]);
  assert.equal(majorSections(html).length, 3);
  assert.equal((main.match(/class="problem-condition-card"/g) || []).length, 5);
  assert.equal((main.match(/class="problem-condition-flip-control"/g) || []).length, 0);
  assert.equal((main.match(/class="problem-condition-select-control"/g) || []).length, 5);
  assert.equal((main.match(/aria-pressed="true"/g) || []).length, 1);
  for (const { label } of problemAliases) {
    assert.match(main, new RegExp(label, "i"), label);
  }
  assert.match(main, /aria-label="Next steps for Priorities keep changing"/i);
  assert.match(main, /Your selected problem:<\/span><strong>Priorities keep changing/i);
  assert.match(main, /Use this diagnostic to confirm the warning signs, understand why the problem matters, and see what leaders must change/i);
  assert.match(main, /What you may be seeing/i);
  assert.match(main, /Why it matters/i);
  assert.match(main, /What leaders must change/i);
  assert.equal((main.match(/class="diagnostic-lens-icon"/g) || []).length, 3);
  assert.match(main, /data-selected-condition="strategy-drift"/i);
  assert.match(main, /Choose the next step that fits your situation/i);
  assert.match(main, /Learn why the problem persists, use a practical tool now, or talk with 120VC about changing the system around the work/i);
  assert.match(main, /Scroll, swipe, or use the arrows to see all five problems/i);
  assert.match(main, /class="[^"]*problem-condition-edge-fade[^"]*horizontal-card-edge-fade-right[^"]*"/i);
  assert.equal((main.match(/class="problem-action-card"/g) || []).length, 3);
  for (const mode of ["Understand it", "Work on it", "Get help"]) assert.match(main, new RegExp(mode, "i"), mode);
  assert.match(main, /The strategy is clear\. The work keeps drifting/i);
  assert.match(main, /class="execution-spine execution-spine-repair/i);
  assertAccessibleLocalImages(main, "What We Solve");
  assertOnePrimaryActionPerSection(html, "What We Solve");
  assertSignalsMapToControls(main, "What We Solve");
  assertHeadlineStructure(main, "What We Solve");
  assert.doesNotMatch(main, /glow-card|flip-card|testimonial-marquee|data-review-panel/i);
});

test("fades horizontal card rails only where more content remains", async () => {
  const home = mainMarkup((await render("/")).html);
  const problems = mainMarkup((await render("/problems-we-solve")).html);
  const resources = mainMarkup((await render("/resources")).html);

  assert.match(home, /class="pain-carousel-rail-window horizontal-card-rail-window"[^>]*data-at-start="true"[^>]*data-at-end="false"/i);
  assert.match(problems, /class="problem-condition-rail-window horizontal-card-rail-window"[^>]*data-at-start="true"[^>]*data-at-end="false"/i);
  assert.match(resources, /class="resource-card-rail-window horizontal-card-rail-window"[^>]*data-at-start="true"[^>]*data-at-end="false"/i);
  for (const markup of [home, problems, resources]) {
    assert.match(markup, /horizontal-card-edge-fade-left/i);
    assert.match(markup, /horizontal-card-edge-fade-right/i);
  }

  for (const sourcePath of ["app/components/pain-point-carousel.tsx", "app/components/problem-explorer.tsx", "app/components/resource-explorer.tsx"]) {
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
    assert.match(visibleText(main), /Priorities compete\. Decisions reopen\. Execution stalls/i, alias.path);
    assert.match(main, alias.headline, alias.path);
    assert.match(main, new RegExp(`<button\\b(?=[^>]*data-condition="${alias.condition}")(?=[^>]*data-selected="true")(?=[^>]*aria-pressed="true")[^>]*>`, "i"), `${alias.path}: selected condition`);
    assert.match(main, new RegExp(`src="${alias.image.replaceAll("/", "\\/")}"`, "i"), `${alias.path}: human image`);
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

test("renders the custom Execution Spine and six-node system explorer", async () => {
  const css = readSource("app/hierarchy.css");
  const { status, html } = await render("/leadership-system?node=decisions");
  assert.equal(status, 200);
  const main = mainMarkup(html);

  assert.match(visibleText(main), /One system for priorities, decisions, and ownership/i);
  assert.equal(majorSections(html).length, 5);
  assert.match(main, /class="execution-spine execution-spine-connected/i);
  assert.match(main, /role="tablist" aria-label="Execution Leadership System"/i);
  const nodeTabs = extractElement(main, "div", "system-node-tabs");
  assert.equal((nodeTabs.match(/role="tab"/g) || []).length, 6);
  for (const label of ["Intent", "Priorities", "Decisions", "Commitments", "Execution", "Outcomes"]) {
    assert.match(main, new RegExp(`>${label}<`, "i"), label);
  }
  assert.match(main, /id="system-node-tab-decisions"[^>]*aria-selected="true"|aria-selected="true"[^>]*id="system-node-tab-decisions"/i);
  assert.match(main, /role="tabpanel"/i);
  assert.match(main, /Make a clear decision that will hold/i);
  assert.match(main, /What leaders make visible/i);
  assert.match(main, /Which changes the work/i);
  assert.match(main, /What changes/i);
  assert.match(main, /Use the related practice/i);
  assert.match(main, /The problem to resolve[\s\S]*Viable options and tradeoffs[\s\S]*One recommendation and decision owner/i);
  assert.match(main, /Meetings end with a decision that does not need to be reopened/i);
  assert.match(main, /Open[\s\S]*1-3-1 Decision Builder/i);
  assert.match(main, /class="system-node-connector"/i, "the inputs and outcome need an explicit visual connection");
  assert.match(css, /\.system-node-panel\s*\{[^}]*min-height:\s*620px[^}]*flex-direction:\s*column/is, "each system tab must open a substantive, stable linear brief");
  assert.match(css, /\.system-node-focus ul\s*\{[^}]*grid-template-columns:\s*repeat\(3/is, "parallel inputs should read as one grouped component on desktop");
  assert.doesNotMatch(css, /\.system-node-panel\s*\{[^}]*grid-template-columns:/is, "the panel must not return to a competing two-by-two reading path");
  assertOrdered(main, ["Diagnose", "Install", "Operate", "Own"], "installation sequence");
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

  for (const [label, source] of [["home", homeSource], ["dynamic route", routeSource]]) {
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
  assert.match(css, /text-wrap:\s*balance/i);

  for (const path of ["/", "/problems-we-solve", "/leadership-system", ...problemAliases.map(({ path }) => path)]) {
    assertHeadlineStructure(mainMarkup((await render(path)).html), path);
  }
});

test("server-renders every configured route without governance leakage or section overload", async () => {
  const source = readSource("app/site-data.ts");
  const slugs = [...source.matchAll(/^\s+slug: "([^"]+)"/gm)].map((match) => match[1]);
  assert.ok(slugs.length >= 67, `expected at least 67 configured routes plus the homepage, found ${slugs.length}`);

  const failures = [];
  for (const slug of slugs) {
    const path = `/${slug}`;
    const { status, html } = await render(path);
    if (status !== 200) failures.push(`${path}: status ${status}`);
    const main = mainMarkup(html);
    const sectionCount = majorSections(html).length;
    if ((main.match(/<h1\b/gi) || []).length !== 1) failures.push(`${path}: expected one H1`);
    if (sectionCount > 5) failures.push(`${path}: ${sectionCount} major sections`);
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
    ["/leadership-system", /One system for priorities, decisions, and ownership/i],
    ["/leadership-system/installation", /Install the system inside the work/i],
    ["/leadership-services", /Align leaders\. Make change stick\. Focus the portfolio/i],
    ["/leadership-services/compare-solutions", /Choose the installation scope/i],
    ["/results", /Clear priorities\. Decisions that hold\. Measurable results/i],
    ["/results/methodology", /Every claim needs a definition/i],
    ["/resources", /Prioritize the work\. Make the decision\. Protect capacity/i],
    ["/resources/tools", /See the system in practice/i],
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
  assert.match(solutionEnding, /Talk through the problem/i);
});

test("keeps every internal navigation outcome resolvable", async () => {
  const source = readSource("app/site-data.ts");
  const slugs = [...source.matchAll(/^\s+slug: "([^"]+)"/gm)].map((match) => match[1]);
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
  assert.match(html, /Where is execution breaking down/i);
  assert.match(html, /First name/i);
  assert.match(html, /Work email/i);
  assert.match(html, /Company/i);
  assert.match(html, /Role or title/i);
  assert.match(html, /Where is the work breaking/i);
  assert.match(html, /What are you trying to get done/i);
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
  assert.match(help, /Executive Teams/i);
  assert.match(help, /Business Transformation/i);
  assert.match(help, /Project Portfolios &amp; Critical Initiatives/i);
  assert.match(help, /Stronger[\s\S]*leadership[\s\S]*Faster[\s\S]*transformation[\s\S]*Focused[\s\S]*portfolios/i);
  assert.match(visibleText(help), /Align leaders\. Make change stick\. Focus the portfolio/i);
  assert.equal((help.match(/class="home-solution-card"/g) || []).length, 3);
  assert.equal((help.match(/<dl class="home-solution-change-list">/g) || []).length, 3);
  assert.equal((help.match(/<dt>(?:Best when|First shift|Visible difference)<\/dt>/g) || []).length, 9);
  assert.doesNotMatch(help, /What determines fit|solution-fit-grid/i);

  const results = mainMarkup((await render("/results")).html);
  assert.match(visibleText(results), /Clear priorities\. Decisions that hold\. Measurable results/i);
  assert.match(results, /What a credible case study should show/i);
  assert.match(results, /See what sits behind the number/i);
  assert.doesNotMatch(results, /\b\d+%\b|Illustrative Case Study|Client logo/i);

  const resources = mainMarkup((await render("/resources")).html);
  assert.match(resources, /role="tablist" aria-label="Choose how to use the resource library"/i);
  assert.match(resources, /role="tab"[^>]*aria-selected="true"/i);
  assert.match(resources, /role="tabpanel"/i);
  assert.match(resources, /2×2 Prioritization Matrix/i);
  assert.match(resources, /FRAMEWORKS/i);
  assert.match(resources, /GUIDES &amp; INSIGHTS/i);
  assert.match(resources, /do not yet save or submit your work/i, "framework pages are not presented as finished interactive tools");

  const consultation = mainMarkup((await render("/consultation")).html);
  assertOrdered(consultation, ["Share enough context for a useful conversation", "Review the context", "Talk about the real condition", "Leave with a recommendation"], "consultation journey");

  const resourceSource = readSource("app/components/resource-explorer.tsx");
  assert.match(resourceSource, /ArrowRight|ArrowLeft|Home|End/i);
  assert.match(resourceSource, /tabIndex=\{activeId === group\.id \? 0 : -1\}/i);

  const contentSource = readSource("app/components/content-page.tsx");
  assert.match(contentSource, /hasIntentionalPresentation/i, "offer-page disclosure follows an explicit content decision");
  assert.doesNotMatch(contentSource, /More about this work/i, "generic template narration is removed");

  const css = readSource("app/hierarchy.css");
  assert.match(css, /\.guided-content-page \.orientation-label,[\s\S]*?font-size:\s*16px/is);
  assert.match(css, /\.problem-condition-card-copy p\s*\{[^}]*font-size:\s*16px/is);
  assert.match(css, /\.problem-condition-card-actions button\s*\{[^}]*font-size:\s*16px/is);
  assert.match(css, /\.problem-selection-status\s*\{[^}]*background:\s*var\(--action-orange\)/is);
  assert.match(css, /\.problem-detail-heading\s*\{[^}]*display:\s*flex/is);
  assert.match(css, /\.problem-selection-connector::before\s*\{[^}]*left:\s*var\(--selection-anchor/is);
  assert.match(css, /\.problem-selection-connector::after\s*\{[^}]*width:\s*14px[^}]*background:\s*var\(--action-orange\)/is);
  assert.match(css, /\.solution-family-heading h2\s*\{[^}]*max-width:\s*32ch/is);
  assert.match(css, /\.headline-keyword\s*\{[^}]*linear-gradient/is);
  assert.match(css, /\.resource-card-rail small\s*\{[^}]*font-size:\s*16px/is);
});

test("uses headline emphasis as a scarce attention signal", async () => {
  const highlightedHeadlines = async (path) => {
    const main = mainMarkup((await render(path)).html);
    return (main.match(/class="[^"]*\bheadline-keyword\b[^"]*"/g) || []).length;
  };

  assert.equal(await highlightedHeadlines("/"), 1, "homepage emphasizes its outcome once");
  assert.equal(await highlightedHeadlines("/problems-we-solve"), 1, "What We Solve emphasizes the problem once");
  assert.equal(await highlightedHeadlines("/leadership-system"), 1, "How It Works emphasizes the mechanism once");
  assert.equal(await highlightedHeadlines("/results"), 1, "Results emphasizes the proof outcome once");
  assert.equal(await highlightedHeadlines("/leadership-services"), 4, "How We Help emphasizes one hero phrase and the three parallel service areas");
  assert.equal(await highlightedHeadlines("/resources"), 1, "Resources emphasizes its decision-making subject once");
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
    "book_link_clicked",
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
  assert.match(homeSource, /\/consultation\?source=homepage-hero/i);
  assert.doesNotMatch(homeSource, /\/consultation\?source=homepage-solutions/i, "How We Help no longer adds a competing consultation prompt");
  assert.match(homeSource, /\/consultation\?source=homepage-final/i);
});

test("ships social metadata, canonical routes, structured data, and indexing holds", async () => {
  const home = (await render("/")).html;
  assert.match(home, /application\/ld\+json/);
  assert.match(home, /"@type":"Organization"/);
  assert.match(home, /og\.png/);

  const faq = (await render("/faq")).html;
  assert.match(faq, /"@type":"FAQPage"/);

  const consultation = (await render("/consultation")).html;
  assert.match(consultation, /rel="canonical" href="https:\/\/www\.120vc\.com\/consultation"/i);

  const contact = (await render("/contact")).html;
  assert.match(contact, /rel="canonical" href="https:\/\/www\.120vc\.com\/consultation"/i);
  assert.match(contact, /name="robots" content="noindex, follow"/i);

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

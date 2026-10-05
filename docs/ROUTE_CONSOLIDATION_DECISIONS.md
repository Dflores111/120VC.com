# 120VC Route Consolidation Decisions

**Status:** non-destructive route register  
**Inventory source:** ../120VC_AI_Review_Package_2026-08-26/reports/ROUTE-INVENTORY.csv  
**Routes classified:** 70 of 70  
**Routes deleted in this wave:** 0

## 1. Decision policy

The site should feel like six public experiences without pretending that all other URLs have no value.

The six target experiences are:

1. Home — /
2. What We Solve — /problems-we-solve
3. How It Works — /leadership-system
4. Results — /results
5. Tools & Insights — /resources
6. Consultation — /consultation

Results is a target primary experience but remains absent from the public header and footer until approved proof exists. While the proof gate is closed, /results and its evidence routes remain available with noindex,follow and contain no unapproved public proof.

No route is deleted or permanently redirected solely on the basis of this structural inventory. Permanent redirects require evidence about traffic, backlinks, ranking queries, campaigns, external collateral, and internal-link dependencies.

## 2. Classification vocabulary

| Classification | Meaning |
|---|---|
| Primary live | One of the audience’s public core experiences and eligible for primary navigation. |
| Primary proof-gated | A core experience held outside primary navigation until approved evidence exists. |
| Shared-state alias | Returns 200, renders a parent experience with a relevant state open, uses the parent canonical, and uses noindex,follow. |
| Contextual commercial detail | A distinct offer or procurement page retained outside primary navigation. |
| Contextual leader page | A role-specific page retained for direct, search, campaign, or internal-sharing value. |
| Company or utility | A footer, company, legal, or utility destination. |
| Proof-gated detail | Evidence content retained but hidden from public discovery until its approval gate passes. |
| Resource-hub alias | Returns 200 and opens the relevant mode or filter on Tools & Insights; canonical parent and noindex,follow. |
| Functional tool | A direct tool route retained when the tool produces a real outcome. |
| Assessment | A direct diagnostic route retained only with truthful functionality and delivery. |
| SEO insight | A focused, unique topic route retained outside primary navigation. |

## 3. Canonical and alias rules

### Legacy problem aliases

The five legacy problem URLs are not separate page experiences. Each must:

- return HTTP 200;
- render the shared What We Solve component;
- open the mapped condition on initial load;
- use canonical /problems-we-solve;
- use robots noindex,follow;
- preserve UTM and source parameters;
- preserve the selected condition through browser history;
- remain understandable without JavaScript.

| Alias | Initial state |
|---|---|
| /problems-we-solve/strategy-execution-gap | condition=strategy-drift |
| /problems-we-solve/leadership-team-alignment | condition=leadership-fragmentation |
| /problems-we-solve/transformation-execution | condition=transformation-stall |
| /problems-we-solve/project-portfolio-roi | condition=portfolio-overload |
| /problems-we-solve/internal-function-performance | condition=reactive-function |

### Other aliases

Non-problem aliases use the same non-destructive pattern during consolidation: 200 shared experience, parent canonical, and noindex,follow. A later evidence review may authorize a 301 or 308 redirect, but this document does not.

### Contextual deep pages

Commercial, role, tool, assessment, and insight pages do not appear in primary navigation. They may remain self-canonical and indexable only when they contain distinct, audience-ready value. If they are incomplete, duplicated, or nonfunctional, retain the route with noindex,follow until the relevant gate passes.

## 4. Complete route register

### Primary experiences and direct aliases — 7 routes

| Route | Classification | Decision | Canonical and indexing |
|---|---|---|---|
| / | Primary live | Keep as the five-chapter public entry experience. | Self-canonical; index,follow. |
| /consultation | Primary live | Keep as the canonical two-step, truthful consultation experience. | Self-canonical; index,follow. |
| /contact | Shared-state alias | Preserve 200 and render the consultation experience. Do not maintain a second contact narrative. | Canonical /consultation; noindex,follow. |
| /problems-we-solve | Primary live | Keep as the single five-condition What We Solve experience. | Self-canonical; index,follow. |
| /leadership-system | Primary live | Keep as unified How It Works, system, toolbench, scope, and installation experience. | Self-canonical; index,follow. |
| /resources | Primary live | Keep as unified Tools & Insights with Use it and Understand it modes. | Self-canonical; index,follow. |
| /results | Primary proof-gated | Keep as the Results experience, but omit it from public navigation until approved proof exists. | Self-canonical; noindex,follow while gate is closed; index,follow only after approval. |

### Legacy problem aliases — 5 routes

| Route | Classification | Decision | Canonical and indexing |
|---|---|---|---|
| /problems-we-solve/strategy-execution-gap | Shared-state alias | Render What We Solve with Strategy drift selected. | Canonical /problems-we-solve; noindex,follow. |
| /problems-we-solve/leadership-team-alignment | Shared-state alias | Render What We Solve with Leadership fragmentation selected. | Canonical /problems-we-solve; noindex,follow. |
| /problems-we-solve/transformation-execution | Shared-state alias | Render What We Solve with Transformation stall selected. | Canonical /problems-we-solve; noindex,follow. |
| /problems-we-solve/project-portfolio-roi | Shared-state alias | Render What We Solve with Portfolio overload selected. | Canonical /problems-we-solve; noindex,follow. |
| /problems-we-solve/internal-function-performance | Shared-state alias | Render What We Solve with Reactive internal function selected. | Canonical /problems-we-solve; noindex,follow. |

### Contextual commercial detail — 7 routes

| Route | Classification | Decision | Canonical and indexing |
|---|---|---|---|
| /leadership-services | Contextual commercial detail | Keep as a secondary commercial overview reached from How It Works or sales material, not the header. Reassess duplication after search evidence is available. | Self-canonical only if distinct; otherwise hold noindex,follow. |
| /executive-leadership-coaching-and-development-performance-accelerator | Contextual commercial detail | Keep for high-intent engagement, participation, sales, and procurement detail. | Self-canonical; index,follow when unique and audience-ready. |
| /transformation-leadership-team-development-coaching-and-program | Contextual commercial detail | Keep for high-intent leadership-team engagement detail. | Self-canonical; index,follow when unique and audience-ready. |
| /enterprise-digital-transformation | Contextual commercial detail | Keep for enterprise-transformation scope and procurement detail. | Self-canonical; index,follow when unique and audience-ready. |
| /roi-driven-project-portfolio-services | Contextual commercial detail | Keep for portfolio-services scope and procurement detail. | Self-canonical; index,follow when unique and audience-ready. |
| /project-leadership-managed-services | Contextual commercial detail | Keep for managed execution-leadership scope and procurement detail. | Self-canonical; index,follow when unique and audience-ready. |
| /smartsheet-dashboards | Contextual commercial detail | Keep only as a distinct capability or campaign page; do not elevate it into the core navigation. | Self-canonical if distinct; otherwise hold noindex,follow pending search and campaign review. |

### Leader and role routes — 7 routes

| Route | Classification | Decision | Canonical and indexing |
|---|---|---|---|
| /who-we-help | Shared-state alias | Preserve 200 and render or summarize the For Leaders experience rather than maintaining a competing role hub. | Canonical /for-leaders; noindex,follow. |
| /for-leaders | Contextual leader page | Keep as the footer-accessible leader overview. | Self-canonical; index,follow when unique. |
| /for-the-chief-operating-officer | Contextual leader page | Keep for COO search, campaign, and internal-sharing intent; connect contextually to the relevant condition and scope. | Self-canonical; index,follow when unique. |
| /for-the-chief-financial-officer | Contextual leader page | Keep for CFO search, campaign, and internal-sharing intent. | Self-canonical; index,follow when unique. |
| /for-the-chief-technology-and-chief-information-officer | Contextual leader page | Keep for CIO and technology-leader search, campaign, and internal-sharing intent. | Self-canonical; index,follow when unique. |
| /for-the-chief-transformation-officer | Contextual leader page | Keep for transformation-leader search, campaign, and internal-sharing intent. | Self-canonical; index,follow when unique. |
| /for-the-vp-and-division-presidents | Contextual leader page | Keep for division-leader search, campaign, and internal-sharing intent. | Self-canonical; index,follow when unique. |

### Company, founder, FAQ, and legal — 8 routes

| Route | Classification | Decision | Canonical and indexing |
|---|---|---|---|
| /about | Company or utility | Keep as the primary company story in the footer. | Self-canonical; index,follow. |
| /founder-jason-scott | Company or utility | Keep as the approved founder story and portrait destination. | Self-canonical; index,follow. |
| /faq | Company or utility | Keep as a footer and contextual evaluation resource. | Self-canonical; index,follow when content is unique and current. |
| /about/the-120-standard | Company or utility | Keep as a deeper company and operating-standard page. | Self-canonical; index,follow when unique. |
| /about/careers | Company or utility | Keep as the canonical careers destination. | Self-canonical; index,follow. |
| /privacy | Company or utility | Keep as required legal content. | Self-canonical; noindex,follow. |
| /terms | Company or utility | Keep as required legal content. | Self-canonical; noindex,follow. |
| /cookie-policy | Company or utility | Keep as required consent and legal content. | Self-canonical; noindex,follow. |

### Proof and case routes — 4 routes

| Route | Classification | Decision | Canonical and indexing |
|---|---|---|---|
| /case-studies | Proof-gated detail | Preserve as a case archive or shared Results state. Do not publish placeholders or stock evidence. | Canonical /results while consolidated; noindex,follow until approved proof exists. |
| /results/methodology | Proof-gated detail | Keep for evidence definitions and limitations once real proof records exist. | Self-canonical after gate; noindex,follow while gate is closed. |
| /results/operating-shifts | Proof-gated detail | Keep for approved operating-change evidence, not as substitute proof. | Self-canonical after gate; noindex,follow while gate is closed. |
| /results/client-references | Proof-gated detail | Keep for approved evaluation and reference process information. | Self-canonical after gate; noindex,follow while gate is closed. |

### Leadership-system section aliases — 5 routes

| Route | Classification | Decision | Canonical and indexing |
|---|---|---|---|
| /leadership-system/installation | Shared-state alias | Render How It Works with the installation sequence in context. | Canonical /leadership-system; noindex,follow. |
| /leadership-system/operating-practices | Shared-state alias | Render How It Works with the toolbench or practices state active. | Canonical /leadership-system; noindex,follow. |
| /leadership-system/three-pillars | Shared-state alias | Render How It Works with Outcomes or Three Pillars context active; link to the functional tool when ready. | Canonical /leadership-system; noindex,follow. |
| /leadership-system/execution-leadership | Shared-state alias | Render How It Works with Execution active. | Canonical /leadership-system; noindex,follow. |
| /leadership-services/compare-solutions | Shared-state alias | Render How It Works with installation scopes active. | Canonical /leadership-system; noindex,follow. |

### Legacy resource hubs and format archives — 7 routes

| Route | Classification | Decision | Canonical and indexing |
|---|---|---|---|
| /insights | Resource-hub alias | Render Tools & Insights in Understand it mode. | Canonical /resources; noindex,follow. |
| /resources/tools | Resource-hub alias | Render Tools & Insights in Use it mode. | Canonical /resources; noindex,follow. |
| /resources/assessments | Resource-hub alias | Render Tools & Insights in Use it mode with assessments selected. | Canonical /resources; noindex,follow. |
| /resources/guides-and-books | Resource-hub alias | Render Tools & Insights in Understand it mode with guides and books selected. | Canonical /resources; noindex,follow. |
| /resources/executive-briefings | Resource-hub alias | Render Tools & Insights in Understand it mode with briefings selected. | Canonical /resources; noindex,follow. |
| /resources/podcasts | Resource-hub alias | Render Tools & Insights in Understand it mode with podcasts selected. | Canonical /resources; noindex,follow. |
| /resources/insights | Resource-hub alias | Render Tools & Insights in Understand it mode. | Canonical /resources; noindex,follow. |

### Functional tool routes — 9 routes

| Route | Classification | Decision | Canonical and indexing |
|---|---|---|---|
| /resources/tools/challenge-opportunity-builder | Functional tool | Keep as the direct Challenge · Opportunity workspace or truthful preview. | Self-canonical and indexable only when functional; otherwise noindex,follow. |
| /resources/tools/1-3-1-decision-builder | Functional tool | Keep as the direct 1-3-1 workspace or truthful preview. | Self-canonical and indexable only when functional; otherwise noindex,follow. |
| /resources/tools/2x2-prioritization-matrix | Functional tool | Keep as the direct 2×2 workspace or truthful preview. | Self-canonical and indexable only when functional; otherwise noindex,follow. |
| /resources/tools/daily-focusing-exercise | Functional tool | Keep as the direct Daily Focusing workspace or truthful preview. | Self-canonical and indexable only when functional; otherwise noindex,follow. |
| /resources/tools/weekly-focusing-exercise | Functional tool | Keep as the direct Weekly Focusing workspace or truthful preview. | Self-canonical and indexable only when functional; otherwise noindex,follow. |
| /resources/tools/weekly-team-doing | Functional tool | Keep as the direct Weekly Team DOING workspace or truthful preview. | Self-canonical and indexable only when functional; otherwise noindex,follow. |
| /resources/tools/execution-week-planner | Functional tool | Keep as the direct planner workspace or truthful preview. | Self-canonical and indexable only when functional; otherwise noindex,follow. |
| /resources/tools/three-pillars-decision-filter | Functional tool | Keep as the direct Three Pillars workspace or truthful preview. | Self-canonical and indexable only when functional; otherwise noindex,follow. |
| /resources/tools/work-rationalization-tool | Functional tool | Keep as the direct Work Rationalization workspace or truthful preview. | Self-canonical and indexable only when functional; otherwise noindex,follow. |

### Assessment routes — 5 routes

| Route | Classification | Decision | Canonical and indexing |
|---|---|---|---|
| /resources/assessments/execution-health-diagnostic | Assessment | Keep for a functional diagnostic with an immediate truthful result and real delivery path. | Self-canonical only after the functionality gate; otherwise noindex,follow. |
| /resources/assessments/leadership-team-execution-assessment | Assessment | Keep for a functional leadership-team diagnostic. | Self-canonical only after the functionality gate; otherwise noindex,follow. |
| /resources/assessments/high-stakes-initiative-readiness | Assessment | Keep for a functional initiative-readiness diagnostic. | Self-canonical only after the functionality gate; otherwise noindex,follow. |
| /resources/assessments/portfolio-roi-diagnostic | Assessment | Keep for a functional portfolio diagnostic. | Self-canonical only after the functionality gate; otherwise noindex,follow. |
| /resources/assessments/cost-center-to-value-engine-assessment | Assessment | Keep for a functional internal-function diagnostic. | Self-canonical only after the functionality gate; otherwise noindex,follow. |

### Search and topic insight routes — 6 routes

| Route | Classification | Decision | Canonical and indexing |
|---|---|---|---|
| /resources/insights/strategy-execution | SEO insight | Keep as a unique strategy-execution topic destination and contextual Understand it resource. | Self-canonical; index,follow when unique and current. |
| /resources/insights/executive-team-performance | SEO insight | Keep as a unique leadership-team topic destination. | Self-canonical; index,follow when unique and current. |
| /resources/insights/portfolio-roi-and-pmo | SEO insight | Keep as a unique portfolio and PMO topic destination. | Self-canonical; index,follow when unique and current. |
| /resources/insights/enterprise-transformation | SEO insight | Keep as a unique enterprise-transformation topic destination. | Self-canonical; index,follow when unique and current. |
| /resources/insights/ai-and-leadership | SEO insight | Keep as a unique AI and leadership topic destination. | Self-canonical; index,follow when unique and current. |
| /resources/insights/practical-leadership-systems | SEO insight | Keep as a unique practical-systems topic destination. | Self-canonical; index,follow when unique and current. |

## 5. Inventory reconciliation

| Classification group | Route count |
|---|---:|
| Primary experiences and direct aliases | 7 |
| Legacy problem aliases | 5 |
| Contextual commercial detail | 7 |
| Leader and role routes | 7 |
| Company, founder, FAQ, and legal | 8 |
| Proof and case routes | 4 |
| Leadership-system section aliases | 5 |
| Legacy resource hubs and format archives | 7 |
| Functional tool routes | 9 |
| Assessment routes | 5 |
| Search and topic insight routes | 6 |
| **Total** | **70** |

## 6. Evidence required before permanent redirects

Before converting any 200 alias or contextual route into a permanent redirect, record:

- current organic sessions and conversions;
- indexed status and ranking queries;
- referring domains and important backlinks;
- paid, email, event, and campaign destinations;
- CRM and hidden-form attribution dependencies;
- internal links and sitemap references;
- sales collateral, proposals, and bookmarked customer links;
- whether the target preserves the route’s search intent;
- redirect behavior for UTM and source parameters.

If this evidence is unavailable, keep the route non-destructively and document the uncertainty.

## 7. Sitemap and navigation policy

Include in the public sitemap only:

- live primary experiences;
- unique, audience-ready commercial pages;
- unique leader pages;
- approved company pages;
- functional tools and assessments;
- unique insight topics;
- approved Results pages after the proof gate opens.

Exclude from the sitemap:

- noindex shared-state aliases;
- proof-gated routes while held;
- nonfunctional tool or assessment previews;
- legal pages when configured noindex.

Primary navigation never mirrors the sitemap. Contextual depth remains discoverable from the relevant problem, system node, tool, resource, footer item, or commercial handoff.

## 8. Verification

For every route after implementation:

- confirm expected HTTP status;
- confirm canonical and robots behavior;
- confirm one H1 and logical heading order;
- confirm internal destinations resolve;
- confirm aliases open the intended shared state;
- confirm direct links, refresh, and browser history preserve state;
- confirm UTM and source parameters survive;
- confirm audience mode contains no review-only governance notes;
- confirm no retired or missing route is introduced accidentally.

This register changes the audience’s hierarchy without erasing the site’s recoverable route value.

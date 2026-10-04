# Executive buyer journey upgrade

Research and implementation: October 3, 2026.

## Direction

Preserve 120VC’s established typography, orange emphasis, editorial imagery, purposeful motion, and direct navigation. Strengthen authority through inspectable work, credible people, transparent evidence, and lower-risk evaluation. A more elaborate component is not automatically a better executive experience.

An enterprise leader’s likely question is: “Can these people help us deliver a consequential outcome, and what would working with them require?” The website should answer that before asking for a conversation.

## Official benchmark observations

These are observed design patterns, not evidence of conversion performance or permission to reproduce another company’s claims.

| Reference | Useful pattern | 120VC application |
| --- | --- | --- |
| [McKinsey Transformation](https://www.mckinsey.com/capabilities/transformation/how-we-help-clients) | Connect the capability to client impact, method, experts, insights, and contact. | Preserve clear problem/offer paths; make the method and founder easier to inspect. |
| [BCG Transformation](https://www.bcg.com/capabilities/business-transformation/overview) | Explain the working relationship and connect solutions to named evidence and experienced operators. | Clarify the mandate and practical engagement terms; no invented durations or fees. |
| [Bain Transformation](https://www.bain.com/consulting-services/transformation/) | Help buyers understand the offering and evaluate results and expertise. | Add specific questions buyers should ask about relevant experience and measured outcomes. |
| [Bain’s Virgin Australia case](https://www.bain.com/client-results/virgin-australia-from-turbulence-to-triumph/) | Identify the client situation, interventions, leadership context, and attributed outcomes. | Treat one approved, named case as the highest-value next proof investment—not anonymous invented statistics. |
| [Accenture Pulse of Change](https://www.accenture.com/en/insights/pulse-of-change) | Give substantive, dated research with useful implications before asking for contact. | Deliver usable guidance before asking someone to share their details. |
| [Bain Founder’s Mentality diagnostic](https://media.bain.com/founders-mentality/) | A structured interaction can produce meaningful guidance. | Build a brief for one live priority, without pretending to have a validated scoring instrument. |
| [McKinsey Organizational Health Index](https://www.mckinsey.com/solutions/orgsolutions/overview/organizational-health-index/en) | Benchmarks require a defined method and evidence base. | Do not label a five-practice self-check an organizational benchmark or predict success. |

## The value exchange

This is a working hypothesis to test with representative enterprise buyers: reducing uncertainty around a live initiative is more valuable than another generic downloadable brochure.

**Execution Decision Brief:** six questions produce one agreement to address or confirm, a 20-minute leadership meeting agenda, a working record, and a next-week check. The buyer can see an example before starting and copy, download, or print the result without an email address.

The optional next step is human review of the issue in that brief. Contact details are requested only after useful output is available. No forced subscription, phone requirement, invented “health score,” confidential-data prompt, or promise of a review turnaround.

“I don’t know” means confirm the agreement, not failure. Missing agreements take precedence over inconsistent practices; ties follow the visible question order. This is transparent guidance, not a risk ranking.

## Implemented

- New public route: `/resources/execution-decision-brief`, linked from the homepage and resource library, included in route metadata and sitemap data.
- Featured brief and visible example replace competing homepage resource offers. Compact category links preserve deeper browsing.
- A real founder portrait and link make the person behind the approach more visible.
- An illustrative working record on the system and evidence pages makes the method concrete. It is explicitly not client evidence.
- Coaching, system installation, and embedded leadership explain what to bring, how to agree the mandate, and which terms need scoping.
- Results becomes an evidence-evaluation page while approved client cases are unavailable. Published claims remain approval-gated.
- Existing consultation copy now accurately describes its email-draft outcome.
- Native radio controls, explicit progression/back navigation, focus management, readable mobile type, and reduced-motion support keep the brief familiar.

## Evidence and capture boundaries

The new brief is separate from the approval-held proprietary Execution Health Diagnostic. It does not publish held assessments or company performance claims. Existing approved logos represent enterprise experience, not endorsements. Generated imagery is not portrayed as client photography.

Answers and contact details are held in React page state only. Refreshing clears them. The brief does not submit them to an API, database, or analytics event. Optional review prepares a `mailto` draft to `info@120vc.com`; the visitor must review and send it. Preparing a draft is not successful lead capture.

Automatic capture still needs an approved CRM/form destination, privacy language, purpose/consent, retention/access ownership, and a staffed follow-up process. Do not activate capture or promise service until those are settled.

## Next improvements with the highest likely value

1. Approve one real case: situation, 120VC’s role, intervention, outcome, measurement period, source, and permission. Put evidence beside the claim.
2. Connect the optional review request to an approved CRM with truthful success/error states and a named follow-up owner.
3. Test the brief with enterprise leaders: relevance, completion, usefulness in an actual meeting, willingness to request human review, and reasons for declining.
4. Measure completed review requests and conversation quality separately from clicks, brief starts, or email-draft opens.
5. Add additional named practitioner expertise and approved credentials where the buyer is evaluating who would do the work.

Do not claim conversion improvement, independent certification, or “world-class” status from a build, screenshots, or benchmark observations alone.

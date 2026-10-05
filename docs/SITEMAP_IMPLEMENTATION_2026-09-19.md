# 120VC sitemap implementation

Source: `120VC_Website_Sitemap_and_Copy (1).docx`, supplied by Diego. This document records the local implementation, not a public deployment or approval of business claims.

## Structure

| Visitor destination | Implemented route | Notes |
| --- | --- | --- |
| Home | `/` | Supplied headline and description; five problems; Four Ts; three offers; resource paths; contact |
| What We Solve | `/problems-we-solve` | Alignment, ownership, decisions, overload, and key-person dependency |
| What We Do | `/leadership-services` | Coaching, System, Embedded; clients can enter at any level |
| Execution Leadership Coaching | `/execution-leadership-coaching` | New dedicated offer page |
| How It Works / Execution Leadership System | `/leadership-system` | One shared destination; existing six-part story and installation stepper retained |
| ELPA installation | `/executive-leadership-coaching-and-development-performance-accelerator` | Existing URL retained; a child of the System, not a fourth offer or top-level navigation item |
| Embedded Execution Leadership | `/embedded-execution-leadership` | New offer page; `#initiatives`, `#portfolios`, `#enterprise` provide scope-level entry points |
| Results | `/results` | Visible in navigation; public proof remains gated and route stays noindex until approved evidence exists |
| Resources | `/resources` | One library: All / Frameworks / Guides / Insights |
| About | `/about` | Supplied introduction and founder path; no invented team members or credentials |
| Let's Talk | `/contact` | Existing two-step email-draft form; ELPA inquiry context retained |

Existing URLs are preserved, including `/consultation`, the five historical problem aliases, service detail pages, founder, role pages, and legal destinations. `/consultation` now canonicals to `/contact`. No redirects, route deletions, new dependencies, or hosting changes were made.

The Four Ts route technology and transformation to Embedded / enterprise, talent to Embedded, and training to the System. The System routes installation inquiries through ELPA. ELPA routes to `/contact?inquiry=elpa&source=elpa` and the form carries that context into its prepared email.

## Copy and component decisions

- Supplied core headlines/descriptions are in `app/data/sitemap-content.ts`; five problem records are in `app/data/sitemap-problems.ts`.
- The site retains its typefaces, surface palette, orange action language, human imagery, masked photos, card affordances, restrained reveal motion, and bounded scroll stories.
- The Four Ts use a compact comparison grid. The existing shared offer cards express the three levels of involvement. New offer pages reuse a single editorial template.
- The 120VC experience and website-component-prompts guidance informed the choice to reuse native patterns. No unrelated catalog demo or animation dependency was added.
- The resource library retains horizontal edge fades and gains explicit previous/next controls, keyboard filters, resource counts, and a shared labelled tab panel. Motion preferences remain respected.
- Four requested resource topics received new editorial copy: weekly operating rhythm, ownership across teams, digital transformation stalls, and when to bring in a program management consultant. These are readable articles, not downloads or state-saving tools. They contain no invented client statistics.
- Footer, FAQ, comparison copy, metadata, and sitemap were aligned with the new offer structure. Legacy service pages link back to their parent offer.

## Content and launch boundaries

1. Approved client case studies, metrics, and quotes were not supplied. Production still excludes illustrative cases. Results shows a clear path to ask about relevant client experience; its indexing gate remains closed.
2. Development mode retains the pre-existing, labelled illustrative case carousel for design review. Those examples are not real client proof and are excluded from production output.
3. ELPA duration, weekly commitment, delivery format, participants, and fee require confirmation. The page invites a discussion rather than stating invented terms.
4. Additional team profiles need real biographies, assets, and approval. The existing J. Scott page remains reachable.
5. The contact form prepares a mailto request. It explicitly says nothing has been sent and provides direct email fallback. No backend delivery or CRM integration is claimed.
6. No ChatGPT-hosted/public site was republished in this task.

## Verification

- PASS: production build, TypeScript, ESLint, and diff whitespace checks.
- PASS: 35 rendered/structural production regression tests covering canonical copy, three-offer hierarchy, ELPA context, new resource destinations, internal fragments, proof gating, metadata, legacy aliases, semantic controls, and route rendering.
- Inventory: 67 retained configured content routes plus 6 new routes, in addition to Home, Contact, and the consultation alias.
- Browser checks: desktop home / offer / System / ELPA / contact path; Four Ts enterprise route; updated problem selection; resource filters with keyboard navigation; mobile menu and Escape; an unsent email-draft test using synthetic QA details.
- Responsive inspection at 1280px, 390px, and 320px. Narrow-phone checks found no body overflow on Home, Coaching, Embedded, System, and Resources.
- Reduced-motion QA uses the existing development `?motion=reduce` path; this is not a substitute for testing every physical device or assistive technology.

Local preview: `http://127.0.0.1:3000/` while the development server is running.

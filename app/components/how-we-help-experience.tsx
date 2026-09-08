import Link from "@/app/components/native-link";
import type { CSSProperties } from "react";
import { ImageMask } from "./image-mask";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { SolutionScopeCards, type SolutionScope } from "./solution-scope-cards";

const solutionScopes: readonly SolutionScope[] = [
  {
    label: "Executive Teams",
    title: "Executive Teams",
    description: "Leadership team development that helps executives set priorities, make decisions, and own cross-functional commitments as one team.",
    bestWhen: "A leader or leadership team owns a high-stakes outcome, but alignment does not survive contact with the work.",
    change: "One shared way to make tradeoffs, hold decisions, and turn leadership intent into visible commitments.",
    outcome: "Tradeoffs are explicit, decisions remain closed, and commitments have visible owners.",
    href: "/transformation-leadership-team-development-coaching-and-program",
    links: [
      { label: "Leadership Team Transformation", href: "/transformation-leadership-team-development-coaching-and-program" },
      { label: "Executive Leadership Performance Accelerator", href: "/executive-leadership-coaching-and-development-performance-accelerator" },
    ],
    image: "/images/problems/alignment-outcome.jpg",
    imageAlt: "Senior leaders in an aligned working conversation.",
    imageWidth: 1800,
    imageHeight: 1200,
    tone: "clay",
  },
  {
    label: "Business Transformation",
    title: "Business Transformation",
    description: "Business transformation consulting that turns sponsored change into new operating behavior and measurable value.",
    bestWhen: "A transformation has sponsorship and activity, but priorities, operating behavior, or business value are not changing.",
    change: "Leaders challenge demand, make real tradeoffs, and own operating change together—not as a separate program.",
    outcome: "Demand becomes a choice, adoption becomes operating behavior, and progress is discussed in business terms.",
    href: "/enterprise-digital-transformation",
    links: [{ label: "Business Transformation", href: "/enterprise-digital-transformation" }],
    image: "/images/problems/function-outcome.jpg",
    imageAlt: "A cross-functional team working together around an enterprise outcome.",
    imageWidth: 1800,
    imageHeight: 1200,
    tone: "sage",
  },
  {
    label: "Project Portfolios & Critical Initiatives",
    title: "Project Portfolios & Critical Initiatives",
    description: "Project portfolio management and embedded project leadership that help leaders fund the right work, stop weak work, and move critical initiatives.",
    bestWhen: "Too many initiatives compete for the same capacity or a critical project needs accountable execution leadership now.",
    change: "Work is continued, accelerated, reshaped, or stopped—and the remaining commitments have clear owners and outcomes.",
    outcome: "Investment choices become visible, dependencies surface sooner, and delivery conversations produce decisions instead of status.",
    href: "/roi-driven-project-portfolio-services",
    links: [
      { label: "Project Portfolio Services", href: "/roi-driven-project-portfolio-services" },
      { label: "Project Leadership", href: "/project-leadership-managed-services" },
    ],
    image: "/images/problems/portfolio-outcome.jpg",
    imageAlt: "Leaders reviewing a focused set of portfolio priorities.",
    imageWidth: 1800,
    imageHeight: 1200,
    tone: "ink",
  },
];

export function HowWeHelpExperience() {
  return (
    <div className="site-shell hierarchy-site solutions-experience-site supporting-v2">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />

      <main id="main-content" tabIndex={-1}>
        <section className="solutions-experience-hero supporting-hero" data-major-section data-journey-stage="evaluate" aria-labelledby="solutions-experience-title">
          <div className="solutions-hero-copy supporting-hero-copy">
            <h1 id="solutions-experience-title">Align leaders. <span className="headline-keyword headline-keyword-motion">Make change stick.</span> Focus the portfolio.</h1>
            <p>Our strategy execution consulting changes the decisions and operating rhythms inside executive teams, business transformations, and project portfolios—so people know what matters, who owns it, and what moves next.</p>
            <Link className="button button-primary" href="#solution-families">Compare our services <span aria-hidden="true" data-direction="down">↓</span></Link>
          </div>
          <ImageMask
            className="solutions-hero-image"
            src="/images/story/team-working-together.jpg"
            alt="A leadership team working together around a shared view of priorities."
            width={1800}
            height={1008}
            variant="step"
            priority
            style={{ "--image-position": "54% 48%" } as CSSProperties}
          />
        </section>

        <section className="solution-family-section supporting-decision-section" id="solution-families" data-major-section data-journey-stage="evaluate" aria-labelledby="solution-family-title">
          <header className="supporting-section-heading supporting-section-heading-centered solution-family-heading">
            <h2 id="solution-family-title">
              Stronger <span className="headline-keyword">leadership</span>. Faster <span className="headline-keyword">transformation</span>. Focused <span className="headline-keyword">portfolios</span>.
            </h2>
            <p>Each service applies one operating system to a different enterprise problem, accountable team, and measurable outcome.</p>
          </header>
          <SolutionScopeCards scopes={solutionScopes} />
        </section>

        <section className="solution-reassurance" data-major-section data-journey-stage="act" aria-labelledby="solutions-close-title">
          <div>
            <h2 id="solutions-close-title">Start with the outcome that is not moving.</h2>
            <p>You do not need to choose a service first. We will locate the break before recommending a path.</p>
          </div>
          <Link className="button button-primary" href="/consultation?source=how-we-help">Talk through the problem <span aria-hidden="true">→</span></Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

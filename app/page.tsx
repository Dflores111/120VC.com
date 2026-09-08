import type { Metadata } from "next";
import Link from "@/app/components/native-link";
import { FeaturedCaseCarousel } from "./components/featured-case-carousel";
import { HeroMotionMedia } from "./components/hero-motion-media";
import { HeroOutcomeRotation } from "./components/hero-outcome-rotation";
import { InstallationStepper, type InstallationStep } from "./components/installation-stepper";
import { KineticStatement } from "./components/kinetic-statement";
import { LogoMarquee } from "./components/logo-marquee";
import { PainPointCarousel } from "./components/pain-point-carousel";
import { ReviewModePanel } from "./components/review-mode-panel";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { SolutionScopeCards, type SolutionScope } from "./components/solution-scope-cards";
import { getHomepageCaseProof, homepageProductionProofRequirement } from "./data/homepage-case-proof";

export const metadata: Metadata = {
  title: "Strategy Execution & Implementation for Enterprise Teams",
  description: "120VC installs a shared system for strategy execution and strategy implementation inside live enterprise work, then transfers ownership to your team.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Strategy Execution & Implementation for Enterprise Teams | 120VC",
    description: "120VC installs a shared system for strategy execution and strategy implementation inside live enterprise work, then transfers ownership to your team.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "120VC strategy execution and implementation for enterprise teams" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Strategy Execution & Implementation for Enterprise Teams | 120VC",
    description: "120VC installs a shared system for strategy execution and strategy implementation inside live enterprise work, then transfers ownership to your team.",
    images: ["/og.png"],
  },
};

type HomeProps = { searchParams?: Promise<Record<string, string | string[] | undefined>> };

const solutionScopes = [
  {
    label: "Executive teams",
    title: "Executive Teams",
    description: "Leadership team development that changes how executives run the business together—strengthening team effectiveness, decision rights, and cross-functional ownership.",
    bestWhen: "A senior team agrees on the goal, but priorities, decisions, or ownership keep changing once work begins.",
    change: "The team makes tradeoffs in one shared rhythm and turns each decision into a visible commitment.",
    outcome: "Priorities remain stable, decisions stop reopening, and owners act without constant executive rescue.",
    href: "/transformation-leadership-team-development-coaching-and-program",
    links: [
      { label: "Leadership Team Transformation", href: "/transformation-leadership-team-development-coaching-and-program" },
      { label: "Executive Leadership Performance Accelerator", href: "/executive-leadership-coaching-and-development-performance-accelerator" },
    ],
    image: "/images/story/aligned-leadership-team.jpg",
    imageAlt: "Senior leaders work together around a shared set of decisions.",
    imageWidth: 1600,
    imageHeight: 1066,
    tone: "clay",
  },
  {
    label: "Business transformation",
    title: "Business Transformation",
    description: "Business transformation consulting that makes the transformation how the business actually operates—and keeps value realization visible.",
    bestWhen: "A function or transformation has sponsorship and activity, but leaders cannot connect the work to operating or business value.",
    change: "The team moves from accepting demand to challenging it, shaping choices, and recommending better business decisions.",
    outcome: "Leaders see clearer tradeoffs, less disconnected activity, and work tied to an accountable business outcome.",
    href: "/enterprise-digital-transformation",
    links: [{ label: "Business Transformation", href: "/enterprise-digital-transformation" }],
    image: "/images/problems/transformation-outcome.jpg",
    imageAlt: "A business team collaborates with visible energy after aligning on a change.",
    imageWidth: 1800,
    imageHeight: 1200,
    tone: "sage",
  },
  {
    label: "Project portfolios and critical initiatives",
    title: "Project Portfolios & Critical Initiatives",
    description: "Project portfolio management strengthens portfolio governance, project prioritization, and resource allocation; enterprise project management keeps critical initiatives from drifting.",
    bestWhen: "Too many initiatives compete for the same capacity, or a critical project needs stronger execution leadership.",
    change: "Leadership makes an explicit decision about what to continue, accelerate, reshape, or stop.",
    outcome: "Capacity follows priority, weak work exits the portfolio, and remaining commitments have visible owners and outcomes.",
    href: "/roi-driven-project-portfolio-services",
    links: [
      { label: "Project Portfolio Services", href: "/roi-driven-project-portfolio-services" },
      { label: "Project Leadership", href: "/project-leadership-managed-services" },
    ],
    image: "/images/problems/portfolio-outcome.jpg",
    imageAlt: "Leaders review a focused portfolio decision together.",
    imageWidth: 1800,
    imageHeight: 1200,
    tone: "ink",
  },
] as const satisfies readonly SolutionScope[];

const installationSteps = [
  {
    number: "01",
    title: "Diagnose",
    description: "Find where priorities, decisions, ownership, or operating rhythm are breaking.",
    insideWork: "We examine live priorities, decision loops, dependencies, and ownership—not a generic maturity score.",
    value: "Leaders leave with one shared diagnosis and a clear first installation target.",
    image: "/images/problems/strategy-conversation.jpg",
    imageAlt: "Leaders examine a difficult execution problem together.",
    width: 1800,
    height: 1201,
    position: "50% 45%",
  },
  {
    number: "02",
    title: "Install",
    description: "Put new rules, practices, roles, and artifacts into the live work.",
    insideWork: "Shared decision rules, visible ownership, and an execution rhythm are applied to current commitments.",
    value: "The team gains one practical way to prioritize, decide, and coordinate.",
    image: "/images/story/team-working-together.jpg",
    imageAlt: "A leadership team works together on priorities already in motion.",
    width: 1800,
    height: 1008,
    position: "50% 50%",
  },
  {
    number: "03",
    title: "Operate",
    description: "Use the system in weekly work, real decisions, and real business pressure.",
    insideWork: "120VC works beside the accountable team as tradeoffs, risks, escalations, and commitments surface.",
    value: "Decisions hold longer, owners act sooner, and execution becomes easier to inspect.",
    image: "/images/problems/portfolio-review.jpg",
    imageAlt: "Leaders review tradeoffs in an active portfolio.",
    width: 1201,
    height: 1800,
    position: "50% 42%",
  },
  {
    number: "04",
    title: "Own",
    description: "Transfer the capability so the team can keep running it without 120VC.",
    insideWork: "Leaders run the rhythm, reinforce the standard, and coach the behaviors in live work.",
    value: "The organization keeps the discipline and capability without depending on 120VC.",
    image: "/images/story/aligned-leadership-team.jpg",
    imageAlt: "An aligned leadership team continues the work together.",
    width: 1600,
    height: 1066,
    position: "50% 48%",
  },
] as const satisfies readonly InstallationStep[];

export default async function Home({ searchParams }: HomeProps) {
  const query = searchParams ? await searchParams : {};
  const reviewMode = query.review === "1" && process.env.NODE_ENV !== "production";
  const reducedMotionReview = query.motion === "reduce" && process.env.NODE_ENV !== "production";
  const featuredCases = getHomepageCaseProof(process.env.NODE_ENV, reviewMode);

  return (
    <div className="site-shell hierarchy-site experience-home commercial-home">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />

      {reviewMode && (
        <ReviewModePanel
          exitHref="/"
          items={[
            { label: "Homepage structure", status: "ready", detail: "The page communicates outcome, recognition, three ways to engage, the installation difference, and consultation without requiring exploration." },
            { label: "Enterprise experience", status: "ready", detail: "The supplied 17-brand logo pack is approved for the homepage experience rail. Logos communicate enterprise experience, not outcome proof or endorsement." },
            {
              label: "Client results",
              status: homepageProductionProofRequirement ? "blocked" : "ready",
              detail: homepageProductionProofRequirement
                ? `${homepageProductionProofRequirement}. Fictional demo cases render only in nonproduction so the proof composition can be reviewed safely.`
                : "At least one evidence-approved homepage case is available. Reconfirm the public render and display permissions before launch.",
            },
            { label: "Hero media", status: "review", detail: "The motion montage uses supplied illustrative photography. Confirm stock licenses, model releases, crop permission, and provenance before launch." },
            { label: "Conversion transport", status: "blocked", detail: "The consultation route is functional and honest, but a production CRM or approved form endpoint is still required." },
          ]}
        />
      )}

      <main id="main-content" tabIndex={-1}>
        <section className="home-commercial-hero" data-major-section data-journey-stage="position" aria-labelledby="home-title">
          <HeroMotionMedia />
          <div className="home-commercial-hero-copy">
            <h1 className="heading-wide" id="home-title" aria-label="We install the system that turns strategy into execution.">
              <span aria-hidden="true">We install the system that turns </span>
              <HeroOutcomeRotation />
            </h1>
            <p>We install a shared execution system inside live enterprise work, operate it alongside your team, and leave your organization able to run it without us. The result is strategy execution and strategy implementation grounded in the same priorities, decisions, ownership, and operating rhythm.</p>
            <div className="primary-and-quiet home-hero-actions">
              <Link className="button button-primary" href="/consultation?source=homepage-hero" data-primary-action data-analytics-event="homepage_consultation_clicked" data-analytics-section="hero">Request a Conversation <span aria-hidden="true">→</span></Link>
              <Link className="quiet-link" href="#how-we-help" data-secondary-action data-analytics-event="homepage_secondary_cta_clicked" data-analytics-section="hero">See how we help <span aria-hidden="true" data-direction="down">↓</span></Link>
            </div>
          </div>
        </section>

        <LogoMarquee />

        <section className="home-pains" data-major-section data-journey-stage="recognize" aria-labelledby="home-pains-title">
          <div className="home-section-heading home-section-heading-stacked">
            <h2 className="heading-wide" id="home-pains-title">What keeps your strategy from turning into work that gets done?</h2>
            <p>Strategy execution problems rarely begin with a bad strategy. They show up when priorities compete, decisions reopen, and decision rights or ownership are unclear—while teams are stretched across more work than they can realistically deliver.</p>
          </div>
          <PainPointCarousel />
          <Link className="home-section-link" href="/problems-we-solve" data-analytics-event="pain_problem_selected" data-analytics-section="pain" data-analytics-selection="all">Explore all five problems <span aria-hidden="true">→</span></Link>
        </section>

        <KineticStatement />

        <section className="home-solutions" id="how-we-help" data-major-section data-journey-stage="solution" aria-labelledby="home-solutions-title">
          <div className="home-section-heading">
            <h2 className="heading-medium" id="home-solutions-title">Where we help you get the work done.</h2>
            <p>120VC installs the same system in different parts of the enterprise depending on where execution is breaking. Choose the path closest to the accountable team and work at risk.</p>
          </div>
          <SolutionScopeCards scopes={solutionScopes} />
        </section>

        {featuredCases.length > 0 && (
          <section className="home-client-results" data-major-section data-journey-stage="proof" aria-labelledby="home-client-results-title">
            <div className="home-section-heading">
              <h2 className="heading-wide" id="home-client-results-title">See what changed.</h2>
              <p>One execution problem. What changed in the work. The result it produced.</p>
            </div>
            {reviewMode && featuredCases.some((caseStudy) => caseStudy.proofStatus === "demo") && (
              <p className="proof-review-badge">Demo proof</p>
            )}
            <FeaturedCaseCarousel cases={featuredCases} forceReducedMotion={reducedMotionReview} />
          </section>
        )}

        <section className="home-installation" data-major-section data-journey-stage="difference" aria-labelledby="home-installation-title">
          <div className="home-installation-copy">
            <h2 className="heading-medium" id="home-installation-title">How your strategy becomes work that gets done.</h2>
            <p>120VC installs one shared way to improve resource allocation, clarify decision rights, assign ownership, establish an operating rhythm, and keep commitments moving toward measurable outcomes.</p>
          </div>
          <InstallationStepper steps={installationSteps} />
          <div className="home-installation-closing">
            <p>No simulation. No separate training environment. The work itself becomes the installation ground.</p>
            <Link className="button button-light" href="/leadership-system" data-primary-action data-analytics-event="homepage_secondary_cta_clicked" data-analytics-section="how-it-works">See the complete Execution Leadership System <span aria-hidden="true">→</span></Link>
          </div>
        </section>

        <section className="experience-close home-commercial-close" data-major-section data-journey-stage="act" aria-labelledby="home-close-title">
          <h2 className="heading-wide" id="home-close-title">What needs to get done?</h2>
          <p>Bring us the strategy, transformation, portfolio, or critical initiative that isn’t moving the way it should.</p>
          <div className="primary-and-quiet primary-and-quiet-centered">
            <Link className="button button-primary" href="/consultation?source=homepage-final" data-primary-action data-analytics-event="homepage_consultation_clicked" data-analytics-section="final-cta">Request a Conversation <span aria-hidden="true">→</span></Link>
            <a className="quiet-link" href="https://www.120vc.com/book-download-the-strategy-execution-gap/" data-secondary-action data-analytics-event="book_link_clicked" data-analytics-section="final-cta">Read <em>The Strategy Execution Gap</em> <span aria-hidden="true" data-direction="out">↗</span></a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

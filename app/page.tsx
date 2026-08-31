import type { Metadata } from "next";
import Link from "next/link";
import { FeaturedCaseCarousel } from "./components/featured-case-carousel";
import { HeroMotionMedia } from "./components/hero-motion-media";
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
  title: "Turn Strategy Into Results Your Organization Can Deliver",
  description: "120VC installs one shared Execution Leadership System inside live enterprise work so leadership teams align priorities, make decisions that hold, and deliver without constant executive rescue.",
  alternates: { canonical: "/" },
};

type HomeProps = { searchParams?: Promise<Record<string, string | string[] | undefined>> };

const solutionScopes = [
  {
    label: "Leadership performance",
    title: "Leadership Performance",
    description: "Help executive teams and accountable leaders prioritize, decide, and execute together.",
    includes: "Leadership Team Transformation · ELPA",
    bestWhen: "A senior team agrees on the goal, but priorities, decisions, or ownership keep changing once work begins.",
    change: "The team makes tradeoffs in one shared rhythm and turns each decision into a visible commitment.",
    outcome: "Priorities remain stable, decisions stop reopening, and owners act without constant executive rescue.",
    href: "/transformation-leadership-team-development-coaching-and-program",
    image: "/images/story/aligned-leadership-team.jpg",
    imageAlt: "Senior leaders work together around a shared set of decisions.",
    imageWidth: 1600,
    imageHeight: 1066,
    tone: "clay",
  },
  {
    label: "Enterprise transformation",
    title: "Enterprise Transformation",
    description: "Help HR, IT, Finance, PMO, and transformation teams move from reactive activity to measurable business value.",
    bestWhen: "A function or transformation has sponsorship and activity, but leaders cannot connect the work to operating or business value.",
    change: "The team moves from accepting demand to challenging it, shaping choices, and recommending better business decisions.",
    outcome: "Leaders see clearer tradeoffs, less disconnected activity, and work tied to an accountable business outcome.",
    href: "/enterprise-digital-transformation",
    image: "/images/problems/transformation-outcome.jpg",
    imageAlt: "A business team collaborates with visible energy after aligning on a change.",
    imageWidth: 1800,
    imageHeight: 1200,
    tone: "sage",
  },
  {
    label: "Portfolio and project execution",
    title: "Portfolio & Project Execution",
    description: "Decide which work deserves investment—and lead critical work through execution.",
    includes: "Portfolio Services · Project Leadership",
    bestWhen: "Too many initiatives compete for the same capacity, or a critical project needs stronger execution leadership.",
    change: "Leadership makes an explicit decision about what to continue, accelerate, reshape, or stop.",
    outcome: "Capacity follows priority, weak work exits the portfolio, and remaining commitments have visible owners and outcomes.",
    href: "/roi-driven-project-portfolio-services",
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
    description: "Find where execution keeps breaking, what it is costing, and who must participate.",
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
    description: "Apply the system to real priorities, decisions, and commitments already in motion.",
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
    description: "Use the system inside weekly work and real business pressure.",
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
    description: "Build the team’s ability to sustain it without depending on 120VC.",
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
            <p className="orientation-label orientation-label-light">Execution Leadership for complex enterprises</p>
            <h1 className="heading-wide" id="home-title">Turn strategy into <span className="headline-keyword headline-keyword-on-dark">results</span> your teams can deliver.</h1>
            <p>120VC works inside your highest-priority initiatives to help leadership teams align the work, make decisions that hold, and deliver without constant executive rescue.</p>
            <div className="primary-and-quiet home-hero-actions">
              <Link className="button button-primary" href="/consultation?source=homepage-hero" data-primary-action data-analytics-event="homepage_consultation_clicked" data-analytics-section="hero">Book a Leadership System Consultation <span aria-hidden="true">→</span></Link>
              <Link className="quiet-link" href="#how-we-help" data-secondary-action data-analytics-event="homepage_secondary_cta_clicked" data-analytics-section="hero">See how we help <span aria-hidden="true" data-direction="down">↓</span></Link>
            </div>
          </div>
        </section>

        <LogoMarquee />

        <section className="home-pains" data-major-section data-journey-stage="recognize" aria-labelledby="home-pains-title">
          <div className="home-section-heading home-section-heading-stacked">
            <h2 className="heading-wide" id="home-pains-title">Five execution problems we solve.</h2>
            <p>Start with the problem closest to what your team is experiencing.</p>
          </div>
          <PainPointCarousel />
          <Link className="home-section-link" href="/problems-we-solve" data-analytics-event="pain_problem_selected" data-analytics-section="pain" data-analytics-selection="all">Explore all five problems <span aria-hidden="true">→</span></Link>
        </section>

        <KineticStatement />

        <section className="home-solutions" id="how-we-help" data-major-section data-journey-stage="solution" aria-labelledby="home-solutions-title">
          <div className="home-section-heading">
            <h2 className="heading-medium" id="home-solutions-title">We help leadership teams fix execution across three core areas.</h2>
          </div>
          <SolutionScopeCards scopes={solutionScopes} />
        </section>

        {featuredCases.length > 0 && (
          <section className="home-client-results" data-major-section data-journey-stage="proof" aria-labelledby="home-client-results-title">
            <div className="home-section-heading">
              <h2 className="heading-wide" id="home-client-results-title">See the results of changing how teams execute.</h2>
              <p>One execution problem. What 120VC changed. What happened next.</p>
            </div>
            {reviewMode && featuredCases.some((caseStudy) => caseStudy.proofStatus === "demo") && (
              <p className="proof-review-badge">Demo proof</p>
            )}
            <FeaturedCaseCarousel cases={featuredCases} forceReducedMotion={reducedMotionReview} />
          </section>
        )}

        <section className="home-installation" data-major-section data-journey-stage="difference" aria-labelledby="home-installation-title">
          <div className="home-installation-copy">
            <h2 className="heading-medium" id="home-installation-title">We install the system in four stages.</h2>
            <p>120VC works inside the priorities, decisions, and initiatives your team is already accountable to deliver.</p>
          </div>
          <InstallationStepper steps={installationSteps} />
          <div className="home-installation-closing">
            <p>No simulation. No separate training environment. The work itself becomes the installation ground.</p>
            <Link className="button button-light" href="/leadership-system" data-primary-action data-analytics-event="homepage_secondary_cta_clicked" data-analytics-section="how-it-works">See the complete Execution Leadership System <span aria-hidden="true">→</span></Link>
          </div>
        </section>

        <section className="experience-close home-commercial-close" data-major-section data-journey-stage="act" aria-labelledby="home-close-title">
          <h2 className="heading-wide" id="home-close-title">Bring us the problem that keeps returning.</h2>
          <p>We&apos;ll help you understand what is underneath it, whether 120VC is the right fit, and what should happen next.</p>
          <div className="primary-and-quiet primary-and-quiet-centered">
            <Link className="button button-primary" href="/consultation?source=homepage-final" data-primary-action data-analytics-event="homepage_consultation_clicked" data-analytics-section="final-cta">Book a Leadership System Consultation <span aria-hidden="true">→</span></Link>
            <a className="quiet-link" href="https://www.120vc.com/book-download-the-strategy-execution-gap/" data-secondary-action data-analytics-event="book_link_clicked" data-analytics-section="final-cta">Read <em>The Strategy Execution Gap</em> <span aria-hidden="true" data-direction="out">↗</span></a>
          </div>
          <small>Confidential. Diagnostic. No generic deck. No predetermined offer.</small>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

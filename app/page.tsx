import type { Metadata } from "next";
import Link from "@/app/components/native-link";
import { FeaturedCaseCarousel } from "./components/featured-case-carousel";
import { CompanyTrackRecord, IndustryStatistics } from "./components/evidence-statistics";
import { FourTs } from "./components/four-ts";
import { HeroMotionMedia } from "./components/hero-motion-media";
import { KineticStatement } from "./components/kinetic-statement";
import { LogoMarquee } from "./components/logo-marquee";
import { PainPointCarousel } from "./components/pain-point-carousel";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { SolutionScopeCards } from "./components/solution-scope-cards";
import { ScrollWords } from "./components/scroll-words";
import { getHomepageCaseProof } from "./data/homepage-case-proof";
import { offerScopes } from "./data/sitemap-content";

const description = "We coach enterprise leaders, install a shared way to execute, and lead critical work alongside your team.";
export const metadata: Metadata = {
  title: "Execution Leadership That Turns Strategy Into Results",
  description,
  alternates: { canonical: "/" },
  openGraph: { title: "Execution Leadership That Turns Strategy Into Results | 120VC", description, images: [{ url: "/og.png", width: 1200, height: 630, alt: "120VC Execution Leadership" }] },
  twitter: { card: "summary_large_image", title: "Execution Leadership | 120VC", description, images: ["/og.png"] },
};

type HomeProps = { searchParams?: Promise<Record<string, string | string[] | undefined>> };

export default async function Home({ searchParams }: HomeProps) {
  const query = searchParams ? await searchParams : {};
  const reviewMode = query.review === "1" && process.env.NODE_ENV !== "production";
  const forceReducedMotion = query.motion === "reduce" && process.env.NODE_ENV !== "production";
  const featuredCases = getHomepageCaseProof(process.env.NODE_ENV, reviewMode);
  return (
    <div className="site-shell hierarchy-site experience-home commercial-home sitemap-home">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="home-commercial-hero" data-major-section data-journey-stage="position" aria-labelledby="home-title">
          <HeroMotionMedia />
          <div className="home-commercial-hero-copy">
            <p className="home-hero-eyebrow">Execution Leadership for enterprise teams</p>
            <h1 className="heading-wide" id="home-title">Execution Leadership that <span className="headline-keyword headline-keyword-on-dark">turns strategy into results.</span></h1>
            <p>{description}</p>
            <div className="primary-and-quiet home-hero-actions">
              <Link className="button button-primary" href="/contact?source=homepage-hero" data-primary-action data-analytics-event="homepage_consultation_clicked" data-analytics-section="hero">Let&apos;s Talk <span aria-hidden="true">→</span></Link>
              <Link className="quiet-link" href="#how-we-help" data-secondary-action data-analytics-event="homepage_secondary_cta_clicked" data-analytics-section="hero">Explore What We Do <span aria-hidden="true" data-direction="down">↓</span></Link>
            </div>
          </div>
        </section>
        <LogoMarquee />
        <section className="home-pains" data-major-section data-journey-stage="recognize" aria-labelledby="home-pains-title">
          <div className="home-section-heading home-section-heading-stacked">
            <h2 className="heading-wide" id="home-pains-title"><ScrollWords>{"Your teams are busy. Why aren't critical initiatives moving?"}</ScrollWords></h2>
            <p>Priorities compete. Ownership is unclear. Decisions take too long. Your team keeps working harder while deadlines slip.</p>
          </div>
          <IndustryStatistics />
          <PainPointCarousel />
          <Link className="home-section-link" href="/problems-we-solve">Explore the execution gap <span aria-hidden="true">→</span></Link>
        </section>
        <FourTs />
        <KineticStatement />
        <section className="home-solutions" id="how-we-help" data-major-section data-journey-stage="solution" aria-labelledby="home-solutions-title">
          <div className="home-section-heading">
            <h2 className="heading-medium" id="home-solutions-title"><ScrollWords>Execution Leadership at the level your team needs.</ScrollWords></h2>
            <p>Coach your leaders. Install the Execution Leadership System. Bring execution leaders into the work that needs to move.</p>
          </div>
          <SolutionScopeCards scopes={offerScopes} />
          <Link className="home-section-link" href="/leadership-services">Explore What We Do <span aria-hidden="true">→</span></Link>
        </section>
        {featuredCases.length > 0 && <section className="home-client-results" data-major-section data-journey-stage="proof" aria-labelledby="home-client-results-title">
          <div className="home-section-heading"><h2 id="home-client-results-title"><ScrollWords>See what changed for our clients.</ScrollWords></h2><p>The challenge, the work we led together, and the business result.</p></div>
          <CompanyTrackRecord />
          <FeaturedCaseCarousel cases={featuredCases} forceReducedMotion={forceReducedMotion} />
          <Link className="home-section-link" href="/results">See client results <span aria-hidden="true">→</span></Link>
        </section>}
        <section className="home-resource-intro" data-major-section data-journey-stage="understand" aria-labelledby="home-resources-title">
          <div><h2 id="home-resources-title"><ScrollWords>Practical guidance for the work in front of you.</ScrollWords></h2><p>Explore frameworks, guides, and insights to clarify priorities, make decisions, and keep commitments moving.</p><Link className="button button-light" href="/resources" data-primary-action>Explore resources <span aria-hidden="true">→</span></Link></div>
          <nav aria-label="Featured resources">
            <Link href="/resources/tools/2x2-prioritization-matrix"><span>Framework</span><strong>Decide what deserves attention.</strong><i aria-hidden="true">→</i></Link>
            <Link href="/resources/guides/weekly-operating-rhythm"><span>Guide</span><strong>Build a weekly operating rhythm.</strong><i aria-hidden="true">→</i></Link>
            <Link href="/resources/insights/why-digital-transformations-stall"><span>Insight</span><strong>Understand why transformation stalls.</strong><i aria-hidden="true">→</i></Link>
          </nav>
        </section>
        <section className="experience-close home-commercial-close" data-major-section data-journey-stage="act" aria-labelledby="home-close-title">
          <h2 className="heading-wide" id="home-close-title">What does your team need to deliver?</h2>
          <p>Tell us what&apos;s at stake and where execution is getting stuck.</p>
          <Link className="button button-primary" href="/contact?source=homepage-final" data-primary-action data-analytics-event="homepage_consultation_clicked" data-analytics-section="final-cta">Let&apos;s Talk <span aria-hidden="true">→</span></Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

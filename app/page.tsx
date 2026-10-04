import type { Metadata } from "next";
import Link from "./components/native-link";
import { ExecutionIcon } from "./components/execution-icon";
import { CompanyTrackRecord, IndustryStatistics } from "./components/evidence-statistics";
import { HomepageEditorialImage, LeadSentence } from "./components/homepage-editorial";
import { FeaturedCaseCarousel } from "./components/featured-case-carousel";
import { FourTs } from "./components/four-ts";
import { HeroMotionMedia } from "./components/hero-motion-media";
import { LogoMarquee } from "./components/logo-marquee";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { ScrollWords } from "./components/scroll-words";
import { ProblemSpotlightLink } from "./components/problem-spotlight-link";
import { DecisionBriefPreview } from "./components/decision-brief-preview";
import { approvedHomepageCaseProof, caseMayRenderForProductionAudience } from "./data/homepage-case-proof";
import { homepage as copy } from "./data/homepage-content";
import { offerScopes } from "./data/sitemap-content";

export const metadata: Metadata = {
  title: copy.seoTitle,
  description: copy.seoDescription,
  alternates: { canonical: "/" },
  openGraph: { title: `${copy.seoTitle} | 120VC`, description: copy.seoDescription, images: [{ url: "/og.png", width: 1200, height: 630, alt: "120VC strategy execution for enterprise teams" }] },
  twitter: { card: "summary_large_image", title: `${copy.seoTitle} | 120VC`, description: copy.seoDescription, images: ["/og.png"] },
};

export default function Home() {
  // Case results require approval. Company-reported claims are a clearly marked
  // development-only design preview; the evidence component enforces that boundary.
  const featuredCases = approvedHomepageCaseProof.filter(caseMayRenderForProductionAudience);
  return (
    <div className="site-shell hierarchy-site experience-home commercial-home sitemap-home homepage-refresh">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="home-commercial-hero" data-major-section data-journey-stage="position" aria-labelledby="home-title">
          <HeroMotionMedia />
          <div className="home-commercial-hero-copy">
            <p className="home-hero-eyebrow">{copy.hero.eyebrow}</p>
            <h1 className="heading-wide" id="home-title">Strategy execution that <span className="headline-keyword headline-keyword-on-dark">delivers on your commitments.</span></h1>
            {copy.hero.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            <div className="primary-and-quiet home-hero-actions">
              <Link className="button button-primary" href="/contact?source=homepage-hero" data-primary-action data-analytics-event="homepage_consultation_clicked" data-analytics-section="hero">Let’s Talk <span aria-hidden="true">→</span></Link>
              <Link className="quiet-link" href="#execution-gap" data-secondary-action data-analytics-event="homepage_secondary_cta_clicked" data-analytics-section="hero">Find what’s blocking delivery <span aria-hidden="true" data-direction="down">↓</span></Link>
            </div>
          </div>
        </section>
        <div className="homepage-industry-context"><IndustryStatistics /></div>
        <section className="homepage-section homepage-problems" id="execution-gap" data-major-section data-journey-stage="recognize" aria-labelledby="home-pains-title">
          <header className="homepage-heading">
            <h2 id="home-pains-title"><ScrollWords emphasis="strategy execution gap">{copy.problem.title}</ScrollWords></h2>
          </header>
          <div className="homepage-editorial-row">
            <p className="homepage-editorial-copy"><LeadSentence>{copy.problem.description}</LeadSentence></p>
            <HomepageEditorialImage scene="pressure" />
          </div>
          <div className="homepage-problem-grid">
            {copy.problem.cards.map(card => (
              <article className="homepage-problem-card" key={card.href} data-scroll-enter>
                <ProblemSpotlightLink href={card.href}>
                <ExecutionIcon name={card.icon} />
                <h3><span className="homepage-problem-keyword">{card.title.split(/(?<=[:?]) /)[0]}</span>{" "}{card.title.split(/(?<=[:?]) /).slice(1).join(" ")}</h3>
                <p><LeadSentence>{card.description}</LeadSentence></p>
                <span className="quiet-link quiet-link-strong">{card.action} <span aria-hidden="true">→</span></span>
                </ProblemSpotlightLink>
              </article>
            ))}
          </div>
          <Link className="home-section-link" href="/problems-we-solve">Explore the strategy execution gap <span aria-hidden="true">→</span></Link>
        </section>
        <FourTs />
        <section className="homepage-section homepage-why" id="why-120vc" data-major-section data-journey-stage="proof" aria-labelledby="home-why-title">
          <header className="homepage-heading">
            <h2 id="home-why-title"><ScrollWords emphasis="work alongside you.">{copy.why.title}</ScrollWords></h2>
          </header>
          <div className="homepage-editorial-row">
            <div className="homepage-editorial-copy">
              {copy.why.paragraphs.map(paragraph => <p key={paragraph}><LeadSentence>{paragraph}</LeadSentence></p>)}
              <Link className="home-section-link" href="/about">Meet 120VC <span aria-hidden="true">→</span></Link>
              <Link className="executive-founder-link" href="/founder-jason-scott">
                <img src="https://www.120vc.com/wp-content/uploads/2026/02/Jason-Scott-120VC-CEO-Founder-img.webp" alt="J. Scott, founder and CEO of 120VC" width={532} height={530} loading="lazy" />
                <span><strong>J. Scott</strong><span>Founder & CEO · Meet the person behind the system</span></span>
              </Link>
            </div>
            <HomepageEditorialImage scene="alongside" />
          </div>
          <LogoMarquee />
          {featuredCases.length > 0 && <div className="homepage-approved-proof"><FeaturedCaseCarousel cases={featuredCases} /></div>}
        </section>
        <section className="homepage-section homepage-system" id="execution-leadership-system" data-major-section data-journey-stage="understand" aria-labelledby="home-system-title">
          <header className="homepage-heading">
            <h2 id="home-system-title"><ScrollWords emphasis="disciplined execution." onDark>{copy.system.title}</ScrollWords></h2>
            {copy.system.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </header>
          <ul className="homepage-system-outcomes" aria-label="What the Execution Leadership System makes possible" data-scroll-enter>
            {copy.system.outcomes.map(outcome => <li key={outcome.title}><ExecutionIcon name={outcome.icon} /><strong>{outcome.title}</strong></li>)}
          </ul>
          <CompanyTrackRecord proposedHeadline="This Isn’t Theory. It’s Proven." />
          <Link className="button button-light" href="/leadership-system" data-primary-action>See how the system works <span aria-hidden="true">→</span></Link>
        </section>
        <section className="homepage-section homepage-offers" id="what-we-do" data-major-section data-journey-stage="solution" aria-labelledby="home-solutions-title">
          <header className="homepage-heading">
            <h2 id="home-solutions-title"><ScrollWords>{copy.offers.title}</ScrollWords></h2>
            <p>{copy.offers.description}</p>
          </header>
          <div className="homepage-offer-grid">
            {copy.offers.cards.map(card => (
              <article className="homepage-offer-card" key={card.href} data-scroll-enter>
                <h3>{card.title}</h3>
                <p><LeadSentence emphasis={card.href === "/execution-leadership-coaching" ? "Executive team coaching" : undefined}>{card.description}</LeadSentence></p>
                <div className="homepage-offer-fit"><span>Best when</span><p>{offerScopes.find(scope => scope.href === card.href)?.bestWhen}</p></div>
                <div className="homepage-offer-links">
                  <Link className="quiet-link quiet-link-strong" href={card.href}>{card.action} <span aria-hidden="true">→</span></Link>
                  {"secondary" in card && <Link className="homepage-context-link" href={card.secondary.href}>{card.secondary.action} <span aria-hidden="true">→</span></Link>}
                </div>
              </article>
            ))}
          </div>
          <Link className="home-section-link" href="/leadership-services">Explore What We Do <span aria-hidden="true">→</span></Link>
        </section>
        <section className="homepage-section homepage-roles" id="who-we-help" data-major-section data-journey-stage="identify" aria-labelledby="home-roles-title">
          <header className="homepage-heading">
            <h2 id="home-roles-title"><ScrollWords emphasis="outcomes you own.">{copy.roles.title}</ScrollWords></h2>
            <p>{copy.roles.description}</p>
          </header>
          <nav className="homepage-role-links" aria-label="Explore execution challenges by role">
            {copy.roles.items.map(role => <Link href={role.href} key={role.href}><strong>{role.title}</strong><span>{role.description}</span><i aria-hidden="true">→</i></Link>)}
          </nav>
          <Link className="home-section-link" href="/for-leaders">See who we work with <span aria-hidden="true">→</span></Link>
        </section>
        <section className="homepage-section homepage-resources" id="resources" data-major-section data-journey-stage="explore" aria-labelledby="home-resources-title">
          <header className="homepage-heading">
            <h2 id="home-resources-title"><ScrollWords>{copy.resources.title}</ScrollWords></h2>
            <p>{copy.resources.description}</p>
          </header>
          <DecisionBriefPreview />
          <Link className="home-section-link" href="/resources">Browse frameworks, guides, and insights <span aria-hidden="true">→</span></Link>
          <nav className="homepage-resource-categories" aria-label="Browse resource categories">{copy.resources.items.map(resource => <Link href={resource.href} key={resource.href}>{resource.title}</Link>)}</nav>
        </section>
        <section className="experience-close home-commercial-close" id="lets-talk" data-major-section data-journey-stage="act" aria-labelledby="home-close-title">
          <h2 className="heading-wide" id="home-close-title">{copy.close.title}</h2>
          <p>{copy.close.description}</p>
          <Link className="button button-primary" href="/contact?source=homepage-final" data-primary-action data-analytics-event="homepage_consultation_clicked" data-analytics-section="final-cta">Let’s Talk <span aria-hidden="true">→</span></Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

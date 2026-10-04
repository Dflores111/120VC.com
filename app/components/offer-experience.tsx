import Link from "./native-link";
import { ImageMask } from "./image-mask";
import { ScrollWords } from "./scroll-words";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { embeddedScopes, siteRoutes } from "../data/sitemap-content";
import type { SitePage } from "../site-data";
import { EngagementEvaluation } from "./engagement-evaluation";

export function OfferExperience({ page }: { page: SitePage }) {
  const isEmbedded = `/${page.slug}` === siteRoutes.embedded;
  const isElpa = `/${page.slug}` === siteRoutes.elpa;
  const cta = page.primaryCta || { label: "Let's Talk", href: siteRoutes.contact };
  return <div className="site-shell hierarchy-site supporting-v2 offer-experience">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <SiteHeader />
    <main id="main-content" tabIndex={-1}>
      <section className="supporting-hero offer-hero" data-major-section aria-labelledby="offer-title">
        <div className="supporting-hero-copy">
          <h1 id="offer-title" className={page.title.length > 58 ? "headline-compact-mobile" : undefined}>{page.title}</h1>
          <p>{page.description}</p>
          <Link className="button button-primary" href={cta.href} data-primary-action>{cta.label}<span aria-hidden="true">→</span></Link>
        </div>
        {page.heroImage && <ImageMask {...page.heroImage} variant="step" priority />}
      </section>
      {isElpa && <nav className="offer-parent-link" aria-label="System navigation"><Link href={siteRoutes.system}>← Explore the Execution Leadership System</Link></nav>}
      <div className="offer-sections">
        {page.sections.map((section, index) => <section className="offer-section" data-major-section key={section.title}>
          <span className="offer-section-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <h2><ScrollWords>{section.title}</ScrollWords></h2>
          <div>
            {section.paragraphs?.map(text => <p key={text}>{text}</p>)}
            {section.bullets && <ul>{section.bullets.map(text => <li key={text}>{text}</li>)}</ul>}
            {section.cards?.map(link => <Link className="quiet-link quiet-link-strong" href={link.href} key={link.href}>Explore {link.title}<span aria-hidden="true">→</span></Link>)}
          </div>
        </section>)}
      </div>
      {isEmbedded && <section className="embedded-scope-section" data-major-section aria-labelledby="embedded-scopes-title">
        <header className="supporting-section-heading"><h2 id="embedded-scopes-title"><ScrollWords>One offer. The scope your work requires.</ScrollWords></h2><p>Bring execution leadership to an initiative, the portfolio, or a transformation across the enterprise.</p></header>
        <div className="embedded-scopes">{embeddedScopes.map(scope => <article id={scope.id} key={scope.id}>
          <h3>{scope.title}</h3><p>{scope.description}</p>
          <Link className="quiet-link quiet-link-strong" href={scope.href}>Explore {scope.detail}<span aria-hidden="true">→</span></Link>
        </article>)}</div>
        <Link className="home-section-link" href="/results">Review experience and evidence <span aria-hidden="true">→</span></Link>
      </section>}
      <EngagementEvaluation />
      <section className="solution-reassurance" data-major-section data-journey-stage="act" aria-labelledby="offer-close-title">
        <div><h2 id="offer-close-title">{page.closingTitle}</h2><p>{page.closingDescription}</p></div>
        <Link className="button button-primary" href={cta.href} data-primary-action>{cta.label}<span aria-hidden="true">→</span></Link>
      </section>
    </main>
    <SiteFooter />
  </div>;
}

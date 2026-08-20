import { GlowCard, Reveal } from "./motion-kit";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import type { PageLink, SitePage } from "../site-data";

function ArrowLink({ link, className = "" }: { link: PageLink; className?: string }) {
  return (
    <a className={`content-card-link ${className}`} href={link.href}>
      {link.label && <span className="card-label">{link.label}</span>}
      <h3>{link.title}</h3>
      <p>{link.description}</p>
      <span className="card-arrow">Explore <i aria-hidden="true">↗</i></span>
    </a>
  );
}

export function ContentPage({ page }: { page: SitePage }) {
  return (
    <div className="site-shell inner-site">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />

      <main id="main-content">
        <section className="inner-hero">
          <div className="inner-hero-grid" aria-hidden="true" />
          <div className="inner-hero-copy">
            <p className="eyebrow eyebrow-light"><span className="eyebrow-mark" />{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p className="inner-description">{page.description}</p>
            <div className="hero-actions">
              <a className="button button-primary" href={page.primaryCta?.href || "/contact"}>{page.primaryCta?.label || "Book a consultation"}<span aria-hidden="true">↗</span></a>
              {page.secondaryCta && <a className="button button-dark-outline" href={page.secondaryCta.href}>{page.secondaryCta.label}<span aria-hidden="true">↗</span></a>}
            </div>
          </div>
          <div className="inner-hero-aside">
            <p className="section-index">The condition</p>
            <p>{page.intro}</p>
          </div>
        </section>

        {page.facts && (
          <section className="facts-strip" aria-label="At a glance">
            {page.facts.map((fact, index) => (
              <div key={fact.label}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{fact.label}</p>
                <strong>{fact.value}</strong>
              </div>
            ))}
          </section>
        )}

        <div className="content-sections">
          {page.sections.map((section, index) => (
            <Reveal key={`${section.title}-${index}`}>
              <section className={`content-section ${index % 2 ? "content-section-alt" : ""}`}>
                <div className="content-section-index">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{section.eyebrow || "What to understand"}</p>
                </div>
                <div className="content-section-body">
                  <h2>{section.title}</h2>
                  {section.paragraphs?.map((paragraph) => <p className="content-paragraph" key={paragraph}>{paragraph}</p>)}
                  {section.bullets && (
                    <ul className="content-list">
                      {section.bullets.map((bullet) => <li key={bullet}><span aria-hidden="true" />{bullet}</li>)}
                    </ul>
                  )}
                  {section.statement && <blockquote>{section.statement}</blockquote>}
                  {section.cards && (
                    <div className="content-card-grid">
                      {section.cards.map((card) => (
                        <GlowCard key={`${card.href}-${card.title}`}><ArrowLink link={card} /></GlowCard>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        {page.related && page.related.length > 0 && (
          <section className="related-section">
            <div className="related-heading">
              <p className="section-index">Continue evaluating</p>
              <h2>Take the next useful path.</h2>
            </div>
            <div className="related-grid">
              {page.related.map((link) => <ArrowLink link={link} key={`${link.href}-${link.title}`} />)}
            </div>
          </section>
        )}

        <section className="final-cta">
          <div>
            <p className="section-index">The next decision</p>
            <h2>Diagnose where execution is breaking—and what should change.</h2>
          </div>
          <div>
            <p>The consultation clarifies the outcome at risk, the leadership condition, and the most useful next step. It is a readiness and fit conversation, not a scripted product demo.</p>
            <a className="button button-light" href={page.primaryCta?.href || "/contact"}>{page.primaryCta?.label || "Book a consultation"}<span aria-hidden="true">↗</span></a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

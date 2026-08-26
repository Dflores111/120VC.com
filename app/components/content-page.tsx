/* eslint-disable @next/next/no-img-element -- 120VC CMS images are served directly in the vinext deployment. */
import Link from "next/link";
import { GlowCard, Reveal } from "./motion-kit";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import type { PageLink, SitePage } from "../site-data";

function headlineLengthClass(text: string) {
  if (text.length > 68) return "headline-long";
  if (text.length > 44) return "headline-medium";
  return "";
}

function CtaLink({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  if (href.startsWith("/")) {
    return <Link className={className} href={href}>{children}</Link>;
  }
  return <a className={className} href={href}>{children}</a>;
}

function ArrowLink({ link, className = "" }: { link: PageLink; className?: string }) {
  return (
    <CtaLink className={`content-card-link ${className}`} href={link.href}>
      {link.label && <span className="card-label">{link.label}</span>}
      <h3>{link.title}</h3>
      <p>{link.description}</p>
      <span className="card-arrow">Explore <i aria-hidden="true">{link.href.startsWith("/") ? "→" : "↗"}</i></span>
    </CtaLink>
  );
}

export function ContentPage({ page }: { page: SitePage }) {
  const finalCta = page.primaryCta || { label: "Book a Consultation", href: "/consultation" };
  const consultationOutcome = finalCta.href.startsWith("/consultation") || finalCta.href.startsWith("/contact");

  return (
    <div className="site-shell inner-site">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />

      <main id="main-content" tabIndex={-1}>
        <section className="inner-hero">
          <div className="inner-hero-grid" aria-hidden="true" />
          <div className="inner-hero-copy">
            <p className="eyebrow eyebrow-light"><span className="eyebrow-mark" />{page.eyebrow}</p>
            <h1 className={headlineLengthClass(page.title)}>{page.title}</h1>
            <p className="inner-description">{page.description}</p>
            <div className="hero-actions">
              <CtaLink className="button button-primary" href={page.primaryCta?.href || "/consultation"}>{page.primaryCta?.label || "Book a Consultation"}<span aria-hidden="true">{(page.primaryCta?.href || "/consultation").startsWith("/") ? "→" : "↗"}</span></CtaLink>
              {page.secondaryCta && <CtaLink className="button button-dark-outline" href={page.secondaryCta.href}>{page.secondaryCta.label}<span aria-hidden="true">{page.secondaryCta.href.startsWith("/") ? "→" : "↗"}</span></CtaLink>}
            </div>
          </div>
          <div className={`inner-hero-aside ${page.heroImage ? "inner-hero-aside-person" : ""}`}>
            {page.heroImage && (
              <img
                className="inner-hero-person-image"
                src={page.heroImage.src}
                alt={page.heroImage.alt}
                width={page.heroImage.width}
                height={page.heroImage.height}
              />
            )}
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
                  <p>{section.eyebrow || (page.slug === "faq" ? `Question ${String(index + 1).padStart(2, "0")}` : "What to understand")}</p>
                </div>
                <div className="content-section-body">
                  <h2 className={headlineLengthClass(section.title)}>{section.title}</h2>
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
            <h2>{consultationOutcome ? "Find where execution is breaking." : finalCta.label}</h2>
          </div>
          <div>
            <p>{consultationOutcome
              ? "The consultation clarifies the outcome at risk, the leadership condition, and the most useful next step. It is a readiness and fit conversation, not a scripted product demo."
              : "Continue with the primary next step for this page, or use the related paths above to keep evaluating the condition and approach."}</p>
            <CtaLink className="button button-light" href={finalCta.href}>{finalCta.label}<span aria-hidden="true">{finalCta.href.startsWith("/") ? "→" : "↗"}</span></CtaLink>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

/* eslint-disable @next/next/no-img-element -- 120VC CMS images are served directly in the vinext deployment. */
import Link from "@/app/components/native-link";
import { ProgressiveDisclosure } from "./progressive-disclosure";
import { ReviewModePanel } from "./review-mode-panel";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { pageHasApprovalHold, type PageLink, type PageSection, type SitePage } from "../site-data";

function headlineLengthClass(text: string) {
  if (text.length > 68) return "headline-long";
  if (text.length > 44) return "headline-medium";
  return "";
}

function CtaLink({ href, className, children, action }: { href: string; className: string; children: React.ReactNode; action?: "primary" | "secondary" | "choice" }) {
  const actionProps = action === "primary"
    ? { "data-primary-action": true }
    : action === "secondary"
      ? { "data-secondary-action": true }
      : action === "choice"
        ? { "data-choice-action": true }
        : {};
  if (href.startsWith("/")) {
    return <Link className={className} href={href} {...actionProps}>{children}</Link>;
  }
  return <a className={className} href={href} {...actionProps}>{children}</a>;
}

function ArrowLink({ link, className = "" }: { link: PageLink; className?: string }) {
  return (
    <CtaLink action="choice" className={`content-card-link ${className}`} href={link.href}>
      {link.label && <span className="card-label">{link.label}</span>}
      <h3>{link.title}</h3>
      <p>{link.description}</p>
      <span className="card-arrow">Explore <i aria-hidden="true">{link.href.startsWith("/") ? "→" : "↗"}</i></span>
    </CtaLink>
  );
}

const governanceCopy = /\[APPROVAL REQUIRED\]|PLACEHOLDER TESTIMONIAL|OWNER PREVIEW|NOT CONNECTED|publication hold|publishing gate|content governance|activation status|legal publishing hold|owner-only prototype|remain(?:s)? held|remain(?:s)? disabled|approval-dependent|requires (?:legal )?approval|before (?:public )?(?:launch|publication|activation)|must (?:come from|be supplied and approved)/i;

function isGovernanceCopy(value?: string) {
  return Boolean(value && governanceCopy.test(value));
}

function audienceSection(section: PageSection): PageSection | null {
  if (section.visibility === "review") return null;
  if (isGovernanceCopy(section.eyebrow) || isGovernanceCopy(section.title)) return null;

  const paragraphs = section.paragraphs?.filter((item) => !isGovernanceCopy(item));
  const bullets = section.bullets?.filter((item) => !isGovernanceCopy(item));
  const cards = section.cards?.filter((item) => !isGovernanceCopy(item.title) && !isGovernanceCopy(item.description) && !isGovernanceCopy(item.label));
  const statement = isGovernanceCopy(section.statement) ? undefined : section.statement;
  const hasContent = Boolean(paragraphs?.length || bullets?.length || cards?.length || statement);

  return hasContent ? { ...section, paragraphs, bullets, cards, statement } : null;
}

export function ContentPage({ page, reviewMode = false }: { page: SitePage; reviewMode?: boolean }) {
  const finalCta = page.primaryCta || { label: "Book a Consultation", href: "/consultation" };
  const consultationOutcome = finalCta.href.startsWith("/consultation") || finalCta.href.startsWith("/contact");
  const held = pageHasApprovalHold(page);
  const description = isGovernanceCopy(page.description) ? page.seoDescription : page.description;
  const intro = isGovernanceCopy(page.intro) ? undefined : page.intro;
  const sections = page.sections.map(audienceSection).filter((section): section is PageSection => Boolean(section));
  const related = page.related?.filter((item) => !isGovernanceCopy(item.title) && !isGovernanceCopy(item.description) && !isGovernanceCopy(item.label));
  const faqMode = page.slug === "faq";
  const primarySections = faqMode ? [] : sections.slice(0, 2);
  const supportingSections = faqMode ? sections : sections.slice(2);
  const relatedLivesWithSupportingDetail = supportingSections.length > 0;
  const disclosureSections: PageSection[] = relatedLivesWithSupportingDetail && related && related.length > 0
    ? [...supportingSections, { eyebrow: "Continue evaluating", title: "See related paths.", cards: related }]
    : supportingSections;
  const hasHeroAside = Boolean(page.heroImage || intro);

  return (
    <div className="site-shell inner-site hierarchy-site guided-content-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />

      {reviewMode && held && (
        <ReviewModePanel
          exitHref={`/${page.slug}`}
          items={[
            { label: "Audience copy", status: "ready", detail: "Internal approval and activation notes are removed from the audience composition." },
            { label: "Publication", status: "blocked", detail: "This route remains noindex until its source, proof, legal, content, or activation requirements are approved." },
            { label: "Owner action", status: "review", detail: "Resolve the held source material in site-data before enabling indexing or public activation." },
          ]}
        />
      )}

      <main id="main-content" tabIndex={-1}>
        <section className={`inner-hero ${hasHeroAside ? "" : "content-hero-single"}`} data-major-section data-journey-stage="recognize" data-surface="neutral">
          <div className="inner-hero-copy">
            <h1 className={headlineLengthClass(page.title)}>{page.title}</h1>
            <p className="inner-description">{description}</p>
            <div className="primary-and-quiet">
              <CtaLink action="primary" className="button button-primary" href={page.primaryCta?.href || "/consultation"}>{page.primaryCta?.label || "Book a Consultation"}<span aria-hidden="true" data-direction={(page.primaryCta?.href || "/consultation").startsWith("/") ? undefined : "out"}>{(page.primaryCta?.href || "/consultation").startsWith("/") ? "→" : "↗"}</span></CtaLink>
              {page.secondaryCta && <CtaLink action="secondary" className="quiet-link" href={page.secondaryCta.href}>{page.secondaryCta.label}<span aria-hidden="true" data-direction={page.secondaryCta.href.startsWith("/") ? undefined : "out"}>{page.secondaryCta.href.startsWith("/") ? "→" : "↗"}</span></CtaLink>}
            </div>
          </div>
          {hasHeroAside && (
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
              {intro && <p>{intro}</p>}
            </div>
          )}
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
          {primarySections.map((section, index) => (
            <section className="content-section" data-major-section data-journey-stage="understanding" data-surface="neutral" key={`${section.title}-${index}`}>
              <div className="content-section-index">
                <span>{String(index + 1).padStart(2, "0")}</span>
                {(section.eyebrow || page.slug === "faq") && (
                  <p>{section.eyebrow || `Question ${String(index + 1).padStart(2, "0")}`}</p>
                )}
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
                  <div className="content-card-grid" aria-label="Choose a path">
                    {section.cards.map((card) => <ArrowLink link={card} key={`${card.href}-${card.title}`} />)}
                  </div>
                )}
              </div>
            </section>
          ))}

          {disclosureSections.length > 0 && (
            <section className="content-section content-progressive-section" data-major-section data-journey-stage="understanding" data-surface="neutral">
              <div className="content-section-index">
                <span>{String(primarySections.length + 1).padStart(2, "0")}</span>
                <p>{faqMode ? "Frequently asked" : "Go deeper when useful"}</p>
              </div>
              <div className="content-section-body">
                <h2>{faqMode ? "Questions, answered in order." : "Explore the supporting detail."}</h2>
                <p className="content-paragraph">{faqMode
                  ? "Open only the question that matters to the decision you are making now."
                  : "The primary argument is above. Open a topic below when you need more context for evaluation or implementation."}</p>
                <ProgressiveDisclosure sections={disclosureSections} faqMode={faqMode} />
              </div>
            </section>
          )}
        </div>

        {!relatedLivesWithSupportingDetail && related && related.length > 0 && (
          <section className="related-section" data-major-section data-journey-stage="solution" data-surface="neutral">
            <div className="related-heading">
              <p className="section-index">Continue evaluating</p>
              <h2>Take the next useful path.</h2>
            </div>
            <div className="related-grid">
              {related.map((link) => <ArrowLink link={link} key={`${link.href}-${link.title}`} />)}
            </div>
          </section>
        )}

        <section className="final-cta" data-major-section data-journey-stage="act" data-surface="outcome">
          <div>
            <p className="section-index">The next decision</p>
            <h2>{consultationOutcome ? "Find where execution is breaking." : finalCta.label}</h2>
          </div>
          <div>
            <p>{consultationOutcome
              ? "The consultation clarifies the outcome at risk, the leadership condition, and the most useful next step. It is a readiness and fit conversation, not a scripted product demo."
              : "Continue with the primary next step for this page, or use the related paths above to keep evaluating the condition and approach."}</p>
            <CtaLink action="primary" className="button button-light" href={finalCta.href}>{finalCta.label}<span aria-hidden="true" data-direction={finalCta.href.startsWith("/") ? undefined : "out"}>{finalCta.href.startsWith("/") ? "→" : "↗"}</span></CtaLink>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

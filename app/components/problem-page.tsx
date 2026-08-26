/* eslint-disable @next/next/no-img-element -- Local editorial assets are optimized before being added to the vinext public directory. */
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { BookLeadCapture } from "./book-lead-capture";
import { ImageMask } from "./image-mask";
import { GlowCard, Reveal } from "./motion-kit";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { TextEffect } from "./text-effect";
import { problemHubCards, type ProblemPageConfig } from "../problem-page-data";
import type { PageLink } from "../site-data";

const showProofPreview = process.env.NODE_ENV !== "production";

function Actions({ primary, secondary, light = false }: { primary: { label: string; href: string }; secondary: { label: string; href: string }; light?: boolean }) {
  return (
    <div className="problem-actions">
      <Link className="button button-primary" href={primary.href}>{primary.label}<span aria-hidden="true">→</span></Link>
      <Link className={`button ${light ? "button-dark-outline" : "button-secondary"}`} href={secondary.href}>{secondary.label}<span aria-hidden="true">→</span></Link>
    </div>
  );
}

function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="problem-section-heading">
      <p className="problem-kicker">{eyebrow}</p>
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
  );
}

function RealLinkCard({ link }: { link: PageLink }) {
  return (
    <Link className="problem-link-card" href={link.href}>
      {link.label && <span className="problem-link-label">{link.label}</span>}
      <h3>{link.title}</h3>
      <p>{link.description}</p>
      <span className="problem-link-outcome">Explore this path <i aria-hidden="true">→</i></span>
    </Link>
  );
}

function ProblemBlockView({ block, index }: { block: ProblemPageConfig["blocks"][number]; index: number }) {
  let content: ReactNode;

  if (block.kind === "signals") {
    content = (
      <section className="problem-section problem-section-signals">
        <SectionHeading eyebrow={block.eyebrow} title={block.title} intro={block.intro} />
        <ol className="problem-signal-list">
          {block.items.map((item, itemIndex) => (
            <li key={item}><span>{String(itemIndex + 1).padStart(2, "0")}</span><p>{item}</p></li>
          ))}
        </ol>
      </section>
    );
  } else if (block.kind === "contrast") {
    content = (
      <section className="problem-section problem-section-contrast">
        <SectionHeading eyebrow={block.eyebrow} title={block.title} intro={block.intro} />
        <div className="problem-contrast-grid">
          {block.columns.map((column, columnIndex) => (
            <article className={columnIndex === 1 ? "contrast-after" : ""} key={column.label}>
              <span>{column.label}</span>
              <h3>{column.title}</h3>
              <ul>{column.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>
    );
  } else if (block.kind === "sequence") {
    content = (
      <section className="problem-section problem-section-sequence">
        <SectionHeading eyebrow={block.eyebrow} title={block.title} intro={block.intro} />
        <ol className="problem-sequence">
          {block.steps.map((step, stepIndex) => (
            <li key={step.label}>
              <span className="sequence-index">{String(stepIndex + 1).padStart(2, "0")}</span>
              <p className="sequence-label">{step.label}</p>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </section>
    );
  } else if (block.kind === "media-sequence") {
    content = (
      <section className="problem-section problem-section-media">
        <SectionHeading eyebrow={block.eyebrow} title={block.title} intro={block.intro} />
        <div className="problem-media-sequence" role="group" aria-label="Transformation progression">
          {block.items.map((item, itemIndex) => (
            <figure className={`problem-clipped-media problem-clipped-media-${itemIndex + 1}`} key={item.label} style={{ "--problem-image-position": item.position } as CSSProperties}>
              <img src={item.src} alt={item.alt} width={item.width} height={item.height} />
              <figcaption>
                <span>{item.label}</span>
                <strong>{item.title}</strong>
                <small>{item.caption}</small>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    );
  } else if (block.kind === "decision-board") {
    content = (
      <section className="problem-section problem-section-decision">
        <SectionHeading eyebrow={block.eyebrow} title={block.title} intro={block.intro} />
        <div className="portfolio-decision-board">
          {block.decisions.map((decision, decisionIndex) => (
            <article key={decision.action}>
              <span>{String(decisionIndex + 1).padStart(2, "0")}</span>
              <p>{decision.action}</p>
              <h3>{decision.question}</h3>
              <small>{decision.description}</small>
            </article>
          ))}
        </div>
      </section>
    );
  } else if (block.kind === "pillars") {
    content = (
      <section className="problem-section problem-section-pillars">
        <SectionHeading eyebrow={block.eyebrow} title={block.title} intro={block.intro} />
        <div className="problem-pillars">
          {block.pillars.map((pillar, pillarIndex) => (
            <article key={pillar.label}>
              <span>{String(pillarIndex + 1).padStart(2, "0")} · {pillar.label}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>
      </section>
    );
  } else if (block.kind === "statement") {
    content = (
      <section className="problem-section problem-section-statement">
        <SectionHeading eyebrow={block.eyebrow} title={block.title} />
        <div className="problem-statement-body">
          <p>{block.body}</p>
          <blockquote>{block.statement}</blockquote>
        </div>
      </section>
    );
  } else if (block.kind === "outcome") {
    content = (
      <section className="problem-section problem-section-outcome">
        <div className="problem-outcome-copy">
          <SectionHeading eyebrow={block.eyebrow} title={block.title} />
          <p>{block.body}</p>
          <ul>{block.markers.map((marker) => <li key={marker}>{marker}</li>)}</ul>
        </div>
        <figure style={{ "--problem-image-position": block.image.position } as CSSProperties}>
          <img src={block.image.src} alt={block.image.alt} width={block.image.width} height={block.image.height} />
          <figcaption>{block.image.caption}</figcaption>
        </figure>
      </section>
    );
  } else {
    content = (
      <section className="problem-section problem-section-links">
        <SectionHeading eyebrow={block.eyebrow} title={block.title} intro={block.intro} />
        <div className="problem-link-grid">
          {block.links.map((link) => block.spotlight
            ? <GlowCard key={link.href}><RealLinkCard link={link} /></GlowCard>
            : <RealLinkCard key={link.href} link={link} />)}
        </div>
      </section>
    );
  }

  return <Reveal className={`problem-block problem-block-${index + 1}`}>{content}</Reveal>;
}

function ProofPlaceholder({ config }: { config: ProblemPageConfig }) {
  return (
    <section className="problem-proof-placeholder" data-proof-status="placeholder" aria-labelledby={`${config.variant}-proof-title`}>
      <div className="proof-placeholder-warning">
        <strong>PLACEHOLDER TESTIMONIAL — NOT APPROVED FOR PUBLICATION</strong>
        <p>Representative layout and planning copy only. Replace with an approved quote, attribution, company permission, and proof record before launch.</p>
      </div>
      <div className="proof-placeholder-content">
        <p className="problem-kicker">The proof this page still needs</p>
        <h2 id={`${config.variant}-proof-title`}>Credibility must match the claim.</h2>
        <p className="proof-required">{config.proofNeeded}</p>
        <blockquote>“{config.testimonial.quote}”</blockquote>
        <p className="proof-attribution"><strong>{config.testimonial.name}</strong><span>{config.testimonial.role}</span><span>{config.testimonial.company}</span></p>
      </div>
    </section>
  );
}

export function ProblemPage({ config }: { config: ProblemPageConfig }) {
  const isDarkHero = config.variant !== "portfolio" && config.variant !== "function";

  return (
    <div className={`site-shell problem-site problem-site-${config.variant}`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="problem-hero">
          <div className="problem-hero-copy">
            <nav aria-label="Breadcrumb"><Link href="/problems-we-solve">Problems we solve</Link><span aria-hidden="true">/</span><span aria-current="page">{config.eyebrow}</span></nav>
            <p className="problem-kicker">{config.eyebrow}</p>
            {config.variant === "strategy"
              ? <TextEffect as="h1" className="problem-title">{config.title}</TextEffect>
              : <h1 className="problem-title">{config.title}</h1>}
            <p className="problem-hero-description">{config.description}</p>
            <Actions primary={config.primaryCta} secondary={config.secondaryCta} light={isDarkHero} />
          </div>
          <div className="problem-hero-media" style={{ "--problem-image-position": config.heroImage.position } as CSSProperties}>
            {config.variant === "strategy" || config.variant === "function" ? (
              <ImageMask
                src={config.heroImage.src}
                alt={config.heroImage.alt}
                width={config.heroImage.width}
                height={config.heroImage.height}
                variant={config.variant === "strategy" ? "panel" : "step"}
                priority
                caption={config.heroImage.caption}
              />
            ) : (
              <figure>
                <img src={config.heroImage.src} alt={config.heroImage.alt} width={config.heroImage.width} height={config.heroImage.height} fetchPriority="high" />
                <figcaption>{config.heroImage.caption}</figcaption>
              </figure>
            )}
          </div>
        </section>

        <section className="problem-diagnostic" aria-label="Condition at a glance">
          {config.diagnostic.map((item, index) => (
            <div key={item.label}><span>{String(index + 1).padStart(2, "0")}</span><p>{item.label}</p><strong>{item.value}</strong></div>
          ))}
        </section>

        <div className="problem-story">
          {config.blocks.map((block, index) => (
            <div key={`${block.kind}-${block.title}`}>
              <ProblemBlockView block={block} index={index} />
              {config.bookLead && config.bookAfterBlock === index && <BookLeadCapture config={config.bookLead} />}
            </div>
          ))}
        </div>

        {showProofPreview && <ProofPlaceholder config={config} />}

        <section className="problem-final-cta">
          <div>
            <p className="problem-kicker">The sensible next step</p>
            <h2>{config.primaryCta.label}.</h2>
          </div>
          <div>
            <p>{config.nextStep}</p>
            <Actions primary={config.primaryCta} secondary={config.secondaryCta} light />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export function ProblemHub() {
  return (
    <div className="site-shell problem-site problem-hub-site">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="problem-hub-hero">
          <div>
            <p className="problem-kicker">Problems we solve</p>
            <h1>Start with what is breaking.</h1>
            <p>Most buyers do not begin with a category. They begin with a strategy that is stalling, a team that is fragmenting, a transformation that is not sticking, a portfolio that cannot justify its work, or a function that cannot prove value.</p>
            <a className="text-link" href="#choose-the-condition">Choose the condition <span aria-hidden="true">↓</span></a>
          </div>
          <figure>
            <img src="/images/story/execution-friction.jpg" alt="Colleagues work through a difficult discussion around a shared table." width="1600" height="1067" fetchPriority="high" />
            <figcaption>Begin with the condition the buyer can already recognize.</figcaption>
          </figure>
        </section>

        <section className="problem-hub-chooser" id="choose-the-condition">
          <div className="problem-hub-heading">
            <p className="problem-kicker">Choose by recognizable condition</p>
            <h2>Which pattern looks most like your organization?</h2>
            <p>Choose the condition you recognize now. You can compare another path at any point.</p>
          </div>
          <div className="problem-hub-grid">
            {problemHubCards.map((card) => (
              <GlowCard key={card.href}>
                <Link className="problem-hub-card" href={card.href}>
                  <span className="problem-hub-number">{card.number}</span>
                  <p>{card.cue}</p>
                  <h3>{card.title}</h3>
                  <small>{card.description}</small>
                  <span className="problem-hub-outcome">Understand this problem <i aria-hidden="true">→</i></span>
                </Link>
              </GlowCard>
            ))}
          </div>
        </section>

        <section className="problem-hub-root">
          <div>
            <p className="problem-kicker">The shared root</p>
            <h2>Different symptoms. One missing system.</h2>
          </div>
          <div>
            <p>Across these conditions, teams often lack one shared way to establish priorities, make tradeoffs, hold decisions, own commitments, surface risk, and connect activity to outcomes.</p>
            <p>120VC diagnoses the condition before recommending a scope. The objective is not to force every buyer into the same program. It is to identify which part of the execution system must change.</p>
          </div>
        </section>

        <section className="problem-hub-next">
          <div>
            <p className="problem-kicker">Not sure which condition is primary?</p>
            <h2>Use the diagnostic framework before choosing a solution.</h2>
          </div>
          <div className="problem-hub-next-actions">
            <Link className="button button-primary" href="/resources/assessments/execution-health-diagnostic">Explore the Execution Health Framework <span aria-hidden="true">→</span></Link>
            <Link className="button button-dark-outline" href="/leadership-system">See the shared system <span aria-hidden="true">→</span></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

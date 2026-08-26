/* eslint-disable @next/next/no-img-element -- Approved brand and source-site assets are served from their verified origin. */
import type { Metadata } from "next";
import Link from "next/link";
import { ExecutionPath } from "./components/execution-path";
import { ImageMask } from "./components/image-mask";
import { Reveal } from "./components/motion-kit";
import { RippleLink } from "./components/ripple-link";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { TextEffect } from "./components/text-effect";

export const metadata: Metadata = {
  title: "Close the Strategy Execution Gap",
  description: "120VC installs a shared Execution Leadership System inside live enterprise work so priorities align, decisions hold, and critical initiatives execute more predictably.",
  alternates: { canonical: "/" },
};

const authorityLogos = [
  ["Sony", "https://www.120vc.com/wp-content/uploads/2026/06/sony-logo.webp"],
  ["DIRECTV", "https://4248494.fs1.hubspotusercontent-na1.net/hubfs/4248494/CLIENT-LOGOS_0009_directv.png"],
  ["Activision", "https://www.120vc.com/wp-content/uploads/2026/06/activision-logo.webp"],
  ["Blizzard Entertainment", "https://www.120vc.com/wp-content/uploads/2026/06/blizzard-logo.webp"],
  ["Trader Joe’s", "https://4248494.fs1.hubspotusercontent-na1.net/hubfs/4248494/CLIENT-LOGOS_0004_trader-joes.png"],
  ["ResMed", "https://www.120vc.com/wp-content/uploads/2026/06/resmed-logo.webp"],
  ["Sysco", "https://investors.sysco.com/~/media/Images/S/Sysco-IR/logo/logo.png"],
] as const;

const executionSignals = [
  ["Priorities keep changing.", "Important work loses to whatever became urgent today."],
  ["Decisions reopen.", "The meeting ends, but the decision does not hold."],
  ["Dependencies appear too late.", "Cross-functional issues surface after delivery is already at risk."],
  ["Leaders keep rescuing the work.", "A few executives become the operating system for everyone else."],
] as const;

const systemSteps = [
  ["01", "Diagnose", "Identify where execution is breaking, what it is costing, and who must participate."],
  ["02", "Install", "Apply one shared system to live priorities, decisions, commitments, and initiatives."],
  ["03", "Compound", "Transfer ownership so the team can operate and extend the system without depending on 120VC."],
] as const;

const tools = [
  ["2×2 Prioritization Matrix", "Decide what deserves focus—and what should wait, change, or stop.", "/resources/tools/2x2-prioritization-matrix"],
  ["1-3-1 Decision Builder", "Define one problem. Evaluate three viable solutions. Make one recommendation.", "/resources/tools/1-3-1-decision-builder"],
  ["Daily Focusing Exercise", "End the day with clarity. Start tomorrow intentionally.", "/resources/tools/daily-focusing-exercise"],
] as const;

const solutions = [
  {
    eyebrow: "The executive team",
    title: "Leadership Team Transformation",
    description: "Help senior leaders prioritize, decide, and execute as one team.",
    cta: "Explore Leadership Team Transformation",
    href: "/transformation-leadership-team-development-coaching-and-program",
    visual: "align",
  },
  {
    eyebrow: "The high-stakes initiative",
    title: "Executive Leadership Performance Accelerator",
    description: "Install the full system around live priorities and execution.",
    cta: "Explore ELPA",
    href: "/executive-leadership-coaching-and-development-performance-accelerator",
    visual: "focus",
  },
  {
    eyebrow: "The internal function",
    title: "Enterprise Transformation",
    description: "Move HR, IT, Finance, or PMO from reactive activity to measurable value.",
    cta: "Explore Enterprise Transformation",
    href: "/enterprise-digital-transformation",
    visual: "change",
  },
  {
    eyebrow: "The project portfolio",
    title: "ROI-Driven Project Portfolio Services",
    description: "Decide which work should be funded, stopped, reshaped, or accelerated.",
    cta: "Explore Portfolio Services",
    href: "/roi-driven-project-portfolio-services",
    visual: "portfolio",
  },
] as const;

const evidenceFields = [
  ["Context", "What condition existed, who owned it, and what was at stake."],
  ["Intervention", "What 120VC installed and where it entered the live work."],
  ["Operating shift", "What changed first in priorities, decisions, ownership, or rhythm."],
  ["Outcome", "What changed, over what period, from which baseline, and with whose attribution."],
] as const;

function SolutionVisual({ type }: { type: string }) {
  return (
    <span className={`solution-visual solution-visual-${type}`} aria-hidden="true">
      <i /><i /><i /><i />
    </span>
  );
}

export default function Home() {
  return (
    <div className="site-shell home-master">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />

      <main id="main-content" tabIndex={-1}>
        <section className="master-hero" aria-labelledby="home-title">
          <div className="master-hero-copy">
            <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true" />Execution Leadership for complex enterprises</p>
            <TextEffect as="h1" id="home-title" delay={0.08}>Close the gap between strategy and execution.</TextEffect>
            <p className="master-hero-lede">120VC installs a shared Execution Leadership System inside live work so leadership teams align priorities, make decisions that hold, and deliver critical initiatives more predictably.</p>
            <div className="master-hero-actions">
              <RippleLink className="button button-primary" href="#how-it-works">See How It Works <span aria-hidden="true">↓</span></RippleLink>
              <RippleLink className="button button-secondary" href="/consultation">Book a Consultation <span aria-hidden="true">→</span></RippleLink>
            </div>
            <p className="master-hero-reassurance">A confidential readiness and fit conversation.</p>
          </div>

          <div className="master-hero-visual">
            <ImageMask
              className="master-hero-image"
              src="/images/story/team-working-together.jpg"
              alt="A leadership team working through priorities together in a shared workspace"
              width={1800}
              height={1008}
              variant="step"
              priority
            />
            <ExecutionPath />
          </div>
        </section>

        <section className="authority-section" aria-labelledby="authority-title">
          <div className="authority-heading">
            <p className="section-kicker">Enterprise experience</p>
            <h2 id="authority-title">120VC has helped leaders and teams at:</h2>
          </div>
          <ul className="authority-logo-grid" aria-label="Organizations where 120VC has helped leaders and teams">
            {authorityLogos.map(([name, src]) => (
              <li key={name}>
                <img src={src} alt={name} width="164" height="58" loading="lazy" />
              </li>
            ))}
          </ul>
          <div className="authority-context">
            <p><strong>Enterprise experience across complex global organizations.</strong> The public launch still requires relationship, logo-permission, and proof-governance confirmation for every named organization.</p>
            <Link className="text-link" href="/results/methodology">See How Results Are Measured <span aria-hidden="true">→</span></Link>
          </div>
        </section>

        <section className="diagnostic-section" aria-labelledby="diagnostic-title">
          <Reveal className="diagnostic-heading">
            <p className="section-kicker">The condition</p>
            <h2 id="diagnostic-title">Your strategy may be clear. Execution still fragments.</h2>
            <p>The Strategy Execution Gap is the distance between what leadership intends and what the organization actually delivers.</p>
          </Reveal>

          <div className="diagnostic-grid">
            <Reveal delay={80}>
              <ul className="signal-list">
                {executionSignals.map(([title, copy], index) => (
                  <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><p><strong>{title}</strong>{copy}</p></li>
                ))}
              </ul>
              <Link className="text-link" href="/problems-we-solve/strategy-execution-gap">Understand the Strategy Execution Gap <span aria-hidden="true">→</span></Link>
            </Reveal>

            <Reveal className="diagnostic-scene-reveal" delay={140}>
              <ImageMask
                className="diagnostic-scene"
                src="/images/story/execution-friction.jpg"
                alt="A leadership team in a tense meeting while one leader appears overwhelmed"
                width={1600}
                height={1066}
                variant="panel"
                caption={<><strong>The visible symptom:</strong> capable leaders spend their time resolving collisions instead of moving outcomes.</>}
              />
            </Reveal>
          </div>
        </section>

        <section className="system-section" id="how-it-works" aria-labelledby="system-title">
          <Reveal className="system-heading">
            <p className="eyebrow eyebrow-light"><span className="eyebrow-mark" aria-hidden="true" />The 120VC approach</p>
            <h2 id="system-title">Installed in the work. Built to hold without us.</h2>
            <p>Not software. Not another workshop. The way leadership operates.</p>
          </Reveal>

          <ol className="system-step-grid">
            {systemSteps.map(([number, title, copy], index) => (
              <li key={title}>
                <Reveal delay={index * 90}>
                  <span className="system-step-number">{number}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </Reveal>
              </li>
            ))}
          </ol>

          <div className="system-lower">
            <Reveal className="tool-proof" delay={120}>
              <p className="section-kicker">Preview the system in practice.</p>
              <div className="tool-link-row">
                {tools.map(([name, copy, href]) => (
                  <Link href={href} className="tool-link" key={name}>
                    <strong>{name}</strong><span>{copy}</span><i aria-hidden="true">→</i>
                  </Link>
                ))}
              </div>
              <Link className="text-link text-link-light" href="/resources/tools">Explore All Tool Frameworks <span aria-hidden="true">→</span></Link>
            </Reveal>
            <Reveal className="system-cta" delay={180}>
              <p>See the operating practices, installation path, and leadership conditions that make the system transferable.</p>
              <RippleLink className="button button-light" href="/leadership-system">Explore the Execution Leadership System <span aria-hidden="true">→</span></RippleLink>
            </Reveal>
          </div>
        </section>

        <section className="solution-section" aria-labelledby="solution-title">
          <Reveal className="solution-heading">
            <p className="section-kicker">Find the right starting point</p>
            <h2 id="solution-title">Where is execution breaking?</h2>
            <p>One shared system. Four installation scopes based on the leadership unit, live work, and outcome at risk.</p>
          </Reveal>

          <div className="solution-grid">
            {solutions.map((solution, index) => (
              <Reveal key={solution.title} delay={index * 70}>
                <Link className="solution-card" href={solution.href}>
                  <SolutionVisual type={solution.visual} />
                  <span className="solution-eyebrow">{solution.eyebrow}</span>
                  <h3>{solution.title}</h3>
                  <p>{solution.description}</p>
                  <strong>{solution.cta} <i aria-hidden="true">→</i></strong>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="solution-router" delay={180}>
            <div><span>Not sure which condition applies?</span><p>You do not need to diagnose the offer before speaking with us.</p></div>
            <RippleLink className="button button-secondary" href="/consultation">Book a Leadership System Consultation <span aria-hidden="true">→</span></RippleLink>
          </Reveal>
        </section>

        <section className="evidence-section" aria-labelledby="evidence-title">
          <div className="evidence-main">
            <Reveal>
              <p className="eyebrow eyebrow-light"><span className="eyebrow-mark" aria-hidden="true" />The evidence standard</p>
              <h2 id="evidence-title">Evidence should survive scrutiny.</h2>
              <p className="evidence-lede">120VC proof is evaluated in context—not as an unsupported percentage or a logo wall that implies more than it proves.</p>
            </Reveal>
            <div className="evidence-grid">
              {evidenceFields.map(([title, copy], index) => (
                <Reveal key={title} delay={index * 70}>
                  <article><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></article>
                </Reveal>
              ))}
            </div>
            <Reveal className="evidence-governance" delay={180}>
              <p>Client-specific metrics, case stories, and testimonials remain unpublished until their source, timeframe, attribution, and permissions are approved.</p>
              <Link className="text-link text-link-light" href="/results/methodology">See How Results Are Measured <span aria-hidden="true">→</span></Link>
            </Reveal>
          </div>

          <aside className="evidence-aside" aria-label="120VC authority">
            <Reveal className="founder-proof" delay={120}>
              <ImageMask
                src="https://www.120vc.com/wp-content/uploads/2026/02/person-img-with-orange-back.webp"
                alt="J. Scott, founder and CEO of 120VC"
                width={600}
                height={596}
                variant="portrait"
              />
              <div>
                <p className="section-kicker">Founder authority—not client proof</p>
                <h3>Execution Leadership had to become a system.</h3>
                <p>Meet J. Scott and the enterprise experience that shaped the category, the system, and The 120 Standard.</p>
                <Link className="text-link text-link-light" href="/founder-jason-scott">Meet J. Scott <span aria-hidden="true">→</span></Link>
              </div>
            </Reveal>

            <Reveal delay={190}>
              <a className="book-proof" href="https://www.120vc.com/book-download-the-strategy-execution-gap/">
                <img
                  src="/images/story/strategy-execution-gap-book.jpg"
                  alt="The Strategy Execution Gap by J. Scott"
                  width="900"
                  height="900"
                  loading="lazy"
                />
                <span>
                  <small>Go deeper on the problem</small>
                  <strong>Read The Strategy Execution Gap</strong>
                  <i>Download the book <b aria-hidden="true">↗</b></i>
                </span>
              </a>
            </Reveal>
          </aside>
        </section>

        <section className="closing-section" aria-labelledby="closing-title">
          <Reveal className="closing-copy">
            <p className="section-kicker">The next useful decision</p>
            <h2 id="closing-title">Where is execution breaking in your organization?</h2>
            <p>Bring one real business condition. We will help identify what is underneath it, whether 120VC is relevant, and what should happen next.</p>
            <div className="closing-actions">
              <RippleLink className="button button-primary" href="/consultation">Book a Leadership System Consultation <span aria-hidden="true">→</span></RippleLink>
              <a className="button button-secondary" href="https://www.120vc.com/book-download-the-strategy-execution-gap/">Download The Strategy Execution Gap <span aria-hidden="true">↗</span></a>
            </div>
            <small>Confidential · Diagnostic · No scripted demo · No predetermined offer</small>
          </Reveal>
          <Reveal className="closing-outcome-reveal" delay={100}>
            <figure className="closing-outcome">
              <img
                src="/images/story/aligned-leadership-team.jpg"
                alt="A senior leadership team smiling together while reviewing work"
                width="1600"
                height="1066"
                loading="lazy"
              />
              <figcaption><strong>The outcome:</strong> leaders who can align, decide, and move the work together.</figcaption>
            </figure>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

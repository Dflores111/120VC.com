/* eslint-disable @next/next/no-img-element -- 120VC CMS images are served directly in the vinext deployment. */
import type { Metadata } from "next";
import Link from "next/link";
import { RippleLink } from "./components/ripple-link";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";

export const metadata: Metadata = {
  title: "Execution Leadership for Enterprise Teams",
  description: "Clear priorities, decisions that hold, and teams that deliver. 120VC installs Execution Leadership inside live enterprise work.",
  alternates: { canonical: "/" },
};

const proofLogos = [
  ["Amgen", "https://www.120vc.com/wp-content/uploads/2026/06/amgen-logo.webp"],
  ["AT&T", "https://www.120vc.com/wp-content/uploads/2026/06/att-logo.webp"],
  ["Blizzard Entertainment", "https://www.120vc.com/wp-content/uploads/2026/06/blizzard-logo.webp"],
  ["CA Technologies", "https://www.120vc.com/wp-content/uploads/2026/06/ca-tech-logo.webp"],
  ["Cisco", "https://www.120vc.com/wp-content/uploads/2026/06/cisco-logo.webp"],
  ["Comcast", "https://www.120vc.com/wp-content/uploads/2026/06/comcast-logo.webp"],
  ["Disney", "https://www.120vc.com/wp-content/uploads/2026/06/dizni-logo.webp"],
  ["Epic Games", "https://www.120vc.com/wp-content/uploads/2026/06/epic-games-logo.webp"],
  ["Hoag", "https://www.120vc.com/wp-content/uploads/2026/06/hoag-logo.webp"],
  ["Mattel", "https://www.120vc.com/wp-content/uploads/2026/06/mattel-logo.webp"],
] as const;

const proofStats = [
  ["98%", "Transformation and project success rate"],
  ["227%", "Performance improvement vs. industry averages"],
  ["25+ years", "Across global enterprise transformation"],
] as const;

const buyerOutcomes = [
  ["Clear priorities", "Leaders know what matters now, what waits, and what will not be funded."],
  ["Decisions that hold", "Authority, tradeoffs, and next moves stay clear after the meeting ends."],
  ["Reliable commitments", "Ownership is visible, risk surfaces earlier, and fewer problems require executive rescue."],
] as const;

const installationSteps = [
  ["01", "Diagnose", "Find the condition breaking execution and the outcome it puts at risk."],
  ["02", "Install", "Apply the leadership system to live priorities, decisions, and commitments."],
  ["03", "Transfer", "Build the operating rhythm and capability the organization can keep."],
] as const;

const startingPaths = [
  {
    label: "Executive performance",
    title: "Move a critical priority through the team.",
    copy: "For an accountable executive and direct-report team who need coordinated delivery around live work.",
    href: "/executive-leadership-coaching-and-development-performance-accelerator",
  },
  {
    label: "Leadership team execution",
    title: "Turn agreement into coordinated action.",
    copy: "For strong executives whose shared decisions fragment as work moves across functions.",
    href: "/transformation-leadership-team-development-coaching-and-program",
  },
  {
    label: "Transformation and portfolio",
    title: "Make change and investment deliver return.",
    copy: "For leaders who need adoption, ownership, and clearer value from enterprise change or project investment.",
    href: "/leadership-services",
  },
] as const;

export default function Home() {
  return (
    <div className="site-shell home-v3">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />

      <main id="main-content">
        <section className="value-hero" aria-labelledby="home-title">
          <div className="value-hero-copy">
            <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true" />Execution Leadership for enterprise teams</p>
            <h1 id="home-title">Make strategy <em>deliver.</em></h1>
            <p className="value-hero-lede">Clear priorities. Decisions that hold. Teams that deliver without constant escalation. 120VC installs the leadership system inside live work so execution becomes more predictable.</p>
            <div className="value-hero-actions">
              <RippleLink className="button button-primary" href="/contact">Book a consultation <span aria-hidden="true">↗</span></RippleLink>
              <RippleLink className="button button-secondary" href="#proof">See published results <span aria-hidden="true">↓</span></RippleLink>
            </div>
          </div>

          <figure className="value-hero-media">
            <img
              src="https://www.120vc.com/wp-content/uploads/2026/02/A-man-and-woman-stand-by-a-glass-wall-focused-on-a-tablet-they-are-holding-together-1024x644.webp"
              alt="Two enterprise leaders reviewing work together"
              width="1024"
              height="644"
              fetchPriority="high"
            />
          </figure>
        </section>

        <section className="proof-v3-section" id="proof" aria-labelledby="proof-title">
          <div className="proof-v3-heading">
            <div>
              <p className="section-index">120VC-published results</p>
              <h2 id="proof-title">Proof before process.</h2>
            </div>
            <p>We report performance across decades of enterprise work. Here is what we publish—and how to evaluate it responsibly.</p>
          </div>

          <div className="proof-logo-field" aria-label="Organizations shown in 120VC's published enterprise experience">
            <p>Enterprise experience published by 120VC</p>
            <div className="proof-logo-grid">
              {proofLogos.map(([name, src]) => (
                <div className="proof-logo" key={name}>
                  <img src={src} alt={name} width="180" height="80" loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          <div className="proof-stat-grid" aria-describedby="proof-method-note">
            {proofStats.map(([value, label]) => (
              <div className="proof-stat" key={value}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="proof-v3-note" id="proof-method-note">
            <p>These are first-party figures published by 120VC. Ask for the population, baseline, timeframe, and calculation method during evaluation.</p>
            <Link className="text-link" href="/case-studies">See the evidence standard <span aria-hidden="true">↗</span></Link>
          </div>
        </section>

        <section className="outcomes-v3-section" aria-labelledby="outcomes-title">
          <div className="outcomes-v3-heading">
            <p className="section-index">What you get</p>
            <h2 id="outcomes-title">Lead the work with less friction.</h2>
            <p>The value is not another framework to remember. It is a clearer way for leaders and teams to move important work under pressure.</p>
          </div>
          <div className="outcome-v3-grid">
            {buyerOutcomes.map(([title, copy], index) => (
              <article className="outcome-v3-item" key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <p className="outcome-v3-payoff">More predictable execution—without depending on constant executive heroics.</p>
        </section>

        <section className="founder-v3-section" aria-labelledby="founder-title">
          <figure className="founder-v3-media">
            <img
              src="https://www.120vc.com/wp-content/uploads/2026/02/Jason-Scott-120VC-CEO-Founder-img.webp"
              alt="J. Scott, founder and CEO of 120VC"
              width="532"
              height="530"
              loading="lazy"
            />
            <figcaption><strong>J. Scott</strong><span>Founder and CEO, 120VC</span></figcaption>
          </figure>
          <div className="founder-v3-copy">
            <p className="section-index">The person behind the system</p>
            <h2 id="founder-title">Built in enterprise work—not a workshop.</h2>
            <p>J. Scott is the creator of the Execution Leadership System and architect of the Executive Leadership Performance Accelerator. For more than 25 years, he has led transformations inside complex, high-pressure organizations.</p>
            <p className="founder-v3-experience"><span>Experience includes</span> AT&amp;T, Blizzard Entertainment, Sony Pictures, Trader Joe&apos;s, First American Financial, and ResMed.</p>
            <Link className="founder-v3-link" href="/founder-jason-scott">Meet J. Scott <span aria-hidden="true">↗</span></Link>
          </div>
        </section>

        <section className="how-v3-section" aria-labelledby="how-title">
          <div className="how-v3-heading">
            <p className="eyebrow eyebrow-light"><span className="eyebrow-mark" aria-hidden="true" />How the work moves</p>
            <h2 id="how-title">Diagnose. Install. Transfer.</h2>
            <p>Start with the three moves that turn a leadership problem into capability the organization can keep. The deeper practices are available when you need them.</p>
            <RippleLink className="button button-dark-outline" href="/leadership-system">See the full system <span aria-hidden="true">↗</span></RippleLink>
          </div>
          <ol className="how-v3-steps">
            {installationSteps.map(([number, title, copy]) => (
              <li key={number}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{copy}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className="paths-v3-section" aria-labelledby="paths-title">
          <div className="paths-v3-heading">
            <p className="section-index">Choose a starting point</p>
            <h2 id="paths-title">Start with the result at risk.</h2>
            <p>The right entry point depends on where execution is breaking. Each path opens the detail only when you want it.</p>
          </div>
          <div className="paths-v3-grid">
            {startingPaths.map((path) => (
              <Link className="path-v3-card" href={path.href} key={path.href}>
                <span>{path.label}</span>
                <h3>{path.title}</h3>
                <p>{path.copy}</p>
                <strong>Explore this path <i aria-hidden="true">↗</i></strong>
              </Link>
            ))}
          </div>
          <div className="paths-v3-more">
            <Link className="text-link" href="/leadership-services">Compare every service <span aria-hidden="true">↗</span></Link>
            <Link className="text-link" href="/faq">Read common buyer questions <span aria-hidden="true">↗</span></Link>
          </div>
        </section>

        <section className="decision-v3-section">
          <div className="decision-v3-primary">
            <p className="section-index">A useful first conversation</p>
            <h2>Bring the result at risk.</h2>
            <p>We will clarify what is breaking, what it is costing, and whether 120VC is the right fit. No generic presentation and no premature scope.</p>
            <RippleLink className="button button-light" href="/contact">Book a consultation <span aria-hidden="true">↗</span></RippleLink>
            <small>Confidential · Diagnostic · Built for a longer buying cycle</small>
          </div>
          <div className="decision-v3-resource">
            <p className="section-index">Still building the case?</p>
            <h3>Take the case into the room.</h3>
            <p>Use the free book to help stakeholders recognize why clear strategy still breaks down in execution.</p>
            <a className="resource-v3-link" href="https://www.120vc.com/book-download-the-strategy-execution-gap/">Download the free book <span aria-hidden="true">↗</span></a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

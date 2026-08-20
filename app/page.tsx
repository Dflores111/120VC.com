/* eslint-disable @next/next/no-img-element -- 120VC CMS images are served directly in the vinext deployment. */
import type { Metadata } from "next";
import Link from "next/link";
import { GlowCard, Reveal } from "./components/motion-kit";
import { RippleLink } from "./components/ripple-link";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";

export const metadata: Metadata = {
  title: "Execution Leadership for Enterprise Teams",
  description: "Make strategy deliver with a leadership system installed inside live enterprise work.",
  alternates: { canonical: "/" },
};

const executionSignals = [
  {
    number: "01",
    title: "Priorities keep competing",
    copy: "New work enters. Old work stays. Teams cannot tell which commitment should win.",
    href: "/problems-we-solve/strategy-execution-gap",
  },
  {
    number: "02",
    title: "Decisions keep reopening",
    copy: "The meeting ends with agreement. Functions leave with different interpretations and ownership blurs.",
    href: "/problems-we-solve/leadership-team-alignment",
  },
  {
    number: "03",
    title: "Change stays separate",
    copy: "Transformation activity continues, but normal leadership behavior and daily work do not change.",
    href: "/problems-we-solve/transformation-execution",
  },
];

const systemMoves = [
  ["01", "Name the outcome", "Make the business condition and result unmistakable."],
  ["02", "Set the priority", "Choose what matters now—and what must wait."],
  ["03", "Hold the decision", "Clarify authority, commitments, and the next move."],
  ["04", "Lead the delivery", "Surface reality early and adjust without losing the outcome."],
];

const startingPoints = [
  {
    label: "Executive performance",
    title: "One leader must move the system.",
    copy: "Use when an accountable executive and direct-report team need to turn live priorities into coordinated delivery.",
    href: "/executive-leadership-coaching-and-development-performance-accelerator",
  },
  {
    label: "Leadership team execution",
    title: "The team must operate as one.",
    copy: "Use when strong executives agree in the room but fragment across functions after the decision.",
    href: "/transformation-leadership-team-development-coaching-and-program",
  },
  {
    label: "Enterprise transformation",
    title: "Change must become normal work.",
    copy: "Use when a transformation or internal function needs adoption, executive ownership, and measurable operating change.",
    href: "/enterprise-digital-transformation",
  },
  {
    label: "Portfolio performance",
    title: "Investment choices must stay visible.",
    copy: "Use when leaders need to fund, stop, reshape, or accelerate projects as business investments.",
    href: "/roi-driven-project-portfolio-services",
  },
];

const evidenceSignals = [
  ["Priority clarity", "Leaders can name what matters now, what waits, and why."],
  ["Decision movement", "Important decisions have an owner, a path, and a visible next action."],
  ["Commitment discipline", "Promises, changes, and misses surface while leaders can still act."],
  ["Leadership transfer", "The practices become usable by the organization—not trapped in a deck."],
];

const leaderPaths = [
  ["COO", "/for-the-chief-operating-officer"],
  ["CFO", "/for-the-chief-financial-officer"],
  ["CIO / CTO", "/for-the-chief-technology-and-chief-information-officer"],
  ["Transformation leader", "/for-the-chief-transformation-officer"],
  ["Division president / VP", "/for-the-vp-and-division-presidents"],
];

const questions = [
  ["What makes 120VC different?", "We do not stop at recommendations. We install leadership practices inside live work, alongside the people responsible for delivery, so teams use them while priorities are moving."],
  ["Where do we begin?", "We begin with the priority, portfolio, or leadership condition creating the most execution risk. First we make the breakdown visible. Then we determine the right starting point."],
  ["Will you replace our current system?", "No. We work through your existing leaders, teams, tools, and delivery environment. The focus is how work is led: priorities, decisions, commitments, and visible accountability."],
  ["How disruptive is the work?", "The practices are installed inside active work, not in a separate transformation program. Participation focuses on the leaders and teams whose decisions shape delivery."],
  ["How will we measure progress?", "We agree on observable execution signals, then inspect them in the work. Final business outcomes are measured on the timeframe appropriate to the result."],
];

export default function Home() {
  return (
    <div className="site-shell home-v2">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />

      <main id="main-content">
        <section className="hero-v2" aria-labelledby="home-title">
          <div className="hero-v2-copy">
            <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true" />Execution leadership, installed in live work</p>
            <h1 id="home-title">Make strategy <em>deliver.</em></h1>
            <p className="hero-v2-lede">120VC installs the leadership system behind clear priorities, decisions that hold, accountable commitments, and more predictable enterprise execution.</p>
            <div className="hero-v2-actions">
              <RippleLink className="button button-primary" href="#system">See how it works <span aria-hidden="true">↓</span></RippleLink>
              <RippleLink className="button button-secondary" href="/contact">Book a consultation <span aria-hidden="true">↗</span></RippleLink>
            </div>
            <div className="hero-v2-context" aria-label="Engagement context">
              <p><span>Built for</span>Leaders accountable for the outcome</p>
              <p><span>First step</span>Diagnose the condition before prescribing a scope</p>
            </div>
          </div>

          <div className="hero-v2-media">
            <img
              src="https://www.120vc.com/wp-content/uploads/2026/02/A-man-and-woman-stand-by-a-glass-wall-focused-on-a-tablet-they-are-holding-together-1024x644.webp"
              alt="Two colleagues reviewing work together on a tablet"
              width="1024"
              height="644"
              fetchPriority="high"
            />
          </div>
        </section>

        <section className="confidence-strip" aria-label="How 120VC works">
          <p>From decision to coordinated action</p>
          <div><span>Name the priority</span><span>Clarify the decision</span><span>Own the commitment</span><span>Lead the outcome</span></div>
        </section>

        <Reveal>
          <section className="section-v2 recognition-section" id="problems">
            <div className="section-v2-heading">
              <p className="section-index">Recognize the condition</p>
              <h2>Your strategy isn’t the problem.</h2>
              <p>Execution breaks after the decision—when pressure reshuffles priorities, authority gets fuzzy, and every function translates the work alone.</p>
            </div>
            <div className="signal-grid">
              {executionSignals.map((signal) => (
                <Link href={signal.href} className="signal-card-v2" key={signal.number}>
                  <span>{signal.number}</span>
                  <h3>{signal.title}</h3>
                  <p>{signal.copy}</p>
                  <i aria-hidden="true">↗</i>
                </Link>
              ))}
              <Link className="signal-all" href="/problems-we-solve"><span>See all five conditions</span><i aria-hidden="true">→</i></Link>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="human-story-section">
            <div className="human-story-image">
              <img
                src="https://www.120vc.com/wp-content/uploads/2026/02/group-of-people-seated-around-a-table.webp"
                alt="Leaders working through a decision around a table"
                width="1200"
                height="800"
                loading="lazy"
              />
              <span>Real work. Real pressure. Real people.</span>
            </div>
            <div className="human-story-copy">
              <p className="section-index">Where execution breaks</p>
              <h2>The meeting ended. The work fragmented.</h2>
              <p>A clear decision at the top is not yet coordinated execution. Leaders need a shared way to protect priorities, resolve tradeoffs, own commitments, and surface reality early.</p>
              <p className="human-story-principle">The issue is not whether people care. It is whether the leadership system can carry the work when pressure rises.</p>
            </div>
          </section>
        </Reveal>

        <section className="system-v2-section" id="system">
          <div className="system-v2-intro">
            <p className="eyebrow eyebrow-light"><span className="eyebrow-mark" aria-hidden="true" />The 120VC mechanism</p>
            <h2>Install the system behind delivery.</h2>
            <p>120VC works with the accountable executive and relevant leaders while the system is applied to current priorities, meetings, decisions, dependencies, and outcomes.</p>
            <RippleLink className="button button-dark-outline" href="/leadership-system">Explore the leadership system <span aria-hidden="true">↗</span></RippleLink>
          </div>
          <ol className="system-track" aria-label="Execution Leadership System sequence">
            {systemMoves.map(([number, title, copy]) => (
              <li className="system-move" key={number}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{copy}</p></div>
                <i aria-hidden="true" />
              </li>
            ))}
          </ol>
          <div className="system-pulse" aria-hidden="true"><i /><span>Live work</span></div>
        </section>

        <Reveal>
          <section className="starting-section" id="solutions">
            <div className="section-v2-heading starting-heading">
              <p className="section-index">Choose a starting point</p>
              <h2>Start where execution is breaking.</h2>
              <p>Choose by the business condition—not by a consulting category. The consultation confirms fit before a scope is recommended.</p>
            </div>
            <div className="starting-grid">
              {startingPoints.map((point, index) => (
                <GlowCard key={point.href} className={index === 0 ? "starting-feature" : ""}>
                  <Link className="starting-card" href={point.href}>
                    <div><span>{point.label}</span><i aria-hidden="true">↗</i></div>
                    <h3>{point.title}</h3>
                    <p className="starting-copy">{point.copy}</p>
                  </Link>
                </GlowCard>
              ))}
            </div>
            <Link className="text-link" href="/leadership-services">Compare all starting points <span aria-hidden="true">↗</span></Link>
          </section>
        </Reveal>

        <Reveal>
          <section className="process-v2-section" id="how">
            <div className="process-v2-image">
              <img
                src="https://www.120vc.com/wp-content/uploads/2026/06/two-woman-smile.webp"
                alt="Two 120VC professionals together in an office"
                width="1200"
                height="900"
                loading="lazy"
              />
              <div><span>Capability stays with the organization.</span></div>
            </div>
            <div className="process-v2-copy">
              <p className="section-index">How the work moves</p>
              <h2>Diagnose. Install. Compound.</h2>
              <ol>
                <li><span>01</span><div><h3>Diagnose the condition</h3><p>Clarify what is at risk, why it persists, who has authority, and whether the organization is ready.</p></div></li>
                <li><span>02</span><div><h3>Install in live work</h3><p>Change how current priorities, decisions, commitments, meetings, and dependencies operate.</p></div></li>
                <li><span>03</span><div><h3>Transfer the capability</h3><p>Build the rhythm and ownership required for the system to hold without constant outside dependence.</p></div></li>
              </ol>
            </div>
          </section>
        </Reveal>

        <section className="evidence-v2-section" id="results">
          <div className="evidence-v2-heading">
            <p className="section-index">The evidence standard</p>
            <h2>Evidence leaders can inspect.</h2>
            <p>We do not define progress by workshops completed. We look for observable changes in how priorities, decisions, commitments, and accountability move through live work.</p>
            <div className="evidence-actions">
              <RippleLink className="button button-secondary" href="/case-studies">See the evidence standard <span aria-hidden="true">↗</span></RippleLink>
              <Link className="text-link" href="/problems-we-solve/strategy-execution-gap">Understand the Strategy Execution Gap <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          <div className="evidence-grid">
            {evidenceSignals.map(([title, copy]) => (
              <div key={title}><span>Observable shift</span><h3>{title}</h3><p>{copy}</p></div>
            ))}
          </div>
          <p className="evidence-standard">The standard is simple: progress must be visible in the work.</p>
        </section>

        <Reveal>
          <section className="leader-paths-section" id="who-we-help">
            <div className="leader-paths-copy">
              <p className="section-index">Start with the stakes you own</p>
              <h2>A clear case for every leader.</h2>
              <p>Execution pressure looks different from each seat. Choose the path that matches the outcome you own and the evidence you need.</p>
            </div>
            <nav className="leader-paths" aria-label="Leadership role paths">
              {leaderPaths.map(([label, href]) => <Link href={href} key={href}><strong>{label}</strong><i aria-hidden="true">↗</i></Link>)}
            </nav>
          </section>
        </Reveal>

        <section className="people-v2-section">
          <div className="people-v2-media">
            <img
              src="https://www.120vc.com/wp-content/uploads/2026/02/we-are-the-team-photo-img.webp"
              alt="The 120VC team together"
              width="1400"
              height="950"
              loading="lazy"
            />
            <div className="people-v2-wordmark">We are The 120.</div>
          </div>
          <div className="people-v2-copy">
            <p className="eyebrow eyebrow-light"><span className="eyebrow-mark" aria-hidden="true" />The people behind the system</p>
            <h2>People install the system.</h2>
            <p>The 120 is our operating standard: intentionality, discipline, trust, transparency, and accountability. It shapes how we work beside leaders when the stakes are real.</p>
            <Link className="founder-link" href="/founder-jason-scott"><span>Founder perspective</span><strong>Meet J. Scott</strong><i aria-hidden="true">↗</i></Link>
            <ul aria-label="The 120 operating values">
              <li>Intentionality</li><li>Discipline</li><li>Trust</li><li>Transparency</li><li>Accountability</li>
            </ul>
            <RippleLink className="button button-dark-outline" href="/about">Meet 120VC <span aria-hidden="true">↗</span></RippleLink>
          </div>
        </section>

        <Reveal>
          <section className="insights-v2-section">
            <div className="section-v2-heading insight-v2-heading">
              <p className="section-index">Give the room a clearer case</p>
              <h2>Make the problem easier to explain.</h2>
              <p>Use the library to diagnose the condition, challenge familiar fixes, and give other leaders shared language for the decision.</p>
            </div>
            <div className="editorial-grid">
              <a className="editorial-feature" href="https://www.120vc.com/articles/the-agentic-execution-leader-why-ai-cannot-close-the-strategy-execution-gap-alone">
                <img src="https://www.120vc.com/wp-content/uploads/2026/05/The-Rise-of-the-Agentic-Execution-Leader-1.webp" alt="A human hand reaching toward a robotic hand" width="1200" height="800" loading="lazy" />
                <div><span>Featured article</span><h3>The Agentic Execution Leader</h3><p>Why AI cannot close the Strategy Execution Gap alone.</p><i aria-hidden="true">↗</i></div>
              </a>
              <div className="editorial-list">
                <a href="https://www.120vc.com/articles/you-cant-coach-chaos"><span>Article</span><h3>You Can’t Coach Chaos</h3><p>Clear expectations come before effective coaching.</p><i aria-hidden="true">↗</i></a>
                <a href="https://www.120vc.com/download/gsd-post-to-kill-the-cost-center"><span>Executive guide</span><h3>Kill the Cost Center</h3><p>Turn internal functions into measurable business partners.</p><i aria-hidden="true">↗</i></a>
              </div>
            </div>
            <Link className="text-link" href="/insights">Explore all insights <span aria-hidden="true">↗</span></Link>
          </section>
        </Reveal>

        <Reveal>
          <section className="faq-v2-section">
            <div className="faq-v2-heading">
              <p className="section-index">Questions leaders ask</p>
              <h2>Know what changes before you begin.</h2>
              <p>A strong buying decision should reduce uncertainty before it creates commitment.</p>
            </div>
            <div className="faq-v2-list">
              {questions.map(([question, answer], index) => (
                <details key={question} open={index === 0}>
                  <summary><span>{String(index + 1).padStart(2, "0")}</span><strong>{question}</strong><i aria-hidden="true" /></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </section>
        </Reveal>

        <section className="final-v2-cta">
          <div>
            <p className="section-index">The safest useful next step</p>
            <h2>Find where execution is breaking.</h2>
          </div>
          <div>
            <p>Bring the priority, portfolio, transformation, or leadership condition creating risk. We will diagnose what is happening, test readiness, and identify the most useful next step.</p>
            <RippleLink className="button button-light" href="/contact">Book a consultation <span aria-hidden="true">↗</span></RippleLink>
            <small>Confidential · Diagnostic · No generic presentation</small>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

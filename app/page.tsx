import type { Metadata } from "next";
import { GlowCard, Reveal } from "./components/motion-kit";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { problems, roles, solutions } from "./site-data";

export const metadata: Metadata = {
  title: "Execution Leadership for Enterprise Teams",
  description: "Close the gap between what leadership decides and what the organization delivers with an execution system installed inside live work.",
  alternates: { canonical: "/" },
};

const attempts = [
  ["Technology", "Creates visibility and capability. It cannot decide what deserves attention or make a leadership commitment hold."],
  ["Training", "Creates knowledge. It cannot change the operating rules leaders return to when pressure rises."],
  ["Talent", "Adds capability. It cannot compensate for competing priorities, unclear authority, and overloaded work."],
  ["Transformation", "Creates focus. It stalls when the new condition never becomes normal leadership behavior."],
];

const proofShifts = [
  "A priority becomes explicit.",
  "Conflicting work is stopped.",
  "A decision holds.",
  "Ownership becomes visible.",
  "Risk surfaces earlier.",
  "An escalation is avoided.",
];

export default function Home() {
  return (
    <div className="site-shell home-site">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />

      <main id="main-content">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true" />Execution leadership for enterprise teams</p>
            <h1>Close the gap between what leadership decides and what the organization <em>delivers.</em></h1>
            <p className="hero-lede">When priorities compete, decisions reopen, and transformation depends on heroic intervention, the problem is not effort. It is the leadership system carrying the work.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="/contact">Book a leadership system consultation<span aria-hidden="true">↗</span></a>
              <a className="button button-secondary" href="#how">See how the system works<span aria-hidden="true">↓</span></a>
            </div>
            <p className="hero-note">A readiness and fit conversation—not a generic sales call.</p>
          </div>

          <div className="execution-frame" aria-label="From execution drag to execution clarity">
            <div className="frame-topline"><span>The execution condition</span><span className="live-label"><i /> Live work</span></div>
            <div className="frame-stage">
              <p className="stage-label">Before</p>
              <div className="signal signal-one">Competing priorities</div>
              <div className="signal signal-two">Decision reopened</div>
              <div className="signal signal-three">Hidden dependency</div>
              <div className="signal signal-four">Escalation</div>
              <div className="system-core"><span>120VC</span><strong>Execution<br />Leadership<br />System</strong></div>
              <div className="outcome outcome-one"><span>01</span> Priorities hold</div>
              <div className="outcome outcome-two"><span>02</span> Ownership is clear</div>
              <div className="outcome outcome-three"><span>03</span> Risks surface early</div>
              <div className="outcome outcome-four"><span>04</span> Outcomes compound</div>
              <p className="stage-label stage-label-right">After</p>
            </div>
            <div className="frame-footer"><span>Installed inside the work</span><span>Customer · Team · Financial</span></div>
          </div>
        </section>

        <section className="definition-band">
          <p className="section-index">01 / The real problem</p>
          <h2>Execution failure is rarely a lack-of-effort problem.</h2>
          <p>It happens when the organization has no shared system for turning intent into priorities, decisions, commitments, and measurable outcomes.</p>
          <a href="/problems-we-solve/strategy-execution-gap">See the Strategy Execution Gap <span aria-hidden="true">↗</span></a>
        </section>

        <Reveal>
          <section className="home-section condition-section" id="problem">
            <div className="home-section-heading">
              <p className="section-index">02 / Recognize the condition</p>
              <h2>What does the execution problem look like from where you sit?</h2>
              <p>Start with the pressure already visible in the business. The category makes sense after the condition does.</p>
            </div>
            <div className="condition-grid">
              {problems.map((problem, index) => (
                <a className="condition-card" href={problem.href} key={problem.href}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{problem.title}</h3>
                  <p>{problem.description}</p>
                  <i aria-hidden="true">↗</i>
                </a>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="home-section attempt-section">
            <div className="home-section-heading compact-heading">
              <p className="section-index">03 / Why familiar fixes underperform</p>
              <h2>Good investments cannot carry a missing leadership system.</h2>
              <p>Technology, training, talent, and transformation matter. They create more value when priorities, decisions, ownership, and execution rhythm already connect them to the outcome.</p>
            </div>
            <div className="attempt-grid">
              {attempts.map(([title, text], index) => (
                <div className="attempt-card" key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <section className="system-section" id="system">
          <div className="system-copy">
            <p className="eyebrow eyebrow-light"><span className="eyebrow-mark" />The 120VC response</p>
            <h2>Install one way to lead the work when pressure rises.</h2>
            <p>120VC works alongside the accountable executive and relevant team while the system is applied to current priorities, initiatives, meetings, decisions, dependencies, and outcomes.</p>
            <a className="button button-dark-outline" href="/leadership-system">Explore the Execution Leadership System<span aria-hidden="true">↗</span></a>
          </div>
          <div className="system-path" aria-label="Execution Leadership System sequence">
            {["Intent", "Priorities", "Decisions", "Commitments", "Execution", "Outcomes"].map((item, index) => (
              <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < 5 && <i aria-hidden="true">→</i>}</div>
            ))}
          </div>
          <div className="live-work-note">
            <span>Not taught beside the work.</span>
            <strong>Installed inside it.</strong>
          </div>
        </section>

        <Reveal>
          <section className="home-section pillar-section">
            <div className="home-section-heading">
              <p className="section-index">04 / The decision standard</p>
              <h2>Every meaningful decision should improve at least one pillar.</h2>
              <p>And it should not improve one by unnecessarily damaging the other two. That is how performance, people, and economic health stay connected.</p>
            </div>
            <div className="pillar-visual">
              <div className="pillar pillar-customer"><span>01</span><strong>Customer<br />Satisfaction</strong></div>
              <div className="pillar pillar-team"><span>02</span><strong>Team Member<br />Satisfaction</strong></div>
              <div className="pillar pillar-profit"><span>03</span><strong>Profitability</strong></div>
              <div className="pillar-center">Business<br />Performance</div>
            </div>
          </section>
        </Reveal>

        <section className="solutions-section" id="solutions">
          <div className="solutions-heading">
            <p className="section-index">05 / Choose by condition</p>
            <h2>One system. Four installation scopes.</h2>
            <p>The scope changes based on who must lead differently, which work carries the risk, and what operating condition must change.</p>
          </div>
          <div className="solution-grid">
            {solutions.map((solution, index) => (
              <GlowCard key={solution.href}>
                <a className="solution-card" href={solution.href}>
                  <div className="solution-top"><span>{solution.label || `Scope ${String(index + 1).padStart(2, "0")}`}</span><i aria-hidden="true">↗</i></div>
                  <h3>{solution.title}</h3>
                  <p>{solution.description}</p>
                  <span className="solution-link">Explore this scope</span>
                </a>
              </GlowCard>
            ))}
          </div>
          <a className="text-link" href="/leadership-services">Compare all solutions <span aria-hidden="true">↗</span></a>
        </section>

        <Reveal>
          <section className="home-section how-section" id="how">
            <div className="home-section-heading">
              <p className="section-index">06 / How it works</p>
              <h2>Diagnose. Install. Compound.</h2>
              <p>The first value is a visible shift in how the work operates. Ownership then transfers so the system becomes less dependent on 120VC over time.</p>
            </div>
            <div className="how-steps">
              <div><span>01</span><h3>Diagnose the condition</h3><p>Clarify the outcome at risk, what is happening now, the authority involved, and whether the organization is ready to change how work operates.</p></div>
              <div><span>02</span><h3>Install inside live work</h3><p>Apply the system to current priorities, tradeoffs, decisions, meetings, commitments, dependencies, and outcomes.</p></div>
              <div><span>03</span><h3>Compound the capability</h3><p>Establish the rhythm, behavior, and leadership ownership required for better execution to continue after the initial installation.</p></div>
            </div>
          </section>
        </Reveal>

        <section className="proof-section" id="results">
          <div className="proof-heading">
            <p className="section-index">07 / What first value looks like</p>
            <h2>Evidence should make the decision easier—not louder.</h2>
            <p>Until a final business result is measurable, look for observable operating shifts that show the system is changing the work.</p>
            <a className="button button-light" href="/case-studies">See our evidence standard<span aria-hidden="true">↗</span></a>
          </div>
          <div className="proof-list">
            {proofShifts.map((shift, index) => <div key={shift}><span>{String(index + 1).padStart(2, "0")}</span><p>{shift}</p></div>)}
          </div>
          <p className="proof-hold">No unsupported success-rate, performance, or client-attribution claims are used on this build. Approved case evidence can be added when methodology and permissions are documented.</p>
        </section>

        <Reveal>
          <section className="home-section role-section" id="roles">
            <div className="home-section-heading">
              <p className="section-index">08 / Who we help</p>
              <h2>For leaders who own the outcome—not only the activity.</h2>
              <p>The visible pressure changes by role. The shared need is a system that coordinates the work you do not control alone.</p>
            </div>
            <div className="role-grid">
              {roles.map((role) => <a href={role.href} key={role.href}><h3>{role.title}</h3><p>{role.description}</p><span>See your path <i aria-hidden="true">↗</i></span></a>)}
            </div>
          </section>
        </Reveal>

        <section className="standard-section">
          <div className="standard-image">
            <img src="https://www.120vc.com/wp-content/uploads/2026/02/we-are-the-team-photo-img.webp" alt="120VC team members together" />
            <span>We are The 120.</span>
          </div>
          <div className="standard-copy">
            <p className="eyebrow eyebrow-light"><span className="eyebrow-mark" />The standard behind the system</p>
            <h2>Conviction matters more after the business is clear.</h2>
            <p>The 120 is a way of operating with intentionality, discipline, trust, transparency, and accountability. It is not the first explanation of what we sell. It is the standard that gives the system its character.</p>
            <div className="standard-values">
              {['Intentionality','Discipline','Trust','Transparency','Accountability'].map((value, index) => <span key={value}><i>{index + 1}</i>{value}</span>)}
            </div>
            <a className="button button-dark-outline" href="/about">Understand The 120 standard<span aria-hidden="true">↗</span></a>
          </div>
        </section>

        <Reveal>
          <section className="home-section insight-section">
            <div className="home-section-heading">
              <p className="section-index">09 / Think with us</p>
              <h2>Practical thinking for the condition you are carrying now.</h2>
              <p>No generic inspiration. Use the library to understand the execution problem, challenge current assumptions, and help a buying committee evaluate the next step.</p>
            </div>
            <div className="insight-grid">
              <a href="https://www.120vc.com/articles/the-agentic-execution-leader-why-ai-cannot-close-the-strategy-execution-gap-alone"><span>Article</span><h3>The Agentic Execution Leader</h3><p>Why AI cannot close the Strategy Execution Gap alone.</p><i aria-hidden="true">↗</i></a>
              <a href="https://www.120vc.com/articles/you-cant-coach-chaos"><span>Article</span><h3>You Can’t Coach Chaos</h3><p>Why clear expectations must come before coaching.</p><i aria-hidden="true">↗</i></a>
              <a href="https://www.120vc.com/download/gsd-post-to-kill-the-cost-center"><span>Guide</span><h3>Kill the Cost Center</h3><p>Turn internal functions into measurable business partners.</p><i aria-hidden="true">↗</i></a>
            </div>
            <a className="text-link" href="/insights">Explore all insights <span aria-hidden="true">↗</span></a>
          </section>
        </Reveal>

        <section className="final-cta home-final-cta">
          <div><p className="section-index">The next decision</p><h2>Make execution more predictable under pressure.</h2></div>
          <div><p>Bring the initiative, team, transformation, function, or portfolio that is at risk. We will diagnose the condition, test readiness, and identify the most useful next step.</p><a className="button button-light" href="/contact">Book a leadership system consultation<span aria-hidden="true">↗</span></a><small>Confidential · Diagnostic · No generic presentation</small></div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

import Link from "@/app/components/native-link";
import type { CSSProperties } from "react";
import type { SystemNodeId } from "../data/primary-experience";
import { ImageMask } from "./image-mask";
import { InstallationStepper, type InstallationStep } from "./installation-stepper";
import { ReviewModePanel } from "./review-mode-panel";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { SystemExplorer } from "./system-explorer";

const installationSteps: readonly InstallationStep[] = [
  {
    number: "01",
    title: "Diagnose",
    description: "Find where priorities, decisions, ownership, or operating rhythm are breaking.",
    insideWork: "We examine live priorities, decision loops, dependencies, and ownership—not a generic maturity score.",
    value: "Leaders leave with one shared diagnosis and a clear first installation target.",
    image: "/images/problems/strategy-conversation.jpg",
    imageAlt: "Leaders examining an execution condition together.",
    width: 1800,
    height: 1200,
    position: "50% 44%",
  },
  {
    number: "02",
    title: "Install",
    description: "Put the new rules, practices, roles, and artifacts into the live work.",
    insideWork: "Shared decision rules, visible ownership, and an execution rhythm are applied to current commitments.",
    value: "The team gains one practical way to prioritize, decide, and coordinate.",
    image: "/images/story/team-working-together.jpg",
    imageAlt: "A team installing a shared way of working around live priorities.",
    width: 1800,
    height: 1008,
    position: "50% 48%",
  },
  {
    number: "03",
    title: "Operate",
    description: "Use the system in weekly work, real decisions, and real business pressure.",
    insideWork: "120VC works beside the accountable team as tradeoffs, risks, escalations, and commitments surface.",
    value: "Decisions hold longer, owners act sooner, and execution becomes easier to inspect.",
    image: "/images/problems/transformation-outcome.jpg",
    imageAlt: "A cross-functional team operating with shared clarity.",
    width: 1800,
    height: 1200,
    position: "50% 46%",
  },
  {
    number: "04",
    title: "Own",
    description: "Transfer the capability so the team can keep running it without 120VC.",
    insideWork: "Leaders run the rhythm, reinforce the standard, and coach the behaviors in live work.",
    value: "The organization keeps the discipline and capability without depending on 120VC.",
    image: "/images/story/aligned-leadership-team.jpg",
    imageAlt: "An aligned leadership team owning its operating system.",
    width: 1800,
    height: 1200,
    position: "50% 42%",
  },
];

const firstValue = [
  ["Priorities become explicit", "The team can see what wins, what waits, and what stops."],
  ["Decisions hold", "The same question does not need to be resolved again after the meeting."],
  ["Ownership spreads", "Sponsors stop carrying dependencies that accountable leaders can own."],
] as const;

type HowItWorksExperienceProps = { initialNode?: SystemNodeId; reviewMode?: boolean };

export function HowItWorksExperience({ initialNode, reviewMode = false }: HowItWorksExperienceProps) {
  return (
    <div className="site-shell hierarchy-site system-experience-site supporting-v2">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />

      {reviewMode && (
        <ReviewModePanel
          exitHref="/leadership-system"
          items={[
            { label: "System model", status: "ready", detail: "The six-part operating chain has one related practice per node." },
            { label: "Installation journey", status: "ready", detail: "Diagnose, Install, Operate, and Own now form the only ordered sequence on the page." },
            { label: "Human imagery", status: "review", detail: "Confirm licensing, provenance, and final crops before publication." },
          ]}
        />
      )}

      <main id="main-content" tabIndex={-1}>
        <section className="system-experience-hero supporting-hero" data-major-section data-journey-stage="understand" aria-labelledby="system-experience-title">
          <div className="system-hero-copy supporting-hero-copy">
            <h1 id="system-experience-title"><span className="headline-keyword headline-keyword-motion">One system</span> for priorities, decisions, and ownership.</h1>
            <p>120VC installs its Execution Leadership System—a leadership operating system for enterprise teams—inside current priorities and initiatives. We diagnose the break, clarify decision rights, establish the operating rhythm, run it under pressure, and transfer ownership to your team.</p>
            <Link className="button button-primary" href="#explore-system">See how it works <span aria-hidden="true" data-direction="down">↓</span></Link>
          </div>
          <ImageMask
            className="system-hero-image"
            src="/images/problems/strategy-conversation.jpg"
            alt="Leaders working through an execution decision together."
            width={1800}
            height={1200}
            variant="step"
            priority
            style={{ "--image-position": "50% 44%" } as CSSProperties}
          />
        </section>

        <section className="system-experience-model" id="explore-system" data-major-section data-journey-stage="understand" aria-labelledby="system-model-title">
          <div className="system-section-heading">
            <h2 id="system-model-title">Six parts have to work together.</h2>
            <p>Select one part to see what leaders make visible and what changes in the work. The full chain remains visible while you explore.</p>
          </div>
          <SystemExplorer initialNode={initialNode} />
        </section>

        <section className="system-installation supporting-installation" data-major-section data-journey-stage="solution" aria-labelledby="installation-title">
          <div className="system-section-heading">
            <h2 id="installation-title">We install the system in four stages.</h2>
            <p>Each stage happens around live priorities, decisions, and commitments—so learning and execution move together.</p>
          </div>
          <InstallationStepper steps={installationSteps} />
        </section>

        <section className="system-first-value" data-major-section data-journey-stage="believe" aria-labelledby="first-value-title">
          <ImageMask
            src="/images/story/aligned-leadership-team.jpg"
            alt="An aligned leadership team working from one shared view."
            width={1800}
            height={1200}
            variant="panel"
            style={{ "--image-position": "50% 42%" } as CSSProperties}
          />
          <div>
            <h2 id="first-value-title">The first changes leaders can see.</h2>
            <div className="system-first-value-list">
              {firstValue.map(([title, description]) => (
                <article key={title}><h3>{title}</h3><p>{description}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="system-experience-close" data-major-section data-journey-stage="act" aria-labelledby="system-close-title">
          <h2 id="system-close-title">Bring the system to the work that needs it.</h2>
          <p>Explore where we help, or bring one live problem into a focused conversation.</p>
          <div className="primary-and-quiet">
            <Link className="button button-light" href="/leadership-services">Explore how we help <span aria-hidden="true">→</span></Link>
            <Link className="quiet-link quiet-link-light" href="/consultation?source=how-it-works">Talk through your problem <span aria-hidden="true">→</span></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

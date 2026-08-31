import Link from "next/link";
import type { CSSProperties } from "react";
import type { ProblemConditionId, ProblemMode } from "../data/primary-experience";
import { ExecutionSpine } from "./execution-spine";
import { ImageMask } from "./image-mask";
import { ProblemExplorer } from "./problem-explorer";
import { ReviewModePanel } from "./review-mode-panel";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type WhatWeSolveExperienceProps = {
  initialCondition?: ProblemConditionId;
  initialMode?: ProblemMode;
  reviewMode?: boolean;
};

export function WhatWeSolveExperience({ initialCondition, reviewMode = false }: WhatWeSolveExperienceProps) {
  return (
    <div className="site-shell hierarchy-site problem-experience-site supporting-v2">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />

      {reviewMode && (
        <ReviewModePanel
          exitHref="/problems-we-solve"
          items={[
            { label: "Experience consolidation", status: "ready", detail: "Five former problem routes now restore one selected condition in this shared experience." },
            { label: "Human imagery", status: "review", detail: "Confirm licenses, releases, crops, and provenance before launch." },
            { label: "Client proof", status: "blocked", detail: "No stock image or illustrative condition is presented as customer proof." },
          ]}
        />
      )}

      <main id="main-content" tabIndex={-1}>
        <section className="problem-experience-hero supporting-hero" data-major-section data-journey-stage="recognize" aria-labelledby="problem-experience-title">
          <div className="supporting-hero-copy">
            <h1 id="problem-experience-title">We solve <span className="headline-keyword">execution problems</span> blocking critical priorities.</h1>
            <p>That includes shifting priorities, divided leadership, stalled transformation, overloaded portfolios, and internal teams stuck reacting.</p>
            <Link className="button button-primary" href="#explore-breakdowns">Compare the five problems <span aria-hidden="true" data-direction="down">↓</span></Link>
          </div>
          <ImageMask
            src="/images/story/execution-friction.jpg"
            alt="A leader experiencing visible pressure during a difficult business conversation."
            width={1800}
            height={1200}
            variant="step"
            priority
            style={{ "--image-position": "50% 46%" } as CSSProperties}
          />
        </section>

        <section className="problem-experience-workspace" id="explore-breakdowns" data-major-section data-journey-stage="understand" aria-labelledby="problem-workspace-title">
          <div className="problem-workspace-heading supporting-section-heading">
            <h2 id="problem-workspace-title">Which execution problem is slowing your organization down?</h2>
            <p>Review the five problems, then choose “Show diagnostic” to see the warning signs, business cost, and next steps below.</p>
          </div>
          <ProblemExplorer initialCondition={initialCondition} />
        </section>

        <section className="problem-experience-repair" data-major-section data-journey-stage="solution" aria-labelledby="problem-repair-title">
          <div className="problem-repair-copy">
            <h2 id="problem-repair-title">The answer reconnects the full execution chain.</h2>
            <p>120VC reconnects intent, priorities, decisions, commitments, execution, and outcomes inside the work that must move.</p>
            <div className="primary-and-quiet">
              <Link className="button button-primary" href="/leadership-system">See how the system works <span aria-hidden="true">→</span></Link>
              <Link className="quiet-link quiet-link-strong" href="/consultation?source=problems">Talk through your problem <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <ExecutionSpine state="repair" />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

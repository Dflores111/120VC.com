import Link from "@/app/components/native-link";
import type { CSSProperties } from "react";
import type { ProblemConditionId, ProblemMode } from "../data/primary-experience";
import { primaryPageCopy } from "../data/sitemap-content";
import { ExecutionSpine } from "./execution-spine";
import { IndustryStatistics } from "./evidence-statistics";
import { ImageMask } from "./image-mask";
import { ProblemExplorer } from "./problem-explorer";
import { ReviewModePanel } from "./review-mode-panel";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { ScrollWords } from "./scroll-words";

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
            <h1 id="problem-experience-title">{primaryPageCopy["problems-we-solve"].title}</h1>
            <p>{primaryPageCopy["problems-we-solve"].description}</p>
            <Link className="button button-primary" href="#explore-breakdowns">See the five problems <span aria-hidden="true" data-direction="down">↓</span></Link>
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
            <h2 id="problem-workspace-title"><ScrollWords>Which problem keeps coming back?</ScrollWords></h2>
            <p>Open the problem that sounds familiar. See what it costs and what needs to change.</p>
          </div>
          <ProblemExplorer initialCondition={initialCondition} />
          <IndustryStatistics />
        </section>

        <section className="problem-experience-repair" data-major-section data-journey-stage="solution" aria-labelledby="problem-repair-title">
          <div className="problem-repair-copy">
            <h2 id="problem-repair-title">Find what&apos;s keeping execution from moving.</h2>
            <p>We identify the execution breakdown and connect it to the right level of Execution Leadership.</p>
            <div className="primary-and-quiet">
              <Link className="button button-primary" href="/leadership-services">Explore What We Do <span aria-hidden="true">→</span></Link>
              <Link className="quiet-link quiet-link-strong" href="/contact?source=problems">Let&apos;s Talk <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <ExecutionSpine state="repair" />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

import Link from "@/app/components/native-link";
import type { CSSProperties } from "react";
import { ExecutionIcon } from "./execution-icon";
import { ImageMask } from "./image-mask";
import { ResourceExplorer } from "./resource-explorer";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function ResourcesExperience() {
  return (
    <div className="site-shell hierarchy-site resources-experience-site supporting-v2">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />

      <main id="main-content" tabIndex={-1}>
        <section className="resources-experience-hero supporting-hero" data-major-section data-journey-stage="orient" aria-labelledby="resources-experience-title">
          <div className="resources-hero-copy supporting-hero-copy">
            <h1 id="resources-experience-title">Tools and insights to turn strategy into execution.</h1>
            <p>Use a practical tool to move a decision now, or share an insight when your team needs a common understanding before acting.</p>
            <Link className="button button-primary" href="#resource-library">Explore the resource library <span aria-hidden="true" data-direction="down">↓</span></Link>
          </div>
          <div className="resources-hero-composition" aria-label="A preview of practical tools and educational resources">
            <div className="resources-tool-preview" aria-hidden="true">
              <span>DECISION TOOL</span>
              <ExecutionIcon name="two-by-two" />
              <strong>What deserves focus?</strong>
              <i><b>Strategic value</b><b>Urgency</b></i>
            </div>
            <div className="resources-reading-preview" aria-hidden="true">
              <span>EXECUTIVE INSIGHT</span>
              <strong>Why sound strategy fragments after the leadership room.</strong>
              <i>6 minute read</i>
            </div>
          </div>
        </section>

        <section className="resource-library-section" id="resource-library" data-major-section data-journey-stage="explore" aria-labelledby="resource-library-title">
          <header className="supporting-section-heading supporting-section-heading-centered">
            <h2 id="resource-library-title">Choose a tool or an insight.</h2>
            <p>Tools help you act now. Insights help a group build shared understanding before acting.</p>
          </header>
          <ResourceExplorer />
        </section>

        <section className="resource-book-section" data-major-section data-journey-stage="understand" aria-labelledby="resource-book-title">
          <ImageMask
            src="/images/problems/strategy-gap-book.png"
            alt="The Strategy Execution Gap book cover."
            width={1200}
            height={1200}
            variant="panel"
            style={{ "--image-position": "center" } as CSSProperties}
          />
          <div>
            <h2 id="resource-book-title">Read <em>The Strategy Execution Gap</em>.</h2>
            <p>The Strategy Execution Gap explains why clear strategy fragments as it becomes priorities, decisions, commitments, and daily work—and what reconnects the chain.</p>
            <Link className="button button-light" href="https://www.120vc.com/book-download-the-strategy-execution-gap/">Get the book <span aria-hidden="true" data-direction="out">↗</span></Link>
          </div>
        </section>

        <section className="resource-reassurance" data-major-section data-journey-stage="act" aria-labelledby="resources-close-title">
          <div>
            <h2 id="resources-close-title">Bring us the problem when a resource is not enough.</h2>
            <p>A focused conversation can clarify where execution is breaking and the next useful step.</p>
          </div>
          <Link className="button button-primary" href="/consultation?source=resources">Talk through the problem <span aria-hidden="true">→</span></Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

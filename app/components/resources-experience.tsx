import Link from "@/app/components/native-link";
import type { CSSProperties } from "react";
import { ExecutionIcon } from "./execution-icon";
import { ImageMask } from "./image-mask";
import { ResourceExplorer } from "./resource-explorer";
import { ScrollWords } from "./scroll-words";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { DecisionBriefPreview } from "./decision-brief-preview";
import { primaryPageCopy } from "../data/sitemap-content";
import type { ResourceCategory } from "../data/resource-library";

export function ResourcesExperience({ initialCategory }: { initialCategory?: ResourceCategory }) {
  return (
    <div className="site-shell hierarchy-site resources-experience-site supporting-v2">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />

      <main id="main-content" tabIndex={-1}>
        <section className="resources-experience-hero supporting-hero" data-major-section data-journey-stage="orient" aria-labelledby="resources-experience-title">
          <div className="resources-hero-copy supporting-hero-copy">
            <h1 id="resources-experience-title">{primaryPageCopy.resources.title}</h1>
            <p>{primaryPageCopy.resources.description}</p>
            <Link className="button button-primary" href="#resource-library">Explore the library <span aria-hidden="true" data-direction="down">↓</span></Link>
          </div>
          <div className="resources-hero-composition" aria-label="A preview of practical tools and educational resources">
            <div className="resources-tool-preview" aria-hidden="true">
              <span>DECISION TOOL</span>
              <ExecutionIcon name="two-by-two" />
              <strong>What deserves focus?</strong>
              <i><b>Value</b><b>Effort</b></i>
            </div>
            <div className="resources-reading-preview" aria-hidden="true">
              <span>EXECUTIVE INSIGHT</span>
              <strong>Why sound strategy fragments after the leadership room.</strong>
              <i>Strategy execution</i>
            </div>
          </div>
        </section>

        <section className="executive-resource-feature" data-major-section aria-labelledby="brief-feature-title">
          <DecisionBriefPreview headingLevel="h2" />
        </section>
        <section className="resource-library-section" id="resource-library" data-major-section data-journey-stage="explore" aria-labelledby="resource-library-title">
          <header className="supporting-section-heading supporting-section-heading-centered">
            <h2 id="resource-library-title"><ScrollWords>Choose what would help right now.</ScrollWords></h2>
            <p>Explore a framework for the work in front of you, or understand why the problem keeps returning.</p>
          </header>
          <ResourceExplorer initialCategory={initialCategory} />
          <p className="tk-library-link"><Link className="button button-secondary" href="/resources/tools">Open the connected Execution Toolkit <span aria-hidden="true">→</span></Link></p>
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
            <Link className="button button-light" href="https://www.120vc.com/book-download-the-strategy-execution-gap/" data-analytics-event="book_link_clicked" data-analytics-section="resources">Get the book <span aria-hidden="true" data-direction="out">↗</span></Link>
          </div>
        </section>

        <section className="resource-reassurance" data-major-section data-journey-stage="act" aria-labelledby="resources-close-title">
          <div>
            <h2 id="resources-close-title">Need help putting this into practice?</h2>
            <p>Talk through the priorities, decisions, and commitments your team needs to deliver.</p>
          </div>
          <Link className="button button-primary" href="/contact?source=resources">Let&apos;s Talk <span aria-hidden="true">→</span></Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

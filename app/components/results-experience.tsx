import Link from "next/link";
import { getHomepageCaseProof } from "../data/homepage-case-proof";
import { FeaturedCaseCarousel } from "./featured-case-carousel";
import { ReviewModePanel } from "./review-mode-panel";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

const methodology = [
  ["What changed?", "The case names the priority, decision, ownership, risk, or operating rhythm that moved first."],
  ["How was it measured?", "A decision-grade claim includes the definition, baseline, population, period, calculation, and evidence source."],
  ["What can be attributed?", "The story distinguishes 120VC's contribution from other factors and does not claim more than the evidence supports."],
  ["Can a buyer inspect it?", "A credible published case includes context, permission, attribution, and an appropriate reference path."],
] as const;

export function ResultsExperience({ reviewMode = false }: { reviewMode?: boolean }) {
  const cases = getHomepageCaseProof(process.env.NODE_ENV, reviewMode);
  const hasIllustrativeCases = cases.some((caseStudy) => caseStudy.proofStatus === "demo");

  return (
    <div className="site-shell hierarchy-site results-experience-site supporting-v2">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />

      {reviewMode && (
        <ReviewModePanel
          exitHref="/results"
          items={[
            { label: "Case experience", status: "ready", detail: "The Before → 120VC Changed → After carousel is ready for evidence-approved cases." },
            { label: "Approved case studies", status: "blocked", detail: "Every illustrative case, quote, and metric must be replaced and approved before public publication." },
            { label: "Public indexing", status: "blocked", detail: "This route remains noindex while the proof gate is closed." },
          ]}
        />
      )}

      <main id="main-content" tabIndex={-1}>
        <section className="results-experience-hero" data-major-section data-journey-stage="believe" aria-labelledby="results-experience-title">
          <div>
            <h1 id="results-experience-title">See the results of <span className="headline-keyword headline-keyword-on-dark">better execution</span>.</h1>
            <p>Each case study shows what was happening, what 120VC changed, what improved, and how the result was measured.</p>
          </div>
        </section>

        {cases.length > 0 ? (
          <section className="results-case-section" data-major-section data-journey-stage="validate" aria-labelledby="results-case-title">
            <header className="supporting-section-heading supporting-section-heading-light">
              <h2 id="results-case-title">Review the evidence behind each result.</h2>
              <p>Each case follows one inspectable transformation story, with the measurable result attached to the After state.</p>
            </header>
            {hasIllustrativeCases && (
              <div className="results-placeholder-notice" role="note">
                <strong>Illustrative case studies</strong>
                <span>Placeholder evidence—not approved for public publication.</span>
              </div>
            )}
            <FeaturedCaseCarousel cases={cases} />
          </section>
        ) : (
          <section className="results-proof-gate" data-major-section data-journey-stage="validate" aria-labelledby="results-proof-gate-title">
            <h2 id="results-proof-gate-title">Approved case studies are being prepared.</h2>
            <p>We publish client stories only with an inspectable result, clear context, responsible attribution, and explicit client permission. We will not substitute illustrative evidence for customer proof.</p>
          </section>
        )}

        <section className="results-methodology" data-major-section data-journey-stage="understand" aria-labelledby="results-methodology-title">
          <header className="supporting-section-heading">
            <h2 id="results-methodology-title">How we verify a credible result.</h2>
            <p>Open the question your buying group needs to inspect. The case story remains primary; methodology stays available without competing with it.</p>
          </header>
          <div className="results-methodology-list">
            {methodology.map(([title, description]) => (
              <details key={title}><summary>{title}<span aria-hidden="true">+</span></summary><p>{description}</p></details>
            ))}
          </div>
        </section>

        <section className="results-reassurance" data-major-section data-journey-stage="act" aria-labelledby="results-close-title">
          <div>
            <h2 id="results-close-title">Evaluate the result your buying group needs.</h2>
            <p>Bring the execution condition and the proof questions that matter. We will clarify what evidence is relevant without overstating what is available.</p>
          </div>
          <Link className="button button-primary" href="/consultation?source=results">Talk through the evidence <span aria-hidden="true">→</span></Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

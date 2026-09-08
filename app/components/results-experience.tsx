import Link from "@/app/components/native-link";
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
            <h1 id="results-experience-title">Clear priorities. Decisions that hold. <span className="headline-keyword headline-keyword-on-dark headline-keyword-motion">Measurable results.</span></h1>
            <p>Our strategy execution case studies show the starting condition, what 120VC changed in the work, the measurable result, the timeframe, and the evidence behind it.</p>
          </div>
        </section>

        {cases.length > 0 ? (
          <section className="results-case-section" data-major-section data-journey-stage="validate" aria-labelledby="results-case-title">
            <header className="supporting-section-heading supporting-section-heading-light">
              <h2 id="results-case-title">Before. What changed. After.</h2>
              <p>Each story connects a problem in the work to the change 120VC helped install and the result that followed.</p>
            </header>
            {hasIllustrativeCases && (
              <div className="results-placeholder-notice" role="note">
                <strong>Illustrative case studies</strong>
                <span>Placeholder evidence—not approved for public publication.</span>
              </div>
            )}
            <FeaturedCaseCarousel cases={cases} sourcePage="results" />
          </section>
        ) : (
          <section className="results-proof-gate" data-major-section data-journey-stage="validate" aria-labelledby="results-proof-gate-title">
            <h2 id="results-proof-gate-title">What a credible case study should show.</h2>
            <p>We publish client stories only with an inspectable result, clear context, responsible attribution, and explicit client permission. Illustrative evidence is never presented as customer proof.</p>
          </section>
        )}

        <section className="results-methodology" data-major-section data-journey-stage="understand" aria-labelledby="results-methodology-title">
          <header className="supporting-section-heading">
            <h2 id="results-methodology-title">See what sits behind the number.</h2>
            <p>Review how the result was measured, what contributed to it, and what the evidence can support.</p>
          </header>
          <div className="results-methodology-list">
            {methodology.map(([title, description]) => (
              <details key={title}><summary>{title}<span aria-hidden="true">+</span></summary><p>{description}</p></details>
            ))}
          </div>
        </section>

        <section className="results-reassurance" data-major-section data-journey-stage="act" aria-labelledby="results-close-title">
          <div>
            <h2 id="results-close-title">Need evidence your buying group can inspect?</h2>
            <p>Bring the execution condition and the proof questions that matter. We will clarify what evidence is relevant without overstating what is available.</p>
          </div>
          <Link className="button button-primary" href="/consultation?source=results">Talk through the evidence <span aria-hidden="true">→</span></Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

import Link from "@/app/components/native-link";
import { getHomepageCaseProof } from "../data/homepage-case-proof";
import { FeaturedCaseCarousel } from "./featured-case-carousel";
import { CompanyTrackRecord } from "./evidence-statistics";
import { ScrollWords } from "./scroll-words";
import { ReviewModePanel } from "./review-mode-panel";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { primaryPageCopy } from "../data/sitemap-content";

const methodology = [
  ["What changed?", "The case names the priority, decision, ownership, risk, or operating rhythm that moved first."],
  ["How was it measured?", "A decision-grade claim includes the definition, baseline, population, period, calculation, and evidence source."],
  ["What can be attributed?", "The story distinguishes 120VC's contribution from other factors and does not claim more than the evidence supports."],
  ["Can a buyer inspect it?", "A credible published case includes context, permission, attribution, and an appropriate reference path."],
] as const;

export function ResultsExperience({ reviewMode = false }: { reviewMode?: boolean }) {
  const cases = getHomepageCaseProof(process.env.NODE_ENV, reviewMode);

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
            <h1 id="results-experience-title">{primaryPageCopy.results.title}</h1>
            <p>{cases.length > 0 ? primaryPageCopy.results.description : "Looking for experience relevant to your priorities? Talk with us about your situation and the client evidence available to review."}</p>
          </div>
        </section>

        {cases.length > 0 ? (
          <section className="results-case-section" data-major-section data-journey-stage="validate" aria-labelledby="results-case-title">
            <header className="supporting-section-heading supporting-section-heading-light">
              <h2 id="results-case-title"><ScrollWords>Before. What changed. After.</ScrollWords></h2>
              <p>Each story connects a problem in the work to the change 120VC helped install and the result that followed.</p>
            </header>
            <CompanyTrackRecord />
            <FeaturedCaseCarousel cases={cases} sourcePage="results" />
          </section>
        ) : (
          <section className="results-proof-gate" data-major-section data-journey-stage="validate" aria-labelledby="results-proof-gate-title">
            <h2 id="results-proof-gate-title"><ScrollWords>Find experience relevant to your work.</ScrollWords></h2>
            <p>Client case studies are not yet available on this site. Tell us whether you are exploring coaching, system installation, or embedded leadership, and what results matter to your team.</p>
            <Link className="quiet-link quiet-link-strong" href="/contact?request=evidence&source=results">Ask about relevant client experience <span aria-hidden="true">→</span></Link>
          </section>
        )}

        {cases.length > 0 && <section className="results-methodology" data-major-section data-journey-stage="understand" aria-labelledby="results-methodology-title">
          <header className="supporting-section-heading">
            <h2 id="results-methodology-title"><ScrollWords>See what sits behind the number.</ScrollWords></h2>
            <p>Review how the result was measured, what contributed to it, and what the evidence can support.</p>
          </header>
          <div className="results-methodology-list">
            {methodology.map(([title, description]) => (
              <details key={title}><summary>{title}<span aria-hidden="true">+</span></summary><p>{description}</p></details>
            ))}
          </div>
        </section>}

        <section className="results-reassurance" data-major-section data-journey-stage="act" aria-labelledby="results-close-title">
          <div>
            <h2 id="results-close-title">What would meaningful progress look like for your team?</h2>
            <p>Start with the outcome you need to achieve and what is getting in the way.</p>
          </div>
          <Link className="button button-primary" href="/contact?source=results">Let&apos;s Talk <span aria-hidden="true">→</span></Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

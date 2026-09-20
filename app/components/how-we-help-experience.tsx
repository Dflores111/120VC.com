import Link from "@/app/components/native-link";
import type { CSSProperties } from "react";
import { ImageMask } from "./image-mask";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { SolutionScopeCards } from "./solution-scope-cards";
import { ScrollWords } from "./scroll-words";
import { offerScopes, primaryPageCopy } from "../data/sitemap-content";

export function HowWeHelpExperience() {
  const copy = primaryPageCopy["leadership-services"];
  return <div className="site-shell hierarchy-site solutions-experience-site supporting-v2">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <SiteHeader />
    <main id="main-content" tabIndex={-1}>
      <section className="solutions-experience-hero supporting-hero" data-major-section data-journey-stage="evaluate" aria-labelledby="solutions-experience-title">
        <div className="solutions-hero-copy supporting-hero-copy">
          <h1 id="solutions-experience-title">{copy.title}</h1>
          <p>{copy.description}</p>
          <Link className="button button-primary" href="#solution-families">Find your starting point <span aria-hidden="true" data-direction="down">↓</span></Link>
        </div>
        <ImageMask src="/images/story/team-working-together.jpg" alt="A leadership team working together around shared priorities." width={1800} height={1008} variant="step" priority style={{ "--image-position": "54% 48%" } as CSSProperties} />
      </section>
      <section className="solution-family-section supporting-decision-section" id="solution-families" data-major-section aria-labelledby="solution-family-title">
        <header className="supporting-section-heading supporting-section-heading-centered solution-family-heading">
          <h2 id="solution-family-title"><ScrollWords>The level of involvement your team needs.</ScrollWords></h2>
          <p>Start with coaching, system installation, or embedded leadership. Enter at the level your situation requires.</p>
        </header>
        <SolutionScopeCards scopes={offerScopes} />
      </section>
      <section className="shared-model-section" data-major-section aria-labelledby="shared-model-title">
        <h2 id="shared-model-title"><ScrollWords>The same execution practices at every level.</ScrollWords></h2>
        <p>Coaching develops the leaders. Installation embeds the practices. Embedded leadership applies them directly to the work.</p>
        <div className="shared-model-line" aria-label="Shared execution practices"><span>Priorities</span><span>Ownership</span><span>Decisions</span><span>Follow-through</span></div>
      </section>
      <section className="solution-reassurance" data-major-section data-journey-stage="act" aria-labelledby="solutions-close-title">
        <div><h2 id="solutions-close-title">Let&apos;s find your starting point.</h2><p>Tell us what you&apos;ve committed to and the level of leadership your team needs.</p></div>
        <Link className="button button-primary" href="/contact?source=what-we-do">Let&apos;s Talk <span aria-hidden="true">→</span></Link>
      </section>
    </main>
    <SiteFooter />
  </div>;
}

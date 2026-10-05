"use client";

import Link from "@/app/components/native-link";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { HomepageCaseProof } from "../data/homepage-case-proof";
import { track120vcEvent } from "./analytics-bridge";
import { useHydratedReducedMotion } from "./use-hydrated-reduced-motion";

type FeaturedCaseCarouselProps = {
  cases: readonly HomepageCaseProof[];
  forceReducedMotion?: boolean;
  sourcePage?: "homepage" | "results";
};

function analyticsProperties(caseStudy: HomepageCaseProof, index: number, sourcePage: "homepage" | "results") {
  return {
    case_id: caseStudy.id,
    case_context: caseStudy.context,
    case_index: index + 1,
    proof_status: caseStudy.proofStatus,
    source_page: sourcePage,
  } as const;
}

export function FeaturedCaseCarousel({ cases, forceReducedMotion = false, sourcePage = "homepage" }: FeaturedCaseCarouselProps) {
  const reduceMotion = useHydratedReducedMotion() || forceReducedMotion;
  const carouselRef = useRef<HTMLDivElement>(null);
  const lastViewedCaseRef = useRef<string | null>(null);
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const goTo = useCallback((index: number, method: "control" | "keyboard" = "control") => {
    const next = Math.max(0, Math.min(cases.length - 1, index));
    if (next === current || !cases[next]) return;
    track120vcEvent({
      event: next > current ? "case_story_next" : "case_story_previous",
      section: "client-results",
      selection: method,
      ...analyticsProperties(cases[next], next, sourcePage),
    });
    setCurrent(next);
  }, [cases, current, sourcePage]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(carousel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const caseStudy = cases[current];
    if (!caseStudy) return;
    const viewKey = `${sourcePage}:${caseStudy.id}`;
    if (lastViewedCaseRef.current === viewKey) return;
    lastViewedCaseRef.current = viewKey;
    track120vcEvent({
      event: "case_story_viewed",
      section: "client-results",
      ...analyticsProperties(caseStudy, current, sourcePage),
    });
  }, [cases, current, isVisible, sourcePage]);

  function handleKeys(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowLeft") { event.preventDefault(); goTo(current - 1, "keyboard"); }
    if (event.key === "ArrowRight") { event.preventDefault(); goTo(current + 1, "keyboard"); }
    if (event.key === "Home") { event.preventDefault(); goTo(0, "keyboard"); }
    if (event.key === "End") { event.preventDefault(); goTo(cases.length - 1, "keyboard"); }
  }

  const caseStudy = cases[current];
  if (!caseStudy) return null;
  const ctaHref = caseStudy.fullStoryUrl ?? `/consultation?source=${sourcePage}-case-${caseStudy.id}`;
  const ctaLabel = caseStudy.fullStoryUrl ? "Read the client story" : "Discuss a similar challenge";

  return (
    <div className="featured-case-carousel case-reader" data-reduced-motion={reduceMotion ? "true" : "false"} ref={carouselRef} role="region" aria-roledescription="carousel" aria-label="Featured case studies">
      <article
        className="case-reader-story"
        data-active="true"
        key={caseStudy.id}
        aria-roledescription="slide"
        aria-label={`Case ${current + 1} of ${cases.length}: ${caseStudy.title}`}
      >
        <header>
          <p className="case-reader-context">{caseStudy.proofStatus === "approved" && <><span>Client story</span> · </>}{caseStudy.context}</p>
          {caseStudy.proofStatus === "demo" && <p className="case-reader-notice">Illustrative placeholder — not client proof and not approved for publication.</p>}
          <h3>{caseStudy.title}</h3>
        </header>
        <p className="case-reader-result">
          <strong className="case-reader-value">{caseStudy.resultValue}</strong>
          <span>{caseStudy.resultLabel} <span>{caseStudy.timeframe}</span></span>
        </p>
        <div className="case-reader-intervention">
          <p>What 120VC changed</p>
          <p>{caseStudy.interventionSummary}</p>
        </div>
        <details className="case-reader-detail">
          <summary>What changed — before and after <span aria-hidden="true">+</span></summary>
          <div className="case-reader-detail-body">
            <dl className="case-reader-narrative">
              <div><dt>Before</dt><dd>{caseStudy.condition}</dd></div>
              <div className="case-reader-change"><dt>Intervention</dt><dd>{caseStudy.intervention}</dd></div>
              <div className="case-reader-after"><dt>After</dt><dd><strong>{caseStudy.afterState}</strong></dd></div>
            </dl>
            <p className="case-reader-evidence"><strong>Evidence note</strong>{caseStudy.evidenceDescription}</p>
            {caseStudy.proofStatus === "approved" && caseStudy.quote && (
              <blockquote className="case-reader-quote"><p>“{caseStudy.quote}”</p><footer><cite>{caseStudy.quotePerson ?? caseStudy.quoteRole} · {caseStudy.quoteOrganization}</cite></footer></blockquote>
            )}
          </div>
        </details>
        <Link className="case-reader-link" href={ctaHref} onClick={() => track120vcEvent({
          event: "case_story_cta_clicked",
          section: "client-results",
          ...analyticsProperties(caseStudy, current, sourcePage),
        })}>{ctaLabel} <span aria-hidden="true">→</span></Link>
      </article>
      {cases.length > 1 && <div className="case-reader-controls" role="group" aria-label="Browse case studies">
        <button type="button" onClick={() => goTo(current - 1)} onKeyDown={handleKeys} disabled={current === 0} aria-label="Previous case study"><span aria-hidden="true">←</span> Previous</button>
        <p aria-live="polite" aria-atomic="true"><span className="sr-only">{caseStudy.title} Case </span><strong>{current + 1}</strong> of {cases.length}</p>
        <button type="button" onClick={() => goTo(current + 1)} onKeyDown={handleKeys} disabled={current === cases.length - 1} aria-label="Next case study">Next <span aria-hidden="true">→</span></button>
      </div>}
    </div>
  );
}

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

function resultParts(value: string) {
  const match = value.match(/^([\d.]+)(.*)$/);
  return match ? { number: Number(match[1]), suffix: match[2], decimals: match[1].includes(".") ? 1 : 0 } : null;
}

function AnimatedResultValue({ value, active, forceReducedMotion = false }: { value: string; active: boolean; forceReducedMotion?: boolean }) {
  const reduceMotion = useHydratedReducedMotion() || forceReducedMotion;
  const hasPlayed = useRef(false);
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (!active) return;
    const parsed = resultParts(value);
    if (!parsed || reduceMotion || hasPlayed.current) {
      setDisplayValue(value);
      hasPlayed.current = true;
      return;
    }

    hasPlayed.current = true;
    let frame = 0;
    let startedAt = 0;
    const duration = 820;
    setDisplayValue(`${parsed.decimals ? "0.0" : "0"}${parsed.suffix}`);

    const tick = (timestamp: number) => {
      if (!startedAt) startedAt = timestamp;
      const progress = Math.min(1, (timestamp - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = parsed.number * eased;
      setDisplayValue(`${current.toFixed(parsed.decimals)}${parsed.suffix}`);
      if (progress < 1) frame = window.requestAnimationFrame(tick);
      else setDisplayValue(value);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [active, reduceMotion, value]);

  return (
    <strong className="case-reader-value">
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">{displayValue}</span>
    </strong>
  );
}

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
      {cases.length > 1 && <div className="case-reader-controls" role="group" aria-label="Browse case studies">
        <button type="button" onClick={() => goTo(current - 1)} onKeyDown={handleKeys} disabled={current === 0} aria-label="Previous case study"><span aria-hidden="true">←</span> Previous</button>
        <p aria-live="polite" aria-atomic="true"><span className="sr-only">{caseStudy.title} Case </span><strong>{current + 1}</strong> of {cases.length}</p>
        <button type="button" onClick={() => goTo(current + 1)} onKeyDown={handleKeys} disabled={current === cases.length - 1} aria-label="Next case study">Next <span aria-hidden="true">→</span></button>
      </div>}
      <article
        className="case-reader-story"
        data-active="true"
        key={caseStudy.id}
        aria-roledescription="slide"
        aria-label={`Case ${current + 1} of ${cases.length}: ${caseStudy.title}`}
      >
        <header>
          <p className="case-reader-context"><span>{caseStudy.proofStatus === "approved" ? "Case study" : "Illustrative case study"}</span> · {caseStudy.context}</p>
          {caseStudy.proofStatus === "demo" && <p className="case-reader-notice">Placeholder — not approved for publication.</p>}
          <h3>{caseStudy.title}</h3>
        </header>
        <dl className="case-reader-narrative">
          <div><dt>Before</dt><dd>{caseStudy.conditionSummary}</dd></div>
          <div className="case-reader-change"><dt>What 120VC changed</dt><dd>{caseStudy.intervention}</dd></div>
          <div className="case-reader-after"><dt>After</dt><dd><strong>{caseStudy.afterSummary}</strong></dd></div>
        </dl>
        <p className="case-reader-result">
          <AnimatedResultValue value={caseStudy.resultValue} active={isVisible} forceReducedMotion={forceReducedMotion} />
          <span>{caseStudy.resultLabel} <span>{caseStudy.timeframe}</span></span>
        </p>
        {caseStudy.proofStatus === "approved" && caseStudy.quote && (
          <details className="case-reader-quote">
            <summary>Hear the client’s perspective <span aria-hidden="true">+</span></summary>
            <blockquote><p>“{caseStudy.quote}”</p><footer><cite>{caseStudy.quotePerson ?? caseStudy.quoteRole} · {caseStudy.quoteOrganization}</cite></footer></blockquote>
          </details>
        )}
        <Link className="case-reader-link" href={ctaHref} onClick={() => track120vcEvent({
          event: "case_story_cta_clicked",
          section: "client-results",
          ...analyticsProperties(caseStudy, current, sourcePage),
        })}>{ctaLabel} <span aria-hidden="true">→</span></Link>
      </article>
    </div>
  );
}

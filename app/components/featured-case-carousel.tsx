"use client";

import Link from "@/app/components/native-link";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import type { HomepageCaseProof } from "../data/homepage-case-proof";
import { track120vcEvent } from "./analytics-bridge";
import { useHydratedReducedMotion } from "./use-hydrated-reduced-motion";
import { useScrollScene } from "./use-scroll-scene";

type FeaturedCaseCarouselProps = {
  cases: readonly HomepageCaseProof[];
  forceReducedMotion?: boolean;
  sourcePage?: "homepage" | "results";
};

type ProofStage = "before" | "change" | "after";

function ProofStageIcon({ stage }: { stage: ProofStage }) {
  return (
    <span className={`case-stage-icon case-stage-icon-${stage}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" focusable="false">
        {stage === "before" && (
          <>
            <path d="M4 6h3.5c3.5 0 4.1 5 7.5 5h5" />
            <path d="m17 8 3 3-3 3" />
            <path d="M4 18h3.5c2.8 0 3.8-3.2 6-4.5" />
          </>
        )}
        {stage === "change" && (
          <>
            <path d="M18.5 8.2A7.5 7.5 0 0 0 5.7 7" />
            <path d="M5.7 3.8V7h3.2" />
            <path d="M5.5 15.8A7.5 7.5 0 0 0 18.3 17" />
            <path d="M18.3 20.2V17h-3.2" />
            <circle cx="12" cy="12" r="2.25" />
          </>
        )}
        {stage === "after" && (
          <>
            <circle cx="12" cy="12" r="8" />
            <path d="m8.4 12 2.35 2.35 4.9-5.05" />
          </>
        )}
      </svg>
    </span>
  );
}

function ProofPointIcon({ stage }: { stage: ProofStage }) {
  return (
    <span className={`case-point-icon case-point-icon-${stage}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" focusable="false">
        {stage === "before" && (
          <>
            <circle cx="12" cy="12" r="8" />
            <path d="M8.5 12h7" />
          </>
        )}
        {stage === "change" && (
          <>
            <path d="M18.5 8.5A7.5 7.5 0 0 0 6 7" />
            <path d="M6 3.8V7h3.2" />
            <path d="M5.5 15.5A7.5 7.5 0 0 0 18 17" />
            <path d="M18 20.2V17h-3.2" />
          </>
        )}
        {stage === "after" && (
          <>
            <circle cx="12" cy="12" r="8" />
            <path d="m8.5 12 2.25 2.25 4.75-4.75" />
          </>
        )}
      </svg>
    </span>
  );
}

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
    <strong className="featured-case-result-value">
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">{displayValue}</span>
    </strong>
  );
}

function ProofComparison({ caseStudy, active, forceReducedMotion = false }: { caseStudy: HomepageCaseProof; active: boolean; forceReducedMotion?: boolean }) {
  const reduceMotion = useHydratedReducedMotion() || forceReducedMotion;
  const { activeStep, goToStep, sceneRef, stageRef } = useScrollScene({ stepCount: 3, forceReducedMotion });
  const descriptionId = `case-${caseStudy.id}-description`;

  return (
    <div
      className="case-transformation scroll-swap-scene"
      data-state={activeStep === 2 ? "after" : activeStep === 1 ? "transforming" : "before"}
      data-reduced-motion={reduceMotion ? "true" : "false"}
      aria-describedby={descriptionId}
      ref={sceneRef}
      style={{ "--scroll-scene-steps": 3 } as CSSProperties}
    >
      <div className="case-transformation-stage scroll-swap-stage" ref={stageRef}>
        <nav className="case-story-nav" aria-label={`Move through ${caseStudy.title}`}>
          <p aria-live="polite"><strong>{String(activeStep + 1).padStart(2, "0")}</strong> / 03 <span>{activeStep === 0 ? "Before" : activeStep === 1 ? "120VC Changed" : "After"}</span></p>
          <div>
            {["Before", "120VC Changed", "After"].map((label, index) => (
              <button disabled={!active} key={label} type="button" aria-label={`Go to ${label}`} aria-current={activeStep === index ? "step" : undefined} onClick={() => goToStep(index)}>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="case-story-viewport">
          <section className="case-stage case-stage-before scroll-swap-panel" aria-hidden={activeStep !== 0} data-active={activeStep === 0 ? "true" : "false"} inert={activeStep !== 0} aria-labelledby={`${descriptionId}-before`}>
            <div className="case-stage-heading">
              <span className="case-stage-number">01</span>
              <ProofStageIcon stage="before" />
              <h4 id={`${descriptionId}-before`}>Before</h4>
            </div>
            <div className="case-stage-body"><ul>
                {caseStudy.beforePoints.map((point) => <li key={point}><ProofPointIcon stage="before" /><span>{point}</span></li>)}
            </ul></div>
          </section>
          <section className="case-stage case-stage-change scroll-swap-panel" aria-hidden={activeStep !== 1} data-active={activeStep === 1 ? "true" : "false"} inert={activeStep !== 1} aria-labelledby={`${descriptionId}-change`}>
            <div className="case-stage-heading">
              <span className="case-stage-number">02</span>
              <ProofStageIcon stage="change" />
              <h4 id={`${descriptionId}-change`}>120VC Changed</h4>
            </div>
            <div className="case-stage-body">
              <div className="case-change-path" aria-hidden="true"><span /></div>
              <ul>{caseStudy.changePoints.map((point) => <li key={point}><ProofPointIcon stage="change" /><span>{point}</span></li>)}</ul>
              <p className="featured-case-intervention">{caseStudy.intervention}</p>
            </div>
          </section>
          <section className="case-stage case-stage-after scroll-swap-panel" aria-hidden={activeStep !== 2} data-active={activeStep === 2 ? "true" : "false"} inert={activeStep !== 2} aria-labelledby={`${descriptionId}-after`}>
            <div className="case-stage-heading">
              <span className="case-stage-number">03</span>
              <ProofStageIcon stage="after" />
              <h4 id={`${descriptionId}-after`}>After</h4>
            </div>
            <div className="case-stage-body case-stage-after-body">
              <ul>{caseStudy.afterPoints.map((point) => <li key={point}><ProofPointIcon stage="after" /><span>{point}</span></li>)}</ul>
              <div className="featured-case-result">
                <AnimatedResultValue value={caseStudy.resultValue} active={active && activeStep === 2} forceReducedMotion={forceReducedMotion} />
                <p>{caseStudy.resultLabel}</p>
                <span>{caseStudy.timeframe}</span>
              </div>
            </div>
          </section>
        </div>
        <p className="scroll-swap-cue" aria-hidden="true">{activeStep === 2 ? "Continue" : "Scroll to advance"}<span data-direction="down">↓</span></p>
        <p className="sr-only" id={descriptionId}>{caseStudy.evidenceDescription}</p>
      </div>
    </div>
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
    if (next === current) return;
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
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.2 });
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

  const caseStudy = cases[current];
  const ctaHref = caseStudy.fullStoryUrl ?? `/consultation?source=${sourcePage}-case-${caseStudy.id}`;
  const ctaLabel = caseStudy.fullStoryUrl ? "Read the client story" : "Discuss a similar challenge";

  return (
    <div className="featured-case-carousel" data-reduced-motion={reduceMotion ? "true" : "false"} ref={carouselRef} role="region" aria-roledescription="carousel" aria-label="Featured case studies">
      <article
        className="featured-case"
        data-active="true"
        key={caseStudy.id}
        aria-roledescription="slide"
        aria-label={`Case ${current + 1} of ${cases.length}: ${caseStudy.title}`}
      >
        <header className="featured-case-header">
          <p className="featured-case-kicker">{caseStudy.proofStatus === "approved" ? "Case Study" : "Illustrative Case Study"}</p>
          <h3>{caseStudy.title}</h3>
          <p className="featured-case-type">{caseStudy.context}</p>
        </header>

        <div className="featured-case-core">
          <ProofComparison caseStudy={caseStudy} active forceReducedMotion={forceReducedMotion} />
        </div>

        <blockquote>
          <p>“{caseStudy.quote}”</p>
          <footer><cite>{caseStudy.quotePerson ?? caseStudy.quoteRole} · {caseStudy.quoteOrganization}</cite></footer>
        </blockquote>

        <div className="featured-case-outcome">
          <Link
            href={ctaHref}
            onClick={() => track120vcEvent({
              event: "case_story_cta_clicked",
              section: "client-results",
              ...analyticsProperties(caseStudy, current, sourcePage),
            })}
          >{ctaLabel} <span aria-hidden="true">→</span></Link>
        </div>
      </article>

      <div className="featured-case-controls">
        <button
          type="button"
          onClick={() => goTo(current - 1)}
          onKeyDown={(event) => {
            if (event.key === "Home") goTo(0, "keyboard");
            if (event.key === "End") goTo(cases.length - 1, "keyboard");
          }}
          disabled={current === 0}
          aria-label="Previous case study"
        >←</button>
        <p aria-live="polite" aria-atomic="true"><strong>{current + 1}</strong> / {cases.length}</p>
        <button
          type="button"
          onClick={() => goTo(current + 1)}
          onKeyDown={(event) => {
            if (event.key === "Home") goTo(0, "keyboard");
            if (event.key === "End") goTo(cases.length - 1, "keyboard");
          }}
          disabled={current === cases.length - 1}
          aria-label="Next case study"
        >→</button>
      </div>
    </div>
  );
}

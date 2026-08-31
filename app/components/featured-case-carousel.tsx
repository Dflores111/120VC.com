"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { HomepageCaseProof } from "../data/homepage-case-proof";
import { track120vcEvent } from "./analytics-bridge";
import { useHydratedReducedMotion } from "./use-hydrated-reduced-motion";

type FeaturedCaseCarouselProps = {
  cases: readonly HomepageCaseProof[];
  forceReducedMotion?: boolean;
};

type ComparisonState = "before" | "transforming" | "after";
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
  const hasPlayed = useRef(false);
  const [state, setState] = useState<ComparisonState>(reduceMotion ? "after" : "before");
  const descriptionId = `case-${caseStudy.id}-description`;

  useEffect(() => {
    if (!active) return;
    if (reduceMotion || hasPlayed.current) {
      setState("after");
      hasPlayed.current = true;
      return;
    }

    hasPlayed.current = true;
    setState("before");
    const begin = window.setTimeout(() => setState("transforming"), 220);
    const finish = window.setTimeout(() => setState("after"), 980);
    return () => {
      window.clearTimeout(begin);
      window.clearTimeout(finish);
    };
  }, [active, reduceMotion]);

  return (
    <div
      className="case-transformation"
      data-state={state}
      data-reduced-motion={reduceMotion ? "true" : "false"}
      aria-describedby={descriptionId}
    >
      <section className="case-stage case-stage-before" aria-labelledby={`${descriptionId}-before`}>
        <div className="case-stage-heading">
          <ProofStageIcon stage="before" />
          <h4 id={`${descriptionId}-before`}>Before</h4>
        </div>
        <ul>
          {caseStudy.beforePoints.map((point) => <li key={point}><ProofPointIcon stage="before" /><span>{point}</span></li>)}
        </ul>
      </section>
      <section className="case-stage case-stage-change" aria-labelledby={`${descriptionId}-change`}>
        <div className="case-stage-heading">
          <ProofStageIcon stage="change" />
          <h4 id={`${descriptionId}-change`}>120VC Changed</h4>
        </div>
        <div className="case-change-path" aria-hidden="true"><span /></div>
        <ul>
          {caseStudy.changePoints.map((point) => <li key={point}><ProofPointIcon stage="change" /><span>{point}</span></li>)}
        </ul>
      </section>
      <section className="case-stage case-stage-after" aria-labelledby={`${descriptionId}-after`}>
        <div className="case-stage-heading">
          <ProofStageIcon stage="after" />
          <h4 id={`${descriptionId}-after`}>After</h4>
        </div>
        <ul>
          {caseStudy.afterPoints.map((point) => <li key={point}><ProofPointIcon stage="after" /><span>{point}</span></li>)}
        </ul>
        <div className="featured-case-result">
          <AnimatedResultValue value={caseStudy.resultValue} active={active && state === "after"} forceReducedMotion={forceReducedMotion} />
          <p>{caseStudy.resultLabel}</p>
          <span>{caseStudy.timeframe}</span>
        </div>
      </section>
      <div className="case-mobile-direction case-mobile-direction-first" aria-hidden="true">↓</div>
      <div className="case-mobile-direction case-mobile-direction-second" aria-hidden="true">↓</div>
      <p className="sr-only" id={descriptionId}>{caseStudy.evidenceDescription}</p>
    </div>
  );
}

function analyticsProperties(caseStudy: HomepageCaseProof, index: number) {
  return {
    case_id: caseStudy.id,
    case_context: caseStudy.context,
    case_index: index + 1,
    proof_status: caseStudy.proofStatus,
    source_page: "homepage",
  } as const;
}

export function FeaturedCaseCarousel({ cases, forceReducedMotion = false }: FeaturedCaseCarouselProps) {
  const reduceMotion = useHydratedReducedMotion() || forceReducedMotion;
  const railRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const currentRef = useRef(0);
  const programmaticTargetRef = useRef<number | null>(null);
  const programmaticTargetTimeoutRef = useRef<number | null>(null);
  const [current, setCurrent] = useState(0);

  const updateCurrent = useCallback((next: number, method: "control" | "scroll" | "keyboard") => {
    const previous = currentRef.current;
    if (next === previous) return;
    currentRef.current = next;
    setCurrent(next);
    track120vcEvent({
      event: next > previous ? "case_story_next" : "case_story_previous",
      section: "client-results",
      selection: method,
      ...analyticsProperties(cases[next], next),
    });
  }, [cases]);

  const goTo = useCallback((index: number, method: "control" | "keyboard" = "control") => {
    const next = Math.max(0, Math.min(cases.length - 1, index));
    const target = cardRefs.current[next];
    if (!target || next === currentRef.current) return;
    programmaticTargetRef.current = next;
    if (programmaticTargetTimeoutRef.current !== null) window.clearTimeout(programmaticTargetTimeoutRef.current);
    programmaticTargetTimeoutRef.current = window.setTimeout(() => {
      programmaticTargetRef.current = null;
      programmaticTargetTimeoutRef.current = null;
    }, reduceMotion ? 80 : 1000);
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest", inline: "start" });
    updateCurrent(next, method);
  }, [cases.length, reduceMotion, updateCurrent]);

  useEffect(() => {
    const caseStudy = cases[current];
    if (!caseStudy) return;
    track120vcEvent({
      event: "case_story_viewed",
      section: "client-results",
      ...analyticsProperties(caseStudy, current),
    });
  }, [cases, current]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    let frame = 0;
    const handleScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const railLeft = rail.getBoundingClientRect().left;
        const programmaticTarget = programmaticTargetRef.current;
        if (programmaticTarget !== null) {
          const target = cardRefs.current[programmaticTarget];
          if (!target || Math.abs(target.getBoundingClientRect().left - railLeft) <= 2) {
            programmaticTargetRef.current = null;
            if (programmaticTargetTimeoutRef.current !== null) window.clearTimeout(programmaticTargetTimeoutRef.current);
            programmaticTargetTimeoutRef.current = null;
          }
          return;
        }
        let next = 0;
        let closest = Number.POSITIVE_INFINITY;
        cardRefs.current.forEach((card, index) => {
          if (!card) return;
          const distance = Math.abs(card.getBoundingClientRect().left - railLeft);
          if (distance < closest) {
            closest = distance;
            next = index;
          }
        });
        updateCurrent(next, "scroll");
      });
    };
    rail.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      rail.removeEventListener("scroll", handleScroll);
      if (programmaticTargetTimeoutRef.current !== null) window.clearTimeout(programmaticTargetTimeoutRef.current);
    };
  }, [updateCurrent]);

  return (
    <div className="featured-case-carousel" data-reduced-motion={reduceMotion ? "true" : "false"}>
      <div
        className="featured-case-rail"
        ref={railRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured case studies"
      >
        {cases.map((caseStudy, index) => {
          const isActive = index === current;
          const ctaHref = caseStudy.fullStoryUrl ?? `/consultation?source=homepage-case-${caseStudy.id}`;
          const ctaLabel = caseStudy.fullStoryUrl ? "Read the client story" : "Discuss a similar challenge";
          return (
            <article
              className="featured-case"
              data-active={isActive ? "true" : "false"}
              key={caseStudy.id}
              ref={(element) => { cardRefs.current[index] = element; }}
              aria-hidden={!isActive}
              aria-roledescription="slide"
              aria-label={`Case ${index + 1} of ${cases.length}: ${caseStudy.title}`}
            >
              <header className="featured-case-header">
                <p className="featured-case-kicker">{caseStudy.proofStatus === "approved" ? "Case Study" : "Illustrative Case Study"}</p>
                <h3>{caseStudy.title}</h3>
                <p className="featured-case-type">{caseStudy.context}</p>
              </header>

              <div className="featured-case-core">
                <ProofComparison caseStudy={caseStudy} active={isActive} forceReducedMotion={forceReducedMotion} />
              </div>

              <p className="featured-case-intervention">{caseStudy.intervention}</p>

              <blockquote>
                <p>“{caseStudy.quote}”</p>
                <footer>
                  <cite>{caseStudy.quotePerson ?? caseStudy.quoteRole} · {caseStudy.quoteOrganization}</cite>
                </footer>
              </blockquote>

              <div className="featured-case-outcome">
                <Link
                  href={ctaHref}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => track120vcEvent({
                    event: "case_story_cta_clicked",
                    section: "client-results",
                    ...analyticsProperties(caseStudy, index),
                  })}
                >{ctaLabel} <span aria-hidden="true">→</span></Link>
              </div>
            </article>
          );
        })}
      </div>

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

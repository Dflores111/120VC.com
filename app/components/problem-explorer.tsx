"use client";

/* eslint-disable @next/next/no-img-element -- Local editorial assets are rendered by vinext. */
import Link from "@/app/components/native-link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import {
  isProblemConditionId,
  problemConditions,
  type ProblemCondition,
  type ProblemConditionId,
  type ProblemMode,
} from "../data/primary-experience";
import { ConditionIcon } from "./condition-icon";
import { DiagnosticLensIcon } from "./diagnostic-lens-icon";
import { useHydratedReducedMotion } from "./use-hydrated-reduced-motion";
import { useScrollScene } from "./use-scroll-scene";

type ProblemExplorerProps = {
  initialCondition?: ProblemConditionId;
  compact?: boolean;
  syncUrl?: boolean;
};

const actionOrder: readonly ProblemMode[] = ["understand", "work", "help"];

function pushSelection(condition: ProblemConditionId) {
  const url = new URL(window.location.href);
  url.pathname = "/problems-we-solve";
  url.searchParams.set("condition", condition);
  url.searchParams.delete("mode");
  window.history.pushState({ condition }, "", `${url.pathname}${url.search}${url.hash}`);
}

function ProblemDiagnosticScene({ condition }: { condition: ProblemCondition }) {
  const { activeStep, goToStep, sceneRef, stageRef } = useScrollScene({ stepCount: 3 });
  const labels = ["What you may be seeing", "Why it matters", "What leaders must change"];

  return (
    <>
      <header className="problem-diagnostic-header">
        <div>
          <h3 id={`selected-condition-title-${condition.id}`}>{condition.headline}</h3>
          <p className="problem-diagnostic-explainer">Follow the problem from the signals your team can see to the leadership change that resolves it.</p>
        </div>
      </header>

      <div className="problem-diagnostic-scene scroll-swap-scene" ref={sceneRef} style={{ "--scroll-scene-steps": 3 } as CSSProperties}>
        <div className="problem-diagnostic-stage scroll-swap-stage" ref={stageRef}>
          <nav className="problem-story-nav" aria-label={`Move through the diagnosis for ${condition.label}`}>
            <p aria-live="polite"><strong>{String(activeStep + 1).padStart(2, "0")}</strong> / 03 <span>{labels[activeStep]}</span></p>
            <div>
              {labels.map((label, index) => (
                <button key={label} type="button" aria-label={`Go to ${label}`} aria-current={activeStep === index ? "step" : undefined} onClick={() => goToStep(index)}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </button>
              ))}
            </div>
          </nav>

          <ol className="problem-diagnostic-sequence" aria-label={`Three-part diagnosis for ${condition.label}`}>
            <li className="problem-diagnostic-step problem-diagnostic-step-signals scroll-swap-panel" aria-hidden={activeStep !== 0} data-active={activeStep === 0 ? "true" : "false"} inert={activeStep !== 0}>
              <header><span>01</span><div className="problem-detail-heading"><DiagnosticLensIcon lens="signals" /><h4>What you may be seeing</h4></div></header>
              <ul>{condition.signals.map((signal) => <li key={signal}>{signal}</li>)}</ul>
            </li>
            <li className="problem-diagnostic-step problem-diagnostic-step-impact scroll-swap-panel" aria-hidden={activeStep !== 1} data-active={activeStep === 1 ? "true" : "false"} inert={activeStep !== 1}>
              <header><span>02</span><div className="problem-detail-heading"><DiagnosticLensIcon lens="impact" /><h4>Why it matters</h4></div></header>
              <p>{condition.cost}</p>
            </li>
            <li className="problem-diagnostic-step problem-diagnostic-step-change scroll-swap-panel" aria-hidden={activeStep !== 2} data-active={activeStep === 2 ? "true" : "false"} inert={activeStep !== 2}>
              <header><span>03</span><div className="problem-detail-heading"><DiagnosticLensIcon lens="change" /><h4>What leaders must change</h4></div></header>
              <p>{condition.change}</p>
            </li>
          </ol>
          <p className="scroll-swap-cue" aria-hidden="true">{activeStep === 2 ? "Continue" : "Scroll to advance"}<span data-direction="down">↓</span></p>
        </div>
      </div>
    </>
  );
}

export function ProblemExplorer({ initialCondition = "strategy-drift", compact = false, syncUrl = true }: ProblemExplorerProps) {
  const reduceMotion = useHydratedReducedMotion();
  const [selected, setSelected] = useState<ProblemConditionId>(initialCondition);
  const [preview, setPreview] = useState<ProblemConditionId | null>(null);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [selectionAnchor, setSelectionAnchor] = useState<number | null>(null);
  const controls = useRef<Array<HTMLButtonElement | null>>([]);
  const cards = useRef<Array<HTMLElement | null>>([]);
  const rail = useRef<HTMLDivElement | null>(null);
  const detail = useRef<HTMLDivElement | null>(null);
  const condition = useMemo(() => problemConditions.find((item) => item.id === selected) || problemConditions[0], [selected]);

  useEffect(() => {
    if (!syncUrl) return;
    const handlePopState = () => {
      const next = new URLSearchParams(window.location.search).get("condition") || undefined;
      setSelected(isProblemConditionId(next) ? next : initialCondition);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [initialCondition, syncUrl]);

  useEffect(() => {
    const element = rail.current;
    if (!element) return;

    const updateScrollState = () => {
      const maxScroll = Math.max(0, element.scrollWidth - element.clientWidth);
      setAtStart(element.scrollLeft <= 4);
      setAtEnd(maxScroll - element.scrollLeft <= 4);

      const nearest = cards.current.reduce((best, card, index) => {
        if (!card) return best;
        const distance = Math.abs(card.offsetLeft - element.scrollLeft);
        return distance < best.distance ? { index, distance } : best;
      }, { index: 0, distance: Number.POSITIVE_INFINITY });
      setVisibleIndex(nearest.index);

      const selectedIndex = problemConditions.findIndex((item) => item.id === selected);
      const selectedCard = cards.current[selectedIndex];
      if (selectedCard) {
        const cardCenter = selectedCard.offsetLeft + selectedCard.offsetWidth / 2 - element.scrollLeft;
        setSelectionAnchor(Math.max(24, Math.min(element.clientWidth - 24, cardCenter)));
      }
    };

    updateScrollState();
    element.addEventListener("scroll", updateScrollState, { passive: true });
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(element);
    return () => {
      element.removeEventListener("scroll", updateScrollState);
      observer.disconnect();
    };
  }, [selected]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const index = problemConditions.findIndex((item) => item.id === selected);
      const element = rail.current;
      const card = cards.current[index];
      if (!element || !card) return;
      const centeredLeft = card.offsetLeft - (element.clientWidth - card.offsetWidth) / 2;
      element.scrollTo({ left: Math.max(0, centeredLeft), behavior: reduceMotion ? "auto" : "smooth" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [reduceMotion, selected]);

  function selectCondition(id: ProblemConditionId) {
    setSelected(id);
    if (syncUrl) pushSelection(id);
    window.dispatchEvent(new CustomEvent("120vc:explorer-selection", { detail: { kind: "condition", value: id, page: window.location.pathname } }));
    window.requestAnimationFrame(() => {
      detail.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  }

  function previewFromPointer(id: ProblemConditionId, pointerType: string) {
    if (pointerType !== "mouse") return;
    setPreview(id);
    window.dispatchEvent(new CustomEvent("120vc:explorer-reveal", { detail: { kind: "condition-impact", value: id, page: window.location.pathname } }));
  }

  function scrollToCondition(index: number) {
    const next = Math.max(0, Math.min(problemConditions.length - 1, index));
    cards.current[next]?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest", inline: "start" });
  }

  function moveFocus(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % problemConditions.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + problemConditions.length) % problemConditions.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = problemConditions.length - 1;
    if (next === null) return;
    event.preventDefault();
    controls.current[next]?.focus();
  }

  const motionProps = reduceMotion
    ? { initial: false as const }
    : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: { duration: 0.26 } };

  return (
    <div className={`problem-explorer problem-explorer-v2 ${compact ? "problem-explorer-compact" : "problem-explorer-full"}`}>
      <div className="problem-condition-browser" data-at-start={atStart ? "true" : "false"} data-at-end={atEnd ? "true" : "false"}>
        <div className="problem-condition-browser-toolbar">
          <p><strong>{visibleIndex + 1}</strong> / {problemConditions.length}</p>
          <span>Scroll, swipe, or use the arrows to see all five problems.</span>
          <div aria-label="Browse execution problems">
            <button type="button" aria-label="Previous execution problem" disabled={atStart} onClick={() => scrollToCondition(visibleIndex - 1)}>←</button>
            <button type="button" aria-label="Next execution problem" disabled={atEnd} onClick={() => scrollToCondition(visibleIndex + 1)}>→</button>
          </div>
        </div>
        <div className="problem-condition-rail-window horizontal-card-rail-window" data-at-start={atStart ? "true" : "false"} data-at-end={atEnd ? "true" : "false"}>
          <div className="problem-condition-rail" role="region" aria-label="Five execution problems" ref={rail}>
            {problemConditions.map((item, index) => {
          const isFlipped = preview === item.id;
          return (
          <article
            className="problem-condition-card"
            key={item.id}
            ref={(node) => { cards.current[index] = node; }}
            data-condition={item.id}
            data-selected={selected === item.id ? "true" : "false"}
            data-flipped={isFlipped ? "true" : "false"}
            onPointerEnter={(event) => previewFromPointer(item.id, event.pointerType)}
            onPointerLeave={(event) => {
              if (event.pointerType === "mouse") setPreview(null);
            }}
            onFocusCapture={(event) => {
              if (!(event.target instanceof HTMLElement) || !event.target.classList.contains("problem-condition-select-control") || !event.target.matches(":focus-visible")) return;
              setPreview(item.id);
            }}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPreview(null);
            }}
            onKeyDownCapture={(event) => {
              if (event.key !== "Escape" || !isFlipped) return;
              event.preventDefault();
              setPreview(null);
            }}
          >
            <div className="problem-condition-flip-frame">
              <div className="problem-condition-flip-inner">
                <div className="problem-condition-card-face problem-condition-card-front" aria-hidden={isFlipped}>
                  <span className="problem-condition-card-image"><img src={item.image.src} alt="" width={item.image.width} height={item.image.height} style={{ objectPosition: item.image.position }} /></span>
                  <div className="problem-condition-card-copy">
                    <ConditionIcon name={item.id} />
                    <strong>{item.label}</strong>
                    <p>{item.preview}</p>
                  </div>
                </div>
                <div className="problem-condition-card-face problem-condition-card-back" aria-hidden={!isFlipped}>
                  <p className="problem-condition-back-title">{item.label}</p>
                  <div><strong>What it costs</strong><p>{item.cost}</p></div>
                  <div><strong>What must change</strong><p>{item.change}</p></div>
                </div>
              </div>
            </div>
            <div className="problem-condition-card-actions">
              <span className="problem-condition-hover-hint" aria-hidden="true">Hover to see impact <i>↻</i></span>
              <button
                className="problem-condition-select-control"
                type="button"
                data-condition={item.id}
                data-selected={selected === item.id ? "true" : "false"}
                aria-pressed={selected === item.id}
                aria-controls="selected-condition-detail"
                onClick={() => selectCondition(item.id)}
                onKeyDown={(event) => moveFocus(event, index)}
                ref={(node) => { controls.current[index] = node; }}
                aria-label={`${selected === item.id ? "Details shown below for" : "View details below for"} ${item.label}`}
              >
                {selected === item.id ? "Details shown" : "View details"} <span aria-hidden="true" data-direction="down">↓</span>
              </button>
            </div>
          </article>
          );
            })}
          </div>
          <span className="problem-condition-edge-fade horizontal-card-edge-fade horizontal-card-edge-fade-left" aria-hidden="true" />
          <span className="problem-condition-edge-fade horizontal-card-edge-fade horizontal-card-edge-fade-right" aria-hidden="true" />
        </div>
      </div>

      <div
        className="problem-selection-connector"
        style={{ "--selection-anchor": selectionAnchor === null ? "50%" : `${selectionAnchor}px` } as CSSProperties}
        aria-hidden="true"
      >
        <i>↓</i>
      </div>

      <p className="sr-only" aria-live="polite">Showing {condition.label}</p>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          className="problem-selection-result"
          id="selected-condition-detail"
          key={condition.id}
          ref={detail}
          data-selected-condition={condition.id}
          {...motionProps}
        >
          <div className="problem-selection-status">
            <ConditionIcon name={condition.id} />
            <div>
              <span>Your selected problem:</span>
              <strong>{condition.label}</strong>
            </div>
            <i aria-hidden="true">↓</i>
          </div>

          <article className="problem-condition-detail" aria-labelledby={`selected-condition-title-${condition.id}`}>
            {compact ? (
              <Link className="button button-primary" href={`/problems-we-solve?condition=${condition.id}`}>Explore this breakdown <span aria-hidden="true">→</span></Link>
            ) : (
              <>
                <ProblemDiagnosticScene condition={condition} key={condition.id} />

                <section className="problem-next-steps" aria-labelledby={`problem-next-steps-${condition.id}`}>
                  <header>
                    <h4 id={`problem-next-steps-${condition.id}`}>Choose the next step that fits your situation.</h4>
                    <p>Learn why the problem persists, use a practical tool now, or talk with 120VC about changing the system around the work.</p>
                  </header>
                  <div className="problem-action-grid" aria-label={`Next steps for ${condition.label}`}>
                    {actionOrder.map((mode) => {
                      const path = condition.paths[mode];
                      const content = <><span><strong>{path.label}</strong><small>{path.title}</small><p>{path.description}</p></span><i aria-hidden="true">{path.external ? "↗" : "→"}</i></>;
                      return path.external
                        ? <a href={path.href} className="problem-action-card" data-action-mode={mode} key={mode}>{content}</a>
                        : <Link href={path.href} className="problem-action-card" data-action-mode={mode} key={mode}>{content}</Link>;
                    })}
                  </div>
                </section>
              </>
            )}
          </article>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

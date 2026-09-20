"use client";

/* eslint-disable @next/next/no-img-element -- Local editorial assets are rendered by vinext. */
import Link from "@/app/components/native-link";
import { useCallback, useEffect, useRef, useState } from "react";
import { problemConditions, type ProblemConditionId } from "../data/primary-experience";
import { track120vcEvent } from "./analytics-bridge";
import { useHydratedReducedMotion } from "./use-hydrated-reduced-motion";

export function PainPointCarousel() {
  const reduceMotion = useHydratedReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const currentRef = useRef(0);
  const hoveredRef = useRef(new Set<ProblemConditionId>());
  const suppressFocusPreviewRef = useRef(false);
  const [current, setCurrent] = useState(0);
  const [locked, setLocked] = useState<ProblemConditionId | null>(null);
  const [preview, setPreview] = useState<ProblemConditionId | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const activeFlip = locked ?? preview;

  const updateCurrent = useCallback((next: number, method: "control" | "scroll" | "keyboard") => {
    if (currentRef.current === next) return;
    currentRef.current = next;
    setCurrent(next);
    track120vcEvent({
      event: "pain_carousel_navigated",
      section: "pain",
      selection: `${method}:${problemConditions[next].id}`,
    });
  }, []);

  const goTo = useCallback((index: number, focusCard = false, method: "control" | "keyboard" = "control") => {
    const next = Math.max(0, Math.min(problemConditions.length - 1, index));
    const card = cardRefs.current[next];
    card?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "start",
    });
    updateCurrent(next, method);
    if (focusCard) requestAnimationFrame(() => card?.querySelector<HTMLButtonElement>(".pain-card-disclosure")?.focus());
  }, [reduceMotion, updateCurrent]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    let frame = 0;
    const handleScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const maxScroll = Math.max(0, rail.scrollWidth - rail.clientWidth);
        setAtStart(rail.scrollLeft <= 4);
        setAtEnd(maxScroll - rail.scrollLeft <= 4);

        const railLeft = rail.getBoundingClientRect().left;
        let closest = 0;
        let distance = Number.POSITIVE_INFINITY;
        cardRefs.current.forEach((card, index) => {
          if (!card) return;
          const nextDistance = Math.abs(card.getBoundingClientRect().left - railLeft);
          if (nextDistance < distance) {
            distance = nextDistance;
            closest = index;
          }
        });
        updateCurrent(closest, "scroll");
      });
    };
    handleScroll();
    rail.addEventListener("scroll", handleScroll, { passive: true });
    const observer = new ResizeObserver(handleScroll);
    observer.observe(rail);
    return () => {
      window.cancelAnimationFrame(frame);
      rail.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [updateCurrent]);

  function openCard(id: ProblemConditionId, index: number) {
    setLocked(id);
    setPreview(null);
    track120vcEvent({ event: "pain_card_flipped", section: "pain", selection: id });
    requestAnimationFrame(() => cardRefs.current[index]?.querySelector<HTMLAnchorElement>(".pain-card-back a")?.focus());
  }

  function closeCard(index: number) {
    const id = problemConditions[index].id;
    setLocked(null);
    setPreview(null);
    suppressFocusPreviewRef.current = true;
    track120vcEvent({ event: "pain_card_flipped", section: "pain", selection: `${id}:closed` });
    requestAnimationFrame(() => cardRefs.current[index]?.querySelector<HTMLButtonElement>(".pain-card-disclosure")?.focus());
  }

  function previewFromPointer(id: ProblemConditionId, pointerType: string) {
    if (pointerType !== "mouse" || locked) return;
    setPreview(id);
    if (hoveredRef.current.has(id)) return;
    hoveredRef.current.add(id);
    track120vcEvent({ event: "pain_card_hovered", section: "pain", selection: id });
  }

  return (
    <div className="pain-carousel" data-reduced-motion={reduceMotion ? "true" : "false"}>
      <div className="pain-carousel-toolbar">
        <p aria-live="polite"><strong>{current + 1}</strong> / {problemConditions.length}</p>
        <div className="pain-carousel-arrows" aria-label="Pain point carousel controls">
          <button type="button" onClick={() => goTo(current - 1)} disabled={current === 0} aria-label="Previous pain point">←</button>
          <button type="button" onClick={() => goTo(current + 1)} disabled={current === problemConditions.length - 1} aria-label="Next pain point">→</button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{activeFlip ? `Details open for ${problemConditions.find((condition) => condition.id === activeFlip)?.label}.` : "Condition details closed."}</p>

      <div className="pain-carousel-rail-window horizontal-card-rail-window" data-at-start={atStart ? "true" : "false"} data-at-end={atEnd ? "true" : "false"}>
        <div
          className="pain-carousel-rail"
          ref={railRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Five common execution conditions"
        >
          {problemConditions.map((condition, index) => {
          const isFlipped = activeFlip === condition.id;
          const isLocked = locked === condition.id;
          const detailId = `home-pain-detail-${condition.id}`;
          return (
            <article
              className="pain-card"
              data-flipped={isFlipped ? "true" : "false"}
              data-locked={isLocked ? "true" : "false"}
              key={condition.id}
              ref={(element) => { cardRefs.current[index] = element; }}
              onPointerEnter={(event) => previewFromPointer(condition.id, event.pointerType)}
              onPointerLeave={(event) => {
                if (event.pointerType === "mouse" && !locked) setPreview(null);
              }}
              onFocusCapture={(event) => {
                if (!(event.target instanceof HTMLElement) || !event.target.classList.contains("pain-card-disclosure") || !event.target.matches(":focus-visible") || locked) return;
                if (suppressFocusPreviewRef.current) {
                  suppressFocusPreviewRef.current = false;
                  return;
                }
                setPreview(condition.id);
              }}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null) && !locked) setPreview(null);
              }}
              onKeyDownCapture={(event) => {
                if (event.key !== "Escape" || !isFlipped) return;
                event.preventDefault();
                closeCard(index);
              }}
            >
              <div className="pain-card-inner">
                <div
                  className="pain-card-face pain-card-front"
                  aria-hidden={isLocked || undefined}
                  style={{ cursor: "default" }}
                >
                  <span className="pain-card-image">
                    <img
                      src={condition.image.src}
                      alt={condition.image.alt}
                      width={condition.image.width}
                      height={condition.image.height}
                      loading="lazy"
                      style={{ objectPosition: condition.image.position }}
                    />
                  </span>
                  <span className="pain-card-copy">
                    <strong>{condition.headline}</strong>
                    <button
                      className="pain-card-disclosure home-solution-disclosure"
                      type="button"
                      aria-controls={detailId}
                      aria-expanded={isFlipped}
                      tabIndex={isLocked ? -1 : 0}
                      onClick={() => openCard(condition.id, index)}
                      onKeyDown={(event) => {
                        if (event.key === "ArrowLeft") {
                          event.preventDefault();
                          goTo(index - 1, true, "keyboard");
                        } else if (event.key === "ArrowRight") {
                          event.preventDefault();
                          goTo(index + 1, true, "keyboard");
                        } else if (event.key === "Home") {
                          event.preventDefault();
                          goTo(0, true, "keyboard");
                        } else if (event.key === "End") {
                          event.preventDefault();
                          goTo(problemConditions.length - 1, true, "keyboard");
                        }
                      }}
                    >
                      See what this is costing <span aria-hidden="true">↻</span>
                    </button>
                  </span>
                </div>

                <div
                  className="pain-card-face pain-card-back"
                  id={detailId}
                  aria-hidden={!isFlipped}
                >
                  <strong>{condition.headline}</strong>
                  <p className="pain-card-cost">{condition.cost}</p>
                  <p className="pain-card-change">{condition.change}</p>
                  <Link href={`/problems-we-solve?condition=${condition.id}`} tabIndex={isFlipped ? 0 : -1} data-analytics-event="pain_problem_selected" data-analytics-section="pain" data-analytics-selection={condition.id}>Explore this problem <span aria-hidden="true">→</span></Link>
                  <button type="button" tabIndex={isFlipped ? 0 : -1} onClick={() => closeCard(index)}>Back to condition <span aria-hidden="true">↩</span></button>
                </div>
              </div>
            </article>
          );
          })}
        </div>
        <span className="horizontal-card-edge-fade horizontal-card-edge-fade-left" aria-hidden="true" />
        <span className="horizontal-card-edge-fade horizontal-card-edge-fade-right" aria-hidden="true" />
      </div>
    </div>
  );
}

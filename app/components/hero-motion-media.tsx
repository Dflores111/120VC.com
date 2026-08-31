"use client";

/* eslint-disable @next/next/no-img-element -- Local editorial assets are rendered by vinext. */
import { useEffect, useState } from "react";
import { useHydratedReducedMotion } from "./use-hydrated-reduced-motion";

const heroImage = {
  src: "/images/story/team-working-together.jpg",
  position: "50% 50%",
} as const;

export function HeroMotionMedia() {
  const reduceMotion = useHydratedReducedMotion();
  const [paused, setPaused] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const updateVisibility = () => setPageHidden(document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  const motionPaused = Boolean(reduceMotion || paused || pageHidden || completed);

  function controlMotion() {
    if (completed) {
      setPaused(false);
      setCompleted(false);
      setRun((current) => current + 1);
      return;
    }
    setPaused((current) => !current);
  }

  return (
    <figure
      className="hero-motion-media"
      aria-label="Leaders working through priorities and decisions together. Illustrative photography."
      data-paused={motionPaused ? "true" : "false"}
      data-complete={completed ? "true" : "false"}
    >
      <div className="hero-motion-frame" aria-hidden="true">
        <img
          key={run}
          alt=""
          className="is-active"
          height={1008}
          loading="eager"
          src={heroImage.src}
          style={{ objectPosition: heroImage.position }}
          width={1800}
          onAnimationEnd={() => setCompleted(true)}
        />
      </div>
      {!reduceMotion && (
        <button
          className="hero-motion-control"
          type="button"
          aria-pressed={paused}
          onClick={controlMotion}
        >
          <span aria-hidden="true">{completed || paused ? "▶" : "Ⅱ"}</span>
          {completed ? "Replay motion" : paused ? "Play motion" : "Pause motion"}
        </button>
      )}
      <figcaption>Illustrative photography</figcaption>
    </figure>
  );
}

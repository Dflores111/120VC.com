"use client";

import { useEffect, useState } from "react";
import { useHydratedReducedMotion } from "./use-hydrated-reduced-motion";

const phrases = ["CLEAR PRIORITIES", "DECISIONS THAT HOLD", "TEAMS THAT DELIVER"] as const;
const statement = phrases.join(" • ");

function StatementGroup() {
  return (
    <span className="home-kinetic-group">
      {phrases.map((phrase) => (
        <span className="home-kinetic-pair" key={phrase}>
          <span className="home-kinetic-phrase">{phrase}</span>
          <span className="home-kinetic-separator" aria-hidden="true">•</span>
        </span>
      ))}
    </span>
  );
}

export function KineticStatement() {
  const reduceMotion = useHydratedReducedMotion();
  const [paused, setPaused] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setPageHidden(document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  const motionPaused = reduceMotion || paused || pageHidden;

  return (
    <div
      className="home-kinetic-statement"
      data-paused={motionPaused ? "true" : "false"}
      data-reduced-motion={reduceMotion ? "true" : "false"}
    >
      <p className="sr-only">{statement}</p>
      <div className="home-kinetic-window" aria-hidden="true">
        <div className="home-kinetic-track">
          <StatementGroup />
          <StatementGroup />
        </div>
      </div>
      {!reduceMotion && (
        <button
          className="home-marquee-control"
          type="button"
          aria-pressed={paused}
          onClick={() => setPaused((current) => !current)}
        >
          <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
          {paused ? "Play statement" : "Pause statement"}
        </button>
      )}
    </div>
  );
}

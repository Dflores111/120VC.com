"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useHydratedReducedMotion } from "./use-hydrated-reduced-motion";

export const heroOutcomes = [
  "strategy into execution.",
  "priorities into action.",
  "decisions into ownership.",
  "work into outcomes.",
] as const;

const OUTCOME_DURATION_MS = 2400;

export function HeroOutcomeRotation() {
  const reduceMotion = useHydratedReducedMotion();
  const [index, setIndex] = useState(0);
  const [pageHidden, setPageHidden] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setPageHidden(document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    if (pageHidden || index >= heroOutcomes.length - 1) return;

    const timer = window.setTimeout(() => {
      setIndex((current) => Math.min(current + 1, heroOutcomes.length - 1));
    }, OUTCOME_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [index, pageHidden, reduceMotion]);

  const visibleIndex = reduceMotion ? 0 : index;

  return (
    <span className="home-hero-outcome-rotation" aria-hidden="true" data-complete={visibleIndex === heroOutcomes.length - 1 ? "true" : "false"}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          className="home-hero-outcome headline-keyword headline-keyword-on-dark"
          key={heroOutcomes[visibleIndex]}
          initial={reduceMotion ? false : { opacity: 0, y: "45%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: "-35%" }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.5, ease: [0.2, 0.72, 0.2, 1] }}
        >
          {heroOutcomes[visibleIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

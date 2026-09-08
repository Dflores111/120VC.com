"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useHydratedReducedMotion } from "./use-hydrated-reduced-motion";

type ScrollSceneOptions = {
  stepCount: number;
  initialStep?: number;
  enabled?: boolean;
  forceReducedMotion?: boolean;
  onStepChange?: (step: number) => void;
};

function clampStep(step: number, stepCount: number) {
  return Math.max(0, Math.min(stepCount - 1, step));
}

function sceneMetrics(scene: HTMLElement, stage: HTMLElement) {
  const stickyTop = Number.parseFloat(window.getComputedStyle(stage).top) || 0;
  const sceneTop = window.scrollY + scene.getBoundingClientRect().top;
  const start = sceneTop - stickyTop;
  const range = Math.max(1, scene.offsetHeight - stage.offsetHeight);
  return { start, range };
}

export function useScrollScene({
  stepCount,
  initialStep = 0,
  enabled = true,
  forceReducedMotion = false,
  onStepChange,
}: ScrollSceneOptions) {
  const reduceMotion = useHydratedReducedMotion() || forceReducedMotion;
  const initialActiveStep = clampStep(initialStep, stepCount);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef(initialActiveStep);
  const onStepChangeRef = useRef(onStepChange);
  const [activeStep, setActiveStep] = useState(initialActiveStep);

  useEffect(() => { onStepChangeRef.current = onStepChange; }, [onStepChange]);

  const setStep = useCallback((nextStep: number) => {
    const next = clampStep(nextStep, stepCount);
    if (next === activeRef.current) return;
    activeRef.current = next;
    setActiveStep(next);
    onStepChangeRef.current?.(next);
  }, [stepCount]);

  const goToStep = useCallback((nextStep: number) => {
    const scene = sceneRef.current;
    const stage = stageRef.current;
    const next = clampStep(nextStep, stepCount);
    setStep(next);
    if (!scene || !stage) return;
    const { start, range } = sceneMetrics(scene, stage);
    const progress = stepCount <= 1 ? 0 : next / (stepCount - 1);
    window.scrollTo({ top: start + range * progress, behavior: reduceMotion ? "auto" : "smooth" });
  }, [reduceMotion, setStep, stepCount]);

  useEffect(() => {
    const scene = sceneRef.current;
    const stage = stageRef.current;
    if (!scene || !stage || !enabled) {
      scene?.removeAttribute("data-scroll-scene-ready");
      return;
    }

    scene.dataset.scrollSceneReady = "true";
    scene.dataset.reducedMotion = reduceMotion ? "true" : "false";
    let frame = 0;
    const update = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const { start, range } = sceneMetrics(scene, stage);
        const progress = Math.max(0, Math.min(1, (window.scrollY - start) / range));
        setStep(Math.round(progress * (stepCount - 1)));
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      scene.removeAttribute("data-scroll-scene-ready");
      scene.removeAttribute("data-reduced-motion");
    };
  }, [enabled, reduceMotion, setStep, stepCount]);

  return { activeStep, goToStep, reduceMotion, sceneRef, stageRef };
}

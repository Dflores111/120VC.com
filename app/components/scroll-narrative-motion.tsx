"use client";

import { useEffect } from "react";

const ROLE_ATTRIBUTE = "data-scroll-role";

function markRole(element: Element | null, role: string, order?: number) {
  if (!(element instanceof HTMLElement)) return;
  element.setAttribute(ROLE_ATTRIBUTE, role);
  if (typeof order === "number") element.style.setProperty("--scroll-order", String(order));
}

function prepareScene(scene: HTMLElement) {
  const headline = scene.querySelector<HTMLElement>("h1, h2");
  if (!headline) return false;

  markRole(headline, "headline");

  const headlineGroup = headline.parentElement;
  const supportingCopy = headlineGroup
    ? Array.from(headlineGroup.children).filter((element) => element.matches("p"))
    : [];
  supportingCopy.slice(0, 2).forEach((element, index) => markRole(element, "copy", index));

  scene.querySelectorAll<HTMLElement>(".headline-keyword").forEach((element, index) => {
    markRole(element, "keyword", index);
  });

  const visual = scene.querySelector<HTMLElement>(".image-mask, figure");
  markRole(visual, "visual");

  const sequenceItems = scene.querySelectorAll<HTMLElement>([
    ".home-solution-grid > article",
    ".system-first-value-list > article",
    ".content-list > li",
    ".content-card-grid > a",
    ".related-grid > a",
    ".results-methodology-list > details",
  ].join(","));
  sequenceItems.forEach((element, index) => markRole(element, "sequence-item", Math.min(index, 5)));

  scene.dataset.scrollAccent = scene.classList.contains("content-section") ? "index" : "line";
  return true;
}

function clearScene(scene: HTMLElement) {
  delete scene.dataset.scrollState;
  delete scene.dataset.scrollAccent;
  scene.querySelectorAll<HTMLElement>(`[${ROLE_ATTRIBUTE}]`).forEach((element) => {
    element.removeAttribute(ROLE_ATTRIBUTE);
    element.style.removeProperty("--scroll-order");
  });
}

export function ScrollNarrativeMotion() {
  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forceReducedMotionReview = process.env.NODE_ENV !== "production"
      && new URLSearchParams(window.location.search).get("motion") === "reduce";
    const root = document.documentElement;
    const scenes = Array.from(document.querySelectorAll<HTMLElement>("main [data-major-section], main [data-scroll-reveal-section]"));
    const storySteps = Array.from(document.querySelectorAll<HTMLElement>("main [data-scroll-step]"));
    let observer: IntersectionObserver | null = null;
    let stepObserver: IntersectionObserver | null = null;

    const revealAll = () => {
      observer?.disconnect();
      observer = null;
      stepObserver?.disconnect();
      stepObserver = null;
      root.classList.remove("scroll-narrative-ready");
      scenes.forEach((scene) => { scene.dataset.scrollState = "visible"; });
      storySteps.forEach((step) => { step.dataset.scrollStepState = "visible"; });
    };

    const install = () => {
      observer?.disconnect();
      observer = null;
      stepObserver?.disconnect();
      stepObserver = null;

      if (forceReducedMotionReview || motionPreference.matches || !("IntersectionObserver" in window)) {
        revealAll();
        return;
      }

      const eligibleScenes = scenes.filter((scene) => {
        const isHero = Boolean(scene.querySelector("h1"));
        const isClosingAction = scene.dataset.journeyStage === "act";
        if (isHero || isClosingAction) {
          scene.dataset.scrollState = "visible";
          return false;
        }
        return prepareScene(scene);
      });

      root.classList.add("scroll-narrative-ready");
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const scene = entry.target as HTMLElement;
          scene.dataset.scrollState = "visible";
          observer?.unobserve(scene);
        });
      }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });

      stepObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const step = entry.target as HTMLElement;
          step.dataset.scrollStepState = "visible";
          stepObserver?.unobserve(step);
        });
      }, { rootMargin: "0px 0px -16% 0px", threshold: 0.12 });

      eligibleScenes.forEach((scene) => {
        const bounds = scene.getBoundingClientRect();
        if (bounds.top < window.innerHeight * 0.9 && bounds.bottom > 0) {
          scene.dataset.scrollState = "visible";
        } else {
          scene.dataset.scrollState = "pending";
          observer?.observe(scene);
        }
      });

      storySteps.forEach((step) => {
        const bounds = step.getBoundingClientRect();
        if (bounds.top < window.innerHeight * 0.84 && bounds.bottom > 0) {
          step.dataset.scrollStepState = "visible";
        } else {
          step.dataset.scrollStepState = "pending";
          stepObserver?.observe(step);
        }
      });
    };

    install();
    motionPreference.addEventListener("change", install);

    return () => {
      observer?.disconnect();
      stepObserver?.disconnect();
      motionPreference.removeEventListener("change", install);
      root.classList.remove("scroll-narrative-ready");
      scenes.forEach(clearScene);
      storySteps.forEach((step) => { delete step.dataset.scrollStepState; });
    };
  }, []);

  return null;
}

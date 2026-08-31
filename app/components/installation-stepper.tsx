"use client";

/* eslint-disable @next/next/no-img-element -- Local editorial assets are rendered by vinext. */
import { useRef, useState } from "react";
import { track120vcEvent } from "./analytics-bridge";
import { useHydratedReducedMotion } from "./use-hydrated-reduced-motion";

export type InstallationStep = {
  number: string;
  title: string;
  description: string;
  insideWork: string;
  value: string;
  image: string;
  imageAlt: string;
  width: number;
  height: number;
  position?: string;
};

export function InstallationStepper({ steps }: { steps: readonly InstallationStep[] }) {
  const reduceMotion = useHydratedReducedMotion();
  const [active, setActive] = useState(0);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function choose(index: number, method: "pointer" | "keyboard") {
    const next = Math.max(0, Math.min(steps.length - 1, index));
    if (next === active) {
      buttonRefs.current[next]?.focus();
      return;
    }
    setActive(next);
    buttonRefs.current[next]?.focus();
    track120vcEvent({ event: "how_it_works_step_selected", section: "how-it-works", selection: `${method}:${steps[next].title}` });
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      choose((active + 1) % steps.length, "keyboard");
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      choose((active - 1 + steps.length) % steps.length, "keyboard");
    } else if (event.key === "Home") {
      event.preventDefault();
      choose(0, "keyboard");
    } else if (event.key === "End") {
      event.preventDefault();
      choose(steps.length - 1, "keyboard");
    }
  }

  const current = steps[active];

  return (
    <div className="home-stepper" data-reduced-motion={reduceMotion ? "true" : "false"}>
      <div className="home-stepper-tabs" role="tablist" aria-label="120VC installation sequence" tabIndex={-1} onKeyDown={onKeyDown}>
        {steps.map((step, index) => (
          <button
            ref={(element) => { buttonRefs.current[index] = element; }}
            id={`installation-step-${index}`}
            key={step.number}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls="installation-step-panel"
            tabIndex={active === index ? 0 : -1}
            onClick={() => choose(index, "pointer")}
          >
            <span className="home-stepper-number">{step.number}</span>
            <strong>{step.title}</strong>
            <span className="home-stepper-tab-summary">{step.description}</span>
            <span className="home-stepper-tab-value">
              <b>What this gives you</b>
              {step.value}
            </span>
          </button>
        ))}
      </div>

      <div
        className="home-stepper-panel"
        id="installation-step-panel"
        role="tabpanel"
        aria-labelledby={`installation-step-${active}`}
        tabIndex={0}
      >
        <figure>
          <img
            src={current.image}
            alt={current.imageAlt}
            width={current.width}
            height={current.height}
            style={{ objectPosition: current.position }}
          />
        </figure>
        <div className="home-stepper-panel-copy">
          <h3>{current.title}</h3>
          <p className="home-stepper-description">{current.description}</p>
          <dl className="home-stepper-value">
            <div>
              <dt>Inside the work</dt>
              <dd>{current.insideWork}</dd>
            </div>
            <div>
              <dt>What this gives you</dt>
              <dd>{current.value}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

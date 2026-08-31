"use client";

/* eslint-disable @next/next/no-img-element -- Supplied normalized brand marks are local static assets. */
import { useEffect, useState } from "react";
import { approvedExperienceLogos } from "../data/approved-experience-logos";
import { useHydratedReducedMotion } from "./use-hydrated-reduced-motion";

export function LogoMarquee() {
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
    <section
      className="home-logo-marquee"
      aria-labelledby="home-logo-marquee-title"
      data-paused={motionPaused ? "true" : "false"}
      data-reduced-motion={reduceMotion ? "true" : "false"}
    >
      <div className="home-logo-marquee-heading">
        <p id="home-logo-marquee-title">120VC has worked with leaders and teams at</p>
        {!reduceMotion && (
          <button
            type="button"
            aria-pressed={paused}
            aria-label={paused ? "Resume client logo movement" : "Pause client logo movement"}
            onClick={() => setPaused((current) => !current)}
          >
            <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
            {paused ? "Resume movement" : "Pause movement"}
          </button>
        )}
      </div>

      <ul className="sr-only">
        {approvedExperienceLogos.map((logo) => <li key={logo.name}>{logo.name}</li>)}
      </ul>

      <div className="home-logo-marquee-window" aria-hidden="true">
        <div className="home-logo-marquee-track">
          {[0, 1].map((copy) => (
            <div className="home-logo-marquee-group" key={copy}>
              {approvedExperienceLogos.map((logo) => (
                <span className="home-logo-item" data-compact={"compact" in logo && logo.compact ? "true" : "false"} key={`${copy}-${logo.name}`}>
                  <img src={logo.src} alt="" width={600} height={240} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

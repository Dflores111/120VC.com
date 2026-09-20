"use client";

import { useEffect, useRef } from "react";

/** Material Ripple's bounded activation feedback, recast as a 120VC signal ring.
 * It acknowledges a disclosure, not a completed business outcome. */
export function DisclosureCue({ expanded, activated = expanded, reduceMotion, className = "" }: {
  expanded: boolean;
  activated?: boolean;
  reduceMotion: boolean;
  className?: string;
}) {
  const rings = useRef<HTMLSpanElement>(null);
  const previous = useRef(activated);

  useEffect(() => {
    const newlyOpened = activated && !previous.current;
    previous.current = activated;
    if (!newlyOpened || reduceMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // One short response; rapid toggles cancel rather than stack effects.
    const responses = Array.from(rings.current?.children ?? []).map((ring, index) => ring.animate?.([
      { opacity: .65, transform: "scale(.7)" },
      { opacity: .28, transform: "scale(1.35)", offset: .5 },
      { opacity: 0, transform: "scale(1.9)" },
    ], { duration: 620, delay: index * 90, easing: "cubic-bezier(.2,.7,.2,1)" }));
    return () => responses.forEach(response => response?.cancel());
  }, [activated, reduceMotion]);

  return <span className={`disclosure-cue ${className}`} aria-hidden="true" data-expanded={expanded ? "true" : "false"}>
    <span className="disclosure-cue-rings" ref={rings}>
      <span className="disclosure-cue-ring" />
      <span className="disclosure-cue-ring" />
    </span>
    <span className="disclosure-cue-mark">+</span>
  </span>;
}

/** One intact arrow settles forward once. Decorative, not a progress meter. */
export function DisclosureAlignment({ activated, reduceMotion }: { activated: boolean; reduceMotion: boolean }) {
  const trace = useRef<SVGSVGElement>(null);
  const previous = useRef(activated);
  useEffect(() => {
    const newlyOpened = activated && !previous.current;
    previous.current = activated;
    if (!newlyOpened || reduceMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Move the entire mark: the head never drifts away from or scales with the shaft.
    const response = trace.current?.animate?.([
      { transform: "translateX(-6px)", opacity: .35 },
      { transform: "translateX(0)", opacity: 1 },
    ], { duration: 320, easing: "cubic-bezier(.2,.7,.2,1)" });
    return () => response?.cancel();
  }, [activated, reduceMotion]);

  return <svg ref={trace} className="disclosure-alignment" viewBox="0 0 64 16" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 8H58M52 2L58 8L52 14" />
  </svg>;
}

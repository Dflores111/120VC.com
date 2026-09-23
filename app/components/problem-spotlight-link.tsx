"use client";

import type { PointerEvent, ReactNode } from "react";
import Link from "./native-link";
import { useHydratedReducedMotion } from "./use-hydrated-reduced-motion";

/** Mechanism extraction: saved Spotlight Card + supplied Feature32 spotlight.
 * Retains local pointer light / masked border; replaces inert demo containers
 * with one native destination. No global pointer listeners, WebGL, or new deps.
 */
export function ProblemSpotlightLink({ href, children }: {
  href: string;
  children: ReactNode;
}) {
  const reduceMotion = useHydratedReducedMotion();

  function trackPointer(event: PointerEvent<HTMLAnchorElement>) {
    if (reduceMotion || event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
  }

  return (
    <Link href={href} className="homepage-problem-spotlight"
      data-reduced-motion={reduceMotion || undefined} onPointerMove={trackPointer}>
      {children}
    </Link>
  );
}

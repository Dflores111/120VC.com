"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "@/app/components/native-link";
import { useState, type PointerEvent, type ReactNode } from "react";

type Ripple = {
  id: number;
  size: number;
  x: number;
  y: number;
};

export function RippleLink({
  href,
  className = "",
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  function addRipple(event: PointerEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const size = Math.max(bounds.width, bounds.height) * 2;
    const ripple = {
      id: performance.now(),
      size,
      x: event.clientX - bounds.left - size / 2,
      y: event.clientY - bounds.top - size / 2,
    };

    setRipples((current) => [...current, ripple]);
  }

  function removeRipple(id: number) {
    setRipples((current) => current.filter((ripple) => ripple.id !== id));
  }

  return (
    <Link href={href} className={`ripple-link ${className}`} onPointerDown={addRipple}>
      <span className="ripple-label">{children}</span>
      <span className="ripple-layer" aria-hidden="true">
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              className="ripple-wave"
              style={{ width: ripple.size, height: ripple.size, left: ripple.x, top: ripple.y }}
              initial={{ opacity: 0.34, scale: 0 }}
              animate={{ opacity: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.62, ease: [0.2, 0.7, 0.2, 1] }}
              onAnimationComplete={() => removeRipple(ripple.id)}
            />
          ))}
        </AnimatePresence>
      </span>
    </Link>
  );
}

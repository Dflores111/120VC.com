"use client";

import { useEffect, useState } from "react";

export function useHydratedReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forcedForQa = process.env.NODE_ENV !== "production" && new URLSearchParams(window.location.search).get("motion") === "reduce";
    const update = () => setReduceMotion(media.matches || forcedForQa);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduceMotion;
}

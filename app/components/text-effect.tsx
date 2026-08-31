"use client";

import { motion, type Variants } from "motion/react";
import { useHydratedReducedMotion } from "./use-hydrated-reduced-motion";

type TextEffectProps = {
  children: string;
  as?: "h1" | "h2" | "p";
  className?: string;
  id?: string;
  delay?: number;
  trigger?: boolean;
};

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.055 },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.2, 0.72, 0.2, 1] },
  },
};

export function TextEffect({ children, as = "p", className = "", id, delay = 0, trigger = true }: TextEffectProps) {
  const reduceMotion = useHydratedReducedMotion();
  const Tag = as === "h1" ? motion.h1 : as === "h2" ? motion.h2 : motion.p;

  return (
    <Tag
      id={id}
      className={`text-effect ${className}`}
      aria-label={children}
      initial="hidden"
      animate={reduceMotion || trigger ? "visible" : "hidden"}
      variants={{
        ...containerVariants,
        visible: {
          ...containerVariants.visible,
          transition: { staggerChildren: reduceMotion ? 0 : 0.055, delayChildren: reduceMotion ? 0 : delay },
        },
      }}
    >
      {children.split(/(\s+)/).map((segment, index) => (
        /\s+/.test(segment) ? segment : (
          <motion.span
            className="text-effect-word"
            aria-hidden="true"
            variants={reduceMotion ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } } : wordVariants}
            key={`${segment}-${index}`}
          >
            {segment}
          </motion.span>
        )
      ))}
    </Tag>
  );
}

"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

type TextEffectProps = {
  children: string;
  as?: "h1" | "h2" | "p";
  className?: string;
  id?: string;
  delay?: number;
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

export function TextEffect({ children, as = "p", className = "", id, delay = 0 }: TextEffectProps) {
  const reduceMotion = useReducedMotion();
  const Tag = as === "h1" ? motion.h1 : as === "h2" ? motion.h2 : motion.p;

  if (reduceMotion) {
    const StaticTag = as;
    return <StaticTag className={className} id={id}>{children}</StaticTag>;
  }

  return (
    <Tag
      id={id}
      className={`text-effect ${className}`}
      aria-label={children}
      initial="hidden"
      animate="visible"
      variants={{
        ...containerVariants,
        visible: {
          ...containerVariants.visible,
          transition: { staggerChildren: 0.055, delayChildren: delay },
        },
      }}
    >
      {children.split(/(\s+)/).map((segment, index) => (
        /\s+/.test(segment) ? segment : (
          <motion.span
            className="text-effect-word"
            aria-hidden="true"
            variants={wordVariants}
            key={`${segment}-${index}`}
          >
            {segment}
          </motion.span>
        )
      ))}
    </Tag>
  );
}

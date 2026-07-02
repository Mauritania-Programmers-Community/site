"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Vertical offset to animate from (px). Set to 0 with `x` for horizontal reveals. */
  y?: number;
  /** Horizontal offset to animate from (px). */
  x?: number;
  /** Stagger delay in seconds. */
  delay?: number;
  duration?: number;
}

/**
 * Small client island: fades content in when it scrolls into view.
 *
 * The children are server-rendered and passed through, so wrapping a
 * server component in <Reveal> keeps that content OUT of the client bundle
 * while still giving it the entrance animation. Reduced-motion is honored
 * globally via <MotionConfig reducedMotion="user"> in the root layout.
 */
export function Reveal({
  children,
  className,
  y = 20,
  x = 0,
  delay = 0,
  duration = 0.5,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
}

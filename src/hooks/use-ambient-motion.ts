"use client";

import { useReducedMotion } from "framer-motion";
import { useMediaQuery } from "./use-media-query";

/**
 * Whether to run continuous "ambient" background animations
 * (infinite gradient meshes, floating blobs, shimmer loops).
 *
 * These are decorative and paint-bound, so we switch them OFF for:
 *  - users who prefer reduced motion, and
 *  - small / touch screens (mobile smoothness + battery).
 *
 * The decorative elements themselves stay rendered — only the
 * per-frame animation is dropped, so the layout/design is unchanged.
 *
 * Returns `false` during SSR / first paint (matches useMediaQuery's
 * server snapshot), so nothing animates until we confirm a desktop client.
 */
export function useAmbientMotion() {
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return isDesktop && !prefersReducedMotion;
}

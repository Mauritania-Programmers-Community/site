"use client";

import { motion } from "framer-motion";
import { useAmbientMotion } from "@/hooks/use-ambient-motion";

type Blob = {
  className: string;
  /** "pulse" = scale + opacity breathe, "drift" = slow position drift. */
  kind?: "pulse" | "drift";
  driftX?: number;
  driftY?: number;
  duration?: number;
};

/**
 * Client island for a section's decorative animated blobs.
 *
 * Lets the parent section stay a server component: only this tiny wrapper
 * ships to the client. Animations run on desktop only — on mobile /
 * reduced-motion the blobs render statically (painted once, no per-frame
 * cost) so the design is unchanged but scrolling stays smooth.
 */
export function SectionBlobs({ blobs }: { blobs: Blob[] }) {
  const ambient = useAmbientMotion();

  return (
    <>
      {blobs.map((blob, i) => {
        const { className, kind = "pulse", driftX = 50, driftY = -30, duration = 8 } = blob;

        const animate = !ambient
          ? { opacity: 0.4 }
          : kind === "drift"
            ? { x: [0, driftX, 0], y: [0, driftY, 0] }
            : { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] };

        return (
          <motion.div
            key={i}
            aria-hidden="true"
            className={className}
            animate={animate}
            transition={ambient ? { duration, repeat: Infinity } : undefined}
          />
        );
      })}
    </>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShiftCardProps {
  topContent: React.ReactNode;
  topAnimateContent?: React.ReactNode;
  middleContent?: React.ReactNode;
  bottomContent: React.ReactNode;
  className?: string;
  shiftHeight?: number;
  gradientFrom?: string;
  gradientTo?: string;
}

export function ShiftCard({
  topContent,
  topAnimateContent,
  middleContent,
  bottomContent,
  className,
  shiftHeight = 100,
  gradientFrom = "rgba(76, 175, 80, 0.1)", // mpc-green-500
  gradientTo = "rgba(255, 193, 7, 0.1)", // mpc-gold-500
}: ShiftCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn("group relative overflow-hidden rounded-xl", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          background: isHovered
            ? `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`
            : "transparent",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Top section (always visible) */}
      <div className="relative z-10">
        {topContent}

        {/* Top animated content (e.g., image zoom) */}
        {topAnimateContent && (
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {topAnimateContent}
          </motion.div>
        )}
      </div>

      {/* Shifted section (revealed on hover) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="relative z-20"
            initial={{ y: -shiftHeight, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -shiftHeight, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Middle content (extra info) */}
            {middleContent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                {middleContent}
              </motion.div>
            )}

            {/* Bottom content (actions) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {bottomContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardFlipProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
  flipOnHover?: boolean;
  flipOnClick?: boolean;
}

export function CardFlip({
  frontContent,
  backContent,
  className,
  flipOnHover = true,
  flipOnClick = false,
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    if (flipOnClick) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleMouseEnter = () => {
    if (flipOnHover && !flipOnClick) {
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    if (flipOnHover && !flipOnClick) {
      setIsFlipped(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (flipOnClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div
      className={cn("perspective-1000 group w-full", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleFlip}
      onKeyDown={handleKeyDown}
      role={flipOnClick ? "button" : undefined}
      tabIndex={flipOnClick ? 0 : undefined}
      style={{ minHeight: "inherit" }}
    >
      <motion.div
        className="relative w-full"
        style={{
          transformStyle: "preserve-3d",
          minHeight: "inherit",
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {/* Front Face */}
        <div
          className={cn("w-full", !isFlipped ? "relative" : "absolute inset-0")}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {frontContent}
        </div>

        {/* Back Face */}
        <div
          className={cn("w-full", isFlipped ? "relative" : "absolute inset-0")}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {backContent}
        </div>
      </motion.div>
    </div>
  );
}

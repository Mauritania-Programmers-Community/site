"use client";

import React, { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
  gradientSize?: number;
  gradientOpacity?: number;
  gradientFromColor?: string;
  gradientToColor?: string;
}

export function MagicCard({
  children,
  className,
  gradientSize = 200,
  gradientOpacity = 0.3,
  gradientFromColor = "rgba(102, 187, 106, 0.3)", // mpc-green-400
  gradientToColor = "rgba(255, 213, 79, 0.3)", // mpc-gold-400
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Spotlight gradient */}
      {isHovering && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: gradientOpacity }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            background: `radial-gradient(${gradientSize}px circle at ${mousePosition.x}px ${mousePosition.y}px, ${gradientFromColor}, ${gradientToColor}, transparent 80%)`,
          }}
        />
      )}

      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

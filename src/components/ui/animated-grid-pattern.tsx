"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface AnimatedGridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: string | number;
  numSquares?: number;
  className?: string;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
}

// Helper to generate random position
function generateRandomPos(
  dims: { width: number; height: number },
  cellWidth: number,
  cellHeight: number
) {
  return [
    Math.floor((Math.random() * dims.width) / cellWidth),
    Math.floor((Math.random() * dims.height) / cellHeight),
  ];
}

// Generate squares with positions
function generateSquaresWithPositions(
  count: number,
  dims: { width: number; height: number },
  cellWidth: number,
  cellHeight: number
) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    pos: dims.width > 0 && dims.height > 0
      ? generateRandomPos(dims, cellWidth, cellHeight)
      : [0, 0],
  }));
}

export function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  ...props
}: AnimatedGridPatternProps) {
  const id = useId();
  const containerRef = useRef<SVGSVGElement>(null);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  // Initialize squares with empty positions
  const [squares, setSquares] = useState(() =>
    Array.from({ length: numSquares }, (_, i) => ({
      id: i,
      pos: [0, 0] as number[],
    }))
  );

  // Function to update a single square's position (called from animation callback)
  const updateSquarePosition = useCallback(
    (squareId: number) => {
      const dims = dimensionsRef.current;
      if (dims.width > 0 && dims.height > 0) {
        setSquares((currentSquares) =>
          currentSquares.map((sq) =>
            sq.id === squareId
              ? {
                  ...sq,
                  pos: generateRandomPos(dims, width, height),
                }
              : sq
          )
        );
      }
    },
    [width, height]
  );

  // Resize observer to update container dimensions
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newDims = {
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        };
        dimensionsRef.current = newDims;

        // Generate new squares with the new dimensions
        if (newDims.width > 0 && newDims.height > 0) {
          const newSquares = generateSquaresWithPositions(
            numSquares,
            newDims,
            width,
            height
          );
          setSquares(newSquares);
        }
      }
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.unobserve(container);
    };
  }, [numSquares, width, height]);

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(({ pos: [x, y], id }, index) => (
          <motion.rect
            initial={{ opacity: 0 }}
            animate={{ opacity: maxOpacity }}
            transition={{
              duration,
              repeat: 1,
              delay: index * 0.1,
              repeatType: "reverse",
            }}
            onAnimationComplete={() => updateSquarePosition(id)}
            key={`${x}-${y}-${index}`}
            width={width - 1}
            height={height - 1}
            x={x * width + 1}
            y={y * height + 1}
            fill="currentColor"
            strokeWidth="0"
          />
        ))}
      </svg>
    </svg>
  );
}

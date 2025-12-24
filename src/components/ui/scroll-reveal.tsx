"use client";

import React, { useEffect, useRef, useMemo, type ReactNode, type RefObject } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

export function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.2,
  baseRotation = 2,
  blurStrength = 3,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const words = useMemo(() => {
    if (typeof children !== "string") return [];
    return children.split(" ");
  }, [children]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const wordElements = container.querySelectorAll(".scroll-reveal-word");

    // Lazy load GSAP and ScrollTrigger
    let cleanup: (() => void) | undefined;

    const initScrollTrigger = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      // Set initial state
      gsap.set(wordElements, {
        opacity: baseOpacity,
        rotateX: baseRotation,
        filter: enableBlur ? `blur(${blurStrength}px)` : "blur(0px)",
      });

      // Create scroll-triggered animation
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          scroller: scrollContainerRef?.current || undefined,
          start: "top 80%",
          end: wordAnimationEnd,
          scrub: 1,
        },
      });

      // Animate each word
      wordElements.forEach((word, index) => {
        timeline.to(
          word,
          {
            opacity: 1,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 0.5,
            ease: "power2.out",
          },
          index * 0.05
        );
      });

      cleanup = () => {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === container) {
            trigger.kill();
          }
        });
      };
    };

    initScrollTrigger();

    return () => {
      if (cleanup) cleanup();
    };
  }, [
    words,
    baseOpacity,
    baseRotation,
    blurStrength,
    enableBlur,
    scrollContainerRef,
    wordAnimationEnd,
    rotationEnd,
  ]);

  if (typeof children !== "string") {
    return <>{children}</>;
  }

  return (
    <p ref={containerRef} className={`relative ${containerClassName}`}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={`scroll-reveal-word inline-block ${textClassName}`}
          style={{
            marginRight: "0.25em",
            marginLeft: index === 0 ? 0 : undefined,
          }}
        >
          {word}
        </span>
      ))}
    </p>
  );
}

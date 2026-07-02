"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { ArrowRight, ArrowLeft, MessageCircle, Play, SkipForward } from "lucide-react";
import Link from "next/link";

// MPC Colors
const MPC_GREEN = "#4CAF50";
const MPC_GOLD = "#FFC107";

// Pre-generate deterministic colors based on pixel index
function getPixelColor(index: number): string {
  // Alternate between green and gold in a pattern
  return index % 3 === 0 ? MPC_GOLD : MPC_GREEN;
}

const PIXEL_MAP: Record<string, number[][]> = {
  M: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  P: [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
  ],
  C: [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
  ],
};

interface Pixel {
  x: number;
  y: number;
  size: number;
  hit: boolean;
  color: string;
}

interface Ball {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
}

export function HeroPong() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const [showContent, setShowContent] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Skip animation handler
  const handleSkipAnimation = () => {
    setShowContent(true);
    setIsPaused(true);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  useEffect(() => {
    // If user prefers reduced motion, show content immediately
    if (prefersReducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowContent(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let pixels: Pixel[] = [];
    let ball: Ball = { x: 0, y: 0, dx: 0, dy: 0, radius: 0 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeGame();
    };

    const initializeGame = () => {
      const scale = Math.min(canvas.width / 800, canvas.height / 600);
      const PIXEL_SIZE = 12 * scale;
      const BALL_SPEED = 4 * scale;

      pixels = [];
      const word = "MPC";

      // Calculate total width
      let totalWidth = 0;
      word.split("").forEach((letter, i) => {
        const map = PIXEL_MAP[letter];
        if (map) {
          totalWidth += map[0].length * PIXEL_SIZE + (i > 0 ? 2 * PIXEL_SIZE : 0);
        }
      });

      let startX = (canvas.width - totalWidth) / 2;
      const startY = canvas.height / 2 - (5 * PIXEL_SIZE) / 2;

      let pixelIndex = 0;
      word.split("").forEach((letter) => {
        const map = PIXEL_MAP[letter];
        if (!map) return;

        for (let row = 0; row < map.length; row++) {
          for (let col = 0; col < map[row].length; col++) {
            if (map[row][col]) {
              pixels.push({
                x: startX + col * PIXEL_SIZE,
                y: startY + row * PIXEL_SIZE,
                size: PIXEL_SIZE - 2,
                hit: false,
                color: getPixelColor(pixelIndex),
              });
              pixelIndex++;
            }
          }
        }
        startX += (map[0].length + 2) * PIXEL_SIZE;
      });

      ball = {
        x: canvas.width * 0.8,
        y: canvas.height * 0.2,
        dx: -BALL_SPEED,
        dy: BALL_SPEED,
        radius: PIXEL_SIZE / 2,
      };

      // Show content after a delay
      setTimeout(() => setShowContent(true), 2000);
    };

    const gameLoop = () => {
      if (!ctx || !canvas || isPaused) return;

      // Clear with dark background
      ctx.fillStyle = "rgba(10, 10, 10, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update ball
      ball.x += ball.dx;
      ball.y += ball.dy;

      // Bounce off walls
      if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy;
      }
      if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.dx = -ball.dx;
      }

      // Check pixel collisions
      pixels.forEach((pixel) => {
        if (
          !pixel.hit &&
          ball.x + ball.radius > pixel.x &&
          ball.x - ball.radius < pixel.x + pixel.size &&
          ball.y + ball.radius > pixel.y &&
          ball.y - ball.radius < pixel.y + pixel.size
        ) {
          pixel.hit = true;
          const centerX = pixel.x + pixel.size / 2;
          const centerY = pixel.y + pixel.size / 2;
          if (Math.abs(ball.x - centerX) > Math.abs(ball.y - centerY)) {
            ball.dx = -ball.dx;
          } else {
            ball.dy = -ball.dy;
          }
        }
      });

      // Draw pixels
      pixels.forEach((pixel) => {
        ctx.fillStyle = pixel.hit ? "rgba(100, 100, 100, 0.3)" : pixel.color;
        ctx.shadowBlur = pixel.hit ? 0 : 20;
        ctx.shadowColor = pixel.color;
        ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size);
        ctx.shadowBlur = 0;
      });

      // Draw ball with glow
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.shadowBlur = 30;
      ctx.shadowColor = MPC_GREEN;
      ctx.fill();
      ctx.shadowBlur = 0;

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    gameLoop();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [prefersReducedMotion, isPaused]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a]">
      {/* Screen reader accessible content */}
      <div className="sr-only" aria-live="polite">
        <h1>MPC - {isRTL ? "مجتمع مبرمجي موريتانيا" : "Mauritanian Programmers Community"}</h1>
        <p>{t("hero.description")}</p>
      </div>

      {/* Skip animation button - visible until content shows */}
      {!showContent && (
        <motion.div
          className="absolute top-4 end-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={handleSkipAnimation}
            aria-label={isRTL ? "تخطي الرسوم المتحركة" : "Skip animation"}
            className="gap-2 border-white/20 bg-black/50 text-white hover:bg-black/70 hover:text-white backdrop-blur-sm"
          >
            <SkipForward className="h-4 w-4" aria-hidden="true" />
            {isRTL ? "تخطي" : "Skip"}
          </Button>
        </motion.div>
      )}

      {/* Canvas background - decorative animation */}
      {!prefersReducedMotion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          aria-hidden="true"
          role="presentation"
        />
      )}

      {/* Static MPC logo fallback for reduced motion */}
      {prefersReducedMotion && (
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <div className="text-8xl font-bold bg-linear-to-r from-mpc-green-500 to-mpc-gold-500 bg-clip-text text-transparent">
            MPC
          </div>
        </div>
      )}

      {/* Content overlay */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 1 }}
            className="relative z-10 flex min-h-screen flex-col items-center justify-end pb-32"
          >
            <motion.div
              initial={{ y: prefersReducedMotion ? 0 : 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.3 }}
              className="text-center px-4"
            >
              {/* Visible heading for SEO and users with reduced motion */}
              <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                <span className="bg-linear-to-r from-mpc-green-400 to-mpc-gold-400 bg-clip-text text-transparent">
                  MPC
                </span>
              </h1>

              <p className="mb-6 max-w-2xl text-lg text-white/60 md:text-xl">
                {t("hero.description")}
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="group h-14 gap-3 bg-mpc-green-500 px-8 text-lg font-semibold text-white shadow-lg shadow-mpc-green-500/30 hover:bg-mpc-green-600"
                  asChild
                >
                  <a
                    href={siteConfig.links.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-5 w-5" />
                    {t("hero.cta.join")}
                    <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </a>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="group h-14 gap-3 border-2 border-white/20 px-8 text-lg font-semibold text-white hover:border-mpc-green-500 hover:bg-mpc-green-500/10"
                  asChild
                >
                  <Link href={`/${locale}/events`}>
                    <Play className="h-5 w-5" />
                    {t("hero.cta.events")}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-linear-to-t from-[#0a0a0a] to-transparent" aria-hidden="true" />
    </div>
  );
}

/**
 * Performance and Animation Constants
 * Centralized configuration for consistent behavior across the application
 */

// Canvas Performance
export const CANVAS_PERFORMANCE = {
  MOBILE_DPR: 1,
  DESKTOP_DPR_MAX: 2,
  MOBILE_BREAKPOINT: 768,
} as const;

// Particle Animation
export const PARTICLE_CONFIG = {
  // Particle counts (via pixel steps)
  DESKTOP_PIXEL_STEPS: 6,
  MOBILE_PIXEL_STEPS: 12, // Higher = fewer particles

  // Canvas dimensions
  BASE_WIDTH: 1000,
  BASE_HEIGHT: 500,

  // Animation timing
  FRAME_ADVANCE_INTERVAL: 240, // frames between word changes
  MOTION_BLUR_ALPHA: 0.1,
} as const;

// Pong Game
export const PONG_CONFIG = {
  // Pixel sizing multipliers
  DESKTOP_PIXEL_SIZE_MULTIPLIER: 1,
  MOBILE_PIXEL_SIZE_MULTIPLIER: 1.5,

  // Base sizes (scaled by scaleRef)
  LARGE_PIXEL_SIZE: 8,
  SMALL_PIXEL_SIZE: 4,

  // Ball speed
  DESKTOP_BALL_SPEED: 6,
  MOBILE_BALL_SPEED: 4,
} as const;

// Animation Durations (milliseconds)
export const ANIMATION_DURATION = {
  FAST: 300,
  NORMAL: 400,
  SLOW: 600,
  CARD_STAGGER_DELAY: 100, // 0.1s in ms
} as const;

// Image Loading
export const IMAGE_SIZES = {
  CARD_RESPONSIVE: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  FULL_WIDTH: "100vw",
} as const;

// Scroll & Viewport
export const SCROLL_CONFIG = {
  NAVBAR_SCROLL_THRESHOLD: 50, // px
  VIEWPORT_MARGIN_PRELOAD: "-100px", // for whileInView
  VIEWPORT_VISIBLE_AMOUNT: 0.2, // 20% visible
} as const;

// Background Blob Animation
export const BLOB_ANIMATION = {
  DURATION: 6, // seconds
  SCALE_RANGE: [1, 1.2, 1] as const,
  OPACITY_RANGE: [0.3, 0.5, 0.3] as const,
} as const;

// Media Queries
export const BREAKPOINTS = {
  MOBILE: "(max-width: 768px)",
  TABLET: "(max-width: 1024px)",
  DESKTOP: "(min-width: 1025px)",
} as const;

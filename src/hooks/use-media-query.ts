"use client";

import { useSyncExternalStore } from "react";

/**
 * Hook to detect media query matches
 * @param query - CSS media query string (e.g., "(max-width: 768px)")
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (callback) => {
      const matchMedia = window.matchMedia(query);
      matchMedia.addEventListener("change", callback);
      return () => {
        matchMedia.removeEventListener("change", callback);
      };
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Shared Avatar component that handles both local and external (DiceBear SVG) images
 * Used across blog cards, event cards, and author cards
 */
export function AvatarImage({
  src,
  alt,
  size,
  className,
}: {
  src: string;
  alt: string;
  size: number;
  className?: string;
}) {
  const isExternal = src.startsWith("http");

  if (isExternal) {
    // Use regular img for external SVGs (DiceBear)
    return (
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        className={cn("object-cover", className)}
      />
    );
  }

  // Use Next.js Image for local images
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={cn("object-cover", className)}
      sizes={`${size}px`}
    />
  );
}

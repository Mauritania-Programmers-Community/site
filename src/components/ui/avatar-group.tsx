"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AvatarItem {
  id: string;
  name: string;
  nameAr: string;
  image: string;
  role?: string;
  roleAr?: string;
  link?: string;
}

interface AvatarGroupProps {
  items: AvatarItem[];
  locale?: string;
  className?: string;
  maxVisible?: number;
  size?: "sm" | "md" | "lg";
  totalCount?: number;
}

const Avatar = ({
  item,
  index,
  totalItems,
  size,
  locale = "en",
  isHovered,
  onHover,
  onLeave,
}: {
  item: AvatarItem;
  index: number;
  totalItems: number;
  size: "sm" | "md" | "lg";
  locale?: string;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const sizeClasses = {
    sm: "h-12 w-12",
    md: "h-16 w-16",
    lg: "h-20 w-20",
  };

  const displayName = locale === "ar" ? item.nameAr : item.name;
  const displayRole = locale === "ar" ? item.roleAr : item.role;

  return (
    <div
      className="relative group flex items-center justify-center"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        marginLeft: index === 0 ? 0 : "-1rem",
        zIndex: totalItems - index,
      }}
    >
      <AnimatePresence mode="popLayout">
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 20,
              },
            }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute -top-16 whitespace-nowrap flex text-xs flex-col items-center justify-center rounded-xl bg-card z-50 shadow-lg px-4 py-2 border min-w-max"
          >
            <div className="font-bold text-foreground relative z-30 text-base text-center">
              {displayName}
            </div>
            {displayRole && (
              <div className="text-muted-foreground text-xs text-center">
                {displayRole}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.05, zIndex: 100 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative"
      >
        {item.link ? (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block cursor-pointer"
          >
            <Image
              height={100}
              width={100}
              src={item.image}
              alt={displayName}
              className={cn(
                "object-cover !rounded-full border-2 border-background shadow-lg ring-2 ring-mpc-green-500/20 transition-all hover:ring-mpc-green-500/50 cursor-pointer",
                sizeClasses[size]
              )}
            />
          </a>
        ) : (
          <Image
            height={100}
            width={100}
            src={item.image}
            alt={displayName}
            className={cn(
              "object-cover !rounded-full border-2 border-background shadow-lg ring-2 ring-mpc-green-500/20 transition-all hover:ring-mpc-green-500/50",
              sizeClasses[size]
            )}
          />
        )}
      </motion.div>
    </div>
  );
};

const AvatarGroup = ({
  items,
  locale = "en",
  className,
  maxVisible = 5,
  size = "md",
  totalCount,
}: AvatarGroupProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

  const visibleItems = items.slice(0, maxVisible);
  const remainingCount = totalCount ? totalCount - maxVisible : items.length - maxVisible;

  return (
    <div className={cn("flex items-center justify-center", className)}>
      {visibleItems.map((item, index) => (
        <Avatar
          key={item.id}
          item={item}
          index={index}
          totalItems={visibleItems.length}
          size={size}
          locale={locale}
          isHovered={hoveredIndex === item.id}
          onHover={() => setHoveredIndex(item.id)}
          onLeave={() => setHoveredIndex(null)}
        />
      ))}

      {remainingCount > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            "flex items-center justify-center rounded-full border-2 border-dashed border-mpc-green-500/30 bg-mpc-green-500/5 text-mpc-green-600 dark:text-mpc-green-400 font-bold",
            size === "sm"
              ? "h-12 w-12 text-xs"
              : size === "md"
              ? "h-16 w-16 text-sm"
              : "h-20 w-20 text-base",
            "ms-[-1rem]"
          )}
        >
          +{remainingCount}
        </motion.div>
      )}
    </div>
  );
};

export default AvatarGroup;

"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  badge?: {
    icon?: LucideIcon;
    text: string;
  };
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <motion.div
      className={`mb-16 text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Badge */}
      {badge && (
        <motion.div
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-mpc-green-500/20 bg-mpc-green-500/5 px-4 py-2"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {badge.icon && <badge.icon className="h-4 w-4 text-mpc-green-500" />}
          <span className="text-sm font-medium text-mpc-green-600 dark:text-mpc-green-400">
            {badge.text}
          </span>
        </motion.div>
      )}

      {/* Title */}
      <h2 className="mb-4 text-3xl font-bold sm:text-4xl">{title}</h2>

      {/* Description */}
      {description && (
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          {description}
        </p>
      )}
    </motion.div>
  );
}

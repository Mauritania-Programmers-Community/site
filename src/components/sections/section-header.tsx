import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

interface SectionHeaderProps {
  badge?: {
    icon?: LucideIcon;
    text: string;
  };
  title: string;
  description?: string;
  className?: string;
}

/**
 * Shared component (no "use client"): renders on the server when its parent
 * is a server component, so the header markup stays out of the client bundle.
 * The scroll-in fade is provided by the small <Reveal> client island.
 */
export function SectionHeader({
  badge,
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <Reveal className={`mb-16 text-center ${className}`}>
      {/* Badge */}
      {badge && (
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-mpc-green-500/20 bg-mpc-green-500/5 px-4 py-2">
          {badge.icon && <badge.icon className="h-4 w-4 text-mpc-green-500" />}
          <span className="text-sm font-medium text-mpc-green-600 dark:text-mpc-green-400">
            {badge.text}
          </span>
        </div>
      )}

      {/* Title */}
      <h2 className="mb-4 text-3xl font-bold sm:text-4xl">{title}</h2>

      {/* Description */}
      {description && (
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          {description}
        </p>
      )}
    </Reveal>
  );
}

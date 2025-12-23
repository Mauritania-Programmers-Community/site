"use client";

import { cn } from "@/lib/utils";
import { getAuthor, getAuthorName, getAuthorRole } from "@/lib/authors";
import { Github, Twitter, Linkedin } from "lucide-react";
import { AvatarImage } from "@/components/ui/avatar-image";

interface AuthorCardProps {
  authorKey: string;
  locale: string;
  variant?: "default" | "compact" | "inline";
  className?: string;
}

export function AuthorCard({
  authorKey,
  locale,
  variant = "default",
  className,
}: AuthorCardProps) {
  const author = getAuthor(authorKey);
  const name = getAuthorName(authorKey, locale);
  const role = getAuthorRole(authorKey, locale);

  // Fallback for unknown authors - use DiceBear with author key as seed
  const avatar = author?.avatar || `https://api.dicebear.com/9.x/shapes/svg?seed=${encodeURIComponent(authorKey)}&backgroundColor=4CAF50,FFC107&backgroundType=gradientLinear`;
  const isExternalAvatar = avatar.startsWith("http");

  if (variant === "inline") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className={cn(
          "relative overflow-hidden rounded-full ring-2 ring-mpc-green-500/20",
          isExternalAvatar ? "h-6 w-6" : "h-6 w-6"
        )}>
          <AvatarImage src={avatar} alt={name} size={24} className="rounded-full" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium">{name}</span>
          {role && (
            <span className="text-xs text-muted-foreground">· {role}</span>
          )}
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <div className={cn(
          "relative overflow-hidden rounded-full ring-2 ring-mpc-green-500/20",
          isExternalAvatar ? "h-10 w-10" : "h-10 w-10"
        )}>
          <AvatarImage src={avatar} alt={name} size={40} className="rounded-full" />
        </div>
        <div className="flex flex-col">
          <span className="font-medium">{name}</span>
          {role && (
            <span className="text-xs text-muted-foreground">{role}</span>
          )}
        </div>
      </div>
    );
  }

  // Default variant - full card
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 rounded-lg border bg-card p-6 text-center",
        className
      )}
    >
      <div className={cn(
        "relative overflow-hidden rounded-full ring-4 ring-mpc-green-500/20",
        isExternalAvatar ? "h-20 w-20" : "h-20 w-20"
      )}>
        <AvatarImage src={avatar} alt={name} size={80} className="rounded-full" />
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="font-semibold text-lg">{name}</h4>
        {role && <p className="text-sm text-muted-foreground">{role}</p>}
      </div>
      {author && (author.twitter || author.github || author.linkedin) && (
        <div className="flex items-center gap-3">
          {author.twitter && (
            <a
              href={`https://twitter.com/${author.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-mpc-green-500 transition-colors"
              aria-label={`Follow ${name} on Twitter`}
            >
              <Twitter className="h-5 w-5" />
            </a>
          )}
          {author.github && (
            <a
              href={`https://github.com/${author.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-mpc-green-500 transition-colors"
              aria-label={`View ${name}'s GitHub`}
            >
              <Github className="h-5 w-5" />
            </a>
          )}
          {author.linkedin && (
            <a
              href={`https://linkedin.com/in/${author.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-mpc-green-500 transition-colors"
              aria-label={`Connect with ${name} on LinkedIn`}
            >
              <Linkedin className="h-5 w-5" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

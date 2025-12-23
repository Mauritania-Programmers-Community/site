"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AvatarImage } from "@/components/ui/avatar-image";
import { getAuthor, getAuthorName, getAuthorRole } from "@/lib/authors";
import { Twitter, Github, Linkedin, Globe, Mail } from "lucide-react";
import type { Author } from "@/lib/authors";

interface AuthorBioDrawerProps {
  authorId: string;
  locale: string;
  trigger?: React.ReactNode;
}

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> =
  {
    twitter: Twitter,
    github: Github,
    linkedin: Linkedin,
    website: Globe,
  };

export function AuthorBioDrawer({
  authorId,
  locale,
  trigger,
}: AuthorBioDrawerProps) {
  const [open, setOpen] = useState(false);
  const author = getAuthor(authorId);
  const authorName = getAuthorName(authorId, locale);
  const authorRole = getAuthorRole(authorId, locale);
  const isRTL = locale === "ar";

  if (!author) return null;

  const defaultTrigger = (
    <Button variant="ghost" size="sm" className="h-auto p-0 hover:bg-transparent">
      <div className="flex items-center gap-2">
        {author.avatar && (
          <div className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-mpc-green-500/20 transition-all hover:ring-mpc-green-500">
            <AvatarImage
              src={author.avatar}
              alt={authorName}
              size={32}
              className="rounded-full"
            />
          </div>
        )}
        <div className="flex flex-col text-start">
          <span className="font-medium text-foreground hover:text-mpc-green-500 transition-colors">
            {authorName}
          </span>
          {authorRole && (
            <span className="text-xs text-muted-foreground">{authorRole}</span>
          )}
        </div>
      </div>
    </Button>
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger || defaultTrigger}</SheetTrigger>
      <SheetContent side={isRTL ? "left" : "right"} className="w-full sm:max-w-md">
        <SheetHeader className="mb-6">
          <div className="flex items-start gap-4">
            {author.avatar && (
              <div className="relative h-20 w-20 overflow-hidden rounded-full ring-4 ring-mpc-green-500/20">
                <AvatarImage
                  src={author.avatar}
                  alt={authorName}
                  size={80}
                  className="rounded-full"
                />
              </div>
            )}
            <div className="flex-1">
              <SheetTitle className="text-2xl">{authorName}</SheetTitle>
              {authorRole && (
                <SheetDescription className="text-base">
                  {authorRole}
                </SheetDescription>
              )}
            </div>
          </div>
        </SheetHeader>

        {/* Bio */}
        <div className="mb-6">
          <h3 className="mb-2 font-semibold">
            {isRTL ? "عن الكاتب" : "About"}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {locale === "ar" && author.bio?.ar
              ? author.bio.ar
              : author.bio?.en ||
                (isRTL
                  ? "لم يتم توفير السيرة الذاتية بعد."
                  : "No bio available yet.")}
          </p>
        </div>

        {/* Skills/Expertise */}
        {author.skills && author.skills.length > 0 && (
          <div className="mb-6">
            <h3 className="mb-3 font-semibold">
              {isRTL ? "المهارات" : "Skills & Expertise"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {author.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="bg-mpc-green-500/10 text-mpc-green-600 dark:text-mpc-green-400"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Social Links */}
        {author.social && Object.keys(author.social).length > 0 && (
          <div className="mb-6">
            <h3 className="mb-3 font-semibold">
              {isRTL ? "تواصل معي" : "Connect"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(author.social).map(([platform, url]) => {
                const Icon = socialIcons[platform] || Globe;
                return (
                  <Button
                    key={platform}
                    variant="outline"
                    size="sm"
                    asChild
                    className="gap-2"
                  >
                    <a
                      href={url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="h-4 w-4" />
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>
        )}

        {/* Contact */}
        {author.email && (
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="mb-2 font-semibold text-sm">
              {isRTL ? "البريد الإلكتروني" : "Email"}
            </h3>
            <Button
              variant="link"
              className="h-auto p-0 text-sm text-mpc-green-500 hover:text-mpc-green-600"
              asChild
            >
              <a href={`mailto:${author.email}`}>
                <Mail className="me-1 h-3 w-3" />
                {author.email}
              </a>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { List } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
  title?: string;
}

export function TableOfContents({
  className,
  title = "On this page",
}: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // Extract headings from DOM on mount
  useEffect(() => {
    const headingElements = document.querySelectorAll(
      "article h1, article h2, article h3"
    );
    const headingsArray: Heading[] = [];

    headingElements.forEach((element) => {
      if (element.id) {
        headingsArray.push({
          id: element.id,
          text: element.textContent || "",
          level: parseInt(element.tagName.charAt(1)),
        });
      }
    });

    if (headingsArray.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHeadings(headingsArray);
    }
  }, []);

  // Use IntersectionObserver to track active heading (eliminates forced reflows)
  useEffect(() => {
    if (headings.length === 0) return;

    const intersectingHeadings = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersectingHeadings.add(entry.target.id);
          } else {
            intersectingHeadings.delete(entry.target.id);
          }
        });

        // Find first intersecting heading in document order
        const firstIntersecting = headings.find((h) =>
          intersectingHeadings.has(h.id)
        );

        if (firstIntersecting) {
          setActiveId(firstIntersecting.id);
        }
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: [0, 1],
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  // Handle click with smooth scroll
  const handleClick = async (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    // Update URL hash
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    window.history.pushState({}, "", `#${id}`);

    // Copy to clipboard
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }

    // Smooth scroll with offset
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    setActiveId(id);
  };

  if (headings.length === 0) return null;

  return (
    <nav className={cn("space-y-3", className)} aria-label="Table of contents">
      <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <List className="h-4 w-4 text-mpc-green-500" />
        {title}
      </h4>
      <ul className="space-y-2 border-s border-border ps-4">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{
              paddingInlineStart: `${(heading.level - 1) * 0.75}rem`,
            }}
          >
            <button
              onClick={() => handleClick(heading.id)}
              className={cn(
                "block w-full text-start text-sm transition-colors hover:text-foreground",
                activeId === heading.id
                  ? "font-medium text-mpc-green-500"
                  : "text-muted-foreground"
              )}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Mobile TOC - Floating button + drawer
 */
interface MobileTableOfContentsProps {
  title?: string;
  titleAr?: string;
  locale?: string;
}

export function MobileTableOfContents({
  title = "On this page",
  titleAr = "في هذه الصفحة",
  locale = "en",
}: MobileTableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const headingElements = document.querySelectorAll(
      "article h1, article h2, article h3"
    );
    const headingsArray: Heading[] = [];

    headingElements.forEach((element) => {
      if (element.id) {
        headingsArray.push({
          id: element.id,
          text: element.textContent || "",
          level: parseInt(element.tagName.charAt(1)),
        });
      }
    });

    if (headingsArray.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHeadings(headingsArray);
    }
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    setIsOpen(false);

    // Smooth scroll with offset
    setTimeout(() => {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }, 100);
  };

  if (headings.length === 0) return null;

  const displayTitle = locale === "ar" ? titleAr : title;

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 end-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-mpc-green-500 text-white shadow-lg transition-transform hover:scale-105 lg:hidden"
        aria-label={displayTitle}
      >
        <List className="h-5 w-5" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          "fixed inset-x-4 bottom-4 z-50 max-h-[60vh] overflow-hidden rounded-2xl bg-background shadow-xl transition-transform duration-300 lg:hidden",
          isOpen ? "translate-y-0" : "translate-y-[calc(100%+2rem)]"
        )}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h4 className="flex items-center gap-2 font-semibold">
            <List className="h-4 w-4 text-mpc-green-500" />
            {displayTitle}
          </h4>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full p-2 hover:bg-muted"
            aria-label="Close"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul className="overflow-y-auto p-4 space-y-3">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{
                paddingInlineStart: `${(heading.level - 1) * 1}rem`,
              }}
            >
              <button
                onClick={() => handleClick(heading.id)}
                className="w-full text-start text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

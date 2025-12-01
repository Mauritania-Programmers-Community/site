export const mainNav = [
  {
    title: "Home",
    titleAr: "الرئيسية",
    href: "/",
  },
  {
    title: "Events",
    titleAr: "الفعاليات",
    href: "/events",
  },
  {
    title: "Blog",
    titleAr: "المدونة",
    href: "/blog",
  },
  {
    title: "Team",
    titleAr: "الفريق",
    href: "/team",
  },
] as const;

export type MainNavItem = (typeof mainNav)[number];

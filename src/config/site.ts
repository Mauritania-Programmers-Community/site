export const siteConfig = {
  name: "MPC",
  nameAr: "مجتمع مبرمجي موريتانيا",
  description: "Mauritania Programmers Community - Building Mauritania's Tech Future Together",
  descriptionAr: "مجتمع مبرمجي موريتانيا - نبني مستقبل موريتانيا التقني معًا",
  // No custom domain yet — using the Vercel production alias for now.
  // TODO: switch to https://mpc.mr once the custom domain is configured.
  url: "https://mpc-community.vercel.app",
  ogImage: "/og-image.png",
  links: {
  whatsapp: "https://chat.whatsapp.com/FCJK9TWao4v843sIo2kHNU?mode=gi_t", // Note: should be checked, can expire
    github: "https://github.com/Mauritania-Programmers-Community",
    linkedin: "https://www.linkedin.com/company/%D9%85%D8%A8%D8%B1%D9%85%D8%AC%D9%8A-%D9%85%D9%88%D8%B1%D9%8A%D8%AA%D8%A7%D9%86%D9%8A%D8%A7",
    facebook: "https://www.facebook.com/profile.php?id=61581985272862",
  },
  founder: "Deidin",
  foundedDate: "2024-09-21",
  stats: {
    members: 1023,
    events: 11,
    projects: 4,
    yearFounded: 2024,
  },
} as const;

export type SiteConfig = typeof siteConfig;

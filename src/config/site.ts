export const siteConfig = {
  name: "MPC",
  nameAr: "مجتمع مبرمجي موريتانيا",
  description: "Mauritania Programmers Community - Building Mauritania's Tech Future Together",
  descriptionAr: "مجتمع مبرمجي موريتانيا - نبني مستقبل موريتانيا التقني معًا",
  url: "https://mpc.mr",
  ogImage: "/og-image.png",
  links: {
    whatsapp: "https://chat.whatsapp.com/YOUR_LINK",
    github: "https://github.com/mpc-mauritania",
    linkedin: "https://linkedin.com/company/mpc-mauritania",
    facebook: "https://facebook.com/mpc.mauritania",
  },
  founder: "Deidin",
  foundedDate: "2024-09-21",
  stats: {
    members: 600,
    events: 3,
    yearFounded: 2024,
  },
} as const;

export type SiteConfig = typeof siteConfig;

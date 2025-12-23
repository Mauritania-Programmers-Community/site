/**
 * Author definitions for MPC Platform
 * Type-safe author management with avatars
 *
 * Using DiceBear avatars for placeholder images
 * Styles: lorelei, avataaars, bottts, fun-emoji, notionists, shapes
 * https://www.dicebear.com/styles/
 */

export interface Author {
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  avatar: string;
  bio?: {
    en?: string;
    ar?: string;
  };
  skills?: string[];
  email?: string;
  social?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    website?: string;
  };
  twitter?: string;
  github?: string;
  linkedin?: string;
}

/**
 * Generate DiceBear avatar URL
 * @param seed - Unique identifier (usually author name)
 * @param style - DiceBear style (lorelei, avataaars, bottts, notionists, shapes)
 */
function dicebearAvatar(seed: string, style: string = "lorelei"): string {
  return `https://api.dicebear.com/9.x/${style}/svg?seed=${encodeURIComponent(seed)}&backgroundColor=4CAF50,FFC107&backgroundType=gradientLinear`;
}

export const authors: Record<string, Author> = {
  deidin: {
    name: "Deidin",
    nameAr: "ديدين",
    role: "Founder & Lead",
    roleAr: "المؤسس والقائد",
    avatar: "/images/team/deidin.png",
    twitter: "deidin",
    github: "deidine",
  },
  "ahmed-abdat": {
    name: "Ahmed Abdat",
    nameAr: "أحمد عبدات",
    role: "AI Lead & Developer",
    roleAr: "قائد الذكاء الاصطناعي ومطور",
    avatar: "/images/authors/ahmed-abdat.png",
    twitter: "ahmedabdat",
    github: "ahmed-abdat",
  },
  aziz: {
    name: "Aziz",
    nameAr: "عزيز",
    role: "Security Lead",
    roleAr: "قائد الأمن",
    avatar: "/images/authors/aziz.png",
    github: "aziz0x00",
  },
  "mohamed-salem": {
    name: "Mohamed Salem",
    nameAr: "محمد سالم",
    role: "General Supervisor",
    roleAr: "المشرف العام",
    avatar: "/images/authors/mohamed-salem.png",
    github: "Muhammed-OTP",
  },
  mpc: {
    name: "MPC Team",
    nameAr: "فريق MPC",
    role: "Community",
    roleAr: "المجتمع",
    avatar: dicebearAvatar("MPC Community", "shapes"),
    twitter: "MauritaniaProg",
    github: "Mauritania-Programmers-Community",
  },
} as const;

export type AuthorKey = keyof typeof authors;

/**
 * Get author by key with type safety
 */
export function getAuthor(key: string): Author | undefined {
  return authors[key as AuthorKey];
}

/**
 * Check if author key is valid
 */
export function isValidAuthor(key: string): key is AuthorKey {
  return key in authors;
}

/**
 * Get author name based on locale
 */
export function getAuthorName(key: string, locale: string): string {
  const author = getAuthor(key);
  if (!author) return key; // Fallback to key if author not found
  return locale === "ar" ? author.nameAr : author.name;
}

/**
 * Get author role based on locale
 */
export function getAuthorRole(key: string, locale: string): string {
  const author = getAuthor(key);
  if (!author) return "";
  return locale === "ar" ? author.roleAr : author.role;
}

/**
 * Get all authors as array
 */
export function getAllAuthors(): Array<Author & { key: string }> {
  return Object.entries(authors).map(([key, author]) => ({
    key,
    ...author,
  }));
}

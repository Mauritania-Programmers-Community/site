import type { Metadata } from "next";
import { Inter, Cairo, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import { notFound } from "next/navigation";
import { isLocale, isRtlLocale, routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "sonner";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mpc.mr"),
  title: {
    default: "MPC - Mauritania Programmers Community",
    template: "%s | MPC",
  },
  description:
    "Building Mauritania's Tech Future Together. Join 900+ developers sharing knowledge, opportunities, and innovation.",
  keywords: [
    "Mauritania",
    "developers",
    "programmers",
    "tech community",
    "coding",
    "web development",
    "AI",
    "cybersecurity",
  ],
  authors: [{ name: "MPC Team" }],
  creator: "Mauritania Programmers Community",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_MR",
    url: "https://mpc.mr",
    siteName: "MPC",
    title: "MPC - Mauritania Programmers Community",
    description:
      "Building Mauritania's Tech Future Together. Join 900+ developers sharing knowledge, opportunities, and innovation.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MPC - Mauritania Programmers Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MPC - Mauritania Programmers Community",
    description:
      "Building Mauritania's Tech Future Together. Join 900+ developers sharing knowledge, opportunities, and innovation.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!isLocale(locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  const messages = await getMessages();

  const isRtl = isRtlLocale(locale);

  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.dicebear.com" />
      </head>
      <body
        className={`${inter.variable} ${cairo.variable} ${jetbrainsMono.variable} ${isRtl ? "font-arabic" : "font-sans"} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            {/* Respect the OS "reduce motion" setting for every framer-motion animation */}
            <MotionConfig reducedMotion="user">
              <div className="relative flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster richColors position="top-center" />
            </MotionConfig>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

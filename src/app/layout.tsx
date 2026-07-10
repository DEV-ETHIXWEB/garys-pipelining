import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StickyMobileCta } from "@/components/layout/sticky-mobile-cta";
import { StickyContactTab } from "@/components/layout/sticky-contact-tab";
import { PageTransition } from "@/components/layout/page-transition";
import { NavigationProgress } from "@/components/layout/navigation-progress";
import { ChatWidget } from "@/components/chat/chat-widget-lazy";
import { siteConfig } from "@/lib/site-config";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Seattle's Trenchless Sewer Experts`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} | Seattle's Trenchless Sewer Experts`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  alternates: { canonical: "/" },
};

export const viewport = {
  themeColor: "#1e3a8a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <MotionConfig reducedMotion="user">
          <NavigationProgress />
          <Header />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <StickyContactTab />
          <StickyMobileCta />
          <ChatWidget />
        </MotionConfig>
      </body>
    </html>
  );
}

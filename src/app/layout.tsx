import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import MobileInstallPrompt from "@/components/MobileInstallPrompt";
import { generateMetadata, generateWebsiteSchema, generateOrganizationSchema, siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  ...generateMetadata(),
  category: 'news',
  other: {
    'geo.region': 'FR',
    'language': 'French',
    'revisit-after': '3 days',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = generateWebsiteSchema();
  const orgSchema = generateOrganizationSchema();

  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#C41E3A" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href={siteConfig.url} />
        <link rel="alternate" hrefLang="fr" href={siteConfig.url} />
        <link rel="alternate" hrefLang="x-default" href={siteConfig.url} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileBottomNav />
        <MobileInstallPrompt />
      </body>
    </html>
  );
}

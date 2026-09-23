import type { Metadata } from "next";
import { AnalyticsBridge } from "./components/analytics-bridge";
import { ScrollNarrativeMotion } from "./components/scroll-narrative-motion";
import "./globals.css";
import "./master.css";
import "./hierarchy.css";
import "./sitemap-refresh.css";
import "./reading-paths.css";
import "./evidence-statistics.css";
import "./problem-reader.css";
import "./purposeful-motion.css";
import "./homepage-refresh.css";

const SITE_URL = "https://www.120vc.com";
const description = "120VC turns strategy into results through Execution Leadership Coaching, the Execution Leadership System, and Embedded Execution Leadership.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "120VC | Execution Leadership", template: "%s | 120VC" },
  description,
  icons: { icon: "https://www.120vc.com/wp-content/uploads/2026/02/cropped-favicon-2-32x32.webp" },
  openGraph: {
    title: "Strategy Execution & Implementation for Enterprise Teams | 120VC",
    description,
    type: "website",
    siteName: "120VC",
    images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630, alt: "120VC strategy execution for enterprise leadership teams" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Strategy Execution & Implementation for Enterprise Teams | 120VC",
    description,
    images: [`${SITE_URL}/og.png`],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "120VC",
  url: SITE_URL,
  logo: "https://www.120vc.com/wp-content/uploads/2026/02/cropped-favicon-2-270x270.webp",
  description,
  founder: { "@type": "Person", name: "J. Scott", jobTitle: "Founder and CEO" },
  contactPoint: { "@type": "ContactPoint", email: "info@120vc.com", telephone: "+1-818-842-8041", contactType: "sales" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AnalyticsBridge />
        <ScrollNarrativeMotion />
        <link rel="preconnect" href="https://www.120vc.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <noscript><style>{`.reveal,.text-effect-word{opacity:1!important;transform:none!important}`}</style></noscript>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { AnalyticsBridge } from "./components/analytics-bridge";
import "./globals.css";
import "./master.css";
import "./hierarchy.css";

const SITE_URL = "https://www.120vc.com";
const description = "120VC installs an Execution Leadership System inside live work so enterprise teams can align priorities, decision rights, ownership, capacity, and strategy execution.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "120VC | Execution Leadership", template: "%s | 120VC" },
  description,
  icons: { icon: "https://www.120vc.com/wp-content/uploads/2026/02/cropped-favicon-2-32x32.webp" },
  openGraph: {
    title: "Strategy Execution for Enterprise Leadership Teams | 120VC",
    description,
    type: "website",
    siteName: "120VC",
    images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630, alt: "120VC strategy execution for enterprise leadership teams" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Strategy Execution for Enterprise Leadership Teams | 120VC",
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
  description: "120VC is an Execution Leadership firm that installs a leadership operating system for strategy execution inside live enterprise work.",
  founder: { "@type": "Person", name: "J. Scott", jobTitle: "Founder and CEO" },
  contactPoint: { "@type": "ContactPoint", email: "info@120vc.com", telephone: "+1-818-842-8041", contactType: "sales" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AnalyticsBridge />
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

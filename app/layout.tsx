import type { Metadata } from "next";
import "./globals.css";
import "./master.css";

const SITE_URL = "https://www.120vc.com";
const description = "120VC installs an Execution Leadership System inside live enterprise work so strategy becomes coordinated, measurable execution.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "120VC | Execution Leadership", template: "%s | 120VC" },
  description,
  icons: { icon: "https://www.120vc.com/wp-content/uploads/2026/02/cropped-favicon-2-32x32.webp" },
  openGraph: {
    title: "120VC | Close the Strategy Execution Gap",
    description,
    type: "website",
    siteName: "120VC",
    images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630, alt: "120VC closes the gap between strategy and execution" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "120VC | Close the Strategy Execution Gap",
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
  description: "120VC is an Execution Leadership firm. We install a shared leadership system inside live work so enterprise teams can turn strategy into more predictable execution.",
  founder: { "@type": "Person", name: "J. Scott", jobTitle: "Founder and CEO" },
  contactPoint: { "@type": "ContactPoint", email: "info@120vc.com", telephone: "+1-818-842-8041", contactType: "sales" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
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

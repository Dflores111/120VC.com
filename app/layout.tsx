import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "www.120vc.com";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);
  const description = "120VC installs an Execution Leadership System inside live enterprise work so strategy becomes coordinated, measurable execution.";
  return {
    metadataBase,
    title: { default: "120VC | Execution Leadership", template: "%s | 120VC" },
    description,
    icons: { icon: "https://www.120vc.com/wp-content/uploads/2026/02/cropped-favicon-2-32x32.webp" },
    openGraph: {
      title: "120VC | Close the Strategy Execution Gap",
      description,
      type: "website",
      images: [{ url: new URL("/og.png", metadataBase).toString(), width: 1200, height: 630, alt: "120VC closes the gap between strategy and execution" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "120VC | Close the Strategy Execution Gap",
      description,
      images: [new URL("/og.png", metadataBase).toString()],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <noscript><style>{`.reveal{opacity:1!important;transform:none!important}`}</style></noscript>
        {children}
      </body>
    </html>
  );
}

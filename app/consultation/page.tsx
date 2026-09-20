import type { Metadata } from "next";
import ContactPage from "../contact/page";

export const metadata: Metadata = {
  title: "Talk With 120VC About Work That Is Not Moving",
  description: "Bring the outcome that is not moving. 120VC will help clarify the execution problem, determine fit, and identify the most useful next step.",
  alternates: { canonical: "/contact" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Talk With 120VC About Work That Is Not Moving | 120VC",
    description: "Bring the outcome that is not moving. We will help clarify the problem, determine whether 120VC is relevant, and identify the next useful step.",
    url: "/consultation",
    type: "website",
    images: [{ url: "https://www.120vc.com/og.png", width: 1200, height: 630, alt: "A focused conversation with 120VC about critical enterprise work" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Talk With 120VC About Work That Is Not Moving | 120VC",
    description: "Bring the outcome that is not moving. We will help clarify the problem and the next useful step.",
    images: ["https://www.120vc.com/og.png"],
  },
};

export default ContactPage;

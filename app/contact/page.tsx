import type { Metadata } from "next";
import { ConsultationForm } from "../components/consultation-form";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = {
  title: "Contact 120VC",
  description: "Diagnose where execution is breaking, confirm leadership readiness, and identify the right 120VC installation scope.",
  alternates: { canonical: "/consultation" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Leadership System Consultation | 120VC",
    description: "Diagnose where execution is breaking and identify the most useful next step.",
    images: [{ url: "https://www.120vc.com/og.png", width: 1200, height: 630, alt: "120VC closes the gap between strategy and execution" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leadership System Consultation | 120VC",
    description: "Diagnose where execution is breaking and identify the most useful next step.",
    images: ["https://www.120vc.com/og.png"],
  },
};

const contextLabels: Record<string, string> = {
  "condition:portfolio": "Portfolio ROI audit",
  "condition:project": "Project leadership scope",
  "condition:visibility": "Portfolio visibility",
  "request:reference": "Client reference request",
  "request:speaking": "Speaking or media request",
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const condition = typeof params.condition === "string" ? params.condition : undefined;
  const request = typeof params.request === "string" ? params.request : undefined;
  const context = (condition && contextLabels[`condition:${condition}`]) || (request && contextLabels[`request:${request}`]) || undefined;
  return (
    <div className="site-shell inner-site">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="inner-hero contact-hero">
          <div className="inner-hero-grid" aria-hidden="true" />
          <div className="inner-hero-copy">
            <p className="eyebrow eyebrow-light"><span className="eyebrow-mark" />Leadership System Consultation</p>
            <h1>Diagnose where execution is breaking.</h1>
            <p className="inner-description">This confidential conversation is for enterprise leaders accountable for a high-stakes initiative, executive team, transformation, internal function, or project portfolio.</p>
          </div>
          <div className="inner-hero-aside">
            <p className="section-index">This is not</p>
            <p>A scripted product demo, generic presentation, or pressure call. The objective is the right recommendation—not automatic enrollment.</p>
          </div>
        </section>

        <section className="consultation-layout" aria-labelledby="consultation-detail-title">
          <div className="consultation-context">
            <p className="section-index">During the conversation</p>
            <h2 id="consultation-detail-title">We examine the condition and readiness.</h2>
            <ul className="content-list">
              <li><span aria-hidden="true" />The business outcome at risk</li>
              <li><span aria-hidden="true" />Where execution is breaking</li>
              <li><span aria-hidden="true" />What the condition is costing</li>
              <li><span aria-hidden="true" />The relevant leadership authority and team</li>
              <li><span aria-hidden="true" />Whether the organization is ready to change how work operates</li>
              <li><span aria-hidden="true" />Which installation scope—or other next step—fits</li>
            </ul>
            <div className="contact-direct">
              <p><strong>Prefer direct contact?</strong></p>
              <a href="mailto:info@120vc.com">info@120vc.com</a>
              <a href="tel:+18188428041">818.842.8041</a>
            </div>
          </div>
          <ConsultationForm context={context} />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

import type { Metadata } from "next";
import { ConsultationForm } from "../components/consultation-form";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = {
  title: "Leadership System Consultation",
  description: "Diagnose where execution is breaking, confirm leadership readiness, and identify the right 120VC installation scope.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Leadership System Consultation | 120VC", description: "Diagnose where execution is breaking and identify the most useful next step.", images: [] },
  twitter: { title: "Leadership System Consultation | 120VC", description: "Diagnose where execution is breaking and identify the most useful next step.", images: [] },
};

export default function ContactPage() {
  return (
    <div className="site-shell inner-site">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content">
        <section className="inner-hero contact-hero">
          <div className="inner-hero-grid" aria-hidden="true" />
          <div className="inner-hero-copy">
            <p className="eyebrow eyebrow-light"><span className="eyebrow-mark" />Leadership System Consultation</p>
            <h1>Find where execution is breaking.</h1>
            <p className="inner-description">A confidential readiness, fit, and diagnostic conversation for enterprise leaders accountable for a high-stakes team, initiative, transformation, function, or portfolio.</p>
          </div>
          <div className="inner-hero-aside">
            <p className="section-index">This is not</p>
            <p>A scripted product demo, generic presentation, or pressure call. The objective is the right recommendation—not automatic enrollment.</p>
          </div>
        </section>

        <section className="consultation-layout">
          <div className="consultation-context">
            <p className="section-index">During the conversation</p>
            <h2>We will examine the condition, authority, consequence, and readiness.</h2>
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
          <ConsultationForm />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

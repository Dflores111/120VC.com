import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ConsultationForm } from "../components/consultation-form";
import { ImageMask } from "../components/image-mask";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = {
  title: "Contact 120VC",
  description: "Bring the problem that keeps returning and identify the most useful next step.",
  alternates: { canonical: "/consultation" },
  robots: { index: false, follow: true },
};

const contextLabels: Record<string, string> = {
  "condition:portfolio": "Portfolio ROI audit",
  "condition:project": "Project leadership scope",
  "condition:visibility": "Portfolio visibility",
  "request:reference": "Client reference request",
  "request:speaking": "Speaking or media request",
};

const conversationSteps = [
  ["Review the context", "We read the condition, the outcome at risk, and the role you own before the conversation."],
  ["Talk about the real condition", "The conversation examines where execution is breaking—without a scripted product demo."],
  ["Leave with a recommendation", "The next step may be a 120VC scope, a resource, a referral, or no further action."],
] as const;

export default async function ContactPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const condition = typeof params.condition === "string" ? params.condition : undefined;
  const request = typeof params.request === "string" ? params.request : undefined;
  const source = typeof params.source === "string" ? params.source : undefined;
  const context = (condition && contextLabels[`condition:${condition}`]) || (request && contextLabels[`request:${request}`]) || undefined;

  return (
    <div className="site-shell hierarchy-site consultation-page consultation-v2">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="consultation-hero supporting-hero" data-major-section data-journey-stage="recognize" aria-labelledby="consultation-title">
          <div className="supporting-hero-copy">
            <h1 id="consultation-title">Bring us the problem that keeps returning.</h1>
            <p>This is a focused conversation for the enterprise leader accountable for an outcome that is not moving as it should.</p>
            <a className="button button-primary" href="#consultation-request">Request a conversation <span aria-hidden="true" data-direction="down">↓</span></a>
          </div>
          <ImageMask
            src="/images/problems/strategy-conversation.jpg"
            alt="Enterprise leaders in a focused working conversation."
            width={1800}
            height={1200}
            variant="step"
            priority
            style={{ "--image-position": "50% 44%" } as CSSProperties}
          />
        </section>

        <section className="consultation-form-stage" id="consultation-request" data-major-section data-journey-stage="act" aria-labelledby="consultation-form-stage-title">
          <div className="consultation-form-intro">
            <h2 id="consultation-form-stage-title">Start with what you know.</h2>
            <p>You do not need a diagnosis or polished brief. Two short steps give us enough context to prepare a useful conversation.</p>
          </div>
          <ConsultationForm context={context} source={source} />
        </section>

        <section className="consultation-sequence" data-major-section data-journey-stage="understand" aria-labelledby="consultation-sequence-title">
          <header className="supporting-section-heading supporting-section-heading-centered">
            <h2 id="consultation-sequence-title">What happens after you reach out.</h2>
          </header>
          <ol>
            {conversationSteps.map(([title, description], index) => (
              <li key={title}><span>{index + 1}</span><h3>{title}</h3><p>{description}</p></li>
            ))}
          </ol>
        </section>

        <section className="consultation-direct" data-major-section data-journey-stage="act" aria-labelledby="consultation-direct-title">
          <div><h2 id="consultation-direct-title">Prefer direct contact?</h2><p>Email or call. A human will respond.</p></div>
          <div><a href="mailto:info@120vc.com">info@120vc.com</a><a href="tel:+18188428041">818.842.8041</a></div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

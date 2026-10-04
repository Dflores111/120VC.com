"use client";

import { useEffect, useState, type FormEvent } from "react";
import { get120vcAttribution } from "./analytics-bridge";

type PreparedRequest = {
  name: string;
  company: string;
  email: string;
  mailto: string;
  draft: Record<string, string>;
};

const conditions = [
  "The leadership team is not moving together",
  "A critical initiative is at risk",
  "A transformation is not taking hold",
  "The portfolio has too much work and unclear return",
  "An internal function is stuck reacting",
  "Not sure yet",
] as const;

export function ConsultationForm({ context, source }: { context?: string; source?: string }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [prepared, setPrepared] = useState<PreparedRequest | null>(null);
  const [draft, setDraft] = useState<Record<string, string>>({});

  useEffect(() => {
    if (step === 2 && !prepared) document.querySelector<HTMLElement>("#condition")?.focus();
  }, [prepared, step]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }

    const form = new FormData(event.currentTarget);
    const firstName = String(form.get("firstName") || "");
    const company = String(form.get("company") || "");
    const email = String(form.get("email") || "");
    const attribution = get120vcAttribution();
    const lines = [
      ...(context ? [`Regarding: ${context}`] : []),
      ...(source ? [`Website source: ${source}`] : []),
      `Entry route: ${attribution.entry_route}`,
      ...(attribution.utm_source ? [`UTM source: ${attribution.utm_source}`] : []),
      ...(attribution.utm_medium ? [`UTM medium: ${attribution.utm_medium}`] : []),
      ...(attribution.utm_campaign ? [`UTM campaign: ${attribution.utm_campaign}`] : []),
      `Name: ${firstName}`,
      `Work email: ${email}`,
      `Company: ${company}`,
      `Role or title: ${form.get("role")}`,
      `Where the work is breaking: ${form.get("condition")}`,
      `What they are trying to get done: ${form.get("goal") || "Not provided"}`,
      `When it needs to improve: ${form.get("timing") || "Not provided"}`,
    ];
    const subject = encodeURIComponent(`${context || "120VC consultation"} — ${company}`);
    const body = encodeURIComponent(lines.join("\n"));
    const nextDraft = Object.fromEntries([...form.entries()].map(([key, value]) => [key, String(value)]));
    setDraft(nextDraft);
    setPrepared({ name: firstName, company, email, mailto: `mailto:info@120vc.com?subject=${subject}&body=${body}`, draft: nextDraft });
    requestAnimationFrame(() => document.querySelector<HTMLElement>("#consultation-review")?.focus());
  }

  if (prepared) {
    return (
      <section className="consultation-form form-review" id="consultation-review" tabIndex={-1} aria-labelledby="review-title">
        <p className="form-state-title">Request prepared</p>
        <h2 id="review-title">Open your email to send the request.</h2>
        <p><strong>{prepared.name}</strong> at <strong>{prepared.company}</strong>, the next control opens your email app with the request addressed to 120VC. Nothing has been sent yet.</p>
        <a className="button button-primary" data-primary-action href={prepared.mailto}>Send Request by Email <span aria-hidden="true" data-direction="out">↗</span></a>
        <p className="form-fallback">If your email app does not open, send the request from <strong>{prepared.email}</strong> directly to <a href="mailto:info@120vc.com">info@120vc.com</a>.</p>
        <button className="form-edit" type="button" onClick={() => {
          setDraft(prepared.draft);
          setPrepared(null);
          setStep(2);
        }}>Edit the request</button>
      </section>
    );
  }

  return (
    <form className="consultation-form" onSubmit={submit}>
      <div className="form-heading">
        <p className="form-state-title">Two short steps</p>
        {context && <p className="form-context">Regarding: <strong>{context}</strong></p>}
        <h2>Tell us where the work is breaking.</h2>
        <p>We need enough context to prepare—not a complete brief.</p>
      </div>

      <ol className="form-progress" aria-label="Consultation request progress">
        <li className={step === 1 ? "form-progress-current" : "form-progress-complete"} aria-current={step === 1 ? "step" : undefined}><span>1</span> About you</li>
        <li className={step === 2 ? "form-progress-current" : ""} aria-current={step === 2 ? "step" : undefined}><span>2</span> Where work is breaking</li>
      </ol>

      <fieldset className="form-step" hidden={step !== 1}>
        <legend className="sr-only">About you</legend>
        <div className="form-grid">
          <div className="form-field"><label htmlFor="first-name">Name</label><input id="first-name" name="firstName" autoComplete="name" defaultValue={draft.firstName} required /></div>
          <div className="form-field"><label htmlFor="work-email">Work email</label><input id="work-email" name="email" type="email" autoComplete="email" defaultValue={draft.email} required /></div>
          <div className="form-field"><label htmlFor="company">Company</label><input id="company" name="company" autoComplete="organization" defaultValue={draft.company} required /></div>
          <div className="form-wide form-field"><label htmlFor="role">Role or title</label><input id="role" name="role" autoComplete="organization-title" defaultValue={draft.role} required /></div>
        </div>
      </fieldset>

      <fieldset className="form-step" hidden={step !== 2} disabled={step !== 2}>
        <legend className="sr-only">Where the work is breaking</legend>
        <div className="form-grid" id="consultation-step-two">
          <div className="form-wide form-field"><label htmlFor="condition">Where is the work breaking?</label>
            <select id="condition" name="condition" required defaultValue={draft.condition || ""}>
              <option value="" disabled>Select the closest condition</option>
              {conditions.map((condition) => <option value={condition} key={condition}>{condition}</option>)}
            </select>
          </div>
          <div className="form-wide form-field"><label htmlFor="goal">What are you trying to deliver? <span>(optional)</span></label><textarea id="goal" name="goal" rows={4} defaultValue={draft.goal} /></div>
          <div className="form-wide form-field"><label htmlFor="timing">When does this need to improve? <span>(optional)</span></label><input id="timing" name="timing" defaultValue={draft.timing} /></div>
        </div>
      </fieldset>

      <div className="form-actions">
        {step === 2 && <button className="button button-secondary" type="button" onClick={() => {
          setStep(1);
          requestAnimationFrame(() => document.querySelector<HTMLElement>("#first-name")?.focus());
        }}>Back <span aria-hidden="true" data-direction="left">←</span></button>}
        <button className="button button-primary form-submit" data-primary-action type="submit">{step === 1 ? "Continue" : "Prepare email request"} <span aria-hidden="true">→</span></button>
      </div>
      <p className="form-privacy">This prepares an email draft; nothing is submitted here. Share enough context to start a conversation, not confidential company information.</p>
    </form>
  );
}

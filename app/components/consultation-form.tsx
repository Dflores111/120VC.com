"use client";

import { useState, type FormEvent } from "react";

type PreparedRequest = {
  name: string;
  company: string;
  email: string;
  mailto: string;
  draft: Record<string, string>;
};

const conditions = [
  "Strategy is not becoming execution",
  "The leadership team is not operating as one",
  "Transformation is not becoming normal work",
  "The portfolio is busy but return is unclear",
  "An internal function cannot prove its value",
  "Another execution condition",
] as const;

export function ConsultationForm({ context }: { context?: string }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [prepared, setPrepared] = useState<PreparedRequest | null>(null);
  const [draft, setDraft] = useState<Record<string, string>>({});

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === 1) {
      setStep(2);
      requestAnimationFrame(() => document.querySelector<HTMLElement>("#accountability")?.focus());
      return;
    }

    const form = new FormData(event.currentTarget);
    const firstName = String(form.get("firstName") || "");
    const lastName = String(form.get("lastName") || "");
    const company = String(form.get("company") || "");
    const email = String(form.get("email") || "");
    const lines = [
      ...(context ? [`Regarding: ${context}`] : []),
      `Name: ${firstName} ${lastName}`,
      `Work email: ${email}`,
      `Company: ${company}`,
      `Role or title: ${form.get("role")}`,
      `Accountable for delivering: ${form.get("accountability")}`,
      `Execution condition: ${form.get("condition")}`,
      `Consequence if unchanged: ${form.get("consequence")}`,
      `Other people involved: ${form.get("involved")}`,
      `Timing: ${form.get("timing")}`,
    ];
    const subject = encodeURIComponent(`${context || "Leadership System Consultation"} — ${company}`);
    const body = encodeURIComponent(lines.join("\n"));
    const nextDraft = Object.fromEntries([...form.entries()].map(([key, value]) => [key, String(value)]));
    setDraft(nextDraft);
    setPrepared({ name: `${firstName} ${lastName}`, company, email, mailto: `mailto:info@120vc.com?subject=${subject}&body=${body}`, draft: nextDraft });
    requestAnimationFrame(() => document.querySelector<HTMLElement>("#consultation-review")?.focus());
  }

  if (prepared) {
    return (
      <section className="consultation-form form-review" id="consultation-review" tabIndex={-1} aria-labelledby="review-title">
        <p className="section-index">Request reviewed</p>
        <h2 id="review-title">Your consultation request is ready.</h2>
        <p><strong>{prepared.name}</strong> at <strong>{prepared.company}</strong>, the next control opens your email app with the request addressed to 120VC. Nothing has been sent yet.</p>
        <a className="button button-primary" href={prepared.mailto}>Send Request by Email <span aria-hidden="true">↗</span></a>
        <p className="form-fallback">If your email app does not open, send the request from <strong>{prepared.email}</strong> directly to <a href="mailto:info@120vc.com">info@120vc.com</a>.</p>
        <button className="form-edit" type="button" onClick={() => {
          setDraft(prepared.draft);
          setPrepared(null);
          setStep(2);
          requestAnimationFrame(() => document.querySelector<HTMLElement>("#accountability")?.focus());
        }}>Edit the request</button>
      </section>
    );
  }

  return (
    <form className="consultation-form" onSubmit={submit}>
      <div className="form-heading">
        <p className="section-index">Request a Leadership System Consultation</p>
        {context && <p className="form-context">Regarding: <strong>{context}</strong></p>}
        <h2>Start with the outcome you own.</h2>
        <p>You do not need a complete brief. The two short steps help us understand the accountability, condition, consequence, and timing.</p>
      </div>

      <ol className="form-progress" aria-label="Consultation request progress">
        <li className={step === 1 ? "form-progress-current" : "form-progress-complete"} aria-current={step === 1 ? "step" : undefined}><span>1</span> Your accountability</li>
        <li className={step === 2 ? "form-progress-current" : ""} aria-current={step === 2 ? "step" : undefined}><span>2</span> The condition</li>
      </ol>

      <fieldset className="form-step" hidden={step !== 1}>
        <legend className="sr-only">Your accountability</legend>
        <div className="form-grid">
          <label>First name<input id="first-name" name="firstName" autoComplete="given-name" defaultValue={draft.firstName} required /></label>
          <label>Last name<input name="lastName" autoComplete="family-name" defaultValue={draft.lastName} required /></label>
          <label>Work email<input name="email" type="email" autoComplete="email" defaultValue={draft.email} required /></label>
          <label>Company<input name="company" autoComplete="organization" defaultValue={draft.company} required /></label>
          <label className="form-wide">Role or title<input name="role" autoComplete="organization-title" defaultValue={draft.role} required /></label>
        </div>
      </fieldset>

      <fieldset className="form-step" hidden={step !== 2} disabled={step !== 2}>
        <legend className="sr-only">The execution condition</legend>
        <div className="form-grid" id="consultation-step-two">
          <label className="form-wide">What are you accountable for delivering?<textarea id="accountability" name="accountability" rows={4} defaultValue={draft.accountability} required /></label>
          <label className="form-wide">Which condition best describes what is happening?
            <select name="condition" required defaultValue={draft.condition || ""}>
              <option value="" disabled>Select the closest condition</option>
              {conditions.map((condition) => <option value={condition} key={condition}>{condition}</option>)}
            </select>
          </label>
          <label className="form-wide">What happens if this does not improve?<textarea name="consequence" rows={4} defaultValue={draft.consequence} required /></label>
          <label>Who else is involved?<input name="involved" defaultValue={draft.involved} required /></label>
          <label>When does it need to improve?<input name="timing" defaultValue={draft.timing} required /></label>
        </div>
      </fieldset>

      <div className="form-actions">
        {step === 2 && <button className="button button-secondary" type="button" onClick={() => {
          setStep(1);
          requestAnimationFrame(() => document.querySelector<HTMLElement>("#first-name")?.focus());
        }}>Back <span aria-hidden="true">←</span></button>}
        <button className="button button-primary form-submit" type="submit">{step === 1 ? "Continue" : "Review Request"} <span aria-hidden="true">→</span></button>
      </div>
      <p className="form-privacy">Confidential · Diagnostic · No generic presentation · No predetermined offer · Human follow-up</p>
      <p className="form-fallback">This private prototype prepares a direct email request. Connect the approved HubSpot form, routing, consent, and thank-you state before public launch.</p>
    </form>
  );
}

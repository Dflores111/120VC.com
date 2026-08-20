"use client";

import { useState, type FormEvent } from "react";

export function ConsultationForm() {
  const [prepared, setPrepared] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const lines = [
      `Name: ${form.get("name")}`,
      `Work email: ${form.get("email")}`,
      `Company: ${form.get("company")}`,
      `Role: ${form.get("role") || "Not provided"}`,
      `What is breaking or at risk: ${form.get("situation")}`,
    ];
    const subject = encodeURIComponent(`Leadership System Consultation — ${form.get("company")}`);
    const body = encodeURIComponent(lines.join("\n"));
    setPrepared(true);
    window.location.href = `mailto:info@120vc.com?subject=${subject}&body=${body}`;
  }

  return (
    <form className="consultation-form" onSubmit={submit}>
      <div className="form-heading">
        <p className="section-index">Request a Leadership System Consultation</p>
        <p>You do not need a complete brief. Share enough context to begin; your email app will open with the request prepared for direct follow-up.</p>
      </div>
      <div className="form-grid">
        <label>Full name<input name="name" autoComplete="name" required /></label>
        <label>Work email<input name="email" type="email" autoComplete="email" required /></label>
        <label>Company<input name="company" autoComplete="organization" required /></label>
        <label>Role or title (optional)<input name="role" autoComplete="organization-title" /></label>
        <label className="form-wide">What is breaking—or what outcome is at risk?<textarea name="situation" rows={5} required /></label>
      </div>
      <button className="button button-primary form-submit" type="submit">Prepare email request <span aria-hidden="true">↗</span></button>
      <p className="form-privacy">Confidential · Diagnostic · No generic presentation · No predetermined offer</p>
      <p className="form-fallback">If your email app does not open, send your context directly to <a href="mailto:info@120vc.com">info@120vc.com</a>.</p>
      {prepared && <p className="form-status" role="status">Your email request is prepared. Send it from your email app to complete the request.</p>}
    </form>
  );
}

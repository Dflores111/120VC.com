"use client";

import { useState, type FormEvent } from "react";

export function ConsultationForm() {
  const [prepared, setPrepared] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const lines = [
      `Name: ${form.get("firstName")} ${form.get("lastName")}`,
      `Work email: ${form.get("email")}`,
      `Company: ${form.get("company")}`,
      `Role: ${form.get("role")}`,
      `Condition: ${form.get("condition")}`,
      `Accountable for: ${form.get("outcome")}`,
      `If it does not improve: ${form.get("consequence") || "Not provided"}`,
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
        <p>Your email app will open with the context below prepared for direct follow-up from 120VC.</p>
      </div>
      <div className="form-grid">
        <label>First name<input name="firstName" autoComplete="given-name" required /></label>
        <label>Last name<input name="lastName" autoComplete="family-name" required /></label>
        <label>Work email<input name="email" type="email" autoComplete="email" required /></label>
        <label>Company<input name="company" autoComplete="organization" required /></label>
        <label className="form-wide">Role or title<input name="role" autoComplete="organization-title" required /></label>
        <label className="form-wide">Which condition best describes what is happening?
          <select name="condition" required defaultValue="">
            <option value="" disabled>Select the closest condition</option>
            <option>Strategy is not becoming execution</option>
            <option>The leadership team is not operating as one</option>
            <option>A transformation is not sticking</option>
            <option>The project portfolio is not producing enough return</option>
            <option>An internal function is reactive or unable to prove value</option>
            <option>A specific initiative or project is at risk</option>
            <option>Not sure yet</option>
          </select>
        </label>
        <label className="form-wide">What are you accountable for delivering?<textarea name="outcome" rows={4} required /></label>
        <label className="form-wide">What happens if this does not improve?<textarea name="consequence" rows={3} /></label>
      </div>
      <button className="button button-primary form-submit" type="submit">Send consultation request <span aria-hidden="true">↗</span></button>
      <p className="form-privacy">Confidential · Diagnostic · No generic presentation · No predetermined offer</p>
      {prepared && <p className="form-status" role="status">Your email request is prepared. Send it from your email app to complete the request.</p>}
    </form>
  );
}

"use client";

/* eslint-disable @next/next/no-img-element -- The locally optimized book mockup is rendered by vinext. */

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import type { BookLeadConfig } from "../problem-page-data";

type FieldName = "email" | "company" | "role";
type FieldErrors = Partial<Record<FieldName, string>>;

const BOOK_URL = "https://www.120vc.com/book-download-the-strategy-execution-gap/";

function validate(values: Record<FieldName, string>): FieldErrors {
  const errors: FieldErrors = {};
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) errors.email = "Enter a valid work email.";
  if (values.company.trim().length < 2) errors.company = "Enter your company name.";
  if (values.role.trim().length < 2) errors.role = "Enter your role or title.";
  return errors;
}

export function BookLeadCapture({ config }: { config: BookLeadConfig }) {
  const [values, setValues] = useState<Record<FieldName, string>>({ email: "", company: "", role: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [started, setStarted] = useState(false);
  const [complete, setComplete] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  const trackedBookUrl = `${BOOK_URL}?utm_source=120vc&utm_medium=problem_page&utm_campaign=strategy_execution_gap_book&utm_content=${encodeURIComponent(config.sourcePage)}&source_cta=${encodeURIComponent(config.sourceCta)}`;

  function update(field: FieldName, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      requestAnimationFrame(() => {
        form.querySelector<HTMLInputElement>("[aria-invalid='true']")?.focus();
      });
      return;
    }
    setComplete(true);
    requestAnimationFrame(() => successRef.current?.focus());
  }

  return (
    <section className="book-lead" id="strategy-execution-gap-book" data-source-page={config.sourcePage} data-source-cta={config.sourceCta}>
      <div className="book-lead-copy">
        <p className="problem-kicker">{config.eyebrow}</p>
        <h2>{config.title}</h2>
        <p>{config.description}</p>
        <ul>
          {config.learn.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <img src="/images/problems/strategy-gap-book.png" alt="Cover of The Strategy Execution Gap by J. Scott." width="900" height="900" />
      </div>

      <div className="book-lead-panel">
        {!complete ? (
          <form
            noValidate
            onFocusCapture={() => setStarted(true)}
            onSubmit={handleSubmit}
            data-form-state={started ? "started" : "idle"}
            data-capture-mode="owner-preview-not-connected"
          >
            <div className="book-form-heading">
              <p className="problem-kicker">Qualified reader preview</p>
              <h3>Continue to the book.</h3>
              <p>Three fields are enough to understand who is exploring this problem without adding unnecessary friction.</p>
            </div>

            <input type="hidden" name="source_page" value={config.sourcePage} />
            <input type="hidden" name="source_cta" value={config.sourceCta} />

            <div className="book-form-field">
              <label htmlFor={`${config.sourcePage}-email`}>Work email</label>
              <input
                id={`${config.sourcePage}-email`}
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={(event) => update("email", event.target.value)}
                onBlur={() => setErrors((current) => ({ ...current, ...validate({ ...values, company: values.company || "ok", role: values.role || "ok" }) }))}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? `${config.sourcePage}-email-error` : undefined}
                required
              />
              {errors.email && <span className="book-form-error" id={`${config.sourcePage}-email-error`}>{errors.email}</span>}
            </div>

            <div className="book-form-field">
              <label htmlFor={`${config.sourcePage}-company`}>Company</label>
              <input
                id={`${config.sourcePage}-company`}
                name="company"
                autoComplete="organization"
                value={values.company}
                onChange={(event) => update("company", event.target.value)}
                onBlur={() => {
                  if (values.company.trim().length < 2) setErrors((current) => ({ ...current, company: "Enter your company name." }));
                }}
                aria-invalid={Boolean(errors.company)}
                aria-describedby={errors.company ? `${config.sourcePage}-company-error` : undefined}
                required
              />
              {errors.company && <span className="book-form-error" id={`${config.sourcePage}-company-error`}>{errors.company}</span>}
            </div>

            <div className="book-form-field">
              <label htmlFor={`${config.sourcePage}-role`}>Role or title</label>
              <input
                id={`${config.sourcePage}-role`}
                name="role"
                autoComplete="organization-title"
                value={values.role}
                onChange={(event) => update("role", event.target.value)}
                onBlur={() => {
                  if (values.role.trim().length < 2) setErrors((current) => ({ ...current, role: "Enter your role or title." }));
                }}
                aria-invalid={Boolean(errors.role)}
                aria-describedby={errors.role ? `${config.sourcePage}-role-error` : undefined}
                required
              />
              {errors.role && <span className="book-form-error" id={`${config.sourcePage}-role-error`}>{errors.role}</span>}
            </div>

            <button className="button button-primary book-form-submit" type="submit">
              Continue to the book <span aria-hidden="true">→</span>
            </button>
            <p className="book-form-hold"><strong>OWNER PREVIEW — LEAD CAPTURE NOT CONNECTED.</strong> Contact details are not sent or stored. Connect approved HubSpot routing, consent, privacy copy, and analytics before publication.</p>
          </form>
        ) : (
          <div className="book-success" ref={successRef} tabIndex={-1} role="status">
            <p className="problem-kicker">Preview success state</p>
            <h3>The next step is ready.</h3>
            <p>Your information was not sent or stored. The source page and CTA are carried in the verified book-page URL so the production integration can preserve attribution.</p>
            <a className="button button-primary" href={trackedBookUrl} data-track-event="book_download_clicked" data-source-page={config.sourcePage} data-source-cta={config.sourceCta}>
              Open the book download page <span aria-hidden="true">↗</span>
            </a>
            <Link className="book-next-link" href={config.nextStep.href}>
              <span>{config.nextStep.title}</span>
              <small>{config.nextStep.description}</small>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

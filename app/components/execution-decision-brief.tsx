"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "./native-link";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { answerOptions, briefQuestions, briefQuestionHeadings, buildDecisionBrief, deliveryContexts, meetingRecordFields, type BriefAnswer, type BriefAnswers, type BriefMeetingRecord, type MeetingRecordKey } from "../data/execution-decision-brief";

export function ExecutionDecisionBrief() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [context, setContext] = useState("");
  const [answers, setAnswers] = useState<BriefAnswers>({});
  const [complete, setComplete] = useState(false);
  const [copied, setCopied] = useState("");
  const [review, setReview] = useState(false);
  const [meetingRecord, setMeetingRecord] = useState<Partial<BriefMeetingRecord>>({});
  const [contactDraft, setContactDraft] = useState<Record<string, string>>({});
  const [requestPrepared, setRequestPrepared] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const reviewHeading = useRef<HTMLHeadingElement>(null);
  const result = complete ? buildDecisionBrief(context, answers, meetingRecord) : null;
  // Rebuild the explicit email draft from current page state, so editing the
  // optional meeting record cannot leave a previously prepared draft stale.
  const message = result ? [`Name: ${contactDraft.name || ""}`, `Work email: ${contactDraft.email || ""}`, `Company: ${contactDraft.company || ""}`, `Role: ${contactDraft.role || ""}`, "", "I would like to discuss the issue in this brief with 120VC.", "", result.text].join("\n") : "";
  const request = requestPrepared && result ? { mailto: `mailto:info@120vc.com?subject=${encodeURIComponent("Execution Decision Brief — review request")}&body=${encodeURIComponent(message)}`, message } : null;
  const question = step > 0 ? briefQuestions[step - 1] : null;
  const selected = step === 0 ? context : question ? answers[question.id] : undefined;

  useEffect(() => { if (started) (review ? reviewHeading.current : heading.current)?.focus(); }, [step, started, complete, review, requestPrepared]);

  function updateMeetingRecord(key: MeetingRecordKey, value: string) {
    setMeetingRecord(current => ({ ...current, [key]: value }));
    setCopied("");
  }

  function next(event: FormEvent) {
    event.preventDefault();
    if (!selected) return;
    if (step === 5) setComplete(true);
    else setStep(step + 1);
  }
  async function copyBrief() {
    if (!result) return;
    try { await navigator.clipboard.writeText(result.text); setCopied("Brief copied. Paste it into your meeting notes."); }
    catch { setCopied("Copy is unavailable in this browser. Use Download or Print instead."); }
  }
  function downloadBrief() {
    if (!result) return;
    const url = URL.createObjectURL(new Blob([result.text], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "120VC-execution-decision-brief.txt";
    anchor.hidden = true;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
    setCopied("Download requested. If it does not start, use Copy or Print.");
  }
  function prepareReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!result) return;
    const data = new FormData(event.currentTarget);
    setContactDraft(Object.fromEntries([...data.entries()].map(([key, value]) => [key, String(value)])));
    setRequestPrepared(true);
  }

  return <div className="site-shell hierarchy-site executive-brief-site">
    <a className="skip-link" href="#main-content">Skip to content</a><SiteHeader />
    <main id="main-content" tabIndex={-1}>
      {!started ? <section className="decision-brief-intro" aria-labelledby="brief-title">
        <p className="executive-kicker">Execution Decision Brief</p>
        <h1 id="brief-title">Find the decision <span className="headline-keyword">holding delivery back.</span></h1>
        <p>Answer six questions about one cross-functional priority. Get a practical next step, then add your own outcome and commitments to a brief for your leadership meeting.</p>
        <button className="button button-primary" type="button" onClick={() => setStarted(true)}>Build my decision brief</button>
        <p className="brief-data-note">No email required. Your answers stay in this page until you choose to share them. Refreshing clears them. Avoid confidential information.</p>
        <div className="brief-value-list"><span><b>01</b> One decision to address</span><span><b>02</b> A 20-minute meeting agenda</span><span><b>03</b> A shareable working record</span></div>
        <details className="brief-method"><summary>See an example before starting</summary><h2>Give the outcome an owner.</h2><p>If ownership is missing, the brief recommends naming one outcome owner, agreeing on their authority, and recording each team’s commitment and date.</p><p><strong>Check next week:</strong> Can every team name the owner and its next deliverable?</p></details>
        <noscript><p>This interactive brief needs JavaScript. You can still <Link href="/resources/guides/ownership-across-teams">read the ownership guide</Link> or <Link href="/contact">contact 120VC</Link>.</p></noscript>
      </section> : !result ? <section className="decision-brief-workspace" aria-labelledby="brief-question-title">
        <div className="brief-progress"><span>Question {step + 1} of 6</span><progress value={step + 1} max={6} aria-label="Question progress" /></div>
        <form onSubmit={next}>
          <fieldset key={step}>
            <legend className="sr-only">{question?.title || "What are you trying to deliver?"}</legend>
            <h1 id="brief-question-title" ref={heading} tabIndex={-1}>{question ? briefQuestionHeadings[question.id] : "What are you trying to deliver?"}</h1>
            <p className="brief-question-context">{question?.title || "Think about one priority and what happened in the past 30 days."}</p>
            <div className="brief-options">{(step === 0 ? deliveryContexts.map(c => ({ value: c, label: c, description: "" })) : answerOptions).map(option => <label className="brief-option" key={option.value}>
              <input type="radio" name="brief-answer" value={option.value} checked={selected === option.value} required onChange={() => { if (step === 0) setContext(option.value); else if (question) setAnswers(current => ({ ...current, [question.id]: option.value as BriefAnswer })); }} />
              <span><strong>{option.label}</strong>{option.description && <small>{option.description}</small>}</span>
            </label>)}</div>
          </fieldset>
          <div className="brief-navigation">{step > 0 && <button className="button button-secondary" type="button" onClick={() => setStep(step - 1)}>Back</button>}<button className="button button-primary" type="submit">{step === 5 ? "Create my brief" : "Continue"}</button></div>
        </form>
      </section> : <section className="decision-brief-result" aria-labelledby="brief-result-title">
        <div className="brief-print-brand">120VC · Execution Decision Brief</div>
        <p className="executive-kicker">Your brief · {result.context}</p>
        <h1 id="brief-result-title" ref={heading} tabIndex={-1}>{result.title}</h1>
        <p className="brief-result-context">{result.reason}</p>
        <div className="brief-first-decision"><span>At the next leadership meeting</span><p>{result.action}</p></div>
        <section className="brief-meeting-record" aria-labelledby="brief-record-title">
          <h2 id="brief-record-title">Make it ready for your meeting.</h2>
          <p>Add the priority you want to discuss. Every field is optional; the guidance and exports already work.</p>
          <details className="brief-record-editor">
            <summary>{result.hasMeetingRecord ? "Edit your meeting record" : "Add your meeting record"} <span>Optional</span></summary>
            <fieldset className="brief-record-fields">
              <legend className="sr-only">Optional details for your meeting record</legend>
              {meetingRecordFields.map(field => {
                const placeholder = field.key === "outcome" ? result.contextPlan.outcomeExample
                  : field.key === "blockedDecision" ? result.contextPlan.decisionExample
                  : field.key === "accountableOwner" ? "Use a role, e.g. Transformation sponsor"
                  : "What will be delivered or confirmed next?";
                return <label className={`brief-record-field brief-record-field-${field.key}`} key={field.key} htmlFor={`meeting-${field.key}`}>
                  <span>{field.label}</span>
                  {field.key === "reviewDate" || field.key === "accountableOwner"
                    ? <input
                      id={`meeting-${field.key}`}
                      name={field.key}
                      type={field.key === "reviewDate" ? "date" : "text"}
                      autoComplete="off"
                      maxLength={field.maxLength}
                      placeholder={field.key === "reviewDate" ? undefined : placeholder}
                      value={meetingRecord[field.key] || ""}
                      onChange={event => updateMeetingRecord(field.key, event.currentTarget.value)}
                      // Segmented native date controls can emit input or blur
                      // independently of change. Keep every completed value in
                      // the same local state used by the preview and exports.
                      onInput={field.key === "reviewDate" ? event => updateMeetingRecord(field.key, event.currentTarget.value) : undefined}
                      onBlur={field.key === "reviewDate" ? event => updateMeetingRecord(field.key, event.currentTarget.value) : undefined}
                    />
                    : <textarea id={`meeting-${field.key}`} name={field.key} autoComplete="off" rows={2} maxLength={field.maxLength} placeholder={placeholder} value={meetingRecord[field.key] || ""} onChange={event => updateMeetingRecord(field.key, event.target.value)} />}
                </label>;
              })}
            </fieldset>
            <p className="brief-record-note">Use roles rather than personal names and keep details suitable for sharing. Refreshing clears this record.</p>
          </details>
          {result.hasMeetingRecord && <dl className="brief-record-summary" aria-label="Your meeting record">
            {meetingRecordFields.map(field => <div className={`brief-record-summary-${field.key}`} key={field.key}><dt>{field.label}</dt><dd>{result.meetingRecord[field.key] || "To agree in the meeting"}</dd></div>)}
          </dl>}
        </section>
        <div className="brief-working-output">
          <h2>Make the conversation useful.</h2>
          <p><strong>Bring:</strong> {result.bring}</p>
          <ol className="brief-agenda">{result.agenda.map((item, i) => <li key={item}><span>{i * 5}–{(i + 1) * 5} min</span>{item}</li>)}</ol>
          <h3>Your working record</h3><p>{result.artifact}</p>
          <h3>Check next week</h3><p>{result.signal}</p>
        </div>
        <div className="brief-export-actions"><button className="button button-primary" type="button" onClick={copyBrief}>Copy the brief</button><button className="button button-secondary" type="button" onClick={downloadBrief}>Download text</button><button className="button button-secondary" type="button" onClick={() => window.print()}>Print / save PDF</button></div>
        <p className="brief-feedback" role="status">{copied}</p>
        <details className="brief-method"><summary>Your answers and how this brief was selected</summary><dl>{briefQuestions.map(q => <div key={q.id}><dt>{q.label}</dt><dd>{answerOptions.find(o => o.value === answers[q.id])?.label}</dd></div>)}</dl><p>Missing agreements are shown before partly established agreements, in question order. Unknown answers are questions to confirm. This is a discussion aid—not an organizational benchmark, validated diagnostic, or prediction.</p></details>
        {result.focus && <Link className="home-section-link brief-related-guide" href={result.focus.guide}>{result.focus.guideLabel}</Link>}
        <aside className="brief-human-review" aria-labelledby="brief-review-title">
          <h2 id="brief-review-title">Want a second set of eyes?</h2><p>Ask 120VC to discuss the issue you surfaced and the leadership decision that could move delivery forward.</p>
          {!review ? <button className="button button-primary" type="button" onClick={() => setReview(true)}>Prepare a review request</button> : request ? <div className="brief-request-prepared"><h3 ref={reviewHeading} tabIndex={-1}>Your email draft is ready.</h3><p>Nothing has been sent. Open your email app, review the brief and your details, then send it to info@120vc.com.</p><a className="button button-primary" href={request.mailto}>Open email draft</a><details><summary>No email app? Copy your request</summary><textarea aria-label="Prepared review request" readOnly value={request.message} rows={8} /></details><button className="form-edit" type="button" onClick={() => setRequestPrepared(false)}>Edit details</button></div> : <form onSubmit={prepareReview}>
            <h3 ref={reviewHeading} tabIndex={-1}>Include your details in the email draft.</h3>
            <div className="brief-contact-fields"><label>Name<input name="name" autoComplete="name" maxLength={100} defaultValue={contactDraft.name} required /></label><label>Work email<input name="email" type="email" autoComplete="email" maxLength={200} defaultValue={contactDraft.email} required /></label><label>Company<input name="company" autoComplete="organization" maxLength={150} defaultValue={contactDraft.company} required /></label><label>Role or title<input name="role" autoComplete="organization-title" maxLength={150} defaultValue={contactDraft.role} required /></label></div>
            <p className="brief-data-note">These details are added to your draft, not submitted to a database. The draft includes your answers and any meeting record you entered. Send only information you are comfortable sharing; this does not subscribe you to marketing.</p>
            <button className="button button-primary" type="submit">Prepare email draft</button>
          </form>}
        </aside>
        <button className="form-edit brief-edit-answers" type="button" onClick={() => { setComplete(false); setStep(0); setReview(false); setRequestPrepared(false); setCopied(""); }}>Review or change my answers</button>
        <p className="brief-data-note">Use this as a starting point for discussion. Your answers are not independently verified. Do not include confidential company information when sharing.</p>
      </section>}
    </main><SiteFooter />
  </div>;
}

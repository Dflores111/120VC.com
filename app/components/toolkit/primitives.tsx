"use client";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { pillarNames, pillarReadiness, type Impact } from "../../data/toolkit";
import { downloadText } from "./workspace";

export function Field({ label, value, onChange, multiline, type = "text", required, hint, min, max, step }: { label: string; value: string | number; onChange: (value: string) => void; multiline?: boolean; type?: string; required?: boolean; hint?: string; min?: number; max?: number; step?: number }) {
  const id = useId();
  return <div className="tk-field"><label htmlFor={id}>{label}{required && <span className="tk-required"> Required</span>}</label>{hint && <p id={`${id}-hint`} className="tk-hint">{hint}</p>}{multiline ? <textarea id={id} value={value} onChange={e => onChange(e.target.value)} required={required} maxLength={12000} rows={3} aria-describedby={hint ? `${id}-hint` : undefined} /> : <input id={id} value={value} onChange={e => onChange(e.target.value)} onInput={type === "date" || type === "time" ? e => onChange(e.currentTarget.value) : undefined} type={type} required={required} maxLength={12000} min={min} max={max} step={step} aria-describedby={hint ? `${id}-hint` : undefined} />}</div>;
}
export function Select({ label, value, onChange, children, required }: { label: string; value: string; onChange: (value: string) => void; children: ReactNode; required?: boolean }) { const id = useId(); return <div className="tk-field"><label htmlFor={id}>{label}</label><select id={id} value={value} onChange={e => onChange(e.target.value)} required={required}>{children}</select></div>; }
export function Editor({ children, onSave, draft, savedDraft, label = "Save", onCancel }: { children: ReactNode; onSave: () => boolean; draft: unknown; savedDraft?: unknown; label?: string; onCancel?: () => void }) {
  const serialized = JSON.stringify(draft);
  const [saved, setSaved] = useState(serialized); const [message, setMessage] = useState("");
  const savedVersion = savedDraft === undefined ? saved : JSON.stringify(savedDraft);
  const dirty = serialized !== savedVersion;
  const form = useRef<HTMLFormElement>(null);
  const focusOnOpen = Boolean(onCancel);
  useEffect(() => { if (focusOnOpen) form.current?.querySelector<HTMLElement>("input, textarea, select")?.focus(); }, [focusOnOpen]);
  useEffect(() => { if (!dirty) return; const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); }; window.addEventListener("beforeunload", warn); return () => window.removeEventListener("beforeunload", warn); }, [dirty]);
  return <form ref={form} className="tk-editor" data-dirty={dirty} onChange={() => setMessage("")} onSubmit={e => { e.preventDefault(); if (onSave()) { setSaved(serialized); setMessage("Saved."); } else setMessage("Not saved. Resolve the message above and try again."); }}>
    {children}<div className="tk-form-footer"><div className="tk-actions"><button className="tk-primary" type="submit">{label}</button>{onCancel && <button type="button" onClick={() => { if (!dirty || window.confirm("Discard these unsaved form edits?")) onCancel(); }}>Close editor</button>}<button type="button" onClick={() => downloadText(JSON.stringify(draft, null, 2), "120vc-form-draft.json", "application/json")}>Download form draft</button></div><p className="tk-muted" role="status">{dirty ? "Unsaved edits — choose Save before switching tools." : message || "Use Save to keep changes. Form drafts are reference files, not full workspace backups."}</p></div>
  </form>;
}
export function canLeaveEditor() { return !document.querySelector('.tk-editor[data-dirty="true"]') || window.confirm("Leave these unsaved edits? Cancel to save or download the form draft first."); }
export function PillarFields({ value, onChange }: { value: Impact[]; onChange: (value: Impact[]) => void }) {
  const [active, setActive] = useState(0);
  function update(index: number, key: keyof Impact, text: string) { onChange(value.map((p, i) => i === index ? { ...p, [key]: text } : p)); }
  return <div className="tk-pillars"><p className="tk-status">{pillarReadiness(value)} <span className="tk-muted">· Based on your entries, not approval or independent validation.</span></p><nav className="tk-actions" aria-label="Pillar analysis">{pillarNames.map((name, i) => <button type="button" key={name} aria-pressed={i === active} onClick={() => setActive(i)}>{i + 1}. {name}</button>)}</nav><fieldset key={active}><legend>{pillarNames[active]}</legend><Select label={`${pillarNames[active]} effect`} value={value[active].effect} onChange={v => update(active, "effect", v)}><option value="unknown">Unknown — needs evidence</option><option value="positive">Positive — improves</option><option value="neutral">Neutral — no material change</option><option value="negative">Negative — harms</option></Select><Field label="Why would this effect occur?" value={value[active].mechanism} onChange={v => update(active, "mechanism", v)} multiline /><Field label="Evidence / source" value={value[active].evidence} onChange={v => update(active, "evidence", v)} multiline /><Field label="How will you check the result?" value={value[active].measure} onChange={v => update(active, "measure", v)} /><Field label="Downside or uncertainty" value={value[active].downside} onChange={v => update(active, "downside", v)} /></fieldset><p className="tk-hint">Review all three pillars. One improvement cannot cancel harm to another. Unknown is not neutral.</p></div>;
}
export function ExportReport({ text, filename }: { text: string; filename: string }) {
  const [status, setStatus] = useState("");
  return <section className="tk-report"><h2>Your working record</h2><p className="tk-muted">Review before sharing. No email is sent and no decision is approved by this tool.</p><div className="tk-actions"><button onClick={async () => { try { await navigator.clipboard.writeText(text); setStatus("Copied. Nothing was sent."); } catch { setStatus("Copy was blocked. Select the text below or download it."); } }}>Copy report</button><button onClick={() => downloadText(text, `${filename}.txt`)}>Download report</button><button onClick={() => window.print()}>Print report</button></div><p role="status">{status}</p><pre className="tk-print-report">{text}</pre></section>;
}
export function Steps({ names, step, onChange }: { names: readonly string[]; step: number; onChange: (index: number) => void }) { return <nav className="tk-steps" aria-label="Workflow steps">{names.map((name, i) => <button type="button" key={name} aria-current={step === i ? "step" : undefined} onClick={() => onChange(i)}><span>{String(i + 1).padStart(2, "0")}</span>{name}</button>)}</nav>; }
export function Issues({ items }: { items: string[] }) { return items.length > 0 ? <div className="tk-alert" role="alert"><ul>{items.map(item => <li key={item}>{item}</li>)}</ul></div> : null; }

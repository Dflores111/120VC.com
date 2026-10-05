"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { emptyToolkit, demoToolkit, newId, parseToolkit, STORAGE_KEY, type Toolkit } from "../../data/toolkit";

type Workspace = { data: Toolkit; save: (change: (draft: Toolkit) => void) => boolean; notice: string };
const Context = createContext<Workspace | null>(null);
export function useToolkit() { const value = useContext(Context); if (!value) throw new Error("Toolkit workspace is missing"); return value; }
export function downloadText(text: string, name: string, type = "text/plain;charset=utf-8") {
  const url = URL.createObjectURL(new Blob([text], { type })); const anchor = document.createElement("a"); anchor.href = url; anchor.download = name; anchor.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function ToolkitProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Toolkit | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [conflict, setConflict] = useState(false);
  const [memoryOnly, setMemoryOnly] = useState(false);
  const [generation, setGeneration] = useState(0);
  const current = useRef<Toolkit | null>(null);
  const [corrupt, setCorrupt] = useState<string | null>(null);
  const importRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    let mounted = true;
    // Hydrate the external browser store after the server's identical loading state.
    queueMicrotask(() => {
      if (!mounted) return;
      try { const raw = localStorage.getItem(STORAGE_KEY); if (raw) { setCorrupt(raw); const value = parseToolkit(raw); current.current = value; setData(value); setCorrupt(null); } }
      catch { setError("Saved work could not be opened. It has not been overwritten. Download a recovery copy before starting again, or use a temporary workspace."); }
      setLoaded(true);
    });
    const changed = (event: StorageEvent) => { if (event.key === STORAGE_KEY) setConflict(true); };
    window.addEventListener("storage", changed); return () => { mounted = false; window.removeEventListener("storage", changed); };
  }, []);
  function persist(next: Toolkit, replace = false) {
    try {
      next.revision = newId(); parseToolkit(JSON.stringify(next));
      if (!memoryOnly) {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!replace && (raw ? parseToolkit(raw).revision : null) !== (current.current?.revision ?? null)) { setConflict(true); throw new Error("Another tab changed this workspace. Export your open form before reloading; nothing was overwritten."); }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }
      current.current = next; setData(next); setError(""); setNotice(memoryOnly ? "Updated in this tab only. Download a backup before leaving." : "Saved on this browser."); return true;
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Saving failed. Keep this tab open and download your work."); return false; }
  }
  function save(change: (draft: Toolkit) => void) { if (!current.current || conflict) { setError("Reload the latest workspace before saving. Your open form has not been discarded."); return false; } const draft = structuredClone(current.current); change(draft); return persist(draft); }
  async function restore(file: File | undefined) {
    if (!file) return;
    try { if (file.size > 2_000_000) throw new Error("Choose a toolkit backup smaller than 2 MB."); const incoming = parseToolkit(await file.text()); if (current.current && !window.confirm("Replace the saved workspace with this backup? Download your current backup first. Open unsaved forms will be discarded.")) return; if (persist(incoming, true)) { setConflict(false); setGeneration(value => value + 1); } }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Could not read this backup."); }
    finally { if (importRef.current) importRef.current.value = ""; }
  }
  if (!loaded) return <p className="tk-loading" role="status">Opening your browser workspace…</p>;
  return <>
    {error && <div className="tk-alert" role="alert"><p>{error}</p>{corrupt && <button type="button" onClick={() => downloadText(corrupt, "120vc-recovery.json", "application/json")}>Download recovery copy</button>}{!data && <button type="button" onClick={() => { const value = emptyToolkit(); setMemoryOnly(true); current.current = value; setData(value); setError(""); }}>Use without saving</button>}</div>}
    {conflict && <div className="tk-alert" role="alert">This workspace changed in another tab. Saving is paused to protect both versions. <button type="button" onClick={() => { if (window.confirm("Reload the latest saved work? Unsaved form edits will be lost; use the form’s draft download first.")) window.location.reload(); }}>Reload latest</button></div>}
    {!data ? <section className="tk-start"><p className="tk-eyebrow">Your working space</p><h2>Start with one outcome.</h2><p>Connect priorities, commitments, and decisions. Your entries stay in this browser—not on a 120VC server or a shared team account.</p><p className="tk-muted">Other people using this browser profile can access them. Avoid confidential information. Backups include all entries, including reflections.</p><div className="tk-actions"><button className="tk-primary" disabled={Boolean(error)} onClick={() => persist(emptyToolkit())}>Start a blank workspace</button><button disabled={Boolean(error)} onClick={() => persist(demoToolkit())}>Explore an example</button><button onClick={() => importRef.current?.click()}>Restore a backup</button></div></section> : <Context.Provider value={{ data, save, notice }}>
      <div className="tk-workspace-bar"><span>{data.demo ? "Example workspace · fictional data" : "Your workspace"}</span><span className="tk-muted">{memoryOnly ? "Temporary · not saved" : "Saved on this browser · not shared"}</span><details><summary>Workspace & backups</summary><div className="tk-settings"><p>Entries stay in this browser profile. No accounts, live team collaboration, calendar sync, email delivery, or CRM transfer. Export only what you intend to share.</p><div className="tk-actions"><button onClick={() => downloadText(JSON.stringify(data, null, 2), "120vc-toolkit-backup.json", "application/json")}>Download full backup</button><button onClick={() => importRef.current?.click()}>Restore backup</button><button onClick={() => { if (window.confirm("Clear this entire workspace from this browser? This cannot be undone without a backup. Download one first.")) { try { if (!memoryOnly) localStorage.removeItem(STORAGE_KEY); current.current = null; setData(null); setNotice(""); } catch { setError("Could not clear browser storage. No data was removed."); } } }}>Clear workspace</button></div><p className="tk-muted">Full backups include reflections. Copy/print reports exclude private reflections. Browser cleanup can remove saved work; keep a backup.</p></div></details></div>
      <div className="tk-save-status" role="status" aria-live="polite">{notice}</div>
      <div key={generation}>{children}</div>
    </Context.Provider>}
    <input ref={importRef} hidden type="file" accept=".json,application/json" aria-label="Restore toolkit backup" onChange={event => void restore(event.target.files?.[0])} />
  </>;
}

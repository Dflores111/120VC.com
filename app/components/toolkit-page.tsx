import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import Link from "./native-link";
import { ToolkitClient } from "./toolkit/toolkit-client";
import { toolHref, toolkitTools, type ToolId } from "../data/toolkit-manifest";

export function ToolkitPage({ tool }: { tool: ToolId }) {
  const current = toolkitTools.find(t => t.id === tool);
  return <div className="site-shell hierarchy-site toolkit-site"><a className="skip-link" href="#main-content">Skip to tool</a><SiteHeader /><main id="main-content" tabIndex={-1} data-toolkit={tool}>
    <header className="tk-page-heading"><Link href="/resources">← Resources</Link><p className="tk-eyebrow">120VC Execution Toolkit</p><h1>{current?.title || "Turn clarity into action."}</h1><p>{current?.description || "Practical tools for priorities, decisions, and follow-through. One connected browser workspace."}</p></header>
    <div className="tk-layout"><nav className="tk-nav" aria-label="Execution toolkit"><Link href={toolHref("home")} aria-current={tool === "home" ? "page" : undefined}>Toolkit overview</Link>{["Start", "Focus", "Decide", "Team"].map(group => <div key={group}><p>{group}</p>{toolkitTools.filter(t => t.group === group).map(t => <Link key={t.id} href={toolHref(t.id)} aria-current={tool === t.id ? "page" : undefined}>{t.short}</Link>)}</div>)}<Link href="/resources/execution-decision-brief">Buyer Decision Brief ↗</Link></nav><div className="tk-content"><noscript>These tools need JavaScript for editing and local saving. Your entries are not sent to a server. <Link href="/resources/guides/weekly-operating-rhythm">Read the weekly rhythm guide instead.</Link></noscript><ToolkitClient tool={tool} /></div></div>
  </main><SiteFooter /></div>;
}

"use client";
import { capacity, commitmentState, weekOf } from "../../data/toolkit";
import { toolHref, toolkitTools, type ToolId } from "../../data/toolkit-manifest";
import { ToolkitProvider, useToolkit } from "./workspace";
import { FocusBoard } from "./focus-board";
import { WeeklyPlanning } from "./weekly";
import { DailyFocusing } from "./daily";
import { DecisionBuilder } from "./decision-builder";
import { Workbooks } from "./workbooks";

function ToolkitHome() {
  const { data } = useToolkit(); const week = weekOf();
  const unscheduled = data.commitments.filter(c => weekOf(c.due) === week && commitmentState(c) === "needs calendar time").length;
  const over = data.people.filter(p => p.week === week && capacity(p, data.commitments, week).over > 0);
  return <><section className="tk-attention"><h2>What needs your attention?</h2>{!data.objectives.length ? <p>Start with the outcomes competing for your attention.</p> : <p>{data.objectives.filter(o => !o.archived).length} active objectives · {unscheduled} commitments need calendar time.{over.length ? ` ${over.map(p => p.name).join(", ")} ${over.length === 1 ? "is" : "are"} over capacity.` : ""}</p>}<a className="tk-link" href={toolHref(data.objectives.length ? "weekly" : "focus")}>{data.objectives.length ? "Review your week" : "Open the Focus Board"} →</a></section><h2>What are you trying to do?</h2><div className="tk-tool-menu">{toolkitTools.filter(t => t.id !== "starter").map(t => <a key={t.id} href={toolHref(t.id)}><span className="tk-eyebrow">{t.group}</span><h3>{t.short}</h3><p>{t.description}</p><span aria-hidden="true">→</span></a>)}</div><a href={toolHref("starter")}>New to the rhythm? Start your first execution week →</a></>;
}
function StarterWeek() { return <section className="tk-starter"><h2>One outcome. One week. A repeatable rhythm.</h2><p>Use the same records throughout. Start small; you don’t need to complete every tool.</p><ol>{[
  { title: "Choose the outcome", text: "Rank your objectives by value and effort. Make ownership and success visible.", tool: "focus" as const, time: "Before the week" },
  { title: "Build an executable week", text: "Review last week, revisit parked work, choose advances, reserve time, and check capacity.", tool: "weekly" as const, time: "60 minutes weekly" },
  { title: "Close today. Prepare tomorrow.", text: "Reflect, resolve unfinished work, and reset the calendar. Share only the Eyes Up report you intend to share.", tool: "daily" as const, time: "30 minutes daily" },
  { title: "Align the team", text: "Inspect changes, resolve decisions, surface challenges, and practice together.", tool: "team" as const, time: "60 minutes weekly" },
].map((s, i) => <li key={s.tool}><span className="tk-step-number">0{i + 1}</span><div><p className="tk-eyebrow">{s.time}</p><h3>{s.title}</h3><p>{s.text}</p><a href={toolHref(s.tool)}>Open {toolkitTools.find(t => t.id === s.tool)?.title} →</a></div></li>)}</ol><p className="tk-callout">Five daily resets plus both weekly meetings total 4.5 hours. Account for that time once in your weekly capacity.</p><a href={toolHref("decision")}>When a decision is blocked: use 1–3–1 →</a></section>; }
export function ToolkitClient({ tool }: { tool: ToolId }) { return <ToolkitProvider>{tool === "home" ? <ToolkitHome /> : tool === "focus" ? <FocusBoard /> : tool === "weekly" ? <WeeklyPlanning /> : tool === "daily" ? <DailyFocusing /> : tool === "decision" ? <DecisionBuilder /> : tool === "starter" ? <StarterWeek /> : <Workbooks kind={tool} />}</ToolkitProvider>; }

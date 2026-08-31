"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { ExecutionIcon, type ExecutionIconName } from "./execution-icon";

type ResourceItem = {
  icon: ExecutionIconName;
  title: string;
  description: string;
  href: string;
  external?: boolean;
};

const groups: ReadonlyArray<{ id: "use" | "understand"; label: string; description: string; items: ReadonlyArray<ResourceItem> }> = [
  {
    id: "use",
    label: "USE IT",
    description: "Choose the practical method that matches the decision in front of you.",
    items: [
      { icon: "two-by-two", title: "2×2 Prioritization Matrix", description: "Make urgency and strategic value visible before capacity is committed.", href: "/resources/tools/2x2-prioritization-matrix" },
      { icon: "one-three-one", title: "1-3-1 Decision Builder", description: "Move from one problem through three options to one recommendation.", href: "/resources/tools/1-3-1-decision-builder" },
      { icon: "challenge", title: "Challenge · Opportunity Builder", description: "Turn an observation into a condition leaders can decide and act on.", href: "/resources/tools/challenge-opportunity-builder" },
      { icon: "weekly-doing", title: "Weekly Team Doing", description: "Convert commitments into a visible weekly operating rhythm.", href: "/resources/tools/weekly-team-doing" },
      { icon: "three-pillars", title: "Three Pillars Decision Filter", description: "Test a recommendation across customer, team, and profitability outcomes.", href: "/resources/tools/three-pillars-decision-filter" },
    ],
  },
  {
    id: "understand",
    label: "UNDERSTAND IT",
    description: "Choose the resource that helps leaders name the condition and align around the next decision.",
    items: [
      { icon: "intent", title: "The Strategy Execution Gap", description: "See why sound strategy fragments after it leaves the leadership room.", href: "https://www.120vc.com/book-download-the-strategy-execution-gap/", external: true },
      { icon: "commitments", title: "Executive Team Performance", description: "Understand what coordinated commitment requires after the meeting ends.", href: "/resources/insights/executive-team-performance" },
      { icon: "execution", title: "Why strategies fail after launch", description: "Watch a short explanation of the condition underneath stalled change.", href: "https://www.youtube.com/watch?v=gKjxOtwD-8o", external: true },
      { icon: "priorities", title: "Portfolio ROI and the PMO", description: "See why status visibility is not the same as an investment decision.", href: "/resources/insights/portfolio-roi-and-pmo" },
      { icon: "decisions", title: "Executive Briefings", description: "Bring the condition and decision into the leadership room.", href: "/resources/executive-briefings" },
    ],
  },
];

export function ResourceExplorer() {
  const [activeId, setActiveId] = useState<"use" | "understand">("use");
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = groups.find((group) => group.id === activeId) || groups[0];

  function select(index: number) {
    const next = groups[index];
    if (!next) return;
    setActiveId(next.id);
    tabs.current[index]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = groups.findIndex((group) => group.id === activeId);
    if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); select((index + 1) % groups.length); }
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); select((index - 1 + groups.length) % groups.length); }
    else if (event.key === "Home") { event.preventDefault(); select(0); }
    else if (event.key === "End") { event.preventDefault(); select(groups.length - 1); }
  }

  return (
    <div className="resource-explorer resource-explorer-v2">
      <div className="resource-tabs" role="tablist" aria-label="Choose how to use the resource library" tabIndex={-1} onKeyDown={onKeyDown}>
        {groups.map((group, index) => (
          <button
            key={group.id}
            id={`resource-tab-${group.id}`}
            ref={(element) => { tabs.current[index] = element; }}
            type="button"
            role="tab"
            aria-selected={activeId === group.id}
            aria-controls={`resource-panel-${group.id}`}
            tabIndex={activeId === group.id ? 0 : -1}
            onClick={() => setActiveId(group.id)}
          >
            {group.label}
          </button>
        ))}
      </div>

      <section className="resource-panel" id={`resource-panel-${active.id}`} role="tabpanel" aria-labelledby={`resource-tab-${active.id}`} tabIndex={0}>
        <p>{active.description}</p>
        <div className="resource-card-rail">
          {active.items.map((item) => {
            const content = <><ExecutionIcon name={item.icon} /><span><strong>{item.title}</strong><small>{item.description}</small></span><i aria-hidden="true">{item.external ? "Open ↗" : "Explore →"}</i></>;
            return item.external
              ? <a href={item.href} key={item.href}>{content}</a>
              : <Link href={item.href} key={item.href}>{content}</Link>;
          })}
        </div>
      </section>
    </div>
  );
}

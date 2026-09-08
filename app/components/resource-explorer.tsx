"use client";

import Link from "@/app/components/native-link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ExecutionIcon, type ExecutionIconName } from "./execution-icon";

type ResourceItem = {
  icon: ExecutionIconName;
  title: string;
  description: string;
  href: string;
  external?: boolean;
  action: string;
};

const groups: ReadonlyArray<{ id: "frameworks" | "guides"; label: string; description: string; items: ReadonlyArray<ResourceItem> }> = [
  {
    id: "frameworks",
    label: "FRAMEWORKS",
    description: "Explore the method that matches the decision in front of you. These pages explain the framework; they do not yet save or submit your work.",
    items: [
      { icon: "two-by-two", title: "2×2 Prioritization Matrix", description: "Make urgency and strategic value visible before capacity is committed.", href: "/resources/tools/2x2-prioritization-matrix", action: "Explore framework" },
      { icon: "one-three-one", title: "1-3-1 Decision Builder", description: "Move from one problem through three options to one recommendation.", href: "/resources/tools/1-3-1-decision-builder", action: "Explore framework" },
      { icon: "challenge", title: "Challenge · Opportunity Builder", description: "Turn an observation into a condition leaders can decide and act on.", href: "/resources/tools/challenge-opportunity-builder", action: "Explore framework" },
      { icon: "weekly-doing", title: "Weekly Team Doing", description: "Convert commitments into a visible weekly operating rhythm.", href: "/resources/tools/weekly-team-doing", action: "Explore framework" },
      { icon: "three-pillars", title: "Three Pillars Decision Filter", description: "Test a recommendation across customer, team, and profitability outcomes.", href: "/resources/tools/three-pillars-decision-filter", action: "Explore framework" },
    ],
  },
  {
    id: "guides",
    label: "GUIDES & INSIGHTS",
    description: "Choose the resource that helps leaders name the condition and align around the next decision.",
    items: [
      { icon: "intent", title: "The Strategy Execution Gap", description: "See why sound strategy fragments after it leaves the leadership room.", href: "https://www.120vc.com/book-download-the-strategy-execution-gap/", external: true, action: "Read the guide" },
      { icon: "commitments", title: "Executive Team Performance", description: "Understand what coordinated commitment requires after the meeting ends.", href: "/resources/insights/executive-team-performance", action: "Read the insight" },
      { icon: "execution", title: "Why strategies fail after launch", description: "Watch a short explanation of the condition underneath stalled change.", href: "https://www.youtube.com/watch?v=gKjxOtwD-8o", external: true, action: "Watch" },
      { icon: "priorities", title: "Portfolio ROI and the PMO", description: "See why status visibility is not the same as an investment decision.", href: "/resources/insights/portfolio-roi-and-pmo", action: "Read the insight" },
      { icon: "decisions", title: "Executive Briefings", description: "Bring the condition and decision into the leadership room.", href: "/resources/executive-briefings", action: "Explore briefings" },
    ],
  },
];

export function ResourceExplorer() {
  const [activeId, setActiveId] = useState<"frameworks" | "guides">("frameworks");
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const rail = useRef<HTMLDivElement | null>(null);
  const active = groups.find((group) => group.id === activeId) || groups[0];

  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    let frame = 0;
    const updateScrollState = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const maxScroll = Math.max(0, element.scrollWidth - element.clientWidth);
        setAtStart(element.scrollLeft <= 4);
        setAtEnd(maxScroll - element.scrollLeft <= 4);
      });
    };
    updateScrollState();
    element.addEventListener("scroll", updateScrollState, { passive: true });
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(element);
    return () => {
      window.cancelAnimationFrame(frame);
      element.removeEventListener("scroll", updateScrollState);
      observer.disconnect();
    };
  }, [activeId]);

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
        <div className="resource-card-rail-window horizontal-card-rail-window" data-at-start={atStart ? "true" : "false"} data-at-end={atEnd ? "true" : "false"}>
          <div className="resource-card-rail" ref={rail}>
            {active.items.map((item) => {
              const content = <><ExecutionIcon name={item.icon} /><span><strong>{item.title}</strong><small>{item.description}</small></span><i aria-hidden="true">{item.action} {item.external ? "↗" : "→"}</i></>;
              return item.external
                ? <a href={item.href} key={item.href}>{content}</a>
                : <Link href={item.href} key={item.href}>{content}</Link>;
            })}
          </div>
          <span className="horizontal-card-edge-fade horizontal-card-edge-fade-left" aria-hidden="true" />
          <span className="horizontal-card-edge-fade horizontal-card-edge-fade-right" aria-hidden="true" />
        </div>
      </section>
    </div>
  );
}

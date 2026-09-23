"use client";

import Link from "@/app/components/native-link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ExecutionIcon } from "./execution-icon";
import { resourceItems, type ResourceCategory } from "../data/resource-library";
import { useHydratedReducedMotion } from "./use-hydrated-reduced-motion";

const groups = [
  { id: "all", label: "All", description: "Explore the full library, or choose a resource type." },
  { id: "frameworks", label: "Frameworks", description: "Use a practical method to frame a problem, prioritize, or make a decision. Framework pages explain the method; they do not save or submit your work." },
  { id: "guides", label: "Guides", description: "Follow practical steps to strengthen how your team works." },
  { id: "insights", label: "Insights", description: "Understand where execution breaks down and what leaders can change." },
] as const;

export function ResourceExplorer({ initialCategory = "all" }: { initialCategory?: ResourceCategory | "all" }) {
  const reduceMotion = useHydratedReducedMotion();
  const [activeId, setActiveId] = useState<ResourceCategory | "all">(initialCategory);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const rail = useRef<HTMLDivElement | null>(null);
  const active = groups.find((group) => group.id === activeId) || groups[0];
  const items = resourceItems.filter(item => activeId === "all" || item.category === activeId);

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
    const url = new URL(window.location.href);
    if (next.id === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", next.id);
    window.history.replaceState(window.history.state, "", url);
    rail.current?.scrollTo({ left: 0, behavior: "instant" });
    tabs.current[index]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = groups.findIndex((group) => group.id === activeId);
    if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); select((index + 1) % groups.length); }
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); select((index - 1 + groups.length) % groups.length); }
    else if (event.key === "Home") { event.preventDefault(); select(0); }
    else if (event.key === "End") { event.preventDefault(); select(groups.length - 1); }
  }

  function scrollResources(direction: -1 | 1) {
    const element = rail.current;
    element?.scrollBy({ left: element.clientWidth * 0.8 * direction, behavior: reduceMotion ? "instant" : "smooth" });
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
            aria-controls="resource-library-panel"
            tabIndex={activeId === group.id ? 0 : -1}
            onClick={() => select(index)}
          >
            {group.label}
          </button>
        ))}
      </div>

      <section className="resource-panel" id="resource-library-panel" role="tabpanel" aria-labelledby={`resource-tab-${active.id}`} tabIndex={0}>
        <p>{active.description}</p>
        <div className="resource-rail-controls">
          <span role="status">{items.length} resources</span>
          <button type="button" aria-label="Previous resources" disabled={atStart} onClick={() => scrollResources(-1)}>←</button>
          <button type="button" aria-label="Next resources" disabled={atEnd} onClick={() => scrollResources(1)}>→</button>
        </div>
        <div className="resource-card-rail-window horizontal-card-rail-window" data-at-start={atStart ? "true" : "false"} data-at-end={atEnd ? "true" : "false"}>
          <div className="resource-card-rail" ref={rail}>
            {items.map((item) => {
              const content = <><ExecutionIcon name={item.icon} /><span><small className="resource-category">{item.category.slice(0, -1)}</small><strong>{item.title}</strong><small>{item.description}</small></span><i aria-hidden="true">{item.action} {item.external ? "↗" : "→"}</i></>;
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

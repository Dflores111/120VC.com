"use client";

import Link from "@/app/components/native-link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  isProblemConditionId,
  legacyProblemConditions,
  problemConditions as currentProblemConditions,
  problemRouteConditions,
  type ProblemConditionId,
  type ProblemMode,
} from "../data/primary-experience";
import { useHydratedReducedMotion } from "./use-hydrated-reduced-motion";
import { DisclosureAlignment, DisclosureCue } from "./disclosure-cue";

type ProblemExplorerProps = {
  initialCondition?: ProblemConditionId;
  compact?: boolean;
  syncUrl?: boolean;
};

const actionOrder: readonly ProblemMode[] = ["help", "work", "understand"];

export function ProblemExplorer({ initialCondition, compact = false, syncUrl = true }: ProblemExplorerProps) {
  const [selected, setSelected] = useState<ProblemConditionId | null>(initialCondition ?? null);
  const controls = useRef<Array<HTMLElement | null>>([]);
  const reduceMotion = useHydratedReducedMotion();
  const problemConditions = legacyProblemConditions.some(item => item.id === (selected ?? initialCondition))
    ? legacyProblemConditions : currentProblemConditions;

  useEffect(() => {
    if (!syncUrl) return;
    const handlePopState = () => {
      const query = new URLSearchParams(window.location.search).get("condition") || undefined;
      const alias = problemRouteConditions[window.location.pathname.replace(/^\//, "")];
      setSelected(alias ?? (isProblemConditionId(query) ? query : null));
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [syncUrl]);

  function selectCondition(id: ProblemConditionId) {
    const next = selected === id ? null : id;
    setSelected(next);
    if (syncUrl) {
      const url = new URL(window.location.href);
      url.pathname = "/problems-we-solve";
      if (next) url.searchParams.set("condition", next);
      else url.searchParams.delete("condition");
      url.searchParams.delete("mode");
      window.history.pushState({ condition: next }, "", `${url.pathname}${url.search}${url.hash}`);
    }
    if (next) window.dispatchEvent(new CustomEvent("120vc:explorer-selection", { detail: { kind: "condition", value: next, page: window.location.pathname } }));
  }

  function handleKeys(event: KeyboardEvent<HTMLElement>, index: number) {
    let target: number | null = null;
    if (event.key === "ArrowDown") target = (index + 1) % problemConditions.length;
    if (event.key === "ArrowUp") target = (index - 1 + problemConditions.length) % problemConditions.length;
    if (event.key === "Home") target = 0;
    if (event.key === "End") target = problemConditions.length - 1;
    if (target === null) return;
    event.preventDefault();
    controls.current[target]?.focus();
  }

  return (
    <div className="problem-reader" data-reduced-motion={reduceMotion ? "true" : "false"}>
      {/* Native disclosure keeps titles and context together, with a no-JS fallback. */}
      {problemConditions.map((item, index) => (
        <details className="problem-reader-item" data-scroll-enter name="execution-problems" id={`problem-${item.id}`} data-condition={item.id} key={item.id} open={selected === item.id}>
          <summary
            aria-controls={`problem-detail-${item.id}`}
            onClick={(event) => { event.preventDefault(); selectCondition(item.id); }}
            onKeyDown={(event) => handleKeys(event, index)}
            ref={(element) => { controls.current[index] = element; }}
          >
            <div className="problem-reader-summary">
              <h3>{item.headline}</h3>
              <p>{item.preview}</p>
            </div>
            <DisclosureCue className="problem-reader-toggle" expanded={selected === item.id} reduceMotion={reduceMotion} />
          </summary>
          <div className="problem-reader-detail" data-reading-path={item.response ? "response" : "legacy"} id={`problem-detail-${item.id}`}>
            <DisclosureAlignment activated={selected === item.id} reduceMotion={reduceMotion} />
            {compact ? <Link href={`/problems-we-solve?condition=${item.id}`}>Explore this problem <span aria-hidden="true">→</span></Link> : <>
              {!item.response && <div className="problem-reader-signals">
                <h4>What you may notice</h4>
                <ul>{item.signals.map(signal => <li key={signal}>{signal}</li>)}</ul>
              </div>}
              <div className="problem-reader-cost">
                <h4>What it costs</h4>
                <p>{item.cost}</p>
              </div>
              {item.response && <div className="problem-reader-action">
                <h4>What 120VC does</h4>
                <p>{item.response.action}</p>
              </div>}
              <div className="problem-reader-change">
                <h4>{item.response ? "What changes" : "What needs to change"}</h4>
                <p><strong>{item.response?.outcome ?? item.change}</strong></p>
              </div>
              <nav className="problem-reader-links" aria-label={`Next steps for ${item.label}`}>
                {actionOrder.map(mode => {
                  const path = item.paths[mode];
                  return <Link href={path.href} data-action-mode={mode} key={mode}>
                    <span>{mode === "help" ? `Explore ${path.title}` : path.title}</span>
                    <span aria-hidden="true" data-direction={path.external ? "out" : undefined}>{path.external ? "↗" : "→"}</span>
                  </Link>;
                })}
              </nav>
            </>}
          </div>
        </details>
      ))}
    </div>
  );
}

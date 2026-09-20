"use client";

import Link from "@/app/components/native-link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { isSystemNodeId, systemNodes, type SystemNodeId } from "../data/primary-experience";
import { useHydratedReducedMotion } from "./use-hydrated-reduced-motion";
import { DisclosureAlignment, DisclosureCue } from "./disclosure-cue";

type SystemExplorerProps = {
  initialNode?: SystemNodeId;
  compact?: boolean;
  syncUrl?: boolean;
};

export function SystemExplorer({ initialNode, compact = false, syncUrl = true }: SystemExplorerProps) {
  const [activeNode, setActiveNode] = useState<SystemNodeId | null>(initialNode ?? null);
  const controls = useRef<Array<HTMLElement | null>>([]);
  const reduceMotion = useHydratedReducedMotion();

  useEffect(() => {
    if (!syncUrl) return;
    const handlePopState = () => {
      const node = new URLSearchParams(window.location.search).get("node") || undefined;
      setActiveNode(isSystemNodeId(node) ? node : null);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [syncUrl]);

  function selectNode(node: SystemNodeId) {
    const next = activeNode === node ? null : node;
    setActiveNode(next);
    if (syncUrl) {
      const url = new URL(window.location.href);
      if (next) url.searchParams.set("node", next);
      else url.searchParams.delete("node");
      window.history.pushState({ node: next }, "", `${url.pathname}${url.search}${url.hash}`);
    }
  }

  function handleKeys(event: KeyboardEvent<HTMLElement>, index: number) {
    let target: number | null = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") target = (index + 1) % systemNodes.length;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") target = (index - 1 + systemNodes.length) % systemNodes.length;
    if (event.key === "Home") target = 0;
    if (event.key === "End") target = systemNodes.length - 1;
    if (target === null) return;
    event.preventDefault();
    controls.current[target]?.focus();
  }

  return (
    <div className="system-reader" data-reduced-motion={reduceMotion ? "true" : "false"}>
      {/* Native disclosures keep all six summaries readable, even without JS. */}
      {systemNodes.map((node, index) => (
        <details className="system-reader-item" data-scroll-enter data-system-node={node.id} id={`system-node-${node.id}`} key={node.id} open={activeNode === node.id}>
          <summary
            aria-controls={`system-detail-${node.id}`}
            onClick={(event) => { event.preventDefault(); selectNode(node.id); }}
            onKeyDown={(event) => handleKeys(event, index)}
            ref={(element) => { controls.current[index] = element; }}
          >
            <h3><span>{node.label}</span>{node.description}</h3>
            <DisclosureCue className="system-reader-toggle" expanded={activeNode === node.id} reduceMotion={reduceMotion} />
          </summary>
          <div className="system-reader-detail" id={`system-detail-${node.id}`}>
            <DisclosureAlignment activated={activeNode === node.id} reduceMotion={reduceMotion} />
            <p>{node.explanation}</p>
            <p className="system-reader-shift"><strong>{node.shift}</strong></p>
            {!compact && <Link href={node.practiceHref}>Try the {node.practiceLabel} <span aria-hidden="true">→</span></Link>}
          </div>
        </details>
      ))}
      {compact && <Link className="button button-light" href={`/leadership-system${activeNode ? `?node=${activeNode}` : ""}`}>Explore the whole system <span aria-hidden="true">→</span></Link>}
    </div>
  );
}

"use client";

import Link from "@/app/components/native-link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { isSystemNodeId, systemNodes, type SystemNodeId } from "../data/primary-experience";
import { ExecutionIcon } from "./execution-icon";
import { ExecutionSpine } from "./execution-spine";
import { useHydratedReducedMotion } from "./use-hydrated-reduced-motion";

type SystemExplorerProps = {
  initialNode?: SystemNodeId;
  compact?: boolean;
  syncUrl?: boolean;
};

function pushNode(node: SystemNodeId) {
  const url = new URL(window.location.href);
  url.pathname = "/leadership-system";
  url.searchParams.set("node", node);
  window.history.pushState({ node }, "", `${url.pathname}${url.search}${url.hash}`);
}

export function SystemExplorer({ initialNode = "intent", compact = false, syncUrl = true }: SystemExplorerProps) {
  const reduceMotion = useHydratedReducedMotion();
  const [activeNode, setActiveNode] = useState<SystemNodeId>(initialNode);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = systemNodes.find((node) => node.id === activeNode) || systemNodes[0];

  useEffect(() => {
    if (!syncUrl) return;
    const handlePopState = () => {
      const node = new URLSearchParams(window.location.search).get("node") || undefined;
      setActiveNode(isSystemNodeId(node) ? node : initialNode);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [initialNode, syncUrl]);

  function selectNode(node: SystemNodeId) {
    setActiveNode(node);
    if (syncUrl) pushNode(node);
  }

  function handleKeys(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let target: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") target = (index + 1) % systemNodes.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") target = (index - 1 + systemNodes.length) % systemNodes.length;
    if (event.key === "Home") target = 0;
    if (event.key === "End") target = systemNodes.length - 1;
    if (target === null) return;
    event.preventDefault();
    selectNode(systemNodes[target].id);
    refs.current[target]?.focus();
  }

  return (
    <div className={`system-explorer ${compact ? "system-explorer-compact" : "system-explorer-full"}`}>
      <ExecutionSpine state="connected" activeNode={activeNode} />
      <div className="system-node-tabs" role="tablist" aria-label="Execution Leadership System">
        {systemNodes.map((node, index) => (
          <button
            aria-controls={`system-node-panel-${node.id}`}
            aria-selected={activeNode === node.id}
            id={`system-node-tab-${node.id}`}
            key={node.id}
            onClick={() => selectNode(node.id)}
            onKeyDown={(event) => handleKeys(event, index)}
            ref={(element) => { refs.current[index] = element; }}
            role="tab"
            tabIndex={activeNode === node.id ? 0 : -1}
            type="button"
          >
            <ExecutionIcon name={node.id} />
            <span>{node.label}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          aria-labelledby={`system-node-tab-${active.id}`}
          className="system-node-panel"
          id={`system-node-panel-${active.id}`}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: reduceMotion ? 0 : 0.24 }}
          key={active.id}
          role="tabpanel"
          tabIndex={0}
        >
          <div className="system-node-panel-copy">
            <h3>{active.description}</h3>
            <p>{active.explanation}</p>
          </div>
          <div className="system-node-focus">
            <h4>What leaders make visible</h4>
            <ul>
              {active.makesVisible.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="system-node-connector">
            <span>Which changes the work</span>
            <b aria-hidden="true">↓</b>
          </div>
          <div className="system-node-shift">
            <h4>What changes</h4>
            <p>{active.shift}</p>
          </div>
          {!compact && (
            <div className="system-node-practice">
              <div>
                <h4>Use the related practice</h4>
                <p>{active.practice}</p>
              </div>
              <Link href={active.practiceHref}>Open {active.practiceLabel} <span aria-hidden="true">→</span></Link>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      {compact && <Link className="button button-light" href={`/leadership-system?node=${activeNode}`}>Explore the whole system <span aria-hidden="true">→</span></Link>}
    </div>
  );
}

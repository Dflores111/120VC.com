"use client";

import Link from "@/app/components/native-link";
import { useEffect, useRef, type CSSProperties, type KeyboardEvent } from "react";
import { isSystemNodeId, systemNodes, type SystemNodeId } from "../data/primary-experience";
import { ExecutionIcon } from "./execution-icon";
import { useScrollScene } from "./use-scroll-scene";

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
  const controls = useRef<Array<HTMLButtonElement | null>>([]);
  const didRestoreInitialNode = useRef(false);
  const initialIndex = Math.max(0, systemNodes.findIndex((node) => node.id === initialNode));
  const { activeStep: activeIndex, goToStep, sceneRef, stageRef } = useScrollScene({
    stepCount: systemNodes.length,
    initialStep: initialIndex,
  });
  const activeNode = systemNodes[activeIndex].id;

  useEffect(() => {
    if (didRestoreInitialNode.current || initialIndex === 0) return;
    didRestoreInitialNode.current = true;
    const frame = window.requestAnimationFrame(() => goToStep(initialIndex));
    return () => window.cancelAnimationFrame(frame);
  }, [goToStep, initialIndex]);

  useEffect(() => {
    if (!syncUrl) return;
    const handlePopState = () => {
      const node = new URLSearchParams(window.location.search).get("node") || undefined;
      const next = isSystemNodeId(node) ? node : initialNode;
      goToStep(systemNodes.findIndex((item) => item.id === next));
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [goToStep, initialNode, syncUrl]);

  function selectNode(node: SystemNodeId) {
    const index = systemNodes.findIndex((item) => item.id === node);
    if (syncUrl) pushNode(node);
    goToStep(index);
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
    controls.current[target]?.focus();
  }

  return (
    <div className={`system-explorer system-story-explorer ${compact ? "system-explorer-compact" : "system-explorer-full"}`}>
      <div className="system-story-track scroll-swap-scene" ref={sceneRef} style={{ "--scroll-scene-steps": systemNodes.length } as CSSProperties}>
        <div className="system-story-stage scroll-swap-stage" ref={stageRef}>
          <nav className="system-story-nav" aria-label="Jump to a part of the Execution Leadership System">
            <p className="system-story-status" aria-live="polite">
              <span><strong>{String(activeIndex + 1).padStart(2, "0")}</strong> / {String(systemNodes.length).padStart(2, "0")}</span>
              <b>{systemNodes[activeIndex].label}</b>
            </p>
            <div className="system-story-nav-controls">
              {systemNodes.map((node, index) => (
                <button
                  aria-current={activeNode === node.id ? "step" : undefined}
                  aria-label={`Go to ${node.label}`}
                  key={node.id}
                  onClick={() => selectNode(node.id)}
                  onKeyDown={(event) => handleKeys(event, index)}
                  ref={(element) => { controls.current[index] = element; }}
                  type="button"
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <b>{node.label}</b>
                </button>
              ))}
            </div>
          </nav>

          <div className="system-story-viewport">
            {systemNodes.map((node, index) => (
              <article
                aria-hidden={activeNode !== node.id}
                aria-labelledby={`system-story-title-${node.id}`}
                className="system-story-chapter scroll-swap-panel"
                data-active={activeNode === node.id ? "true" : "false"}
                data-system-node={node.id}
                id={`system-node-${node.id}`}
                inert={activeNode !== node.id}
                key={node.id}
              >
                <header className="system-story-chapter-heading">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <ExecutionIcon name={node.id} />
                  <p>{node.label}</p>
                </header>

                <div className="system-story-copy">
                  <h3 id={`system-story-title-${node.id}`}>{node.description}</h3>
                  <p>{node.explanation}</p>
                </div>

                <section className="system-story-visible" aria-labelledby={`system-visible-title-${node.id}`}>
                  <h4 id={`system-visible-title-${node.id}`}>Leaders make visible</h4>
                  <ol>
                    {node.makesVisible.map((item, itemIndex) => (
                      <li key={item}><span>{String(itemIndex + 1).padStart(2, "0")}</span>{item}</li>
                    ))}
                  </ol>
                </section>

                <section className="system-story-outcome" aria-labelledby={`system-outcome-title-${node.id}`}>
                  <h4 id={`system-outcome-title-${node.id}`}>What changes in the work</h4>
                  <p>{node.shift}</p>
                </section>

                {!compact && (
                  <footer className="system-story-practice">
                    <div><span>Related practice</span><p>{node.practice}</p></div>
                    <Link href={node.practiceHref}>Open {node.practiceLabel} <span aria-hidden="true">→</span></Link>
                  </footer>
                )}
              </article>
            ))}
          </div>
          <p className="scroll-swap-cue" aria-hidden="true">{activeIndex === systemNodes.length - 1 ? "Continue" : "Scroll to advance"}<span data-direction="down">↓</span></p>
        </div>
      </div>

      {compact && <Link className="button button-light" href={`/leadership-system?node=${activeNode}`}>Explore the whole system <span aria-hidden="true">→</span></Link>}
    </div>
  );
}

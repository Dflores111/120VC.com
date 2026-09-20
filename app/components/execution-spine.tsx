import type { ProblemConditionId, SystemNodeId } from "../data/primary-experience";
import { systemNodes } from "../data/primary-experience";

export type ExecutionSpineState = "connected" | "home-break" | "repair" | ProblemConditionId;

type ExecutionSpineProps = {
  state?: ExecutionSpineState;
  activeNode?: SystemNodeId;
  compact?: boolean;
  className?: string;
};

const nodeX = [58, 220, 382, 544, 706, 868] as const;

const stateLabels: Record<ExecutionSpineState, string> = {
  connected: "Strategy moves through priorities, decisions, commitments, and execution into measurable outcomes.",
  "home-break": "Strategy moves through priorities, decisions, commitments, and execution, but the connection to outcomes is breaking.",
  repair: "The leadership system reconnects intent, priorities, decisions, commitments, execution, and outcomes.",
  alignment: "Leaders need a shared priority set before teams can coordinate delivery.",
  ownership: "A shared outcome needs a clear owner and decision authority.",
  "decision-bottlenecks": "Waiting decisions hold up commitments and delivery.",
  "priority-overload": "Competing priorities exceed the team's capacity to deliver.",
  "key-person-dependency": "Delivery depends on a few people instead of shared practices.",
  "strategy-drift": "Strategy branches into competing priorities before coordinated work begins.",
  "leadership-fragmentation": "Decisions split into competing commitments across the leadership team.",
  "transformation-stall": "Commitments loop back into the previous operating state instead of changing execution.",
  "portfolio-overload": "Too many priorities accumulate before the organization has capacity to execute them.",
  "reactive-function": "Requests circulate through activity without reaching a measurable business outcome.",
};

function segmentState(state: ExecutionSpineState, index: number) {
  if (state === "connected" || state === "repair") return "connected";
  if (state === "home-break" && index === 4) return "broken";
  if (state === "alignment" && index === 0) return "broken";
  if (state === "ownership" && index === 2) return "broken";
  if (state === "decision-bottlenecks" && index === 1) return "broken";
  if (state === "priority-overload" && index === 1) return "constrained";
  if (state === "key-person-dependency" && index === 3) return "broken";
  if (state === "strategy-drift" && index === 0) return "broken";
  if (state === "leadership-fragmentation" && index === 2) return "broken";
  if (state === "transformation-stall" && index === 3) return "broken";
  if (state === "portfolio-overload" && index === 1) return "constrained";
  if (state === "reactive-function" && index === 4) return "broken";
  return "muted";
}

export function ExecutionSpine({ state = "connected", activeNode, compact = false, className = "" }: ExecutionSpineProps) {
  return (
    <figure className={`execution-spine execution-spine-${state} ${compact ? "execution-spine-compact" : ""} ${className}`}>
      <svg viewBox="0 0 926 208" aria-hidden="true" focusable="false">
        <g className="execution-spine-connectors">
          {nodeX.slice(0, -1).map((x, index) => (
            <line
              className={`execution-spine-segment spine-segment-${segmentState(state, index)}`}
              key={`${x}-${state}`}
              x1={x + 30}
              x2={nodeX[index + 1] - 30}
              y1="82"
              y2="82"
              pathLength="1"
            />
          ))}
        </g>

        {state === "strategy-drift" && (
          <g className="spine-state-mark spine-state-branch">
            <path d="M88 82c36 0 48-33 87-33h25" />
            <path d="M88 82c36 0 48 33 87 33h25" />
          </g>
        )}
        {state === "leadership-fragmentation" && (
          <g className="spine-state-mark spine-state-branch">
            <path d="M412 82c34 0 46-31 86-31h26" />
            <path d="M412 82c34 0 46 31 86 31h26" />
          </g>
        )}
        {state === "transformation-stall" && <path className="spine-state-mark spine-state-loop" d="M574 82c52-62 136-48 126 10-8 46-86 46-102 8" />}
        {state === "portfolio-overload" && (
          <g className="spine-state-mark spine-state-stack">
            <rect x="250" y="31" width="38" height="19" />
            <rect x="293" y="31" width="38" height="19" />
            <rect x="272" y="56" width="38" height="19" />
          </g>
        )}
        {state === "reactive-function" && <path className="spine-state-mark spine-state-loop" d="M736 82c38-48 102-34 98 12-4 39-60 37-72 8" />}

        {systemNodes.map((node, index) => {
          const selected = activeNode === node.id;
          return (
            <g className={`execution-spine-node ${selected ? "spine-node-active" : ""}`} key={node.id} transform={`translate(${nodeX[index]} 82)`}>
              <circle r="23" />
              <circle className="execution-spine-point" r={selected ? 7 : 4} />
              <text x="0" y="63" textAnchor="middle">{node.label}</text>
            </g>
          );
        })}
      </svg>
      <figcaption>{stateLabels[state]}</figcaption>
    </figure>
  );
}

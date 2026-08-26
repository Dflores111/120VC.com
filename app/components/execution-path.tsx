import type { CSSProperties } from "react";

export function ExecutionPath() {
  const steps = ["Strategy", "Priorities", "Decisions", "Commitments", "Execution", "Outcomes"];

  return (
    <div className="execution-path" role="img" aria-label="Strategy moves through priorities, decisions, commitments, and execution to produce outcomes">
      <p>One shared execution path</p>
      <ol>
        {steps.map((step, index) => (
          <li key={step} style={{ "--path-index": index } as CSSProperties}>
            <span aria-hidden="true" />
            <strong>{step}</strong>
          </li>
        ))}
      </ol>
    </div>
  );
}

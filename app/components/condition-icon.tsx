import type { SVGProps } from "react";
import type { ProblemConditionId } from "../data/primary-experience";

type ConditionIconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: ProblemConditionId;
  label?: string;
};

function ConditionIconPaths({ name }: { name: ProblemConditionId }) {
  switch (name) {
    case "strategy-drift":
      return (
        <>
          <circle cx="24" cy="24" r="17" />
          <path d="m29.5 17.5-3.4 8.6-8.6 3.4 3.4-8.6 8.6-3.4Z" />
          <path d="M24 7v3M24 38v3M7 24h3M38 24h3" />
        </>
      );
    case "leadership-fragmentation":
      return (
        <>
          <circle cx="24" cy="14" r="5" />
          <circle cx="11" cy="28" r="4" />
          <circle cx="37" cy="28" r="4" />
          <path d="M16 40c.7-6.1 3.4-9.2 8-9.2s7.3 3.1 8 9.2M4.5 40c.5-4.8 2.7-7.2 6.5-7.2 1.6 0 3 .4 4.1 1.3M43.5 40c-.5-4.8-2.7-7.2-6.5-7.2-1.6 0-3 .4-4.1 1.3" />
          <path className="condition-icon-accent" d="m20.5 24 2.2-2.2 2.2 2.2 2.6-2.6" />
        </>
      );
    case "transformation-stall":
      return (
        <>
          <path d="M38 18A16 16 0 0 0 10.5 13" />
          <path d="M10.5 8v5h5" />
          <path d="M10 30a16 16 0 0 0 27.5 5" />
          <path d="M37.5 40v-5h-5" />
          <path className="condition-icon-accent" d="M21 19v10M27 19v10" />
        </>
      );
    case "portfolio-overload":
      return (
        <>
          <path d="m8 16 16-8 16 8-16 8-16-8Z" />
          <path d="m8 24 16 8 16-8M8 32l16 8 16-8" />
          <path className="condition-icon-accent" d="M39 10v8M35 14h8" />
        </>
      );
    case "reactive-function":
      return (
        <>
          <path d="M13 32h22l-3-4V20a8 8 0 0 0-16 0v8l-3 4Z" />
          <path d="M21 37a3.5 3.5 0 0 0 6 0" />
          <path d="M9 17 5 14M39 17l4-3M24 8V4" />
          <path className="condition-icon-accent" d="m24 18-3 6h6l-3 6" />
        </>
      );
  }
}

export function ConditionIcon({ name, label, className = "", ...props }: ConditionIconProps) {
  return (
    <svg
      className={`condition-icon ${className}`}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      {...props}
    >
      <ConditionIconPaths name={name} />
    </svg>
  );
}

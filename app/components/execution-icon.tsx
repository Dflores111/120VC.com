import type { SVGProps } from "react";
import type { ProblemConditionId, SystemNodeId } from "../data/primary-experience";

export type ExecutionIconName =
  | ProblemConditionId
  | SystemNodeId
  | "challenge"
  | "one-three-one"
  | "two-by-two"
  | "daily-focus"
  | "weekly-doing"
  | "three-pillars";

type ExecutionIconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: ExecutionIconName;
  label?: string;
};

function IconPaths({ name }: { name: ExecutionIconName }) {
  switch (name) {
    case "intent":
      return <><circle cx="24" cy="24" r="10" /><circle className="execution-icon-accent" cx="24" cy="24" r="3" /><path d="M24 5v5M24 38v5M5 24h5M38 24h5" /></>;
    case "priorities":
      return <><path d="M9 13h30M9 24h23M9 35h16" /><circle className="execution-icon-accent" cx="38" cy="13" r="3" /></>;
    case "decisions":
      return <><path d="M8 10h13v13H8zM27 25h13v13H27zM21 16h8v9" /><path className="execution-icon-accent" d="m12 16 3 3 6-7" /></>;
    case "commitments":
      return <><path d="M13 8h22v32H13zM18 15h12M18 22h12M18 29h7" /><path className="execution-icon-accent" d="m30 32 3 3 6-7" /></>;
    case "execution":
      return <><path d="M7 24h25M25 15l9 9-9 9" /><circle className="execution-icon-accent" cx="10" cy="24" r="3" /></>;
    case "outcomes":
      return <><path d="M9 38V10M9 38h31M15 31l8-9 6 4 10-13" /><circle className="execution-icon-accent" cx="39" cy="13" r="3" /></>;
    case "strategy-drift":
      return <><path d="M7 24h12M19 24l12-11M19 24l12 11M31 13h9M31 35h9" /><circle className="execution-icon-accent" cx="19" cy="24" r="3" /></>;
    case "leadership-fragmentation":
      return <><path d="M7 12h12l7 12-7 12H7M26 24h15M34 24l7-11M34 24l7 11" /><circle className="execution-icon-accent" cx="26" cy="24" r="3" /></>;
    case "transformation-stall":
      return <><path d="M12 15a15 15 0 1 1-2 16M12 15v9h9" /><path className="execution-icon-accent" d="M25 24h13" /><circle className="execution-icon-accent" cx="25" cy="24" r="3" /></>;
    case "portfolio-overload":
      return <><path d="M7 12h13v8H7zM7 24h13v8H7zM24 9h13v8H24zM24 21h13v8H24zM24 33h13v8H24zM41 12v28" /><circle className="execution-icon-accent" cx="41" cy="24" r="3" /></>;
    case "reactive-function":
      return <><path d="M7 16h15M7 24h15M7 32h15M22 12h13v24H22zM35 24h7" /><path className="execution-icon-accent" d="M35 30c7 0 7-12 0-12" /><circle className="execution-icon-accent" cx="35" cy="24" r="3" /></>;
    case "challenge":
      return <><path d="M8 9h32v25H24l-9 7v-7H8z" /><path className="execution-icon-accent" d="M17 17h14M17 24h9" /></>;
    case "one-three-one":
      return <><circle cx="9" cy="24" r="4" /><circle cx="24" cy="11" r="4" /><circle cx="24" cy="24" r="4" /><circle cx="24" cy="37" r="4" /><circle className="execution-icon-accent" cx="40" cy="24" r="4" /><path d="M13 24h7M28 11l8 11M28 24h8M28 37l8-11" /></>;
    case "two-by-two":
      return <><path d="M8 8h32v32H8zM24 8v32M8 24h32" /><circle className="execution-icon-accent" cx="32" cy="16" r="4" /></>;
    case "daily-focus":
      return <><circle cx="24" cy="24" r="16" /><path d="M24 14v11l7 4" /><circle className="execution-icon-accent" cx="24" cy="24" r="3" /></>;
    case "weekly-doing":
      return <><path d="M8 12h32v28H8zM14 7v10M34 7v10M8 20h32" /><path className="execution-icon-accent" d="m15 29 5 5 12-12" /></>;
    case "three-pillars":
      return <><circle cx="24" cy="10" r="6" /><circle cx="13" cy="34" r="6" /><circle cx="35" cy="34" r="6" /><path d="m21 15-5 13M27 15l5 13M19 34h10" /><circle className="execution-icon-accent" cx="24" cy="25" r="3" /></>;
  }
}

export function ExecutionIcon({ name, label, className = "", ...props }: ExecutionIconProps) {
  return (
    <svg
      className={`execution-icon ${className}`}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...props}
    >
      <IconPaths name={name} />
    </svg>
  );
}

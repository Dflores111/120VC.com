import Link from "./native-link";
import { decisionBriefHref } from "../data/execution-decision-brief";
import { ScrollWords } from "./scroll-words";

/** One clear invitation to the ungated tool; its example lives in the tool. */
export function DecisionBriefPreview({ headingLevel = "h3", headingId = "brief-feature-title", title = "Find the decision holding delivery back.", description = "Answer six questions about one priority. Get a working brief for your next leadership meeting." }: { headingLevel?: "h2" | "h3"; headingId?: string; title?: string; description?: string }) {
  const Heading = headingLevel;
  return <div className="executive-brief-offer">
    <div className="executive-brief-offer-copy">
      <p className="executive-kicker">A practical strategy execution framework</p>
      <Heading id={headingId}>{headingLevel === "h2" ? <ScrollWords>{title}</ScrollWords> : title}</Heading>
      <p>{description}</p>
      <ul className="executive-brief-deliverables" aria-label="Your brief includes">
        <li>A practical next step</li>
        <li>A 20-minute agenda</li>
        <li>A commitment record</li>
      </ul>
      <Link className="button button-light" href={decisionBriefHref} data-primary-action>Build your decision brief</Link>
      <p className="executive-brief-assurance">No email required. Copy or print your result.</p>
    </div>
  </div>;
}

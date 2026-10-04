import Link from "./native-link";
import { decisionBriefHref } from "../data/execution-decision-brief";

/** A visible example lets the buyer judge the value before starting. */
export function DecisionBriefPreview({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return <div className="executive-brief-offer">
    <div className="executive-brief-offer-copy">
      <p className="executive-kicker">A brief for your next leadership meeting</p>
      <Heading id="brief-feature-title">Find the decision holding delivery back.</Heading>
      <p>Answer six questions about one priority. Leave with a practical next step, a 20-minute agenda, and a working record you can share with your team.</p>
      <Link className="button button-light" href={decisionBriefHref} data-primary-action>Build your decision brief</Link>
      <p className="executive-brief-assurance">No email required. Copy or print your result.</p>
    </div>
    <div className="executive-brief-sample" aria-label="Example of the brief’s guidance">
      <p className="executive-kicker">Example output · Not client evidence</p>
      <strong>Give the outcome an owner.</strong>
      <p>At the next meeting, agree who owns the result, which decisions they can make, and what each team commits to deliver.</p>
      <dl><div><dt>Bring</dt><dd>One unresolved handoff.</dd></div><div><dt>Leave with</dt><dd>A named owner and dated commitments.</dd></div><div><dt>Check next week</dt><dd>Can every team name its next deliverable?</dd></div></dl>
    </div>
  </div>;
}

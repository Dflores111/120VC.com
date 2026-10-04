import Link from "./native-link";
import { decisionBriefHref } from "../data/execution-decision-brief";

export function ExecutionWorkingRecord() {
  return <div className="execution-working-record">
    <p className="executive-kicker">Illustrative working record · Not client evidence</p>
    <h3>A decision should leave something the team can use.</h3>
    <dl>
      <div><dt>Outcome</dt><dd>The business result the teams have committed to deliver.</dd></div>
      <div><dt>Owner</dt><dd>One accountable person, with authority and cross-team commitments agreed.</dd></div>
      <div className="working-record-decision"><dt>Decision needed</dt><dd>What should move, wait, or change—and who decides by when.</dd></div>
      <div><dt>Next review</dt><dd>A date to inspect delivery evidence, unresolved dependencies, and the next action.</dd></div>
    </dl>
    <Link className="home-section-link" href={decisionBriefHref}>Build a brief for your own priority</Link>
  </div>;
}

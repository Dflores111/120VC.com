/** A discussion aid, not the proprietary Execution Health Diagnostic or a benchmark. */
export const decisionBriefHref = "/resources/execution-decision-brief";
export const deliveryContexts = ["A critical initiative", "A business transformation", "Better portfolio return", "A stronger internal function"] as const;
export const answerOptions = [
  { value: "clear", label: "Clearly", description: "Agreed and used in the work." },
  { value: "partly", label: "Partly", description: "In place, but not consistent." },
  { value: "missing", label: "No", description: "Not agreed or not happening." },
  { value: "unknown", label: "I don’t know", description: "Something to confirm together." },
] as const;
export type BriefAnswer = typeof answerOptions[number]["value"];
export const briefQuestions = [
  { id: "alignment", title: "Can the leaders involved name the same outcome and explain which priorities take precedence?", label: "Shared priorities", headline: "Agree on what comes first.", action: "Name the shared outcome and agree which competing priority can wait. Record the trade-off with the leaders affected.", bring: "The committed outcome and two competing priorities.", artifact: "Shared outcome / success evidence / priority to protect / work that waits", signal: "Can each team name the same outcome and the same trade-off?", guide: "/resources/tools/2x2-prioritization-matrix", guideLabel: "Explore the prioritization framework", help: "/execution-leadership-coaching" },
  { id: "ownership", title: "Does one named person own the outcome, with agreed commitments from the teams involved?", label: "Outcome ownership", headline: "Give the outcome an owner.", action: "Name one outcome owner. Agree on their decision authority, each team’s commitment, and how blocked handoffs escalate.", bring: "The outcome, participating teams, and one unresolved handoff.", artifact: "Outcome owner / decision authority / team commitments / acceptance evidence / dates", signal: "Can every team name the owner and its next deliverable?", guide: "/resources/guides/ownership-across-teams", guideLabel: "Read the ownership guide", help: "/leadership-system" },
  { id: "decision-bottlenecks", title: "For decisions blocking delivery, is it clear who decides, by when, and when to escalate?", label: "Decision authority", headline: "Turn a recurring discussion into a decision.", action: "Choose one blocked decision. Put the viable options, recommendation, decision owner, and deadline in one record.", bring: "One unresolved decision and the delivery commitment it is blocking.", artifact: "Blocked decision / options / recommendation / decision owner / decision date / escalation", signal: "Was the decision made by its date, and does the team know what happens next?", guide: "/resources/tools/1-3-1-decision-builder", guideLabel: "Explore the decision framework", help: "/embedded-execution-leadership#initiatives" },
  { id: "priority-overload", title: "When new work arrives, do leaders decide what stops, waits, or receives more capacity?", label: "Capacity trade-offs", headline: "Make room for the work that matters.", action: "Review new demand against available capacity. Make an explicit continue, wait, stop, or resource decision before adding work.", bring: "Current commitments, new demand, and the team’s actual capacity.", artifact: "Continue / wait / stop / capacity decision / owner / review date", signal: "Did something actually stop or wait when a new priority was added?", guide: "/resources/tools/work-rationalization-tool", guideLabel: "Explore work rationalization", help: "/embedded-execution-leadership#portfolios" },
  { id: "key-person-dependency", title: "Can decisions and commitments move without constant intervention from the same few leaders?", label: "Shared follow-through", headline: "Give the team a way to move without rescue.", action: "Choose one recurring decision to delegate. Agree on its limits, escalation triggers, and a regular review of commitments.", bring: "One recurring blocker and the decisions that currently return to the same leader.", artifact: "Delegated decision / decision limits / escalation triggers / commitments / next review", signal: "Did the team resolve that decision without waiting for executive intervention?", guide: "/resources/guides/weekly-operating-rhythm", guideLabel: "Read the operating rhythm guide", help: "/leadership-system" },
] as const;
export type BriefCondition = typeof briefQuestions[number]["id"];
export type BriefAnswers = Partial<Record<BriefCondition, BriefAnswer>>;
export const briefQuestionHeadings: Record<BriefCondition, string> = {
  alignment: "Are priorities shared?",
  ownership: "Does one person own the outcome?",
  "decision-bottlenecks": "Are decision rights clear?",
  "priority-overload": "Are capacity trade-offs explicit?",
  "key-person-dependency": "Can the team move without rescue?",
};

export function buildDecisionBrief(context: string, answers: BriefAnswers) {
  if (!deliveryContexts.includes(context as typeof deliveryContexts[number]) || briefQuestions.some(q => !answerOptions.some(o => o.value === answers[q.id]))) {
    throw new Error("Complete all six questions before creating a brief.");
  }
  // Missing agreements first; inconsistent agreements second. Unknown is a
  // verification question, not a risk score. Ties keep the visible question order.
  const gaps = briefQuestions.filter(q => answers[q.id] === "missing").concat(briefQuestions.filter(q => answers[q.id] === "partly"));
  const unknowns = briefQuestions.filter(q => answers[q.id] === "unknown");
  const focus = gaps[0] || unknowns[0];
  const mode = gaps.length ? "agreement" : unknowns.length ? "confirm" : "clear";
  const title = mode === "confirm" ? "Confirm the agreement before assuming it holds." : focus?.headline || "Test the agreements in the real work.";
  const reason = mode === "agreement" ? `Your answer on ${focus!.label.toLowerCase()} points to ${answers[focus!.id] === "missing" ? "a missing agreement" : "an inconsistent practice"}. Start here; this is not a ranking of business risk.`
    : mode === "confirm" ? `You were unsure about ${focus!.label.toLowerCase()}. Unknown is a question to confirm—not a failure.`
    : "Your answers did not surface a missing agreement. Compare them with the people who share the outcome.";
  const action = mode === "confirm"
    ? `Ask the people sharing the outcome to confirm ${focus!.label.toLowerCase()}. Compare their answers before choosing a fix.`
    : focus?.action || "This check did not surface a missing agreement. Compare your answers with the people who share the outcome, then inspect one recent decision and commitment together.";
  const bring = mode === "confirm" ? "The existing agreement or decision record and the people who use it." : focus?.bring || "One recent decision, the commitment it created, and evidence of progress.";
  const artifact = mode === "confirm" ? "Agreement to confirm / people consulted / evidence inspected / difference in answers / next step" : focus?.artifact || "Outcome / owner / decision / commitment / evidence / next review";
  const signal = mode === "confirm" ? "Can the people involved point to the same agreement and evidence? If not, what needs to be clarified?" : focus?.signal || "Do the agreed decisions and commitments still match what the team is doing?";
  const agenda = mode === "agreement" ? ["Confirm the outcome and compare evidence.", "Surface the blocked decision and the trade-offs.", "Make the decision and name the owner.", "Agree the commitment, date, and next review."]
    : mode === "confirm" ? ["Compare answers with the people involved.", "Inspect the existing agreement and evidence.", "Identify what is agreed and what is still unknown.", "Decide whether a change is needed; name the next check."]
    : ["Confirm the outcome and compare answers.", "Inspect one recent decision and its commitment.", "Check whether the agreement held in delivery.", "Agree what to preserve and when to review again."];
  const text = [
    "120VC | Execution Decision Brief", `Delivery context: ${context}`, "", title, reason, action,
    "", "Bring to the next meeting", bring,
    "", "20-minute leadership agenda", ...agenda.map((item, i) => `${i * 5}–${(i + 1) * 5} min: ${item}`),
    "", "Working record to complete", artifact,
    "", "Check next week", signal,
    "", "Your answers", ...briefQuestions.map(q => `${q.label}: ${answerOptions.find(o => o.value === answers[q.id])!.label}`),
    "", "Method: Missing agreements are shown before partly established agreements, in question order. Unknown answers are questions to confirm, not failures. This brief reflects your answers; it is a discussion aid, not an organizational benchmark or prediction.",
    "Do not include confidential client or company information when sharing this brief.",
  ].join("\n");
  return { context, answers, focus, mode, title, reason, action, bring, artifact, signal, agenda, gaps, unknowns, text };
}

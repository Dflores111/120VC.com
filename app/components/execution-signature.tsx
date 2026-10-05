/** A short reading path through the method. The connection draws once;
 * essential meaning is always rendered and scrolling remains native. */
const agreements = [
  { label: "Decision", title: "Resolve the trade-off." },
  { label: "Owner", title: "Name the owner." },
  { label: "Commitment", title: "Agree what’s due, when." },
  { label: "Review", title: "Review the evidence." },
] as const;

export function ExecutionSignature() {
  return <div className="execution-signature" data-scroll-enter>
    <ol className="execution-signature-track" aria-label="Agreements that move a stalled initiative forward">
      {agreements.map((agreement, index) => <li key={agreement.label}>
        <span className="execution-signature-node" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <strong>{agreement.title}</strong>
      </li>)}
    </ol>
  </div>;
}

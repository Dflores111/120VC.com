import Link from "@/app/components/native-link";

export type ReviewStatus = {
  label: string;
  status: "blocked" | "review" | "ready";
  detail: string;
};

export function ReviewModePanel({ exitHref, items }: { exitHref: string; items: ReviewStatus[] }) {
  return (
    <aside className="review-mode-panel" data-review-panel aria-label="Owner review status">
      <div className="review-mode-heading">
        <div>
          <span>Review mode</span>
          <strong>Not audience content</strong>
        </div>
        <Link href={exitHref}>Exit review mode</Link>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.label} data-status={item.status}>
            <span aria-hidden="true" />
            <div><strong>{item.label}</strong><p>{item.detail}</p></div>
          </li>
        ))}
      </ul>
    </aside>
  );
}

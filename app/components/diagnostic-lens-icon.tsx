type DiagnosticLensIconProps = {
  lens: "signals" | "impact" | "change";
};

export function DiagnosticLensIcon({ lens }: DiagnosticLensIconProps) {
  if (lens === "signals") {
    return (
      <svg className="diagnostic-lens-icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M5 24s7-11 19-11 19 11 19 11-7 11-19 11S5 24 5 24Z" />
        <circle cx="24" cy="24" r="5.5" />
        <path className="diagnostic-lens-icon-accent" d="M35.5 10.5 40 6m-3 11h6" />
      </svg>
    );
  }

  if (lens === "impact") {
    return (
      <svg className="diagnostic-lens-icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M24 5 44 40H4L24 5Z" />
        <path className="diagnostic-lens-icon-accent" d="M24 17v11" />
        <circle className="diagnostic-lens-icon-accent-fill" cx="24" cy="34" r="2" stroke="none" />
      </svg>
    );
  }

  return (
    <svg className="diagnostic-lens-icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="18" />
      <circle cx="24" cy="24" r="10" />
      <circle className="diagnostic-lens-icon-accent-fill" cx="24" cy="24" r="4" stroke="none" />
      <path className="diagnostic-lens-icon-accent" d="m29 19 11-11m0 0v8m0-8h-8" />
    </svg>
  );
}

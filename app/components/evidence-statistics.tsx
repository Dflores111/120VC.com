import { companyStatisticsSource, getCompanyStatisticsForReview, industryStatistics } from "../data/evidence-statistics";

export function IndustryStatistics() {
  return (
    <aside className="evidence-stats evidence-industry" aria-label="Industry research on execution">
      <p className="evidence-stats-eyebrow">Industry context</p>
      <dl className="evidence-stats-grid">
        {industryStatistics.map((stat) => (
          <div className="evidence-stat" key={stat.id}>
            <dt><span className="evidence-stat-value">{stat.value}</span></dt>
            <dd>
              <p className="evidence-stat-label">{stat.label}</p>
              <p className="evidence-stat-context">{stat.context}</p>
              <a
                className="evidence-stat-source"
                href={stat.sourceHref}
                target="_blank"
                rel="noopener noreferrer"
                title={stat.sourceTitle}
                aria-label={`${stat.sourceLabel}: ${stat.sourceTitle} (opens in a new tab)`}
              >
                <span>{stat.sourceLabel}</span><span aria-hidden="true" data-direction="out">↗</span>
              </a>
            </dd>
          </div>
        ))}
      </dl>
      <p className="evidence-stats-note">Historical estimates from different research contexts—not a failure rate for every project or a direct comparison with 120VC.</p>
    </aside>
  );
}

export function CompanyTrackRecord({ proposedHeadline }: { proposedHeadline?: string } = {}) {
  const statistics = getCompanyStatisticsForReview(process.env.NODE_ENV);
  if (statistics.length === 0) return null;

  return (
    <aside className="evidence-stats evidence-track-record" aria-label="120VC company-reported figures for review">
      <div className="evidence-stats-heading">
        <p className="evidence-stats-eyebrow">120VC, by the numbers</p>
        <span className="evidence-review-status">Review only · Not approved for publication</span>
      </div>
      {proposedHeadline && <h3 className="evidence-proposed-headline">{proposedHeadline}</h3>}
      <dl className="evidence-stats-grid">
        {statistics.map((stat) => (
          <div className="evidence-stat" key={stat.value}>
            <dt><span className="evidence-stat-value">{stat.value}</span></dt>
            <dd>
              <p className="evidence-stat-label">{stat.label}</p>
              <p className="evidence-stat-context">{stat.qualification}</p>
            </dd>
          </div>
        ))}
      </dl>
      <p className="evidence-stats-note">Company-reported figures; not independently validated. Hidden from production until substantiated and approved. <a className="evidence-stat-source" href={companyStatisticsSource}>View 120VC&apos;s published claims<span aria-hidden="true"> ↗</span></a></p>
    </aside>
  );
}

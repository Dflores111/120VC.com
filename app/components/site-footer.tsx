/* eslint-disable @next/next/no-img-element -- The remote SVG is the canonical 120VC brand asset. */
import Link from "next/link";

const columns = [
  {
    title: "Problems",
    links: [
      ["Strategy Execution Gap", "/problems-we-solve/strategy-execution-gap"],
      ["Leadership Team Alignment", "/problems-we-solve/leadership-team-alignment"],
      ["Transformation Execution", "/problems-we-solve/transformation-execution"],
      ["Project Portfolio ROI", "/problems-we-solve/project-portfolio-roi"],
      ["Internal Function Performance", "/problems-we-solve/internal-function-performance"],
    ],
  },
  {
    title: "Solutions",
    links: [
      ["ELPA", "/executive-leadership-coaching-and-development-performance-accelerator"],
      ["Leadership Team Transformation", "/transformation-leadership-team-development-coaching-and-program"],
      ["Enterprise Transformation", "/enterprise-digital-transformation"],
      ["Project Portfolio Services", "/roi-driven-project-portfolio-services"],
      ["Execution Leadership System", "/leadership-system"],
    ],
  },
  {
    title: "Evaluate",
    links: [
      ["Results and Evidence", "/case-studies"],
      ["Who We Help", "/who-we-help"],
      ["Frequently Asked Questions", "/faq"],
      ["120VC Insights", "/insights"],
      ["Leadership System Consultation", "/contact"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About 120VC", "/about"],
      ["Meet J. Scott", "/founder-jason-scott"],
      ["Contact", "/contact"],
      ["Privacy", "https://www.120vc.com/privacy-policy/"],
      ["GSD Shop", "https://store.120vc.com/"],
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <Link className="footer-brand" href="/" aria-label="120VC home">
          <img src="https://www.120vc.com/wp-content/uploads/2026/02/Asset-2.svg" alt="120VC" />
        </Link>
        <p>120VC is an Execution Leadership firm. We install a shared leadership system inside live work so enterprise teams can turn strategy into more predictable execution.</p>
      </div>

      <div className="footer-grid">
        {columns.map((column) => (
          <div className="footer-column" key={column.title}>
            <h2>{column.title}</h2>
            {column.links.map(([label, href]) => (
              href.startsWith("/")
                ? <Link href={href} key={href}>{label}</Link>
                : <a href={href} key={href}>{label}</a>
            ))}
          </div>
        ))}
      </div>

      <div className="footer-newsletter">
        <div>
          <p className="section-index">Execution Leadership thinking you can use.</p>
          <p>Practical ideas for leaders responsible for strategy, transformation, teams, and measurable outcomes.</p>
        </div>
        <a className="button button-light" href="mailto:info@120vc.com?subject=Subscribe%20me%20to%20120VC%20Insights">
          Subscribe with work email <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="footer-bottom">
        <p>Install the leadership system in the work—not outside of it.</p>
        <p>© {new Date().getFullYear()} 120VC. All rights reserved.</p>
      </div>
    </footer>
  );
}

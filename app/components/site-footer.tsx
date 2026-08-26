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
      ["Leadership Team Transformation", "/transformation-leadership-team-development-coaching-and-program"],
      ["Executive Leadership Performance Accelerator", "/executive-leadership-coaching-and-development-performance-accelerator"],
      ["Enterprise Transformation", "/enterprise-digital-transformation"],
      ["Project Portfolio Services", "/roi-driven-project-portfolio-services"],
    ],
  },
  {
    title: "How It Works",
    links: [
      ["Execution Leadership System", "/leadership-system"],
      ["Installation", "/leadership-system/installation"],
      ["Operating Practices", "/leadership-system/operating-practices"],
      ["Three Pillars", "/leadership-system/three-pillars"],
    ],
  },
  {
    title: "Results",
    links: [
      ["Results", "/results"],
      ["Operating Shifts", "/results/operating-shifts"],
      ["Measurement Methodology", "/results/methodology"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Tool Frameworks", "/resources/tools"],
      ["Assessment Frameworks", "/resources/assessments"],
      ["Guides and Books", "/resources/guides-and-books"],
      ["Executive Briefings", "/resources/executive-briefings"],
      ["Insights", "/resources/insights"],
    ],
  },
  {
    title: "For Leaders",
    links: [
      ["Chief Operating Officer", "/for-the-chief-operating-officer"],
      ["Chief Financial Officer", "/for-the-chief-financial-officer"],
      ["CIO or CTO", "/for-the-chief-technology-and-chief-information-officer"],
      ["Chief Transformation Officer", "/for-the-chief-transformation-officer"],
      ["Division President or VP", "/for-the-vp-and-division-presidents"],
    ],
  },
  {
    title: "About",
    links: [
      ["About", "/about"],
      ["J. Scott", "/founder-jason-scott"],
      ["The 120 Standard", "/about/the-120-standard"],
      ["Frequently Asked Questions", "/faq"],
      ["Consultation", "/consultation"],
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer master-footer">
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
            {column.links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
          </div>
        ))}
      </div>

      <div className="footer-newsletter">
        <div>
          <p className="section-index">Execution Leadership thinking you can use.</p>
          <p>Practical ideas for leaders accountable for strategy, transformation, teams, and measurable outcomes.</p>
        </div>
        <a className="button button-light" href="mailto:info@120vc.com?subject=Subscribe%20me%20to%20120VC%20Insights">
          Email us to subscribe <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="footer-bottom">
        <p>Install the leadership system in the work—not outside of it.</p>
        <nav aria-label="Legal and utility navigation">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/cookie-policy">Cookie Policy</Link>
          <a href="https://store.120vc.com/">GSD Shop</a>
        </nav>
        <p>© {new Date().getFullYear()} 120VC. All rights reserved.</p>
      </div>
    </footer>
  );
}

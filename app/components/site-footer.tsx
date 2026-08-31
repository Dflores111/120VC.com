/* eslint-disable @next/next/no-img-element -- The remote SVG is the canonical 120VC brand asset. */
import Link from "@/app/components/native-link";
import { hasApprovedFeaturedProof } from "../data/proof-governance";

const footerGroups = [
  {
    title: "Explore",
    links: [
      ["What We Solve", "/problems-we-solve"],
      ["How We Help", "/leadership-services"],
      ["How It Works", "/leadership-system"],
      ...(hasApprovedFeaturedProof ? [["Results", "/results"]] : []),
      ["Resources", "/resources"],
      ["Book a Consultation", "/consultation"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About 120VC", "/about"],
      ["J. Scott", "/founder-jason-scott"],
      ["For Leaders", "/for-leaders"],
      ["Careers", "/about/careers"],
      ["Contact", "/contact"],
      ["FAQ", "/faq"],
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer master-footer compact-footer">
      <div className="footer-lead">
        <Link className="footer-brand" href="/" aria-label="120VC home">
          <img src="https://www.120vc.com/wp-content/uploads/2026/02/Asset-2.svg" alt="120VC" />
        </Link>
        <div>
          <p className="footer-statement">Turn strategy into work that actually gets done.</p>
          <p>120VC installs one shared Execution Leadership System inside live enterprise work.</p>
        </div>
      </div>

      <div className="footer-grid">
        {footerGroups.map((group) => (
          <div className="footer-column" key={group.title}>
            <h2>{group.title}</h2>
            {group.links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
          </div>
        ))}
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

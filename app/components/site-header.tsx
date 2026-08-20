/* eslint-disable @next/next/no-img-element -- The remote SVG is the canonical 120VC brand asset. */
import Link from "next/link";

const primaryLinks = [
  ["Problems", "/problems-we-solve"],
  ["How it works", "/leadership-system"],
  ["Solutions", "/leadership-services"],
  ["Results", "/case-studies"],
  ["Who we help", "/who-we-help"],
  ["Insights", "/insights"],
  ["About", "/about"],
] as const;

export function SiteHeader() {
  return (
    <header className="site-header global-header">
      <Link className="brand" href="/" aria-label="120VC home">
        <img src="https://www.120vc.com/wp-content/uploads/2026/02/Asset-2.svg" alt="120VC" />
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {primaryLinks.map(([label, href]) => (
          <Link href={href} key={href}>{label}</Link>
        ))}
      </nav>

      <Link className="header-cta" href="/contact">
        Book a consultation <span aria-hidden="true">↗</span>
      </Link>

      <details className="mobile-menu">
        <summary aria-label="Open navigation"><span>Menu</span><i aria-hidden="true" /></summary>
        <nav aria-label="Mobile navigation">
          {primaryLinks.map(([label, href]) => (
            <Link href={href} key={href}>{label}<span aria-hidden="true">↗</span></Link>
          ))}
          <Link className="mobile-menu-cta" href="/contact">Book a consultation <span aria-hidden="true">↗</span></Link>
        </nav>
      </details>
    </header>
  );
}

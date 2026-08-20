const primaryLinks = [
  ["Problems we solve", "/problems-we-solve"],
  ["Solutions", "/leadership-services"],
  ["How it works", "/leadership-system"],
  ["Results", "/case-studies"],
  ["Who we help", "/who-we-help"],
  ["Insights", "/insights"],
  ["About", "/about"],
] as const;

export function SiteHeader() {
  return (
    <header className="site-header global-header">
      <a className="brand" href="/" aria-label="120VC home">
        <img src="https://www.120vc.com/wp-content/uploads/2026/02/Asset-2.svg" alt="120VC" />
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {primaryLinks.map(([label, href]) => (
          <a href={href} key={href}>{label}</a>
        ))}
      </nav>

      <a className="header-cta" href="/contact">
        Book a consultation <span aria-hidden="true">↗</span>
      </a>

      <details className="mobile-menu">
        <summary aria-label="Open navigation"><span>Menu</span><i aria-hidden="true" /></summary>
        <nav aria-label="Mobile navigation">
          {primaryLinks.map(([label, href]) => (
            <a href={href} key={href}>{label}<span aria-hidden="true">↗</span></a>
          ))}
          <a className="mobile-menu-cta" href="/contact">Book a consultation <span aria-hidden="true">↗</span></a>
        </nav>
      </details>
    </header>
  );
}

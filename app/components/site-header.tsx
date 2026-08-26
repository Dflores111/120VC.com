"use client";

/* eslint-disable @next/next/no-img-element -- The remote SVG is the canonical 120VC brand asset. */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { RippleLink } from "./ripple-link";

type NavLink = { label: string; href: string; description?: string };
type NavItem = { label: string; href: string; links: NavLink[] };

const navItems: NavItem[] = [
  {
    label: "Problems",
    href: "/problems-we-solve",
    links: [
      { label: "Strategy Execution Gap", href: "/problems-we-solve/strategy-execution-gap", description: "Strategy is not becoming coordinated execution." },
      { label: "Leadership Team Alignment", href: "/problems-we-solve/leadership-team-alignment", description: "The senior team is not operating as one." },
      { label: "Transformation Execution", href: "/problems-we-solve/transformation-execution", description: "Change is active but not becoming normal work." },
      { label: "Project Portfolio ROI", href: "/problems-we-solve/project-portfolio-roi", description: "The portfolio is busy but return is unclear." },
      { label: "Internal Function Performance", href: "/problems-we-solve/internal-function-performance", description: "A necessary function cannot show business value." },
      { label: "Take the Execution Health Diagnostic", href: "/resources/assessments/execution-health-diagnostic", description: "Identify the operating condition before choosing a solution." },
    ],
  },
  {
    label: "Solutions",
    href: "/leadership-services",
    links: [
      { label: "Executive Leadership Performance Accelerator", href: "/executive-leadership-coaching-and-development-performance-accelerator", description: "Install the system around one executive, team, and critical outcome." },
      { label: "Leadership Team Transformation", href: "/transformation-leadership-team-development-coaching-and-program", description: "Help the senior team prioritize, decide, and execute as one." },
      { label: "Enterprise Transformation", href: "/enterprise-digital-transformation", description: "Make enterprise or functional change become normal work." },
      { label: "Project Portfolio Services", href: "/roi-driven-project-portfolio-services", description: "Treat projects as investments that must produce return." },
      { label: "Project Leadership Managed Services", href: "/project-leadership-managed-services" },
      { label: "Smartsheet Portfolio Visibility", href: "/smartsheet-dashboards" },
      { label: "Compare solutions", href: "/leadership-services/compare-solutions" },
    ],
  },
  {
    label: "How It Works",
    href: "/leadership-system",
    links: [
      { label: "Execution Leadership System", href: "/leadership-system", description: "The shared system installed inside live work." },
      { label: "Installation", href: "/leadership-system/installation", description: "Diagnose, install, compound, and transfer capability." },
      { label: "Operating Practices", href: "/leadership-system/operating-practices", description: "The practical moves that make decisions become execution." },
      { label: "Three Pillars", href: "/leadership-system/three-pillars", description: "Customer, team, and profitability as one outcome standard." },
      { label: "What First Value Looks Like", href: "/results/operating-shifts", description: "The operating shifts that show the system is beginning to hold." },
      { label: "What is Execution Leadership?", href: "/leadership-system/execution-leadership" },
    ],
  },
  {
    label: "Results",
    href: "/results",
    links: [
      { label: "Case Studies", href: "/case-studies", description: "Approved outcome stories and publishing status." },
      { label: "Operating Shifts", href: "/results/operating-shifts", description: "The observable changes that precede business outcomes." },
      { label: "Measurement Methodology", href: "/results/methodology", description: "Definitions, baselines, periods, and proof governance." },
      { label: "Client References", href: "/results/client-references" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    links: [
      { label: "Tools", href: "/resources/tools", description: "Put prioritization, decisions, and focus into practice." },
      { label: "Assessments", href: "/resources/assessments", description: "Diagnose the condition before choosing the solution." },
      { label: "Guides and Books", href: "/resources/guides-and-books" },
      { label: "Executive Briefings", href: "/resources/executive-briefings" },
      { label: "Insights", href: "/resources/insights" },
      { label: "Podcasts", href: "/resources/podcasts" },
    ],
  },
  {
    label: "For Leaders",
    href: "/for-leaders",
    links: [
      { label: "COO", href: "/for-the-chief-operating-officer", description: "Coordinate execution across the business." },
      { label: "CFO", href: "/for-the-chief-financial-officer", description: "Turn capital allocation into execution discipline." },
      { label: "CIO or CTO", href: "/for-the-chief-technology-and-chief-information-officer", description: "Connect technology strategy to business value." },
      { label: "Chief Transformation Officer", href: "/for-the-chief-transformation-officer", description: "Make change become how the organization operates." },
      { label: "Division President or VP", href: "/for-the-vp-and-division-presidents", description: "Move the P&L through executable priorities." },
    ],
  },
  {
    label: "About",
    href: "/about",
    links: [
      { label: "About 120VC", href: "/about", description: "Company, category, system, and standard." },
      { label: "J. Scott", href: "/founder-jason-scott", description: "The founder and point of view behind the system." },
      { label: "The 120 Standard", href: "/about/the-120-standard", description: "Intentionality, discipline, trust, transparency, accountability." },
      { label: "Careers", href: "/about/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

function pathIsCurrent(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

const navOwnership: Record<string, string[]> = {
  Problems: ["/problems-we-solve"],
  Solutions: [
    "/leadership-services",
    "/executive-leadership-coaching-and-development-performance-accelerator",
    "/transformation-leadership-team-development-coaching-and-program",
    "/enterprise-digital-transformation",
    "/roi-driven-project-portfolio-services",
    "/project-leadership-managed-services",
    "/smartsheet-dashboards",
  ],
  "How It Works": ["/leadership-system"],
  Results: ["/results", "/case-studies"],
  Resources: ["/resources", "/insights"],
  "For Leaders": [
    "/for-leaders",
    "/for-the-chief-operating-officer",
    "/for-the-chief-financial-officer",
    "/for-the-chief-technology-and-chief-information-officer",
    "/for-the-chief-transformation-officer",
    "/for-the-vp-and-division-presidents",
  ],
  About: ["/about", "/founder-jason-scott", "/faq", "/contact"],
};

function navItemIsCurrent(pathname: string, item: NavItem) {
  return (navOwnership[item.label] || [item.href]).some((href) => pathIsCurrent(pathname, href));
}

export function SiteHeader() {
  const pathname = usePathname() || "/";
  const [desktopOpen, setDesktopOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const desktopButtons = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const breakpoint = window.matchMedia("(max-width: 1180px)");
    const closeIncompatibleNavigation = (event: MediaQueryListEvent | MediaQueryList) => {
      if (event.matches) setDesktopOpen(null);
      else {
        setMobileOpen(false);
        setMobileSection(null);
      }
    };
    closeIncompatibleNavigation(breakpoint);
    breakpoint.addEventListener("change", closeIncompatibleNavigation);
    return () => breakpoint.removeEventListener("change", closeIncompatibleNavigation);
  }, []);

  useEffect(() => {
    if (!desktopOpen) return;
    const closeOnOutside = (event: PointerEvent) => {
      if (headerRef.current?.contains(event.target as Node)) return;
      const button = desktopButtons.current[desktopOpen];
      setDesktopOpen(null);
      requestAnimationFrame(() => button?.focus());
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setDesktopOpen(null);
      desktopButtons.current[desktopOpen]?.focus();
    };
    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [desktopOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    const background = document.querySelectorAll<HTMLElement>(".site-shell > .global-header, .site-shell > main, .site-shell > footer");
    document.body.style.overflow = "hidden";
    background.forEach((element) => { element.inert = true; });
    requestAnimationFrame(() => closeButtonRef.current?.focus());

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMobileOpen(false);
        requestAnimationFrame(() => mobileButtonRef.current?.focus());
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = drawerRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", trapFocus);
    return () => {
      document.body.style.overflow = previousOverflow;
      background.forEach((element) => { element.inert = false; });
      document.removeEventListener("keydown", trapFocus);
    };
  }, [mobileOpen]);

  function toggleDesktop(item: NavItem) {
    const next = desktopOpen === item.label ? null : item.label;
    setDesktopOpen(next);
    if (next) requestAnimationFrame(() => document.querySelector<HTMLElement>(`#mega-${item.label.replaceAll(" ", "-").toLowerCase()} a`)?.focus());
  }

  function closeMobile() {
    setMobileOpen(false);
    requestAnimationFrame(() => mobileButtonRef.current?.focus());
  }

  return (
    <>
      <header className={`site-header global-header ${scrolled ? "header-scrolled" : ""}`} ref={headerRef}>
        <Link className="brand" href="/" aria-label="120VC home" aria-current={pathname === "/" ? "page" : undefined}>
          <img src="https://www.120vc.com/wp-content/uploads/2026/02/Asset-2.svg" alt="120VC" />
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => {
            const id = `mega-${item.label.replaceAll(" ", "-").toLowerCase()}`;
            const open = desktopOpen === item.label;
            return (
              <div className={`desktop-nav-group ${navItemIsCurrent(pathname, item) ? "nav-current" : ""}`} key={item.label}>
                <button
                  ref={(node) => { desktopButtons.current[item.label] = node; }}
                  type="button"
                  aria-expanded={open}
                  aria-controls={id}
                  onClick={() => toggleDesktop(item)}
                >
                  {item.label}<span aria-hidden="true">⌄</span>
                </button>
                {open && (
                  <div className="mega-menu" id={id} aria-label={`${item.label} navigation`}>
                    <div className="mega-menu-intro">
                      <p className="section-kicker">{item.label}</p>
                      <Link href={item.href} onClick={() => setDesktopOpen(null)}>Explore {item.label} <span aria-hidden="true">→</span></Link>
                    </div>
                    <div className="mega-menu-links">
                      {item.links.map((link) => (
                        <Link href={link.href} key={link.href} aria-current={pathname === link.href ? "page" : undefined} onClick={() => setDesktopOpen(null)}>
                          <strong>{link.label}</strong>
                          {link.description && <span>{link.description}</span>}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <RippleLink className="header-cta" href="/consultation">Book a Consultation <span aria-hidden="true">→</span></RippleLink>

        <button
          ref={mobileButtonRef}
          className="mobile-nav-toggle"
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMobileOpen((current) => !current)}
        >
          <span>{mobileOpen ? "Close" : "Menu"}</span><i aria-hidden="true" />
        </button>
      </header>

      {desktopOpen && <button className="mega-scrim" type="button" tabIndex={-1} aria-label="Close navigation menu" onClick={() => {
        const button = desktopButtons.current[desktopOpen];
        setDesktopOpen(null);
        requestAnimationFrame(() => button?.focus());
      }} />}

      {mobileOpen && (
        <div className="mobile-drawer-shell">
          <button className="mobile-drawer-scrim" type="button" tabIndex={-1} aria-label="Close navigation" onClick={closeMobile} />
          <aside className="mobile-drawer" id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Mobile navigation" ref={drawerRef}>
            <div className="mobile-drawer-header">
              <img src="https://www.120vc.com/wp-content/uploads/2026/02/Asset-2.svg" alt="120VC" />
              <button ref={closeButtonRef} type="button" aria-label="Close navigation" onClick={closeMobile}>Close <span aria-hidden="true">×</span></button>
            </div>
            <nav aria-label="Mobile primary navigation">
              {navItems.map((item) => {
                const open = mobileSection === item.label;
                const id = `mobile-${item.label.replaceAll(" ", "-").toLowerCase()}`;
                return (
                  <div className="mobile-nav-section" key={item.label}>
                    <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setMobileSection(open ? null : item.label)}>
                      {item.label}<span aria-hidden="true">{open ? "−" : "+"}</span>
                    </button>
                    {open && (
                      <div id={id} className="mobile-nav-links">
                        <Link className="mobile-nav-overview" href={item.href} onClick={closeMobile}>Explore {item.label} <span aria-hidden="true">→</span></Link>
                        {item.links.map((link) => (
                          <Link href={link.href} key={link.href} aria-current={pathname === link.href ? "page" : undefined} onClick={closeMobile}>{link.label}</Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
            <Link className="button button-primary mobile-drawer-cta" href="/consultation" onClick={closeMobile}>Book a Consultation <span aria-hidden="true">→</span></Link>
          </aside>
        </div>
      )}
    </>
  );
}

"use client";

/* eslint-disable @next/next/no-img-element -- The remote SVG is the canonical 120VC brand asset. */
import Link from "@/app/components/native-link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNavigation } from "../data/primary-experience";
import { hasApprovedFeaturedProof } from "../data/proof-governance";

const publicNavigation = primaryNavigation.filter((item) => !item.requiresProof || hasApprovedFeaturedProof);

function pathIsCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/problems-we-solve") return pathname.startsWith("/problems-we-solve");
  if (href === "/leadership-services") {
    return [
      "/leadership-services",
      "/executive-leadership-coaching-and-development-performance-accelerator",
      "/transformation-leadership-team-development-coaching-and-program",
      "/enterprise-digital-transformation",
      "/roi-driven-project-portfolio-services",
      "/project-leadership-managed-services",
      "/smartsheet-dashboards",
    ].some((route) => pathname === route || pathname.startsWith(`${route}/`));
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname() || "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef<HTMLElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    const background = document.querySelectorAll<HTMLElement>(".site-shell > header, .site-shell > main, .site-shell > footer, .site-shell > .review-mode-panel");
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

  function closeMobile() {
    setMobileOpen(false);
    requestAnimationFrame(() => mobileButtonRef.current?.focus());
  }

  return (
    <>
      <header className={`site-header global-header direct-header ${scrolled ? "header-scrolled" : ""}`}>
        <Link className="brand" href="/" aria-label="120VC home" aria-current={pathname === "/" ? "page" : undefined}>
          <img src="https://www.120vc.com/wp-content/uploads/2026/02/Asset-2.svg" alt="120VC" />
        </Link>

        <nav className="desktop-nav direct-nav" aria-label="Primary navigation">
          {publicNavigation.map((item) => (
            <Link href={item.href} key={item.href} aria-current={pathIsCurrent(pathname, item.href) ? "page" : undefined}>{item.label}</Link>
          ))}
        </nav>

        <Link className="header-cta" href="/consultation?source=global-header" data-analytics-event={pathname === "/" ? "homepage_consultation_clicked" : "consultation_clicked"} data-analytics-section="header">Request a Conversation <span aria-hidden="true">→</span></Link>
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

      {mobileOpen && (
        <div className="mobile-drawer-shell">
          <button className="mobile-drawer-scrim" type="button" tabIndex={-1} aria-label="Close navigation" onClick={closeMobile} />
          <aside className="mobile-drawer direct-mobile-drawer" id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Mobile navigation" ref={drawerRef}>
            <div className="mobile-drawer-header">
              <img src="https://www.120vc.com/wp-content/uploads/2026/02/Asset-2.svg" alt="120VC" />
              <button ref={closeButtonRef} type="button" aria-label="Close navigation" onClick={closeMobile}>Close <span aria-hidden="true">×</span></button>
            </div>
            <nav aria-label="Mobile primary navigation">
              <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>Home</Link>
              {publicNavigation.map((item) => (
                <Link href={item.href} key={item.href} aria-current={pathIsCurrent(pathname, item.href) ? "page" : undefined}>{item.label}</Link>
              ))}
            </nav>
            <Link className="button button-primary mobile-drawer-cta" href="/consultation?source=mobile-navigation" data-analytics-event={pathname === "/" ? "homepage_consultation_clicked" : "consultation_clicked"} data-analytics-section="mobile-navigation">Request a Conversation <span aria-hidden="true">→</span></Link>
          </aside>
        </div>
      )}
    </>
  );
}

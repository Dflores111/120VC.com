import Link from "@/app/components/native-link";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";

export default function NotFound() {
  return (
    <div className="site-shell inner-site">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main className="not-found" id="main-content" tabIndex={-1}>
        <p className="eyebrow"><span className="eyebrow-mark" />404 / Route not found</p>
        <h1>That path does not exist.</h1>
        <p>Return to the buyer journey or start with the condition your organization is trying to change.</p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/">Return home <span aria-hidden="true">→</span></Link>
          <Link className="button button-secondary" href="/problems-we-solve">Problems we solve <span aria-hidden="true">→</span></Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";

export default function NotFound() {
  return (
    <div className="site-shell inner-site">
      <SiteHeader />
      <main className="not-found">
        <p className="eyebrow"><span className="eyebrow-mark" />404 / Route not found</p>
        <h1>This path does not lead to an execution decision.</h1>
        <p>Return to the buyer journey or start with the condition your organization is trying to change.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="/">Return home <span aria-hidden="true">↗</span></a>
          <a className="button button-secondary" href="/problems-we-solve">Problems we solve <span aria-hidden="true">↗</span></a>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

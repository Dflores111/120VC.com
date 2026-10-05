import Link from "./native-link";
import { ScrollWords } from "./scroll-words";
import { engagementExpectations, engagementScopeNote, getEngagementExpectation, type EngagementOffer } from "../data/engagement-expectations";

/** Essential fit and delivery ownership stay visible—no hover or disclosure required. */
export function EngagementEvaluation({ offer, relatedLinks = [] }: { offer?: EngagementOffer; relatedLinks?: readonly { title: string; href: string }[] }) {
  const expectation = offer ? getEngagementExpectation(offer) : undefined;

  return (
    <section className={`engagement-expectations${expectation ? " engagement-expectations-detail" : " engagement-expectations-compare"}`} data-major-section data-journey-stage="evaluate" aria-labelledby="engagement-expectations-title">
      <div className="engagement-expectations-inner">
        <header className="engagement-expectations-heading">
          <h2 id="engagement-expectations-title">{expectation ? <ScrollWords>What working together involves.</ScrollWords> : "Who leads the work?"}</h2>
          {expectation && <p className="engagement-role-split">{expectation.roleSplit}</p>}
        </header>

        {expectation ? (
          <dl className="engagement-expectations-list">
            <div>
              <dt>Working outputs</dt>
              <dd><ul>{expectation.outputs.map(output => <li key={output}>{output}</li>)}</ul></dd>
            </div>
            <div><dt>Who needs to take part</dt><dd>{expectation.participation}</dd></div>
            <div><dt>Where responsibility sits</dt><dd>{expectation.boundary}</dd></div>
            <div className="engagement-first-signal"><dt>First useful signal</dt><dd>{expectation.firstSignal}</dd></div>
          </dl>
        ) : (
          <dl className="engagement-expectations-list engagement-comparison-list">
            {engagementExpectations.map(item => (
              <div key={item.id}>
                <dt><Link className="engagement-offer-link" href={item.href} data-choice-action>{item.label}<span aria-hidden="true">→</span></Link></dt>
                <dd>{item.roleSplit}</dd>
              </div>
            ))}
          </dl>
        )}

        <p className="engagement-scope-note"><strong>Before you commit:</strong> {engagementScopeNote}</p>
        {relatedLinks.map(link => <Link className="engagement-related-link" href={link.href} key={link.href}>Explore {link.title}<span aria-hidden="true">→</span></Link>)}
      </div>
    </section>
  );
}

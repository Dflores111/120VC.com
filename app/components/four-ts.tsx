import Link from "./native-link";
import { ExecutionIcon } from "./execution-icon";
import { homepage } from "../data/homepage-content";
import { ScrollWords } from "./scroll-words";

export function FourTs() {
  return (
    <section className="four-ts-section homepage-section" id="four-ts" data-major-section data-journey-stage="recognize" aria-labelledby="four-ts-title">
      <div className="four-ts-intro homepage-heading">
        <h2 id="four-ts-title"><ScrollWords>{homepage.fourTs.title}</ScrollWords></h2>
        <p>{homepage.fourTs.description}</p>
        <Link className="home-section-link" href="/problems-we-solve">Understand the execution gap <span aria-hidden="true">→</span></Link>
      </div>
      <div className="four-ts-grid">
        {homepage.fourTs.cards.map((item) => (
          <article className="four-ts-card" key={item.title} data-scroll-enter>
            <div className="four-ts-label"><ExecutionIcon name={item.icon} /><h3>{item.title}</h3></div>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

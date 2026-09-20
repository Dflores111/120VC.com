import Link from "./native-link";
import { ExecutionIcon } from "./execution-icon";
import { fourTs } from "../data/sitemap-content";
import { ScrollWords } from "./scroll-words";

export function FourTs() {
  return (
    <section className="four-ts-section" data-major-section data-journey-stage="recognize" aria-labelledby="four-ts-title">
      <div className="home-section-heading home-section-heading-stacked">
        <h2 id="four-ts-title"><ScrollWords>What are you looking to change?</ScrollWords></h2>
        <p>Explore the execution challenges behind investments in technology, talent, training, and transformation.</p>
      </div>
      <div className="four-ts-grid">
        {fourTs.map((item) => (
          <article className="four-ts-card" key={item.name}>
            <div className="four-ts-label"><ExecutionIcon name={item.icon} /><span>{item.name}</span></div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <Link className="quiet-link quiet-link-strong" href={item.href}>{item.action}<span aria-hidden="true">→</span></Link>
          </article>
        ))}
      </div>
    </section>
  );
}

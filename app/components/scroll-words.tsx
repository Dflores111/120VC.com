import { Fragment, type CSSProperties } from "react";

/** A finite, word-level entrance, derived from the saved Text Effect mechanism.
 * Normal text is the server/no-JS state; the shared scene observer enhances it. */
export function ScrollWords({ children, emphasis, onDark = false }: { children: string; emphasis?: string; onDark?: boolean }) {
  let order = 0;
  const words = (text: string) => text.split(/(\s+)/).filter(Boolean).map((part, index) => (
    /^\s+$/.test(part)
      ? <Fragment key={index}>{part}</Fragment>
      : <span className="scroll-word" style={{ "--word-order": Math.min(order++, 8) } as CSSProperties} key={index}>{part}</span>
  ));
  const start = emphasis ? children.indexOf(emphasis) : -1;
  return <span className="scroll-words">{start >= 0 && emphasis ? <>
    {words(children.slice(0, start))}
    <span className={`headline-keyword${onDark ? " headline-keyword-on-dark" : ""}`}>{words(emphasis)}</span>
    {words(children.slice(start + emphasis.length))}
  </> : words(children)}</span>;
}

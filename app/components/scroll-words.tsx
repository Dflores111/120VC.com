import { Fragment, type CSSProperties } from "react";

/** A finite, word-level entrance, derived from the saved Text Effect mechanism.
 * Normal text is the server/no-JS state; the shared scene observer enhances it. */
export function ScrollWords({ children }: { children: string }) {
  let order = 0;
  return <span className="scroll-words">{children.split(/(\s+)/).map((part, index) => (
    /^\s+$/.test(part)
      ? <Fragment key={index}>{part}</Fragment>
      : <span className="scroll-word" style={{ "--word-order": Math.min(order++, 8) } as CSSProperties} key={index}>{part}</span>
  ))}</span>;
}

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("the signature explains the method through readable agreements, not client proof", () => {
  const signature = read("app/components/execution-signature.tsx");
  for (const label of ["Decision", "Owner", "Commitment", "Review"]) assert.ok(signature.includes(`label: "${label}"`));
  assert.doesNotMatch(signature, /client result|success rate|\d+%/);
  assert.match(signature, /<ol[^>]*aria-label=/);
  assert.doesNotMatch(signature, /useEffect|useState|onWheel|preventDefault|setInterval|aria-hidden="true"[^>]*>\{agreement/);
  assert.ok(read("app/page.tsx").includes("<ExecutionSignature />"));
});

test("the signature is finite, optional enhancement with a stable mobile reading path", () => {
  const css = read("app/world-class-refinement.css");
  assert.match(css, /@media \(prefers-reduced-motion: no-preference\)/);
  assert.match(css, /transform 1800ms/);
  assert.match(css, /data-scroll-enter-state="pending"[^}]*opacity: 1; transform: none/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*execution-signature-track[^}]*grid-template-columns: 1fr/);
  assert.doesNotMatch(css, /infinite|position: (?:sticky|fixed)|overflow: hidden|scroll-snap/);
});

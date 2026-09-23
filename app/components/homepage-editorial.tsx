import { ImageMask } from "./image-mask";

/** Editorial emphasis preserves the exact approved sentence and reading order. */
export function LeadSentence({ children, emphasis }: { children: string; emphasis?: string }) {
  if (emphasis && children.startsWith(emphasis)) return <><strong>{emphasis}</strong>{children.slice(emphasis.length)}</>;
  const end = children.indexOf(". ");
  return end < 0 ? <>{children}</> : <><strong>{children.slice(0, end + 1)}</strong>{children.slice(end + 1)}</>;
}

export function HomepageEditorialImage({ scene }: { scene: "pressure" | "alongside" }) {
  const pressure = scene === "pressure";
  return <ImageMask
    className="homepage-editorial-image"
    src={`/images/homepage/${pressure ? "execution-under-pressure" : "leaders-working-alongside"}.webp`}
    alt={pressure
      ? "Illustrated scene: a focused leader reviews a delayed plan while colleagues listen with concern."
      : "Illustrated scene: colleagues work through a delivery plan together, listening and agreeing on the next step."}
    width={1000}
    height={667}
    caption="AI-generated illustration · Not client photography"
  />;
}

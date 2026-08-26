/* eslint-disable @next/next/no-img-element -- Source and locally optimized editorial assets are rendered by vinext. */
import type { ReactNode } from "react";

type ImageMaskProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  variant?: "step" | "portrait" | "panel";
  priority?: boolean;
  caption?: ReactNode;
};

export function ImageMask({ src, alt, width, height, className = "", variant = "panel", priority = false, caption }: ImageMaskProps) {
  return (
    <figure className={`image-mask image-mask-${variant} ${className}`}>
      <span className="image-mask-media">
        <span className="image-mask-rule" aria-hidden="true" />
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          fetchPriority={priority ? "high" : undefined}
          loading={priority ? "eager" : "lazy"}
        />
      </span>
      {caption && <figcaption className="image-mask-caption">{caption}</figcaption>}
    </figure>
  );
}

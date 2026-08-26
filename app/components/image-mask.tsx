/* eslint-disable @next/next/no-img-element -- Source-site assets retain their verified URLs in the vinext deployment. */
type ImageMaskProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  variant?: "step" | "portrait" | "panel";
  priority?: boolean;
};

export function ImageMask({ src, alt, width, height, className = "", variant = "panel", priority = false }: ImageMaskProps) {
  return (
    <figure className={`image-mask image-mask-${variant} ${className}`}>
      <span className="image-mask-rule" aria-hidden="true" />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        fetchPriority={priority ? "high" : undefined}
        loading={priority ? "eager" : "lazy"}
      />
    </figure>
  );
}

import type { AnchorHTMLAttributes, ReactNode } from "react";

type NativeLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
};

/**
 * Use the browser's native navigation for this hosted multi-page site.
 *
 * The vinext compatibility layer currently fails while initializing Next Link
 * prefetching in production. A plain anchor preserves every URL, query string,
 * hash link, keyboard behavior, and open-in-new-tab convention without relying
 * on that client-side interception.
 */
export default function NativeLink({ href, children, ...props }: NativeLinkProps) {
  return <a href={href} {...props}>{children}</a>;
}

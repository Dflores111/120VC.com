import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "../components/content-page";
import { allPages, pages } from "../site-data";

type Props = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() {
  return allPages.map((page) => ({ slug: page.slug.split("/") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug.join("/")];
  if (!page) return {};
  return {
    title: page.seoTitle,
    description: page.seoDescription,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      title: `${page.seoTitle} | 120VC`,
      description: page.seoDescription,
      url: `/${page.slug}`,
      type: "website",
      images: [],
    },
    twitter: {
      card: "summary",
      title: `${page.seoTitle} | 120VC`,
      description: page.seoDescription,
      images: [],
    },
  };
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const page = pages[slug.join("/")];
  if (!page) notFound();
  return <ContentPage page={page} />;
}

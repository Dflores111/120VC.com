import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "../components/content-page";
import { allPages, pageHasApprovalHold, pages } from "../site-data";

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
    robots: pageHasApprovalHold(page) ? { index: false, follow: false } : undefined,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      title: `${page.seoTitle} | 120VC`,
      description: page.seoDescription,
      url: `/${page.slug}`,
      type: "website",
      images: [{ url: "https://www.120vc.com/og.png", width: 1200, height: 630, alt: "120VC closes the gap between strategy and execution" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.seoTitle} | 120VC`,
      description: page.seoDescription,
      images: ["https://www.120vc.com/og.png"],
    },
  };
}

function FaqJsonLd() {
  const faq = pages["faq"];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.sections.map((section) => ({
      "@type": "Question",
      name: section.title,
      acceptedAnswer: { "@type": "Answer", text: (section.paragraphs || []).join(" ") },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const key = slug.join("/");
  const page = pages[key];
  if (!page) notFound();
  return (
    <>
      {key === "faq" && <FaqJsonLd />}
      <ContentPage page={page} />
    </>
  );
}

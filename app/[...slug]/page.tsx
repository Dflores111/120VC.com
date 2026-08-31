import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "../components/content-page";
import { HowWeHelpExperience } from "../components/how-we-help-experience";
import { HowItWorksExperience } from "../components/how-it-works-experience";
import { ResourcesExperience } from "../components/resources-experience";
import { ResultsExperience } from "../components/results-experience";
import { WhatWeSolveExperience } from "../components/problem-page";
import { isProblemConditionId, isProblemMode, isSystemNodeId, problemRouteConditions } from "../data/primary-experience";
import { isProofGatedRoute } from "../data/proof-governance";
import { allPages, pageHasApprovalHold, pages } from "../site-data";

type Props = {
  params: Promise<{ slug: string[] }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export function generateStaticParams() {
  return allPages.map((page) => ({ slug: page.slug.split("/") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const key = slug.join("/");
  const page = pages[key];
  if (!page) return {};
  const isLegacyProblemAlias = Boolean(problemRouteConditions[key]);
  const isProofGateClosed = isProofGatedRoute(key);
  return {
    title: page.seoTitle,
    description: page.seoDescription,
    robots: isLegacyProblemAlias || isProofGateClosed
      ? { index: false, follow: true }
      : pageHasApprovalHold(page) ? { index: false, follow: false } : undefined,
    alternates: { canonical: isLegacyProblemAlias ? "/problems-we-solve" : `/${page.slug}` },
    openGraph: {
      title: `${page.seoTitle} | 120VC`,
      description: page.seoDescription,
      url: isLegacyProblemAlias ? "/problems-we-solve" : `/${page.slug}`,
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

export default async function DynamicPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const query = searchParams ? await searchParams : {};
  const reviewMode = query.review === "1" && process.env.NODE_ENV !== "production";
  const key = slug.join("/");
  const page = pages[key];
  if (!page) notFound();
  const requestedCondition = Array.isArray(query.condition) ? query.condition[0] : query.condition;
  const requestedMode = Array.isArray(query.mode) ? query.mode[0] : query.mode;
  const requestedNode = Array.isArray(query.node) ? query.node[0] : query.node;
  const initialCondition = problemRouteConditions[key] || (isProblemConditionId(requestedCondition) ? requestedCondition : undefined);
  const initialMode = isProblemMode(requestedMode) ? requestedMode : undefined;
  const initialNode = isSystemNodeId(requestedNode) ? requestedNode : undefined;
  if (key === "problems-we-solve" || problemRouteConditions[key]) {
    return <WhatWeSolveExperience initialCondition={initialCondition} initialMode={initialMode} reviewMode={reviewMode} />;
  }
  if (key === "leadership-services") return <HowWeHelpExperience />;
  if (key === "leadership-system") return <HowItWorksExperience initialNode={initialNode} reviewMode={reviewMode} />;
  if (key === "results") return <ResultsExperience reviewMode={reviewMode} />;
  if (key === "resources") return <ResourcesExperience />;
  return (
    <>
      {key === "faq" && <FaqJsonLd />}
      <ContentPage page={page} reviewMode={reviewMode} />
    </>
  );
}

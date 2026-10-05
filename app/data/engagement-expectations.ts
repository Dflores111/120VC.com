/** Customer-facing engagement expectations, not fixed packages or outcome guarantees.
 * Sources are the current coaching / ELPA / embedded offer copy, the system's
 * first-value examples, and the participation / consultation answers in site-data.
 * Keep timing, format, investment, and the exact mandate subject to agreed scope.
 */
export type EngagementOffer = "coaching" | "installation" | "embedded";

export type EngagementExpectation = {
  id: EngagementOffer;
  label: string;
  href: string;
  route: string;
  roleSplit: string;
  outputs: readonly string[];
  participation: string;
  boundary: string;
  firstSignal: string;
  sourceRefs: readonly string[];
};

export const engagementExpectations: readonly EngagementExpectation[] = [
  {
    id: "coaching",
    label: "Execution Leadership Coaching",
    href: "/execution-leadership-coaching",
    route: "/execution-leadership-coaching",
    roleSplit: "Your leaders own delivery. 120VC coaches the decisions and commitments behind it.",
    outputs: [
      "Agreed priorities and trade-offs across functions.",
      "Named outcome and decision owners, with commitments to review together.",
    ],
    participation: "The executive sponsor and leaders who own the outcomes bring current priorities, make the trade-offs, and follow through on their commitments.",
    boundary: "120VC coaches your team; your leaders retain delivery ownership. The coaching applies to current work, not a separate software product.",
    firstSignal: "Leaders agree on which priority comes first, who owns the outcome, and the next commitment to review.",
    sourceRefs: ["app/data/sitemap-content.ts:execution-leadership-coaching", "app/site-data.ts:faq", "app/site-data.ts:leadership-system"],
  },
  {
    id: "installation",
    label: "Execution Leadership System",
    href: "/leadership-system",
    route: "/executive-leadership-coaching-and-development-performance-accelerator",
    roleSplit: "Your leaders apply the practices to current work. 120VC helps install the system through the Executive Leadership Performance Accelerator (ELPA).",
    outputs: [
      "Shared priorities, clear ownership, and decision rights applied to live work.",
      "A progress-review rhythm your leaders can continue to run together.",
    ],
    participation: "The accountable executive and relevant leaders apply the practices to current work. The sponsor commits to participation and changes in how the team operates.",
    boundary: "ELPA installs the Execution Leadership System; it is not a software rollout. Your executive cannot delegate their own leadership responsibility.",
    firstSignal: "A current priority has a named owner, a clear next commitment, and a review point your leaders use together.",
    sourceRefs: ["app/data/sitemap-content.ts:executive-leadership-coaching-and-development-performance-accelerator", "app/site-data.ts:executive-leadership-coaching-and-development-performance-accelerator", "app/site-data.ts:leadership-system"],
  },
  {
    id: "embedded",
    label: "Embedded Execution Leadership",
    href: "/embedded-execution-leadership",
    route: "/embedded-execution-leadership",
    roleSplit: "120VC leads execution alongside your team, within an agreed mandate and decision authority.",
    outputs: [
      "Visible decision owners, dependencies, risks, and cross-team commitments.",
      "Progress reviews that connect delivery to the committed business outcome.",
    ],
    participation: "An executive sponsor and the teams responsible for delivery agree the mandate, decision authority, and escalation path with 120VC.",
    boundary: "120VC leads the agreed work alongside your team. Client leaders remain accountable for decisions only they can make.",
    firstSignal: "A blocked decision or dependency moves forward, with a clear owner and next commitment.",
    sourceRefs: ["app/data/sitemap-content.ts:embedded-execution-leadership", "app/site-data.ts:project-leadership-managed-services", "app/site-data.ts:faq"],
  },
];

export const engagementScopeNote = "Agree on the scope, participants, time commitment, delivery format, duration, and fee with 120VC before deciding.";

/** Exact route mapping prevents a future offer from silently becoming coaching. */
export function engagementOfferForRoute(slug: string): EngagementOffer | undefined {
  return engagementExpectations.find(expectation => expectation.route === `/${slug}`)?.id;
}

export function getEngagementExpectation(offer: EngagementOffer) {
  return engagementExpectations.find(expectation => expectation.id === offer)!;
}

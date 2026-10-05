export type AvailabilityAction = Readonly<{
  label: string;
  href: string;
}>;

export type AvailabilitySection = Readonly<{
  eyebrow?: string;
  title: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
  statement?: string;
}>;

type ControlledPageBase = Readonly<{
  state: "unavailable" | "partially-available";
  indexing: "hold";
  heroIntro: string | null;
  publicSectionIndexes: readonly number[];
  publicSectionOverride?: AvailabilitySection;
  notice: Readonly<{
    label: string;
    title: string;
    description: string;
  }>;
  primaryAction: AvailabilityAction;
  secondaryAction?: AvailabilityAction;
}>;

export type LegalPageAvailability = ControlledPageBase & Readonly<{
  kind: "legal-policy";
  state: "unavailable";
  heroTitle: string;
  heroDescription: string;
}>;

export type PracticePageAvailability = ControlledPageBase & Readonly<{
  kind: "practice-explanation";
  state: "unavailable";
  unavailableExperience: "interactive-tool" | "downloadable-tool" | "interactive-assessment";
}>;

export type ResourceCollectionAvailability = ControlledPageBase & Readonly<{
  kind: "resource-collection";
  state: "partially-available";
  collection: "tools" | "assessments";
}>;

export type PageAvailability = LegalPageAvailability | PracticePageAvailability | ResourceCollectionAvailability;

const email120vc: AvailabilityAction = {
  label: "Email info@120vc.com",
  href: "mailto:info@120vc.com",
};

const decisionBrief: AvailabilityAction = {
  label: "Build the available Decision Brief",
  href: "/resources/execution-decision-brief",
};


const resourceLibrary: AvailabilityAction = {
  label: "Explore available resources",
  href: "/resources#resource-library",
};

export const pageAvailability = {
  privacy: {
    kind: "legal-policy",
    state: "unavailable",
    indexing: "hold",
    heroTitle: "Privacy policy information",
    heroDescription: "An approved 120VC privacy policy is not available on this concept site.",
    heroIntro: null,
    publicSectionIndexes: [],
    notice: {
      label: "Concept-site notice",
      title: "Do not rely on this page as a privacy policy.",
      description: "For privacy questions or requests related to 120VC, contact the company directly at info@120vc.com.",
    },
    primaryAction: email120vc,
  },
  terms: {
    kind: "legal-policy",
    state: "unavailable",
    indexing: "hold",
    heroTitle: "Website terms information",
    heroDescription: "Approved 120VC website terms are not available on this concept site.",
    heroIntro: null,
    publicSectionIndexes: [],
    notice: {
      label: "Concept-site notice",
      title: "Do not rely on this page as website terms.",
      description: "For questions about using 120VC materials or services, contact the company directly at info@120vc.com.",
    },
    primaryAction: email120vc,
  },
  "cookie-policy": {
    kind: "legal-policy",
    state: "unavailable",
    indexing: "hold",
    heroTitle: "Cookie policy information",
    heroDescription: "An approved 120VC cookie policy is not available on this concept site.",
    heroIntro: null,
    publicSectionIndexes: [],
    notice: {
      label: "Concept-site notice",
      title: "Do not rely on this page as a cookie policy.",
      description: "For questions about cookies or site data, contact 120VC directly at info@120vc.com.",
    },
    primaryAction: email120vc,
  },

  "resources/assessments": {
    kind: "resource-collection",
    state: "partially-available",
    indexing: "hold",
    collection: "assessments",
    heroIntro: "Start with the leadership or execution condition you are accountable for. Each linked page explains what that assessment is intended to examine.",
    publicSectionIndexes: [0],
    notice: {
      label: "Assessment explanations available · assessments unavailable",
      title: "Explore what each assessment would examine.",
      description: "The pages below explain the buyer question and dimensions behind each assessment. This concept site does not provide interactive questions, scoring, personalized results, reports, or data capture. The available Decision Brief is a discussion aid, not an assessment or benchmark.",
    },
    primaryAction: decisionBrief,
    secondaryAction: resourceLibrary,
  },


  "resources/assessments/execution-health-diagnostic": {
    kind: "practice-explanation",
    state: "unavailable",
    indexing: "hold",
    unavailableExperience: "interactive-assessment",
    heroIntro: "This page explains the dimensions used to recognize where priorities, decisions, ownership, risk, and operating rhythm may be breaking down.",
    publicSectionIndexes: [0],
    notice: {
      label: "Diagnostic explained · assessment unavailable",
      title: "Review the dimensions here. The assessment is not available.",
      description: "This concept site does not provide the questions, scoring, personalized result, report, or data capture. The available Decision Brief is a discussion aid, not a diagnostic or benchmark.",
    },
    primaryAction: decisionBrief,
    secondaryAction: resourceLibrary,
  },
  "resources/assessments/leadership-team-execution-assessment": {
    kind: "practice-explanation",
    state: "unavailable",
    indexing: "hold",
    unavailableExperience: "interactive-assessment",
    heroIntro: "This page explains the buyer question: is the team aligned only in the room, or operating as one after it?",
    publicSectionIndexes: [0],
    notice: {
      label: "Assessment explained · assessment unavailable",
      title: "Explore the question here. The assessment is not available.",
      description: "This concept site does not provide the questions, scoring, personalized result, report, or data capture. The available Decision Brief is a discussion aid, not an assessment or benchmark.",
    },
    primaryAction: decisionBrief,
    secondaryAction: resourceLibrary,
  },
  "resources/assessments/high-stakes-initiative-readiness": {
    kind: "practice-explanation",
    state: "unavailable",
    indexing: "hold",
    unavailableExperience: "interactive-assessment",
    heroIntro: "This page explains the readiness question for a critical initiative operating under real organizational pressure.",
    publicSectionIndexes: [0],
    notice: {
      label: "Assessment explained · assessment unavailable",
      title: "Explore the readiness question here. The assessment is not available.",
      description: "This concept site does not provide the questions, scoring, readiness result, report, or data capture. The available Decision Brief is a discussion aid, not an assessment or benchmark.",
    },
    primaryAction: decisionBrief,
    secondaryAction: resourceLibrary,
  },
  "resources/assessments/portfolio-roi-diagnostic": {
    kind: "practice-explanation",
    state: "unavailable",
    indexing: "hold",
    unavailableExperience: "interactive-assessment",
    heroIntro: "This page explains the portfolio question: does visibility lead to explicit investment decisions or only report activity?",
    publicSectionIndexes: [0],
    notice: {
      label: "Diagnostic explained · assessment unavailable",
      title: "Explore the portfolio question here. The diagnostic is not available.",
      description: "This concept site does not provide the questions, scoring, personalized result, report, or data capture. The available Decision Brief is a discussion aid, not a diagnostic or benchmark.",
    },
    primaryAction: decisionBrief,
    secondaryAction: resourceLibrary,
  },
  "resources/assessments/cost-center-to-value-engine-assessment": {
    kind: "practice-explanation",
    state: "unavailable",
    indexing: "hold",
    unavailableExperience: "interactive-assessment",
    heroIntro: "This page explains the question for internal functions: can necessary activity be connected to measurable enterprise value?",
    publicSectionIndexes: [0],
    notice: {
      label: "Assessment explained · assessment unavailable",
      title: "Explore the value question here. The assessment is not available.",
      description: "This concept site does not provide the questions, scoring, personalized result, report, or data capture. The available Decision Brief is a discussion aid, not an assessment or benchmark.",
    },
    primaryAction: decisionBrief,
    secondaryAction: resourceLibrary,
  },
} as const satisfies Record<string, PageAvailability>;

export type AvailabilityControlledSlug = keyof typeof pageAvailability;

export function getPageAvailability(slug: string): PageAvailability | undefined {
  return pageAvailability[slug as AvailabilityControlledSlug];
}

export function isAvailabilityControlled(slug: string): slug is AvailabilityControlledSlug {
  return slug in pageAvailability;
}

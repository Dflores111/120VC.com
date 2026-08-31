export type HomepageProofStatus = "demo" | "approved";

export type HomepageSupportingResult = {
  value: string;
  label: string;
};

export type HomepageCaseProof = {
  id: string;
  context: string;
  title: string;
  clientName: string | null;
  clientLogo: string | null;
  condition: string;
  intervention: string;
  afterState: string;
  conditionSummary: string;
  interventionSummary: string;
  afterSummary: string;
  beforePoints: readonly string[];
  changePoints: readonly string[];
  afterPoints: readonly string[];
  resultValue: string;
  resultLabel: string;
  timeframe: string;
  supportingResults: readonly HomepageSupportingResult[];
  quote: string;
  quotePerson: string | null;
  quoteRole: string;
  quoteOrganization: string;
  evidenceDescription: string;
  proofStatus: HomepageProofStatus;
  approvedForHomepage: boolean;
  fullStoryUrl?: string;
};

// These cases exist only to test the finished proof experience. They do not
// represent real clients, engagements, outcomes, or quotations. Their status is
// exposed by review mode, never inside the customer-facing case composition.
export const demoHomepageCaseProof: readonly HomepageCaseProof[] = [
  {
    id: "demo-decision-cycles",
    context: "Global technology enterprise",
    title: "From priority churn to decisions that hold.",
    clientName: null,
    clientLogo: null,
    condition: "Executive priorities changed faster than teams could translate them into coordinated work. Decisions repeatedly reopened after leadership meetings.",
    intervention: "120VC installed one shared rhythm for priorities, decisions, commitments, dependencies, and weekly execution.",
    afterState: "Priority conflicts surfaced before work was committed. Decisions held outside the meeting, and ownership became visible across functions.",
    conditionSummary: "Priority churn. Decisions repeatedly reopened.",
    interventionSummary: "One shared rhythm for priorities, decisions, commitments, dependencies, and weekly execution.",
    afterSummary: "Conflicts surfaced early. Decisions held. Ownership became visible.",
    beforePoints: ["Priorities competed", "Decisions reopened", "Ownership was unclear"],
    changePoints: ["One shared execution rhythm"],
    afterPoints: ["One priority set", "Decisions hold", "Owners are visible", "Coordinated execution"],
    resultValue: "42%",
    resultLabel: "faster cross-functional decisions",
    timeframe: "in 16 weeks",
    supportingResults: [
      { value: "37% fewer", label: "decisions reopened" },
      { value: "18% fewer", label: "executive escalations" },
    ],
    quote: "We stopped reopening the same decisions every week. The team finally knew what mattered, who owned it, and what had to move next.",
    quotePerson: null,
    quoteRole: "Executive Sponsor",
    quoteOrganization: "Global Technology Enterprise",
    evidenceDescription: "Competing priorities and reopened decisions resolve into one priority set, decisions that hold, visible owners, and coordinated execution.",
    proofStatus: "demo",
    approvedForHomepage: false,
  },
  {
    id: "demo-transformation-adoption",
    context: "Fortune 500 transformation organization",
    title: "From activity to operating change.",
    clientName: null,
    clientLogo: null,
    condition: "The transformation had strong executive sponsorship, but adoption varied by function and existing priorities continually displaced the work.",
    intervention: "120VC connected sponsor decisions, priority tradeoffs, functional ownership, dependencies, and weekly execution in one operating rhythm.",
    afterState: "Transformation priorities began replacing conflicting work instead of being layered on top of it. Leaders saw adoption risk before escalation.",
    conditionSummary: "New work, existing work, and local priorities created overload.",
    interventionSummary: "One rhythm connected tradeoffs, ownership, dependencies, and execution.",
    afterSummary: "Transformation priorities became normal operating work.",
    beforePoints: ["Transformation competed with existing work", "Adoption varied by function", "Tradeoffs stayed implicit"],
    changePoints: ["One connected operating rhythm"],
    afterPoints: ["Priorities replaced conflicting work", "Ownership became visible", "Adoption risk surfaced early"],
    resultValue: "31%",
    resultLabel: "less execution rework",
    timeframe: "in 6 months",
    supportingResults: [
      { value: "24% faster", label: "cross-functional issue resolution" },
      { value: "83%", label: "of transformation commitments visible weekly" },
    ],
    quote: "The transformation stopped feeling like another program. It became how the leadership team actually ran the work.",
    quotePerson: null,
    quoteRole: "Transformation Executive",
    quoteOrganization: "Fortune 500 Enterprise",
    evidenceDescription: "Layered transformation, existing work, and local priorities resolve into explicit tradeoffs, functional ownership, and normal operating work.",
    proofStatus: "demo",
    approvedForHomepage: false,
  },
  {
    id: "demo-portfolio-decisions",
    context: "Enterprise project portfolio",
    title: "From overload to focused investment.",
    clientName: null,
    clientLogo: null,
    condition: "Too many initiatives competed for the same people and capital. Status was visible, but very little work was being challenged or stopped.",
    intervention: "120VC installed portfolio rationalization and a decision rhythm requiring leaders to continue, accelerate, reshape, or stop work.",
    afterState: "Lower-value work left the portfolio, capacity shifted toward priority initiatives, and investment decisions became inspectable instead of political.",
    conditionSummary: "Too many initiatives competed for one capacity band.",
    interventionSummary: "Leadership chose what to continue, accelerate, reshape, or stop.",
    afterSummary: "Capacity concentrated on priority work.",
    beforePoints: ["Initiatives competed for capacity", "Every priority looked equal", "Low-value work stayed active"],
    changePoints: ["One portfolio decision rhythm"],
    afterPoints: ["Priority work gained capacity", "Lower-value work stopped", "Investment decisions became inspectable"],
    resultValue: "2.3×",
    resultLabel: "faster portfolio prioritization decisions",
    timeframe: "in one planning cycle",
    supportingResults: [
      { value: "18% fewer", label: "active initiatives" },
      { value: "26% more capacity", label: "concentrated on top-priority work" },
    ],
    quote: "We finally had a way to decide what deserved investment instead of treating every initiative like it was equally important.",
    quotePerson: null,
    quoteRole: "Portfolio Executive",
    quoteOrganization: "Global Enterprise",
    evidenceDescription: "A jammed portfolio is sorted through continue, accelerate, reshape, and stop decisions into deliberate priority capacity allocation.",
    proofStatus: "demo",
    approvedForHomepage: false,
  },
];

// Add evidence-approved records here only after the proof governance review.
export const approvedHomepageCaseProof: readonly HomepageCaseProof[] = [];

export function caseMayRenderForProductionAudience(caseStudy: HomepageCaseProof) {
  return caseStudy.proofStatus === "approved" && caseStudy.approvedForHomepage === true;
}

export function getHomepageCaseProof(environment: string | undefined, reviewMode = false) {
  const approved = approvedHomepageCaseProof.filter(caseMayRenderForProductionAudience);
  if (environment === "production") return approved;
  return environment === "development" || reviewMode ? [...approved, ...demoHomepageCaseProof] : approved;
}

export const homepageProductionProofRequirement = approvedHomepageCaseProof.some(caseMayRenderForProductionAudience)
  ? null
  : "PROOF CONTENT REQUIRED BEFORE PRODUCTION CONVERSION LAUNCH";

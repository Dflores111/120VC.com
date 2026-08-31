type ProofStatus = "approved";

type ProofGovernance = {
  sourceReference: string;
  approvalDate: string;
  reviewDate: string;
};

export type ApprovedLogoProof = ProofGovernance & {
  id: string;
  status: ProofStatus;
  client: string;
  logoAsset: string;
  attribution: string;
  permissions: {
    name: boolean;
    logo: boolean;
    homepageLogo: boolean;
  };
};

export type ApprovedCaseProof = ProofGovernance & {
  id: string;
  status: ProofStatus;
  client: string;
  context: string;
  offer: string;
  baseline: string;
  before: string;
  intervention: string;
  firstOperatingShift: string;
  result: string;
  timeframe: string;
  methodology: string;
  qualification: string;
  attribution: string;
  clientVoice: string;
  permissions: {
    name: boolean;
    quote: boolean;
    outcome: boolean;
    homepageCase: boolean;
    resultsIndex: boolean;
  };
};

// Publication is evidence-led. Add records only after every relevant field and
// surface permission has been verified; historical website usage is not approval.
export const approvedLogoProof: readonly ApprovedLogoProof[] = [];
export const approvedCaseProof: readonly ApprovedCaseProof[] = [];

const logoEvidenceIsComplete = (record: ApprovedLogoProof) => Boolean(
  record.status === "approved"
  && record.client
  && record.logoAsset
  && record.attribution
  && record.sourceReference
  && record.approvalDate
  && record.reviewDate
);

const caseEvidenceIsComplete = (record: ApprovedCaseProof) => Boolean(
  record.status === "approved"
  && record.client
  && record.context
  && record.offer
  && record.baseline
  && record.before
  && record.intervention
  && record.firstOperatingShift
  && record.result
  && record.timeframe
  && record.methodology
  && record.qualification
  && record.attribution
  && record.clientVoice
  && record.sourceReference
  && record.approvalDate
  && record.reviewDate
);

export const approvedHomepageLogos = approvedLogoProof.filter((record) => (
  logoEvidenceIsComplete(record)
  && record.permissions.name
  && record.permissions.logo
  && record.permissions.homepageLogo
));

export const approvedHomepageCases = approvedCaseProof.filter((record) => (
  caseEvidenceIsComplete(record)
  && record.permissions.name
  && record.permissions.quote
  && record.permissions.outcome
  && record.permissions.homepageCase
  && record.permissions.resultsIndex
));

// Keep public discovery closed until approved evidence is both present and
// rendered through reviewed logo/case components. Data alone must not open routes.
export const publicProofPresentationReady = false;

export const hasApprovedFeaturedProof = publicProofPresentationReady
  && approvedHomepageLogos.length > 0
  && approvedHomepageCases.length > 0;

const proofGatedRoutes = new Set([
  "case-studies",
  "results",
  "results/methodology",
  "results/operating-shifts",
  "results/client-references",
]);

export function isProofGatedRoute(slug: string) {
  return proofGatedRoutes.has(slug) && !hasApprovedFeaturedProof;
}

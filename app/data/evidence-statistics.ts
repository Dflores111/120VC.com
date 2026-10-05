export const industryStatistics = [
  {
    id: "strategy-execution",
    value: "67%",
    label: "of well-formulated strategies failed due to poor execution.",
    context: "2016 estimate · HBR, 2017",
    sourceLabel: "Harvard Business Review",
    sourceTitle: "Executives Fail to Execute Strategy Because They’re Too Internally Focused",
    sourceHref: "https://hbr.org/2017/11/executives-fail-to-execute-strategy-because-theyre-too-internally-focused",
    checkedOn: "2026-09-22",
  },
  {
    id: "corporate-transformation",
    value: "~70%",
    label: "of corporate transformations fail.",
    context: "Research cited by McKinsey, 2019",
    sourceLabel: "McKinsey & Company",
    sourceTitle: "Why do most transformations fail? A conversation with Harry Robinson",
    sourceHref: "https://www.mckinsey.com/capabilities/transformation/our-insights/why-do-most-transformations-fail-a-conversation-with-harry-robinson",
    checkedOn: "2026-09-22",
  },
] as const;

// Prior public use is not substantiation. These are design-review content only;
// do not promote them to public proof without evidence and publication approval.
const companyStatisticsForReview = [
  { value: "227%", label: "Better performance", qualification: "Comparison and calculation to be confirmed." },
  { value: "98%", label: "Success rate", qualification: "Definition, sample, and period to be confirmed." },
  { value: "25+", label: "Years across global enterprises", qualification: "Experience dates and scope to be confirmed." },
] as const;

export const companyStatisticsSource = "https://www.120vc.com/leadership-system/";

export function getCompanyStatisticsForReview(environment: string | undefined, reviewMode = false) {
  // No query parameter can enable these claims in a public production build.
  return environment === "development" && reviewMode ? companyStatisticsForReview : [];
}

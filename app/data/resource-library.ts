import type { ExecutionIconName } from "../components/execution-icon";
import type { SitePage } from "../site-data";
import { toolkitTools, toolHref } from "./toolkit-manifest.ts";

export type ResourceCategory = "frameworks" | "guides" | "insights";
export type ResourceItem = { category: ResourceCategory; icon: ExecutionIconName; title: string; description: string; href: string; action: string; external?: boolean };

export const resourceItems: readonly ResourceItem[] = [
  { category: "guides", icon: "decisions", title: "Execution Decision Brief", description: "Six questions. One practical next step and a brief for your leadership meeting. No email required.", href: "/resources/execution-decision-brief", action: "Build your brief" },
  ...toolkitTools.map(tool => ({ category: "frameworks" as const, icon: (tool.id === "focus" ? "two-by-two" : tool.id === "decision" ? "one-three-one" : tool.id === "pillars" ? "three-pillars" : "weekly-doing") as ExecutionIconName, title: tool.title, description: tool.description, href: toolHref(tool.id), action: "Open tool" })),
  { category: "guides", icon: "weekly-doing", title: "How to establish a weekly operating rhythm", description: "Turn a status meeting into a review of commitments, decisions, and what needs to change.", href: "/resources/guides/weekly-operating-rhythm", action: "Read the guide" },
  { category: "guides", icon: "commitments", title: "How to clarify ownership across teams", description: "Name the outcome owner, the decision owner, and the commitments between teams.", href: "/resources/guides/ownership-across-teams", action: "Read the guide" },
  { category: "insights", icon: "execution", title: "Why digital transformations stall", description: "Look beyond implementation milestones to decisions, adoption, and operating change.", href: "/resources/insights/why-digital-transformations-stall", action: "Read the insight" },
  { category: "insights", icon: "decisions", title: "When to bring in a program management consultant", description: "Recognize when a cross-team delivery problem needs dedicated execution leadership.", href: "/resources/insights/when-to-bring-in-a-program-management-consultant", action: "Read the insight" },
  { category: "insights", icon: "commitments", title: "Executive Team Performance", description: "Understand what coordinated commitment requires after the meeting ends.", href: "/resources/insights/executive-team-performance", action: "Read the insight" },
  { category: "insights", icon: "priorities", title: "Portfolio ROI and the PMO", description: "See why status visibility is not the same as an investment decision.", href: "/resources/insights/portfolio-roi-and-pmo", action: "Read the insight" },
];

const article = (slug: string, title: string, description: string, sections: SitePage["sections"], offer: { title: string; href: string }): SitePage => ({
  slug, title, description, seoTitle: title, seoDescription: description, eyebrow: "", intro: "",
  primaryCta: { label: "Explore the resource library", href: "/resources#resource-library" },
  sections: sections.map(section => ({ ...section, presentation: "primary" })),
  related: [{ ...offer, description: "Put these practices to work with your team." }],
  closingTitle: "Need help putting this into practice?",
  closingDescription: "Start with the outcome your team needs to deliver.",
  closingCta: { label: "Let's Talk", href: "/contact?source=resource" },
});

// New editorial copy for the four resource topics requested in the sitemap.
// These are readable articles, not downloadable or state-saving tools.
export const resourcePages: Record<string, SitePage> = {
  "resources/execution-decision-brief": article("resources/execution-decision-brief", "Find the decision holding delivery back.", "Build an Execution Decision Brief for one cross-functional priority: six questions, a practical next step, a leadership-meeting agenda, and a shareable working record. No email required.", [], { title: "Execution Leadership System", href: "/leadership-system" }),
  "resources/guides/weekly-operating-rhythm": article("resources/guides/weekly-operating-rhythm", "How to establish a weekly operating rhythm", "Use a shared weekly review to connect priorities, commitments, and decisions to the outcomes your team owns.", [
    { title: "Start with the commitments, not a round of updates.", paragraphs: ["Bring the same short list of priorities to each review. For each commitment, name the outcome owner, the next deliverable, its due date, and the evidence that will show it is complete. Keep the list visible between meetings so the team can prepare." ] },
    { title: "Use the meeting to change what happens next.", bullets: ["Review what was delivered against the commitment. Separate evidence from confidence or activity.", "Surface blocked dependencies and decisions early. Name the person who can resolve each one.", "When new work arrives, decide what stops, waits, or changes. Do not silently add it to an already full plan.", "End with agreed commitments, owners, and dates. Record the decisions where everyone can find them."] },
    { title: "Review the rhythm itself.", paragraphs: ["After several reviews, ask whether fewer decisions are waiting, dependencies are resolved sooner, and commitments are more reliable. If the meeting still produces updates without decisions, narrow the agenda and bring the people with authority to act." ] },
  ], { title: "Execution Leadership System", href: "/leadership-system" }),
  "resources/guides/ownership-across-teams": article("resources/guides/ownership-across-teams", "How to clarify ownership across teams", "Make responsibility clear where work crosses functions, so handoffs do not leave outcomes without an owner.", [
    { title: "Name the outcome before assigning the tasks.", paragraphs: ["Write down what must be delivered and how the team will know it is complete. Assign one accountable outcome owner. That person does not need to do every task, but needs the authority and support to coordinate the work and surface unresolved issues." ] },
    { title: "Separate delivery ownership from decision authority.", bullets: ["Identify the decisions the work depends on, who makes each decision, and who must contribute.", "Agree on each team's commitment: the deliverable, acceptance criteria, and date.", "Name how a blocked handoff will be escalated and who can make a trade-off.", "Make this agreement available to every team involved, then use it in the progress review."] },
    { title: "Test the agreement against a real delay.", paragraphs: ["Choose a current dependency. Can everyone name who owns the result, who can resolve the issue, and what happens next? If answers differ, clarify the agreement before adding more reporting. Revisit ownership when the scope or team changes." ] },
  ], { title: "Execution Leadership Coaching", href: "/execution-leadership-coaching" }),
  "resources/insights/why-digital-transformations-stall": article("resources/insights/why-digital-transformations-stall", "Why digital transformations stall", "A technology launch is a milestone. The business change depends on what people decide, adopt, and do differently afterward.", [
    { title: "Implementation is not the whole outcome.", paragraphs: ["A new platform can go live while teams continue using old workarounds. A migration plan can be complete while nobody owns the change to a cross-functional process. Tracking implementation alone leaves these gaps easy to miss." ] },
    { title: "Look at the work around the technology.", bullets: ["Are business and technology leaders working toward the same outcome?", "Who owns adoption and the operating changes after launch?", "Which unresolved decisions or dependencies are holding teams up?", "What evidence would show better service, a better team experience, or improved business performance?"] },
    { title: "Lead the operating change through delivery.", paragraphs: ["Connect the implementation plan to named business owners, shared priorities, and regular decisions about dependencies and capacity. Review adoption and business outcomes alongside technical milestones. The goal is a new way of working that holds after the launch team moves on." ] },
  ], { title: "Enterprise transformation execution", href: "/embedded-execution-leadership#enterprise" }),
  "resources/insights/when-to-bring-in-a-program-management-consultant": article("resources/insights/when-to-bring-in-a-program-management-consultant", "When to bring in a program management consultant", "Consider dedicated execution leadership when several teams must deliver one outcome and coordination is becoming a delivery risk.", [
    { title: "Identify the gap you need someone to own.", paragraphs: ["A missed milestone does not automatically mean you need more project management. Start by locating the cause: a missing skill, unavailable capacity, an unresolved executive decision, or a cross-team delivery problem. Each calls for a different response." ] },
    { title: "Look for work that falls between teams.", bullets: ["Dependencies repeatedly miss their handoff dates.", "Individual projects look healthy, but the shared outcome keeps moving out.", "Risks and decisions are reported without a clear owner or resolution.", "An executive has become the only person connecting the teams."] },
    { title: "Define the mandate before the engagement.", paragraphs: ["Agree on the outcome, the teams involved, the decisions the leader can make, and the escalation path for decisions they cannot make. Ask how they will lead delivery with your team and make progress inspectable. Plan for ownership and working practices to remain clear when the engagement ends." ] },
  ], { title: "Embedded Execution Leadership", href: "/embedded-execution-leadership" }),
};

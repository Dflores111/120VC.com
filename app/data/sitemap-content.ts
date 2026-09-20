import type { SitePage } from "../site-data";
import type { SolutionScope } from "../components/solution-scope-cards";

// Content and hierarchy supplied in 120VC_Website_Sitemap_and_Copy (1).docx.
// Existing search URLs are preserved; new offers receive their own destinations.
export const siteRoutes = {
  problems: "/problems-we-solve",
  services: "/leadership-services",
  coaching: "/execution-leadership-coaching",
  system: "/leadership-system",
  elpa: "/executive-leadership-coaching-and-development-performance-accelerator",
  embedded: "/embedded-execution-leadership",
  contact: "/contact",
} as const;

export const offerScopes: readonly SolutionScope[] = [
  {
    label: "Coaching", title: "Execution Leadership Coaching",
    description: "Your leaders own delivery. We coach them through real priorities, decisions, and commitments so they execute together.",
    bestWhen: "Competing priorities keep pulling your leadership team apart.",
    change: "Coach the decisions and commitments behind delivery.",
    outcome: "Leaders make shared priorities, clear decisions, and reliable follow-through part of everyday work.",
    href: siteRoutes.coaching, image: "/images/story/aligned-leadership-team.jpg",
    imageAlt: "Leaders work together on shared priorities.", imageWidth: 1600, imageHeight: 1066, tone: "clay",
  },
  {
    label: "System", title: "Execution Leadership System",
    description: "We install shared practices for priorities, ownership, decisions, and follow-through using your team's current work.",
    bestWhen: "Teams need a consistent way to execute across functions.",
    change: "Apply the system to the priorities and commitments your team already owns.",
    outcome: "Shared priorities, clear decision rights, and an operating rhythm your leaders can run together.",
    href: siteRoutes.system, image: "/images/story/team-working-together.jpg",
    imageAlt: "A team puts a shared way of working into practice.", imageWidth: 1800, imageHeight: 1008, tone: "sage",
  },
  {
    label: "Embedded", title: "Embedded Execution Leadership",
    description: "Bring 120VC leaders into critical initiatives, portfolios, or enterprise transformation to lead execution alongside your team.",
    bestWhen: "Critical work needs experienced execution leaders alongside your team now.",
    change: "Lead priorities, decisions, ownership, and progress reviews in delivery.",
    outcome: "Teams resolve dependencies and connect everyday work to committed business outcomes.",
    href: siteRoutes.embedded, image: "/images/problems/portfolio-outcome.jpg",
    imageAlt: "Execution leaders review priorities with a client team.", imageWidth: 1800, imageHeight: 1200, tone: "ink",
  },
];

export const fourTs = [
  { name: "Technology", title: "New tools. The same execution problems?", description: "Make ownership and decisions clear so technology investment translates into progress.", action: "Explore transformation execution", href: `${siteRoutes.embedded}#enterprise`, icon: "execution" },
  { name: "Talent", title: "More people. Still too much waiting?", description: "Connect added capacity to clear priorities, decision rights, and coordinated delivery.", action: "Explore Embedded Execution Leadership", href: siteRoutes.embedded, icon: "commitments" },
  { name: "Training", title: "New skills. What changes in the work?", description: "Build learning into the decisions, commitments, and follow-through your team practices every day.", action: "Explore the Execution Leadership System", href: siteRoutes.system, icon: "priorities" },
  { name: "Transformation", title: "A major transformation. Where is the progress?", description: "Connect functions around shared outcomes, accountable leaders, and decisions that move delivery forward.", action: "Explore enterprise execution", href: `${siteRoutes.embedded}#enterprise`, icon: "outcomes" },
] as const;

const talk = { label: "Let's Talk", href: siteRoutes.contact };
const systemLink = { title: "Execution Leadership System", description: "Establish a shared way to align priorities, make decisions, and follow through.", href: siteRoutes.system };
const base = (slug: string, title: string, description: string, seoTitle: string): SitePage => ({ slug, title, description, seoTitle, seoDescription: description, eyebrow: "", intro: "", sections: [], primaryCta: talk });

export const sitemapPages: Record<string, SitePage> = {
  "execution-leadership-coaching": {
    ...base("execution-leadership-coaching", "Execution Leadership Coaching for your executive team.", "Coach your leaders to make shared priorities, clear decisions, and reliable follow-through part of everyday work.", "Execution Leadership Coaching for Executive Teams"),
    heroImage: { src: "/images/story/aligned-leadership-team.jpg", alt: "An executive team working through shared priorities.", width: 1600, height: 1066 },
    sections: [
      { title: "Your leaders agree in meetings. Priorities still pull them apart.", paragraphs: ["Competing goals and unresolved decisions make it difficult for your team to deliver together."], presentation: "primary" },
      { title: "Coach the decisions and commitments behind delivery.", paragraphs: ["Work through current priorities, practice accountability, and review progress with the leaders who own the outcomes."], bullets: ["Agree on the trade-offs across functions.", "Name who can make the decision and who owns the outcome.", "Review commitments together and address what is getting in the way."], presentation: "primary" },
      { title: "Make the practices part of how your team operates.", paragraphs: ["Use the Execution Leadership System to establish a shared operating model across your team."], cards: [systemLink], presentation: "primary" },
    ],
    closingTitle: "What does your leadership team need to change?",
    closingDescription: "Start with the priorities and decisions your leaders are working through.",
  },
  "embedded-execution-leadership": {
    ...base("embedded-execution-leadership", "Execution leaders who lead the work alongside your team.", "Bring 120VC into the initiatives, portfolios, and transformations your organization has committed to deliver.", "Embedded Execution Leadership for Initiatives and Portfolios"),
    heroImage: { src: "/images/problems/portfolio-outcome.jpg", alt: "Leaders coordinate delivery across a team.", width: 1800, height: 1200 },
    sections: [
      { title: "The commitment is made. Execution needs leadership.", paragraphs: ["Dependencies are unresolved, decisions wait, and the team needs experienced leaders to move the work forward."], presentation: "primary" },
      { title: "Apply the Execution Leadership System in delivery.", paragraphs: ["We lead priorities, decisions, ownership, and progress reviews with your team, connecting everyday work to the committed outcomes."], cards: [systemLink], presentation: "primary" },
    ],
    closingTitle: "What work needs execution leadership?",
    closingDescription: "Start with the outcome, the teams involved, and where delivery is getting stuck.",
  },
  "executive-leadership-coaching-and-development-performance-accelerator": {
    ...base("executive-leadership-coaching-and-development-performance-accelerator", "Install the Execution Leadership System in your team's daily work.", "The Executive Leadership Performance Accelerator (ELPA) turns the system into practices your leaders use in their current work.", "ELPA — Execution Leadership System Installation"),
    primaryCta: { label: "Discuss installation", href: "/contact?inquiry=elpa&source=elpa" },
    heroImage: { src: "/images/story/team-working-together.jpg", alt: "Leaders practice a shared approach around current work.", width: 1800, height: 1008 },
    sections: [
      { title: "For teams ready to change how they execute.", paragraphs: ["Build a shared approach when competing priorities, unclear ownership, and inconsistent follow-through keep slowing delivery."], presentation: "primary" },
      { title: "Install the practices through real work.", paragraphs: ["Apply shared priorities, clear ownership, and a consistent operating rhythm to the outcomes your team is already responsible for."], presentation: "primary" },
      { title: "What installation involves.", paragraphs: ["Discuss the leaders who need to participate, the work they will apply the system to, and the time they can commit. We will work through the duration, weekly commitment, delivery format, and fee with your team before you decide."], presentation: "primary" },
    ],
    related: [systemLink], closingTitle: "Discuss installation with your team in mind.",
    closingDescription: "Tell us who needs to participate, what you need to deliver, and where execution is breaking down.",
  },
};

export const embeddedScopes = [
  { id: "initiatives", title: "Lead a critical initiative.", description: "Establish project or program leadership, resolve dependencies, and keep risks and decisions visible.", detail: "Project and program management consulting", href: "/project-leadership-managed-services" },
  { id: "portfolios", title: "Lead execution across the portfolio.", description: "Connect project priorities, investment, and capacity to the business outcomes that matter.", detail: "Project portfolio management", href: "/roi-driven-project-portfolio-services" },
  { id: "enterprise", title: "Lead transformation across functions.", description: "Coordinate business and technology teams through enterprise, digital, or IT transformation, including adoption and organizational change.", detail: "Enterprise and digital transformation", href: "/enterprise-digital-transformation" },
] as const;

export const primaryPageCopy = {
  "problems-we-solve": { title: "Your strategy is clear. Why isn't it getting executed?", description: "The strategy execution gap appears when agreed priorities lose momentum between leadership decisions and the work your teams deliver.", seoTitle: "The Strategy Execution Gap — Problems We Solve" },
  "leadership-services": { title: "Execution Leadership, from coaching to leading the work.", description: "Choose the level of involvement your team needs to turn commitments into delivered outcomes.", seoTitle: "Execution Leadership — Coaching, System and Embedded Leadership" },
  "leadership-system": { title: "The Execution Leadership System: a shared way to turn strategy into results.", description: "A practical operating model for how leaders align their teams, make decisions, and follow through on commitments.", seoTitle: "Execution Leadership System — A Shared Operating Model" },
  "resources": { title: "Practical tools and ideas for better strategy execution.", description: "Frameworks, step-by-step guides, and insights to help your team set priorities, make decisions, and follow through.", seoTitle: "Strategy Execution Resources — Frameworks, Guides and Insights" },
  "results": { title: "See what our clients achieved.", description: "Explore the challenges our clients faced, the work we led together, and the outcomes they achieved.", seoTitle: "120VC Client Results and Case Studies" },
  "about": { title: "Meet the people behind 120VC.", description: "We lead critical initiatives with enterprise teams and build the leadership practices that sustain execution.", seoTitle: "About 120VC — The People Behind Execution Leadership" },
} as const;

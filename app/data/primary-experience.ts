import { sitemapProblems } from "./sitemap-problems";

export type ProblemConditionId =
  | "alignment"
  | "ownership"
  | "decision-bottlenecks"
  | "priority-overload"
  | "key-person-dependency"
  | "strategy-drift"
  | "leadership-fragmentation"
  | "transformation-stall"
  | "portfolio-overload"
  | "reactive-function";

export type ProblemMode = "understand" | "work" | "help";

export type ExperienceLink = {
  label: string;
  title: string;
  description: string;
  href: string;
  external?: boolean;
};

export type ProblemCondition = {
  id: ProblemConditionId;
  label: string;
  icon: ProblemConditionId;
  headline: string;
  preview: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    position?: string;
  };
  signals: [string, string, string];
  cost: string;
  change: string;
  response?: { action: string; outcome: string };
  paths: Record<ProblemMode, ExperienceLink>;
};

export const problemConditions = sitemapProblems;
export const legacyProblemConditions: readonly ProblemCondition[] = [
  {
    id: "strategy-drift",
    label: "Priorities keep changing",
    icon: "strategy-drift",
    headline: "The strategy is clear. The work keeps drifting.",
    preview: "Priorities change, decisions reopen, and teams translate the same direction differently.",
    image: {
      src: "/images/problems/strategy-overload.jpg",
      alt: "An executive faces several competing requests from colleagues.",
      width: 1800,
      height: 1200,
      position: "50% 48%",
    },
    signals: ["Priorities keep changing", "Decisions reopen", "Teams interpret the strategy differently"],
    cost: "Capacity gets spent on competing versions of the same direction.",
    change: "Leaders make the tradeoffs visible before work begins.",
    paths: {
      understand: {
        label: "Understand it",
        title: "Read The Strategy Execution Gap",
        description: "See why sound strategy fragments after it leaves the leadership room.",
        href: "https://www.120vc.com/book-download-the-strategy-execution-gap/",
        external: true,
      },
      work: {
        label: "Work on it",
        title: "Explore the 2×2 Prioritization Matrix",
        description: "Make the tradeoff visible: what deserves focus, what should wait, and what should stop.",
        href: "/resources/tools/2x2-prioritization-matrix",
      },
      help: {
        label: "Get help",
        title: "Executive Leadership Performance Accelerator",
        description: "Install the system around a high-stakes priority already in motion.",
        href: "/executive-leadership-coaching-and-development-performance-accelerator",
      },
    },
  },
  {
    id: "leadership-fragmentation",
    label: "Leaders pull in different directions",
    icon: "leadership-fragmentation",
    headline: "Leaders agree, then execute separately.",
    preview: "The same questions return, functions give conflicting direction, and the sponsor resolves every dependency.",
    image: {
      src: "/images/problems/alignment-friction.jpg",
      alt: "A senior leader looks overwhelmed while other executives debate in a meeting.",
      width: 1800,
      height: 1200,
      position: "50% 44%",
    },
    signals: ["The same decisions keep returning", "Functions give conflicting direction", "The sponsor resolves every dependency"],
    cost: "The team works harder while enterprise decisions move more slowly.",
    change: "One decision produces one owner and one visible commitment.",
    paths: {
      understand: {
        label: "Understand it",
        title: "Explore executive team performance",
        description: "See what coordinated commitment requires after the meeting ends.",
        href: "/resources/insights/executive-team-performance",
      },
      work: {
        label: "Work on it",
        title: "Explore the 1-3-1 Decision Builder",
        description: "Clarify one problem, three viable options, and one accountable recommendation.",
        href: "/resources/tools/1-3-1-decision-builder",
      },
      help: {
        label: "Get help",
        title: "Leadership Team Transformation",
        description: "Help senior leaders challenge, decide, commit, and execute as one team.",
        href: "/transformation-leadership-team-development-coaching-and-program",
      },
    },
  },
  {
    id: "transformation-stall",
    label: "Transformation loses momentum",
    icon: "transformation-stall",
    headline: "Launched. The work stayed the same.",
    preview: "Existing priorities still win, adoption varies by function, and the transformation office keeps pushing.",
    image: {
      src: "/images/problems/transformation-fatigue.jpg",
      alt: "A team shows visible frustration while working through a change initiative.",
      width: 1800,
      height: 1201,
      position: "50% 48%",
    },
    signals: ["Existing priorities still win", "Adoption varies by function", "The transformation office keeps pushing"],
    cost: "The organization gains more activity, fatigue, and cynicism than operating change.",
    change: "A sponsor changes a real priority, resource, or accountability decision.",
    paths: {
      understand: {
        label: "Understand it",
        title: "Why strategies fail after launch",
        description: "Watch a short explanation of the leadership condition underneath stalled change.",
        href: "https://www.youtube.com/watch?v=gKjxOtwD-8o",
        external: true,
      },
      work: {
        label: "Work on it",
        title: "Explore the Challenge · Opportunity Builder",
        description: "Turn a vague change complaint into a condition leaders can decide and act on.",
        href: "/resources/tools/challenge-opportunity-builder",
      },
      help: {
        label: "Get help",
        title: "Enterprise Transformation",
        description: "Change leadership decisions, operating behavior, and measurable business value together.",
        href: "/enterprise-digital-transformation",
      },
    },
  },
  {
    id: "portfolio-overload",
    label: "Too many projects compete for capacity",
    icon: "portfolio-overload",
    headline: "Too much work competes for the same capacity.",
    preview: "Projects stay active, almost nothing stops, and green reporting hides weak return.",
    image: {
      src: "/images/problems/portfolio-review.jpg",
      alt: "Senior leaders review a crowded set of project reports and charts.",
      width: 1800,
      height: 1200,
      position: "50% 45%",
    },
    signals: ["Too many active projects", "Almost nothing gets stopped", "Green reporting hides weak return"],
    cost: "The best people are spread across work that does not deserve equal support.",
    change: "One initiative is continued, accelerated, reshaped, or stopped.",
    paths: {
      understand: {
        label: "Understand it",
        title: "Explore portfolio ROI thinking",
        description: "See why status visibility is not the same as an investment decision.",
        href: "/resources/insights/portfolio-roi-and-pmo",
      },
      work: {
        label: "Work on it",
        title: "Explore the Work Rationalization Tool",
        description: "Decide what to continue, reshape, consolidate, delay, or stop.",
        href: "/resources/tools/work-rationalization-tool",
      },
      help: {
        label: "Get help",
        title: "ROI-Driven Project Portfolio Services",
        description: "Treat projects as investments and make the next portfolio decision explicit.",
        href: "/roi-driven-project-portfolio-services",
      },
    },
  },
  {
    id: "reactive-function",
    label: "Internal teams are stuck reacting",
    icon: "reactive-function",
    headline: "The team stays busy. The value stays unclear.",
    preview: "Demand determines the work, requests go unchallenged, and activity is easier to measure than value.",
    image: {
      src: "/images/problems/function-overload.jpg",
      alt: "An internal leader appears overloaded as colleagues present competing requests.",
      width: 1800,
      height: 1200,
      position: "50% 42%",
    },
    signals: ["Demand determines the work", "Requests go unchallenged", "Activity is easier to measure than value"],
    cost: "The team becomes overloaded while trust in the function stays low.",
    change: "The function recommends a better business decision instead of simply taking the order.",
    paths: {
      understand: {
        label: "Understand it",
        title: "Explore enterprise transformation",
        description: "Understand how a necessary function moves from reactive service to measurable business value.",
        href: "/resources/insights/enterprise-transformation",
      },
      work: {
        label: "Work on it",
        title: "Explore the Three Pillars Decision Filter",
        description: "Test a recommendation across customer, team, and profitability outcomes.",
        href: "/resources/tools/three-pillars-decision-filter",
      },
      help: {
        label: "Get help",
        title: "Enterprise Transformation",
        description: "Help the function challenge demand, recommend better decisions, and prove value.",
        href: "/enterprise-digital-transformation",
      },
    },
  },
] as const;

export type SystemNodeId = "intent" | "priorities" | "decisions" | "commitments" | "execution" | "outcomes";

export const systemNodes = [
  {
    id: "intent",
    label: "Intent",
    description: "Define what must change and why it matters.",
    explanation: "Before work begins, leaders align on the condition to change, why it matters now, and the outcome worth pursuing.",
    makesVisible: ["The condition or opportunity", "Why it matters now", "Evidence that the change is working"],
    shift: "Teams stop solving different versions of the problem.",
    practiceLabel: "Challenge · Opportunity Builder",
    practice: "Frame the challenge or opportunity before prescribing the work.",
    practiceHref: "/resources/tools/challenge-opportunity-builder",
  },
  {
    id: "priorities",
    label: "Priorities",
    description: "Decide what deserves capacity.",
    explanation: "Leadership makes tradeoffs explicit so limited capacity follows the work with the strongest business case.",
    makesVisible: ["What wins now", "What waits", "What stops"],
    shift: "Important work receives enough time, talent, attention, and capital to move.",
    practiceLabel: "2×2 Prioritization Matrix",
    practice: "Use explicit tradeoffs to focus capacity on what matters most.",
    practiceHref: "/resources/tools/2x2-prioritization-matrix",
  },
  {
    id: "decisions",
    label: "Decisions",
    description: "Make a clear decision that will hold.",
    explanation: "A decision holds when the problem, viable options, recommendation, authority, and rationale are visible.",
    makesVisible: ["The problem to resolve", "Viable options and tradeoffs", "One recommendation and decision owner"],
    shift: "Meetings end with a decision that does not need to be reopened.",
    practiceLabel: "1-3-1 Decision Builder",
    practice: "Move from one problem through viable options to one recommendation.",
    practiceHref: "/resources/tools/1-3-1-decision-builder",
  },
  {
    id: "commitments",
    label: "Commitments",
    description: "Make ownership visible.",
    explanation: "Every decision becomes a visible promise with an owner, timing, dependencies, and known risk.",
    makesVisible: ["The accountable owner", "The date and dependencies", "Risk and escalation path"],
    shift: "Teams know who owes what to whom—and by when.",
    practiceLabel: "Weekly Team DOING",
    practice: "Turn every decision into a visible owner, date, dependency, and promise.",
    practiceHref: "/resources/tools/weekly-team-doing",
  },
  {
    id: "execution",
    label: "Execution",
    description: "Run the work under real pressure.",
    explanation: "A weekly operating rhythm compares commitments with reality while there is still time to intervene.",
    makesVisible: ["Movement since the last review", "Risks and dependencies", "The next decision or action"],
    shift: "Issues surface early enough for leaders to act instead of explain later.",
    practiceLabel: "Weekly Team DOING",
    practice: "Run a weekly rhythm that exposes movement, risk, and the next decision.",
    practiceHref: "/resources/tools/weekly-team-doing",
  },
  {
    id: "outcomes",
    label: "Outcomes",
    description: "Measure whether the work created value.",
    explanation: "Leaders test whether execution created measurable value for customers, team members, and profitability.",
    makesVisible: ["Customer impact", "Team-member impact", "Profitability impact"],
    shift: "Activity is judged by business impact, not completion alone.",
    practiceLabel: "Three Pillars Decision Filter",
    practice: "Test the result across customer, team, and profitability outcomes.",
    practiceHref: "/resources/tools/three-pillars-decision-filter",
  },
] as const satisfies ReadonlyArray<{
  id: SystemNodeId;
  label: string;
  description: string;
  explanation: string;
  makesVisible: readonly [string, string, string];
  shift: string;
  practiceLabel: string;
  practice: string;
  practiceHref: string;
}>;

export const primaryNavigation = [
  { label: "What We Solve", href: "/problems-we-solve", requiresProof: false },
  { label: "What We Do", href: "/leadership-services", requiresProof: false },
  { label: "How It Works", href: "/leadership-system", requiresProof: false },
  { label: "Results", href: "/results", requiresProof: false },
  { label: "Resources", href: "/resources", requiresProof: false },
] as const;

export const problemRouteConditions: Record<string, ProblemConditionId> = {
  "problems-we-solve/strategy-execution-gap": "strategy-drift",
  "problems-we-solve/leadership-team-alignment": "leadership-fragmentation",
  "problems-we-solve/transformation-execution": "transformation-stall",
  "problems-we-solve/project-portfolio-roi": "portfolio-overload",
  "problems-we-solve/internal-function-performance": "reactive-function",
};

export function isProblemConditionId(value: string | undefined): value is ProblemConditionId {
  return [...problemConditions, ...legacyProblemConditions].some((condition) => condition.id === value);
}

export function isProblemMode(value: string | undefined): value is ProblemMode {
  return value === "understand" || value === "work" || value === "help";
}

export function isSystemNodeId(value: string | undefined): value is SystemNodeId {
  return systemNodes.some((node) => node.id === value);
}

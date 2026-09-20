import type { ProblemCondition } from "./primary-experience";

const work = (title: string, href: string, description: string) => ({ label: "Work on it", title, href, description });
const help = (title: string, href: string) => ({ label: "Get help", title, href, description: "Explore the level of Execution Leadership your team needs." });
const understand = { label: "Understand it", title: "Read The Strategy Execution Gap", description: "Explore why agreed strategy loses momentum in everyday work.", href: "https://www.120vc.com/book-download-the-strategy-execution-gap/", external: true };

export const sitemapProblems: readonly ProblemCondition[] = [
  {
    id: "alignment", icon: "strategy-drift", label: "Leaders have different priorities",
    headline: "Your leaders are working toward different priorities.",
    preview: "Each function has its own goals. Shared initiatives slow down because teams aren't making the same trade-offs.",
    image: { src: "/images/problems/alignment-friction.jpg", alt: "Leaders work through competing views in a meeting.", width: 1800, height: 1200 },
    signals: ["Functions pursue competing goals", "Shared initiatives lose momentum", "Teams make different trade-offs"],
    cost: "Capacity goes to competing priorities while shared outcomes wait.",
    change: "Leaders agree on the outcomes and trade-offs the whole team will support.",
    response: {
      action: "We coach your leaders through competing priorities and the trade-offs each function needs to make.",
      outcome: "Teams work from one agreed set of priorities, with clear commitments across functions.",
    },
    paths: { understand, work: work("2×2 Prioritization Matrix", "/resources/tools/2x2-prioritization-matrix", "Decide what deserves attention and what can wait."), help: help("Execution Leadership Coaching", "/execution-leadership-coaching") },
  },
  {
    id: "ownership", icon: "leadership-fragmentation", label: "Important work has no clear owner",
    headline: "Important work has no clear owner.",
    preview: "People own tasks, but no one clearly owns the outcome or the decisions needed to move it forward.",
    image: { src: "/images/problems/strategy-overload.jpg", alt: "A leader handles competing requests from colleagues.", width: 1800, height: 1200 },
    signals: ["Tasks are assigned but outcomes are not", "Decisions have no clear owner", "Dependencies fall between teams"],
    cost: "Work stays open because no one can resolve the decisions and dependencies behind it.",
    change: "Name the outcome owner, decision authority, and commitments across teams.",
    response: {
      action: "We help your team name the owner of each outcome, who can make decisions, and what each team commits to deliver.",
      outcome: "People know who owns the result and where to take a decision or dependency.",
    },
    paths: { understand, work: work("Clarify ownership across teams", "/resources/guides/ownership-across-teams", "Make outcomes, decision rights, and dependencies explicit."), help: help("Execution Leadership System", "/leadership-system") },
  },
  {
    id: "decision-bottlenecks", icon: "transformation-stall", label: "Decisions wait. Deadlines slip.",
    headline: "Decisions wait. Deadlines slip.",
    preview: "The same issues return to meetings while teams wait for direction, approval, or someone to resolve a dependency.",
    image: { src: "/images/problems/transformation-fatigue.jpg", alt: "A team waits for a decision during an initiative.", width: 1800, height: 1201 },
    signals: ["The same issues return to meetings", "Approvals hold up delivery", "Dependencies stay unresolved"],
    cost: "Teams lose delivery time waiting for decisions they cannot make themselves.",
    change: "Put the options, recommendation, decision owner, and deadline in one place.",
    response: {
      action: "We work alongside your team to clarify the options, recommendation, decision owner, and deadline for blocked decisions.",
      outcome: "Teams know who needs to decide, by when, and what happens next.",
    },
    paths: { understand, work: work("1-3-1 Decision Builder", "/resources/tools/1-3-1-decision-builder", "Move from one problem through viable options to one recommendation."), help: help("Embedded Execution Leadership", "/embedded-execution-leadership#initiatives") },
  },
  {
    id: "priority-overload", icon: "portfolio-overload", label: "Everything is a priority",
    headline: "Everything is a priority. Your team is stretched thin.",
    preview: "New initiatives keep arriving without clear decisions about what should stop, wait, or receive more capacity.",
    image: { src: "/images/problems/portfolio-review.jpg", alt: "Leaders review a crowded project portfolio.", width: 1201, height: 1800 },
    signals: ["New initiatives arrive without trade-offs", "Almost nothing stops or waits", "The same people are spread too thin"],
    cost: "Too much active work leaves too little capacity to finish the priorities that matter.",
    change: "Make explicit portfolio decisions about what continues, waits, stops, or receives capacity.",
    response: {
      action: "We review the portfolio with your leaders against available capacity and decide what continues, waits, stops, or needs support.",
      outcome: "The team has a manageable set of priorities and explicit trade-offs when new work arrives.",
    },
    paths: { understand, work: work("Work Rationalization Tool", "/resources/tools/work-rationalization-tool", "Review what to continue, reshape, consolidate, delay, or stop."), help: help("Embedded Execution Leadership", "/embedded-execution-leadership#portfolios") },
  },
  {
    id: "key-person-dependency", icon: "reactive-function", label: "Everything depends on a few people",
    headline: "The same few people keep holding everything together.",
    preview: "Progress depends on constant intervention. When those people step away, decisions and delivery slow down.",
    image: { src: "/images/problems/function-overload.jpg", alt: "An overloaded leader responds to requests from several teams.", width: 1800, height: 1200 },
    signals: ["The same leaders resolve every blocker", "Teams wait for constant intervention", "Progress slows when key people step away"],
    cost: "Organizational effectiveness depends on individual availability instead of shared practices.",
    change: "Build decision rights, visible commitments, and a rhythm the team can run together.",
    response: {
      action: "We install shared decision rights, visible commitments, and regular progress reviews your team can run together.",
      outcome: "Routine decisions and follow-through have a clear process beyond asking the same few people.",
    },
    paths: { understand, work: work("Weekly Team Doing", "/resources/tools/weekly-team-doing", "Make commitments visible in a shared weekly operating rhythm."), help: help("Execution Leadership System", "/leadership-system") },
  },
];

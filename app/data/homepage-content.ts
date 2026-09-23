/** Homepage Build Brief v6 / Sections and Copy CSV. Proposed URLs are mapped
 * to populated routes; supplied keyword volumes are not verified public claims. */
export const homepage = {
  seoTitle: "Strategy Execution for Enterprise Teams",
  seoDescription: "Strengthen strategy execution with 120VC. Align your leaders, deliver critical initiatives, and build the capability to sustain business results.",
  hero: {
    eyebrow: "Execution Leadership for Enterprise Teams",
    title: "Strategy execution that delivers on your commitments.",
    paragraphs: ["120VC works alongside enterprise leaders to deliver the initiatives they’ve committed to.", "We align teams, make ownership clear, and keep critical work moving toward the business results you need."],
  },
  problem: {
    title: "Close the strategy execution gap between plans and results.",
    description: "Your teams are busy, but critical initiatives are not moving. Priorities compete and decisions wait. That distance between what leaders commit to and what teams deliver is the strategy execution gap.",
    cards: [
      { title: "Organizational alignment: get leaders working toward the same goals.", description: "When leaders pull in different directions, teams lose time. Agree on which goals come first and what each team will deliver.", action: "Align competing priorities", href: "/problems-we-solve?condition=alignment#problem-alignment", icon: "intent" },
      { title: "Leadership accountability: know who owns each result.", description: "Important work has no clear owner. Give every critical outcome a named owner and a clear next step.", action: "Clarify ownership", href: "/problems-we-solve?condition=ownership#problem-ownership", icon: "commitments" },
      { title: "Decision rights: make it clear who can decide.", description: "Decisions wait and deadlines slip. Agree on who decides and when to escalate so teams can act without sending every issue to the top.", action: "Move decisions forward", href: "/problems-we-solve?condition=decision-bottlenecks#problem-decision-bottlenecks", icon: "decisions" },
      { title: "Too many priorities? Choose what moves forward.", description: "Your team is spread thin. Decide what to move forward, pause, or stop so capacity goes to the work that matters.", action: "Focus the work", href: "/problems-we-solve?condition=priority-overload#problem-priority-overload", icon: "priorities" },
    ],
  },
  fourTs: {
    title: "New tools, skills, or people still need clear direction.",
    description: "Technology, talent, training, and transformation can each address a real need. Results also depend on leaders agreeing on priorities, who owns the work, and how decisions get made.",
    cards: [
      { title: "Technology", description: "Turn new tools into useful change by agreeing on the outcome, how work changes, and who owns adoption.", icon: "execution" },
      { title: "Training", description: "Turn new skills into better decisions and follow-through by applying them to the work your team owns.", icon: "decisions" },
      { title: "Talent", description: "Put added capacity toward the right outcomes, with clear priorities, decision rights, and ownership.", icon: "commitments" },
      { title: "Transformation", description: "Turn a new direction into business results through coordinated decisions and delivery across teams.", icon: "outcomes" },
    ],
  },
  why: {
    title: "Strategy implementation with leaders who work alongside you.",
    paragraphs: ["120VC is an Execution Leadership firm. We work alongside your leaders to agree on priorities, resolve decisions that block progress, and deliver critical initiatives.", "We also strengthen your execution systems: how teams assign work, review progress, and follow through."],
  },
  system: {
    title: "A leadership system for disciplined execution.",
    paragraphs: ["The Execution Leadership System is an operating model that makes clear who owns each result, what happens next, and when progress gets reviewed.", "Teams establish a shared operating rhythm: regular conversations to resolve roadblocks and keep commitments on track."],
    outcomes: [{ title: "Clear owners", icon: "commitments" }, { title: "Timely decisions", icon: "decisions" }, { title: "Risks caught early", icon: "outcomes" }],
  },
  offers: {
    title: "Choose the level of Execution Leadership your team needs.",
    description: "Coach your leaders, put the system into practice, or bring leaders into the work to deliver a critical initiative.",
    cards: [
      { title: "Execution Leadership Coaching", description: "Executive team coaching helps your leaders agree on priorities, make decisions, and follow through. We coach your team; your leaders own delivery.", action: "Explore Execution Leadership Coaching", href: "/execution-leadership-coaching" },
      { title: "Execution Leadership System", description: "Make delivery more consistent across teams. The Executive Leadership Performance Accelerator (ELPA) installs the system through your actual work, with shared priorities, clear owners, and regular progress reviews.", action: "Explore the Execution Leadership System", href: "/leadership-system", secondary: { action: "See how ELPA installs the system", href: "/executive-leadership-coaching-and-development-performance-accelerator" } },
      { title: "Embedded Execution Leadership", description: "Bring leaders into your team to deliver critical work. We lead project portfolio management and enterprise transformation engagements, resolve roadblocks, and coordinate the teams needed to deliver.", action: "Explore Embedded Execution Leadership", href: "/embedded-execution-leadership" },
    ],
  },
  roles: {
    title: "Execution Leadership for the outcomes you own.",
    description: "Find the execution challenges that match your role.",
    items: [
      { title: "COO", description: "Align cross-functional priorities and keep critical work moving.", href: "/for-the-chief-operating-officer" },
      { title: "CFO", description: "Connect initiative investment to clear ownership and delivered outcomes.", href: "/for-the-chief-financial-officer" },
      { title: "CIO and CTO", description: "Move technology initiatives forward across business and IT teams.", href: "/for-the-chief-technology-and-chief-information-officer" },
      { title: "Transformation leader", description: "Turn transformation commitments into coordinated action.", href: "/for-the-chief-transformation-officer" },
      { title: "Division president and VP", description: "Align your team’s priorities with the outcomes your division must deliver.", href: "/for-the-vp-and-division-presidents" },
    ],
  },
  resources: {
    title: "A strategy execution framework you can put to work.",
    description: "Find practical frameworks, guides, and insights to improve how your team sets priorities, makes decisions, and follows through.",
    items: [
      { title: "Frameworks", description: "Tools for setting priorities, making decisions, and clarifying ownership.", action: "Explore frameworks", href: "/resources?category=frameworks#resource-library" },
      { title: "Guides", description: "Practical steps for applying execution practices with your team.", action: "Explore guides", href: "/resources?category=guides#resource-library" },
      { title: "Insights", description: "Perspectives on the leadership decisions that shape delivery.", action: "Read insights", href: "/resources?category=insights#resource-library" },
    ],
  },
  close: { title: "What outcome are you accountable for?", description: "Tell us what you need to deliver and what’s getting in the way. We’ll discuss how Execution Leadership can help your team move forward." },
} as const;

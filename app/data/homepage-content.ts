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
    description: "Your teams are busy, but critical initiatives are not moving. Start with the priority, decision, or ownership agreement that is missing.",
    cards: [
      { title: "Organizational alignment: get leaders working toward the same goals.", description: "Leaders pull in different directions. Agree which goals come first and what each team will deliver.", action: "Align competing priorities", href: "/problems-we-solve?condition=alignment#problem-alignment", icon: "intent" },
      { title: "Leadership accountability: know who owns each result.", description: "Important work has no clear owner. Give every critical outcome a named owner and a clear next step.", action: "Clarify ownership", href: "/problems-we-solve?condition=ownership#problem-ownership", icon: "commitments" },
      { title: "Decision rights: make it clear who can decide.", description: "Decisions wait and deadlines slip. Agree who decides and when to escalate so teams can act.", action: "Move decisions forward", href: "/problems-we-solve?condition=decision-bottlenecks#problem-decision-bottlenecks", icon: "decisions" },
      { title: "Too many priorities? Choose what moves forward.", description: "Your team is spread thin. Choose what moves forward, pauses, or stops—and put capacity behind it.", action: "Focus the work", href: "/problems-we-solve?condition=priority-overload#problem-priority-overload", icon: "priorities" },
    ],
  },
  fourTs: {
    title: "New tools, skills, or people still need clear direction.",
    description: "Technology, talent, training, and transformation can address real needs. Leadership practices turn those investments into changes in how work gets done.",
    cards: [
      { title: "Technology", description: "Agree how work will change and who owns adoption—not just which tool to buy.", icon: "execution" },
      { title: "Training", description: "Apply new skills to the decisions and commitments your team owns.", icon: "decisions" },
      { title: "Talent", description: "Give added capacity clear priorities and the authority to act.", icon: "commitments" },
      { title: "Transformation", description: "Make the new direction part of everyday decisions and delivery.", icon: "outcomes" },
    ],
  },
  why: {
    title: "Strategy implementation with leaders who work alongside you.",
    paragraphs: ["120VC is an Execution Leadership firm. We work on your team's current initiatives—not a separate theory exercise. Coach your leaders, install the system with them, or bring experienced execution leaders into the work."],
  },
  system: {
    title: "A leadership system for disciplined execution.",
    paragraphs: ["One shared operating model: clear owners, timely decisions, and an operating rhythm that catches risks early."],
  },
  offers: {
    title: "Choose the level of Execution Leadership your team needs.",
    description: "Coach your leaders, put the system into practice, or bring leaders into the work to deliver a critical initiative.",
    cards: [
      { title: "Execution Leadership Coaching", description: "Executive team coaching in your current work. Your leaders own delivery; we coach how they decide and follow through.", action: "Explore Execution Leadership Coaching", href: "/execution-leadership-coaching" },
      { title: "Execution Leadership System", description: "Make delivery more consistent across teams. The Executive Leadership Performance Accelerator (ELPA) installs the system through your actual work.", action: "Explore the Execution Leadership System", href: "/leadership-system", secondary: { action: "See how ELPA installs the system", href: "/executive-leadership-coaching-and-development-performance-accelerator" } },
      { title: "Embedded Execution Leadership", description: "Bring leaders into your team to deliver critical work. We lead project portfolio management and enterprise transformation alongside your team.", action: "Explore Embedded Execution Leadership", href: "/embedded-execution-leadership" },
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
    title: "Find the decision holding delivery back.",
    description: "Answer six questions about one priority. Get a working brief for your next leadership meeting.",
    items: [
      { title: "Frameworks", description: "Tools for setting priorities, making decisions, and clarifying ownership.", action: "Explore frameworks", href: "/resources?category=frameworks#resource-library" },
      { title: "Guides", description: "Practical steps for applying execution practices with your team.", action: "Explore guides", href: "/resources?category=guides#resource-library" },
      { title: "Insights", description: "Perspectives on the leadership decisions that shape delivery.", action: "Read insights", href: "/resources?category=insights#resource-library" },
    ],
  },
  close: { title: "What outcome are you accountable for?", description: "Tell us what you need to deliver and what’s getting in the way. We’ll discuss how Execution Leadership can help your team move forward." },
} as const;

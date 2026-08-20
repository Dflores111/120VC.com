export type PageLink = {
  title: string;
  description: string;
  href: string;
  label?: string;
};

export type PageSection = {
  eyebrow?: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  cards?: PageLink[];
  statement?: string;
};

export type SitePage = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
  heroImage?: { src: string; alt: string; width: number; height: number };
  facts?: Array<{ label: string; value: string }>;
  sections: PageSection[];
  related?: PageLink[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

const consultation = { label: "Book a leadership system consultation", href: "/contact" };

const problems: PageLink[] = [
  {
    title: "Strategy is not becoming execution",
    description: "The direction is clear at the top, but priorities, decisions, and daily work do not stay aligned.",
    href: "/problems-we-solve/strategy-execution-gap",
  },
  {
    title: "The leadership team is not operating as one",
    description: "Capable executives optimize their functions while shared commitments and enterprise decisions drift.",
    href: "/problems-we-solve/leadership-team-alignment",
  },
  {
    title: "Transformation is not becoming normal work",
    description: "The program is active, but adoption, leadership behavior, and measurable operating change are not holding.",
    href: "/problems-we-solve/transformation-execution",
  },
  {
    title: "The portfolio is busy but return is unclear",
    description: "Projects are reported, yet leaders cannot confidently fund, stop, reshape, or accelerate the right work.",
    href: "/problems-we-solve/project-portfolio-roi",
  },
  {
    title: "An internal function cannot prove its value",
    description: "HR, IT, Finance, or PMO is trapped in reactive demand and cannot connect activity to business outcomes.",
    href: "/problems-we-solve/internal-function-performance",
  },
];

const solutions: PageLink[] = [
  {
    title: "Executive Leadership Performance Accelerator",
    description: "Install the full system with an accountable executive and the direct-report team around live work.",
    href: "/executive-leadership-coaching-and-development-performance-accelerator",
    label: "ELPA",
  },
  {
    title: "Leadership Team Transformation",
    description: "Help a senior team prioritize, decide, commit, challenge, and execute as one enterprise leadership unit.",
    href: "/transformation-leadership-team-development-coaching-and-program",
  },
  {
    title: "Enterprise Transformation",
    description: "Turn HR, IT, Finance, PMO, or another internal function into a measurable business-performance partner.",
    href: "/enterprise-digital-transformation",
  },
  {
    title: "Project Portfolio Services",
    description: "Treat projects as investments through portfolio rationalization, governance, embedded leadership, and visibility.",
    href: "/roi-driven-project-portfolio-services",
  },
];

const roles: PageLink[] = [
  {
    title: "Chief Operating Officer",
    description: "Turn strategy into coordinated execution across functions without becoming the only integration system.",
    href: "/for-the-chief-operating-officer",
  },
  {
    title: "Chief Financial Officer",
    description: "Turn capital allocation into an execution discipline and make continued investment decisions visible.",
    href: "/for-the-chief-financial-officer",
  },
  {
    title: "CIO or CTO",
    description: "Connect technology delivery to adoption, business behavior, and measurable enterprise value.",
    href: "/for-the-chief-technology-and-chief-information-officer",
  },
  {
    title: "Chief Transformation Officer",
    description: "Make change become the way leadership and teams actually operate after the launch.",
    href: "/for-the-chief-transformation-officer",
  },
  {
    title: "Division President or VP",
    description: "Move the P&L through dependencies and shared commitments your teams can realistically execute.",
    href: "/for-the-vp-and-division-presidents",
  },
];

export const pages: Record<string, SitePage> = {
  "problems-we-solve": {
    slug: "problems-we-solve",
    eyebrow: "Problems we solve",
    title: "Start with what is happening—not our category name.",
    description: "Five recognizable execution conditions route enterprise leaders to the right 120VC response.",
    intro: "Most buyers do not begin by searching for Execution Leadership. They begin with a strategy that is stalling, a team that is fragmenting, a transformation that is not sticking, a portfolio that is underperforming, or a function that cannot prove value.",
    seoTitle: "Enterprise Strategy Execution Problems",
    seoDescription: "Diagnose strategy execution gaps, leadership team misalignment, transformation fatigue, portfolio underperformance, and internal-function value problems.",
    sections: [
      {
        eyebrow: "Choose the condition",
        title: "Which pattern looks most like your organization?",
        cards: problems,
      },
      {
        eyebrow: "The shared root",
        title: "Different symptoms can come from the same missing system.",
        paragraphs: [
          "Across these conditions, teams often lack one shared way to establish priorities, make tradeoffs, hold decisions, own commitments, surface risk, and connect activity to outcomes.",
          "120VC diagnoses the condition before recommending a scope. The goal is not to force every buyer into the same program. It is to identify which part of the execution system must change.",
        ],
        statement: "Clarity first. Category second. The 120 standard third.",
      },
    ],
    related: solutions,
    primaryCta: consultation,
    secondaryCta: { label: "See the Execution Leadership System", href: "/leadership-system" },
  },

  "problems-we-solve/strategy-execution-gap": {
    slug: "problems-we-solve/strategy-execution-gap",
    eyebrow: "The Strategy Execution Gap",
    title: "Your strategy is clear. Execution keeps changing what it means.",
    description: "Close the distance between executive intent and the priorities, decisions, commitments, and work required to deliver it.",
    intro: "The executive team agrees on direction. Then functions interpret it differently, current work consumes capacity, decisions reopen, and the strategy becomes one more demand competing for attention.",
    seoTitle: "Close the Strategy Execution Gap",
    seoDescription: "Learn why strategy implementation fails after the executive decision and how a shared execution leadership system closes the gap.",
    facts: [
      { label: "Visible symptom", value: "Strategy is approved but not changing daily work" },
      { label: "Business consequence", value: "Delay, rework, escalation, and diluted return" },
      { label: "First useful signal", value: "Priorities and tradeoffs become explicit" },
      { label: "Best next step", value: "Leadership System Consultation" },
    ],
    sections: [
      {
        eyebrow: "What is usually happening",
        title: "The breakdown occurs after agreement.",
        bullets: [
          "Functions translate the same strategy into competing plans.",
          "New requests enter without old commitments leaving.",
          "Meetings report status without producing tradeoffs.",
          "Authority is unclear across dependencies.",
          "Leaders personally rescue work the operating system should carry.",
        ],
      },
      {
        eyebrow: "Why familiar fixes stall",
        title: "Technology, training, talent, and transformation cannot compensate for missing execution rules.",
        paragraphs: [
          "Dashboards can make drift visible. Training can create knowledge. Talent can add capability. Transformation can create urgency. None of them decides what matters, which work stops, who owns the commitment, or how a decision will hold under pressure.",
          "Those investments perform better when a leadership system connects them to the work.",
        ],
      },
      {
        eyebrow: "What changes",
        title: "Intent becomes a sequence the organization can execute.",
        bullets: [
          "Define the business condition and outcome.",
          "Translate intent into explicit priorities.",
          "Make tradeoffs before capacity breaks.",
          "Clarify authority and visible commitments.",
          "Run a rhythm that surfaces reality early.",
          "Measure operating shifts and business outcomes.",
        ],
      },
    ],
    related: [solutions[0], solutions[1], { title: "The Execution Leadership System", description: "See the shared operating system installed inside live work.", href: "/leadership-system" }],
    primaryCta: consultation,
    secondaryCta: { label: "Explore the system", href: "/leadership-system" },
  },

  "problems-we-solve/leadership-team-alignment": {
    slug: "problems-we-solve/leadership-team-alignment",
    eyebrow: "Leadership team alignment",
    title: "Strong executives do not automatically become one leadership team.",
    description: "Create shared priorities, decisions, commitments, and accountability across leaders who currently optimize different parts of the enterprise.",
    intro: "The team may be experienced, intelligent, and committed. Yet functional incentives, unresolved tension, unclear enterprise priorities, and different operating habits keep those leaders from executing as one unit.",
    seoTitle: "Executive Leadership Team Alignment",
    seoDescription: "Help senior executives align priorities, make decisions, own shared commitments, and execute as one leadership team.",
    facts: [
      { label: "Visible symptom", value: "Agreement in the room, fragmentation after it" },
      { label: "Business consequence", value: "Slow decisions and unreliable cross-functional delivery" },
      { label: "First useful signal", value: "A shared commitment holds outside the meeting" },
      { label: "Relevant scope", value: "Leadership Team Transformation" },
    ],
    sections: [
      {
        title: "The calendar reveals the operating system.",
        bullets: [
          "The same issues return without a final decision.",
          "Functional updates displace enterprise tradeoffs.",
          "Conflict moves offline instead of becoming productive challenge.",
          "The CEO or COO integrates work the team should own together.",
          "Commitments sound clear but are interpreted differently afterward.",
        ],
      },
      {
        title: "Alignment is not harmony. It is coordinated commitment.",
        paragraphs: [
          "A leadership team can disagree honestly and still leave with one decision, one set of commitments, and visible ownership. The objective is not less tension. It is tension used to improve the decision before execution begins.",
        ],
        statement: "The leadership team becomes the operating system—not a collection of senior functions.",
      },
    ],
    related: [solutions[1], solutions[0]],
    primaryCta: consultation,
    secondaryCta: { label: "Explore team transformation", href: solutions[1].href },
  },

  "problems-we-solve/transformation-execution": {
    slug: "problems-we-solve/transformation-execution",
    eyebrow: "Transformation execution",
    title: "The transformation is active. The operating condition is not changing.",
    description: "Make change part of leadership priorities, resource decisions, commitments, adoption ownership, and normal execution rhythm.",
    intro: "Transformation theater appears when the program looks healthy while the organization continues to prioritize, decide, and work the old way.",
    seoTitle: "Enterprise Transformation Execution",
    seoDescription: "Turn transformation activity into durable operating change through executive ownership, adoption, and a shared execution system.",
    facts: [
      { label: "Visible symptom", value: "Green reporting with weak operating change" },
      { label: "Business consequence", value: "Fatigue, adoption drag, and unrealized benefits" },
      { label: "First useful signal", value: "Leadership changes a priority or resource decision" },
      { label: "Relevant scope", value: "Enterprise Transformation" },
    ],
    sections: [
      {
        title: "Transformation fails when it remains a separate program.",
        bullets: [
          "Sponsors support the idea without changing operating behavior.",
          "Existing work repeatedly displaces transformation priorities.",
          "Functions adopt at different speeds with no shared consequence.",
          "Teams comply with deliverables without changing how work happens.",
          "Momentum depends on the transformation office continuing to push.",
        ],
      },
      {
        title: "The new condition must become normal leadership behavior.",
        paragraphs: [
          "120VC connects transformation intent to tradeoffs, work rationalization, adoption ownership, cross-functional dependencies, execution rhythm, and outcome measurement. The transformation becomes how leadership operates—not an initiative leadership occasionally reviews.",
        ],
      },
    ],
    related: [solutions[2], solutions[1]],
    primaryCta: consultation,
    secondaryCta: { label: "Explore Enterprise Transformation", href: solutions[2].href },
  },

  "problems-we-solve/project-portfolio-roi": {
    slug: "problems-we-solve/project-portfolio-roi",
    eyebrow: "Project portfolio ROI",
    title: "Your portfolio can be well reported and poorly invested.",
    description: "Move beyond project status to decide which initiatives deserve time, talent, attention, and capital.",
    intro: "Most organizations can report schedule, budget, milestones, and risk. Fewer can show which work should exist, which investments should stop, or how the portfolio improves customer, team, and financial outcomes.",
    seoTitle: "Improve Project Portfolio ROI",
    seoDescription: "Rationalize initiatives, improve PMO investment discipline, and make funding, capacity, and portfolio ROI decisions visible.",
    facts: [
      { label: "Visible symptom", value: "Too many initiatives and weak return logic" },
      { label: "Business consequence", value: "Capacity fragmentation and continued funding of weak work" },
      { label: "First useful signal", value: "A project is challenged, reshaped, or stopped" },
      { label: "Front door", value: "Portfolio ROI Audit" },
    ],
    sections: [
      {
        title: "The strongest pain is portfolio waste—not a lack of project management.",
        bullets: [
          "Duplicative initiatives consume the same scarce capability.",
          "Business cases are approved and rarely revisited.",
          "Politically protected work remains funded.",
          "Governance reports activity instead of making investment decisions.",
          "Executives cannot see the tradeoff required to protect the highest-value work.",
        ],
      },
      {
        title: "Projects become investments that must earn continued support.",
        paragraphs: [
          "The Portfolio ROI Audit examines investment logic, duplication, capacity, governance, visibility, and the execution condition. The first value is decision clarity—not a guaranteed financial recovery claim.",
        ],
      },
    ],
    related: [solutions[3], { title: "Project Leadership Managed Services", description: "Place experienced execution leaders inside critical work.", href: "/project-leadership-managed-services" }],
    primaryCta: { label: "Request a Portfolio ROI Audit", href: "/contact?condition=portfolio" },
    secondaryCta: { label: "Explore Portfolio Services", href: solutions[3].href },
  },

  "problems-we-solve/internal-function-performance": {
    slug: "problems-we-solve/internal-function-performance",
    eyebrow: "Internal function performance",
    title: "Necessary work is not the same as visible business value.",
    description: "Help HR, IT, Finance, PMO, and shared services move from reactive demand to measurable internal business partnership.",
    intro: "Internal functions become trapped when demand arrives as instructions, activity substitutes for outcomes, and leaders cannot show how the work improves the customer, the team, or financial performance.",
    seoTitle: "Transform Internal Functions Into Business Partners",
    seoDescription: "Help HR, IT, Finance, PMO, and shared services prove value, rationalize demand, and improve business outcomes.",
    facts: [
      { label: "Visible symptom", value: "Reactive demand and weak outcome ownership" },
      { label: "Business consequence", value: "Low trust, overload, and cost-center treatment" },
      { label: "First useful signal", value: "The function recommends a better decision" },
      { label: "Relevant scope", value: "Enterprise Transformation" },
    ],
    sections: [
      {
        title: "The function does not need a new slogan. It needs a different operating condition.",
        bullets: [
          "Requests are evaluated against business outcomes.",
          "Leaders make recommendations instead of forwarding demand.",
          "Resource tradeoffs and hidden commitments become visible.",
          "Internal customers receive clearer expectations.",
          "Value is measured across customer, team, and financial outcomes.",
        ],
      },
      {
        title: "Technology can support the change. It cannot lead it.",
        paragraphs: [
          "This is not generic digital transformation, cost reduction, process mapping, or software implementation. The work changes how leaders frame demand, decide what should be done, and own the business result.",
        ],
      },
    ],
    related: [solutions[2], solutions[3]],
    primaryCta: consultation,
    secondaryCta: { label: "Explore Enterprise Transformation", href: solutions[2].href },
  },

  "leadership-services": {
    slug: "leadership-services",
    eyebrow: "Solutions",
    title: "One execution system. Four ways to install it where the work is breaking.",
    description: "Choose a 120VC scope by execution condition, leadership unit, and work—not by a list of loosely related services.",
    intro: "Every 120VC solution uses the same core Execution Leadership System. The scope changes based on who must lead differently, which work carries the risk, and what operating condition must change.",
    seoTitle: "Execution Leadership Solutions",
    seoDescription: "Compare ELPA, Leadership Team Transformation, Enterprise Transformation, and ROI-Driven Project Portfolio Services.",
    sections: [
      { eyebrow: "Choose by condition", title: "Where does the system need to be installed?", cards: solutions },
      {
        title: "The consultation routes the condition before it recommends an offer.",
        paragraphs: [
          "We examine the outcome at risk, the leadership authority involved, the team that must participate, the current execution condition, and the practical scope required for change to hold.",
        ],
        statement: "The objective is the right installation—not automatic enrollment.",
      },
    ],
    related: problems,
    primaryCta: consultation,
    secondaryCta: { label: "How the system works", href: "/leadership-system" },
  },

  "leadership-system": {
    slug: "leadership-system",
    eyebrow: "The Execution Leadership System",
    title: "Install the system that carries strategy after the meeting ends.",
    description: "One shared way to turn leadership intent into priorities, decisions, commitments, execution rhythm, and measurable outcomes.",
    intro: "120VC does not ask leaders to remember a model after training. We install a practical leadership operating system inside the priorities and initiatives already under pressure.",
    seoTitle: "The 120VC Execution Leadership System",
    seoDescription: "See how 120VC installs a leadership operating system for priorities, decisions, accountability, execution rhythm, and measurable outcomes.",
    facts: [
      { label: "Installed in", value: "Current priorities, initiatives, meetings, and decisions" },
      { label: "Requires", value: "An accountable executive sponsor and relevant team" },
      { label: "First value", value: "An observable operating shift" },
      { label: "Measures", value: "Customer, team, and financial outcomes" },
    ],
    sections: [
      {
        eyebrow: "What it governs",
        title: "The system connects the decisions that strategy depends on.",
        bullets: [
          "Intent: the condition and outcome leadership is trying to create.",
          "Priorities: which work deserves capacity now—and which does not.",
          "Decisions: who recommends, who decides, and when the decision is closed.",
          "Commitments: visible owners, dates, dependencies, and success conditions.",
          "Rhythm: how reality surfaces early enough to change the outcome.",
          "Development: leaders improve through real decisions and work pressure.",
          "Measurement: operating shifts connect to customer, team, and financial value.",
        ],
      },
      {
        eyebrow: "The installation path",
        title: "Diagnose. Install. Compound.",
        cards: [
          { title: "01 — Diagnose the condition", description: "Clarify the outcome at risk, what is happening now, the leadership authority involved, and the work carrying the pressure.", href: "/contact" },
          { title: "02 — Install inside live work", description: "Apply shared practices to current priorities, decisions, dependencies, commitments, meetings, and outcomes.", href: "/leadership-services" },
          { title: "03 — Transfer ownership", description: "Build the operating rhythm and leadership capability required for the system to become less dependent on 120VC.", href: "/case-studies" },
        ],
      },
      {
        eyebrow: "First value",
        title: "Look for a visible change in how the work operates.",
        bullets: [
          "A priority becomes explicit.",
          "Conflicting work is stopped.",
          "A decision holds.",
          "Ownership becomes visible.",
          "A risk surfaces earlier.",
          "An escalation is avoided.",
          "The execution rhythm begins to hold.",
        ],
        statement: "A financial result may take longer. The operating system should begin changing before the final outcome arrives.",
      },
      {
        eyebrow: "The Three Pillars",
        title: "Performance should improve without creating a hidden failure somewhere else.",
        paragraphs: [
          "Every meaningful decision should improve Customer Satisfaction, Team Member Satisfaction, or Profitability—and should not improve one by unnecessarily damaging the other two.",
        ],
      },
    ],
    related: solutions,
    primaryCta: consultation,
    secondaryCta: { label: "Compare solution scopes", href: "/leadership-services" },
  },

  "executive-leadership-coaching-and-development-performance-accelerator": {
    slug: "executive-leadership-coaching-and-development-performance-accelerator",
    eyebrow: "Executive Leadership Performance Accelerator",
    title: "Build execution leaders by changing how live work gets led.",
    description: "ELPA installs the full Execution Leadership System with an accountable executive and the relevant direct-report team.",
    intro: "Leadership development fails when insight is separated from operating pressure. ELPA turns current priorities, decisions, dependencies, commitments, and outcomes into the environment where leadership capability is built.",
    seoTitle: "Executive Leadership Performance Accelerator",
    seoDescription: "Install an enterprise execution leadership system with an accountable executive and team through live-work leadership development.",
    facts: [
      { label: "Designed for", value: "An accountable executive and relevant direct-report team" },
      { label: "Applied to", value: "Live priorities, initiatives, decisions, and outcomes" },
      { label: "Delivery", value: "System installation, team application, coaching, and operating rhythm" },
      { label: "Timing", value: "Confirmed after diagnosis; no fixed public duration assumed" },
    ],
    sections: [
      {
        title: "This is not a course leaders complete beside the work.",
        paragraphs: [
          "The team applies shared practices to the business condition already demanding executive attention. That makes progress visible in decisions and work—not only in individual reflection.",
        ],
        bullets: [
          "Prioritize against a shared outcome.",
          "Make recommendations and decisions with clear authority.",
          "Create visible commitments and ownership.",
          "Expose dependencies and risk earlier.",
          "Coach through the work while the stakes are real.",
          "Establish an execution rhythm the team can continue to own.",
        ],
      },
      {
        title: "Active sponsorship is a requirement—not a ceremonial role.",
        paragraphs: [
          "The accountable executive cannot delegate their own leadership responsibility and expect the system to become executive-owned. Participation, access, real work, and willingness to change current operating behavior determine fit.",
        ],
      },
      {
        title: "Choose ELPA when the organization needs the full system around a leadership unit and its work.",
        paragraphs: [
          "Choose Leadership Team Transformation when the primary need is how the senior team operates together. Choose Enterprise Transformation when an internal function must change its business role. Choose Portfolio Services when portfolio investment and execution are the main condition.",
        ],
      },
    ],
    related: [{ title: "Leadership Team Transformation", description: "Focus the system on the senior team’s shared operation.", href: solutions[1].href }, { title: "How the system works", description: "See the practices and installation path behind ELPA.", href: "/leadership-system" }],
    primaryCta: consultation,
    secondaryCta: { label: "See the system", href: "/leadership-system" },
  },

  "transformation-leadership-team-development-coaching-and-program": {
    slug: "transformation-leadership-team-development-coaching-and-program",
    eyebrow: "Leadership Team Transformation",
    title: "Turn a room of strong executives into one team that can execute.",
    description: "Install shared priorities, decision rules, commitments, challenge, accountability, and execution rhythm across the senior team.",
    intro: "A leadership team is not aligned because its members respect one another or agree in the meeting. It is aligned when the decision holds, enterprise priorities outrank functional convenience, and shared commitments survive pressure.",
    seoTitle: "Leadership Team Transformation",
    seoDescription: "Transform senior executive team alignment, decision quality, accountability, and cross-functional execution through live work.",
    facts: [
      { label: "Designed for", value: "Executive and senior leadership teams" },
      { label: "Best used when", value: "Functional strength is not producing enterprise coordination" },
      { label: "Primary change", value: "The team operates as one leadership unit" },
      { label: "Timing", value: "Scoped after diagnosis" },
    ],
    sections: [
      {
        title: "The team changes how it works—not only how it relates.",
        bullets: [
          "Enterprise priorities become explicit.",
          "Decision authority and recommendations become clearer.",
          "Disagreement becomes productive challenge before commitment.",
          "Dependencies surface earlier.",
          "Commitments are visible across functions.",
          "Meetings produce decisions and movement instead of reporting theater.",
        ],
      },
      {
        title: "The current business becomes the case study.",
        paragraphs: [
          "Rather than using hypothetical scenarios, 120VC helps the team apply the system to the priorities, tradeoffs, decisions, and cross-functional work already defining performance.",
        ],
        statement: "The goal is not a better offsite. It is a team that operates differently after the offsite is over.",
      },
    ],
    related: [solutions[0], { title: "COO execution leadership", description: "See how the condition appears from the COO seat.", href: roles[0].href }],
    primaryCta: consultation,
    secondaryCta: { label: "See the Executive Team condition", href: "/problems-we-solve/leadership-team-alignment" },
  },

  "enterprise-digital-transformation": {
    slug: "enterprise-digital-transformation",
    eyebrow: "Enterprise Transformation",
    title: "Turn internal functions into measurable business-performance partners.",
    description: "Change how HR, IT, Finance, PMO, and shared services evaluate demand, make recommendations, own commitments, and prove value.",
    intro: "An internal function becomes strategic when it helps the enterprise make better investments and produce better outcomes—not when it changes its language, tools, or reporting alone.",
    seoTitle: "Enterprise and Internal Function Transformation",
    seoDescription: "Transform HR, IT, Finance, PMO, or shared services into accountable business-performance partners with measurable outcomes.",
    facts: [
      { label: "Designed for", value: "HR, IT, Finance, PMO, and shared-service leaders" },
      { label: "Best used when", value: "The function is reactive or cannot demonstrate value" },
      { label: "Primary change", value: "From order taker to internal investment partner" },
      { label: "Measurement", value: "Customer, team, and financial outcomes" },
    ],
    sections: [
      {
        title: "The work begins by making the current value condition visible.",
        bullets: [
          "What demand enters the function and how is it evaluated?",
          "Which work is necessary, duplicative, low-value, or politically protected?",
          "Where are resources committed without clear outcomes?",
          "How are recommendations, tradeoffs, and expectations communicated?",
          "What would improved customer, team, and financial performance look like?",
        ],
      },
      {
        title: "This is operating transformation—not a technology modernization project.",
        paragraphs: [
          "Tools may support visibility. Process changes may remove friction. Coaching may build capability. The core work changes the leadership system that decides what the function should do, how it should operate, and how it will prove value.",
        ],
      },
    ],
    related: [{ title: "Internal Function Performance", description: "Diagnose the recognizable buyer condition first.", href: "/problems-we-solve/internal-function-performance" }, solutions[3]],
    primaryCta: consultation,
    secondaryCta: { label: "Diagnose the condition", href: "/problems-we-solve/internal-function-performance" },
  },

  "roi-driven-project-portfolio-services": {
    slug: "roi-driven-project-portfolio-services",
    eyebrow: "ROI-Driven Project Portfolio Services",
    title: "Stop funding activity. Run the portfolio for return.",
    description: "Combine portfolio rationalization, investment discipline, embedded leadership, governance, and decision-ready visibility.",
    intro: "Traditional PMOs manage projects. Enterprise leaders must manage investment—deciding which initiatives deserve time, talent, attention, and capital, and which should stop, change, consolidate, wait, or accelerate.",
    seoTitle: "Project Portfolio Management and PMO Transformation",
    seoDescription: "Improve portfolio ROI through project rationalization, investment discipline, embedded execution leadership, governance, and executive visibility.",
    facts: [
      { label: "Designed for", value: "Leaders accountable for capital, transformation, and portfolio outcomes" },
      { label: "Front door", value: "Portfolio ROI Audit" },
      { label: "Primary change", value: "Projects become investments that must earn support" },
      { label: "Technology", value: "Smartsheet may support visibility; it is not the strategy" },
    ],
    sections: [
      {
        title: "Start with clearer investment reality.",
        bullets: [
          "Which initiatives lack a credible business condition or return logic?",
          "Where is work duplicative or competing for the same capability?",
          "Which commitments exceed realistic team capacity?",
          "Does governance produce decisions or mainly report activity?",
          "Which work should stop, reshape, consolidate, wait, or accelerate?",
        ],
      },
      {
        title: "Smartsheet supports the system. Leadership makes it work.",
        paragraphs: [
          "A dashboard can expose status, capacity, risk, and dependencies. It cannot decide what deserves funding, whether a business case is credible, who owns the outcome, or which tradeoff is right.",
        ],
        statement: "Technology makes the operating system visible. Leadership determines what the organization does about reality.",
      },
      {
        title: "The delivery model follows the diagnostic.",
        paragraphs: [
          "120VC may strengthen an existing PMO, co-lead portfolio execution, or provide broader portfolio leadership. The commercial model and operating scope are confirmed after the portfolio condition is understood.",
        ],
      },
    ],
    related: [{ title: "Project Leadership Managed Services", description: "Embed execution leadership inside critical initiatives.", href: "/project-leadership-managed-services" }, { title: "Smartsheet Portfolio Visibility", description: "Give leaders decision-ready portfolio information.", href: "/smartsheet-dashboards" }],
    primaryCta: { label: "Request a Portfolio ROI Audit", href: "/contact?condition=portfolio" },
    secondaryCta: { label: "See the Portfolio ROI condition", href: "/problems-we-solve/project-portfolio-roi" },
  },

  "project-leadership-managed-services": {
    slug: "project-leadership-managed-services",
    eyebrow: "Supporting portfolio capability",
    title: "Put experienced execution leadership inside the work that cannot afford to drift.",
    description: "Embedded project and program leaders establish clarity, align stakeholders, manage dependencies, and move work toward outcomes.",
    intro: "Some initiatives do not need more status reporting. They need leaders who can challenge assumptions, make commitments visible, surface reality early, and operate through the same Execution Leadership System as the broader portfolio.",
    seoTitle: "Project Leadership Managed Services",
    seoDescription: "Embed experienced project and program execution leaders inside critical enterprise initiatives and portfolios.",
    facts: [
      { label: "Position", value: "Supporting capability under Project Portfolio Services" },
      { label: "Applied to", value: "Critical projects, programs, and cross-functional initiatives" },
      { label: "Primary change", value: "From reporting activity to leading execution" },
      { label: "Scope", value: "Confirmed after portfolio or initiative diagnosis" },
    ],
    sections: [
      {
        title: "Execution leadership changes the quality of the work around the plan.",
        bullets: [
          "Clarify the business condition and measurable result.",
          "Align decision makers and stakeholders.",
          "Expose dependencies, constraints, and risk early.",
          "Make commitments and ownership visible.",
          "Challenge requests and recommend better paths.",
          "Create an operating rhythm that moves the initiative.",
        ],
      },
    ],
    related: [solutions[3], { title: "Smartsheet Portfolio Visibility", description: "Support decision-making with visible portfolio reality.", href: "/smartsheet-dashboards" }],
    primaryCta: { label: "Discuss a Project Leadership Scope", href: "/contact?condition=project" },
    secondaryCta: { label: "Explore Portfolio Services", href: solutions[3].href },
  },

  "smartsheet-dashboards": {
    slug: "smartsheet-dashboards",
    eyebrow: "Smartsheet Portfolio Visibility",
    title: "Give leaders the visibility required to make better execution decisions.",
    description: "Use Smartsheet to expose what matters now, what changed, what is at risk, and which decisions are required.",
    intro: "A dashboard should not merely show what happened. It should help leadership see the current execution condition early enough to act.",
    seoTitle: "Smartsheet Portfolio Dashboards and Visibility",
    seoDescription: "Create decision-ready Smartsheet portfolio visibility for commitments, risk, capacity, dependencies, and executive action.",
    facts: [
      { label: "Position", value: "Supporting capability under Project Portfolio Services" },
      { label: "Designed for", value: "Executives, PMOs, transformation, and portfolio leaders" },
      { label: "Primary change", value: "From status display to decision-ready visibility" },
      { label: "Guardrail", value: "The dashboard is not the leadership system" },
    ],
    sections: [
      {
        title: "The most useful view answers the next leadership question.",
        bullets: [
          "What matters now?",
          "What has changed?",
          "Which commitments are slipping?",
          "Where is capacity constrained?",
          "Which risk requires a decision?",
          "What outcome is the portfolio producing?",
        ],
      },
      {
        title: "Visibility creates the opportunity for a better decision.",
        paragraphs: [
          "It does not make the decision, establish ownership, resolve a tradeoff, or create accountability. The technology makes reality visible. The leadership system determines what happens next.",
        ],
      },
    ],
    related: [solutions[3], { title: "Project Leadership Managed Services", description: "Add experienced leadership inside work at risk.", href: "/project-leadership-managed-services" }],
    primaryCta: { label: "Discuss Portfolio Visibility", href: "/contact?condition=visibility" },
    secondaryCta: { label: "Explore Portfolio Services", href: solutions[3].href },
  },

  "case-studies": {
    slug: "case-studies",
    eyebrow: "Results and evidence",
    title: "Evaluate the results—and the evidence behind them.",
    description: "Review 120VC's published performance figures, the context they require, and the evidence an enterprise buying team should inspect.",
    intro: "120VC publishes a 98% transformation and project success rate, 227% performance improvement versus industry averages, and more than 25 years across global enterprise transformation. These are first-party figures; a sound evaluation should also inspect the population, baseline, timeframe, calculation method, attribution limits, and relevant references.",
    seoTitle: "Execution Leadership Results and Evidence",
    seoDescription: "Review how 120VC measures operating shifts, implementation evidence, enterprise outcomes, attribution, and client references.",
    facts: [
      { label: "Transformation and project success rate", value: "98%" },
      { label: "Performance improvement vs. industry averages", value: "227%" },
      { label: "Global enterprise transformation", value: "25+ years" },
      { label: "Source type", value: "120VC-published figures" },
    ],
    sections: [
      {
        eyebrow: "What 120VC publishes",
        title: "The figures are the start of the evaluation—not the end.",
        bullets: [
          "98% transformation and project success rate",
          "227% performance improvement versus industry averages",
          "More than 25 years across global enterprise transformation",
          "Enterprise experience published across named organizations and industries",
        ],
        statement: "Ask what was measured, across which population, over what period, against which baseline, and with what attribution limits.",
      },
      {
        eyebrow: "What counts as evidence",
        title: "Method, implementation, operating shifts, and outcomes answer different questions.",
        bullets: [
          "Method proof shows the coherent system being installed.",
          "Implementation proof shows roles, practices, artifacts, milestones, and operating changes.",
          "Operating proof shows priorities clarifying, decisions holding, risks surfacing earlier, and ownership becoming visible.",
          "Outcome proof connects a defined result to context, timeframe, baseline, and reasonable attribution.",
        ],
      },
      {
        eyebrow: "Claims methodology",
        title: "Every public performance claim needs a definition—not only a number.",
        bullets: [
          "Metric definition and population included",
          "Measurement period and baseline",
          "Comparison method and attribution assumptions",
          "Exceptions and qualification language",
          "Client permission and supporting source",
        ],
        statement: "A published logo shows enterprise experience. It does not, by itself, prove a specific outcome or endorsement.",
      },
    ],
    primaryCta: { label: "Request a relevant client reference", href: "/contact?request=reference" },
    secondaryCta: consultation,
  },

  "who-we-help": {
    slug: "who-we-help",
    eyebrow: "Who we help",
    title: "For leaders who own the outcome—not only the activity.",
    description: "See how the Strategy Execution Gap appears from the COO, CFO, CIO/CTO, transformation, and P&L leadership seats.",
    intro: "The visible pressure changes by role. The underlying need is consistent: a leadership system that turns enterprise intent into coordinated execution across work the leader does not control alone.",
    seoTitle: "Execution Leadership for Enterprise Executives",
    seoDescription: "See how 120VC helps COOs, CFOs, CIOs, CTOs, transformation leaders, division presidents, and VPs close the Strategy Execution Gap.",
    sections: [{ eyebrow: "Choose your seat", title: "What are you accountable for making work?", cards: roles }],
    related: problems,
    primaryCta: consultation,
    secondaryCta: { label: "Explore problems we solve", href: "/problems-we-solve" },
  },

  "for-the-chief-operating-officer": {
    slug: "for-the-chief-operating-officer",
    eyebrow: "For the Chief Operating Officer",
    title: "Turn strategy into coordinated execution across the business.",
    description: "Give the executive team one way to align priorities, make tradeoffs, resolve dependencies, and own enterprise commitments.",
    intro: "As COO, you sit where strategy, priorities, functions, resources, and execution collide. When the system is weak, that collision becomes your calendar.",
    seoTitle: "Execution Leadership for COOs",
    seoDescription: "Help COOs translate strategy into cross-functional priorities, decisions, commitments, operating rhythm, and measurable outcomes.",
    facts: [
      { label: "Common pressure", value: "You personally integrate what the operating model cannot" },
      { label: "What changes", value: "The executive team owns coordinated execution" },
      { label: "First signal", value: "A dependency moves without heroic escalation" },
      { label: "Relevant scopes", value: "Leadership Team Transformation or ELPA" },
    ],
    sections: [
      {
        title: "The organization should not depend on your calendar to stay integrated.",
        bullets: [
          "Functions execute the same strategy differently.",
          "Priorities change before work finishes.",
          "Cross-functional commitments are unreliable.",
          "Meetings describe work but do not resolve it.",
          "Transformation competes with normal operations.",
          "Growth creates complexity faster than leadership capacity grows.",
        ],
      },
      {
        title: "The goal is not to remove the COO from leadership.",
        paragraphs: [
          "It is to stop making the COO the organization’s only functioning integration system. Shared rules for priorities, authority, commitments, dependencies, and rhythm distribute execution leadership across the team.",
        ],
      },
    ],
    related: [solutions[1], solutions[0]],
    primaryCta: consultation,
    secondaryCta: { label: "See how the system works", href: "/leadership-system" },
  },

  "for-the-chief-financial-officer": {
    slug: "for-the-chief-financial-officer",
    eyebrow: "For the Chief Financial Officer",
    title: "Turn capital allocation into an execution discipline.",
    description: "Make the investment logic, execution condition, continued-funding decision, and expected business value visible.",
    intro: "The organization depends on you to decide more than whether a budget is available. It needs help determining which work deserves investment and whether expected return is appearing.",
    seoTitle: "Execution Leadership for CFOs",
    seoDescription: "Help CFOs rationalize portfolios, improve investment decisions, challenge weak work, and connect execution to business return.",
    facts: [
      { label: "Common pressure", value: "Spend is visible while return remains vague" },
      { label: "What changes", value: "Projects must earn continued support" },
      { label: "First signal", value: "A weak investment is challenged" },
      { label: "Relevant scope", value: "Project Portfolio Services" },
    ],
    sections: [
      {
        title: "Approval should not be the last time the business case is tested.",
        bullets: [
          "The portfolio contains more work than the organization can deliver.",
          "Projects remain funded because stopping them is difficult.",
          "Teams report spend and status without proving return.",
          "Transformation costs are visible while benefits remain vague.",
          "Internal functions struggle to connect activity to value.",
        ],
      },
      {
        title: "The CFO becomes an internal investment partner—not only the budget gatekeeper.",
        paragraphs: [
          "The system creates discipline around work rationalization, funding logic, commitments, executive visibility, and continued-investment decisions.",
        ],
      },
    ],
    related: [solutions[3], solutions[2]],
    primaryCta: consultation,
    secondaryCta: { label: "Explore Portfolio Services", href: solutions[3].href },
  },

  "for-the-chief-technology-and-chief-information-officer": {
    slug: "for-the-chief-technology-and-chief-information-officer",
    eyebrow: "For the CIO and CTO",
    title: "Turn technology strategy into adoption, execution, and business value.",
    description: "Connect technical delivery to cross-functional ownership, business behavior, adoption, and measurable enterprise outcomes.",
    intro: "Technology rarely creates value merely because it is delivered. The organization must make decisions, change behavior, align stakeholders, adopt the capability, and connect the investment to the condition it was funded to create.",
    seoTitle: "Execution Leadership for CIOs and CTOs",
    seoDescription: "Help CIOs and CTOs connect technology strategy and delivery to adoption, cross-functional execution, and business value.",
    facts: [
      { label: "Common pressure", value: "Technical delivery succeeds while operating adoption stalls" },
      { label: "What changes", value: "Business and technology own one outcome" },
      { label: "First signal", value: "Demand is reframed around a business condition" },
      { label: "Relevant scope", value: "Enterprise Transformation or ELPA" },
    ],
    sections: [
      {
        title: "Technology is often carrying a leadership-system problem.",
        bullets: [
          "The business asks for solutions before defining the problem.",
          "Technology priorities compete without enough rationalization.",
          "Stakeholders reopen decisions.",
          "Dependencies and adoption risks surface late.",
          "IT is treated as an order taker rather than a strategic concierge.",
        ],
      },
      {
        title: "The goal is the business condition—not the technology milestone alone.",
        paragraphs: [
          "The shared system helps business and technology leaders define the problem, evaluate alternatives, establish priorities, commit resources, own adoption, resolve dependencies, and measure outcomes together.",
        ],
      },
    ],
    related: [solutions[2], solutions[3]],
    primaryCta: consultation,
    secondaryCta: { label: "Explore Enterprise Transformation", href: solutions[2].href },
  },

  "for-the-chief-transformation-officer": {
    slug: "for-the-chief-transformation-officer",
    eyebrow: "For the Chief Transformation Officer",
    title: "Make change become the way the organization actually works.",
    description: "Connect transformation intent to priorities, tradeoffs, commitments, adoption ownership, operating rhythm, and measurable benefits.",
    intro: "Your mandate is not simply to launch change. It is to make the new strategy, capability, or operating model measurable, durable, and less dependent on the transformation office over time.",
    seoTitle: "Execution Leadership for Transformation Leaders",
    seoDescription: "Help Chief Transformation Officers turn transformation programs into durable operating behavior and measurable business results.",
    facts: [
      { label: "Common pressure", value: "Program momentum depends on continued escalation" },
      { label: "What changes", value: "The transformation becomes normal operating behavior" },
      { label: "First signal", value: "A sponsor changes a real priority or resource decision" },
      { label: "Relevant scope", value: "Enterprise Transformation" },
    ],
    sections: [
      {
        title: "Green reporting does not prove the operating condition changed.",
        bullets: [
          "Sponsors support the idea without changing behavior.",
          "Existing priorities displace transformation work.",
          "Functions adopt at different speeds.",
          "Teams comply without changing how work happens.",
          "Benefits remain difficult to measure.",
        ],
      },
      {
        title: "Transformation becomes part of how leadership operates.",
        paragraphs: [
          "The system connects intent to priorities, resource tradeoffs, decisions, work rationalization, visible commitments, cross-functional dependencies, adoption ownership, execution rhythm, and outcome measurement.",
        ],
      },
    ],
    related: [solutions[2], solutions[1]],
    primaryCta: consultation,
    secondaryCta: { label: "Explore Enterprise Transformation", href: solutions[2].href },
  },

  "for-the-vp-and-division-presidents": {
    slug: "for-the-vp-and-division-presidents",
    eyebrow: "For Division Presidents and VPs",
    title: "Move the P&L through priorities your teams can actually execute.",
    description: "Create coordinated commitments across the functions, resources, and enterprise decisions your result depends on.",
    intro: "You own outcomes without always controlling every dependency required to produce them. When functions operate through different priorities and commitments, the P&L absorbs the friction.",
    seoTitle: "Execution Leadership for Division Presidents and VPs",
    seoDescription: "Help division presidents and VPs align shared functions, priorities, commitments, and dependencies around P&L outcomes.",
    facts: [
      { label: "Common pressure", value: "You own the result but not every dependency" },
      { label: "What changes", value: "Relevant leaders own one executable plan" },
      { label: "First signal", value: "A cross-functional commitment becomes reliable" },
      { label: "Relevant scope", value: "Leadership Team Transformation or ELPA" },
    ],
    sections: [
      {
        title: "The P&L feels execution friction before the operating model admits it.",
        bullets: [
          "Strategic priorities compete with enterprise demands.",
          "Shared functions do not move at the required speed.",
          "Teams receive mixed direction.",
          "Important work is repeatedly displaced.",
          "You spend too much time escalating dependencies.",
        ],
      },
      {
        title: "The business unit should execute through a system—not only personal force.",
        paragraphs: [
          "The system gives relevant leaders one way to define the result, prioritize the work, make tradeoffs, establish ownership, resolve dependencies, hold commitments, and measure outcomes.",
        ],
      },
    ],
    related: [solutions[1], solutions[0]],
    primaryCta: consultation,
    secondaryCta: { label: "Explore Leadership Team Transformation", href: solutions[1].href },
  },

  insights: {
    slug: "insights",
    eyebrow: "120VC Insights",
    title: "Practical thinking for leaders closing the Strategy Execution Gap.",
    description: "Use articles, guides, briefings, podcasts, books, and operating tools to understand and change the execution condition.",
    intro: "You do not need more generic leadership inspiration. You need useful ways to challenge the work, improve decisions, and lead teams under real pressure.",
    seoTitle: "Strategy Execution and Leadership Insights",
    seoDescription: "Explore practical strategy execution, executive team, portfolio ROI, enterprise transformation, AI, and leadership system insights.",
    sections: [
      {
        eyebrow: "Start with the issue",
        title: "Choose a topic before a format.",
        cards: [
          { title: "Strategy Execution", description: "Why strategy fails after it leaves the executive room—and what reconnects intent to daily work.", href: "/problems-we-solve/strategy-execution-gap" },
          { title: "Executive Team Performance", description: "How senior leaders align priorities, handle tension, decide, and execute as one team.", href: "/problems-we-solve/leadership-team-alignment" },
          { title: "Portfolio ROI", description: "How leaders rationalize work and turn governance into an investment discipline.", href: "/problems-we-solve/project-portfolio-roi" },
          { title: "Enterprise Transformation", description: "How internal functions and transformation teams create measurable business value.", href: "/problems-we-solve/transformation-execution" },
          { title: "AI and Leadership", description: "What AI exposes—and why agency, judgment, accountability, and execution leadership still matter.", href: "https://www.120vc.com/articles/the-agentic-execution-leader-why-ai-cannot-close-the-strategy-execution-gap-alone" },
          { title: "Practical Leadership Systems", description: "Prioritization, recommendations, accountability, coaching, weekly execution, and work rationalization.", href: "/leadership-system" },
        ],
      },
      {
        eyebrow: "Featured from the library",
        title: "Useful ideas for the condition you are carrying now.",
        cards: [
          { title: "The Agentic Execution Leader", description: "Why AI cannot close the Strategy Execution Gap alone.", href: "https://www.120vc.com/articles/the-agentic-execution-leader-why-ai-cannot-close-the-strategy-execution-gap-alone", label: "Article" },
          { title: "You Can’t Coach Chaos", description: "Why clear expectations must come before coaching and accountability.", href: "https://www.120vc.com/articles/you-cant-coach-chaos", label: "Article" },
          { title: "Kill the Cost Center", description: "Replace activity and cost-center thinking with measurable internal business value.", href: "https://www.120vc.com/download/gsd-post-to-kill-the-cost-center", label: "Guide" },
        ],
      },
    ],
    primaryCta: { label: "Get practical Execution Leadership thinking", href: "mailto:info@120vc.com?subject=Subscribe%20me%20to%20120VC%20insights" },
    secondaryCta: { label: "Start with the system", href: "/leadership-system" },
  },

  about: {
    slug: "about",
    eyebrow: "About 120VC",
    title: "Capable leaders should not have to accept execution failure as normal.",
    description: "Learn why 120VC created the Execution Leadership category, how the system works, and what it means to operate by The 120 standard.",
    intro: "Organizations invest heavily in strategy, technology, training, talent, and transformation. They still struggle to turn leadership intent into coordinated execution. 120VC was built to change the system underneath that work.",
    seoTitle: "About 120VC — The Execution Leadership Firm",
    seoDescription: "Learn why 120VC created Execution Leadership, how the system is installed inside live work, and what The 120 standard means.",
    sections: [
      {
        eyebrow: "The hierarchy",
        title: "Company. Category. System. Standard.",
        cards: [
          { title: "120VC is the company", description: "An Execution Leadership firm working with senior enterprise leaders accountable for major outcomes.", href: "/contact" },
          { title: "Execution Leadership is the category", description: "The discipline of leading through a shared system so decisions become coordinated action.", href: "/leadership-system" },
          { title: "The system is what we install", description: "Priorities, decisions, commitments, accountability, rhythm, development, and measurement.", href: "/leadership-system" },
          { title: "The 120 is the standard", description: "Intentionality, discipline, trust, transparency, and accountability under pressure.", href: "/founder-jason-scott" },
        ],
      },
      {
        title: "Why we work inside live execution.",
        paragraphs: [
          "Leadership does not reveal itself when the room is calm and the scenario is hypothetical. It reveals itself when the deadline matters, priorities compete, information is incomplete, resources are constrained, functions disagree, and the work is at risk.",
          "That is where the system must operate. So that is where we install it.",
        ],
      },
      {
        eyebrow: "The 120 standard",
        title: "A way of operating when pressure rises.",
        bullets: [
          "Intentionality: know what matters, why it matters, and what outcome defines success.",
          "Discipline: honor priorities, decisions, commitments, and rhythm under pressure.",
          "Trust: create confidence through clarity, honesty, visibility, and follow-through.",
          "Transparency: make reality visible early enough to act.",
          "Accountability: own the commitment, result, learning, and required change.",
        ],
      },
      {
        title: "Irreplaceable leaders create capability everywhere they operate.",
        paragraphs: [
          "The goal is not dependency on one heroic person. It is leaders whose way of operating makes the people and systems around them stronger. Unstoppable teams are not invincible; they can see reality, adapt, decide, and execute together.",
        ],
      },
    ],
    primaryCta: { label: "Explore the Execution Leadership System", href: "/leadership-system" },
    secondaryCta: { label: "Meet J. Scott", href: "/founder-jason-scott" },
  },

  "founder-jason-scott": {
    slug: "founder-jason-scott",
    eyebrow: "Founder of 120VC",
    title: "J. Scott built 120VC around one conviction: leadership must change the work.",
    description: "Meet the founder behind 120VC, the Execution Leadership category, and the practical system installed inside enterprise work.",
    intro: "J. Scott’s work focuses on the gap between what organizations intend and what their leadership systems allow them to deliver. His point of view is direct: insight matters only when it changes priorities, decisions, commitments, behavior, and outcomes.",
    seoTitle: "Meet J. Scott, Founder of 120VC",
    seoDescription: "Meet J. Scott, founder of 120VC and creator of its Execution Leadership system for enterprise teams and transformation.",
    heroImage: {
      src: "https://www.120vc.com/wp-content/uploads/2026/02/Jason-Scott-120VC-CEO-Founder-img.webp",
      alt: "J. Scott, founder and CEO of 120VC",
      width: 532,
      height: 530,
    },
    sections: [
      {
        title: "The work began with the execution condition—not a leadership-content category.",
        paragraphs: [
          "120VC was created to work alongside leaders in the moments where strategy becomes difficult: competing priorities, constrained capacity, cross-functional dependencies, incomplete information, and outcomes that matter.",
          "That experience became a shared system for helping leaders operate with more intentionality, discipline, trust, transparency, and accountability.",
        ],
      },
      {
        title: "Founder voice belongs where conviction helps the buyer go deeper.",
        paragraphs: [
          "J. Scott’s books, briefings, podcasts, and essays challenge leadership theater, cost-center thinking, weak accountability, and the assumption that training alone changes execution.",
        ],
        statement: "Outcomes over optics. Leadership inside the work—not commentary from the sidelines.",
      },
      {
        eyebrow: "Speaking and conversations",
        title: "Bring the Strategy Execution Gap into the executive room.",
        paragraphs: [
          "For leadership briefings, executive conversations, podcasts, or speaking inquiries, contact 120VC with the audience, context, and business condition you want to address.",
        ],
      },
    ],
    primaryCta: { label: "Discuss a speaking or executive briefing", href: "/contact?request=speaking" },
    secondaryCta: { label: "Read 120VC Insights", href: "/insights" },
  },

  faq: {
    slug: "faq",
    eyebrow: "Frequently asked questions",
    title: "Understand the system before you evaluate the scope.",
    description: "Clear answers about Execution Leadership, installation, participation, timing, measurement, and the initial consultation.",
    intro: "The strongest enterprise buying process makes participation, risk, fit, and the next decision visible. These answers are designed to help a champion evaluate 120VC and explain it to other stakeholders.",
    seoTitle: "Execution Leadership Frequently Asked Questions",
    seoDescription: "Learn what 120VC does, how Execution Leadership differs from training and consulting, who participates, and how an engagement begins.",
    sections: [
      {
        title: "What does 120VC do?",
        paragraphs: ["120VC installs a shared Execution Leadership System inside live enterprise work. The system changes how leaders establish priorities, make decisions, allocate resources, own commitments, expose risk, rationalize work, develop capability, and measure outcomes."],
      },
      {
        title: "What is Execution Leadership?",
        paragraphs: ["Execution Leadership is the discipline of leading through one shared system so leadership decisions become coordinated action and more predictable outcomes under pressure. It is operational leadership—not personality, title, inspiration, or communication style alone."],
      },
      {
        title: "Is this coaching, consulting, or software?",
        paragraphs: ["Coaching and consulting may be part of the installation, but 120VC is not an advice-only consultancy, generic coaching company, or software product. We work alongside leaders while the system is applied to real priorities, decisions, commitments, and outcomes. Technology may support visibility; it is not the leadership system."],
      },
      {
        title: "What does installed inside live work mean?",
        paragraphs: ["Leaders apply the system to current priorities, initiatives, decisions, dependencies, commitments, meetings, portfolio choices, and business outcomes. They do not learn it in isolation and wait until later to use it."],
      },
      {
        title: "Who must participate?",
        paragraphs: ["Every engagement requires an accountable executive sponsor and the relevant leaders responsible for the work. The sponsor needs enough authority to require participation and change how the team operates. They may delegate appropriate work, but not their own leadership responsibility."],
      },
      {
        title: "Does the work add more meetings?",
        paragraphs: ["The objective is not to add unnecessary process. The system improves, replaces, or rationalizes existing execution rhythms. The exact cadence follows the installation scope and current condition."],
      },
      {
        title: "How soon should we expect value?",
        paragraphs: ["The first useful signal is an observable operating shift: a clear priority, removed conflicting work, a decision that holds, visible ownership, earlier risk, an avoided escalation, or an execution rhythm beginning to hold. Final business outcomes may require a longer measurement period."],
      },
      {
        title: "How are timing and investment determined?",
        paragraphs: ["Duration and investment depend on the installation scope, leadership unit, current condition, business significance, and level of ongoing execution support. Commercial terms are provided after a qualified consultation and scope recommendation; this site does not publish unresolved fixed-duration or seat-pricing claims."],
      },
      {
        title: "What happens during the initial consultation?",
        paragraphs: ["The consultation examines the outcome at risk, execution condition, executive authority, team readiness, current work, economic significance, and appropriate next step. It may result in a recommendation, additional education, disqualification, or no action."],
      },
    ],
    primaryCta: consultation,
    secondaryCta: { label: "Compare solutions", href: "/leadership-services" },
  },
};

export const allPages = Object.values(pages);
export { problems, solutions, roles };

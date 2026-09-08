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
  visibility?: "audience" | "review";
  presentation?: "primary" | "detail";
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
  detailsTitle?: string;
  detailsDescription?: string;
};

const consultation = { label: "Book a Consultation", href: "/consultation" };

const problems: PageLink[] = [
  {
    title: "Strategy is not becoming execution",
    description: "The direction is clear at the top, but priorities, decisions, and daily work do not stay aligned.",
    href: "/problems-we-solve?condition=strategy-drift",
  },
  {
    title: "The leadership team is not operating as one",
    description: "Capable executives optimize their functions while shared commitments and enterprise decisions drift.",
    href: "/problems-we-solve?condition=leadership-fragmentation",
  },
  {
    title: "Transformation is not becoming normal work",
    description: "The program is active, but adoption, leadership behavior, and measurable operating change are not holding.",
    href: "/problems-we-solve?condition=transformation-stall",
  },
  {
    title: "The portfolio is busy but return is unclear",
    description: "Projects are reported, yet leaders cannot confidently fund, stop, reshape, or accelerate the right work.",
    href: "/problems-we-solve?condition=portfolio-overload",
  },
  {
    title: "An internal function cannot prove its value",
    description: "HR, IT, Finance, or PMO is trapped in reactive demand and cannot connect activity to business outcomes.",
    href: "/problems-we-solve?condition=reactive-function",
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
    title: "Priorities compete. Decisions reopen. Execution stalls.",
    description: "These strategy execution problems appear when leaders set different priorities, decisions lack owners, and portfolios exceed capacity. 120VC installs one shared way to prioritize, decide, and run the work.",
    intro: "Start with the problem you recognize. You do not need to understand 120VC terminology or choose a service first.",
    seoTitle: "Strategy Execution Problems: Why Good Strategies Fail",
    seoDescription: "See why competing priorities, unclear decisions, overloaded teams, stalled transformations, and crowded project portfolios keep slowing enterprise execution.",
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
    title: "Why capable organizations still struggle to execute.",
    description: "Close the distance between executive intent and the priorities, decisions, commitments, and work required to deliver it.",
    intro: "The executive team agrees on direction. Then functions interpret it differently, current work consumes capacity, decisions reopen, and the strategy becomes one more demand competing for attention.",
    seoTitle: "Close the Strategy Execution Gap",
    seoDescription: "Learn why strategy implementation fails after the executive decision and how a shared execution leadership system closes the gap.",
    facts: [
      { label: "Visible symptom", value: "Strategy is approved but not changing daily work" },
      { label: "Business consequence", value: "Delay, rework, escalation, and diluted return" },
      { label: "First useful signal", value: "Priorities and tradeoffs become explicit" },
      { label: "Best next step", value: "Consultation with 120VC" },
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
    primaryCta: { label: "See How the Execution Leadership System Works", href: "/leadership-system" },
    secondaryCta: { label: "Explore the Execution Health Framework", href: "/resources/assessments/execution-health-diagnostic" },
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
    primaryCta: { label: "See How the Execution Leadership System Works", href: "/leadership-system" },
    secondaryCta: { label: "Explore the Execution Health Framework", href: "/resources/assessments/execution-health-diagnostic" },
  },

  "problems-we-solve/transformation-execution": {
    slug: "problems-we-solve/transformation-execution",
    eyebrow: "Transformation execution",
    title: "A transformation has not succeeded because it launched.",
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
    primaryCta: { label: "See How the Execution Leadership System Works", href: "/leadership-system" },
    secondaryCta: { label: "Explore the Execution Health Framework", href: "/resources/assessments/execution-health-diagnostic" },
  },

  "problems-we-solve/project-portfolio-roi": {
    slug: "problems-we-solve/project-portfolio-roi",
    eyebrow: "Project portfolio ROI",
    title: "Your portfolio can be well reported and still poorly invested.",
    description: "Move beyond project status to decide which initiatives deserve time, talent, attention, and capital.",
    intro: "Most organizations can report schedule, budget, milestones, and risk. Fewer can show which work should exist, which investments should stop, or how the portfolio improves customer, team, and financial outcomes.",
    seoTitle: "Improve Project Portfolio ROI",
    seoDescription: "Rationalize initiatives, improve PMO investment discipline, and make funding, capacity, and portfolio ROI decisions visible.",
    facts: [
      { label: "Visible symptom", value: "Too many initiatives and weak return logic" },
      { label: "Business consequence", value: "Capacity fragmentation and continued funding of weak work" },
      { label: "First useful signal", value: "A project is challenged, reshaped, or stopped" },
      { label: "Starting point", value: "Portfolio ROI Audit" },
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
    primaryCta: { label: "See How the Execution Leadership System Works", href: "/leadership-system" },
    secondaryCta: { label: "Explore the Execution Health Framework", href: "/resources/assessments/execution-health-diagnostic" },
  },

  "problems-we-solve/internal-function-performance": {
    slug: "problems-we-solve/internal-function-performance",
    eyebrow: "Internal function performance",
    title: "Necessary work is not automatically strategic work.",
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
    primaryCta: { label: "See How the Execution Leadership System Works", href: "/leadership-system" },
    secondaryCta: { label: "Explore the Execution Health Framework", href: "/resources/assessments/execution-health-diagnostic" },
  },

  "leadership-services": {
    slug: "leadership-services",
    eyebrow: "Solutions",
    title: "Align leaders. Make change stick. Focus the portfolio.",
    description: "Our strategy execution consulting changes the decisions and operating rhythms inside executive teams, business transformations, and project portfolios—so people know what matters, who owns it, and what moves next.",
    intro: "The right starting point depends on where the work keeps breaking—not on which service name a buyer already knows.",
    seoTitle: "Strategy Execution, Transformation & PMO Consulting",
    seoDescription: "Compare strategy execution consulting, leadership team development, business transformation consulting, PMO consulting, and project leadership services.",
    sections: [
      { eyebrow: "Choose by condition", title: "Where does the system need to be installed?", cards: solutions },
      {
        title: "The consultation identifies the right next step.",
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
    title: "One system for priorities, decisions, and ownership.",
    description: "120VC installs its Execution Leadership System—a leadership operating system for enterprise teams—inside current priorities and initiatives. We diagnose the break, clarify decision rights, establish the operating rhythm, run it under pressure, and transfer ownership to your team.",
    intro: "The system connects priorities, decisions, ownership, operating rhythm, and measurable outcomes without creating a separate training environment.",
    seoTitle: "Leadership Operating System for Strategy Execution",
    seoDescription: "See how 120VC installs a shared execution system for priorities, decision rights, ownership, operating rhythm, accountability, and measurable outcomes.",
    facts: [
      { label: "Installed in", value: "Current priorities, initiatives, meetings, and decisions" },
      { label: "Requires", value: "An accountable executive sponsor and relevant team" },
      { label: "First value", value: "An observable operating shift" },
      { label: "Measures", value: "Customer, team, and financial outcomes" },
    ],
    sections: [
      {
        eyebrow: "What it governs",
        title: "The system connects strategy to daily decisions.",
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
          { title: "01 — Diagnose the condition", description: "Clarify the outcome at risk, what is happening now, the leadership authority involved, and the work carrying the pressure.", href: "/consultation" },
          { title: "02 — Install inside live work", description: "Apply shared practices to current priorities, decisions, dependencies, commitments, meetings, and outcomes.", href: "/leadership-services" },
          { title: "03 — Transfer ownership", description: "Build the operating rhythm and leadership capability required for the system to become less dependent on 120VC.", href: "/executive-leadership-coaching-and-development-performance-accelerator" },
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
        title: "Performance should improve without hidden failure.",
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
    title: "Executive coaching in live work.",
    description: "ELPA combines executive leadership development with a high-stakes initiative already in motion. The accountable executive and relevant team build capability while changing the priorities, decisions, and commitments that determine the result.",
    intro: "The initiative moves while the team installs a repeatable way to prioritize, decide, own, and deliver together.",
    heroImage: { src: "/images/story/team-working-together.jpg", alt: "An executive team applying new leadership practices to work already underway.", width: 1800, height: 1008 },
    seoTitle: "Executive Leadership Development Inside Live Work | ELPA",
    seoDescription: "ELPA is an executive leadership development program that changes priorities, decisions, commitments, ownership, and execution inside live enterprise work.",
    facts: [
      { label: "Designed for", value: "An accountable executive and relevant direct-report team" },
      { label: "Applied to", value: "Live priorities, initiatives, decisions, and outcomes" },
      { label: "Delivery", value: "System installation, team application, coaching, and operating rhythm" },
      { label: "Timing", value: "Confirmed when the work is scoped" },
    ],
    sections: [
      {
        title: "Use the live initiative—not a simulation.",
        presentation: "primary",
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
        title: "The accountable executive has to lead the change.",
        presentation: "detail",
        paragraphs: [
          "The accountable executive cannot delegate their own leadership responsibility and expect the system to become executive-owned. Participation, access, real work, and willingness to change current operating behavior determine fit.",
        ],
      },
      {
        title: "Leave the team with a capability it can keep using.",
        presentation: "primary",
        paragraphs: [
          "ELPA should improve the initiative in front of the team and leave behind a repeatable way to prioritize, decide, own, and deliver the next one.",
        ],
      },
    ],
    related: [{ title: "Leadership Team Transformation", description: "Focus the system on the senior team’s shared operation.", href: solutions[1].href }, { title: "How the system works", description: "See the practices and installation path behind ELPA.", href: "/leadership-system" }],
    primaryCta: { label: "Discuss ELPA", href: "/consultation" },
    secondaryCta: { label: "See the system", href: "/leadership-system" },
    detailsTitle: "What participation does ELPA require?",
    detailsDescription: "Open this question to see the executive commitment required and related ways to continue.",
  },

  "transformation-leadership-team-development-coaching-and-program": {
    slug: "transformation-leadership-team-development-coaching-and-program",
    eyebrow: "Leadership Team Transformation",
    title: "Leadership team development for executives.",
    description: "120VC uses leadership team coaching inside live work to change how executives make trade-offs, hold decisions, own commitments, and execute together.",
    intro: "The goal is not agreement in the meeting. It is one set of enterprise priorities and commitments that still hold when the team returns to the work.",
    heroImage: { src: "/images/story/aligned-leadership-team.jpg", alt: "Senior leaders working as one team around shared priorities and commitments.", width: 1600, height: 1066 },
    seoTitle: "Leadership Team Development for Executive Teams",
    seoDescription: "Leadership team development and executive team coaching that help senior leaders align priorities, hold decisions, own commitments, and execute as one.",
    facts: [
      { label: "Designed for", value: "Executive and senior leadership teams" },
      { label: "Best used when", value: "Functional strength is not producing enterprise coordination" },
      { label: "Primary change", value: "The team operates as one leadership unit" },
      { label: "Timing", value: "Scoped after diagnosis" },
    ],
    sections: [
      {
        title: "Help the team prioritize, decide, and commit as one.",
        presentation: "primary",
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
        title: "Leave the team with a way of working it can keep using.",
        presentation: "primary",
        paragraphs: [
          "The team applies the system to the priorities, trade-offs, decisions, and cross-functional work already defining performance, then keeps using that operating rhythm after 120VC leaves.",
        ],
        statement: "The goal is not a better offsite. It is a team that operates differently after the offsite is over.",
      },
    ],
    related: [solutions[0], { title: "COO execution leadership", description: "See how the condition appears from the COO seat.", href: roles[0].href }],
    primaryCta: { label: "Discuss Your Leadership Team", href: "/consultation" },
    secondaryCta: { label: "Explore the Leadership Team Assessment Framework", href: "/resources/assessments/leadership-team-execution-assessment" },
  },

  "enterprise-digital-transformation": {
    slug: "enterprise-digital-transformation",
    eyebrow: "Enterprise Transformation",
    title: "Business transformation that sticks.",
    description: "Through business transformation consulting, 120VC works with internal functions to install the priorities, ownership, decisions, and recurring practices the transformation requires. Progress is measured through changes in the work and the business outcomes it is meant to produce.",
    intro: "A transformation becomes real when leaders make different trade-offs, teams work differently, and the intended value becomes visible in normal operations.",
    heroImage: { src: "/images/problems/function-outcome.jpg", alt: "A cross-functional team turning a transformation plan into normal operating work.", width: 1800, height: 1200 },
    seoTitle: "Business Transformation Consulting for Measurable Value",
    seoDescription: "Move enterprise transformation beyond plans and program activity by changing priorities, decisions, ownership, operating rhythm, adoption, and measurable value.",
    facts: [
      { label: "Designed for", value: "Executives, transformation leaders, and internal-function owners" },
      { label: "Best used when", value: "The program is active but the work is not changing" },
      { label: "Primary change", value: "Transformation becomes normal operating work" },
      { label: "Measurement", value: "Customer, team, and financial outcomes" },
    ],
    sections: [
      {
        title: "The roadmap is not the transformation.",
        presentation: "primary",
        bullets: [
          "Existing priorities continue to displace the transformation.",
          "Sponsors support the change without changing real resource decisions.",
          "Functions adopt at different speeds without shared consequences.",
          "Program activity grows while normal operating behavior stays the same.",
          "Expected value remains separate from weekly execution decisions.",
        ],
      },
      {
        title: "Make the new way of working the normal way of working.",
        presentation: "primary",
        paragraphs: [
          "120VC puts transformation expectations into operating decisions, visible commitments, ownership, and recurring team rhythms so the change no longer depends on the transformation office pushing it forward.",
        ],
      },
      {
        title: "Keep the expected value visible.",
        presentation: "detail",
        paragraphs: [
          "Track whether the work is changing customer, team, and business outcomes—not only whether transformation activities were completed.",
        ],
      },
    ],
    related: [{ title: "Internal Function Performance", description: "Diagnose the recognizable buyer condition first.", href: "/problems-we-solve/internal-function-performance" }, solutions[3]],
    primaryCta: { label: "Discuss Your Transformation", href: "/consultation" },
    secondaryCta: { label: "Explore the Cost Center Assessment Framework", href: "/resources/assessments/cost-center-to-value-engine-assessment" },
    detailsTitle: "How should transformation value be measured?",
    detailsDescription: "Open this question to see how operating change connects to customer, team, and business outcomes.",
  },

  "roi-driven-project-portfolio-services": {
    slug: "roi-driven-project-portfolio-services",
    eyebrow: "ROI-Driven Project Portfolio Services",
    title: "Project portfolio decisions made clear.",
    description: "120VC installs portfolio governance and a shared decision rhythm so leaders can allocate resources deliberately, put people and capital behind the right work, and decide which initiatives should continue, accelerate, change, or stop.",
    intro: "Project portfolio management should help leaders decide where scarce capacity belongs, not simply report the work already in motion.",
    heroImage: { src: "/images/problems/portfolio-review.jpg", alt: "Portfolio leaders reviewing investment choices and capacity together.", width: 1201, height: 1800 },
    seoTitle: "Project Portfolio Management & PMO Consulting",
    seoDescription: "Improve project portfolio management, resource allocation, portfolio governance, and PMO investment decisions with an execution system built around value.",
    facts: [
      { label: "Designed for", value: "Leaders accountable for capital, transformation, and portfolio outcomes" },
      { label: "Starting point", value: "Portfolio ROI Audit" },
      { label: "Primary change", value: "Projects become investments that must earn support" },
      { label: "Technology", value: "Smartsheet may support visibility; it is not the strategy" },
    ],
    sections: [
      {
        title: "Put people and capital behind the work that matters most.",
        presentation: "primary",
        bullets: [
          "Which initiatives lack a credible business condition or return logic?",
          "Where is work duplicative or competing for the same capability?",
          "Which commitments exceed realistic team capacity?",
          "Does governance produce decisions or mainly report activity?",
          "Which work should stop, reshape, consolidate, wait, or accelerate?",
        ],
      },
      {
        title: "Decide what continues—and what stops.",
        presentation: "primary",
        paragraphs: [
          "Keep the investment decision current as assumptions, resources, risks, and expected value change. Governance should force the trade-off instead of preserving every initiative.",
        ],
        statement: "Projects remain investments only while the expected value justifies the people and capital behind them.",
      },
      {
        title: "A green project can still be a bad investment.",
        presentation: "detail",
        paragraphs: [
          "Schedule, budget, and milestone status do not show whether the business outcome still justifies the investment. Measure value and delivery health together.",
        ],
      },
      {
        title: "Turn portfolio reporting into portfolio decisions.",
        presentation: "detail",
        paragraphs: [
          "Give executives the information and operating rhythm needed to make real investment choices while there is still time to change the outcome.",
        ],
      },
    ],
    related: [{ title: "Project Leadership Managed Services", description: "Embed execution leadership inside critical initiatives.", href: "/project-leadership-managed-services" }, { title: "Smartsheet Portfolio Visibility", description: "Give leaders decision-ready portfolio information.", href: "/smartsheet-dashboards" }],
    primaryCta: { label: "Discuss Your Portfolio", href: "/consultation?condition=portfolio" },
    secondaryCta: { label: "Explore the Portfolio ROI Framework", href: "/resources/assessments/portfolio-roi-diagnostic" },
    detailsTitle: "What status reporting can miss.",
    detailsDescription: "Open this question when delivery health looks good but the investment case is uncertain.",
  },

  "project-leadership-managed-services": {
    slug: "project-leadership-managed-services",
    eyebrow: "Supporting portfolio capability",
    title: "Enterprise project management for critical initiatives.",
    description: "120VC's project management consulting embeds an experienced project leader in cross-functional work to make decisions, dependencies, risks, and ownership visible while there is still time to act. The work includes practices the client team can continue using.",
    intro: "This is leadership inside the initiative—not another layer of status reporting or commodity project staffing.",
    heroImage: { src: "/images/problems/portfolio-review.jpg", alt: "An experienced project leader working with executives on a critical initiative.", width: 1201, height: 1800 },
    seoTitle: "Enterprise Project Management Consulting for Critical Initiatives",
    seoDescription: "Enterprise project management consulting services that place experienced execution leaders inside critical initiatives—not commodity staffing or status reporting.",
    facts: [
      { label: "Role in the portfolio", value: "Supporting capability under Project Portfolio Services" },
      { label: "Applied to", value: "Critical projects, programs, and cross-functional initiatives" },
      { label: "Primary change", value: "From reporting activity to leading execution" },
      { label: "Scope", value: "Confirmed after portfolio or initiative diagnosis" },
    ],
    sections: [
      {
        title: "Lead the work—not another layer of administration.",
        presentation: "primary",
        bullets: [
          "Clarify the business condition and measurable result.",
          "Align decision makers and stakeholders.",
          "Make commitments and ownership visible.",
          "Challenge requests and recommend better paths.",
          "Create an operating rhythm that moves the initiative.",
        ],
      },
      {
        title: "Surface decisions and risks early.",
        presentation: "detail",
        paragraphs: [
          "The project leader brings options, trade-offs, dependencies, and decision owners into the open before a risk becomes an executive escalation or a late explanation. Client leaders remain accountable for the decisions only they can make.",
        ],
      },
      {
        title: "Make ownership clear across functions.",
        presentation: "primary",
        paragraphs: [
          "The work makes the owner, commitment, dependency, and expected outcome explicit across organizational boundaries. The team leaves with an operating rhythm it can continue after the immediate initiative is complete.",
        ],
      },
    ],
    related: [solutions[3], { title: "Smartsheet Portfolio Visibility", description: "Support decision-making with visible portfolio reality.", href: "/smartsheet-dashboards" }],
    primaryCta: { label: "Discuss the Initiative", href: "/consultation?condition=project" },
    secondaryCta: { label: "Explore Portfolio Services", href: solutions[3].href },
    detailsTitle: "How does the project leader handle risk?",
    detailsDescription: "Open this question to see how decisions, trade-offs, and escalation risks become visible earlier.",
  },

  "smartsheet-dashboards": {
    slug: "smartsheet-dashboards",
    eyebrow: "Smartsheet Portfolio Visibility",
    title: "Smartsheet project portfolio management.",
    description: "120VC configures Smartsheet portfolio dashboards around priorities, resource capacity, ownership, risks, dependencies, and outcomes leaders need to see.",
    intro: "The tool makes the execution system visible. It does not replace the leadership decisions and operating discipline behind it.",
    heroImage: { src: "/images/problems/portfolio-outcome.jpg", alt: "Portfolio leaders using a shared view to make an investment decision.", width: 1800, height: 1200 },
    seoTitle: "Smartsheet Project Portfolio Dashboards & Consulting",
    seoDescription: "Configure Smartsheet project portfolio management around priorities, capacity, ownership, decisions, risk, dependencies, and measurable outcomes.",
    facts: [
      { label: "Role in the portfolio", value: "Supporting capability under Project Portfolio Services" },
      { label: "Designed for", value: "Executives, PMOs, transformation, and portfolio leaders" },
      { label: "Primary change", value: "From status display to decision-ready visibility" },
      { label: "What it does not replace", value: "Leadership decisions and operating discipline" },
    ],
    sections: [
      {
        title: "Make the work visible at the level decisions are made.",
        presentation: "primary",
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
        title: "The dashboard makes the system visible. It is not the system.",
        presentation: "primary",
        paragraphs: [
          "It does not make the decision, establish ownership, resolve a tradeoff, or create accountability. The technology makes reality visible. The leadership system determines what happens next.",
        ],
      },
    ],
    related: [solutions[3], { title: "Project Leadership Managed Services", description: "Add experienced leadership inside work at risk.", href: "/project-leadership-managed-services" }],
    primaryCta: { label: "Discuss Portfolio Visibility", href: "/consultation?condition=visibility" },
    secondaryCta: { label: "Explore Portfolio Services", href: solutions[3].href },
  },

  "case-studies": {
    slug: "case-studies",
    eyebrow: "Case studies",
    title: "Outcome stories require context—not just a result.",
    description: "120VC case studies will show the condition, intervention, first operating shift, outcome, timeframe, and attribution required for an enterprise buying team to evaluate the work.",
    intro: "Client-specific stories remain held until name, quote, outcome, source, attribution, and publication permissions are approved. The evidence standard below is live; unsupported stories are not.",
    seoTitle: "Execution Leadership Results and Evidence",
    seoDescription: "Review how 120VC measures operating shifts, implementation evidence, enterprise outcomes, attribution, and client references.",
    sections: [
      {
        eyebrow: "Publishing gate",
        title: "No client story appears until the proof record is complete.",
        bullets: [
          "Relationship and name permission confirmed",
          "Offer and intervention accurately identified",
          "Result source and measurement period documented",
          "Attribution and qualification language approved",
          "Quote, logo, and publication permissions recorded",
        ],
        statement: "[APPROVAL REQUIRED] One case story and one client testimonial are required before public launch.",
      },
      {
        eyebrow: "What counts as evidence",
        title: "Different evidence answers different questions.",
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
    primaryCta: { label: "See How Results Are Measured", href: "/results/methodology" },
    secondaryCta: { label: "Request a Relevant Client Reference", href: "/consultation?request=reference" },
  },

  "who-we-help": {
    slug: "who-we-help",
    eyebrow: "Who we help",
    title: "For leaders who own the outcome—not only the activity.",
    description: "See how the Strategy Execution Gap appears from the COO, CFO, CIO/CTO, transformation, and P&L leadership seats.",
    intro: "The visible pressure changes by role. The underlying need is consistent: a leadership system that turns enterprise intent into coordinated execution across work the leader does not control alone.",
    seoTitle: "Execution Leadership for Enterprise Executives",
    seoDescription: "See how 120VC helps COOs, CFOs, CIOs, CTOs, transformation leaders, division presidents, and VPs close the Strategy Execution Gap.",
    sections: [{ eyebrow: "Choose your seat", title: "Which outcome are you accountable for?", cards: roles }],
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
        title: "The CFO becomes an investment partner—not just a gatekeeper.",
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
    title: "Turn technology strategy into adoption and business value.",
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
        title: "The business unit needs a system—not more personal force.",
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
    title: "120VC makes strategy deliver.",
    description: "120VC installs a leadership operating system inside live enterprise work so teams can align priorities, decision rights, ownership, accountability, and execution.",
    intro: "Organizations invest heavily in strategy, technology, training, talent, and transformation. 120VC changes the shared system underneath that work so progress does not depend on heroics.",
    seoTitle: "About 120VC — Execution Leadership for Enterprise Teams",
    seoDescription: "120VC is an Execution Leadership firm that installs a leadership operating system for strategy execution inside live enterprise work.",
    sections: [
      {
        title: "We call the discipline Execution Leadership.",
        cards: [
          { title: "120VC is the company", description: "An Execution Leadership firm working with senior enterprise leaders accountable for major outcomes.", href: "/consultation" },
          { title: "Execution Leadership is the category", description: "The discipline of leading through a shared system so decisions become coordinated action.", href: "/leadership-system" },
          { title: "The system is what we install", description: "Priorities, decisions, commitments, accountability, rhythm, development, and measurement.", href: "/leadership-system" },
          { title: "The 120 is the standard", description: "Intentionality, discipline, trust, transparency, and accountability under pressure.", href: "/founder-jason-scott" },
        ],
      },
      {
        title: "Important work should not depend on heroics.",
        paragraphs: [
          "Leadership does not reveal itself when the room is calm and the scenario is hypothetical. It reveals itself when the deadline matters, priorities compete, information is incomplete, resources are constrained, functions disagree, and the work is at risk.",
          "That is where the system must operate. So that is where we install it.",
        ],
      },
      {
        title: "The standard has to hold when pressure rises.",
        bullets: [
          "Intentionality: know what matters, why it matters, and what outcome defines success.",
          "Discipline: honor priorities, decisions, commitments, and rhythm under pressure.",
          "Trust: create confidence through clarity, honesty, visibility, and follow-through.",
          "Transparency: make reality visible early enough to act.",
          "Accountability: own the commitment, result, learning, and required change.",
        ],
      },
      {
        title: "Better execution has to work for the customer, the team, and the business.",
        paragraphs: [
          "The goal is not dependency on one heroic person. It is a way of working that makes the people and systems around them stronger while improving customer satisfaction, team member satisfaction, and profitability.",
        ],
      },
    ],
    primaryCta: { label: "See How It Works", href: "/leadership-system" },
    secondaryCta: { label: "Meet J. Scott", href: "/founder-jason-scott" },
  },

  "founder-jason-scott": {
    slug: "founder-jason-scott",
    eyebrow: "Founder of 120VC",
    title: "J. Scott built 120VC to change how leadership works.",
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
        title: "The work began with the execution condition.",
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
    primaryCta: { label: "Discuss a speaking or executive briefing", href: "/consultation?request=speaking" },
    secondaryCta: { label: "Read 120VC Insights", href: "/resources/insights" },
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
        title: "What does “installed inside live work” mean?",
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
        paragraphs: ["Duration and investment depend on the installation scope, leadership unit, current condition, business significance, and level of ongoing execution support. Commercial terms are provided after a qualified consultation and scope recommendation."],
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

Object.assign(pages, {
  results: {
    slug: "results",
    eyebrow: "Results",
    title: "Clear priorities. Decisions that hold. Measurable results.",
    description: "Our strategy execution case studies show the starting condition, what 120VC changed in the work, the measurable result, the timeframe, and the evidence behind it.",
    intro: "Enterprise proof should make the result easier to inspect, not ask a logo or percentage to carry more meaning than the evidence supports.",
    seoTitle: "Enterprise Results and Strategy Execution Case Studies",
    seoDescription: "See the problem before 120VC, what changed in the work, the measurable result, the timeframe, and the evidence behind each case study.",
    sections: [
      {
        eyebrow: "What proof must answer",
        title: "Proof needs context, timeframe, and attribution.",
        bullets: [
          "The execution condition before the work began",
          "The leadership unit, initiative, or function involved",
          "What 120VC installed inside live work",
          "The first observable operating shift",
          "The business outcome, baseline, period, and source",
          "The limits of attribution and the client permission status",
        ],
      },
      {
        eyebrow: "Current publishing status",
        title: "The evidence framework is ready. Client-specific proof is still gated.",
        paragraphs: [
          "The master build requires at least one approved case story, one approved testimonial, and a complete metric record before public launch. Those items remain approval-dependent and are not being reconstructed from marketing claims.",
        ],
        statement: "Proof depth belongs here so the homepage can stay clear, skimmable, and honest.",
        visibility: "review",
      },
    ],
    related: [
      { title: "Measurement Methodology", description: "See the evidence fields required before a result is published.", href: "/results/methodology" },
      { title: "Case Studies", description: "Review the case-story structure and current publishing gate.", href: "/case-studies" },
      { title: "Operating Shifts", description: "Understand the changes that should appear before a final business outcome.", href: "/results/operating-shifts" },
    ],
    primaryCta: { label: "See How Results Are Measured", href: "/results/methodology" },
    secondaryCta: consultation,
  },

  "results/methodology": {
    slug: "results/methodology",
    eyebrow: "Measurement methodology",
    title: "Every claim needs a definition, baseline, period, and source.",
    description: "Use the 120VC evidence standard to distinguish method proof, implementation proof, operating shifts, and business outcomes.",
    intro: "A result is not evaluation-ready because the number is memorable. It is ready when the buyer can inspect what was measured, how it was calculated, and what the evidence can reasonably support.",
    seoTitle: "120VC Measurement Methodology",
    seoDescription: "See how 120VC governs definitions, baselines, populations, time periods, calculations, attribution, and proof permissions.",
    sections: [
      {
        eyebrow: "Required metric record",
        title: "The number and its evidence travel together.",
        bullets: [
          "Metric definition and intended interpretation",
          "Baseline or comparison condition",
          "Population and inclusion rules",
          "Measurement period",
          "Calculation method and source",
          "Attribution, exceptions, and qualification language",
          "Approval status and review date",
        ],
      },
      {
        eyebrow: "Evidence ladder",
        title: "Different evidence answers different buyer questions.",
        bullets: [
          "Method proof: is there a coherent system?",
          "Implementation proof: was the system actually installed?",
          "Operating proof: did priorities, decisions, ownership, risk, or rhythm change?",
          "Outcome proof: did the defined business result change over the stated period?",
          "Attribution proof: what can reasonably be connected to the intervention?",
        ],
        statement: "The unresolved headline performance claims remain unpublished until every required field is confirmed.",
      },
    ],
    related: [
      { title: "Results", description: "Return to the complete results framework.", href: "/results" },
      { title: "Case Studies", description: "See how the standard becomes an outcome story.", href: "/case-studies" },
    ],
    primaryCta: { label: "Request a Relevant Client Reference", href: "/consultation?request=reference" },
    secondaryCta: consultation,
  },

  "results/operating-shifts": {
    slug: "results/operating-shifts",
    eyebrow: "Operating shifts",
    title: "The first proof is a different way of operating.",
    description: "See the observable leadership changes that should appear before a long-cycle business outcome is complete.",
    intro: "First value is not a fabricated ROI promise. It is a visible change in how leaders prioritize, decide, commit, expose risk, and run the work.",
    seoTitle: "Execution Leadership Operating Shifts",
    seoDescription: "Learn which observable operating shifts indicate that an Execution Leadership System is beginning to hold.",
    sections: [
      {
        title: "Look for changes the leadership team can observe.",
        bullets: [
          "A priority becomes explicit and conflicting work is removed",
          "A decision closes with clear authority and remains closed",
          "Dependencies surface early enough for a real tradeoff",
          "Commitments show an owner, outcome, timing, and next move",
          "An execution rhythm replaces recurring status theater",
          "Executive rescue becomes the exception rather than the operating model",
        ],
      },
      {
        title: "Operating shifts are leading evidence—not the final claim.",
        paragraphs: [
          "A case study should connect these shifts to the relevant business result over an appropriate measurement period. The methodology keeps the two related without pretending they are identical.",
        ],
      },
    ],
    primaryCta: { label: "See How Results Are Measured", href: "/results/methodology" },
    secondaryCta: consultation,
  },

  "results/client-references": {
    slug: "results/client-references",
    eyebrow: "Client references",
    title: "A relevant reference is part of evaluation—not decoration.",
    description: "Request a reference aligned to the execution condition, solution, and buying stage when permission and relevance allow.",
    intro: "A reference conversation should help a qualified buying group evaluate fit, installation burden, leadership participation, and the realities of the work.",
    seoTitle: "120VC Client Reference Process",
    seoDescription: "Understand how qualified enterprise buyers can request a relevant 120VC client reference.",
    sections: [
      {
        title: "Reference access follows relevance and permission.",
        bullets: [
          "The prospective condition and solution are understood",
          "The reference client has approved participation",
          "The conversation respects confidentiality and time",
          "The reference is not asked to validate a different offer or outcome",
        ],
      },
    ],
    primaryCta: { label: "Request a Relevant Client Reference", href: "/consultation?request=reference" },
    secondaryCta: { label: "Review Results", href: "/results" },
  },

  "leadership-system/installation": {
    slug: "leadership-system/installation",
    eyebrow: "System installation",
    title: "Install the system inside the work already carrying the risk.",
    description: "Diagnose the condition, apply the operating practices to live priorities and decisions, and transfer the rhythm leaders can keep running.",
    intro: "120VC does not ask leaders to learn a framework outside the work and remember it later. Installation begins where current priorities, decisions, commitments, and outcomes make the condition visible.",
    seoTitle: "Execution Leadership System Installation",
    seoDescription: "See how 120VC diagnoses, installs, compounds, and transfers an Execution Leadership System inside live enterprise work.",
    sections: [
      {
        eyebrow: "Diagnose",
        title: "Make the condition and consequence visible.",
        bullets: ["Business outcome at risk", "Current priorities and conflicting work", "Decision authority and dependencies", "Leadership rhythm and rescue patterns", "First observable signal of value"],
      },
      {
        eyebrow: "Install and compound",
        title: "Use the system where the work must move.",
        paragraphs: ["Leaders apply shared practices to current work, then use each execution cycle to strengthen judgment, accountability, transparency, and the operating rhythm the organization can retain."],
        statement: "Installed in the work. Built to hold without us.",
      },
    ],
    primaryCta: consultation,
    secondaryCta: { label: "Explore Operating Practices", href: "/leadership-system/operating-practices" },
  },

  "leadership-system/operating-practices": {
    slug: "leadership-system/operating-practices",
    eyebrow: "Operating practices",
    title: "Turn leadership intent into repeatable execution.",
    description: "The system gives leaders one shared way to define conditions, prioritize work, make recommendations, commit, focus, synchronize, and improve.",
    intro: "The practices are useful because they change the next decision and the next move—not because they create another vocabulary list.",
    seoTitle: "Execution Leadership Operating Practices",
    seoDescription: "Explore the practical prioritization, decision, focusing, synchronization, coaching, and accountability practices inside the 120VC system.",
    sections: [
      {
        title: "The core practices connect decisions to execution.",
        bullets: [
          "Challenge · Opportunity: define a condition worth solving",
          "1-3-1: make a recommendation after evaluating viable choices",
          "2×2 Prioritization: decide what deserves focus and what should stop",
          "Daily and Weekly Focusing: turn priorities into intentional use of time",
          "Weekly Team DOING: align reality, decisions, and commitments",
          "Accountability and coaching: own the result, learning, and required change",
        ],
      },
      {
        title: "Tools prove the method. Outcomes prove the result.",
        paragraphs: ["Visitors can understand the practices before buying. Public interactive implementations remain subject to the master specification’s intellectual-property, legal, data-retention, and export approvals."],
        visibility: "review",
      },
    ],
    primaryCta: { label: "Explore All Tools", href: "/resources/tools" },
    secondaryCta: { label: "See the Installation Path", href: "/leadership-system/installation" },
  },

  "leadership-system/three-pillars": {
    slug: "leadership-system/three-pillars",
    eyebrow: "The Three Pillars",
    title: "Judge decisions across customer, team, and profitability.",
    description: "The Three Pillars keep execution from optimizing one visible result while weakening the system that must sustain it.",
    intro: "Strong execution connects customer satisfaction, team member satisfaction, and profitability instead of treating them as competing slogans.",
    seoTitle: "The 120VC Three Pillars",
    seoDescription: "Learn how Customer Satisfaction, Team Member Satisfaction, and Profitability guide 120VC execution decisions.",
    sections: [
      {
        title: "One decision standard. Three connected outcomes.",
        cards: [
          { title: "Customer Satisfaction", description: "Does the decision create useful value and a better condition for the customer?", href: "/leadership-system" },
          { title: "Team Member Satisfaction", description: "Does the operating condition help capable people do clear, meaningful work?", href: "/leadership-system" },
          { title: "Profitability", description: "Does the work produce sustainable economic value and responsible use of resources?", href: "/leadership-system" },
        ],
      },
    ],
    primaryCta: { label: "Explore the Execution Leadership System", href: "/leadership-system" },
    secondaryCta: { label: "See The 120 Standard", href: "/about/the-120-standard" },
  },

  "leadership-system/execution-leadership": {
    slug: "leadership-system/execution-leadership",
    eyebrow: "Execution Leadership",
    title: "Leadership turns decisions into coordinated execution.",
    description: "Execution Leadership is the discipline of leading through one shared system so people can move critical work under pressure.",
    intro: "It is not a personality type, title, software product, or motivational program. It is how leaders prioritize, decide, commit, expose reality, and improve while the work is live.",
    seoTitle: "What Is Execution Leadership?",
    seoDescription: "Understand Execution Leadership as the discipline connecting enterprise strategy, decisions, commitments, and coordinated execution.",
    sections: [
      {
        title: "Execution Leadership closes the gap after agreement.",
        bullets: ["One shared priority system", "Explicit decision authority", "Visible commitments and dependencies", "Early risk and productive challenge", "A leadership rhythm that produces decisions", "Learning that improves the next cycle"],
      },
      {
        title: "The category names the condition conventional fixes leave behind.",
        paragraphs: ["Strategy, technology, talent, training, and transformation can all be necessary. Their value is limited when leadership lacks a shared system for turning intent into coordinated action."],
      },
    ],
    primaryCta: { label: "Explore the Execution Leadership System", href: "/leadership-system" },
    secondaryCta: { label: "Diagnose the Strategy Execution Gap", href: "/problems-we-solve/strategy-execution-gap" },
  },

  "leadership-services/compare-solutions": {
    slug: "leadership-services/compare-solutions",
    eyebrow: "Compare solutions",
    title: "Choose the installation scope by condition, team, and work.",
    description: "Compare four ways to install the same Execution Leadership System without relying on unresolved duration, pricing, or phase claims.",
    intro: "The right scope follows the outcome at risk, the leadership authority involved, the team that must operate differently, and the live work where the system must hold.",
    seoTitle: "Compare 120VC Execution Leadership Solutions",
    seoDescription: "Compare ELPA, Leadership Team Transformation, Enterprise Transformation, and Project Portfolio Services.",
    sections: [
      { eyebrow: "Four starting points", title: "Where must the system be installed?", cards: solutions },
      {
        title: "Commercial details follow a qualified diagnosis.",
        paragraphs: ["Exact phases, duration, participation, deliverables, and investment remain scope-dependent and approval-controlled. The consultation clarifies fit before it recommends an offer."],
        visibility: "review",
      },
    ],
    primaryCta: consultation,
    secondaryCta: { label: "Explore All Solutions", href: "/leadership-services" },
  },

  "for-leaders": {
    slug: "for-leaders",
    eyebrow: "For leaders who own the outcome",
    title: "Built for executives accountable for real outcomes.",
    description: "The visible pressure differs by role. The underlying need is one leadership system that turns intent into coordinated execution.",
    intro: "Use the role path that matches your mandate, then move into the problem, solution, evidence, and next step most relevant to your buying group.",
    seoTitle: "Execution Leadership for Enterprise Leaders",
    seoDescription: "See how 120VC helps COOs, CFOs, CIOs, CTOs, transformation leaders, division presidents, and VPs improve execution.",
    sections: [{ eyebrow: "Choose your seat", title: "Which outcome are you accountable for?", cards: roles }],
    related: problems,
    primaryCta: consultation,
    secondaryCta: { label: "Explore Problems We Solve", href: "/problems-we-solve" },
  },

  resources: {
    slug: "resources",
    eyebrow: "120VC resources",
    title: "Prioritize the work. Make the decision. Protect capacity.",
    description: "Use practical prioritization matrices and decision-making frameworks to clarify resource allocation, strengthen accountability, and keep enterprise work moving.",
    intro: "The library is organized around the work a leader needs to understand or move—not around a content-management taxonomy.",
    seoTitle: "Strategy Execution Tools for Priorities, Decisions & Accountability",
    seoDescription: "Explore prioritization matrices, decision-making frameworks, resource allocation tools, operating rhythms, and leadership accountability practices.",
    sections: [
      {
        eyebrow: "Choose by need",
        title: "What would help you make the next decision?",
        cards: [
          { title: "Tool Frameworks", description: "See how prioritization, decisions, focusing, and synchronization practices work.", href: "/resources/tools" },
          { title: "Assessment Frameworks", description: "Explore priority clarity, decision drag, hidden dependencies, and rescue dependence.", href: "/resources/assessments" },
          { title: "Guides and Books", description: "Build a forwardable case for closing the Strategy Execution Gap.", href: "/resources/guides-and-books" },
          { title: "Executive Briefings", description: "Bring the condition, system, or economic case into the leadership room.", href: "/resources/executive-briefings" },
          { title: "Insights", description: "Read practical thinking organized around the issue you need to solve.", href: "/resources/insights" },
          { title: "Podcasts", description: "Hear conversations about leadership, execution, teams, and enterprise change.", href: "/resources/podcasts" },
        ],
      },
    ],
    primaryCta: { label: "Explore the Library", href: "/resources/tools" },
    secondaryCta: { label: "Diagnose the Execution Condition", href: "/resources/assessments" },
  },

  "resources/tools": {
    slug: "resources/tools",
    eyebrow: "Execution Leadership tools",
    title: "See the system in practice.",
    description: "Explore practical methods for defining problems, making decisions, prioritizing work, focusing execution, and synchronizing teams.",
    intro: "The public tool library explains the method before asking for contact information. Interactive save, export, share, reminder, and data-retention behavior remains approval-dependent.",
    seoTitle: "Execution Leadership Tools",
    seoDescription: "Explore 120VC tools for prioritization, decision making, focusing, team synchronization, and work rationalization.",
    sections: [
      {
        eyebrow: "Phase-one tool frameworks",
        title: "Start with the next useful decision.",
        cards: [
          { title: "2×2 Prioritization Matrix", description: "Decide what deserves focus—and what should wait, change, or stop.", href: "/resources/tools/2x2-prioritization-matrix" },
          { title: "1-3-1 Decision Builder", description: "Define one problem, evaluate three viable solutions, and make one recommendation.", href: "/resources/tools/1-3-1-decision-builder" },
          { title: "Challenge · Opportunity Builder", description: "Turn a vague complaint, request, or idea into a condition the team can act on.", href: "/resources/tools/challenge-opportunity-builder" },
          { title: "Daily Focusing Exercise", description: "End the day with clarity. Start tomorrow intentionally.", href: "/resources/tools/daily-focusing-exercise" },
          { title: "Weekly Focusing Exercise", description: "Turn priorities into a week your calendar can actually support.", href: "/resources/tools/weekly-focusing-exercise" },
          { title: "Weekly Team DOING", description: "Replace status updates with live alignment, decisions, and commitments.", href: "/resources/tools/weekly-team-doing" },
          { title: "Execution Week Planner", description: "Protect the time required to deliver your highest-priority outcomes.", href: "/resources/tools/execution-week-planner" },
          { title: "Three Pillars Decision Filter", description: "Evaluate a decision across customer, team, and profitability.", href: "/resources/tools/three-pillars-decision-filter" },
          { title: "Work Rationalization Tool", description: "Decide what to continue, reshape, consolidate, delay, or stop.", href: "/resources/tools/work-rationalization-tool" },
        ],
      },
      {
        eyebrow: "Publishing hold",
        title: "Learn the method now. Interactive workspaces follow IP and data approval.",
        paragraphs: ["[APPROVAL REQUIRED] Public intellectual-property scope, legal language, stored data, email behavior, reminders, consent, and export formats must be confirmed before interactive tools are activated."],
      },
    ],
    primaryCta: { label: "Explore the Execution Leadership System", href: "/leadership-system" },
    secondaryCta: { label: "Explore Assessment Frameworks", href: "/resources/assessments" },
  },

  "resources/assessments": {
    slug: "resources/assessments",
    eyebrow: "Execution diagnostics",
    title: "Explore the condition before choosing the solution.",
    description: "See how priorities, decisions, accountability, dependencies, and execution can be examined.",
    intro: "Assessment results should describe the strongest visible condition. They must not be called benchmarks until 120VC has sufficient validated benchmark data.",
    seoTitle: "Execution Leadership Assessments",
    seoDescription: "Explore 120VC diagnostics for execution health, leadership teams, high-stakes initiatives, portfolios, and internal functions.",
    sections: [
      {
        title: "Choose the diagnostic that matches your accountability.",
        cards: [
          { title: "Execution Health Diagnostic", description: "Review priority clarity, decisions, dependencies, rhythm, accountability, and rescue dependence.", href: "/resources/assessments/execution-health-diagnostic" },
          { title: "Leadership Team Execution Assessment", description: "See whether senior leaders are operating through one shared system.", href: "/resources/assessments/leadership-team-execution-assessment" },
          { title: "High-Stakes Initiative Readiness", description: "Examine whether a critical initiative has the conditions required to execute.", href: "/resources/assessments/high-stakes-initiative-readiness" },
          { title: "Portfolio ROI Diagnostic", description: "Examine investment logic, work overload, governance, and portfolio decisions.", href: "/resources/assessments/portfolio-roi-diagnostic" },
          { title: "Cost Center to Value Engine Assessment", description: "See whether an internal function can connect activity to business value.", href: "/resources/assessments/cost-center-to-value-engine-assessment" },
        ],
      },
      {
        eyebrow: "Publishing hold",
        title: "Scoring, reports, capture, and routing require approved implementation rules.",
        paragraphs: ["[APPROVAL REQUIRED] Questions, scoring logic, personalized reports, data storage, consent, and HubSpot routing must be validated before assessments are activated."],
      },
    ],
    primaryCta: { label: "Book a Consultation", href: "/consultation" },
    secondaryCta: { label: "Explore Tool Frameworks", href: "/resources/tools" },
  },

  "resources/guides-and-books": {
    slug: "resources/guides-and-books",
    eyebrow: "Guides and books",
    title: "Build the case for closing the Strategy Execution Gap.",
    description: "Use forwardable resources that help a buying group understand the condition, system, installation burden, and next decision.",
    intro: "The strongest resource helps the reader move one stage forward—it does not force a consultation before the problem is understood.",
    seoTitle: "120VC Guides and Books",
    seoDescription: "Explore 120VC books and guides about the Strategy Execution Gap and the Execution Leadership System.",
    sections: [
      {
        title: "Start with the problem your stakeholders can recognize.",
        cards: [
          { title: "The Strategy Execution Gap", description: "Understand why clear strategy still fragments as it moves into priorities, decisions, and work.", href: "https://www.120vc.com/book-download-the-strategy-execution-gap/", label: "Free book" },
          { title: "Explore the Execution Leadership System", description: "See how one shared system is installed inside current enterprise work.", href: "/leadership-system", label: "System overview" },
          { title: "Evaluate ELPA", description: "Understand the executive, team, work, and readiness required for this installation scope.", href: "/executive-leadership-coaching-and-development-performance-accelerator", label: "Solution overview" },
        ],
      },
    ],
    primaryCta: { label: "Download The Strategy Execution Gap", href: "https://www.120vc.com/book-download-the-strategy-execution-gap/" },
    secondaryCta: { label: "Explore the System", href: "/leadership-system" },
  },

  "resources/executive-briefings": {
    slug: "resources/executive-briefings",
    eyebrow: "Executive briefings",
    title: "Bring the execution condition into the leadership room.",
    description: "Use a focused briefing to align a buying group around the problem, system, implementation burden, economic consequence, and next decision.",
    intro: "A briefing is useful when several stakeholders need a shared, forwardable explanation before they can evaluate an installation scope.",
    seoTitle: "120VC Executive Briefings",
    seoDescription: "Discuss a 120VC executive briefing about strategy execution, leadership teams, transformation, or portfolio ROI.",
    sections: [
      {
        title: "Briefings follow the condition—not a generic keynote deck.",
        bullets: ["Strategy Execution Gap", "Leadership team execution", "Enterprise transformation", "Portfolio investment discipline", "Execution Leadership System", "AI, agency, and accountability"],
      },
    ],
    primaryCta: { label: "Discuss an Executive Briefing", href: "/consultation?request=speaking" },
    secondaryCta: { label: "Meet J. Scott", href: "/founder-jason-scott" },
  },

  "resources/podcasts": {
    slug: "resources/podcasts",
    eyebrow: "Podcasts",
    title: "Conversations about leadership that changes the work.",
    description: "Explore approved podcast appearances and conversations about execution, teams, transformation, accountability, and enterprise value.",
    intro: "Podcast listings require a verified title, source, destination, publication date, and participant information before they appear here.",
    seoTitle: "120VC Podcasts",
    seoDescription: "Explore approved 120VC podcast conversations about Execution Leadership and the Strategy Execution Gap.",
    sections: [
      {
        eyebrow: "Publishing gate",
        title: "The page structure is ready. The episode inventory requires approval.",
        paragraphs: ["[APPROVAL REQUIRED] Add only verified podcast episodes with working destinations, accurate descriptions, and approved media usage."],
      },
    ],
    primaryCta: { label: "Read 120VC Insights", href: "/resources/insights" },
    secondaryCta: { label: "Discuss a Podcast or Briefing", href: "/consultation?request=speaking" },
  },

  "about/the-120-standard": {
    slug: "about/the-120-standard",
    eyebrow: "The 120 Standard",
    title: "Not a slogan. A way of operating.",
    description: "The 120 Standard defines how leaders behave when outcomes matter.",
    intro: "Intentionality, discipline, trust, transparency, and accountability shape the decisions, commitments, and learning required under pressure.",
    seoTitle: "The 120 Standard",
    seoDescription: "Understand the Intentionality, Discipline, Trust, Transparency, and Accountability behind The 120 Standard.",
    sections: [
      {
        title: "The standard becomes visible in behavior.",
        bullets: [
          "Intentionality: know what matters, why it matters, and what outcome defines success.",
          "Discipline: honor priorities, decisions, commitments, and rhythm under pressure.",
          "Trust: create confidence through clarity, honesty, visibility, and follow-through.",
          "Transparency: make reality visible early enough to act.",
          "Accountability: own the commitment, result, learning, and change required.",
        ],
      },
      {
        eyebrow: "The Three Pillars",
        title: "The outcome standard is customer, team, and profitability.",
        bullets: ["Customer Satisfaction", "Team Member Satisfaction", "Profitability"],
      },
    ],
    primaryCta: { label: "See How the Standard Becomes a System", href: "/leadership-system" },
    secondaryCta: { label: "Meet J. Scott", href: "/founder-jason-scott" },
  },

  "about/careers": {
    slug: "about/careers",
    eyebrow: "Careers at 120VC",
    title: "Help leaders change the work—not just talk about it.",
    description: "Learn what 120VC expects from people who lead alongside enterprise teams when outcomes matter.",
    intro: "Current openings, role requirements, location, and application instructions must come from an approved recruiting source before publication.",
    seoTitle: "Careers at 120VC",
    seoDescription: "Learn about the 120VC operating standard and how to inquire about approved career opportunities.",
    sections: [
      {
        title: "The work requires The 120 Standard.",
        bullets: ["Intentionality", "Discipline", "Trust", "Transparency", "Accountability"],
        statement: "[APPROVAL REQUIRED] No open role is implied by this page.",
      },
    ],
    primaryCta: { label: "Book a Consultation", href: "/consultation" },
    secondaryCta: { label: "Read The 120 Standard", href: "/about/the-120-standard" },
  },

  privacy: {
    slug: "privacy",
    eyebrow: "Privacy",
    title: "Privacy information for the rebuilt 120VC website.",
    description: "The final policy must reflect the approved platform, analytics, forms, HubSpot routing, tool storage, cookies, and retention behavior.",
    intro: "The current owner-only prototype does not replace approved legal copy for the production website.",
    seoTitle: "120VC Privacy",
    seoDescription: "120VC website privacy information.",
    sections: [{ eyebrow: "Legal publishing hold", title: "The production privacy policy requires legal approval.", paragraphs: ["[APPROVAL REQUIRED] Confirm data collection, processors, retention, cookies, contact rights, form routing, and interactive-tool storage before public launch."] }],
    primaryCta: { label: "Book a Consultation", href: "/consultation" },
  },

  terms: {
    slug: "terms",
    eyebrow: "Terms",
    title: "Terms for the rebuilt 120VC website.",
    description: "The final terms must be supplied and approved for the production platform and public tool experience.",
    intro: "This owner-only prototype does not invent or replace legal terms.",
    seoTitle: "120VC Website Terms",
    seoDescription: "120VC website terms information.",
    sections: [{ eyebrow: "Legal publishing hold", title: "Production terms require approved legal copy.", paragraphs: ["[APPROVAL REQUIRED] Confirm website use, intellectual property, disclaimers, interactive-tool terms, jurisdiction, and contact information before public launch."] }],
    primaryCta: { label: "Book a Consultation", href: "/consultation" },
  },

  "cookie-policy": {
    slug: "cookie-policy",
    eyebrow: "Cookie policy",
    title: "Cookie information for the rebuilt 120VC website.",
    description: "The final policy must match the analytics, consent, embedded content, and marketing technology actually deployed.",
    intro: "A cookie policy cannot be finalized before the production integration inventory and consent behavior are approved.",
    seoTitle: "120VC Cookie Policy",
    seoDescription: "120VC website cookie information.",
    sections: [{ eyebrow: "Legal publishing hold", title: "Cookie disclosure follows the verified integration inventory.", paragraphs: ["[APPROVAL REQUIRED] Identify necessary, analytics, functional, and marketing cookies; define consent behavior; and approve retention before public launch."] }],
    primaryCta: { label: "Book a Consultation", href: "/consultation" },
  },
} satisfies Record<string, SitePage>);

Object.assign(pages, {
  "resources/tools/challenge-opportunity-builder": {
    slug: "resources/tools/challenge-opportunity-builder",
    eyebrow: "Challenge · Opportunity Builder",
    title: "Turn a vague issue into a condition your team can act on.",
    description: "Turn a vague complaint, request, or idea into a clear condition before the team debates solutions.",
    intro: "The useful starting point is not an assumed answer. It is a concise statement of what is happening, what supports it, who it affects, and why it matters.",
    seoTitle: "Challenge and Opportunity Builder",
    seoDescription: "Learn how the 120VC Challenge and Opportunity method turns a vague issue into an actionable business condition.",
    sections: [
      {
        eyebrow: "The method",
        title: "Define the condition before choosing the response.",
        bullets: [
          "What is happening?",
          "What evidence supports it?",
          "Who is affected?",
          "What is the consequence?",
          "What would become possible if it changed?",
          "What condition should the team address?",
        ],
        statement: "The intended output is one concise Challenge · Opportunity statement.",
      },
      {
        eyebrow: "Activation status",
        title: "The interactive workspace is not active yet.",
        paragraphs: ["[APPROVAL REQUIRED] Confirm the public intellectual-property boundary, completed example, refinement behavior, local save, sharing, data retention, and consent before activating this builder."],
      },
    ],
    related: [
      { title: "1-3-1 Decision Builder", description: "Move from a defined condition to three viable solutions and one recommendation.", href: "/resources/tools/1-3-1-decision-builder" },
      { title: "Strategy Execution Gap", description: "Understand why clear intent still fragments during execution.", href: "/problems-we-solve/strategy-execution-gap" },
    ],
    primaryCta: { label: "See the 1-3-1 Decision Builder", href: "/resources/tools/1-3-1-decision-builder" },
    secondaryCta: { label: "View All Tools", href: "/resources/tools" },
  },

  "resources/tools/1-3-1-decision-builder": {
    slug: "resources/tools/1-3-1-decision-builder",
    eyebrow: "1-3-1 Decision Builder",
    title: "Turn one problem into one recommendation.",
    description: "Define the problem, compare three viable options, and bring forward one recommendation that is ready for a decision.",
    intro: "The 1-3-1 framework makes the thinking behind a recommendation visible, so leaders can inspect the facts, options, tradeoffs, and owner before deciding.",
    seoTitle: "Decision-Making Framework: 1-3-1 Decision Builder",
    seoDescription: "Explore the 120VC 1-3-1 decision-making framework for defining one problem, comparing three viable options, and making one accountable recommendation.",
    sections: [
      {
        eyebrow: "Decision sequence",
        title: "Define one problem. Compare three options. Recommend one path.",
        bullets: [
          "Define the problem",
          "Add relevant facts and constraints",
          "Describe solution one",
          "Describe solution two",
          "Describe solution three",
          "Compare risks and benefits",
          "Make one recommendation",
          "Prepare the decision document for review",
        ],
      },
      {
        eyebrow: "Activation status",
        title: "Saving, review, export, and sharing remain disabled.",
        paragraphs: ["[APPROVAL REQUIRED] Confirm the public template, completed example, document format, local save, review workflow, export behavior, sharing, retention, and consent before activating the builder."],
      },
    ],
    related: [
      { title: "Challenge · Opportunity Builder", description: "Clarify the condition before evaluating solutions.", href: "/resources/tools/challenge-opportunity-builder" },
      { title: "2×2 Prioritization Matrix", description: "Decide which work deserves focus after the recommendation is made.", href: "/resources/tools/2x2-prioritization-matrix" },
    ],
    primaryCta: { label: "See the 2×2 Prioritization Matrix", href: "/resources/tools/2x2-prioritization-matrix" },
    secondaryCta: { label: "View All Tools", href: "/resources/tools" },
  },

  "resources/tools/2x2-prioritization-matrix": {
    slug: "resources/tools/2x2-prioritization-matrix",
    eyebrow: "2×2 Prioritization Matrix",
    title: "A prioritization matrix for making real trade-offs.",
    description: "Compare urgency and strategic value, then decide what moves now, later, or not at all.",
    intro: "Prioritization is not a longer ranked list. This framework makes the trade-off visible so limited time, talent, attention, and resources can go where they matter most.",
    seoTitle: "Prioritization Matrix for Making Real Trade-Offs",
    seoDescription: "Explore a 2x2 prioritization matrix for comparing urgency and strategic value, making trade-offs visible, and deciding what moves now, later, or not at all.",
    sections: [
      {
        eyebrow: "Prioritization sequence",
        title: "Compare urgency and strategic value before committing capacity.",
        bullets: [
          "Add a priority or initiative",
          "Drag or assign it to a quadrant",
          "Edit the description",
          "Add the expected outcome",
          "Add the owner",
          "Flag a conflict",
          "Reorder within each quadrant",
          "Review the completed matrix before export or sharing",
        ],
      },
      {
        eyebrow: "Activation status",
        title: "The interactive matrix and its outputs are not active yet.",
        paragraphs: ["[APPROVAL REQUIRED] Confirm quadrant definitions, examples, conflict logic, keyboard behavior, local save, PDF export, sharing, retention, and consent before activating the matrix."],
      },
    ],
    related: [
      { title: "Weekly Focusing Exercise", description: "Turn selected priorities into a week the calendar can support.", href: "/resources/tools/weekly-focusing-exercise" },
      { title: "Work Rationalization Tool", description: "Decide which existing work should continue, change, wait, or stop.", href: "/resources/tools/work-rationalization-tool" },
    ],
    primaryCta: { label: "See Weekly Focusing", href: "/resources/tools/weekly-focusing-exercise" },
    secondaryCta: { label: "View All Tools", href: "/resources/tools" },
  },

  "resources/tools/daily-focusing-exercise": {
    slug: "resources/tools/daily-focusing-exercise",
    eyebrow: "Daily Focusing Exercise",
    title: "End the day with clarity. Start tomorrow intentionally.",
    description: "Use a short daily reflection to connect attention, accomplishments, outcomes, learning, and tomorrow’s intended work.",
    intro: "The Daily Focusing Exercise is designed for repeat use. One completion is a focusing practice—not evidence of commercial intent or a business outcome.",
    seoTitle: "Daily Focusing Exercise",
    seoDescription: "Learn the 120VC Daily Focusing Exercise for reflecting on outcomes and preparing tomorrow’s intentional work.",
    sections: [
      {
        eyebrow: "The reflection",
        title: "Close today and prepare tomorrow through four prompts.",
        bullets: [
          "Three Gratitudes — What are you grateful for today?",
          "Today’s Accomplishments and Outcomes — What did you accomplish, and what outcome did it create?",
          "Tomorrow’s Planned Accomplishments and Outcomes — What will you accomplish tomorrow, and what outcome should it create?",
          "Reflection or Insight — What did you learn, notice, or need to carry forward?",
        ],
      },
      {
        eyebrow: "Activation status",
        title: "Copy, email, print, save, and reminder actions remain disabled.",
        paragraphs: ["[APPROVAL REQUIRED] Confirm the public worksheet, completed example, local save, email delivery, print format, reminder consent, retention, and next-tool behavior before activating the exercise."],
      },
    ],
    related: [
      { title: "Weekly Focusing Exercise", description: "Move from daily reflection to an executable week.", href: "/resources/tools/weekly-focusing-exercise" },
      { title: "Execution Week Planner", description: "Protect time for the week’s highest-priority outcomes.", href: "/resources/tools/execution-week-planner" },
    ],
    primaryCta: { label: "See Weekly Focusing", href: "/resources/tools/weekly-focusing-exercise" },
    secondaryCta: { label: "View All Tools", href: "/resources/tools" },
  },

  "resources/tools/weekly-focusing-exercise": {
    slug: "resources/tools/weekly-focusing-exercise",
    eyebrow: "Weekly Focusing Exercise",
    title: "Turn priorities into a week your calendar can actually support.",
    description: "Connect declared priorities to a realistic week before urgent work consumes the available capacity.",
    intro: "The purpose is defined: help a leader move from priorities to an intentional week. The proprietary prompts and approved workspace have not yet been supplied.",
    seoTitle: "Weekly Focusing Exercise",
    seoDescription: "Understand the purpose of the 120VC Weekly Focusing Exercise for turning priorities into an executable week.",
    sections: [
      {
        eyebrow: "Purpose",
        title: "Make the week reflect what leadership says matters.",
        paragraphs: ["The practice should help a leader see whether the available calendar, commitments, and attention can realistically support the outcomes they have prioritized."],
      },
      {
        eyebrow: "Activation status",
        title: "The prompts and interactive workspace require approval.",
        paragraphs: ["[APPROVAL REQUIRED] Confirm the proprietary prompts, fields, instructions, completed example, save and export behavior, calendar relationship, data retention, and consent before activating Weekly Focusing."],
      },
    ],
    related: [
      { title: "Daily Focusing Exercise", description: "Close each day and prepare the next one intentionally.", href: "/resources/tools/daily-focusing-exercise" },
      { title: "Weekly Team DOING", description: "Bring individual focus into team alignment and commitments.", href: "/resources/tools/weekly-team-doing" },
    ],
    primaryCta: { label: "See Weekly Team DOING", href: "/resources/tools/weekly-team-doing" },
    secondaryCta: { label: "View All Tools", href: "/resources/tools" },
  },

  "resources/tools/weekly-team-doing": {
    slug: "resources/tools/weekly-team-doing",
    eyebrow: "Weekly Team DOING",
    title: "Weekly meetings for decisions and action.",
    description: "Move routine status out of the meeting. Make commitments visible, resolve blockers, surface decisions, and keep important work moving.",
    intro: "Weekly Team DOING is a leadership meeting rhythm for inspecting current reality and leaving with clear ownership. The proprietary agenda and facilitation rules are not yet published.",
    seoTitle: "Weekly Leadership Meeting Agenda for Decisions and Action",
    seoDescription: "Explore the purpose of a weekly leadership meeting agenda designed to surface decisions, resolve blockers, make commitments visible, and keep important work moving.",
    sections: [
      {
        eyebrow: "Meeting rhythm",
        title: "Stop using the meeting to narrate status.",
        paragraphs: ["Inspect the work that needs leadership attention, make required decisions, resolve blockers and dependencies, and leave with visible owners and next moves."],
      },
      {
        eyebrow: "Activation status",
        title: "The agenda and team workspace require approval.",
        paragraphs: ["[APPROVAL REQUIRED] Confirm the proprietary agenda, prompts, roles, facilitation guidance, commitment format, completed example, save and sharing behavior, retention, and consent before activation."],
      },
    ],
    related: [
      { title: "Weekly Focusing Exercise", description: "Prepare individual priorities before the team synchronizes.", href: "/resources/tools/weekly-focusing-exercise" },
      { title: "Execution Week Planner", description: "Protect the time required to deliver the commitments made.", href: "/resources/tools/execution-week-planner" },
    ],
    primaryCta: { label: "Explore Operating Practices", href: "/leadership-system/operating-practices" },
    secondaryCta: { label: "View All Tools", href: "/resources/tools" },
  },

  "resources/tools/execution-week-planner": {
    slug: "resources/tools/execution-week-planner",
    eyebrow: "Execution Week Planner",
    title: "Protect the time required to deliver your highest-priority outcomes.",
    description: "Make the relationship between priority outcomes, commitments, and available time visible before the week begins.",
    intro: "The purpose is defined: protect execution time for the work that matters most. The approved planning fields and interaction behavior have not yet been supplied.",
    seoTitle: "Execution Week Planner",
    seoDescription: "Understand the purpose of the 120VC Execution Week Planner for protecting time around priority outcomes.",
    sections: [
      {
        eyebrow: "Purpose",
        title: "Give the priority a credible place in the week.",
        paragraphs: ["The planner should help a leader see whether scheduled time and current commitments are consistent with the outcomes they say they will deliver."],
      },
      {
        eyebrow: "Activation status",
        title: "The planning workspace requires approval.",
        paragraphs: ["[APPROVAL REQUIRED] Confirm the proprietary planning fields, time model, completed example, conflict behavior, local save, export, calendar relationship, retention, and consent before activation."],
      },
    ],
    related: [
      { title: "Weekly Focusing Exercise", description: "Choose the outcomes the week must support.", href: "/resources/tools/weekly-focusing-exercise" },
      { title: "Daily Focusing Exercise", description: "Use daily reflection to keep the week intentional.", href: "/resources/tools/daily-focusing-exercise" },
    ],
    primaryCta: { label: "See the Daily Focusing Exercise", href: "/resources/tools/daily-focusing-exercise" },
    secondaryCta: { label: "View All Tools", href: "/resources/tools" },
  },

  "resources/tools/three-pillars-decision-filter": {
    slug: "resources/tools/three-pillars-decision-filter",
    eyebrow: "Three Pillars Decision Filter",
    title: "Evaluate a decision across customer, team, and profitability.",
    description: "Inspect whether a proposed decision improves value without creating an avoidable hidden failure elsewhere in the system.",
    intro: "The Three Pillars are Customer Satisfaction, Team Member Satisfaction, and Profitability. The approved decision-filter questions and scoring behavior have not yet been supplied.",
    seoTitle: "Three Pillars Decision Filter",
    seoDescription: "Understand the purpose of the 120VC Three Pillars Decision Filter across customer, team, and profitability.",
    sections: [
      {
        eyebrow: "Decision standard",
        title: "Consider three connected outcomes before committing.",
        bullets: ["Customer Satisfaction", "Team Member Satisfaction", "Profitability"],
        statement: "The tool is method proof. A completed filter is not outcome proof.",
      },
      {
        eyebrow: "Activation status",
        title: "The filter questions and output require approval.",
        paragraphs: ["[APPROVAL REQUIRED] Confirm the proprietary questions, guidance, output language, completed example, save and export behavior, retention, and consent before activating the filter."],
      },
    ],
    related: [
      { title: "The Three Pillars", description: "Understand the outcome standard behind the filter.", href: "/leadership-system/three-pillars" },
      { title: "1-3-1 Decision Builder", description: "Structure the recommendation the filter will help examine.", href: "/resources/tools/1-3-1-decision-builder" },
    ],
    primaryCta: { label: "Understand the Three Pillars", href: "/leadership-system/three-pillars" },
    secondaryCta: { label: "View All Tools", href: "/resources/tools" },
  },

  "resources/tools/work-rationalization-tool": {
    slug: "resources/tools/work-rationalization-tool",
    eyebrow: "Work Rationalization Tool",
    title: "Decide what to continue, reshape, consolidate, delay, or stop.",
    description: "Challenge existing work against current priorities, capacity, expected outcomes, and the cost of continuing without a decision.",
    intro: "The purpose is defined: make explicit decisions about current work. The approved evaluation criteria and recommendation logic have not yet been supplied.",
    seoTitle: "Work Rationalization Tool",
    seoDescription: "Understand the purpose of the 120VC Work Rationalization Tool for continuing, changing, delaying, consolidating, or stopping work.",
    sections: [
      {
        eyebrow: "Purpose",
        title: "Treat continuing the work as a decision—not a default.",
        paragraphs: ["The practice should help leaders examine whether current work still deserves capacity and which explicit change—continue, reshape, consolidate, delay, or stop—best protects the priority outcome."],
      },
      {
        eyebrow: "Activation status",
        title: "The criteria and recommendation workspace require approval.",
        paragraphs: ["[APPROVAL REQUIRED] Confirm the proprietary criteria, decision guidance, completed example, conflict behavior, local save, export, sharing, retention, and consent before activation."],
      },
    ],
    related: [
      { title: "2×2 Prioritization Matrix", description: "Make competing priorities and conflicts visible.", href: "/resources/tools/2x2-prioritization-matrix" },
      { title: "Project Portfolio ROI", description: "Understand why visible activity can still produce weak investment value.", href: "/problems-we-solve/project-portfolio-roi" },
    ],
    primaryCta: { label: "See the 2×2 Prioritization Matrix", href: "/resources/tools/2x2-prioritization-matrix" },
    secondaryCta: { label: "View All Tools", href: "/resources/tools" },
  },

  "resources/assessments/execution-health-diagnostic": {
    slug: "resources/assessments/execution-health-diagnostic",
    eyebrow: "Execution Health Diagnostic",
    title: "Identify the condition before choosing a response.",
    description: "Assess the overall execution condition across priorities, decisions, ownership, dependencies, risk, rhythm, accountability, and executive rescue.",
    intro: "Review the dimensions that help leaders recognize where priorities, decisions, ownership, risk, and operating rhythm are breaking down.",
    seoTitle: "Execution Health Diagnostic",
    seoDescription: "Understand the dimensions and intended experience of the 120VC Execution Health Diagnostic.",
    sections: [
      {
        eyebrow: "Diagnostic dimensions",
        title: "Assess the system connecting leadership intent to execution.",
        bullets: [
          "Priority clarity",
          "Decision discipline",
          "Work rationalization",
          "Executive alignment",
          "Visible commitments",
          "Cross-functional dependencies",
          "Risk visibility",
          "Execution rhythm",
          "Accountability",
          "Dependence on executive rescue",
        ],
      },
      {
        eyebrow: "Intended experience",
        title: "The result should name a condition—not claim a benchmark.",
        bullets: [
          "Ask 10–15 approved questions",
          "Show an immediate high-level result",
          "Offer the complete report",
          "Request work email and minimum relevant context only when value increases",
          "Route to a useful tool, briefing, case study, or consultation",
        ],
        statement: "Do not call the result a benchmark until 120VC has sufficient validated benchmark data.",
      },
      {
        eyebrow: "Activation status",
        title: "Questions, scoring, result logic, and routing are not active.",
        paragraphs: ["[APPROVAL REQUIRED] Confirm every question, scoring rule, condition threshold, result explanation, complete report, capture fields, consent, HubSpot routing, retention, and analytics boundaries before activation."],
      },
    ],
    related: [
      { title: "Problems We Solve", description: "Recognize the execution condition before choosing a solution.", href: "/problems-we-solve" },
      { title: "Execution Leadership System", description: "See the shared system the diagnostic is intended to examine.", href: "/leadership-system" },
    ],
    primaryCta: { label: "Understand the Execution Condition", href: "/problems-we-solve" },
    secondaryCta: { label: "View All Assessments", href: "/resources/assessments" },
  },

  "resources/assessments/leadership-team-execution-assessment": {
    slug: "resources/assessments/leadership-team-execution-assessment",
    eyebrow: "Leadership Team Execution Assessment",
    title: "Do senior leaders operate through one shared system?",
    description: "Examine whether the leadership team aligns priorities, makes decisions that hold, owns shared commitments, and executes as one unit.",
    intro: "The assessment purpose is defined. The approved dimensions, questions, scoring logic, and result language have not yet been supplied.",
    seoTitle: "Leadership Team Execution Assessment",
    seoDescription: "Understand the purpose of the 120VC Leadership Team Execution Assessment.",
    sections: [
      {
        eyebrow: "Buyer question",
        title: "Is the team aligned in the room—or operating as one after it?",
        paragraphs: ["The assessment is intended to help leaders distinguish agreement and functional strength from coordinated enterprise priorities, decisions, commitments, and execution."],
      },
      {
        eyebrow: "Activation status",
        title: "The assessment model requires approval.",
        paragraphs: ["[APPROVAL REQUIRED] Confirm dimensions, questions, response scale, scoring, result language, report, capture fields, consent, HubSpot routing, retention, and relevant proof before activation."],
      },
    ],
    related: [
      { title: "Leadership Team Alignment", description: "Understand the condition the assessment is intended to diagnose.", href: "/problems-we-solve/leadership-team-alignment" },
      { title: "Leadership Team Transformation", description: "See the relevant installation scope when the team must operate as one.", href: "/transformation-leadership-team-development-coaching-and-program" },
    ],
    primaryCta: { label: "Understand Leadership Team Alignment", href: "/problems-we-solve/leadership-team-alignment" },
    secondaryCta: { label: "View All Assessments", href: "/resources/assessments" },
  },

  "resources/assessments/high-stakes-initiative-readiness": {
    slug: "resources/assessments/high-stakes-initiative-readiness",
    eyebrow: "High-Stakes Initiative Readiness",
    title: "Does this initiative have what it needs to execute?",
    description: "Examine readiness before a critical initiative depends on unstable priorities, reopened decisions, hidden dependencies, or executive rescue.",
    intro: "The assessment purpose is defined. The approved readiness dimensions, questions, thresholds, and result language have not yet been supplied.",
    seoTitle: "High-Stakes Initiative Readiness Assessment",
    seoDescription: "Understand the purpose of the 120VC High-Stakes Initiative Readiness assessment.",
    sections: [
      {
        eyebrow: "Buyer question",
        title: "Can the initiative execute under real organizational pressure?",
        paragraphs: ["The assessment is intended to help the accountable executive examine the execution condition before timing, dependencies, ownership, or competing work put the outcome at risk."],
      },
      {
        eyebrow: "Activation status",
        title: "The readiness model requires approval.",
        paragraphs: ["[APPROVAL REQUIRED] Confirm dimensions, questions, response scale, scoring, readiness thresholds, result language, report, capture fields, consent, HubSpot routing, retention, and relevant proof before activation."],
      },
    ],
    related: [
      { title: "Strategy Execution Gap", description: "Understand why clear intent can fragment during live execution.", href: "/problems-we-solve/strategy-execution-gap" },
      { title: "Executive Leadership Performance Accelerator", description: "See the relevant scope for an accountable executive, team, and critical outcome.", href: "/executive-leadership-coaching-and-development-performance-accelerator" },
    ],
    primaryCta: { label: "Understand the Strategy Execution Gap", href: "/problems-we-solve/strategy-execution-gap" },
    secondaryCta: { label: "View All Assessments", href: "/resources/assessments" },
  },

  "resources/assessments/portfolio-roi-diagnostic": {
    slug: "resources/assessments/portfolio-roi-diagnostic",
    eyebrow: "Portfolio ROI Diagnostic",
    title: "Evaluate portfolio investment, overload, and tradeoffs.",
    description: "Examine whether the portfolio helps leaders fund, stop, reshape, consolidate, delay, or accelerate work based on return.",
    intro: "The diagnostic purpose is defined. The approved portfolio dimensions, questions, scoring logic, and result language have not yet been supplied.",
    seoTitle: "Portfolio ROI Diagnostic",
    seoDescription: "Understand the purpose of the 120VC Portfolio ROI Diagnostic for investment logic, overload, governance, and decisions.",
    sections: [
      {
        eyebrow: "Buyer question",
        title: "Is the portfolio governing investment—or only reporting activity?",
        paragraphs: ["The diagnostic is intended to help leaders examine whether portfolio visibility leads to explicit investment decisions and clearer use of capital, capacity, and executive attention."],
      },
      {
        eyebrow: "Activation status",
        title: "The portfolio diagnostic model requires approval.",
        paragraphs: ["[APPROVAL REQUIRED] Confirm dimensions, questions, response scale, scoring, result language, report, capture fields, consent, HubSpot routing, retention, Portfolio ROI Audit relationship, and proof before activation."],
      },
    ],
    related: [
      { title: "Project Portfolio ROI", description: "Understand the recognizable portfolio condition.", href: "/problems-we-solve/project-portfolio-roi" },
      { title: "Project Portfolio Services", description: "See the relevant installation scope for investment and execution discipline.", href: "/roi-driven-project-portfolio-services" },
    ],
    primaryCta: { label: "Understand Project Portfolio ROI", href: "/problems-we-solve/project-portfolio-roi" },
    secondaryCta: { label: "View All Assessments", href: "/resources/assessments" },
  },

  "resources/assessments/cost-center-to-value-engine-assessment": {
    slug: "resources/assessments/cost-center-to-value-engine-assessment",
    eyebrow: "Cost Center to Value Engine Assessment",
    title: "Can this function connect activity to business value?",
    description: "Examine whether HR, IT, Finance, PMO, or another internal function can challenge demand, recommend better choices, and show customer, team, and financial value.",
    intro: "The assessment purpose is defined. The approved dimensions, questions, scoring logic, and result language have not yet been supplied.",
    seoTitle: "Cost Center to Value Engine Assessment",
    seoDescription: "Understand the purpose of the 120VC Cost Center to Value Engine Assessment for internal functions.",
    sections: [
      {
        eyebrow: "Buyer question",
        title: "Can the function connect necessary work to measurable enterprise value?",
        paragraphs: ["The assessment is intended to help leaders distinguish reactive activity and service delivery from an operating condition that improves decisions, outcomes, and the function’s internal business partnership."],
      },
      {
        eyebrow: "Activation status",
        title: "The value-engine assessment model requires approval.",
        paragraphs: ["[APPROVAL REQUIRED] Confirm dimensions, questions, response scale, scoring, result language, report, capture fields, consent, HubSpot routing, retention, commercial path, and relevant proof before activation."],
      },
    ],
    related: [
      { title: "Internal Function Performance", description: "Understand why necessary activity is not automatically visible business value.", href: "/problems-we-solve/internal-function-performance" },
      { title: "Enterprise Transformation", description: "See the relevant installation scope for an internal function changing its business role.", href: "/enterprise-digital-transformation" },
    ],
    primaryCta: { label: "Understand Internal Function Performance", href: "/problems-we-solve/internal-function-performance" },
    secondaryCta: { label: "View All Assessments", href: "/resources/assessments" },
  },

  "resources/insights": {
    slug: "resources/insights",
    eyebrow: "120VC insights",
    title: "Practical thinking for leaders closing the Strategy Execution Gap.",
    description: "Explore insights by the business problem they help a leader understand—not only by article, download, or podcast format.",
    intro: "Start with the execution condition, leadership mandate, or decision in front of you. Each topic should route to a useful tool, assessment, problem page, and one next-stage action.",
    seoTitle: "Execution Leadership Insights",
    seoDescription: "Explore 120VC insights about strategy execution, executive teams, portfolio ROI, transformation, AI, and practical leadership systems.",
    sections: [
      {
        eyebrow: "Choose by problem",
        title: "What does your buying group need to understand next?",
        cards: [
          { title: "Strategy Execution", description: "Why strategy fails after it leaves the executive room—and what reconnects intent to daily work.", href: "/resources/insights/strategy-execution" },
          { title: "Executive Team Performance", description: "How senior leaders align priorities, handle tension, decide, and execute as one team.", href: "/resources/insights/executive-team-performance" },
          { title: "Portfolio ROI and PMO", description: "How leaders rationalize work and turn governance into an investment discipline.", href: "/resources/insights/portfolio-roi-and-pmo" },
          { title: "Enterprise Transformation", description: "How internal functions and transformation teams create measurable business value.", href: "/resources/insights/enterprise-transformation" },
          { title: "AI and Leadership", description: "What AI exposes—and why agency, judgment, accountability, and Execution Leadership still matter.", href: "/resources/insights/ai-and-leadership" },
          { title: "Practical Leadership Systems", description: "Prioritization, recommendations, accountability, coaching, focusing, and work rationalization.", href: "/resources/insights/practical-leadership-systems" },
        ],
      },
      {
        eyebrow: "Content governance",
        title: "Topic architecture is ready. The complete resource inventory is not.",
        paragraphs: ["[APPROVAL REQUIRED] Add only verified articles, guides, recordings, and downloads with working destinations, accurate metadata, approved claims, and one intentional next-stage path."],
      },
    ],
    primaryCta: { label: "Understand the Strategy Execution Gap", href: "/problems-we-solve/strategy-execution-gap" },
    secondaryCta: { label: "Explore All Resources", href: "/resources" },
  },

  "resources/insights/strategy-execution": {
    slug: "resources/insights/strategy-execution",
    eyebrow: "Strategy Execution insights",
    title: "Why strategy fails after it leaves the executive room.",
    description: "Understand why clear direction fragments across priorities, decisions, commitments, dependencies, and daily work.",
    intro: "This topic helps problem-aware leaders name the Strategy Execution Gap before they evaluate the system or a solution scope.",
    seoTitle: "Strategy Execution Insights",
    seoDescription: "Explore 120VC thinking about strategy implementation and the Strategy Execution Gap.",
    sections: [
      {
        eyebrow: "Start with the condition",
        title: "Clear strategy still needs a system that carries it into execution.",
        paragraphs: ["Use this topic to understand the distance between leadership intent and what the organization actually prioritizes, decides, owns, and delivers."],
      },
      {
        eyebrow: "Content governance",
        title: "The topic page is ready for an approved resource inventory.",
        paragraphs: ["[APPROVAL REQUIRED] Add only verified strategy-execution resources with approved claims, working destinations, accurate metadata, and one intentional next-stage CTA."],
      },
    ],
    related: [
      { title: "Strategy Execution Gap", description: "Diagnose the condition in buyer language.", href: "/problems-we-solve/strategy-execution-gap" },
      { title: "Challenge · Opportunity Builder", description: "Turn a vague issue into a condition the team can act on.", href: "/resources/tools/challenge-opportunity-builder" },
    ],
    primaryCta: { label: "Understand the Strategy Execution Gap", href: "/problems-we-solve/strategy-execution-gap" },
    secondaryCta: { label: "View All Insights", href: "/resources/insights" },
  },

  "resources/insights/executive-team-performance": {
    slug: "resources/insights/executive-team-performance",
    eyebrow: "Executive Team Performance insights",
    title: "Help strong executives operate as one leadership team.",
    description: "Understand how senior leaders align enterprise priorities, use productive challenge, make decisions, and own shared commitments.",
    intro: "This topic helps leaders distinguish individual executive strength from a shared system that continues to hold after the meeting ends.",
    seoTitle: "Executive Team Performance Insights",
    seoDescription: "Explore 120VC thinking about executive team alignment, decisions, accountability, and execution.",
    sections: [
      {
        eyebrow: "Start with the condition",
        title: "Agreement is not the same as coordinated execution.",
        paragraphs: ["Use this topic to examine whether the senior team is leading one enterprise or continuing to optimize separate functions in parallel."],
      },
      {
        eyebrow: "Content governance",
        title: "The topic page is ready for an approved resource inventory.",
        paragraphs: ["[APPROVAL REQUIRED] Add only verified executive-team resources with approved claims, working destinations, accurate metadata, and one intentional next-stage CTA."],
      },
    ],
    related: [
      { title: "Leadership Team Alignment", description: "Recognize the condition before choosing the response.", href: "/problems-we-solve/leadership-team-alignment" },
      { title: "Leadership Team Execution Assessment", description: "Review the intended diagnostic path and its activation status.", href: "/resources/assessments/leadership-team-execution-assessment" },
    ],
    primaryCta: { label: "Understand Leadership Team Alignment", href: "/problems-we-solve/leadership-team-alignment" },
    secondaryCta: { label: "View All Insights", href: "/resources/insights" },
  },

  "resources/insights/portfolio-roi-and-pmo": {
    slug: "resources/insights/portfolio-roi-and-pmo",
    eyebrow: "Portfolio ROI and PMO insights",
    title: "Run the portfolio as an investment system—not an activity report.",
    description: "Understand portfolio rationalization, funding logic, governance, capacity, visibility, and continued-investment decisions.",
    intro: "This topic helps leaders move from project status to the investment choices required to protect return and scarce enterprise capacity.",
    seoTitle: "Portfolio ROI and PMO Insights",
    seoDescription: "Explore 120VC thinking about portfolio ROI, PMO governance, rationalization, funding, and execution.",
    sections: [
      {
        eyebrow: "Start with the condition",
        title: "Visible activity does not prove the portfolio is well invested.",
        paragraphs: ["Use this topic to examine which work should remain funded, which should change, and whether governance produces decisions rather than reporting alone."],
      },
      {
        eyebrow: "Content governance",
        title: "The topic page is ready for an approved resource inventory.",
        paragraphs: ["[APPROVAL REQUIRED] Add only verified portfolio and PMO resources with approved claims, working destinations, accurate metadata, and one intentional next-stage CTA."],
      },
    ],
    related: [
      { title: "Project Portfolio ROI", description: "Recognize the portfolio condition in buyer language.", href: "/problems-we-solve/project-portfolio-roi" },
      { title: "Portfolio ROI Diagnostic", description: "Review the intended diagnostic path and its activation status.", href: "/resources/assessments/portfolio-roi-diagnostic" },
    ],
    primaryCta: { label: "Understand Project Portfolio ROI", href: "/problems-we-solve/project-portfolio-roi" },
    secondaryCta: { label: "View All Insights", href: "/resources/insights" },
  },

  "resources/insights/enterprise-transformation": {
    slug: "resources/insights/enterprise-transformation",
    eyebrow: "Enterprise Transformation insights",
    title: "Make transformation normal work with measurable value.",
    description: "Understand how transformation intent becomes priorities, operating behavior, adoption ownership, and measurable outcomes.",
    intro: "This topic helps transformation and internal-function leaders evaluate whether change is altering the operating condition or remaining a separate program.",
    seoTitle: "Enterprise Transformation Insights",
    seoDescription: "Explore 120VC thinking about enterprise transformation, internal functions, adoption, and business value.",
    sections: [
      {
        eyebrow: "Start with the condition",
        title: "A transformation has not succeeded because it launched.",
        paragraphs: ["Use this topic to examine whether leaders changed priorities, resource decisions, commitments, adoption ownership, and the normal execution rhythm."],
      },
      {
        eyebrow: "Content governance",
        title: "The topic page is ready for an approved resource inventory.",
        paragraphs: ["[APPROVAL REQUIRED] Add only verified transformation resources with approved claims, working destinations, accurate metadata, and one intentional next-stage CTA."],
      },
    ],
    related: [
      { title: "Transformation Execution", description: "Recognize why change remains active without becoming normal work.", href: "/problems-we-solve/transformation-execution" },
      { title: "Cost Center to Value Engine Assessment", description: "Review the intended internal-function diagnostic path.", href: "/resources/assessments/cost-center-to-value-engine-assessment" },
    ],
    primaryCta: { label: "Understand Transformation Execution", href: "/problems-we-solve/transformation-execution" },
    secondaryCta: { label: "View All Insights", href: "/resources/insights" },
  },

  "resources/insights/ai-and-leadership": {
    slug: "resources/insights/ai-and-leadership",
    eyebrow: "AI and Leadership insights",
    title: "AI can expose the work. Leadership must still own the decision.",
    description: "Examine why agency, judgment, accountability, and coordinated execution remain leadership responsibilities as AI changes how work is performed.",
    intro: "This topic should help leaders separate useful AI capability from the human authority, tradeoffs, commitments, and accountability required to change an enterprise outcome.",
    seoTitle: "AI and Leadership Insights",
    seoDescription: "Explore 120VC thinking about AI, agency, judgment, accountability, and Execution Leadership.",
    sections: [
      {
        eyebrow: "Start with the leadership question",
        title: "More intelligence does not remove the need for ownership.",
        paragraphs: ["Use this topic to examine what AI can accelerate or reveal—and which decisions, consequences, and commitments still require accountable leadership."],
      },
      {
        eyebrow: "Content governance",
        title: "The topic page is ready for an approved resource inventory.",
        paragraphs: ["[APPROVAL REQUIRED] Add only verified AI and leadership resources with approved claims, working destinations, accurate metadata, and one intentional next-stage CTA."],
      },
    ],
    related: [
      { title: "Execution Leadership", description: "Understand the category and the leadership responsibility it names.", href: "/leadership-system/execution-leadership" },
      { title: "1-3-1 Decision Builder", description: "See the method for making one accountable recommendation.", href: "/resources/tools/1-3-1-decision-builder" },
    ],
    primaryCta: { label: "Understand Execution Leadership", href: "/leadership-system/execution-leadership" },
    secondaryCta: { label: "View All Insights", href: "/resources/insights" },
  },

  "resources/insights/practical-leadership-systems": {
    slug: "resources/insights/practical-leadership-systems",
    eyebrow: "Practical Leadership Systems insights",
    title: "Turn leadership principles into operating behavior.",
    description: "Explore practical approaches to prioritization, recommendations, accountability, coaching, focusing, synchronization, and work rationalization.",
    intro: "This topic connects leadership ideas to the shared practices leaders use while real priorities, decisions, dependencies, and outcomes are under pressure.",
    seoTitle: "Practical Leadership Systems Insights",
    seoDescription: "Explore 120VC thinking about practical leadership systems, decisions, priorities, accountability, and execution rhythm.",
    sections: [
      {
        eyebrow: "Start with the operating behavior",
        title: "The value is not the vocabulary. It is the behavior the practice creates.",
        paragraphs: ["Use this topic to understand how tools and operating practices can make priorities, recommendations, commitments, risk, and learning more visible inside live work."],
      },
      {
        eyebrow: "Content governance",
        title: "The topic page is ready for an approved resource inventory.",
        paragraphs: ["[APPROVAL REQUIRED] Add only verified practical-system resources with approved claims, working destinations, accurate metadata, and one intentional next-stage CTA."],
      },
    ],
    related: [
      { title: "Operating Practices", description: "See the methods inside the Execution Leadership System.", href: "/leadership-system/operating-practices" },
      { title: "Execution Leadership Tools", description: "Choose the practical method that matches the next decision.", href: "/resources/tools" },
    ],
    primaryCta: { label: "Explore Operating Practices", href: "/leadership-system/operating-practices" },
    secondaryCta: { label: "View All Insights", href: "/resources/insights" },
  },
} satisfies Record<string, SitePage>);

export const allPages = Object.values(pages);
const firstWaveProblemPreviewHolds = new Set([
  "problems-we-solve/strategy-execution-gap",
  "problems-we-solve/leadership-team-alignment",
  "problems-we-solve/transformation-execution",
  "problems-we-solve/project-portfolio-roi",
  "problems-we-solve/internal-function-performance",
]);
export function pageHasApprovalHold(page: SitePage) {
  return firstWaveProblemPreviewHolds.has(page.slug)
    || JSON.stringify(page).includes("[APPROVAL REQUIRED]")
    || JSON.stringify(page).includes("PLACEHOLDER TESTIMONIAL — NOT APPROVED FOR PUBLICATION");
}
export { problems, solutions, roles };

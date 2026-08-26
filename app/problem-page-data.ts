import type { PageLink } from "./site-data";

export type ProblemPageSlug =
  | "problems-we-solve/strategy-execution-gap"
  | "problems-we-solve/leadership-team-alignment"
  | "problems-we-solve/transformation-execution"
  | "problems-we-solve/project-portfolio-roi"
  | "problems-we-solve/internal-function-performance";

type ProblemImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  position?: string;
};

type ProblemStep = {
  label: string;
  title: string;
  description: string;
};

type ProblemBlock =
  | {
      kind: "signals";
      eyebrow: string;
      title: string;
      intro?: string;
      items: string[];
    }
  | {
      kind: "contrast";
      eyebrow: string;
      title: string;
      intro?: string;
      columns: Array<{ label: string; title: string; items: string[] }>;
    }
  | {
      kind: "sequence";
      eyebrow: string;
      title: string;
      intro?: string;
      steps: ProblemStep[];
    }
  | {
      kind: "media-sequence";
      eyebrow: string;
      title: string;
      intro: string;
      items: Array<ProblemImage & { label: string; title: string }>;
    }
  | {
      kind: "decision-board";
      eyebrow: string;
      title: string;
      intro: string;
      decisions: Array<{ action: string; question: string; description: string }>;
    }
  | {
      kind: "pillars";
      eyebrow: string;
      title: string;
      intro: string;
      pillars: Array<{ label: string; title: string; description: string }>;
    }
  | {
      kind: "statement";
      eyebrow: string;
      title: string;
      body: string;
      statement: string;
    }
  | {
      kind: "outcome";
      eyebrow: string;
      title: string;
      body: string;
      image: ProblemImage;
      markers: string[];
    }
  | {
      kind: "links";
      eyebrow: string;
      title: string;
      intro: string;
      spotlight?: boolean;
      links: PageLink[];
    };

export type BookLeadConfig = {
  eyebrow: string;
  title: string;
  description: string;
  learn: string[];
  sourcePage: string;
  sourceCta: string;
  nextStep: PageLink;
};

export type ProblemPageConfig = {
  slug: ProblemPageSlug;
  variant: "strategy" | "alignment" | "transformation" | "portfolio" | "function";
  eyebrow: string;
  title: string;
  description: string;
  buyer: string;
  question: string;
  tension: string;
  proofNeeded: string;
  nextStep: string;
  heroImage: ProblemImage;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  diagnostic: Array<{ label: string; value: string }>;
  blocks: ProblemBlock[];
  testimonial: {
    quote: string;
    name: string;
    role: string;
    company: string;
  };
  bookLead?: BookLeadConfig;
  bookAfterBlock?: number;
};

export const problemHubCards = [
  {
    number: "01",
    cue: "Strategy is approved, but daily work keeps drifting.",
    title: "Strategy is not becoming execution",
    description: "Find where intent is being diluted across priorities, decisions, capacity, and commitments.",
    href: "/problems-we-solve/strategy-execution-gap",
  },
  {
    number: "02",
    cue: "Leaders agree in the room, then optimize separately.",
    title: "The leadership team is not operating as one",
    description: "See why capable executives still produce slow decisions and unreliable shared commitments.",
    href: "/problems-we-solve/leadership-team-alignment",
  },
  {
    number: "03",
    cue: "The program is active, but behavior has not changed.",
    title: "Transformation is not becoming normal work",
    description: "Recognize the gap between a healthy launch and durable adoption owned by leadership.",
    href: "/problems-we-solve/transformation-execution",
  },
  {
    number: "04",
    cue: "Status is visible, but continued investment is hard to defend.",
    title: "The portfolio is busy but return is unclear",
    description: "Move from project reporting to explicit stop, reshape, accelerate, and funding decisions.",
    href: "/problems-we-solve/project-portfolio-roi",
  },
  {
    number: "05",
    cue: "The function is necessary, overloaded, and still treated as a cost center.",
    title: "An internal function cannot prove its value",
    description: "Shift from reactive demand to recommendations and measurable business outcomes.",
    href: "/problems-we-solve/internal-function-performance",
  },
] as const;

export const problemPageConfigs: Record<ProblemPageSlug, ProblemPageConfig> = {
  "problems-we-solve/strategy-execution-gap": {
    slug: "problems-we-solve/strategy-execution-gap",
    variant: "strategy",
    eyebrow: "The strategy execution gap",
    title: "Why clear strategy still fragments.",
    description: "Executive intent loses force when priorities, decisions, capacity, and commitments are translated differently across the organization.",
    buyer: "CEO, COO, strategy leader, or enterprise sponsor with an approved direction that is not changing daily work",
    question: "Why does a clear strategy keep losing force after leadership agrees?",
    tension: "Capable leaders keep rescuing work while the organization absorbs competing interpretations and reopened decisions.",
    proofNeeded: "An approved case with a baseline, period, operating shift, business outcome, and clear attribution boundaries.",
    nextStep: "Start with the book if you are framing the problem. Explore the Execution Leadership System when you are ready to see how the operating model changes.",
    heroImage: {
      src: "/images/problems/strategy-overload.jpg",
      alt: "A seated professional closes his eyes while several colleagues extend papers, a tablet, and a coffee toward him.",
      width: 1800,
      height: 1200,
      caption: "Illustrative stock: executive intent competing with incoming work.",
      position: "50% 48%",
    },
    primaryCta: { label: "See how the system works", href: "/leadership-system" },
    secondaryCta: { label: "Book a leadership consultation", href: "/consultation" },
    diagnostic: [
      { label: "Visible condition", value: "Strategy is approved but not changing daily work" },
      { label: "Human consequence", value: "Leaders become the rescue system" },
      { label: "First operating shift", value: "Priorities and tradeoffs become explicit" },
    ],
    blocks: [
      {
        kind: "contrast",
        eyebrow: "Where the gap opens",
        title: "The breakdown begins after agreement.",
        intro: "The strategy can be sound and the team can be capable. The loss happens in translation.",
        columns: [
          {
            label: "What leadership decided",
            title: "One enterprise direction",
            items: ["A defined outcome", "A small set of priorities", "A deliberate allocation of attention and capital"],
          },
          {
            label: "What the organization receives",
            title: "Competing local interpretations",
            items: ["New work without stopped work", "Reopened decisions", "Dependencies without clear authority"],
          },
        ],
      },
      {
        kind: "signals",
        eyebrow: "What it looks like",
        title: "Strategy becomes one more demand competing for attention.",
        items: [
          "Functions translate the same direction into different plans.",
          "Meetings report status without resolving tradeoffs.",
          "New requests enter while old commitments remain.",
          "Leaders personally integrate work the operating system should carry.",
        ],
      },
      {
        kind: "statement",
        eyebrow: "Why familiar fixes stall",
        title: "More tools cannot replace execution rules.",
        body: "Dashboards can reveal drift. Training can add knowledge. Talent can add capability. None of them decides what matters, which work stops, who owns the commitment, or how a decision will hold under pressure.",
        statement: "The investments perform better when one leadership system connects them to the work.",
      },
      {
        kind: "sequence",
        eyebrow: "What changes",
        title: "Turn intent into work that can hold.",
        intro: "The system makes each translation visible before pressure turns it into drift.",
        steps: [
          { label: "Intent", title: "Name the condition", description: "Define the outcome at risk and the business reality leadership is trying to change." },
          { label: "Priorities", title: "Make the tradeoff", description: "Decide which work deserves capacity now—and which work does not." },
          { label: "Commitment", title: "Hold the decision", description: "Clarify authority, ownership, dependencies, dates, and success conditions." },
          { label: "Execution", title: "Surface reality early", description: "Use a rhythm that exposes risk soon enough to change the outcome." },
        ],
      },
      {
        kind: "outcome",
        eyebrow: "The desired condition",
        title: "Make the plan an operating reality.",
        body: "The goal is not perfect certainty. It is an organization that can keep priorities, decisions, and commitments coherent while the work changes.",
        image: {
          src: "/images/problems/strategy-conversation.jpg",
          alt: "Colleagues discuss a plan beside a board displaying charts.",
          width: 1800,
          height: 1201,
          caption: "Illustrative stock: a plan being worked through together, not client proof.",
          position: "50% 50%",
        },
        markers: ["One direction", "Visible tradeoffs", "Owned commitments"],
      },
    ],
    testimonial: {
      quote: "We stopped treating approval as execution. The shift was making priorities, tradeoffs, and ownership visible in the work.",
      name: "Placeholder Name",
      role: "Placeholder COO",
      company: "Placeholder Enterprise Company",
    },
    bookAfterBlock: 2,
    bookLead: {
      eyebrow: "A useful first step",
      title: "Close the gap before it widens.",
      description: "The Strategy Execution Gap helps leaders see why sound decisions lose force—and what must connect intent to delivery.",
      learn: ["Locate where intent is being diluted", "Replace status activity with executable decisions", "Create operating conditions that can hold under pressure"],
      sourcePage: "strategy-execution-gap",
      sourceCta: "problem-book",
      nextStep: { title: "See the Execution Leadership System", description: "Continue from the problem to the system installed inside live work.", href: "/leadership-system" },
    },
  },

  "problems-we-solve/leadership-team-alignment": {
    slug: "problems-we-solve/leadership-team-alignment",
    variant: "alignment",
    eyebrow: "Leadership team alignment",
    title: "Strong executives. Separate functions.",
    description: "A senior team can be intelligent, experienced, and committed—and still lack shared rules for enterprise decisions and commitments.",
    buyer: "CEO, COO, CHRO, or executive sponsor whose senior leaders agree in meetings but fragment afterward",
    question: "Is this a people problem, or is the team missing a shared system for decisions and commitments?",
    tension: "The sponsor becomes the integration layer while conflict moves offline and the same decisions reopen.",
    proofNeeded: "Approved evidence that decisions held, commitments became reliable, and productive challenge improved cross-functional execution.",
    nextStep: "See how a senior team replaces polite agreement with decisions and commitments that hold beyond the meeting.",
    heroImage: {
      src: "/images/problems/alignment-friction.jpg",
      alt: "A woman at the head of a meeting holds her temples while colleagues argue in the foreground.",
      width: 1800,
      height: 1200,
      caption: "Illustrative stock: agreement has not become coordinated commitment.",
      position: "50% 52%",
    },
    primaryCta: { label: "Explore leadership team transformation", href: "/transformation-leadership-team-development-coaching-and-program" },
    secondaryCta: { label: "See how the system works", href: "/leadership-system" },
    diagnostic: [
      { label: "Visible condition", value: "Agreement in the room; fragmentation after it" },
      { label: "Human consequence", value: "The sponsor becomes the integration layer" },
      { label: "First operating shift", value: "One commitment holds outside the meeting" },
    ],
    blocks: [
      {
        kind: "contrast",
        eyebrow: "The alignment illusion",
        title: "Agreement in the room can hide drift after it.",
        columns: [
          { label: "Inside the meeting", title: "The language sounds aligned", items: ["Everyone supports the priority", "The decision appears closed", "Ownership sounds clear"] },
          { label: "After the meeting", title: "The operating reality separates", items: ["Functions protect local commitments", "Conflict moves offline", "The sponsor resolves every dependency"] },
        ],
      },
      {
        kind: "signals",
        eyebrow: "The calendar tells the truth",
        title: "Watch what the team repeatedly has to revisit.",
        items: [
          "The same issue returns without a durable decision.",
          "Functional updates crowd out enterprise tradeoffs.",
          "Commitments are interpreted differently afterward.",
          "Disagreement becomes avoidance instead of productive challenge.",
        ],
      },
      {
        kind: "sequence",
        eyebrow: "What alignment really requires",
        title: "Alignment is coordinated commitment—not harmony.",
        steps: [
          { label: "Challenge", title: "Make tension useful", description: "Bring the relevant disagreement into the decision while it can still improve the outcome." },
          { label: "Decide", title: "Close the question", description: "Name who recommends, who decides, and when the team moves from debate to action." },
          { label: "Commit", title: "Leave with one meaning", description: "Make ownership, dependencies, dates, and success conditions visible to everyone." },
        ],
      },
      {
        kind: "outcome",
        eyebrow: "The desired condition",
        title: "Make the team the operating system.",
        body: "Strong leaders can disagree honestly and still execute one decision. The objective is not less tension; it is a team that uses tension before execution instead of carrying it into the work.",
        image: {
          src: "/images/problems/alignment-outcome.jpg",
          alt: "Senior professionals seated around a table applaud during a meeting.",
          width: 1800,
          height: 1200,
          caption: "Illustrative stock: coordinated team energy, not a documented client outcome.",
          position: "50% 50%",
        },
        markers: ["Productive challenge", "Closed decisions", "Shared ownership"],
      },
    ],
    testimonial: {
      quote: "The team did not need artificial agreement. We needed one decision to survive contact with the rest of the organization.",
      name: "Placeholder Name",
      role: "Placeholder Senior-Team Sponsor",
      company: "Placeholder Enterprise Company",
    },
  },

  "problems-we-solve/transformation-execution": {
    slug: "problems-we-solve/transformation-execution",
    variant: "transformation",
    eyebrow: "Transformation execution",
    title: "A launch is not a transformation.",
    description: "Change becomes real only when leaders alter priorities, resources, commitments, adoption ownership, and normal operating behavior.",
    buyer: "Chief Transformation Officer, CIO, COO, or sponsor whose program is active but not becoming normal work",
    question: "How does change stop depending on the transformation office to keep pushing it?",
    tension: "Green reporting sits beside fatigue, uneven adoption, and the fear that benefits will disappear when program pressure lifts.",
    proofNeeded: "Approved sponsor-behavior changes, adoption evidence, measured benefits, timeframe, and attribution limits.",
    nextStep: "See how sponsors turn launch activity into operating behavior that can survive without constant program pressure.",
    heroImage: {
      src: "/images/problems/transformation-fatigue.jpg",
      alt: "Coworkers around laptops show visible frustration while a virtual-reality headset rests on the table.",
      width: 1800,
      height: 1201,
      caption: "Illustrative stock: change fatigue while work continues.",
      position: "50% 48%",
    },
    primaryCta: { label: "Explore enterprise transformation", href: "/enterprise-digital-transformation" },
    secondaryCta: { label: "Book a leadership consultation", href: "/consultation" },
    diagnostic: [
      { label: "Visible condition", value: "Green reporting with weak operating change" },
      { label: "Human consequence", value: "Fatigue, cynicism, and uneven adoption" },
      { label: "First operating shift", value: "A sponsor changes a priority or resource decision" },
    ],
    blocks: [
      {
        kind: "signals",
        eyebrow: "Transformation theater",
        title: "Green status can hide unchanged behavior.",
        items: [
          "Sponsors support the idea without changing operating behavior.",
          "Existing work repeatedly displaces transformation priorities.",
          "Functions adopt at different speeds with no shared consequence.",
          "Momentum still depends on the transformation office pushing.",
        ],
      },
      {
        kind: "media-sequence",
        eyebrow: "The adoption journey",
        title: "Move from launch to normal work.",
        intro: "A transformation must cross three distinct conditions. Activity in one does not prove arrival at the next.",
        items: [
          {
            label: "01 · Launch",
            title: "Energy and visible activity",
            src: "/images/problems/transformation-outcome.jpg",
            alt: "Colleagues smile and talk around project plans at a table.",
            width: 1800,
            height: 1200,
            caption: "Illustrative stock: launch energy.",
            position: "50% 50%",
          },
          {
            label: "02 · Adoption friction",
            title: "Old priorities still win",
            src: "/images/story/execution-friction.jpg",
            alt: "Colleagues work through a difficult discussion around a shared table.",
            width: 1600,
            height: 1066,
            caption: "Illustrative stock: adoption friction entering the work.",
            position: "50% 50%",
          },
          {
            label: "03 · Normal work",
            title: "Leadership owns the new condition",
            src: "/images/story/team-working-together.jpg",
            alt: "Colleagues work together around a table with laptops and shared materials.",
            width: 1800,
            height: 1008,
            caption: "Illustrative stock: change integrated into the work.",
            position: "50% 50%",
          },
        ],
      },
      {
        kind: "sequence",
        eyebrow: "Sponsor behavior",
        title: "Sponsors make adoption possible—or optional.",
        steps: [
          { label: "Priority", title: "Protect the change", description: "Remove or reshape competing work instead of asking the transformation to absorb it." },
          { label: "Ownership", title: "Name who changes behavior", description: "Place adoption with the leaders who own the operating condition, not only the program team." },
          { label: "Rhythm", title: "Review operating reality", description: "Use decisions, commitments, and observed behavior—not deliverables alone—to judge progress." },
        ],
      },
      {
        kind: "statement",
        eyebrow: "The durable condition",
        title: "The transformation office should not be the permanent engine.",
        body: "120VC connects transformation intent to work rationalization, resource tradeoffs, adoption ownership, cross-functional dependencies, and outcome measurement.",
        statement: "The change becomes how leadership operates—not an initiative leadership occasionally reviews.",
      },
    ],
    testimonial: {
      quote: "The program stopped being something the transformation office pushed and became how sponsors made tradeoffs.",
      name: "Placeholder Name",
      role: "Placeholder Chief Transformation Officer",
      company: "Placeholder Enterprise Company",
    },
    bookAfterBlock: 1,
    bookLead: {
      eyebrow: "For the sponsor framing the gap",
      title: "Make change survive the launch.",
      description: "The Strategy Execution Gap explains why a strong decision can still fail to become coordinated delivery—and what leadership must connect.",
      learn: ["Separate launch activity from operating change", "See where competing priorities weaken adoption", "Give sponsors a clearer execution language"],
      sourcePage: "transformation-execution",
      sourceCta: "transformation-book",
      nextStep: { title: "Explore Enterprise Transformation", description: "See how the system is installed where change must become normal work.", href: "/enterprise-digital-transformation" },
    },
  },

  "problems-we-solve/project-portfolio-roi": {
    slug: "problems-we-solve/project-portfolio-roi",
    variant: "portfolio",
    eyebrow: "Project portfolio ROI",
    title: "A well-reported portfolio can still be poorly invested.",
    description: "Schedules and dashboards describe activity. Leaders still need a defensible way to stop, reshape, accelerate, and continue funding work.",
    buyer: "CFO, COO, PMO leader, or portfolio sponsor with too much work and weak continued-investment logic",
    question: "Are we managing projects—or making defensible investment decisions?",
    tension: "Leaders can see activity but still face waste anxiety, political risk, and decision paralysis around protected work.",
    proofNeeded: "A transparent audit method, capacity and investment baseline, documented decisions, measured effect, and explicit limitations.",
    nextStep: "See how leaders challenge, reshape, stop, or protect work through an explicit portfolio investment discipline.",
    heroImage: {
      src: "/images/problems/portfolio-review.jpg",
      alt: "Three senior professionals review reports in front of a wall display of charts.",
      width: 1201,
      height: 1800,
      caption: "Illustrative stock: abundant reporting without an obvious investment decision.",
      position: "50% 45%",
    },
    primaryCta: { label: "Explore portfolio ROI services", href: "/roi-driven-project-portfolio-services" },
    secondaryCta: { label: "See the measurement method", href: "/results/methodology" },
    diagnostic: [
      { label: "Visible condition", value: "Many initiatives; weak return logic" },
      { label: "Business consequence", value: "Capacity fragmentation and protected waste" },
      { label: "First operating shift", value: "A project is challenged, reshaped, or stopped" },
    ],
    blocks: [
      {
        kind: "contrast",
        eyebrow: "Reported versus invested",
        title: "Reporting is not an investment decision.",
        columns: [
          { label: "Project view", title: "Can the work be delivered?", items: ["Schedule and milestone status", "Budget and risk", "Resource plan"] },
          { label: "Portfolio view", title: "Should the work keep receiving support?", items: ["Strategic relevance", "Expected outcome and evidence", "Opportunity cost and capacity"] },
        ],
      },
      {
        kind: "decision-board",
        eyebrow: "The portfolio decision board",
        title: "Every initiative needs a next decision.",
        intro: "The first value is not a guaranteed recovery claim. It is a clearer, inspectable choice about scarce time, talent, attention, and capital.",
        decisions: [
          { action: "Continue", question: "Is the case still sound?", description: "Keep support when relevance, evidence, capacity, and expected outcome remain credible." },
          { action: "Accelerate", question: "What deserves protection?", description: "Increase attention when the value is high and dependencies can support the move." },
          { action: "Reshape", question: "Can the case be made stronger?", description: "Change scope, sequence, ownership, or investment logic before more capacity is consumed." },
          { action: "Stop", question: "What should no longer exist?", description: "Release capacity when the work is duplicative, weak, or no longer connected to the outcome." },
        ],
      },
      {
        kind: "outcome",
        eyebrow: "The desired condition",
        title: "Make funding a leadership decision.",
        body: "A stronger portfolio helps leaders protect the highest-value work while making the cost of every competing initiative visible.",
        image: {
          src: "/images/problems/portfolio-outcome.jpg",
          alt: "Business leaders review documents together around a conference table.",
          width: 1800,
          height: 1200,
          caption: "Illustrative stock: leaders evaluating work together, not a measured portfolio result.",
          position: "50% 50%",
        },
        markers: ["Visible logic", "Deliberate capacity", "Recorded decisions"],
      },
      {
        kind: "links",
        eyebrow: "Choose the useful next lens",
        title: "Continue with the decision you need to make.",
        intro: "Choose the next lens that matches the decision in front of you.",
        spotlight: true,
        links: [
          { title: "Portfolio ROI Services", description: "See the audit, rationalization, governance, and embedded leadership path.", href: "/roi-driven-project-portfolio-services" },
          { title: "Measurement Methodology", description: "See how definitions, baselines, periods, and attribution should govern proof.", href: "/results/methodology" },
          { title: "Portfolio ROI Diagnostic", description: "Review the intended portfolio questions and activation status before the assessment is released.", href: "/resources/assessments/portfolio-roi-diagnostic" },
        ],
      },
    ],
    testimonial: {
      quote: "The most valuable result was not another dashboard. It was a defensible decision about what to stop, reshape, and protect.",
      name: "Placeholder Name",
      role: "Placeholder CFO or PMO Leader",
      company: "Placeholder Enterprise Company",
    },
  },

  "problems-we-solve/internal-function-performance": {
    slug: "problems-we-solve/internal-function-performance",
    variant: "function",
    eyebrow: "Internal function performance",
    title: "When a necessary function becomes a cost center.",
    description: "HR, IT, Finance, PMO, and shared services earn strategic standing by improving decisions and measurable business outcomes—not by processing more demand.",
    buyer: "CIO, CHRO, CFO, PMO, or shared-services leader trapped as a reactive order taker",
    question: "How does the function become a credible business-value partner?",
    tension: "Necessary work keeps arriving, trust stays low, and the team cannot show how activity changes customer, team, or financial outcomes.",
    proofNeeded: "Approved before-and-after demand framing, documented recommendations, outcome measures, and an attributed business-partner quote.",
    nextStep: "See how an internal function moves from reactive demand to recommendations and measurable business outcomes.",
    heroImage: {
      src: "/images/problems/function-overload.jpg",
      alt: "A seated professional holds her temples while colleagues point toward her and a tablet of charts rests on the desk.",
      width: 1066,
      height: 1600,
      caption: "Illustrative stock: reactive demand converging on one internal leader.",
      position: "50% 42%",
    },
    primaryCta: { label: "Explore enterprise transformation", href: "/enterprise-digital-transformation" },
    secondaryCta: { label: "See the Three Pillars", href: "/leadership-system/three-pillars" },
    diagnostic: [
      { label: "Visible condition", value: "Reactive demand with weak outcome ownership" },
      { label: "Human consequence", value: "Overload, defensiveness, and low trust" },
      { label: "First operating shift", value: "The function recommends a better decision" },
    ],
    blocks: [
      {
        kind: "signals",
        eyebrow: "The request trap",
        title: "Reactive demand keeps the function small.",
        items: [
          "Requests arrive as instructions instead of business conditions.",
          "Activity and responsiveness substitute for outcome ownership.",
          "Hidden commitments make capacity impossible to explain.",
          "The function forwards demand instead of recommending a better decision.",
        ],
      },
      {
        kind: "sequence",
        eyebrow: "The operating shift",
        title: "Move from request to recommendation to outcome.",
        steps: [
          { label: "Request", title: "Clarify the business condition", description: "Ask what must change, for whom, by when, and why it matters before accepting the requested solution." },
          { label: "Recommendation", title: "Lead the tradeoff", description: "Use expertise to recommend what should happen, what should wait, and what the business must own." },
          { label: "Outcome", title: "Measure the effect", description: "Connect the work to observable customer, team, and financial changes." },
        ],
      },
      {
        kind: "pillars",
        eyebrow: "The value standard",
        title: "Prove value in three directions.",
        intro: "The function becomes more strategic when it can show how a recommendation improves the business—not only how efficiently the task was completed.",
        pillars: [
          { label: "Customer", title: "A better experience or result", description: "Show how the work changes service, quality, speed, trust, or another relevant customer condition." },
          { label: "Team", title: "A stronger operating condition", description: "Show how clarity, capability, ownership, or coordination improves for the people doing the work." },
          { label: "Financial", title: "A defensible business effect", description: "Show how the outcome protects value, reduces waste, improves return, or supports profitable performance." },
        ],
      },
      {
        kind: "outcome",
        eyebrow: "The desired condition",
        title: "Become the partner who improves the decision.",
        body: "Technology can support the shift. It cannot lead it. Strategic standing grows when the function frames demand, recommends a path, and owns the business result with its internal customer.",
        image: {
          src: "/images/problems/function-outcome.jpg",
          alt: "A gray-haired woman sits at a laptop in a sunlit office with a vivid blue wall.",
          width: 1066,
          height: 1600,
          caption: "Illustrative stock: a confident internal leader, not a 120VC client portrait.",
          position: "50% 44%",
        },
        markers: ["Business framing", "Expert recommendation", "Owned outcome"],
      },
    ],
    testimonial: {
      quote: "We moved from forwarding requests to recommending the business decision—and could finally show what changed.",
      name: "Placeholder Name",
      role: "Placeholder Internal-Function Executive",
      company: "Placeholder Enterprise Company",
    },
  },
};

export const problemPreviewHoldSlugs = new Set<ProblemPageSlug>(Object.keys(problemPageConfigs) as ProblemPageSlug[]);

export function isProblemPageSlug(slug: string): slug is ProblemPageSlug {
  return slug in problemPageConfigs;
}

export type MediaItem = {
  src: string;
  alt: string;
  title: string;
  caption: string;
  objectPosition?: string;
};

export type CertificateItem = {
  label: string;
  title?: string;
  href: string;
  type: "Image" | "PDF";
  alt?: string;
  rotate?: boolean;
};

export type CaseStudyMedia = {
  src: string;
  alt: string;
  title: string;
  caption: string;
  contain?: boolean;
};

export type CaseStudyStage = {
  number: string;
  title: string;
  summary: string;
  points: string[];
  media?: CaseStudyMedia[];
};

export const portucanaPhotos: MediaItem[] = [
  {
    src: "/photos/optimized/portucana-construction.webp",
    alt: "Malhar Mahajan holding a co-op recognition certificate with members of the Portucana team.",
    title: "Co-op Recognition",
    caption: "Recognition at the completion of a hands-on systems and data co-op.",
    objectPosition: "center 38%",
  },
  {
    src: "/photos/optimized/portucana-team-01.webp",
    alt: "Malhar Mahajan visiting a Portucana construction project in Halifax while wearing site safety equipment.",
    title: "Inside the Industry",
    caption: "Connecting internal technology work with the company’s real operating environment.",
    objectPosition: "center 48%",
  },
  {
    src: "/photos/optimized/portucana-team-02.webp",
    alt: "Malhar Mahajan with Portucana team members during co-op recognition.",
    title: "Portucana Team",
    caption: "Celebrating the people, collaboration, and practical work behind the co-op.",
    objectPosition: "center 40%",
  },
];

export const myWorshipMedia: MediaItem[] = [
  {
    src: "/photos/optimized/worship-mobile.webp",
    alt: "Mobile MyWorship dashboard showing notifications, member activity, and upcoming church events.",
    title: "MyWorship Platform",
    caption: "The mobile experience for church activity, notifications, and upcoming events.",
  },
  {
    src: "/photos/optimized/worship-dashboard.webp",
    alt: "MyWorship administrator dashboard showing engagement analytics, quick actions, notifications, and transaction records.",
    title: "Admin Dashboard",
    caption: "An administrative workspace for engagement, events, members, and operational activity.",
  },
  {
    src: "/photos/optimized/worship-certificate.webp",
    alt: "MyWorship appreciation letter recognizing Malhar Mahajan's backend support and collaboration.",
    title: "Recognition & Completion",
    caption: "Recognition for backend support, product collaboration, and contributions to the team.",
  },
];

export const tennisPhotos: MediaItem[] = [
  {
    src: "/photos/optimized/tennis-match-01.webp",
    alt: "Malhar Mahajan during a tennis match in Halifax.",
    title: "Match Day",
    caption: "A day on court in Halifax.",
  },
  {
    src: "/photos/optimized/tennis-match-02.webp",
    alt: "Malhar Mahajan on court during a competitive tennis match.",
    title: "On Court",
    caption: "Still finding time to play during university.",
  },
  {
    src: "/photos/optimized/tennis-match-03.webp",
    alt: "Malhar Mahajan standing with another player and their rackets on an indoor tennis court.",
    title: "Still Playing",
    caption: "A sport that has stayed with me since childhood.",
  },
];

export const bullishAiMedia: MediaItem[] = [
  {
    src: "/photos/optimized/bullishai-home.webp",
    alt: "BullishAI home page with a live market ticker, product introduction, dashboard launch, and AI prompt.",
    title: "BullishAI Home",
    caption: "The main entry point for real-time portfolio tracking and AI-driven market insights.",
  },
  {
    src: "/photos/optimized/bullishai-ai-powered.webp",
    alt: "BullishAI market signals dashboard with a market pulse ring, AI confidence meters, live trade radar, weather forecast, and sector rotation.",
    title: "AI Market Signals",
    caption: "Live market context, confidence readings, trade signals, and sector movement in one view.",
  },
  {
    src: "/photos/optimized/bullishai-analysis.webp",
    alt: "BullishAI analysis hub with quick insights, recommended stocks, technical analysis, research, and stock discovery tools.",
    title: "AI-Powered Analysis",
    caption: "Focused AI tools for research, recommendations, analysis, and stock discovery.",
  },
  {
    src: "/photos/optimized/bullishai-heatmap.webp",
    alt: "BullishAI market heatmap showing the performance of companies grouped across major market sectors.",
    title: "Market Heatmap",
    caption: "A visual overview of market movement across companies and sectors.",
  },
  {
    src: "/photos/optimized/bullishai-portfolio.webp",
    alt: "BullishAI portfolio screen showing total value, returns, holdings, timeframe controls, and a historical value chart.",
    title: "Portfolio Analytics",
    caption: "Holdings, returns, cost basis, and historical portfolio performance in one dashboard.",
  },
  {
    src: "/photos/optimized/bullishai-usa-canada.webp",
    alt: "BullishAI live market preview with USA and Canada controls, stock charts, current pricing, and market stories.",
    title: "USA & Canada Markets",
    caption: "Interactive market views combining stock charts, current prices, and relevant news.",
  },
  {
    src: "/photos/optimized/bullishai-watchlist.webp",
    alt: "BullishAI watchlist showing tracked stock symbols, prices, daily changes, actions, and a selected-stock chart.",
    title: "Stock Watchlist",
    caption: "A personalized watchlist for monitoring selected stocks and their latest movement.",
  },
];

export const portucanaTags = [
  "Power Apps",
  "Power Automate",
  "SharePoint",
  "Microsoft 365",
  "Business Analysis",
  "Process Automation",
  "System Testing",
  "Technical Documentation",
];

export const certificateLinks: CertificateItem[] = [
  {
    label: "Certificate of Awesomeness",
    href: "/photos/Portucana/Awesome%20certificate.jpg",
    type: "Image",
    alt: "Certificate of Awesomeness awarded to Malhar Mahajan.",
    rotate: true,
  },
  {
    label: "Certificate of Appreciation",
    href: "/photos/Portucana/Appriciation%20certificate.pdf",
    type: "PDF",
  },
];

export const caseStudyStages: CaseStudyStage[] = [
  {
    number: "01",
    title: "Understanding the Business Problem",
    summary:
      "The work began with operational conversations—not a predetermined technical answer. Requirements were translated into clear roles, rules, states, and edge cases before the solution was iterated with business leadership.",
    points: [
      "Mapped how employees, managers, and administrators needed to interact with the process.",
      "Converted leave policies and approval rules into application behaviour.",
      "Reviewed ideas with stakeholders and refined the system around real operating needs.",
    ],
  },
  {
    number: "02",
    title: "Designing the Data Foundation",
    summary:
      "SharePoint served as the business data layer for employee balances, time-off requests, approved calendar records, manager relationships, and processing state.",
    points: [
      "Tracked approval, calendar, cancellation, and balance-return states to prevent duplicate processing.",
      "Kept annual eligibility, usage, remaining balance, and leave year connected to each employee record.",
      "Designed state checks so retries and downstream automation could remain consistent.",
    ],
  },
  {
    number: "03",
    title: "Building the Employee Experience",
    summary:
      "The Power Apps interface gave employees a clear path from selecting leave through submission, status tracking, approved-request review, and cancellation.",
    points: [
      "Supported Vacation and Sick/PTO, multiple dates, full days, and AM/PM half days.",
      "Handled comments, selected-date summaries, request history, and approval status.",
      "Accounted for leave-type and calendar-year boundaries in the request experience.",
    ],
  },
  {
    number: "04",
    title: "Manager & Administrator Workflows",
    summary:
      "Different roles required different views and actions: manager-specific approvals, direct time-off entry, employee setup, request detail, and cancellation processing.",
    points: [
      "Connected employee and manager relationships to role-appropriate request visibility.",
      "Supported approve/reject decisions and direct manager or administrator entry.",
      "Provided annual employee setup for Vacation and Sick/PTO eligibility.",
    ],
  },
  {
    number: "05",
    title: "Automation & State Processing",
    summary:
      "Multiple Power Automate workflows connected Power Apps, SharePoint, Outlook, Teams, email, approvals, and balance calculations.",
    points: [
      "Used conditions, loops, SharePoint reads and writes, and explicit state checks.",
      "Separated downstream concerns such as notifications and calendar processing.",
      "Returned structured results to Power Apps where interactive flows required them.",
    ],
  },
  {
    number: "06",
    title: "Leave Balances, Calendar & Cancellation Integrity",
    summary:
      "A request could span multiple dates, each with a full-day or half-day value. Approval and cancellation had to preserve the correct total across balances and calendar representations.",
    points: [
      "Calculated day values across full-day, AM half-day, and PM half-day entries.",
      "Supported cancellation of one approved day or an entire approved request.",
      "Returned the applicable balance and guarded against duplicate calendar or refund processing.",
    ],
  },
  {
    number: "07",
    title: "Automated Communications",
    summary:
      "Structured email and Teams communications kept employees, managers, and administrators informed as each request moved through the process.",
    points: [
      "Covered submission, approval, rejection, cancellation, and manager-entered time off.",
      "Included request summaries, dates, leave type, result, and the relevant next action.",
      "Used separate messages for different audiences without exposing internal data publicly.",
    ],
  },
  {
    number: "08",
    title: "Microsoft 365 Migration & Administration",
    summary:
      "The co-op also included supporting Portucana’s transition from Google Workspace and Gmail to Outlook and Microsoft 365.",
    points: [
      "Worked on mailbox, calendar, and contact migration, migration batches, and authentication issues.",
      "Supported shared mailboxes, shared calendars, users, groups, permissions, and licences.",
      "Configured and troubleshot administrative settings, DNS, and MX-record changes collaboratively.",
    ],
  },
  {
    number: "09",
    title: "Data & AI Exploration",
    summary:
      "Exploratory work considered how operational information could become more visible, searchable, and useful without presenting prototypes as production deployments.",
    points: [
      "Explored Power BI and QuickBooks data for business reporting possibilities.",
      "Investigated information-retrieval and RAG concepts for company knowledge.",
      "Focused on practical access to information rather than novelty for its own sake.",
    ],
  },
  {
    number: "10",
    title: "Testing, Documentation & Reliability",
    summary:
      "Because the portal was intended for real internal operations, reliability work was a core part of development rather than a final polish step.",
    points: [
      "Tested happy paths, edge cases, invalid states, retries, and role-specific behaviour.",
      "Debugged workflows and retested changes against business rules and stakeholder feedback.",
      "Documented processes and troubleshooting knowledge to support maintainability.",
    ],
  },
];

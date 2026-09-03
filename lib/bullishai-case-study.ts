import type { CaseStudyMedia, MediaItem } from "@/lib/portfolio-data";

export type BullishAiMedia = CaseStudyMedia & {
  width: number;
  height: number;
};

export const bullishAiCaseStudyMedia = {
  home: {
    src: "/photos/bullishai/BullishAi%20home.png",
    alt: "Dark BullishAI home interface with a live market ticker, navigation, product introduction, dashboard actions, and AI prompt.",
    title: "BullishAI Home",
    caption: "The main entry point into BullishAI, combining live market information, portfolio access, search, and the AI experience.",
    width: 3024,
    height: 1742,
  },
  markets: {
    src: "/photos/bullishai/Usa%20Can%20market.png",
    alt: "BullishAI live market preview showing U.S. and Canadian market controls, a stock chart, current pricing, and top market stories.",
    title: "USA & Canada Markets",
    caption: "Interactive market views for U.S. and Canadian stocks combining pricing, charts, market selection, and current stories.",
    width: 3024,
    height: 1736,
  },
  signals: {
    src: "/photos/bullishai/Ai%20powered.png",
    alt: "BullishAI Market Signals dashboard showing market pulse, AI confidence, activity signals, market conditions, and sector rotation.",
    title: "Market Signals",
    caption: "A broader market-intelligence view combining market pulse, confidence context, activity signals, market conditions, and sector rotation.",
    width: 3024,
    height: 1736,
  },
  heatmap: {
    src: "/photos/bullishai/Market%20heatmap.png",
    alt: "BullishAI market heatmap showing company performance grouped across major market sectors.",
    title: "Market Heatmap",
    caption: "A sector-oriented market view that makes broad market movement easier to scan across individual companies and industries.",
    width: 3024,
    height: 1732,
  },
  aiAnalysis: {
    src: "/photos/bullishai/AI%20powered%20analysis.png",
    alt: "BullishAI AI-Powered Analysis hub showing quick insights, recommended stocks, technical analysis, stock research, value, momentum, and rebound tools.",
    title: "AI-Powered Analysis Hub",
    caption: "The starting point for BullishAI's analysis tools, including quick insights, recommended stocks, technical analysis, stock research, value, momentum, and rebound workflows.",
    width: 3024,
    height: 1738,
  },
  recommended: {
    src: "/photos/bullishai/Ai%20todays%20recommended%20stocks.png",
    alt: "BullishAI recommended-stocks screen showing a grid of stock candidates with price movement, scores, and analysis tags.",
    title: "Today's Recommended Stocks",
    caption: "A dynamically generated set of market candidates with prices, market movement, scoring context, and reason tags.",
    width: 3024,
    height: 1728,
  },
  value: {
    src: "/photos/bullishai/best%20value%20stocks.png",
    alt: "BullishAI Best Value Stocks screen showing stock cards with valuation, return on equity, growth, and quality metrics.",
    title: "Best Value Stocks",
    caption: "A value-oriented screen combining measures such as valuation, profitability, and growth into a focused market view.",
    width: 3020,
    height: 1818,
  },
  stableGrowth: {
    src: "/photos/bullishai/stable%20growth%20picks.png",
    alt: "BullishAI Stable Growth Picks screen showing lower-beta stock candidates with yield, valuation, growth, and quality information.",
    title: "Stable Growth Picks",
    caption: "A screening view focused on lower-volatility companies with growth, quality, valuation, and income context.",
    width: 3024,
    height: 1828,
  },
  portfolio: {
    src: "/photos/bullishai/Portfolio.png",
    alt: "BullishAI portfolio analytics dashboard showing total portfolio value, cost basis, total return, holdings count, and historical portfolio-value chart.",
    title: "Portfolio Analytics",
    caption: "BullishAI combines current portfolio value, cost basis, total return, holdings, and historical portfolio snapshots into one view.",
    width: 3024,
    height: 1734,
  },
  holdings: {
    src: "/photos/bullishai/real%20time%20dashabord%20holdings.png",
    alt: "BullishAI holdings dashboard showing individual positions with shares, average purchase price, market value, return, and current market quotes.",
    title: "Real-Time Portfolio Holdings",
    caption: "Individual positions combine share quantity, average purchase price, current market value, unrealized return, and current market pricing.",
    width: 3024,
    height: 1814,
  },
  watchlist: {
    src: "/photos/bullishai/WIshlist.png",
    alt: "BullishAI watchlist showing tracked stock symbols, prices, daily changes, controls, and selected-stock market context.",
    title: "Watchlist",
    caption: "A personalized list for monitoring selected symbols, current prices, daily movement, and selected-stock context.",
    width: 3024,
    height: 1732,
  },
} satisfies Record<string, BullishAiMedia>;

export const bullishAiHeroMedia: MediaItem[] = [
  bullishAiCaseStudyMedia.home,
  bullishAiCaseStudyMedia.markets,
  bullishAiCaseStudyMedia.signals,
];

export const bullishAiScreeningMedia: MediaItem[] = [
  bullishAiCaseStudyMedia.recommended,
  bullishAiCaseStudyMedia.value,
  bullishAiCaseStudyMedia.stableGrowth,
];

export const bullishAiStages = [
  ["01", "Product Idea"],
  ["02", "Architecture"],
  ["03", "Market Data"],
  ["04", "Normalization"],
  ["05", "Discovery"],
  ["06", "AI Pipeline"],
  ["07", "Model Routing"],
  ["08", "Portfolio"],
  ["09", "Data & Auth"],
  ["10", "Background Jobs"],
  ["11", "Reliability"],
  ["12", "Reflection"],
] as const;

export const bullishAiHeroTags = [
  "Next.js 16.1.1",
  "TypeScript",
  "React",
  "PostgreSQL / Neon",
  "REST APIs",
  "Groq",
  "Better Auth",
  "Inngest",
  "SWR",
];

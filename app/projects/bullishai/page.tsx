import type { Metadata } from "next";
import { BullishAICaseStudy } from "@/components/projects/BullishAICaseStudy";

export const metadata: Metadata = {
  title: "BullishAI Engineering Case Study | Malhar Mahajan",
  description:
    "Engineering deep dive into BullishAI, a full-stack market research platform combining multi-provider financial data, portfolio analytics, PostgreSQL, background jobs, and AI-assisted research.",
  openGraph: {
    title: "BullishAI Engineering Case Study | Malhar Mahajan",
    description:
      "A technical case study covering BullishAI's market-data fallbacks, AI context pipeline, portfolio engine, PostgreSQL state, and background jobs.",
    type: "article",
    images: ["/photos/optimized/bullishai-home.webp"],
  },
};

export default function BullishAiProjectPage() {
  return <BullishAICaseStudy />;
}

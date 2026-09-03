import type { Metadata } from "next";
import { PortucanaCaseStudy } from "@/components/experience/PortucanaCaseStudy";

export const metadata: Metadata = {
  title: "Portucana Time-Off Portal Case Study | Malhar Mahajan",
  description:
    "How I identified an internal process problem and designed, built, tested, and documented a Power Apps, Power Automate, SharePoint, and Microsoft 365 solution at Portucana Construction Services.",
};

export default function PortucanaExperiencePage() {
  return <PortucanaCaseStudy />;
}

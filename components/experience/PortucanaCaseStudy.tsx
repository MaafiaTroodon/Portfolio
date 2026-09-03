"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Award, CheckCircle2, ChevronRight, Database, GitBranch,
  Images, Mail, MapPin, MonitorSmartphone, RotateCcw, ShieldCheck, UsersRound,
  Workflow, Wrench,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/motion/Reveal";
import { CertificateDialogButtons } from "@/components/shared/CertificateDialog";
import { ImageLightbox } from "@/components/shared/ImageLightbox";
import { Badge } from "@/components/ui/badge";
import { certificateLinks, portucanaPhotos, portucanaTags, type CaseStudyMedia } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

const stageNavigation = [
  ["01", "Finding the Problem"], ["02", "Gathering Requirements"],
  ["03", "System Architecture"], ["04", "Power Apps Experience"],
  ["05", "Roles & Access"], ["06", "Automation Engine"],
  ["07", "Data & Consistency"], ["08", "Balances & Calendar"],
  ["09", "Request Lifecycle"], ["10", "Communication"],
  ["11", "Testing & Reliability"], ["12", "Beyond the Portal"],
] as const;

type PortfolioMedia = CaseStudyMedia & { width: number; height: number };

const media = {
  home: { src: "/photos/architecture/sanitized/home-page.png", alt: "Privacy-safe Power Apps Time Off Portal home screen with illustrative leave balances.", title: "Employee Home", caption: "A role-aware starting point for balances, requests, history, and policy access.", width: 953, height: 1651 },
  employees: { src: "/photos/architecture/sanitized/my-employees.png", alt: "Privacy-safe manager My Employees screen with illustrative balances and manager actions.", title: "Manager Workspace", caption: "Managers can review employee balances, edit entitlements, or log time off directly.", width: 943, height: 1668 },
  mainFlow: { src: "/photos/architecture/Main%20big%20flow.png", alt: "Expanded Power Automate main request workflow with nested conditions and processing branches.", title: "Main Request Processing Workflow", caption: "The full orchestration path for validation, decisions, state updates, calendar work, and communication.", width: 1274, height: 1646 },
  rollover: { src: "/photos/architecture/Scedule%20cloud%20flow.png", alt: "Scheduled Power Automate flow that creates missing leave-year balance records for active employees.", title: "Annual Leave-Year Rollover", caption: "A scheduled flow checks active employees and creates only the missing record for the new leave year.", width: 820, height: 909 },
  submission: { src: "/photos/architecture/sanitized/submission-email.png", alt: "Privacy-safe time-off request submission email with neutral employee and manager details.", title: "01 · Submitted", caption: "The manager and administrator receive a structured summary and clear next action.", width: 1483, height: 1061 },
  approved: { src: "/photos/architecture/sanitized/approved-email.png", alt: "Privacy-safe manager-logged time-off approval email with neutral employee details.", title: "02 · Approved", caption: "The message confirms the dates, total day value, decision, and system updates.", width: 1366, height: 1152 },
  cancelled: { src: "/photos/architecture/sanitized/cancelled-email.png", alt: "Privacy-safe approved time-off cancellation email with neutral employee details.", title: "03 · Cancelled", caption: "Cancellation confirms the balance return, calendar removal, and completed notifications.", width: 1443, height: 1090 },
  calendar: { src: "/photos/architecture/sanitized/calendar.png", alt: "Privacy-safe SharePoint Vacation Calendar with neutral employee event labels.", title: "Shared Vacation Calendar", caption: "Approved leave appears on the operational calendar on the dates employees and managers expect.", width: 1945, height: 809 },
  sharepoint: { src: "/photos/architecture/sanitized/sharepoint-vacation-list.png", alt: "Privacy-safe SharePoint Vacation Calendar list showing request IDs, dates, day values, and processing state.", title: "Operational SharePoint Data", caption: "Request-linked calendar records expose the status fields the automation uses to stay consistent.", width: 1913, height: 822 },
} satisfies Record<string, PortfolioMedia>;

const ideaToSystem = ["Observed Process", "Found Bottleneck", "Proposed Portal", "Gathered Requirements", "Designed System", "Built & Automated", "Tested Real Scenarios", "Refined & Documented"];

function StageSection({ number, title, eyebrow, children }: { number: string; title: string; eyebrow: string; children: ReactNode }) {
  return (
    <section id={`stage-${number}`} data-case-stage={number} aria-labelledby={`stage-${number}-title`} className="mb-8 scroll-mt-36 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 shadow-xl shadow-black/20 backdrop-blur-md sm:p-8 lg:p-10">
      <div className="grid gap-6 sm:grid-cols-[5rem_minmax(0,1fr)]">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-300/30 bg-violet-400/10 font-semibold text-violet-200 shadow-lg shadow-violet-950/40">{number}</div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">{eyebrow}</p>
          <h3 id={`stage-${number}-title`} className="mt-3 text-3xl leading-tight sm:text-4xl">{title}</h3>
          <div className="mt-7">{children}</div>
        </div>
      </div>
    </section>
  );
}

function MediaPreview({ item, onOpen, className, imageClassName }: { item: PortfolioMedia; onOpen: (item: PortfolioMedia) => void; className?: string; imageClassName?: string }) {
  return (
    <button type="button" onClick={() => onOpen(item)} className={cn("group w-full overflow-hidden rounded-2xl border border-white/10 bg-white text-left shadow-2xl shadow-black/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950", className)} aria-label={`Enlarge ${item.title}`}>
      <Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes="(max-width: 1024px) 94vw, 72vw" loading="lazy" className={cn("h-auto w-full bg-white object-contain transition duration-300 group-hover:scale-[1.005]", imageClassName)} />
      <span className="block border-t border-slate-200 bg-slate-50 px-4 py-4 sm:px-5">
        <span className="block text-sm font-semibold !text-slate-950">{item.title}</span>
        <span className="mt-1 block text-xs leading-relaxed !text-slate-600">{item.caption}</span>
      </span>
    </button>
  );
}

function BulletList({ items }: { items: string[] }) {
  return <ul className="space-y-3">{items.map((item) => <li key={item} className="flex gap-3 text-sm leading-7 text-slate-300 sm:text-base"><CheckCircle2 aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-violet-300" /><span>{item}</span></li>)}</ul>;
}

const sharePointRows = [
  ["VR-0241", "Employee A", "Vacation", "Approved"],
  ["VR-0242", "Employee B", "Sick / PTO", "Pending"],
  ["VR-0243", "Employee C", "Vacation", "Rejected"],
] as const;

function SharePointDataPreview() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="mb-5 overflow-hidden rounded-xl border border-teal-300/20 bg-[#07212a]/80 shadow-lg shadow-teal-950/20" aria-label="Animated SharePoint operational data preview">
      <div className="flex items-center justify-between border-b border-teal-200/15 bg-teal-500/10 px-3 py-2.5">
        <span className="flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-teal-200"><Database aria-hidden="true" className="h-3.5 w-3.5" /> SharePoint · Operational List</span>
        <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.8)]" aria-label="Data synchronized" />
      </div>
      <div role="table" aria-label="Illustrative time-off request records" className="divide-y divide-white/[0.06] sm:hidden">
        {sharePointRows.map((row, rowIndex) => (
          <motion.div
            key={row[0]}
            role="row"
            initial={reduceMotion ? false : { opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + rowIndex * 0.18, duration: 0.5, ease: "easeOut" }}
            className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 px-3 py-3 text-[0.68rem] text-slate-300 transition-colors hover:bg-teal-300/[0.07]"
          >
            <span role="cell" className="font-mono font-semibold text-teal-200">{row[0]}</span>
            <span role="cell" className={cn("rounded-full px-2 py-0.5 font-semibold", row[3] === "Approved" ? "bg-emerald-400/10 text-emerald-200" : row[3] === "Rejected" ? "bg-rose-400/15 text-rose-200" : "bg-amber-300/10 text-amber-100")}>{row[3]}</span>
            <span role="cell" className="col-span-2 text-slate-300">{row[1]} · {row[2]}</span>
          </motion.div>
        ))}
      </div>
      <div className="hidden overflow-hidden sm:block">
        <table className="w-full table-fixed border-collapse text-left text-[0.67rem]" aria-label="Illustrative time-off request records">
          <thead className="bg-black/20 text-teal-100">
            <tr>{["Request ID", "Employee", "Leave type", "Status"].map((heading) => <th key={heading} scope="col" className="border-b border-teal-200/10 px-3 py-2 font-semibold">{heading}</th>)}</tr>
          </thead>
          <tbody>
            {sharePointRows.map((row, rowIndex) => (
              <motion.tr
                key={row[0]}
                initial={reduceMotion ? false : { opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + rowIndex * 0.18, duration: 0.5, ease: "easeOut" }}
                className="border-b border-white/[0.06] text-slate-300 transition-colors last:border-b-0 hover:bg-teal-300/[0.07]"
              >
                <td className="truncate px-3 py-2.5 font-mono text-teal-200">{row[0]}</td>
                <td className="truncate px-3 py-2.5">{row[1]}</td>
                <td className="truncate px-3 py-2.5">{row[2]}</td>
                <td className="truncate px-3 py-2.5"><span className={cn("inline-flex max-w-full truncate rounded-full px-2 py-0.5 font-semibold", row[3] === "Approved" ? "bg-emerald-400/10 text-emerald-200" : row[3] === "Rejected" ? "bg-rose-400/15 text-rose-200" : "bg-amber-300/10 text-amber-100")}>{row[3]}</span></td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function PortucanaCaseStudy() {
  const [activeMedia, setActiveMedia] = useState<CaseStudyMedia | null>(null);
  const [activeStage, setActiveStage] = useState("01");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const available = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0);
      });
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener("scroll", updateProgress); window.removeEventListener("resize", updateProgress); };
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-case-stage]"));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      const stage = visible[0]?.target.getAttribute("data-case-stage");
      if (stage) setActiveStage(stage);
    }, { rootMargin: "-22% 0px -62% 0px", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const activeLink = document.querySelector<HTMLElement>(`[data-stage-link="${activeStage}"]`);
    const mobileNav = activeLink?.closest("nav");
    const navRect = mobileNav?.getBoundingClientRect();
    if (!activeLink || !mobileNav || window.innerWidth >= 1024 || !navRect || navRect.top >= window.innerHeight || navRect.bottom <= 0) return;
    mobileNav.scrollTo({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      left: activeLink.offsetLeft - (mobileNav.clientWidth - activeLink.offsetWidth) / 2,
    });
  }, [activeStage]);

  return (
    <div className="content-backdrop min-h-screen">
      <div aria-hidden="true" className="fixed inset-x-0 top-16 z-50 h-1 origin-left bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-200 transition-transform duration-150 motion-reduce:transition-none" style={{ transform: `scaleX(${progress})` }} />
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 sm:pb-24 sm:pt-28 lg:px-8">
        <header>
          <Link href="/#about" className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"><ArrowLeft aria-hidden="true" className="h-4 w-4" /> Back to Portfolio</Link>
          <div className="mt-6 overflow-hidden rounded-3xl border border-violet-300/20 bg-gradient-to-br from-slate-950 via-slate-950 to-violet-950/80 p-5 shadow-2xl shadow-violet-950/40 sm:mt-8 sm:rounded-[2rem] sm:p-10 lg:p-14">
            <div className="grid gap-9 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-300">Portucana Construction Services</p>
                <h1 className="mt-4 text-balance text-4xl leading-tight sm:text-5xl lg:text-6xl">Systems &amp; Data Analyst Co-op</h1>
                <p className="mt-6 max-w-4xl text-balance text-xl font-medium leading-8 text-amber-100 sm:text-2xl">From spotting an internal process problem to designing and building the system that replaced it.</p>
                <p className="mt-5 max-w-4xl leading-8 text-slate-300">I identified an opportunity to improve how time off was requested and tracked, worked directly with the CFO, owner, employees, and managers to understand the process, proposed an internal portal, and built the solution from the ground up with Power Apps, Power Automate, SharePoint, and Microsoft 365.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur">
                <SharePointDataPreview />
                <p className="text-sm font-semibold text-slate-100">May 2026 – August 2026</p>
                <p className="mt-2 flex items-center gap-2 text-sm text-slate-400"><MapPin aria-hidden="true" className="h-4 w-4" /> Halifax, NS</p>
                <div className="mt-5 flex flex-wrap gap-2">{portucanaTags.slice(0, 6).map((tag) => <Badge key={tag} variant="secondary" className="border border-white/10 bg-white/5 text-slate-200">{tag}</Badge>)}</div>
              </div>
            </div>
          </div>
        </header>

        <Reveal className="mt-16">
          <section aria-labelledby="professional-gallery-heading">
            <div className="mb-6 flex items-center gap-3"><Images aria-hidden="true" className="h-5 w-5 text-violet-300" /><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">Professional experience</p><h2 id="professional-gallery-heading" className="mt-1 text-2xl sm:text-3xl">The people and industry behind the work</h2></div></div>
            <div className="grid gap-4 md:grid-cols-12 md:grid-rows-2">
              {portucanaPhotos.map((photo, index) => <figure key={photo.src} className={cn("group overflow-hidden rounded-2xl border border-white/10 bg-slate-950", index === 0 ? "md:col-span-7 md:row-span-2" : "md:col-span-5")}><div className={cn("relative", index === 0 ? "aspect-[5/4] h-full md:min-h-80" : "aspect-[16/9]")}><Image src={photo.src} alt={photo.alt} fill priority={index === 0} sizes={index === 0 ? "(max-width: 768px) 100vw, 58vw" : "(max-width: 768px) 100vw, 42vw"} className="object-cover transition duration-500 group-hover:scale-[1.02]" style={{ objectPosition: photo.objectPosition ?? "center" }} /><figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent px-4 pb-4 pt-14 sm:px-5 sm:pt-16"><span className="text-sm font-semibold text-white">{photo.title}</span><span className="mt-1 block text-xs text-slate-200">{photo.caption}</span></figcaption></div></figure>)}
            </div>
          </section>
        </Reveal>

        <Reveal className="mt-20">
          <section aria-labelledby="discovery-heading" className="rounded-3xl border border-violet-300/20 bg-gradient-to-br from-violet-950/70 to-slate-950/95 p-6 shadow-2xl sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">The discovery</p>
            <h2 id="discovery-heading" className="mt-3 max-w-4xl text-3xl sm:text-5xl">Before there was an app, there was a problem.</h2>
            <div className="mt-7 grid gap-5 leading-8 text-slate-300 lg:grid-cols-2"><p>Time-off requests depended on manual conversations, separate messages, and balance updates that were difficult to follow across employees and managers. The friction was not presented to me as a ready-made software assignment; I noticed it while learning how the company operated.</p><p>I brought the opportunity forward, validated it with the CFO and owner, and spoke with the people who would actually use the process. Those conversations became the requirements for a role-aware portal, a dependable operational data layer, and automations that could keep every downstream action in sync.</p></div>
          </section>
        </Reveal>

        <Reveal className="mt-16"><section aria-labelledby="idea-system-heading"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">From Idea to System</p><h2 id="idea-system-heading" className="mt-3 text-3xl sm:text-4xl">The work moved from observation to ownership.</h2><ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{ideaToSystem.map((step, index) => <li key={step} className="relative flex min-h-28 items-start gap-4 rounded-2xl border border-white/10 bg-slate-950/75 p-5"><span className="text-xs font-semibold text-violet-300">{String(index + 1).padStart(2, "0")}</span><span className="font-semibold text-slate-100">{step}</span>{index < ideaToSystem.length - 1 ? <ChevronRight aria-hidden="true" className="absolute -right-3 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 text-violet-300 lg:block" /> : null}</li>)}</ol></section></Reveal>

        <Reveal className="mt-20">
          <section aria-labelledby="system-glance-heading" className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">System at a Glance</p><h2 id="system-glance-heading" className="mt-3 text-3xl sm:text-4xl">One experience, several connected responsibilities.</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[
              [MonitorSmartphone, "Power Apps", "Role-aware employee, manager, and administrator interfaces."],
              [Workflow, "Power Automate", "Workflow orchestration, calculations, approvals, calendar actions, and notifications."],
              [Database, "SharePoint", "Operational lists for balances, requests, calendar records, relationships, and processing state."],
              [ShieldCheck, "Microsoft 365", "Identity, permissions, administration, shared resources, and the surrounding operating environment."],
              [GitBranch, "Outlook Calendar", "Approved leave represented as shared calendar events linked back to requests."],
              [Mail, "Email & Teams", "Audience-specific updates for submission, decisions, direct entry, and cancellation."],
            ].map(([Icon, title, description]) => <div key={String(title)} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"><Icon aria-hidden="true" className="h-5 w-5 text-violet-300" /><h3 className="mt-4 font-sans text-base font-semibold text-slate-100">{String(title)}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{String(description)}</p></div>)}</div>
            <div className="mt-5 grid gap-4 rounded-2xl border border-amber-200/15 bg-amber-100/[0.035] p-5 md:grid-cols-3"><div><p className="text-xs uppercase tracking-wider text-amber-200">Roles</p><p className="mt-2 text-sm text-slate-300">Employee · Manager · Administrator</p></div><div><p className="text-xs uppercase tracking-wider text-amber-200">Leave types</p><p className="mt-2 text-sm text-slate-300">Vacation · Sick/PTO</p></div><div><p className="text-xs uppercase tracking-wider text-amber-200">Day values</p><p className="mt-2 text-sm text-slate-300">Full day = 1 · AM/PM half day = 0.5 · multi-date requests</p></div></div>
          </section>
        </Reveal>

        <section aria-labelledby="system-story-heading" className="mt-24">
          <div className="mx-auto mb-12 max-w-3xl text-center"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">Engineering case study</p><h2 id="system-story-heading" className="mt-3 text-3xl sm:text-5xl">How the system came together</h2><p className="mt-5 leading-relaxed text-slate-300">Twelve stages connecting business analysis, product decisions, implementation, operational integrity, and handoff.</p></div>
          <nav aria-label="Case study stages" className="sticky top-[4.25rem] z-30 -mx-4 mb-8 overflow-x-auto border-y border-white/10 bg-slate-950/95 px-4 py-3 backdrop-blur lg:hidden"><ol className="flex w-max gap-2">{stageNavigation.map(([number, title]) => <li key={number}><a href={`#stage-${number}`} data-stage-link={number} aria-current={activeStage === number ? "step" : undefined} className={cn("inline-flex min-h-11 items-center gap-2 rounded-full border px-3 text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300", activeStage === number ? "border-violet-300/50 bg-violet-400/15 text-violet-100" : "border-white/10 bg-white/[0.03] text-slate-400")}><span>{number}</span><span>{title}</span></a></li>)}</ol></nav>
          <div className="grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)]">
            <aside className="hidden lg:block"><nav aria-label="Case study stage progress" className="sticky top-28 rounded-2xl border border-white/10 bg-slate-950/80 p-3 backdrop-blur"><ol className="space-y-1">{stageNavigation.map(([number, title]) => { const completed = Number(number) < Number(activeStage); const current = activeStage === number; return <li key={number}><a href={`#stage-${number}`} aria-current={current ? "step" : undefined} className={cn("flex min-h-10 items-center gap-3 rounded-xl px-3 py-2 text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300", current ? "bg-violet-400/15 text-violet-100" : "text-slate-400 hover:bg-white/5 hover:text-slate-200")}><span className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px]", current ? "border-violet-300 bg-violet-400/20" : completed ? "border-emerald-300/40 bg-emerald-400/10 text-emerald-200" : "border-white/15")}>{completed ? "✓" : number}</span><span>{title}</span></a></li>; })}</ol></nav></aside>
            <div className="min-w-0">
              <StageSection number="01" eyebrow="Discovery" title="Finding the Problem"><div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]"><div className="space-y-4 leading-8 text-slate-300"><p>I began by observing how time-off information moved through the company. Requests, approvals, balances, and calendar visibility depended on people carrying context between conversations and separate tools.</p><p>I framed the issue as a systems problem: the company needed one dependable path from an employee’s request to a manager’s decision, an updated balance, a calendar record, and a clear notification.</p></div><div className="rounded-2xl border border-amber-200/20 bg-amber-100/[0.04] p-5"><p className="text-sm font-semibold text-amber-100">The important distinction</p><p className="mt-3 text-sm leading-7 text-slate-300">This was not a pre-scoped app ticket. I identified the opportunity, proposed a direction, and took responsibility for turning it into a working internal system.</p></div></div></StageSection>

              <StageSection number="02" eyebrow="Business analysis" title="Turning Conversations Into Requirements"><p className="max-w-3xl leading-8 text-slate-300">I worked directly with the CFO, owner, employees, and managers to translate the real process into roles, rules, decisions, and exceptions.</p><div className="mt-7 grid gap-4 md:grid-cols-2">{[
                ["People", "Who can submit, approve, directly log, edit balances, cancel, or administer the system?"], ["Policy", "How should Vacation, Sick/PTO, full days, AM/PM half days, and multi-date requests behave?"], ["State", "What must happen once—and only once—when a request is approved, rejected, or cancelled?"], ["Communication", "What does each audience need to know at submission, decision, calendar creation, and cancellation?"],
              ].map(([title, body]) => <div key={title} className="rounded-2xl border border-white/10 bg-slate-950/75 p-5"><h4 className="font-sans text-sm font-semibold text-violet-200">{title}</h4><p className="mt-2 text-sm leading-7 text-slate-400">{body}</p></div>)}</div></StageSection>

              <StageSection number="03" eyebrow="Architecture" title="Designing the System Architecture"><p className="max-w-3xl leading-8 text-slate-300">I designed clear boundaries between the experience, operational records, orchestration, and communication layers. Each tool had a specific responsibility, and stable request identifiers connected the work across them.</p><div className="mt-8 overflow-hidden rounded-3xl border border-violet-300/20 bg-gradient-to-br from-slate-950 to-violet-950/55 p-5 sm:p-7"><div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">{[
                [MonitorSmartphone, "Power Apps", "Experience layer"], [Database, "SharePoint", "Operational data layer"], [Workflow, "Power Automate", "Orchestration layer"],
              ].map(([Icon, title, label], index) => <div key={String(title)} className="contents"><div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center"><Icon aria-hidden="true" className="mx-auto h-6 w-6 text-violet-300" /><p className="mt-3 font-semibold text-slate-100">{String(title)}</p><p className="mt-1 text-xs text-slate-400">{String(label)}</p></div>{index < 2 ? <ArrowRight aria-hidden="true" className="mx-auto h-5 w-5 rotate-90 text-violet-300 md:rotate-0" /> : null}</div>)}</div><div className="mx-auto my-4 h-8 w-px bg-violet-300/35" /><div className="grid gap-3 sm:grid-cols-3">{["Outlook calendar", "Email & Teams", "Microsoft 365 identity & administration"].map((label) => <div key={label} className="rounded-xl border border-white/10 bg-black/20 p-4 text-center text-sm text-slate-300">{label}</div>)}</div></div><div className="mt-8"><MediaPreview item={media.sharepoint} onOpen={setActiveMedia} /></div></StageSection>

              <StageSection number="04" eyebrow="Product design" title="Building the Power Apps Experience"><div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start"><div><p className="leading-8 text-slate-300">The employee journey was designed to make policy rules understandable at the point of action—not hidden inside automation.</p><div className="mt-6"><BulletList items={["Home shows the current leave year, available Vacation and Sick/PTO balances, and clear next actions.", "Request supports multiple selected dates, a 1.0 full-day value, a 0.5 half-day value, AM/PM selection, and comments.", "My Requests separates pending and rejected work; Approved Requests exposes approved days, reasons, detail, and cancellation.", "Detail views show the request lifecycle clearly enough for an employee to understand what the system did."]} /></div></div><MediaPreview item={media.home} onOpen={setActiveMedia} /></div></StageSection>

              <StageSection number="05" eyebrow="Role design" title="Employee → Manager → Administrator"><div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-stretch">{[
                ["Employee", "Request time off, track status, review approvals, and cancel eligible approved dates."], ["Manager", "See direct reports, review pending requests, approve/reject, log time off, and edit balances."], ["Administrator", "Access broader setup, employee records, operational lists, exceptions, and system management."],
              ].map(([title, body], index) => <div key={title} className="contents"><div className="rounded-2xl border border-white/10 bg-slate-950/75 p-5"><UsersRound aria-hidden="true" className="h-5 w-5 text-violet-300" /><h4 className="mt-4 font-sans text-base font-semibold text-slate-100">{title}</h4><p className="mt-2 text-sm leading-7 text-slate-400">{body}</p></div>{index < 2 ? <ChevronRight aria-hidden="true" className="mx-auto h-5 w-5 rotate-90 self-center text-violet-300 sm:rotate-0" /> : null}</div>)}</div><div className="mt-8 max-w-sm"><MediaPreview item={media.employees} onOpen={setActiveMedia} /></div></StageSection>

              <StageSection number="06" eyebrow="Workflow engineering" title="Building the Automation Engine"><p className="max-w-3xl leading-8 text-slate-300">A suite of Power Automate flows connected the interactive app to validation, approvals, SharePoint reads and writes, calculations, Outlook events, and audience-specific messages. The main request flow became the central orchestration path, with smaller flows handling focused responsibilities.</p><div className="mt-7"><BulletList items={["Conditions enforce role, request, leave-type, and processing-state rules.", "Loops process each selected date while keeping the request-level total intact.", "Structured results return to Power Apps when the user needs immediate feedback.", "Downstream calendar and notification work stays tied to the same RequestID."]} /></div><div className="mt-9"><MediaPreview item={media.mainFlow} onOpen={setActiveMedia} imageClassName="max-h-[86rem]" /></div></StageSection>

              <StageSection number="07" eyebrow="Operational integrity" title="Data, Processing State & Consistency"><p className="leading-8 text-slate-300">SharePoint was the operational data layer—not a set of SQL tables. The broader portal used roughly five core list structures for employee leave-year balances, submitted requests, request dates/details, vacation calendar records, and administration/configuration concerns.</p><div className="mt-7 grid gap-4 sm:grid-cols-2">{[
                ["Relationships", "SharePoint item IDs, lookup-style employee/manager references, RequestID, approver information, and LeaveYear connect related records."], ["Processing flags", "ApprovalProcessed, CalendarCreated, CancellationProcessed, and BalanceReturned record whether a side effect already happened."], ["Business state", "Request status and calendar status make pending, approved, rejected, and cancelled records understandable across the system."], ["Why it matters", "Explicit state guards against double deduction, duplicate calendar events, repeated approvals or notifications, and double refunds."],
              ].map(([title, body]) => <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"><h4 className="font-sans text-sm font-semibold text-violet-200">{title}</h4><p className="mt-2 text-sm leading-7 text-slate-400">{body}</p></div>)}</div><div className="mt-8 rounded-2xl border border-emerald-300/15 bg-emerald-400/[0.04] p-4 sm:p-5"><p className="break-words text-center font-mono text-xs leading-7 text-emerald-100 sm:text-sm">RequestID → ApprovalProcessed → CalendarCreated → CancellationProcessed → BalanceReturned</p></div></StageSection>

              <StageSection number="08" eyebrow="Time-based state" title="Balances, Calendar & Yearly State"><div className="grid gap-6 lg:grid-cols-2"><div className="rounded-2xl border border-white/10 bg-slate-950/75 p-6"><RotateCcw aria-hidden="true" className="h-6 w-6 text-violet-300" /><h4 className="mt-4 text-2xl">Leave-year rollover</h4><p className="mt-3 text-sm leading-7 text-slate-300">The scheduled flow does not simply “set balances to zero.” It checks active employees, determines whether the new year’s balance record already exists, creates only missing records, applies the new entitlement, resets used values for that new record, and keeps years separated with LeaveYear.</p></div><div className="rounded-2xl border border-white/10 bg-slate-950/75 p-6"><Database aria-hidden="true" className="h-6 w-6 text-violet-300" /><h4 className="mt-4 text-2xl">Calendar representation</h4><p className="mt-3 text-sm leading-7 text-slate-300">Each approved date becomes a request-linked calendar record with its day value and processing status. That data supports the shared visual calendar and the Outlook event lifecycle without losing the original request context.</p></div></div><div className="mt-8 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-start"><MediaPreview item={media.rollover} onOpen={setActiveMedia} /><MediaPreview item={media.calendar} onOpen={setActiveMedia} /></div></StageSection>

              <StageSection number="09" eyebrow="Lifecycle" title="Approvals, Rejections & Cancellations"><p className="max-w-3xl leading-8 text-slate-300">The system had to treat every decision as a controlled state transition with related, recoverable side effects.</p><div className="mt-8 rounded-3xl border border-white/10 bg-slate-950/75 p-5 sm:p-7"><div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center"><div className="rounded-2xl border border-sky-300/20 bg-sky-400/[0.06] p-5 text-center"><p className="font-semibold text-sky-100">Submitted</p><p className="mt-2 text-xs text-slate-400">Validate dates, values, employee, manager, and current balance</p></div><ArrowRight aria-hidden="true" className="mx-auto h-5 w-5 rotate-90 text-violet-300 lg:rotate-0" /><div className="rounded-2xl border border-violet-300/20 bg-violet-400/[0.06] p-5 text-center"><p className="font-semibold text-violet-100">Manager Decision</p><p className="mt-2 text-xs text-slate-400">Approve or reject; manager/admin may also log directly</p></div><ArrowRight aria-hidden="true" className="mx-auto h-5 w-5 rotate-90 text-violet-300 lg:rotate-0" /><div className="grid gap-3"><div className="rounded-xl border border-emerald-300/20 bg-emerald-400/[0.06] p-4 text-center text-sm text-emerald-100">Approved → deduct → calendar → notify</div><div className="rounded-xl border border-rose-300/20 bg-rose-400/[0.06] p-4 text-center text-sm text-rose-100">Rejected → preserve balance → notify</div></div></div><div className="mx-auto my-5 h-9 w-px bg-violet-300/35" /><div className="mx-auto max-w-2xl rounded-2xl border border-amber-200/20 bg-amber-100/[0.05] p-5 text-center"><p className="font-semibold text-amber-100">Approved request cancellation branch</p><p className="mt-2 text-sm leading-7 text-slate-300">Cancel one date or the full request → verify it has not already been processed → return the correct day value → remove/update calendar data and Outlook event → notify the relevant audiences.</p></div></div></StageSection>

              <StageSection number="10" eyebrow="Communication design" title="Notifications & Communication"><p className="max-w-3xl leading-8 text-slate-300">The portal’s communication layer made system state visible. Employees, managers, and administrators received different messages containing the information and action appropriate to them.</p><div className="mt-8 grid gap-5 xl:grid-cols-3"><MediaPreview item={media.submission} onOpen={setActiveMedia} /><MediaPreview item={media.approved} onOpen={setActiveMedia} /><MediaPreview item={media.cancelled} onOpen={setActiveMedia} /></div></StageSection>

              <StageSection number="11" eyebrow="Quality engineering" title="Testing, Debugging & Reliability"><p className="max-w-3xl leading-8 text-slate-300">Testing followed real business scenarios across roles and across tools. I traced failures through the app, SharePoint records, workflow run history, calendar state, and messages; corrected the cause; then retested the complete path.</p><div className="mt-7"><BulletList items={["Happy paths and invalid submissions for employees, managers, and administrators.", "Full-day, AM half-day, PM half-day, mixed multi-date, and insufficient-balance requests.", "Approval, rejection, direct manager entry, single-day cancellation, and full cancellation.", "Retry and duplicate-processing scenarios, year boundaries, calendar consistency, and notification accuracy."]} /></div><h4 className="mt-10 text-2xl">What was actually difficult?</h4><div className="mt-5 grid gap-4 sm:grid-cols-2">{[
                ["Multi-date requests", "One request could contain different dates and day values while still needing one understandable total and decision."], ["State consistency", "Power Apps, SharePoint, flows, Outlook, and messages all had to agree—even when a run retried."], ["Cancellation", "Undoing an approved request safely was harder than creating it because balances and calendars had already changed."], ["Year boundaries", "Eligibility and usage had to remain historically correct while a new leave-year record was created."],
              ].map(([title, body]) => <div key={title} className="rounded-2xl border border-white/10 bg-slate-950/75 p-5"><Wrench aria-hidden="true" className="h-5 w-5 text-violet-300" /><p className="mt-4 font-semibold text-slate-100">{title}</p><p className="mt-2 text-sm leading-7 text-slate-400">{body}</p></div>)}</div></StageSection>

              <StageSection number="12" eyebrow="Wider contribution" title="Data & Systems Work Beyond the Portal"><div className="grid gap-5 lg:grid-cols-2"><div className="rounded-2xl border border-white/10 bg-slate-950/75 p-6"><h4 className="text-2xl">Reporting & data exploration</h4><p className="mt-4 text-sm leading-7 text-slate-300">I worked with QuickBooks exports, Power Query, Excel, and Power BI to explore clearer reporting around revenue, expenses, margin, accounts payable/receivable, and project costs. I also explored RAG concepts for company information retrieval; that work remained exploratory rather than a production claim.</p></div><div className="rounded-2xl border border-white/10 bg-slate-950/75 p-6"><h4 className="text-2xl">Microsoft 365 migration & administration</h4><p className="mt-4 text-sm leading-7 text-slate-300">I supported the move from Google Workspace to Microsoft 365, including mailbox, calendar, and contact migration; migration batches and authentication; shared mailboxes and calendars; users, groups, permissions, licences, admin centers, DNS/MX changes, and troubleshooting.</p></div></div></StageSection>
            </div>
          </div>
        </section>

        <Reveal className="mt-24"><section aria-labelledby="recognition-heading" className="rounded-3xl border border-white/10 bg-slate-950/75 p-6 shadow-xl backdrop-blur sm:p-9"><div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10 text-amber-200"><Award aria-hidden="true" className="h-5 w-5" /></span><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">Recognition</p><h2 id="recognition-heading" className="text-2xl sm:text-3xl">Co-op certificates</h2></div></div><p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300">Both certificates open inside the portfolio so the case-study experience stays intact.</p><div className="mt-6 flex flex-col gap-3 sm:flex-row"><CertificateDialogButtons certificates={certificateLinks} /></div></section></Reveal>

        <Reveal className="mt-20"><section aria-labelledby="reflection-heading" className="mx-auto max-w-4xl text-center"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">Reflection</p><h2 id="reflection-heading" className="mt-3 text-3xl sm:text-4xl">What this experience changed for me</h2><div className="mt-6 space-y-4 leading-8 text-slate-300"><p>This co-op showed me that I do my best work when I can move between people, process, data, and implementation. The most valuable part was not simply learning another platform; it was seeing an unclear operational problem, earning enough context to define it properly, and carrying a solution from proposal through real testing and handoff.</p><p>It strengthened the kind of engineer I want to become: someone who can listen carefully, build deeply, explain decisions clearly, and stay responsible for what happens after a feature appears to work.</p></div><div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/#about" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/15 bg-slate-950/70 px-5 text-sm font-medium text-slate-100 hover:border-violet-300/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"><ArrowLeft aria-hidden="true" className="h-4 w-4" /> Back to Portfolio</Link><Link href="/#projects" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/15 bg-slate-950/70 px-5 text-sm font-medium text-slate-100 hover:border-violet-300/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300">View Projects</Link><Link href="/#contact" className="btn-gradient min-h-11"><span>Contact Me</span><ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></div></section></Reveal>
      </div>
      {activeMedia ? <ImageLightbox item={activeMedia} onClose={() => setActiveMedia(null)} /> : null}
    </div>
  );
}

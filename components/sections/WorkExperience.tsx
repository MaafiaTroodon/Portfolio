import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, BriefcaseBusiness, CheckCircle2, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MediaCarousel } from "@/components/shared/MediaCarousel";
import { CertificateDialogButtons } from "@/components/shared/CertificateDialog";
import { myWorshipMedia, portucanaPhotos, type CertificateItem } from "@/lib/portfolio-data";

const portucanaHighlights = [
  "Designed and built an internal HR and Time-Off Portal with Power Apps, Power Automate, and SharePoint, covering onboarding, leave requests, approvals, balances, cancellation, calendar records, and automated communication.",
  "Translated real leave-management rules and edge cases into application behaviour, SharePoint data structures, approval logic, balance calculations, cancellation handling, and reliable workflows.",
  "Built and maintained multiple Power Automate workflows and spent substantial time testing, debugging, documenting, and fixing edge cases across the full request lifecycle.",
  "Supported Microsoft 365 administration and Portucana’s Google Workspace-to-Microsoft 365 migration, working with mailboxes, calendars, authentication, shared resources, DNS, MX records, and migration troubleshooting.",
  "Worked with QuickBooks Online data, Power Query, Excel, and Power BI to build reporting pipelines and analyze revenue, expenses, profit margins, accounts payable and receivable, and construction project costs.",
  "Worked on QuickBooks data integration and reporting automation, while separately exploring how RAG-based information retrieval could make internal company information easier to find and use.",
];

const portucanaExperienceTags = [
  "Power Apps",
  "Power Automate",
  "SharePoint",
  "Microsoft 365",
  "Power BI",
  "QuickBooks Online",
  "Power Query",
  "Data Integration",
  "Business Analysis",
];

const supportingExperiences = [
  {
    role: "Student Support Desk Technician",
    organization: "Dalhousie University ITS",
    location: "Halifax, Nova Scotia",
    dates: "September 2026 – Present",
    logo: "/photos/DalhousieLogo1.png",
    bullets: [
      "Provide front-line support by telephone, email, Jira ticket, and in person for students, faculty, and staff.",
      "Troubleshoot Windows, macOS, Linux, Brightspace, Microsoft 365, accounts, and general university IT services.",
      "Document incidents accurately, escalate complex issues, and collaborate with ITS colleagues through established support processes.",
    ],
    tags: ["IT Support", "Jira", "Brightspace", "Microsoft 365", "Windows / macOS / Linux"],
  },
  {
    role: "Help Desk & Front Desk Assistant",
    organization: "HEADStart Tennis Centre",
    location: "Halifax, Nova Scotia",
    dates: "September 2025 – Present",
    bullets: [
      "Provide in-person and telephone assistance, answer questions, resolve booking concerns, and support daily front-desk operations.",
      "Manage court bookings, cancellations, registrations, RSVPs, schedules, and payments using digital booking and point-of-sale systems.",
      "Coordinate with coaches and clients while independently resolving scheduling, registration, payment, and facility-related issues.",
    ],
    tags: ["Client Support", "Operations", "Problem Solving", "Scheduling", "Point of Sale"],
  },
];

const myWorshipExperience = {
  role: "Back End Developer / Backend Team Lead",
  organization: "MyWorship",
  location: "Remote",
  dates: "May 2025 – December 2025",
  logo: "/photos/worshiplogo.png",
  logoAlt: "MyWorship logo",
  story:
    "MyWorship was an important step from coursework into collaborative software development. Working remotely with a distributed team, I helped build backend services for a church streaming and engagement platform and learned how API decisions affect the developers and experiences built on top of them.",
  highlights: [
    "Developed backend services with Java, Spring Boot, and MongoDB, including authentication, authorization, account management, login, logout, and password-reset flows.",
    "Built and integrated REST APIs while coordinating backend work with frontend developers across a distributed team.",
    "Worked in Agile and Scrum workflows, clarified API contracts, documented behaviour, and troubleshot integration issues.",
    "Gained practical exposure to AWS, cloud deployment, and the considerations involved in preparing backend services for delivery.",
  ],
  tags: ["Java", "Spring Boot", "MongoDB", "REST APIs", "AWS", "Agile / Scrum", "Authentication"],
};

const myWorshipCertificate: CertificateItem[] = [
  {
    label: "View Certificate",
    title: "MyWorship Recognition & Completion",
    href: "/photos/WorshipCertificate.jpeg",
    type: "Image",
    alt: "MyWorship appreciation letter recognizing Malhar Mahajan's backend support and collaboration.",
  },
];

const additionalExperiences = [
  {
    role: "Classroom Technology Support",
    organization: "Dalhousie University ITS",
    location: "Halifax, Nova Scotia",
    dates: "September 2025 – April 2026",
    logo: "/photos/DalhousieLogo1.png",
    logoAlt: "Dalhousie University logo",
    story:
      "Classrooms are a different troubleshooting environment from a development machine: when technology fails, teaching may already be underway and a room full of people is waiting. I learned to diagnose issues quickly while keeping the person at the front of the room informed and focused on getting the class moving again.",
    highlights: [
      "Worked across Windows and macOS computers, projectors, touchscreens, microphones, document cameras, printers, and connected AV systems.",
      "Documented incidents and escalated deeper account, network, hardware, or software problems through ITS when an immediate classroom fix was not enough.",
    ],
    tags: ["Classroom Technology", "AV Support", "Windows / macOS", "Incident Response"],
  },
  {
    role: "Community Safety Team Member",
    organization: "Dalhousie University",
    location: "Halifax, Nova Scotia",
    dates: "August 2025 – April 2026",
    logo: "/photos/DalhousieLogo1.png",
    logoAlt: "Dalhousie University logo",
    story:
      "Not every valuable part of my background happened behind a computer. Working on Dalhousie’s Community Safety Team meant being present, observant, and approachable in campus and residence environments shared by hundreds of students.",
    highlights: [
      "Helped students, staff, and visitors navigate questions and unexpected situations while communicating university expectations clearly.",
      "Built judgment and situational awareness by working independently, staying calm when circumstances were unclear, and knowing when an issue needed escalation.",
    ],
    tags: ["Communication", "Situational Awareness", "Independent Judgment", "Community Support"],
  },
];

const earlierCustomerExperience = [
  {
    organization: "Aramark Canada",
    role: "Customer Service Representative",
    dates: "September 2024 – November 2025",
    location: "Halifax, Nova Scotia",
    accent: "border-sky-300/25 bg-sky-400/[0.08]",
    roleColor: "text-sky-200",
  },
  {
    organization: "Butcher’s Block Bar and Grill",
    role: "Bartender",
    dates: "August 2023 – September 2024",
    location: "Halifax, Nova Scotia",
    accent: "border-amber-300/25 bg-amber-400/[0.08]",
    roleColor: "text-amber-200",
  },
  {
    organization: "KFC",
    role: "Customer Service Representative",
    dates: "January 2023 – June 2023",
    location: "Halifax, Nova Scotia",
    accent: "border-red-300/25 bg-red-400/[0.08]",
    roleColor: "text-red-200",
  },
  {
    organization: "McDonald’s",
    role: "Customer Service Representative",
    dates: "January 2023 – April 2023",
    location: "Halifax, Nova Scotia",
    accent: "border-yellow-300/25 bg-yellow-400/[0.08]",
    roleColor: "text-yellow-100",
  },
];

export function WorkExperience() {
  return (
    <section aria-labelledby="experience-heading" className="space-y-7">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15 text-violet-200">
          <BriefcaseBusiness aria-hidden="true" className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">Professional experience</p>
          <h3 id="experience-heading" className="text-3xl font-semibold sm:text-4xl">Work Experience</h3>
        </div>
      </div>

      <article data-testid="experience-entry" className="overflow-hidden rounded-3xl border border-violet-400/25 bg-slate-950/80 shadow-2xl shadow-violet-950/30 backdrop-blur-xl">
        <div className="border-b border-white/10 bg-slate-900/60 p-3 sm:p-5 lg:p-6">
          <MediaCarousel items={portucanaPhotos} label="Portucana professional photos" variant="wide" priority />
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Badge className="border border-violet-300/20 bg-violet-500/15 text-violet-100 hover:bg-violet-500/15">Featured experience</Badge>
              <h4 className="mt-5 text-2xl font-semibold leading-tight sm:text-3xl">Systems &amp; Data Analyst Co-op</h4>
              <p className="mt-2 text-lg font-medium text-violet-200">Portucana Construction Services</p>
              <p className="mt-1 flex items-center gap-2 text-sm text-slate-400"><MapPin aria-hidden="true" className="h-4 w-4" /> Halifax, Nova Scotia</p>
            </div>
            <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-300">May 2026 – August 2026</span>
          </div>

          <p className="mt-7 max-w-5xl text-base leading-8 text-slate-300 sm:text-lg">
            Worked directly with Portucana’s CFO and owner to understand how the business operated, discuss problems in existing processes, and turn those needs into internal systems, reporting, automation, and Microsoft 365 solutions.
          </p>

          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">Experience highlights</p>
            <ul className="mt-4 grid gap-3 lg:grid-cols-2">
              {portucanaHighlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 text-sm leading-6 text-slate-300">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-violet-300" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-7 flex flex-wrap gap-2" aria-label="Portucana technologies and skills">
            {portucanaExperienceTags.map((tag) => <Badge key={tag} variant="secondary" className="border border-white/10 bg-white/5 text-slate-200">{tag}</Badge>)}
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-100"><Award aria-hidden="true" className="h-4 w-4 text-amber-300" /> Recognition</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/experience/portucana" className="btn-gradient min-h-11 justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
                <span>Explore Full Case Study</span><ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <CertificateDialogButtons />
            </div>
          </div>
        </div>
      </article>

      <div className="grid gap-6 lg:grid-cols-2">
        {supportingExperiences.map((experience) => (
          <Card data-testid="experience-entry" key={experience.role} className="h-full border-white/10 bg-slate-950/75 shadow-xl backdrop-blur transition hover:border-violet-400/30">
            <CardHeader className="space-y-4">
              <div className="flex items-start gap-4">
                {experience.logo ? (
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white p-1.5">
                    <Image src={experience.logo} alt="Dalhousie University logo" fill sizes="56px" className="object-contain p-1" />
                  </div>
                ) : (
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-lg font-semibold text-violet-200">HT</span>
                )}
                <div>
                  <CardTitle className="text-xl leading-snug">{experience.role}</CardTitle>
                  <p className="mt-1 text-sm font-medium text-violet-200">{experience.organization}</p>
                  <p className="mt-1 text-xs text-slate-400">{experience.location} · {experience.dates}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {experience.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-slate-300"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-300" /><span>{bullet}</span></li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2" aria-label={`${experience.organization} skills`}>
                {experience.tags.map((tag) => <Badge key={tag} variant="secondary" className="bg-white/5 text-xs text-slate-200">{tag}</Badge>)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="pt-6">
        <div className="mb-6 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">Earlier roles, lasting lessons</p>
          <h4 className="mt-2 text-2xl font-semibold sm:text-3xl">Additional Experience</h4>
          <p className="mt-3 leading-relaxed text-slate-400">
            These roles developed different parts of how I work—from backend collaboration and live technical support to calm judgment in people-facing environments.
          </p>
        </div>

        <article
          data-testid="experience-entry"
          data-experience="myworship"
          className="overflow-hidden rounded-3xl border border-indigo-300/20 bg-gradient-to-br from-slate-950/90 via-indigo-950/45 to-slate-950/90 shadow-xl shadow-indigo-950/20 backdrop-blur-xl"
        >
          <div className="border-b border-white/10 bg-slate-900/45 p-3 sm:p-5">
            <MediaCarousel
              items={myWorshipMedia}
              label="MyWorship platform media"
              variant="wide-compact"
            />
          </div>

          <div className="p-5 sm:p-7 lg:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-indigo-300/20 bg-[#080022]">
                  <Image
                    src={myWorshipExperience.logo}
                    alt={myWorshipExperience.logoAlt}
                    fill
                    sizes="56px"
                    className="object-contain p-1.5"
                  />
                </div>
                <div>
                  <Badge className="border border-indigo-300/20 bg-indigo-400/10 text-indigo-100 hover:bg-indigo-400/10">
                    Technical experience
                  </Badge>
                  <h4 className="mt-3 text-xl font-semibold leading-tight sm:text-2xl">
                    {myWorshipExperience.role}
                  </h4>
                  <p className="mt-1 text-base font-medium text-indigo-200">{myWorshipExperience.organization}</p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-slate-400">
                    <MapPin aria-hidden="true" className="h-4 w-4" /> {myWorshipExperience.location}
                  </p>
                </div>
              </div>
              <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-300">
                {myWorshipExperience.dates}
              </span>
            </div>

            <p className="mt-6 max-w-5xl text-sm leading-7 text-slate-300 sm:text-base">
              {myWorshipExperience.story}
            </p>

            <div className="mt-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">Experience highlights</p>
              <ul className="mt-4 grid gap-3 lg:grid-cols-2">
                {myWorshipExperience.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 text-sm leading-6 text-slate-300">
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-indigo-300" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap gap-2" aria-label="MyWorship technologies and skills">
              {myWorshipExperience.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="border border-indigo-200/10 bg-indigo-300/[0.08] text-xs text-slate-100">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="mt-7 border-t border-white/10 pt-5">
              <CertificateDialogButtons certificates={myWorshipCertificate} />
            </div>
          </div>
        </article>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {additionalExperiences.map((experience) => (
            <Card data-testid="experience-entry" key={experience.role} className="flex h-full flex-col border-white/10 bg-slate-950/65 shadow-lg backdrop-blur transition hover:border-violet-400/25">
              <CardHeader className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-xl ${experience.organization === "MyWorship" ? "bg-[#080022]" : "bg-white"}`}>
                    <Image src={experience.logo} alt={experience.logoAlt} fill sizes="56px" className="object-contain p-1.5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg leading-snug">{experience.role}</CardTitle>
                    <p className="mt-1 text-sm font-medium text-violet-200">{experience.organization}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">{experience.location} · {experience.dates}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <p className="text-sm leading-6 text-slate-300">{experience.story}</p>
                <ul className="mt-5 space-y-3">
                  {experience.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm leading-6 text-slate-400">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-300" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap gap-2 pt-6" aria-label={`${experience.organization} skills`}>
                  {experience.tags.map((tag) => <Badge key={tag} variant="secondary" className="bg-white/5 text-xs text-slate-200">{tag}</Badge>)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div
        data-testid="hospitality-experience"
        className="overflow-hidden rounded-3xl border border-sky-300/25 bg-gradient-to-br from-blue-950/90 via-slate-950/90 to-cyan-950/75 p-5 shadow-xl shadow-blue-950/30 sm:p-7 lg:p-8"
      >
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">Customer Service &amp; Hospitality</p>
          <h4 className="mt-2 text-xl font-semibold sm:text-2xl">Earlier customer-facing experience</h4>
          <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
            Before moving deeper into technology, I worked in customer-facing roles across food service, hospitality, and campus operations. Those jobs taught me to work quickly, communicate with very different people, and stay dependable when things got busy.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {earlierCustomerExperience.map((experience) => (
            <article
              key={`${experience.organization}-${experience.dates}`}
              data-testid="earlier-experience"
              className={`rounded-xl border p-3.5 shadow-sm ${experience.accent}`}
            >
              <h5 className="text-base font-semibold leading-snug text-slate-100">{experience.organization}</h5>
              <p className={`mt-2 text-sm ${experience.roleColor}`}>{experience.role}</p>
              <p className="mt-3 text-xs leading-5 text-slate-500">{experience.dates}</p>
              <p className="text-xs leading-5 text-slate-500">{experience.location}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

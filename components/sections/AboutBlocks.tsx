import Image from "next/image";
import { Braces, Cpu, Database, GraduationCap, MapPin, Network } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Reveal from "@/components/motion/Reveal";
import { WorkExperience } from "@/components/sections/WorkExperience";

const educationAreas = [
  {
    title: "Software & Backend Development",
    description:
      "Building structured applications through object-oriented programming, software design, and server-side development. I’ve carried those foundations into API work and Spring Boot projects alongside my degree.",
    topics: ["Java", "JavaScript", "API Development", "Spring Boot"],
    icon: Braces,
    accent: "border-violet-300/15 bg-violet-400/[0.06] text-violet-200",
  },
  {
    title: "Systems & Low-Level Computing",
    description:
      "Learning what happens below the application layer through C and C++, systems programming, memory, computer architecture, CPU concepts, and operating-system fundamentals.",
    topics: ["C", "C++", "Systems Programming", "CPU Concepts"],
    icon: Cpu,
    accent: "border-sky-300/15 bg-sky-400/[0.06] text-sky-200",
  },
  {
    title: "Data, Databases & Analysis",
    description:
      "Working with structured data through relational databases and SQL while developing the statistical and analytical foundations needed to understand and use data properly.",
    topics: ["SQL", "Databases", "Statistics", "Data Analysis"],
    icon: Database,
    accent: "border-emerald-300/15 bg-emerald-400/[0.06] text-emerald-200",
  },
  {
    title: "Computer Science Foundations",
    description:
      "The theory and design side of computing—data structures, algorithms, software engineering, networking, programming languages, and the mathematical reasoning behind computer science.",
    topics: ["Algorithms", "Software Engineering", "Networks", "Programming Languages"],
    icon: Network,
    accent: "border-amber-300/15 bg-amber-400/[0.06] text-amber-100",
  },
];

export function AboutBlocks() {
  return (
    <div className="space-y-20">
      <Reveal>
        <section aria-labelledby="about-story-heading" className="grid items-center gap-9 lg:grid-cols-[0.68fr_1.32fr] lg:gap-14">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-violet-300/25 bg-slate-950 shadow-2xl shadow-violet-950/40">
            <Image src="/photos/optimized/professional-headshot.webp" alt="Professional portrait of Malhar Mahajan." fill priority sizes="(max-width: 1024px) 90vw, 32vw" className="object-cover" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
          </div>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">Hey, I’m Malhar</p>
            <h3 id="about-story-heading" className="mt-3 text-balance text-3xl font-semibold leading-tight sm:text-4xl">I like building things that have to work in the real world.</h3>
            <div className="mt-7 space-y-5 text-base leading-8 text-slate-300 sm:text-[1.05rem]">
              <p>I’m a Computer Science Co-op student at Dalhousie University in Halifax, and over the last few years my experience has taken me through much more than one corner of technology. I’ve built full-stack applications and backend services, supported technology in live university classrooms, worked with students and faculty through ITS, and helped a real business rethink internal processes through Microsoft 365 and the Power Platform.</p>
              <p>What interests me most is understanding the whole system around a problem—not only the code. During my co-op at Portucana Construction Services, I worked directly with business leadership to understand how employees and managers handled time off, approvals, communication, and company information. I then helped turn those workflows into practical systems using Power Apps, Power Automate, SharePoint, and Microsoft 365. That experience changed how I think about software: a solution is only useful when it fits the people, information, and decisions around it.</p>
              <p>Outside professional work, I keep building because I genuinely enjoy figuring things out. BullishAI became my largest independent project and a place to explore full-stack architecture, financial data, APIs, databases, analytics, and AI-assisted workflows. Other projects have taken me into music streaming, augmented reality, Android development, 3D web experiences, and game development.</p>
              <p>I don’t see myself as belonging to only one narrow title or technology stack. I enjoy learning how systems fit together and creating things people can actually use—whether that means writing software, designing an automation, debugging a classroom system, working with data, or helping someone solve a technical problem.</p>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section aria-labelledby="education-heading" className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15 text-violet-200"><GraduationCap aria-hidden="true" className="h-5 w-5" /></span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">Education</p>
              <h3 id="education-heading" className="text-3xl font-semibold sm:text-4xl">Computer Science at Dalhousie</h3>
            </div>
          </div>
          <Card className="overflow-hidden border-white/10 bg-gradient-to-br from-slate-950/90 via-slate-950/80 to-violet-950/35 p-5 shadow-xl backdrop-blur sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-5">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-white p-2">
                  <Image src="/photos/DalhousieLogo1.png" alt="Dalhousie University logo" fill sizes="80px" className="object-contain p-2" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-2xl font-semibold">Dalhousie University</h4>
                  <p className="mt-2 font-medium text-violet-200">Bachelor of Computer Science (Co-op)</p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-slate-400"><MapPin aria-hidden="true" className="h-4 w-4" /> Halifax, Nova Scotia</p>
                </div>
              </div>
              <Badge className="w-fit border border-violet-300/20 bg-violet-500/15 px-3 py-1.5 text-violet-100 hover:bg-violet-500/15">Expected May 2027</Badge>
            </div>

            <div className="mt-7 max-w-5xl space-y-4 text-sm leading-7 text-slate-300 sm:text-base">
              <p>My Computer Science degree at Dalhousie has taken me from programming fundamentals into software engineering, backend development, databases, algorithms, systems, networking, statistics, and lower-level computing. What I’ve enjoyed most is seeing how those areas connect—from understanding what happens closer to the hardware to building applications and APIs on top of it.</p>
              <p>The breadth of the degree has made computer science feel less like one narrow path and more like learning the layers of a complete system: how programs are designed, how data is structured, how computers execute work, and how software communicates.</p>
            </div>

            <div className="mt-9">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">What I’ve studied</p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {educationAreas.map((area) => {
                  const Icon = area.icon;
                  return (
                    <article key={area.title} className={`rounded-2xl border p-5 ${area.accent}`}>
                      <Icon aria-hidden="true" className="h-5 w-5" />
                      <h4 className="mt-4 text-lg font-semibold text-slate-100">{area.title}</h4>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{area.description}</p>
                      <p className="mt-4 text-xs leading-6 text-slate-400">{area.topics.join(" · ")}</p>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">Learning in Practice</p>
              <p className="mt-3 max-w-5xl text-sm leading-7 text-slate-300 sm:text-base">
                One of the reasons I chose the co-op path was to see what computer science looks like outside assignments and course projects. Working professionally while completing the degree has created a useful feedback loop: concepts from school show up at work, and problems from work make the technical material at school easier to understand in context.
              </p>
            </div>
          </Card>
        </section>
      </Reveal>

      <Reveal><WorkExperience /></Reveal>

    </div>
  );
}

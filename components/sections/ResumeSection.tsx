"use client";

import { useState } from "react";
import { Download, ExternalLink, FileText } from "lucide-react";

const resumes = [
  {
    label: "Data Analyst Resume",
    file: "Data_Analyst _Resume.pdf",
    focus: "Data analysis · reporting · business systems",
  },
  {
    label: "Software Resume",
    file: "Software_Resume.pdf",
    focus: "Software engineering · full-stack development",
  },
  {
    label: "General Resume",
    file: "general_resume.pdf",
    focus: "Systems · data · software · support",
  },
];

export function ResumeSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeResume = resumes[activeIndex];
  const activeResumeUrl = `/${encodeURI(activeResume.file)}`;

  return (
    <section aria-labelledby="resume-heading" className="text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">Experience at a glance</p>
      <h2 id="resume-heading" className="mt-3 text-4xl font-bold sm:text-5xl md:text-6xl">Resume</h2>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
        Choose the resume that best matches the role. The document changes only when you select one below.
      </p>

      <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-5 rounded-2xl border border-white/10 bg-slate-950/75 p-6 shadow-xl backdrop-blur sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-200">
            <FileText aria-hidden="true" className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-lg font-semibold">{activeResume.label}</h3>
            <p className="mt-1 text-sm text-slate-400">{activeResume.focus}</p>
          </div>
        </div>
        <span className="rounded-full border border-violet-300/20 bg-violet-500/10 px-3 py-1 text-xs text-violet-100">PDF</span>
      </div>

      <div className="mx-auto mt-5 flex max-w-3xl flex-wrap justify-center gap-3" aria-label="Select a resume">
        {resumes.map((resume, index) => (
          <button
            key={resume.file}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-pressed={index === activeIndex}
            className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition ${
              index === activeIndex
                ? "border-violet-300/60 bg-violet-500/20 text-violet-100"
                : "border-white/10 bg-white/5 text-slate-300 hover:border-violet-300/40 hover:text-white"
            }`}
          >
            {resume.label}
          </button>
        ))}
      </div>

      <div className="mx-auto mt-6 hidden w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl md:block">
        <iframe
          key={activeResume.file}
          src={`${activeResumeUrl}#view=FitH`}
          className="h-[720px] w-full border-0"
          title={`${activeResume.label} preview`}
          loading="lazy"
        />
      </div>

      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a href={activeResumeUrl} target="_blank" rel="noopener noreferrer" className="btn-gradient min-h-12 min-w-44 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300">
          <span>Open Resume</span><ExternalLink aria-hidden="true" className="h-4 w-4" />
        </a>
        <a href={activeResumeUrl} download className="inline-flex min-h-12 min-w-44 items-center justify-center gap-2 rounded-lg border border-white/15 bg-slate-950/70 px-6 text-sm font-medium text-slate-100 transition hover:border-violet-300/40 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300">
          <Download aria-hidden="true" className="h-4 w-4" /> Download PDF
        </a>
      </div>
    </section>
  );
}

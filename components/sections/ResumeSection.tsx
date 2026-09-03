import { Download, ExternalLink, FileText } from "lucide-react";

export function ResumeSection() {
  return (
    <section aria-labelledby="resume-heading" className="text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">Experience at a glance</p>
      <h2 id="resume-heading" className="mt-3 text-4xl font-bold sm:text-5xl md:text-6xl">Resume</h2>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
        My current resume is available as a PDF. It changes only when you choose to open or download it.
      </p>

      <div className="mx-auto mt-8 flex max-w-xl flex-col items-center gap-4 rounded-2xl border border-white/10 bg-slate-950/75 p-6 shadow-xl backdrop-blur sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-200"><FileText aria-hidden="true" className="h-5 w-5" /></span>
          <div>
            <h3 className="text-lg font-semibold">Current Professional Resume</h3>
            <p className="mt-1 text-sm text-slate-400">Software · systems · data · support</p>
          </div>
        </div>
        <span className="rounded-full border border-violet-300/20 bg-violet-500/10 px-3 py-1 text-xs text-violet-100">PDF</span>
      </div>

      <div className="mx-auto mt-6 hidden w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl md:block">
        <iframe src="/resume.pdf#view=FitH" className="h-[720px] w-full border-0" title="Malhar Mahajan current professional resume" loading="lazy" />
      </div>

      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-gradient min-h-12 min-w-44 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300">
          <span>Open Resume</span><ExternalLink aria-hidden="true" className="h-4 w-4" />
        </a>
        <a href="/resume.pdf" download className="inline-flex min-h-12 min-w-44 items-center justify-center gap-2 rounded-lg border border-white/15 bg-slate-950/70 px-6 text-sm font-medium text-slate-100 transition hover:border-violet-300/40 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300">
          <Download aria-hidden="true" className="h-4 w-4" /> Download PDF
        </a>
      </div>
    </section>
  );
}

import { Trophy } from "lucide-react";
import { MediaCarousel } from "@/components/shared/MediaCarousel";
import { tennisPhotos } from "@/lib/portfolio-data";

export function BeyondScreen() {
  return (
    <section aria-labelledby="beyond-screen-heading" className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/65 shadow-xl backdrop-blur">
      <div className="border-b border-white/10 bg-slate-900/45 p-3 sm:p-5">
        <MediaCarousel items={tennisPhotos} label="Tennis photos" variant="wide-compact" />
      </div>

      <div className="p-6 sm:p-8 lg:p-10">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300"><Trophy aria-hidden="true" className="h-4 w-4" /> Beyond the screen</p>
        <h2 id="beyond-screen-heading" className="mt-3 text-2xl font-semibold sm:text-3xl">Tennis has always been part of my life.</h2>

        <div className="mt-6 max-w-4xl space-y-4 text-sm leading-7 text-slate-300 sm:text-base">
          <p>Tennis has been part of my life since I was a kid, and it’s one of the things I’ve kept with me even as school, work, and technology started taking up more of my time. I still love getting on court, competing, and trying to get a little better every time I play.</p>
          <p>During university, I’ve kept playing whenever I can, including competitive matches here in Halifax. It gives me something completely different from sitting behind a screen all day—sometimes I just want a racket, a court, and a good match.</p>
          <p>Funny enough, tennis eventually became part of my work life too. I now work at HEADStart Tennis Centre, so even when I’m not the one playing, I’m still around courts, players, coaches, sessions, and the sport I grew up enjoying.</p>
          <p>This section isn’t really about adding another achievement to the portfolio. I just wanted part of the site to show something I genuinely enjoy outside technology.</p>
        </div>

        <p className="mt-7 border-t border-white/10 pt-5 text-sm text-slate-400">
          Playing since childhood <span aria-hidden="true">·</span> Still competing <span aria-hidden="true">·</span> Halifax, Nova Scotia
        </p>
      </div>
    </section>
  );
}

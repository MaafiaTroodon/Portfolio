"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MediaItem } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

type MediaCarouselProps = {
  items: MediaItem[];
  className?: string;
  interval?: number;
  priority?: boolean;
  label: string;
  variant?: "default" | "wide" | "wide-compact";
};

export function MediaCarousel({
  items,
  className,
  interval = 3000,
  priority = false,
  label,
  variant = "default",
}: MediaCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const reduceMotion = useReducedMotion();
  const touchStartX = useRef<number | null>(null);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => (current - 1 + items.length) % items.length);
  }, [items.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    const onVisibilityChange = () => setIsVisible(!document.hidden);
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    if (!isVisible || items.length < 2) return;
    const timer = window.setTimeout(showNext, interval);
    return () => window.clearTimeout(timer);
  }, [activeIndex, interval, isVisible, items.length, showNext]);

  if (!items.length) return null;

  const activeItem = items[activeIndex];

  return (
    <section
      aria-label={label}
      aria-roledescription="carousel"
      data-active-index={activeIndex}
      className={cn("relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950", className)}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const distance = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
        if (Math.abs(distance) > 45) {
          if (distance > 0) showPrevious();
          else showNext();
        }
        touchStartX.current = null;
      }}
    >
      <div
        className={cn(
          "relative min-h-[22rem]",
          variant === "wide"
            ? "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[16/7] lg:min-h-[30rem]"
            : variant === "wide-compact"
              ? "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[16/7] lg:min-h-[23rem]"
            : "aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]",
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeItem.src}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.45 }}
            className="absolute inset-0"
          >
            {variant !== "default" ? (
              <>
                <Image
                  src={activeItem.src}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="100vw"
                  className="scale-110 object-cover opacity-35 blur-2xl"
                  style={{ objectPosition: activeItem.objectPosition ?? "center" }}
                />
                <div className="absolute inset-0 bg-slate-950/20" />
              </>
            ) : null}
            <Image
              src={activeItem.src}
              alt={activeItem.alt}
              fill
              priority={priority && activeIndex === 0}
              sizes={variant !== "default" ? "(max-width: 768px) 100vw, 90vw" : "(max-width: 1024px) 100vw, 42vw"}
              className={variant !== "default" ? "object-contain" : "object-cover"}
              style={{ objectPosition: activeItem.objectPosition ?? "center" }}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent px-5 pb-5 pt-20">
              <p className="text-sm font-semibold text-white">{activeItem.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-200">{activeItem.caption}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={showPrevious}
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/75 text-white shadow-lg backdrop-blur transition hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
              aria-label="Show previous image"
            >
              <ChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={showNext}
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/75 text-white shadow-lg backdrop-blur transition hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
              aria-label="Show next image"
            >
              <ChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {items.length > 1 && (
        <div className="absolute bottom-3 right-4 flex items-center gap-2" aria-label="Choose image">
          {items.map((item, index) => (
            <button
              key={item.src}
              type="button"
              aria-label={`Show image ${index + 1}: ${item.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-2.5 rounded-full border border-white/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
                index === activeIndex ? "w-7 bg-violet-300" : "w-2.5 bg-white/55 hover:bg-white",
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
}

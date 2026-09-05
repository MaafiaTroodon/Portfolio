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
  const imageSizes = variant !== "default" ? "(max-width: 768px) 100vw, 90vw" : "(max-width: 1024px) 100vw, 42vw";
  const nearbyItems = items.length > 1
    ? [...new Set([(activeIndex + 1) % items.length, (activeIndex - 1 + items.length) % items.length])]
        .filter((index) => index !== activeIndex)
        .map((index) => items[index])
    : [];

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
          "relative w-full",
          variant === "wide"
            ? "h-72 sm:h-auto sm:aspect-[16/9] lg:aspect-[16/7] lg:min-h-[30rem]"
            : variant === "wide-compact"
              ? "h-72 sm:h-auto sm:aspect-[16/9] lg:aspect-[16/7] lg:min-h-[23rem]"
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
                  sizes={imageSizes}
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
              sizes={imageSizes}
              className={variant !== "default" ? "object-contain" : "object-cover"}
              style={{ objectPosition: activeItem.objectPosition ?? "center" }}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent px-4 pb-14 pt-20 sm:px-5 sm:pb-5">
              <p className="text-sm font-semibold text-white">{activeItem.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-200">{activeItem.caption}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div aria-hidden="true" data-carousel-preload className="pointer-events-none absolute inset-0 opacity-0">
          {nearbyItems.map((item) => (
            <Image
              key={`preload-${item.src}`}
              src={item.src}
              alt=""
              fill
              sizes={imageSizes}
              className={variant !== "default" ? "object-contain" : "object-cover"}
            />
          ))}
        </div>

        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={showPrevious}
              className="absolute left-2 top-[40%] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/75 text-white shadow-lg backdrop-blur transition hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 sm:left-3 sm:top-1/2"
              aria-label="Show previous image"
            >
              <ChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={showNext}
              className="absolute right-2 top-[40%] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/75 text-white shadow-lg backdrop-blur transition hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 sm:right-3 sm:top-1/2"
              aria-label="Show next image"
            >
              <ChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {items.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex max-w-[calc(100%-1rem)] -translate-x-1/2 items-center gap-2 rounded-full bg-slate-950/55 px-2 py-1 backdrop-blur sm:left-auto sm:right-4 sm:translate-x-0 sm:bg-transparent sm:p-0" aria-label="Choose image">
          {items.map((item, index) => (
            <button
              key={item.src}
              type="button"
            aria-label={`Show image ${index + 1}: ${item.title}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => setActiveIndex(index)}
            className="flex h-7 w-7 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            <span aria-hidden="true" className={cn("h-2.5 rounded-full border border-white/40 transition-all", index === activeIndex ? "w-5 bg-violet-300" : "w-2.5 bg-white/55")} />
          </button>
          ))}
        </div>
      )}
    </section>
  );
}

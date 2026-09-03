"use client";

import Image from "next/image";
import { ExternalLink, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { CaseStudyMedia } from "@/lib/portfolio-data";

type ImageLightboxProps = {
  item: CaseStudyMedia;
  onClose: () => void;
};

export function ImageLightbox({ item, onClose }: ImageLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !dialogRef.current) return;
      const controls = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>("button, a[href], [tabindex]:not([tabindex='-1'])"),
      );
      if (!controls.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lightbox-title"
        aria-describedby="lightbox-caption"
        className="flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-slate-950 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4">
          <div>
            <h2 id="lightbox-title" className="text-lg font-semibold text-white">
              {item.title}
            </h2>
            <p id="lightbox-caption" className="mt-1 max-w-3xl text-sm text-slate-300">
              {item.caption}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close image preview"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
        <div className="relative min-h-0 flex-1 overflow-auto bg-white/95 p-3 sm:p-6">
          <div className="relative mx-auto min-h-[65vh] w-full">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="95vw"
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex justify-end border-t border-white/10 px-5 py-3">
          <a
            href={item.src}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-medium text-violet-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
          >
            Open original <ExternalLink aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

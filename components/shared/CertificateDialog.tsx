"use client";

import Image from "next/image";
import { ExternalLink, FileText, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { certificateLinks, type CertificateItem } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

type CertificateDialogButtonsProps = {
  certificates?: readonly CertificateItem[];
};

export function CertificateDialogButtons({ certificates = certificateLinks }: CertificateDialogButtonsProps) {
  const [selected, setSelected] = useState<CertificateItem | null>(null);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  const closeDialog = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDialog();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          "button, a[href], iframe, [tabindex]:not([tabindex='-1'])",
        ),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
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
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    };
  }, [closeDialog, selected]);

  const openDialog = (certificate: CertificateItem, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setSelected(certificate);
  };

  return (
    <>
      {certificates.map((certificate) => (
        <button
          key={certificate.href}
          type="button"
          onClick={(event) => openDialog(certificate, event.currentTarget)}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 text-xs font-medium text-slate-100 transition hover:border-violet-300/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
          aria-haspopup="dialog"
        >
          {certificate.type === "PDF" ? <FileText aria-hidden="true" className="h-3.5 w-3.5" /> : null}
          {certificate.label}
        </button>
      ))}

      {mounted && selected
        ? createPortal(
            <div
              className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/90 p-3 backdrop-blur-md sm:p-6"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) closeDialog();
              }}
              data-testid="certificate-backdrop"
            >
              <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="certificate-dialog-title"
                className="flex max-h-[94dvh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-slate-950 shadow-2xl shadow-black/70"
              >
                <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-5">
                  <h2 id="certificate-dialog-title" className="text-lg font-semibold text-white sm:text-xl">
                    {selected.title ?? selected.label}
                  </h2>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={closeDialog}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
                    aria-label="Close certificate preview"
                  >
                    <X aria-hidden="true" className="h-5 w-5" />
                  </button>
                </div>

                <div className="min-h-0 flex-1 overflow-auto bg-slate-900/80 p-3 sm:p-5">
                  {selected.type === "Image" ? (
                    <div className="relative mx-auto aspect-[4/3] min-h-[55dvh] w-full max-w-5xl overflow-hidden rounded-xl bg-black/25">
                      <Image
                        src={selected.href}
                        alt={selected.alt ?? selected.title ?? selected.label}
                        fill
                        sizes="(max-width: 768px) 96vw, 80vw"
                        className={cn("object-contain p-2 sm:p-5", selected.rotate && "rotate-90")}
                        priority
                      />
                    </div>
                  ) : (
                    <div className="overflow-hidden rounded-xl bg-white">
                      <iframe
                        src={`${selected.href}#view=FitH`}
                        title="Certificate of Appreciation PDF preview"
                        className="h-[68dvh] w-full border-0"
                      />
                    </div>
                  )}
                </div>

                {selected.type === "PDF" ? (
                  <div className="flex justify-end border-t border-white/10 px-4 py-3 sm:px-5">
                    <a
                      href={selected.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-xs font-medium text-violet-200 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
                    >
                      Open PDF if the preview is unavailable
                      <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
                    </a>
                  </div>
                ) : null}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

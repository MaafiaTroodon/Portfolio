"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface SheetProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "left" | "right";
}

export function Sheet({ children, open, onOpenChange }: SheetProps) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition-all",
        open ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
      )}
      onClick={() => onOpenChange(false)}
    >
      {children}
    </div>
  );
}

export function SheetContent({ side = "right", className, children, ...props }: SheetContentProps) {
  return (
    <div
      className={cn(
        "fixed z-50 h-full w-80 bg-background border-l border-border shadow-lg transition-transform duration-300 overflow-y-auto",
        side === "left" ? "left-0" : "right-0",
        className
      )}
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      {children}
    </div>
  );
}

export function SheetHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex flex-col space-y-2 p-6", className)}>{children}</div>;
}

export function SheetTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>;
}

export function SheetClose({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
    >
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </button>
  );
}


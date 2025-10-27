"use client";

import { useState, useEffect } from "react";
import { Search, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

const commands = [
  { id: "home", label: "Home", path: "/", shortcut: "H" },
  { id: "about", label: "About", path: "/about", shortcut: "A" },
  { id: "projects", label: "Projects", path: "/projects", shortcut: "P" },
  { id: "resume", label: "Resume", path: "/resume", shortcut: "R" },
  { id: "contact", label: "Contact", path: "/contact", shortcut: "C" },
];

export function CommandK() {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % commands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => (i - 1 + commands.length) % commands.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        router.push(commands[selectedIndex].path);
        setOpen(false);
      } else if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, selectedIndex, router]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-lg rounded-lg border bg-background p-2 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search commands..."
            className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
            autoFocus
          />
          <kbd className="pointer-events-none flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
            ESC
          </kbd>
        </div>
        <div className="py-2">
          {commands.map((cmd, index) => (
            <Link
              key={cmd.id}
              href={cmd.path}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center justify-between rounded-md px-3 py-2 transition-colors",
                selectedIndex === index && "bg-accent"
              )}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{cmd.label}</span>
                <kbd className="pointer-events-none flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
                  {cmd.shortcut}
                </kbd>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
        <div className="border-t px-3 py-2 text-xs text-muted-foreground">
          <kbd className="pointer-events-none flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
            ↵
          </kbd>
          {" "}to select •{" "}
          <kbd className="pointer-events-none flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
            ↑↓
          </kbd>
          {" "}to navigate
        </div>
      </div>
    </div>
  );
}


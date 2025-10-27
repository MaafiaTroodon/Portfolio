import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwindcss-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function getRelativeTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const months = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24 * 30));

  if (months < 1) return "Just started";
  if (months < 12) return `${months} ${months === 1 ? "month" : "months"} ago`;
  const years = Math.floor(months / 12);
  return `${years} ${years === 1 ? "year" : "years"} ago`;
}


"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  delay?: number;
}

export function Tooltip({ children, content, delay = 200 }: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="relative inline-block" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      {isVisible && (
        <div
          className={cn(
            "absolute z-50 px-2 py-1 text-xs text-popover-foreground bg-popover border rounded-md shadow-md",
            "animate-in fade-in-0 zoom-in-95"
          )}
          style={{
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            marginBottom: "8px",
          }}
        >
          {content}
          <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-popover" />
        </div>
      )}
    </div>
  );
}


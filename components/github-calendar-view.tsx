"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionsViewProps {
  displayWeeks: ContributionDay[][];
}

// --- Hoisted Logic (Rule: js-cache-function-results & rendering-hoist-jsx) ---

const formatContributionDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "long" });
  
  // Add ordinal suffix (st, nd, rd, th)
  const suffix = (day: number) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  };

  return `${month} ${day}${suffix(day)}.`;
};

const getLevelClass = (level: number) => {
    switch (level) {
        case 1:  return "fill-[#ffecec] dark:fill-[#3a0c0c]";
        case 2:  return "fill-[#ffcaca] dark:fill-[#6b1414]";
        case 3:  return "fill-[#ff6b6b] dark:fill-[#c92a2a]";
        case 4:  return "fill-[#800000] dark:fill-[#ff4b4b]";
        default: return "fill-[#f3f4f6] dark:fill-[#161b22]";
    }
};

// --- Skeleton Component (Rule: async-suspense-boundaries) ---

export function GitHubContributionSkeleton() {
    return (
        <div className="flex flex-col gap-[4px] opacity-10 animate-pulse py-10">
            {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="flex gap-[4px]">
                    {Array.from({ length: 53 }).map((_, j) => (
                        <div key={j} className="w-[12px] h-[12px] rounded-[3px] bg-foreground/20" />
                    ))}
                </div>
            ))}
        </div>
    );
}

export function GitHubContributionView({ displayWeeks }: ContributionsViewProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="overflow-x-auto scrollbar-hide -mx-6 px-6">
        <div className="min-w-[760px] md:min-w-0">
          <svg
            viewBox={`0 0 ${displayWeeks.length * 16} ${7 * 16}`}
            className="w-full h-auto"
            shapeRendering="crispEdges"
          >
            {displayWeeks.map((week, weekIdx) => (
              <g key={weekIdx} transform={`translate(${weekIdx * 16}, 0)`}>
                {week.map((day, dayIdx) => (
                  <Tooltip key={dayIdx}>
                    <TooltipTrigger asChild>
                      <rect
                        x={0}
                        y={dayIdx * 16}
                        width={12}
                        height={12}
                        rx={3}
                        ry={3}
                        className={cn("outline-none", getLevelClass(day.level))}
                      />
                    </TooltipTrigger>
                    <TooltipContent 
                        side="top" 
                        className="bg-zinc-800 text-white border-none px-3 py-1.5 rounded-lg shadow-xl pointer-events-none"
                    >
                      <p className="font-bold text-[10px] md:text-sm">
                        {`${day.count === 0 ? "No" : day.count} contributions on ${formatContributionDate(day.date)}`}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </g>
            ))}
          </svg>
        </div>
      </div>
    </TooltipProvider>
  );
}

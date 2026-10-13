"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

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

// Memoized week column: skips re-render when the shared tooltip state changes.
const WeekColumn = React.memo(function WeekColumn({ week, offset }: { week: ContributionDay[]; offset: number }) {
  return (
    <g transform={`translate(${offset}, 0)`}>
      {week.map((day, dayIdx) => (
        <rect
          key={`${day.date}-${dayIdx}`}
          x={0}
          y={dayIdx * 16}
          width={12}
          height={12}
          rx={3}
          ry={3}
          data-date={day.date}
          data-count={day.count}
          className={cn("outline-none", getLevelClass(day.level))}
        >
          <title>{`${day.count === 0 ? "No" : day.count} contributions on ${formatContributionDate(day.date)}`}</title>
        </rect>
      ))}
    </g>
  );
});

export const GitHubContributionView = React.memo(function GitHubContributionView({ displayWeeks }: ContributionsViewProps) {
  const [tip, setTip] = React.useState<{ x: number; y: number; text: string } | null>(null);
  const wrapRef = React.useRef<HTMLDivElement>(null);

  // Single delegated listener instead of ~370 per-cell tooltip instances.
  const onMove = (e: React.MouseEvent) => {
    const t = e.target as SVGRectElement;
    if (t.tagName !== "rect" || !t.dataset.date) {
      setTip((prev) => (prev ? null : prev));
      return;
    }
    const wrap = wrapRef.current;
    if (!wrap) return;
    const box = wrap.getBoundingClientRect();
    const count = Number(t.dataset.count);
    const x = Math.min(
      Math.max(e.clientX - box.left + wrap.scrollLeft, 80),
      wrap.scrollWidth - 80
    );
    setTip({
      x,
      y: e.clientY - box.top,
      text: `${count === 0 ? "No" : count} contributions on ${formatContributionDate(t.dataset.date)}`,
    });
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={() => setTip(null)}
      className="relative overflow-x-auto scrollbar-hide -mx-6 px-6"
    >
      <div className="min-w-[760px] md:min-w-0">
        <svg
          viewBox={`0 0 ${displayWeeks.length * 16} ${7 * 16}`}
          className="w-full h-auto"
        >
          {displayWeeks.map((week, weekIdx) => (
            <WeekColumn key={weekIdx} week={week} offset={weekIdx * 16} />
          ))}
        </svg>
      </div>
      {tip && (
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-full bg-zinc-800 text-white border-none px-3 py-1.5 rounded-lg shadow-xl pointer-events-none whitespace-nowrap"
          style={{ left: tip.x, top: tip.y - 10 }}
        >
          <p className="font-bold text-[10px] md:text-sm">{tip.text}</p>
        </div>
      )}
    </div>
  );
});

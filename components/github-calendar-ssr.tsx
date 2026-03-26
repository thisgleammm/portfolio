import * as React from "react";
import { getGitHubContributions } from "@/lib/github";
import { GitHubContributionView } from "./github-calendar-view";
import { cn } from "@/lib/utils";

interface Props {
  username: string;
}

export async function GitHubContributionSSR({ username }: Props) {
  const data = await getGitHubContributions(username);
  
  if (!data) return null;

  // Last 52 weeks (approx 364 days)
  const contributions = data.contributions.slice(-371); // A bit more to ensure full weeks
  
  // Group by weeks (columns)
  const weeks: (typeof contributions)[] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  // Slice to exactly 53 weeks to fit most screens nicely
  const displayWeeks = weeks.slice(-53);


  return (
    <section 
      className="w-full py-20 px-6 relative overflow-hidden group shrink-0"
      style={{ 
        contentVisibility: 'auto', 
        containIntrinsicSize: '0 400px',
        willChange: 'transform'
      } as React.CSSProperties}
    >
      {/* Reduced Blur for Performance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[40%] bg-primary/5 blur-[60px] rounded-full opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-1.5">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-md bg-foreground/5 border border-foreground/10 text-foreground">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                    </div>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-primary/80">Open Source</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground uppercase">GitHub <span className="text-primary/20 dark:text-white/20">Contributions</span></h3>
            </div>
            <p className="max-w-xs text-xs md:text-sm text-muted-foreground font-medium opacity-60 leading-relaxed border-l-2 border-primary/20 pl-4 py-1">A visual representation of my coding activity and open-source contributions over the past year.</p>
        </div>
        
        <div className="relative w-full overflow-hidden">
            <GitHubContributionView displayWeeks={displayWeeks} />
            
            {/* Stats */}
            <div className="mt-6 flex gap-8 text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-40 px-6">
              <div className="flex items-center gap-2">
                <span className="text-primary">{Object.values(data.total).reduce((a, b) => a + b, 0)}</span>
                <span>contributions in the last year</span>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}

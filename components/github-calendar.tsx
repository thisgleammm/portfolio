"use client";

import * as React from "react";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export const GitHubContributionGraph = React.memo(() => {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Custom theme mapping with the project's primary accent (Maroon)
  const themeValues = {
    light: [
        "#f3f4f6", // Level 0 (Empty)
        "#ffecec", // Level 1
        "#ffcaca", // Level 2
        "#ff6b6b", // Level 3
        "#800000"  // Level 4 (Full)
    ],
    dark: [
        "#161b22", // Level 0 (Empty)
        "#3a0c0c", // Level 1
        "#6b1414", // Level 2
        "#c92a2a", // Level 3
        "#ff4b4b"  // Level 4 (Full)
    ],
  };

  return (
    <section 
      className="w-full py-20 px-6 relative overflow-hidden group shrink-0"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[40%] bg-primary/5 blur-[120px] rounded-full opacity-50 transition-opacity duration-1000 group-hover:opacity-100 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-1.5">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-md bg-foreground/5 border border-foreground/10 text-foreground">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                    </div>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-primary/80">
                        Open Source
                    </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground uppercase">
                    GitHub <span className="text-primary/20 dark:text-white/20">Contributions</span>
                </h3>
            </div>
            
            <p className="max-w-xs text-xs md:text-sm text-muted-foreground font-medium opacity-60 leading-relaxed border-l-2 border-primary/20 pl-4 py-1">
                A visual representation of my coding activity and open-source contributions over the past year.
            </p>
        </div>
        
        {/* Graph Container */}
        <div className="relative will-change-transform">
            {/* Glass Container */}
            <div className="glass capsule p-8 md:p-12 overflow-x-auto scrollbar-hide border border-white/10 backdrop-blur-3xl transition-all duration-500 hover:border-primary/20">
                <div className="min-w-[760px] md:min-w-0 flex justify-center">
                    {isMounted ? (
                      <GitHubCalendar 
                          username="thisgleammm" 
                          fontSize={11}
                          blockSize={12}
                          blockRadius={3}
                          blockMargin={4}
                          colorScheme={theme === "dark" ? "dark" : "light"}
                          theme={{
                              light: themeValues.light,
                              dark: themeValues.dark
                          }}
                      />
                    ) : (
                      // Mock Grid Placeholder for smoother initial appearance
                      <div className="flex flex-col gap-[4px] opacity-10">
                        {Array.from({ length: 7 }).map((_, i) => (
                          <div key={i} className="flex gap-[4px]">
                            {Array.from({ length: 52 }).map((_, j) => (
                              <div key={j} className="w-[12px] h-[12px] rounded-[3px] bg-foreground/20" />
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                </div>
            </div>

            {/* Subtle Gradient Overlays for mobile scrolling */}
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent md:hidden pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent md:hidden pointer-events-none" />
        </div>

      </div>
    </section>
  );
});

GitHubContributionGraph.displayName = "GitHubContributionGraph";

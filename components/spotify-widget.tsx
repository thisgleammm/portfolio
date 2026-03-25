"use client";

import * as React from "react";
import { Music } from "lucide-react";

export function SpotifyWidget() {
  return (
    <div className="glass capsule flex items-center gap-3 px-4 py-1.5 hover:bg-accent-muted transition-all group overflow-hidden max-w-[240px]">
      <div className="relative flex items-center justify-center w-8 h-8 rounded-md bg-black/10 dark:bg-white/10 overflow-hidden">
        {/* Placeholder Artist Image / Icon */}
        <Music className="w-4 h-4 text-primary animate-pulse" />
      </div>

      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Now Playing</span>
          {/* Sound Wave Animation */}
          <div className="flex gap-0.5 h-2 items-end">
            <div className="w-0.5 bg-primary animate-[bounce-slow_1s_infinite]" style={{ height: '60%' }}></div>
            <div className="w-0.5 bg-primary animate-[bounce-slow_0.8s_infinite]" style={{ height: '100%' }}></div>
            <div className="w-0.5 bg-primary animate-[bounce-slow_1.2s_infinite]" style={{ height: '40%' }}></div>
          </div>
        </div>
        <div className="truncate text-xs font-semibold tracking-tight text-foreground">
          Maroon 5 - Memories
        </div>
      </div>
    </div>
  );
}

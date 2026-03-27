"use client";

import * as React from "react";
import Image from "next/image";
import { Music } from "lucide-react";

type MusicData = {
  album?: string;
  albumImageUrl?: string;
  artist?: string;
  isPlaying: boolean;
  songUrl?: string;
  title?: string;
};

export function MusicWidget() {
  const [data, setData] = React.useState<MusicData | null>(null);

  React.useEffect(() => {
    const fetchMusic = async () => {
      try {
        const response = await fetch("/api/music");
        if (response.ok) {
          setData(await response.json());
        }
      } catch (error) {
        console.error("Error fetching Music:", error);
      }
    };

    fetchMusic();
    const interval = setInterval(fetchMusic, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (!data) return (
    <div className="glass capsule flex items-center gap-3 px-4 py-1.5 opacity-50 grayscale">
      <Music className="w-4 h-4 text-primary animate-pulse" />
      <span className="text-xs font-medium text-foreground">Connecting…</span>
    </div>
  );

  return (
    <a 
      href="https://open.spotify.com/user/9cwjufmua8kgvf6py6g9igc7m" 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label="View Spotify Profile"
      className="glass capsule flex items-center gap-3 px-4 py-1.5 hover:bg-accent-muted transition-all group overflow-hidden max-w-[240px] outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div className="relative flex items-center justify-center w-8 h-8 rounded-md bg-black/10 dark:bg-white/10 overflow-hidden shrink-0">
        {data.albumImageUrl ? (
          <Image 
            src={data.albumImageUrl} 
            alt={data.album || "Album Art"} 
            width={32}
            height={32}
          />
        ) : (
          <Music className="w-4 h-4 text-primary" />
        )}
      </div>

      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
            {data.isPlaying ? "Now Playing" : "Offline"}
          </span>
          {data.isPlaying && (
            <div className="flex gap-0.5 h-2 items-end">
              <div className="w-0.5 bg-primary animate-[bounce-slow_1s_infinite]" style={{ height: '60%' }}></div>
              <div className="w-0.5 bg-primary animate-[bounce-slow_0.8s_infinite]" style={{ height: '100%' }}></div>
              <div className="w-0.5 bg-primary animate-[bounce-slow_1.2s_infinite]" style={{ height: '40%' }}></div>
            </div>
          )}
        </div>
        <div className="truncate text-xs font-semibold tracking-tight text-foreground">
          {data.title ? `${data.artist} - ${data.title}` : "Not Listening"}
        </div>
      </div>
    </a>
  );
}

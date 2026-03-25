"use client";

import * as React from "react";
import { Music } from "lucide-react";

type SpotifyData = {
  album?: string;
  albumImageUrl?: string;
  artist?: string;
  isPlaying: boolean;
  songUrl?: string;
  title?: string;
};

export function SpotifyWidget() {
  const [data, setData] = React.useState<SpotifyData | null>(null);

  React.useEffect(() => {
    const fetchSpotify = async () => {
      try {
        const response = await fetch("/api/spotify");
        if (response.ok) {
          setData(await response.json());
        }
      } catch (error) {
        console.error("Error fetching Spotify:", error);
      }
    };

    fetchSpotify();
    const interval = setInterval(fetchSpotify, 30000); // Poll every 30 seconds
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
      href={data.songUrl || "#"} 
      target="_blank" 
      rel="noopener noreferrer"
      className="glass capsule flex items-center gap-3 px-4 py-1.5 hover:bg-accent-muted transition-all group overflow-hidden max-w-[240px]"
    >
      <div className="relative flex items-center justify-center w-8 h-8 rounded-md bg-black/10 dark:bg-white/10 overflow-hidden shrink-0">
        {data.albumImageUrl ? (
          <img 
            src={data.albumImageUrl} 
            alt={data.album || "Album Art"} 
            className={data.isPlaying ? "animate-[spin_10s_linear_infinite]" : ""}
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

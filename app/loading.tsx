import * as React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="flex flex-col items-center gap-6">
        <div className="relative flex items-center justify-center h-20 w-20">
          <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin h-full w-full" />
          <div className="h-4 w-4 bg-primary rounded-full animate-pulse" />
        </div>
        <span className="text-sm font-bold tracking-[0.3em] uppercase opacity-40 animate-pulse text-foreground">
          Establishing Connection
        </span>
      </div>
    </div>
  );
}

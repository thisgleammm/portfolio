import * as React from "react";
import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background px-6 text-center transition-colors duration-500 overflow-hidden relative">
      <div className="flex flex-col items-center gap-8 max-w-2xl relative z-10 transition-all">
        <div className="relative">
          <h1 className="text-[25vw] md:text-[200px] font-black tracking-tighter text-foreground/5 dark:text-white/5 uppercase select-none leading-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-2 w-32 md:w-64 bg-primary/20 blur-[10px]" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter uppercase leading-none">
            System Failure
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg font-medium max-w-md mx-auto leading-relaxed">
            The page you are looking for has been moved, deleted, or never existed in this timeline.
          </p>
        </div>

        <Link 
          href="/" 
          className="glass capsule flex items-center gap-2 text-sm font-bold px-8 py-3 hover:bg-accent-muted transition-all active:scale-95 group focus-visible:ring-2 focus-visible:ring-primary outline-none"
        >
          <Home className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
          Back to Home
        </Link>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
    </main>
  );
}

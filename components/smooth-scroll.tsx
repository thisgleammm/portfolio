"use client";

import * as React from "react";
import { useEffect, createContext, useContext, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => {
  const context = useContext(LenisContext);
  return context;
};

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenisRef, setLenisRef] = useState<Lenis | null>(null);
  const pathname = usePathname();

  // Rule: rerender-memo & rendering-activity
  // Initialize Lenis with auto-resize enabled.
  // Perf: syncTouch disabled (native touch scroll is faster),
  // lerp raised to reduce floaty lag, autoRaf lets Lenis
  // drive its own RAF only when needed.
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.15,
      autoResize: true,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      syncTouch: false,
      autoRaf: true,
    });
    // Assign instance
    const instance = lenis;

    // Physical Scroll Optimization
    document.body.style.overscrollBehavior = "none";

    // Publish instance on next frame (avoids sync setState-in-effect cascade)
    const raf = requestAnimationFrame(() => setLenisRef(instance));

    // Cleanup
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      document.body.style.overscrollBehavior = "";
      setLenisRef(null);
    };
  }, []);

  // Rule: handling-route-transitions
  // Ensures Lenis recalculates viewport dimensions and resets scroll on navigation
  useEffect(() => {
    if (!lenisRef) return;

    // reset scroll to top immediately on navigation
    lenisRef.scrollTo(0, { immediate: true });
    
    // Re-calculate dimensions (Wait for DOM to update)
    const timeoutId = setTimeout(() => {
      lenisRef.resize();
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [pathname, lenisRef]);

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  );
}

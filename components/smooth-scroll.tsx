"use client";

import * as React from "react";
import { useEffect, createContext, useContext, useState, useRef } from "react";
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
  const rafId = useRef<number | null>(null);

  // Rule: rerender-memo & rendering-activity
  // Initialize Lenis with auto-resize enabled
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      autoResize: true,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      syncTouch: true,
    });
    // Assign instance
    const instance = lenis;

    // Physical Scroll Optimization
    document.body.style.overscrollBehavior = "none";
    
    // Animation Loop
    let localRafId: number;
    const animate = (time: number) => {
      lenis.raf(time);
      localRafId = requestAnimationFrame(animate);
      rafId.current = localRafId;
    };

    const setRafId = requestAnimationFrame(() => {
      setLenisRef(instance);
      localRafId = requestAnimationFrame(animate);
      rafId.current = localRafId;
    });

    // Cleanup
    return () => {
      lenis.destroy();
      if (rafId.current) cancelAnimationFrame(rafId.current);
      cancelAnimationFrame(setRafId);
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

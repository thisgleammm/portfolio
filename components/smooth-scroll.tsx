"use client";

import * as React from "react";
import { useEffect, createContext, useContext, useState } from "react";
import Lenis from "lenis";

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => {
  const context = useContext(LenisContext);
  return context;
};

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenisRef, setLenisRef] = useState<Lenis | null>(null);

  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      lerp: 0.1,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      syncTouch: true,
    });

    setLenisRef(lenis);

    // 2. Optimization for Safari & Older Macs
    // Prevents conflicts with browser physical scroll
    document.body.style.overscrollBehavior = "none";
    
    // 3. Animation Loop
    let rafId: number;
    const animate = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    // 4. Cleanup
    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      document.body.style.overscrollBehavior = "";
      setLenisRef(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  );
}

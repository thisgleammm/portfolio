"use client";

import * as React from "react";
import { useEffect, createContext, useContext, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    
    // 3. Integration with GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    lenis.on("scroll", ScrollTrigger.update);

    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    // 4. Cleanup
    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerUpdate);
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

"use client";

import * as React from "react";
import { useMotionValue } from "framer-motion";

/**
 * Lenis-compatible scroll progress hook.
 * rAF-throttled: at most one motion-value set per frame.
 */
export function useScrollProgress() {
  const scrollY = useMotionValue(0);
  const scrollYProgress = useMotionValue(0);

  React.useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      ticking = false;
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollY.set(currentScrollY);
      scrollYProgress.set(scrollHeight > 0 ? currentScrollY / scrollHeight : 0);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollY, scrollYProgress]);

  return { scrollY, scrollYProgress };
}

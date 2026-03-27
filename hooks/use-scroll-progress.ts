"use client";

import * as React from "react";
import { useMotionValue } from "framer-motion";

/**
 * Lenis-compatible scroll progress hook.
 * Uses window.scrollY directly instead of Framer Motion's useScroll(),
 * which conflicts with Lenis's custom scroll container.
 */
export function useScrollProgress() {
  const scrollY = useMotionValue(0);
  const scrollYProgress = useMotionValue(0);

  React.useEffect(() => {
    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollY.set(currentScrollY);
      scrollYProgress.set(scrollHeight > 0 ? currentScrollY / scrollHeight : 0);
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();

    return () => window.removeEventListener("scroll", updateScroll);
  }, [scrollY, scrollYProgress]);

  return { scrollY, scrollYProgress };
}

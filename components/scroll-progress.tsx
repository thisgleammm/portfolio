"use client";

import * as React from "react";
import { motion, useMotionValue } from "framer-motion";

export function ScrollProgress() {
  const progress = useMotionValue(0);

  React.useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      ticking = false;
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      progress.set(scrollHeight > 0 ? scrollTop / scrollHeight : 0);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateProgress);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", onScroll);
  }, [progress]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left will-change-transform"
      style={{ scaleX: progress }}
    />
  );
}

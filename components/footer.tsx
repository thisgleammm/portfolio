"use client";

import * as React from "react";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import Link from "next/link";
import { SocialLink } from "@/components/ui/social-link";
import { useLenis } from "@/components/smooth-scroll";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const lenis = useLenis();

  const scrollToTop = () => {
    if (lenis) {
      // Menyesuaikan durasi dan easing agar sama dengan global config, 
      // namun dioptimalkan untuk responsivitas Safari.
      lenis.scrollTo(0, {
        duration: 1.0,
        easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-background pt-10 pb-12 px-6 md:px-10 border-t border-border/20">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        {/* Top Row: Copyright & Back to Top */}
        <div className="flex justify-between items-center mb-24">
          <div className="flex items-center gap-2 text-sm font-medium opacity-60">
            <span className="text-lg">©</span>
            {currentYear}
          </div>
          
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-sm font-bold tracking-tighter hover:opacity-100 transition-opacity uppercase"
          >
            <span className="opacity-60 group-hover:opacity-100 transition-opacity">Back to top</span>
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-foreground text-background flex items-center justify-center transition-transform group-hover:-translate-y-1">
              <ArrowUp className="w-5 h-5" />
            </div>
          </button>
        </div>

        {/* Middle Row: Hero Text */}
        <div className="flex flex-col mb-24">
          <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-foreground/50 uppercase mb-4">
            Have a project in mind?
          </span>
          <Link href="/contact" className="group inline-block w-full">
            <h2 className="text-6xl sm:text-7xl md:text-[10vw] font-black leading-none tracking-tighter text-muted-foreground/40 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-500 uppercase flex items-center justify-between sm:justify-start gap-2 md:gap-8">
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-10 h-10 sm:w-[8vw] sm:h-[8vw] opacity-100 sm:opacity-0 sm:-translate-x-4 sm:translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 text-primary shrink-0" />
            </h2>
          </Link>
        </div>

        {/* Bottom Row: Socials & Credits */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-12 border-t border-border/10 pt-12">
          
          {/* Social Links */}
          <div className="flex flex-wrap gap-3 md:gap-4">
            <SocialLink href="https://github.com/thisgleammm" label="Github" />
            <SocialLink href="https://linkedin.com/in/thisgleam/" label="Linkedin" />
            <SocialLink href="https://instagram.com/thisgleam/" label="Instagram" />
          </div>

          {/* Credits */}
          <div className="flex flex-col items-end text-right gap-1 font-medium">
            <div className="flex items-center gap-1.5 opacity-40 text-[10px] md:text-xs">
              Design inspired by <span className="text-foreground font-bold uppercase tracking-widest italic">The Avgxy</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs md:text-sm">
              <span className="opacity-40">Built by</span>
              <span className="text-foreground font-bold tracking-tight">thisgleam</span>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}

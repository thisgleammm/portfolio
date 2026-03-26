import * as React from "react";
import Link from "next/link";
import { HomeHero } from "@/components/home-hero";
import { Footer } from "@/components/footer";
import { GitHubContributionSSR } from "@/components/github-calendar-ssr";

export default async function Page() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground overflow-x-hidden selection:bg-accent selection:text-accent-foreground transition-colors duration-300">
      
      {/* Client-side Hero & Nav (Handles GSAP and Interactions) */}
      <HomeHero />

      {/* About Section (Static SSR) */}
      <section id="about" className="w-full px-6 pt-8 pb-10 md:pt-12 md:pb-16 bg-background relative z-10 transition-colors duration-500">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-12 max-w-3xl">
            Engineering the Future with Passion and Innovation
          </h2>

          {/* Divider with Icon */}
          <div className="relative w-full border-t border-black dark:border-white/20 my-16">
            <div className="absolute -top-8 right-10 md:right-20 glass h-16 w-16 rounded-full flex items-center justify-center border border-accent-muted shadow-xl bg-background">
              <svg className="w-7 h-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
          </div>

          {/* Content Block */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-10 text-lg md:text-xl leading-relaxed text-muted-foreground font-medium">
              <p className="mb-6">
                I&apos;m a software engineer based in <span className="text-foreground font-bold italic">Indonesia</span>, 
                currently interning at <span className="text-foreground font-bold">PT. Kayaba Indonesia</span> while pursuing my degree.
              </p>
              <p className="mb-6">
                Over the past year, I&apos;ve worked on production-grade systems, from computer vision pipelines 
                for workplace safety detection to full-stack web applications.
              </p>
              <p>
                I specialize in backend and web development, with hands-on experience in ML integration, 
                building systems that are functional, efficient, and grounded in real-world constraints.
              </p>
            </div>
          </div>

          {/* About Me Button (Bottom Right) */}
          <div className="flex justify-end mt-12">
            <Link 
              href="/about" 
              className="glass capsule flex items-center gap-2 text-sm font-bold px-6 py-2.5 hover:bg-accent-muted transition-all active:scale-95 group"
            >
              About Me
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* GitHub Contribution (Server Component - 100% Instant) */}
      <GitHubContributionSSR username="thisgleammm" />

      <Footer />

      {/* Static Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-background transition-colors duration-500">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-primary/5 blur-[80px] rounded-full animate-pulse-slow will-change-transform" />
        <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-primary/5 blur-[60px] rounded-full animate-pulse-slow delay-700 will-change-transform" />
      </div>
    </div>
  );
}

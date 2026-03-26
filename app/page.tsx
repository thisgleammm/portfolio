import * as React from "react";
import { HomeHero } from "@/components/home-hero";
import { Footer } from "@/components/footer";
import { GitHubContributionSSR } from "@/components/github-calendar-ssr";
import { GitHubContributionSkeleton } from "@/components/github-calendar-view";
import { AboutSection } from "@/components/about-section";
import { ScrollReveal } from "@/components/scroll-reveal";
import { FeaturedProjects } from "@/components/featured-projects";

export default async function Page() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground overflow-x-hidden selection:bg-accent selection:text-accent-foreground transition-colors duration-300">
      
      {/* Client-side Hero & Nav */}
      <HomeHero />

      {/* About Section (Interactive Reveal - Client Component) */}
      <AboutSection />

      {/* Featured Projects Highlight (Rule: project-showcase) */}
      <FeaturedProjects />

      {/* GitHub Section Reveal (Client Reveal Wrapper) */}
      <ScrollReveal>
        <React.Suspense fallback={<GitHubContributionSkeleton />}>
            <GitHubContributionSSR username="thisgleammm" />
        </React.Suspense>
      </ScrollReveal>

      <Footer />

      {/* Static Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-background transition-colors duration-500">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-primary/5 blur-[80px] rounded-full animate-pulse-slow will-change-transform" />
        <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-primary/5 blur-[60px] rounded-full animate-pulse-slow delay-700 will-change-transform" />
      </div>
    </div>
  );
}

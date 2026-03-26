import { DetailedProjects } from "@/components/detailed-projects";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export const metadata = {
  title: "Projects | Muhammad Gleam Mulyawan",
  description: "A comprehensive showcase of software engineering projects, from computer vision systems to full-stack web applications.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen w-full flex flex-col bg-background text-foreground transition-colors duration-500 selection:bg-primary/20 selection:text-primary">
      <Navbar />

      {/* Header */}
      <div className="container mx-auto px-6 pt-40 pb-12">
        <div className="flex flex-col gap-4 max-w-4xl">
          <span className="text-sm font-black uppercase tracking-[0.4em] text-primary/60">Archive / Production</span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-none text-foreground">
            Work <br /> <span className="text-primary italic">Lab</span>
          </h1>
          <p className="mt-8 text-lg md:text-2xl text-muted-foreground font-medium leading-relaxed max-w-2xl">
            A curated selection of systems and applications I&apos;ve engineered, focusing on performance, impact, and technical depth.
          </p>
        </div>
      </div>

      {/* Reusing Featured (for now) but could expand with more sections */}
      <DetailedProjects />

      <section className="container mx-auto px-6 py-32 border-t border-accent-muted/10 text-center">
        <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase text-muted-foreground/40 leading-none">
            More projects <br /> available on <span className="text-foreground">GitHub</span>
          </h2>
          <a 
            href="https://github.com/thisgleammm" 
            target="_blank" 
            className="px-10 py-4 bg-foreground text-background dark:bg-white dark:text-black rounded-full text-sm font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Explore Repositories
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}

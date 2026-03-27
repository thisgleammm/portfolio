"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface MinimalProject {
  title: string;
  year: string;
  tech: string[];
  href: string;
}

const PROJECTS: MinimalProject[] = [
  {
    title: "Discord Music Bot",
    year: "2021",
    tech: ["Javascript", "Discord.js"],
    href: "https://github.com/thisgleam/thisgleam-botmusic",
  },
  {
    title: "Beezleboy Discord Bot",
    year: "2022",
    tech: ["Javascript", "Discord.js"],
    href: "https://github.com/thisgleam/BeezleboyBot",
  },
  {
    title: "SIMPEL | STMI Interactive Management Platform for E-Learning",
    year: "2024",
    tech: ["Laravel", "Tailwind CSS", "MySQL", "Alpine JS"],
    href: "https://github.com/thisgleammm/stmi-lms",
  },
  {
    title: "SEACATERING",
    year: "2025",
    tech: ["Next.js", "Tailwind CSS", "PostgreSQL"],
    href: "https://github.com/thisgleammm/seacatering",
  },
  {
    title: "Digital Invoice System | Lombok NTB Pearls",
    year: "2025",
    tech: ["PHP", "MariaDB", "Bootstrap"],
    href: "",
  },
  {
    title: "Warehouse System | Reisen Gear",
    year: "2025",
    tech: ["PHP", "MariaDB", "Bootstrap"],
    href: "",
  },
  {
    title: "Motorcycle Workshop Management Application | Raffli Motor",
    year: "2025",
    tech: ["Flutter", "PostgreSQL", "Supabase", "Dart", "Next.js"],
    href: "",
  },
  {
    title: "Leakage Tester",
    year: "2026",
    tech: ["Python", "Raspberry Pi", "MySQL", "Open CV"],
    href: "",
  },
  {
    title: "POKETENASHI Safety Detection",
    year: "2026",
    tech: ["Python", "TensorFlow", "MySQL", "YOLO"],
    href: "",
  },
];

export function FeaturedProjects() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scrollLineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);
  const scrollLineOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="w-full py-32 px-6 bg-background relative transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24 relative">
          
          {/* Sticky Header Column */}
          <div className="lg:sticky lg:top-32 h-fit space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60 block">Selected Works</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none italic text-primary">
                Project <br /> <span className="text-foreground not-italic">Briefs</span>
              </h2>
              <p className="text-sm text-muted-foreground max-w-xs font-medium leading-relaxed">
                A showcase of system architecture, enterprise solutions, and creative engineering across various industries.
              </p>
            </motion.div>

            <Link 
              href="/projects" 
              className="inline-flex items-center gap-2 group mt-8"
            >
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
                Explore Full Archive
              </span>
              <div className="w-8 h-8 rounded-full border border-accent-muted/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all">
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
              </div>
            </Link>
          </div>

          {/* Scrolling Projects Column */}
          <div className="relative">
            {/* Scroll Progress Line */}
            <div className="absolute -left-12 top-0 bottom-0 w-px bg-accent-muted/10 hidden lg:block">
              <motion.div 
                style={{ height: scrollLineHeight, opacity: scrollLineOpacity }}
                className="w-px bg-primary origin-top"
              />
            </div>

            <div className="flex flex-col border-t border-accent-muted/20">
              {PROJECTS.map((project, index) => (
                <ProjectItem key={project.title} project={project} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectItem({ project, index }: { project: MinimalProject; index: number }) {
  const itemRef = React.useRef(null);
  
  return (
    <motion.a
      ref={itemRef}
      href={project.href}
      target="_blank"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      style={{ willChange: "transform, opacity", backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
      className="group flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-accent-muted/20 hover:bg-accent-muted/5 transition-[background-color,border-color,padding,margin,border-radius] duration-300 px-4 -mx-4 rounded-2xl relative overflow-hidden opacity-0 transform-gpu"
    >
      <div className="relative z-10 flex flex-col gap-2 pointer-events-none">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono font-bold text-primary/40 group-hover:text-primary transition-colors">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-[10px] font-mono text-muted-foreground/60">
            {project.year}
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-foreground transition-all group-hover:translate-x-2 leading-none uppercase italic group-hover:text-primary">
          {project.title}
        </h3>
      </div>

      <div className="relative z-10 mt-6 md:mt-0 flex items-center gap-6 pointer-events-none">
        <div className="flex flex-wrap gap-2">
          {project.tech.map(t => (
            <span 
              key={t} 
              className="px-3 py-1 glass text-[9px] font-black uppercase tracking-tighter opacity-40 group-hover:opacity-100 transition-opacity border border-accent-muted/10 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="hidden md:flex w-12 h-12 rounded-full border border-accent-muted/10 items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500">
          <ArrowUpRight className="w-5 h-5 text-primary" />
        </div>
      </div>

      {/* Background Hover Effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
      />
    </motion.a>
  );
}

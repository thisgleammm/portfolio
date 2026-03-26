"use client";

import * as React from "react";
import { motion } from "framer-motion";
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
    title: "EcoTrack AI",
    year: "2024",
    tech: ["Computer Vision", "Python", "React"],
    href: "https://github.com/thisgleammm",
  },
  {
    title: "Insightful Dashboard",
    year: "2024",
    tech: ["Next.js", "Laravel", "Data Viz"],
    href: "https://github.com/thisgleammm",
  },
  {
    title: "SafeWorker Platform",
    year: "2023",
    tech: ["PyTorch", "Docker", "Flask"],
    href: "https://github.com/thisgleammm",
  },
  {
    title: "Neural Network Optimizer",
    year: "2023",
    tech: ["PyTorch", "Rust", "CUDA"],
    href: "https://github.com/thisgleammm",
  }
];

export function FeaturedProjects() {
  return (
    <section id="projects" className="w-full py-20 px-6 bg-background relative transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-2xl font-black uppercase tracking-widest text-primary italic"
          >
            Project <span className="text-foreground not-italic">Briefs</span>
          </motion.h2>
          
          <Link 
            href="/projects" 
            className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
          >
            Full Archive
            <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="flex flex-col border-t border-accent-muted/20">
          {PROJECTS.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.href}
              target="_blank"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-accent-muted/20 hover:bg-accent-muted/5 transition-all px-2 -mx-2 rounded-xl"
            >
              <div className="flex flex-col">
                <span className="text-xs font-mono text-muted-foreground mb-1">
                  {project.year}
                </span>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary leading-none">
                  {project.title}
                </h3>
              </div>

              <div className="mt-4 md:mt-0 flex items-center gap-4">
                <div className="flex gap-2">
                  {project.tech.map(t => (
                    <span key={t} className="px-3 py-1 bg-foreground/5 dark:bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1">
                  <ArrowUpRight className="w-5 h-5 text-primary" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

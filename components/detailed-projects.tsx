"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Layers } from "lucide-react";
import Image from "next/image";

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className || "w-4 h-4"} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

interface Project {
  title: string;
  year: string;
  description: string;
  tech: string[];
  image: string;
  github: string;
  live: string | null;
}

const PROJECTS: Project[] = [
  {
    title: "EcoTrack AI",
    year: "2024",
    description: "Developed a computer vision system that classifies industrial waste into 8 categories with 94% accuracy. Integrated with edge devices for real-time monitoring.",
    tech: ["Python", "TensorFlow", "React", "Rust"],
    image: "/project-eco.jpg",
    github: "https://github.com/thisgleammm",
    live: "https://gleam.web.id",
  },
  {
    title: "Insightful Dashboard",
    year: "2024",
    description: "A centralized data analytics hub for e-commerce sites, featuring real-time transaction tracking, predictive sales forecasting, and automated PDF reporting.",
    tech: ["Next.js", "Laravel", "PostgreSQL", "Recharts"],
    image: "/project-dash.jpg",
    github: "https://github.com/thisgleammm",
    live: "https://gleam.web.id",
  },
  {
    title: "SafeWorker Platform",
    year: "2023",
    description: "Built for PT. Kayaba Indonesia to monitor workplace safety. Uses YOLOv8 for PPE detection and sends automated alerts through Telegram API.",
    tech: ["YOLOv8", "FastAPI", "Docker", "Python"],
    image: "/project-safe.jpg",
    github: "https://github.com/thisgleammm",
    live: null,
  },
  {
    title: "Neural Network Optimizer",
    year: "2023",
    description: "A high-performance utility written in Rust to optimize neural network weights for minimal memory consumption on mobile hardware.",
    tech: ["Rust", "PyTorch", "WASM", "C++"],
    image: "/project-nn.jpg",
    github: "https://github.com/thisgleammm",
    live: null,
  }
];

export function DetailedProjects() {
  return (
    <section className="w-full py-12 px-6 bg-background relative transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="flex flex-col group h-full"
            >
              {/* Image Container with Hover Effect */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-accent-muted/20 border border-accent-muted/10 mb-8 overflow-clip">
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                
                <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:scale-110 transition-transform duration-700">
                   <Layers className="w-20 h-20 text-foreground" />
                </div>
                
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-4 py-1.5 glass capsule text-[10px] font-black uppercase tracking-widest">
                    {project.year}
                  </span>
                </div>
              </div>

              <div className="flex flex-col flex-1 space-y-4">
                <h2 className="text-3xl lg:text-4xl font-black tracking-tighter uppercase leading-tight text-foreground transition-colors group-hover:text-primary">
                  {project.title}
                </h2>
                
                <p className="text-muted-foreground text-sm lg:text-lg leading-relaxed font-medium max-w-xl">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2 pb-6">
                  {project.tech.map(t => (
                    <span key={t} className="px-3 py-1 bg-foreground/5 dark:bg-white/5 rounded-md text-[10px] font-bold uppercase tracking-widest opacity-60">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-4 pt-6 border-t border-accent-muted/10">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    className="px-6 py-2.5 border border-accent-muted/20 hover:bg-accent-muted rounded-full text-xs font-black uppercase tracking-widest transition-all active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-primary inline-flex items-center gap-2"
                  >
                    Source Code
                    <GitHubIcon className="w-3.5 h-3.5" />
                  </a>
                  
                  {project.live && (
                    <a 
                      href={project.live} 
                      target="_blank"
                      className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:text-foreground transition-all group/link"
                    >
                      <ExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      Live View
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

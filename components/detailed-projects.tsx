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
    title: "POKETENASHI Safety Detection",
    year: "2026",
    description: "Advanced safety monitoring system using YOLO and TensorFlow to detect PPE compliance and hazardous conditions in real-time industrial environments.",
    tech: ["Python", "TensorFlow", "YOLO"],
    image: "/project-poketenashi.jpg",
    github: "http://github.com/thisgleammm",
    live: null,
  },
  {
    title: "Leakage Tester",
    year: "2026",
    description: "IoT-based leakage detection system utilizing Raspberry Pi and Computer Vision to monitor industrial pipelines and automated reporting.",
    tech: ["Python", "Raspberry Pi", "Open CV"],
    image: "/project-leakage.jpg",
    github: "http://github.com/thisgleammm",
    live: null,
  },
  {
    title: "Motorcycle Workshop Management | Raffli Motor",
    year: "2025",
    description: "Led end-to-end development of a mobile app for a repair shop, replacing manual bookkeeping with a real-time system for inventory, sales, and service records. Reduced reconciliation time from 1 hour to under 1 minute.",
    tech: ["Flutter", "Next.js", "Supabase", "PostgreSQL"],
    image: "/project-raffli.jpeg",
    github: "http://github.com/thisgleammm",
    live: null,
  },
  {
    title: "Warehouse System | Reisen Gear",
    year: "2025",
    description: "Digital inventory and warehouse management system optimized for rapid stock processing and automated reporting.",
    tech: ["PHP", "MariaDB", "Bootstrap"],
    image: "/project-warehouse.jpg",
    github: "http://github.com/thisgleammm",
    live: null,
  },
  {
    title: "Digital Invoice System | Lombok NTB Pearls",
    year: "2025",
    description: "Custom digital invoicing and payment tracking platform tailored for the retail jewelry industry in Lombok.",
    tech: ["PHP", "MariaDB", "Bootstrap"],
    image: "/project-invoice.jpg",
    github: "http://github.com/thisgleammm",
    live: null,
  },
  {
    title: "SEACATERING",
    year: "2025",
    description: "Modern meal delivery platform featuring NextAuth subscription management, admin dashboard, and responsive UI components with CSRF protection.",
    tech: ["Next.js", "NextAuth", "Prisma", "PostgreSQL"],
    image: "/project-sea.png",
    github: "https://github.com/thisgleammm/seacatering",
    live: null,
  },
  {
    title: "SIMPEL | STMI Interactive Management Platform",
    year: "2024",
    description: "Interactive e-learning management platform built with Laravel and Alpine.js, enhancing the learning experience with streamlined administration.",
    tech: ["Laravel", "Tailwind CSS", "MySQL", "Alpine.js"],
    image: "/project-simpel.png",
    github: "https://github.com/thisgleammm/stmi-lms",
    live: null,
  },
  {
    title: "Beezleboy Discord Bot",
    year: "2022",
    description: "Discord bot designed to forward Tweets to message channels in Discord servers automatically, built with Node.js.",
    tech: ["Javascript", "Node.js", "Twitter API"],
    image: "/project-beezleboy.jpg",
    github: "https://github.com/thisgleam/BeezleboyBot",
    live: null,
  },
  {
    title: "Discord Music Bot",
    year: "2021",
    description: "High-performance bot designed to play music from YouTube, Spotify, and SoundCloud in Discord voice channels.",
    tech: ["Javascript", "Node.js", "Discord.js"],
    image: "/project-musicbot.png",
    github: "https://github.com/thisgleam/thisgleam-botmusic",
    live: null,
  }
];

const ProjectImage = ({ project, index }: { project: Project; index: number }) => {
  const [mounted, setMounted] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Constants for container aspect ratio (16/10)
  const CONTAINER_RATIO = 10 / 16; // 0.625

  // Real pixel dimensions for each project image
  const IMAGE_DIMENSIONS: Record<string, { width: number; height: number }> = {
    "/project-simpel.png":     { width: 2571, height: 2412 },
    "/project-sea.png":        { width: 992,  height: 1280 },
    "/project-musicbot.png":   { width: 641,  height: 479 },
    // Remaining images use the error fallback (Layers icon), so dimensions are irrelevant.
    // If images are added later, register their real dimensions here.
  };

  const dimensions = IMAGE_DIMENSIONS[project.image] ?? { width: 1200, height: 800 };
  const imageRatio = dimensions.height / dimensions.width;

  // Calculate exactly how much to pan (as % of image height) to reach the bottom
  const panPercent = imageRatio > CONTAINER_RATIO 
    ? -((imageRatio - CONTAINER_RATIO) / imageRatio) * 100 
    : 0;

  // Adjust duration proportionally — taller images scroll longer for consistent speed
  const baseDuration = 12;
  const duration = imageRatio > CONTAINER_RATIO 
    ? baseDuration * (imageRatio / CONTAINER_RATIO) 
    : 0;

  if (!mounted) {
    return <div className="absolute inset-0 bg-accent-muted/5 animate-pulse" />;
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {!hasError ? (
        <motion.div 
          className="absolute top-0 left-0 w-full"
          initial={{ y: "0%" }}
          animate={{ y: `${panPercent}%` }}
          transition={{
            duration: Math.max(duration, 15), 
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: index * 0.8,
          }}
        >
          <Image 
            src={project.image}
            alt={project.title}
            width={dimensions.width}
            height={dimensions.height}
            className="w-full h-auto transition-opacity duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index < 2}
            onError={() => setHasError(true)}
          />
        </motion.div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:scale-110 transition-transform duration-700">
           <Layers className="w-20 h-20 text-foreground" />
        </div>
      )}
    </div>
  );
};

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
                
                <ProjectImage project={project} index={index} />
                
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

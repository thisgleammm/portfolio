"use client";

import * as React from "react";
import { motion } from "framer-motion";

const META = [
  { label: "Location", value: "Indonesia" },
  { label: "Now", value: "Intern, PT. Kayaba Indonesia" },
  { label: "Focus", value: "Backend, web, ML integration" },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="w-full py-24 md:py-32 px-6 bg-background relative"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24">

        {/* Sticky Header Column */}
        <div className="lg:sticky lg:top-32 h-fit space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60 block">About</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">
              Software that <span className="text-primary">has to work</span>
            </h2>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="border-t border-accent-muted/20"
          >
            {META.map((item) => (
              <div
                key={item.label}
                className="flex items-baseline justify-between gap-6 py-3 border-b border-accent-muted/20"
              >
                <dt className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground/60 shrink-0">
                  {item.label}
                </dt>
                <dd className="text-xs md:text-sm font-semibold text-foreground text-right">
                  {item.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Content Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-lg md:text-xl leading-relaxed text-muted-foreground font-medium lg:pt-24"
        >
          <p className="mb-6">
            I&apos;m a software engineer based in <span className="text-foreground font-semibold">Indonesia</span>,
            currently interning at <span className="text-foreground font-semibold">PT. Kayaba Indonesia</span> while pursuing my degree.
          </p>
          <p className="mb-6">
            Over the past year, I&apos;ve worked on systems running in production, from computer vision pipelines
            for workplace safety detection to full-stack web applications.
          </p>
          <p>
            I mostly do backend and web development, with ML integration where the job calls for it.
          </p>
        </motion.div>

      </div>
    </section>
  );
}

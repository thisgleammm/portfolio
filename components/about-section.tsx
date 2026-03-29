"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <motion.section 
      id="about" 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full px-6 pt-8 pb-10 md:pt-12 md:pb-16 bg-background relative z-10 transition-colors duration-500"
    >
      <div className="max-w-5xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-12 max-w-4xl"
        >
          Engineering the <span className="text-primary italic">Future</span> with Passion and Innovation
        </motion.h2>

        {/* Divider with Icon */}
        <div className="relative w-full border-t border-black dark:border-white/20 my-16">
          <motion.div 
            initial={{ scale: 0, rotate: -45 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
            className="absolute -top-8 right-10 md:right-20 glass h-16 w-16 rounded-full flex items-center justify-center border border-accent-muted shadow-xl bg-background"
          >
            <svg className="w-7 h-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </motion.div>
        </div>

        {/* Content Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8"
        >
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
        </motion.div>

        {/* About Me Button (Bottom Right) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="flex justify-end mt-12"
        >
          <Link 
            href="/about" 
            className="glass capsule flex items-center gap-2 text-sm font-bold px-6 py-2.5 hover:bg-accent-muted transition-all active:scale-95 group"
          >
            About Me
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Mail, Send } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className || "w-4 h-4"} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className || "w-4 h-4"} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export default function ContactContent() {

  return (
    <main className="min-h-screen w-full flex flex-col bg-background text-foreground transition-colors duration-500 selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      <Navbar />



      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-40 pb-20">
        <div className="flex flex-col gap-6 max-w-5xl">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-sm font-black uppercase tracking-[0.4em] text-primary/60"
          >
            Collab / Inquire
          </motion.span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-none">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="block"
            >
               Get In
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="text-primary italic block"
            >
               Touch
            </motion.span>
          </h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            className="mt-8 text-xl md:text-3xl text-muted-foreground font-medium leading-relaxed max-w-3xl"
          >
            Currently open to <span className="text-foreground">freelance projects</span>, <span className="text-foreground">collaborations</span>, and interesting coffee chats about the <span className="text-foreground italic font-black text-primary">future of engineering</span>.
          </motion.p>
        </div>
      </section>

      {/* Contact Grid Section */}
      <section className="container mx-auto px-6 py-24 border-t border-accent-muted/10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         <ScrollReveal delay={0.1}>
            <div className="bg-accent-muted/5 rounded-3xl p-10 border border-accent-muted/10 group hover:border-primary transition-all duration-500 h-full">
               <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-8 h-8 text-primary italic" />
               </div>
               <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Email</h3>
               <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-8">Professional inquiries, technical questions, or project briefs.</p>
               <a href="mailto:thisgleam@gmail.com" className="text-lg font-bold hover:text-primary transition-colors">thisgleam@gmail.com</a>
            </div>
         </ScrollReveal>

         <ScrollReveal delay={0.2}>
            <div className="bg-accent-muted/5 rounded-3xl p-10 border border-accent-muted/10 group hover:border-primary transition-all duration-500 h-full">
               <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 shrink-0 group-hover:scale-110 transition-transform">
                  <LinkedInIcon className="w-8 h-8 text-primary" />
               </div>
               <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">LinkedIn</h3>
               <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-8">Let&apos;s connect professionally and discuss industry trends.</p>
               <a href="https://linkedin.com/in/thisgleam" target="_blank" className="text-lg font-bold hover:text-primary transition-colors">thisgleam</a>
            </div>
         </ScrollReveal>

         <ScrollReveal delay={0.3}>
            <div className="bg-accent-muted/5 rounded-3xl p-10 border border-accent-muted/10 group hover:border-primary transition-all duration-500 h-full">
               <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 shrink-0 group-hover:scale-110 transition-transform">
                  <GitHubIcon className="w-8 h-8 text-primary" />
               </div>
               <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">GitHub</h3>
               <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-8">Explore my codebases, open source contributions, and labs.</p>
               <a href="https://github.com/thisgleammm" target="_blank" className="text-lg font-bold hover:text-primary transition-colors">@thisgleammm</a>
            </div>
         </ScrollReveal>
      </section>

      {/* Stylized Secondary Footer - Direct Message */}
      <section className="container mx-auto px-6 py-32 text-center">
         <ScrollReveal>
           <div className="max-w-2xl mx-auto flex flex-col items-center gap-12">
              <div className="flex flex-col gap-4">
                 <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none text-muted-foreground/40">
                    Got a specific <br /> project in <span className="text-primary">mind?</span>
                 </h2>
                 <p className="text-lg text-muted-foreground font-medium leading-relaxed">Let&apos;s build something that makes a difference.</p>
              </div>
              <a 
                 href="https://wa.me/6281234567890" 
                 target="_blank"
                 className="px-12 py-5 bg-foreground text-background dark:bg-white dark:text-black rounded-full text-sm font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-primary flex items-center gap-4"
              >
                 Send a Message
                 <Send className="w-4 h-4" />
              </a>
           </div>
         </ScrollReveal>
      </section>

      <Footer />
    </main>
  );
}

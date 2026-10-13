"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Mail, Send } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className || "w-4 h-4"} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
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
                  <InstagramIcon className="w-8 h-8 text-primary" />
               </div>
               <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Instagram</h3>
               <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-8">Daily builds, behind the scenes, and life outside the editor.</p>
               <a href="https://instagram.com/thisgleam/" target="_blank" className="text-lg font-bold hover:text-primary transition-colors">@thisgleam</a>
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

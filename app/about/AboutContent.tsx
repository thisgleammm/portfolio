"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Layers, Cpu, Award, Briefcase, Terminal } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function AboutContent() {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const [displayText, setDisplayText] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);
  const name = "Gleam";

    const [isStarted, setIsStarted] = React.useState(false);

    React.useEffect(() => {
    if (!mounted) return;
    
    if (!isStarted) {
      const startTimeout = setTimeout(() => setIsStarted(true), 1200);
      return () => clearTimeout(startTimeout);
    }

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < name.length) {
          setDisplayText(name.slice(0, displayText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2500);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(name.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
        }
      }
    }, isDeleting ? 100 : 200);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, name, mounted, isStarted]);

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
            The Engineer / The Persona
          </motion.span>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-none">
            {!mounted ? (
              <>
                <span className="block">Muhammad</span>
                <span className="text-primary italic">Gleam</span>
              </>
            ) : (
              <>
                <motion.span
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  className="block"
                >
                  Muhammad
                </motion.span>
                <motion.span 
                  className="text-primary italic block min-h-[1em] relative"
                >
                  {displayText}
                  {isStarted && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block w-2 md:w-3 lg:w-4 h-[0.7em] bg-primary ml-2 align-middle -mt-2"
                    />
                  )}
                </motion.span>
              </>
            )}
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.8 }}
            className="mt-8 text-xl md:text-3xl text-muted-foreground font-medium leading-relaxed max-w-3xl"
          >
            A software engineer bridging the gap between <span className="text-foreground">digital logic</span> and <span className="text-foreground">high-performance user experiences</span>.
          </motion.p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="container mx-auto px-6 py-24 border-t border-accent-muted/10">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <h2 className="text-3xl font-black uppercase tracking-tighter italic text-primary">Philosophy</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I believe that technology is at its most powerful when it disappears into the workflow. Whether I&apos;m architecting a 
                <span className="text-foreground"> warehouse management system</span> or optimizing <span className="text-foreground">computer vision models</span> for safety detection, my goal is always the same: precision, reliability, and impact.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                My transition from traditional industrial concepts to modern full-stack development gives me a unique perspective on 
                <span className="text-foreground"> systems thinking</span>. I don&apos;t just write code; I build infrastructure.
              </p>
            </div>
            
            <div className="bg-accent-muted/5 rounded-3xl p-8 lg:p-12 border border-accent-muted/10 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <Terminal className="w-40 h-40" />
               </div>
               <ul className="space-y-6 relative z-10">
                  <li className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Briefcase className="w-5 h-5 text-primary" />
                     </div>
                     <div>
                        <h4 className="font-bold text-lg">Full-Stack Capability</h4>
                        <p className="text-sm text-muted-foreground">End-to-end development from mobile (Flutter) to cloud infra.</p>
                     </div>
                  </li>
                  <li className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Cpu className="w-5 h-5 text-primary" />
                     </div>
                     <div>
                        <h4 className="font-bold text-lg">Systems Architecture</h4>
                        <p className="text-sm text-muted-foreground">Designing scalable enterprise structures with focus on performance and reliability.</p>
                     </div>
                  </li>
                  <li className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Layers className="w-5 h-5 text-primary" />
                     </div>
                     <div>
                        <h4 className="font-bold text-lg">AI & Computer Vision</h4>
                        <p className="text-sm text-muted-foreground">Building real-time safety and detection systems using YOLO & TF.</p>
                     </div>
                  </li>
               </ul>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Technical Logistics: Academic & Experience */}
      <section className="container mx-auto px-6 py-24 bg-accent-muted/5 border-y border-accent-muted/10">
         <div className="max-w-4xl mx-auto space-y-32">
            
            {/* Academic Background */}
            <ScrollReveal>
               <div className="space-y-10">
                  <div className="flex items-center gap-4">
                     <Award className="w-8 h-8 text-primary" />
                     <span className="text-xs font-black uppercase tracking-[0.4em] text-primary/60">Academic Background</span>
                  </div>
                  <div className="space-y-6">
                     <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-none">
                        Politeknik STMI <br /> Jakarta
                     </h2>
                     <div className="flex flex-col gap-2 border-l-2 border-primary/20 pl-6">
                        <p className="text-lg text-foreground font-bold uppercase tracking-tight">Information System</p>
                        <p className="text-sm text-muted-foreground font-mono uppercase tracking-widest">GPA: - / 4.00 <span className="mx-2 opacity-30">|</span> Class of 2023</p>
                     </div>
                     <div className="flex flex-wrap gap-2 pt-2">
                        {["Systems Thinking", "Software Architecture", "Industry 4.0", "Lean Production"].map(tag => (
                           <span key={tag} className="px-4 py-1.5 glass bg-background/50 border border-border/50 rounded-md text-[10px] font-bold uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity">
                              {tag}
                           </span>
                        ))}
                     </div>
                  </div>
               </div>
            </ScrollReveal>

            {/* Brief Experience Log */}
            <ScrollReveal delay={0.2}>
               <div className="space-y-10">
                  <div className="flex items-center gap-4">
                     <Briefcase className="w-8 h-8 text-primary" />
                     <span className="text-xs font-black uppercase tracking-[0.4em] text-primary/60">Experience Log</span>
                  </div>
                  <div className="relative space-y-12 pl-6 border-l-2 border-accent-muted/20">
                     <div className="relative">
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                        <p className="text-xs font-mono font-bold text-primary mb-2">January 2026 — Present</p>
                        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Computer Vision Developer Intern <br /> PT. KAYABA INDONESIA</h3>
                        <p className="text-muted-foreground md:text-lg leading-relaxed mt-2 max-w-2xl">Engineering bespoke digital solutions for retail and manufacturing, focusing on automated reporting and real-time inventory systems.</p>
                     </div>
                     <div className="relative">
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-accent-muted border-4 border-background" />
                        <p className="text-xs font-mono font-bold text-muted-foreground mb-2">August 2024 — December 2025</p>
                        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Member <br /> Digital Innovation Center STMI</h3>
                        <p className="text-muted-foreground md:text-lg leading-relaxed mt-2 max-w-2xl">• Robotic Line Follower Competition REACTOR 2025 (Robotics, Esports, Art, Code, Technology, Online Business and Revolution) at Polytechnic STMI Jakarta, achieving 1st place. <br />
                        • Robotic Line Follower Competition COKRO 2024 (Challenge of Knowledge, Robotics, and Online Gaming) at Polytechnic APP Jakarta, achieving a top 5 finish. <br />
                        • Robotic Line Follower Competition EOR 2024 (Electronics Open Robotic) at University of Jakarta, placing in the top 14. <br />
                        • Impact National Hackathon 2024 by Maxy Academy, advancing to the semifinalist stage. <br />
                        • Robotic Line Follower Competition EEA 2024 (Electrical Engineering in Action) at University of Lampung, securing a spot in the top 7.</p>
                     </div>
                     <div className="relative">
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-accent-muted border-4 border-background" />
                        <p className="text-xs font-mono font-bold text-muted-foreground mb-2">March 2024 — February 2025</p>
                        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Academic Division Staff <br /> HIMASIS Politeknik STMI Jakarta</h3>
                        <p className="text-muted-foreground md:text-lg leading-relaxed mt-2 max-w-2xl">Exploring industrial automation and IoT integration, bridging the gap between hardware nodes and centralized data hubs.</p>
                     </div>
                     <div className="relative">
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-accent-muted border-4 border-background" />
                        <p className="text-xs font-mono font-bold text-muted-foreground mb-2">July 2024 — August 2024</p>
                        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Web Developer Intern <br /> SMPTIT Nurul Fikri Bekasi</h3>
                        <p className="text-muted-foreground md:text-lg leading-relaxed mt-2 max-w-2xl">Exploring industrial automation and IoT integration, bridging the gap between hardware nodes and centralized data hubs.</p>
                     </div>
                  </div>

                  <div className="pt-10">
                     <Link href="/credentials" className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] hover:text-primary group transition-colors">
                        View Full Credentials / Licenses
                        <div className="w-8 h-px bg-primary scale-x-50 group-hover:scale-x-100 transition-transform origin-left" />
                     </Link>
                  </div>
               </div>
            </ScrollReveal>
         </div>
      </section>

      <Footer />
    </main>
  );
}

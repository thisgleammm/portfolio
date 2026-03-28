"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SquareTerminal, Award, Camera, ChevronLeft, Calendar, MapPin } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

const CREDENTIALS = [
  { 
    name: "Full Stack Software Development", 
    provider: "Dicoding", 
    id: "DCD-2025-001",
    date: "JAN 2025",
    link: "https://dicoding.com" 
  },
  { 
    name: "Machine Learning Applied Concepts", 
    provider: "Stanford / Coursera", 
    id: "ML-EXT-992",
    date: "NOV 2024",
    link: "https://coursera.org" 
  },
  { 
    name: "Enterprise Resource Planning", 
    provider: "Industry Hub", 
    id: "ERP-SYS-441",
    date: "AUG 2024",
    link: "#" 
  },
  { 
    name: "Advanced Computer Vision", 
    provider: "CV Foundation", 
    id: "OPT-VIS-330",
    date: "JUN 2024",
    link: "#" 
  },
];

const EVENTS = [
  {
    title: "Tech Conference Jakarta 2025",
    location: "Jakarta, Indonesia",
    timestamp: "2025-02-15T09:00:00Z",
    image: "/event-placeholder-1.jpg",
    tags: ["Innovation", "Networking"]
  },
  {
    title: "Industrial Systems Workshop",
    location: "STMI Campus",
    timestamp: "2024-11-20T13:30:00Z",
    image: "/event-placeholder-2.jpg",
    tags: ["Industry 4.0", "Automation"]
  }
];

export default function CredentialsContent() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen w-full flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-40 pb-20">
        <div className="flex flex-col gap-6 max-w-5xl">
          <Link 
            href="/about" 
            className="group inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to About
          </Link>
          
          {!mounted ? (
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-none">
              Registry / <br />
              <span className="text-primary italic">Credentials</span>
            </h1>
          ) : (
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-none"
            >
              Registry / <br />
              <span className="text-primary italic">Credentials</span>
            </motion.h1>
          )}
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="mt-8 text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed max-w-3xl"
          >
            A technical record of official certifications, professional licenses, and participation in the engineering ecosystem.
          </motion.p>
        </div>
      </section>

      {/* Registry Section */}
      <section className="container mx-auto px-6 py-24 bg-accent-muted/5 border-y border-accent-muted/10">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="flex items-center gap-4">
            <SquareTerminal className="w-8 h-8 text-primary" />
            <span className="text-xs font-black uppercase tracking-[0.4em] text-primary/60">Validated Certificates</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CREDENTIALS.map((cert, i) => (
              <ScrollReveal key={cert.id} delay={i * 0.1}>
                <div className="glass p-8 rounded-3xl border border-accent-muted/10 group hover:border-primary transition-all duration-500 hover:bg-primary/5 flex flex-col justify-between h-full gap-8">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-primary/60 tracking-widest">{cert.date}</span>
                        <h3 className="text-2xl font-black uppercase tracking-tight leading-none group-hover:text-primary transition-colors">{cert.name}</h3>
                      </div>
                      <Award className="w-6 h-6 text-primary shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest">{cert.provider}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-accent-muted/10 pt-6">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-muted-foreground/50 uppercase tracking-[0.2em] font-black">Registry ID</span>
                      <span className="text-xs font-mono font-bold text-muted-foreground">{cert.id}</span>
                    </div>
                    {cert.link !== "#" && (
                      <a href={cert.link} target="_blank" className="text-[10px] font-black uppercase tracking-widest px-4 py-2 border border-accent-muted/20 rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all">
                        Verify Source
                      </a>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Event Coverage Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="flex items-center gap-4">
            <Camera className="w-8 h-8 text-primary" />
            <span className="text-xs font-black uppercase tracking-[0.4em] text-primary/60">Technical Field Reports</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {EVENTS.map((event) => (
              <ScrollReveal key={event.title} delay={0.2}>
                <div className="group space-y-6">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-accent-muted/10 border border-accent-muted/10">
                    <div className="absolute inset-0 flex items-center justify-center bg-accent-muted/5">
                      <Camera className="w-12 h-12 text-primary/20 group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    {/* Real images would go here */}
                    {/* <Image src={event.image} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" alt={event.title} /> */}
                    
                    <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                       {event.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 glass bg-background/50 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl">
                             {tag}
                          </span>
                       ))}
                    </div>
                  </div>

                  <div className="space-y-4 px-2">
                    <div className="flex flex-col gap-2">
                       <h3 className="text-3xl font-black uppercase tracking-tighter leading-none group-hover:text-primary transition-colors">
                          {event.title}
                       </h3>
                       <div className="flex items-center gap-6 mt-2">
                          <div className="flex items-center gap-2 opacity-50">
                             <Calendar className="w-3 h-3" />
                             <span className="text-[10px] font-mono font-bold uppercase">{new Date(event.timestamp).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center gap-2 opacity-50">
                             <MapPin className="w-3 h-3" />
                             <span className="text-[10px] font-mono font-bold uppercase">{event.location}</span>
                          </div>
                       </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-xl">
                       A field log of participating in engineering events, showcasing the collaborative ecosystem and hands-on application of technical concepts.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

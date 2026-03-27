import * as React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Layers, Terminal, Cpu, Award, Briefcase } from "lucide-react";

export const metadata = {
  title: "About | Muhammad Gleam Mulyawan",
  description: "Learn more about my journey as an engineer, combining software development with high-performance systems architecture.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full flex flex-col bg-background text-foreground transition-colors duration-500 selection:bg-primary/20 selection:text-primary">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-40 pb-20">
        <div className="flex flex-col gap-6 max-w-5xl">
          <span className="text-sm font-black uppercase tracking-[0.4em] text-primary/60">The Engineer / The Persona</span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-none">
            Gleam <br /> <span className="text-primary italic">Mulyawan</span>
          </h1>
          <p className="mt-8 text-xl md:text-3xl text-muted-foreground font-medium leading-relaxed max-w-3xl">
            A software engineer bridging the gap between <span className="text-foreground">digital logic</span> and <span className="text-foreground">high-performance user experiences</span>.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="container mx-auto px-6 py-24 border-t border-accent-muted/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <h2 className="text-3xl font-black uppercase tracking-tighter italic text-primary">Philosophy</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I believe that technology is at its most powerful when it disappears into the workflow. Whether I&apos;m architecting a 
              <span className="text-foreground"> warehouse management system</span> or optimizing <span className="text-foreground">computer vision models</span> for safety detection, my goal is always the same: precision, reliability, and impact.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My transition from traditional industrial concepts to modern full-stack development gives me a unique perspective on 
              <span className="text-foreground">systems thinking</span>. I don&apos;t just write code; I build infrastructure.
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
      </section>

      {/* Education/Award Section - Brief */}
      <section className="container mx-auto px-6 py-24 bg-accent-muted/5 border-y border-accent-muted/10">
         <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-12">
            <Award className="w-16 h-16 text-primary italic" />
            <div className="space-y-4">
               <span className="text-sm font-black uppercase tracking-widest text-primary/60">Academic Background</span>
               <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">Politeknik STMI Jakarta</h2>
               <p className="text-xl text-muted-foreground font-medium">Focused on Enterprise Engineering & Software Architecture</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
               {["Team Leadership", "Project Management", "Agile", "Industry 4.0"].map(tag => (
                  <span key={tag} className="px-6 py-2 glass capsule text-xs font-bold uppercase tracking-widest">
                     {tag}
                  </span>
               ))}
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}

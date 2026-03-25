"use client";

import * as React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X, Home as HomeIcon, LayoutGrid, User as UserIcon, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { SpotifyWidget } from "@/components/spotify-widget";

export default function Home() {

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const heroRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Reveal Navbar
      gsap.fromTo(".nav-reveal", 
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out", stagger: 0.1 }
      );

      // 2. Reveal Hero Elements
      gsap.fromTo(".hero-reveal",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", stagger: 0.2, delay: 0.3 }
      );

      // 3. Reveal Footer Items
      gsap.fromTo(".footer-reveal",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.1, delay: 0.8 }
      );


    }, heroRef);

    return () => ctx.revert();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: "Home", href: "/", icon: <HomeIcon className="w-4 h-4" /> },
    { name: "My Projects", href: "/projects", icon: <LayoutGrid className="w-4 h-4" /> },
    { name: "About Me", href: "/about", icon: <UserIcon className="w-4 h-4" /> },
  ];

  return (
    <div ref={heroRef} className="flex min-h-screen w-full flex-col bg-background text-foreground overflow-x-hidden selection:bg-accent selection:text-accent-foreground transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 flex w-full items-center justify-between p-4 md:p-6 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">

        {/* Logo */}
        <Link href="/" className="nav-reveal glass capsule flex items-center gap-3 hover:bg-accent-muted transition-colors active:scale-95 group">
          <div className="h-3 w-3 md:h-4 md:w-4 rounded-full bg-primary group-hover:scale-110 transition-transform" />
          <span className="font-semibold tracking-tight text-sm md:text-base">thisgleam</span>
        </Link>


        {/* Desktop Nav Links */}
        <div className="nav-reveal glass capsule hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Group */}
        <div className="nav-reveal flex items-center gap-2 md:gap-3">
          <ThemeToggle />

          <Link
            href="/contact"
            className="glass capsule hidden sm:flex items-center gap-2 text-sm font-medium hover:bg-accent-muted transition-all active:scale-95"
          >
            <Mail className="w-4 h-4" />
            Contact Me
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden glass capsule p-2 flex items-center justify-center hover:bg-accent-muted transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-md md:hidden transition-all duration-300 flex flex-col items-center justify-center p-6",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col gap-8 w-full max-w-xs">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-4 text-2xl font-bold hover:text-primary transition-colors"
            >
              <div className="scale-150">
                {link.icon}
              </div>
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-4 text-2xl font-bold hover:text-primary transition-colors"
          >
            <Mail className="w-8 h-8" />
            Contact Me
          </Link>
        </div>

      </div>

      {/* Hero Content */}
      <main className="flex min-h-screen w-full flex-col items-center justify-between px-6 text-center pt-32 pb-4 md:pt-40 md:pb-6 relative overflow-hidden">
        <div className="space-y-4 max-w-4xl flex-1 flex flex-col justify-center">
          <h2 className="hero-reveal text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black dark:text-white">
            Hi, I&apos;m Gleam 👋
          </h2>
          <h1 className="hero-reveal text-3xl md:text-6xl lg:text-6xl font-bold text-primary leading-[0.9] tracking-tighter">
            I build things for the <br className="hidden md:block" /> web and beyond.
          </h1>
          <p className="hero-reveal mt-8 mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground font-medium">
            Full-Stack Engineer <span className="mx-2 opacity-30">·</span> Next.js <span className="mx-2 opacity-30">·</span> Laravel <span className="mx-2 opacity-30">·</span> Python
          </p>
        </div>

        {/* Section Footer (Stays at bottom of screen) */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 mt-12">
          <div className="hidden lg:block">
            <span className="text-xs font-mono text-muted-foreground opacity-70 px-4 py-2 glass capsule">
              // Develop, Code, <span className="text-primary font-bold opacity-100">Engage</span>
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="footer-reveal hidden lg:block">
              <SpotifyWidget />
            </div>
            
            <div className="footer-reveal glass capsule flex items-center gap-2 md:gap-4 py-1.5 px-3 md:px-6">

              {/* Brands are not in current Lucide versions */}
              <a href="https://linkedin.com/in/thisgleam/" target="_blank" className="p-1.5 md:p-2 hover:bg-accent-muted rounded-full transition-colors group">
                <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
              <a href="https://github.com/thisgleammm" target="_blank" className="p-1.5 md:p-2 hover:bg-accent-muted rounded-full transition-colors group">
                <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              </a>
              <a href="https://instagram.com/thisgleam/" target="_blank" className="p-1.5 md:p-2 hover:bg-accent-muted rounded-full transition-colors group">
                <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
            </div>

            <a
              href="mailto:thisgleam@gmail.com"
              className="footer-reveal glass capsule flex items-center gap-2 md:gap-3 py-1.5 px-4 md:px-6 hover:bg-accent-muted transition-all active:scale-95 group"
            >
              <Mail className="w-4 h-4 md:w-5 md:h-5 group-hover:text-primary transition-colors" />
              <span className="text-[10px] md:text-sm font-medium tracking-wide">thisgleam@gmail.com</span>
            </a>
          </div>
        </div>
      </main>

      {/* About Section */}
      <section id="about" className="w-full px-6 pt-8 pb-20 md:pt-12 md:pb-32 bg-background relative z-10 transition-colors duration-500">
        <div className="max-w-5xl mx-auto">
          {/* Style Header like image */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-12 max-w-3xl">
            Engineering the Future with Passion and Innovation
          </h2>

          {/* Divider with Icon */}
          <div className="relative w-full border-t border-black dark:border-white/20 my-16">
            <div className="absolute -top-8 right-10 md:right-20 glass h-16 w-16 rounded-full flex items-center justify-center border border-accent-muted shadow-xl bg-background">
              <svg className="w-7 h-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
          </div>

          {/* Content Block */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
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
          </div>

          {/* About Me Button (Bottom Right) */}
          <div className="flex justify-end mt-12">
            <Link 
              href="/about" 
              className="glass capsule flex items-center gap-2 text-sm font-bold px-6 py-2.5 hover:bg-accent-muted transition-all active:scale-95 group"
            >
              About Me
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>


      {/* Background Decor */}

      <div className="fixed inset-0 pointer-events-none -z-10 bg-background transition-colors duration-500">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-primary/5 blur-[100px] rounded-full animate-pulse-slow delay-700" />
      </div>
    </div>
  );
}


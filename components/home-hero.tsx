"use client";

import * as React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X, Home as HomeIcon, LayoutGrid, User as UserIcon, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { MusicWidget } from "@/components/music-widget";

// --- Hoisted Constants (Rule: rendering-hoist-jsx & rerender-dependencies) ---

const NAV_LINKS = [
  { name: "Home", href: "/", icon: <HomeIcon className="w-4 h-4" /> },
  { name: "My Projects", href: "/projects", icon: <LayoutGrid className="w-4 h-4" /> },
  { name: "About Me", href: "/about", icon: <UserIcon className="w-4 h-4" /> },
];

const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const ITEM_VARIANTS = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const NAV_VARIANTS = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

// --- Sub-components (Rule: rerender-memo) ---

const Navbar = React.memo(({ onToggleMenu, isMenuOpen }: { onToggleMenu: () => void; isMenuOpen: boolean }) => {
  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.05 } }
      }}
      className="fixed top-0 flex w-full items-center justify-between p-4 md:p-6 z-50 bg-background/90 backdrop-blur-sm border-b border-border/40"
    >
      <motion.div variants={NAV_VARIANTS}>
        <Link href="/" className="glass capsule flex items-center gap-3 hover:bg-accent-muted transition-colors active:scale-95 group focus-visible:ring-2 focus-visible:ring-primary outline-none">
          <div className="h-3 w-3 md:h-4 md:w-4 rounded-full bg-primary group-hover:scale-110 transition-transform" />
          <span className="font-semibold tracking-tight text-sm md:text-base">thisgleam</span>
        </Link>
      </motion.div>

      <motion.div variants={NAV_VARIANTS} className="glass capsule hidden md:flex items-center gap-6">
        {NAV_LINKS.map((link) => (
          <Link 
            key={link.name} 
            href={link.href} 
            className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors focus-visible:text-primary outline-none"
          >
            {link.icon}
            {link.name}
          </Link>
        ))}
      </motion.div>

      <motion.div variants={NAV_VARIANTS} className="flex items-center gap-2 md:gap-3">
        <ThemeToggle />
        <Link href="/contact" className="glass capsule hidden sm:flex items-center gap-2 text-sm font-medium hover:bg-accent-muted transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-primary outline-none">
          <Mail className="w-4 h-4" />
          Contact Me
        </Link>

        <button 
          onClick={onToggleMenu} 
          className="md:hidden glass capsule p-2 flex items-center justify-center hover:bg-accent-muted transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none" 
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </motion.div>
    </motion.nav>
  );
});
Navbar.displayName = "Navbar";

const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          className="fixed inset-0 z-40 bg-background/80 md:hidden flex flex-col items-center justify-center p-6"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="flex flex-col gap-8 w-full max-w-xs"
          >
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={onClose} 
                className="flex items-center gap-4 text-2xl font-bold hover:text-primary transition-colors focus-visible:text-primary outline-none"
              >
                <div className="scale-150">{link.icon}</div>
                {link.name}
              </Link>
            ))}
            <Link 
              href="/contact" 
              onClick={onClose} 
              className="flex items-center gap-4 text-2xl font-bold hover:text-primary transition-colors focus-visible:text-primary outline-none"
            >
              <Mail className="w-8 h-8" />
              Contact Me
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const HeroContent = React.memo(() => {
  const [mounted, setMounted] = React.useState(false);
  const { scrollY } = useScroll();
  
  // Parallax effect: Content moves at 20% speed of scroll (Rule: parallax-storytelling)
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.main 
      initial="hidden"
      animate="visible"
      variants={CONTAINER_VARIANTS}
      style={{ y, opacity }}
      className="flex min-h-screen w-full flex-col items-center justify-between px-6 text-center pt-32 pb-4 md:pt-40 md:pb-6 relative overflow-hidden"
    >
      <div className="space-y-4 md:space-y-6 max-w-4xl flex-1 flex flex-col justify-center">
        <motion.h2 variants={ITEM_VARIANTS} className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black dark:text-white">
          Hi, I&apos;m Gleam 👋
        </motion.h2>
        <motion.h1 variants={ITEM_VARIANTS} className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-[0.95] md:leading-[0.9] tracking-tighter text-balance">
          I build things for the <br className="hidden md:block" /> web and beyond.
        </motion.h1>
        <motion.p variants={ITEM_VARIANTS} className="mt-6 md:mt-8 mx-auto max-w-2xl text-md md:text-xl text-muted-foreground font-medium leading-relaxed">
          Full-Stack Engineer <span className="mx-1.5 opacity-30">·</span> Next.js <span className="mx-1.5 opacity-30">·</span> Laravel <span className="mx-1.5 opacity-30">·</span> Python
        </motion.p>
      </div>

      <motion.div 
        variants={{
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.8 } }
        }}
        className="w-full flex flex-col items-center justify-between gap-6 mt-16 md:flex-row"
      >
        <motion.div variants={ITEM_VARIANTS} className="order-2 md:order-1">
          {mounted && (
            <span className="text-[10px] md:text-xs font-mono text-muted-foreground opacity-70 px-4 py-2 glass capsule" suppressHydrationWarning>
              {"// Think, Build, "} <span className="text-primary font-bold opacity-100">{"Deploy"}</span>
            </span>
          )}
        </motion.div>

        <div className="flex flex-col items-center gap-4 order-1 md:order-2 md:flex-row">
          <motion.div variants={ITEM_VARIANTS} className="w-fit mx-auto">
            <MusicWidget />
          </motion.div>
          
          <div className="flex items-center gap-3">
            <motion.div variants={ITEM_VARIANTS} className="glass capsule flex items-center gap-3 py-1.5 px-4">
              <a href="https://linkedin.com/in/thisgleam/" target="_blank" className="p-1.5 hover:bg-accent-muted rounded-full transition-colors group focus-visible:ring-2 focus-visible:ring-primary outline-none">
                  <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                  <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://github.com/thisgleammm" target="_blank" className="p-1.5 hover:bg-accent-muted rounded-full transition-colors group focus-visible:ring-2 focus-visible:ring-primary outline-none">
                  <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                  <span className="sr-only">GitHub</span>
              </a>
              <a href="https://instagram.com/thisgleam/" target="_blank" className="p-1.5 hover:bg-accent-muted rounded-full transition-colors group focus-visible:ring-2 focus-visible:ring-primary outline-none">
                  <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" aria-hidden="true" /></svg>
                  <span className="sr-only">Instagram</span>
              </a>
            </motion.div>
            <motion.a variants={ITEM_VARIANTS} href="mailto:thisgleam@gmail.com" className="glass capsule flex items-center gap-2 py-1.5 px-4 hover:bg-accent-muted transition-all active:scale-95 group focus-visible:ring-2 focus-visible:ring-primary outline-none">
              <Mail className="w-4 h-4 md:w-5 md:h-5 group-hover:text-primary transition-colors" />
              <span className="text-[10px] md:text-sm font-medium tracking-wide">Email</span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.main>
  );
});
HeroContent.displayName = "HeroContent";

export function HomeHero() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Functional toggle to ensure stable callbacks (Rule: rerender-functional-setstate)
  const toggleMenu = React.useCallback(() => setIsMenuOpen(prev => !prev), []);
  const closeMenu = React.useCallback(() => setIsMenuOpen(false), []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground overflow-x-hidden transition-colors duration-300">
      <Navbar onToggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
      <HeroContent />
    </div>
  );
}

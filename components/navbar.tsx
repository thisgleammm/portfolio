"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Home as HomeIcon, LayoutGrid, User as UserIcon, Mail, SquareTerminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { usePathname } from "next/navigation";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";

const NAV_LINKS = [
  { name: "Home", href: "/", icon: <HomeIcon className="w-4 h-4" /> },
  { name: "My Projects", href: "/projects", icon: <LayoutGrid className="w-4 h-4" /> },
  { name: "About Me", href: "/about", icon: <UserIcon className="w-4 h-4" /> },
  { name: "Credentials", href: "/credentials", icon: <SquareTerminal className="w-4 h-4" /> },
];

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

const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const pathname = usePathname();
  
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
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={onClose} 
                  className={`flex items-center gap-4 text-2xl font-bold transition-colors focus-visible:text-primary outline-none ${
                    isActive ? "text-primary" : "text-foreground hover:text-primary"
                  }`}
                >
                  <div className={`scale-150 ${isActive ? "text-primary" : ""}`}>{link.icon}</div>
                  {link.name}
                </Link>
              );
            })}
            <Link 
              href="/contact" 
              onClick={onClose} 
              className={`flex items-center gap-4 text-2xl font-bold transition-colors focus-visible:text-primary outline-none ${
                pathname === "/contact" ? "text-primary" : "text-foreground hover:text-primary"
              }`}
            >
              <Mail className={`w-8 h-8 ${pathname === "/contact" ? "text-primary" : ""}`} />
              Contact Me
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const toggleMenu = React.useCallback(() => setIsMenuOpen(prev => !prev), []);
  const closeMenu = React.useCallback(() => setIsMenuOpen(false), []);

  return (
    <>
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
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`flex items-center gap-2 text-sm font-medium transition-colors focus-visible:text-primary outline-none ${
                  isActive ? "text-primary" : "text-foreground hover:text-primary"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            );
          })}
        </motion.div>

        <motion.div variants={NAV_VARIANTS} className="flex items-center gap-2 md:gap-3">
          <ThemeToggle />
          <Link 
            href="/contact" 
            className={`glass capsule hidden sm:flex items-center gap-2 text-sm font-medium transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-primary outline-none ${
              pathname === "/contact" ? "bg-accent-muted text-primary" : "hover:bg-accent-muted"
            }`}
          >
            <Mail className="w-4 h-4" />
            Contact Me
          </Link>
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="bg-primary text-white hover:bg-primary/90 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 hidden sm:block shadow-lg shadow-primary/20">
                Log In
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
              <UserButton />
          </Show>

          <button 
            onClick={toggleMenu} 
            className="md:hidden glass capsule p-2 flex items-center justify-center hover:bg-accent-muted transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none" 
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </motion.div>
      </motion.nav>

      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
}

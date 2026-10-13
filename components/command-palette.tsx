"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command, Home, LayoutGrid, User, Mail, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const COMMANDS = [
  { name: "Home", href: "/", icon: Home, desc: "Go to homepage" },
  { name: "Projects", href: "/projects", icon: LayoutGrid, desc: "View all featured works" },
  { name: "About", href: "/about", icon: User, desc: "Background & experience" },
  { name: "Contact", href: "/contact", icon: Mail, desc: "Get in touch" },
];

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const router = useRouter();

  const filtered = COMMANDS.filter((cmd) =>
    cmd.name.toLowerCase().includes(search.toLowerCase()) ||
    cmd.desc.toLowerCase().includes(search.toLowerCase())
  );

  React.useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  const handleSelect = React.useCallback((href: string) => {
    setOpen(false);
    setSearch("");
    router.push(href);
  }, [router]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }

      if (!open) return;

      if (e.key === "Escape") {
        setOpen(false);
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (filtered.length > 0 ? (prev + 1) % filtered.length : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (filtered.length > 0 ? (prev - 1 + filtered.length) % filtered.length : 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          handleSelect(filtered[selectedIndex].href);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, filtered, selectedIndex, handleSelect]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="glass capsule hidden xl:flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-accent-muted transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Open command palette"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="font-mono text-[10px]">Cmd+K</span>
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 md:pt-28 px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1, y: -10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="relative w-full max-w-lg rounded-3xl border border-border bg-background shadow-2xl overflow-hidden z-10"
            >
              <div className="flex items-center border-b border-border/60 px-4 py-3 gap-3">
                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="Type a command or search route..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none font-sans"
                  autoFocus
                />
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-medium text-muted-foreground bg-muted rounded border border-border">
                  ESC
                </kbd>
              </div>

              <div className="max-h-72 overflow-y-auto p-2">
                {filtered.length === 0 ? (
                  <div className="py-6 text-center text-xs text-muted-foreground font-mono">
                    No results found.
                  </div>
                ) : (
                  filtered.map((cmd, index) => {
                    const Icon = cmd.icon;
                    const isSelected = index === selectedIndex;
                    return (
                      <button
                        key={cmd.name}
                        onClick={() => handleSelect(cmd.href)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm transition-colors group outline-none ${
                          isSelected ? "bg-accent-muted text-primary" : "hover:bg-accent-muted hover:text-primary"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 transition-colors ${isSelected ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`} />
                          <div>
                            <div className={`font-medium leading-tight ${isSelected ? "text-primary" : "text-foreground group-hover:text-primary"}`}>
                              {cmd.name}
                            </div>
                            <div className="text-[11px] text-muted-foreground font-mono">
                              {cmd.desc}
                            </div>
                          </div>
                        </div>
                        <span className={`text-[10px] font-mono transition-opacity ${isSelected ? "text-primary opacity-100" : "text-muted-foreground opacity-60 group-hover:opacity-100"}`}>
                          Jump ↵
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
              <div className="border-t border-border/40 px-4 py-2 bg-muted/30 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                <span>Navigation Shortcut</span>
                <span className="flex items-center gap-1">
                  <Command className="w-3 h-3" /> K
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

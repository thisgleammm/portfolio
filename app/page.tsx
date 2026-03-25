"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white text-text-main overflow-x-hidden selection:bg-accent selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 flex w-full items-center justify-between p-6 z-50">
        <div className="glass capsule flex items-center gap-3">
          <div className="h-4 w-4 rounded-full bg-accent animate-pulse" />
          <span className="font-semibold tracking-tight">Fitra Hidayat</span>
        </div>

        <div className="glass capsule flex items-center gap-6 hidden md:flex">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            Home
          </Link>
          <Link href="/projects" className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            My Projects
          </Link>
          <Link href="/about" className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h2a2 2 0 012 2v1m-4 0a1 1 0 011-1h2a1 1 0 011 1v1m-4 0h4" /></svg>
            About Me
          </Link>
        </div>

        <Link href="/contact" className="glass capsule flex items-center gap-2 text-sm font-medium hover:bg-accent-muted transition-all active:scale-95">
          <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          Contact Me
        </Link>
      </nav>

      {/* Hero Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="space-y-4 max-w-4xl">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter sm:leading-[1.1]">
            HELLO I&apos;M FITRA 👋
          </h2>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase text-accent leading-none">
            A SOFTWARE ENGINEER
          </h1>
          <p className="mt-8 mx-auto max-w-xl text-lg text-text-muted font-medium">
            I create full-stack web & mobile application on functionality, efficiency, and aesthetics
          </p>
        </div>
      </main>

      {/* Footer Nav Bar */}
      <footer className="fixed bottom-0 flex w-full items-center justify-between p-6 z-50">
        <div className="hidden lg:block">
          <span className="text-sm font-mono text-text-muted opacity-60">
            // Develop, Code, <span className="text-accent underline decoration-accent/30 underline-offset-4 font-semibold opacity-100">Engage</span>
          </span>
        </div>

        <div className="glass capsule flex items-center gap-4 py-2 px-6">
          <a href="https://linkedin.com" target="_blank" className="p-2 hover:bg-accent-muted rounded-full transition-colors group">
            <svg className="w-5 h-5 group-hover:text-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
          </a>
          <a href="https://github.com" target="_blank" className="p-2 hover:bg-accent-muted rounded-full transition-colors group">
            <svg className="w-5 h-5 group-hover:text-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
          </a>
          <a href="https://instagram.com" target="_blank" className="p-2 hover:bg-accent-muted rounded-full transition-colors group">
            <svg className="w-5 h-5 group-hover:text-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
          </a>
          <a href="https://discord.com" target="_blank" className="p-2 hover:bg-accent-muted rounded-full transition-colors group">
            <svg className="w-5 h-5 group-hover:text-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.862-1.297 1.187-1.995a.076.076 0 0 0-.041-.105 13.08 13.08 0 0 1-1.873-.892.077.077 0 0 1-.008-.128c.125-.094.252-.192.37-.294a.077.077 0 0 1 .08-.01c3.927 1.795 8.16 1.795 12.032 0a.078.078 0 0 1 .081.009c.118.102.245.2.372.295a.077.077 0 0 1-.006.128 12.926 12.926 0 0 1-1.874.892.075.075 0 0 0-.041.106c.325.698.725 1.365 1.187 1.995a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.056c.553-5.266-.917-9.756-3.837-13.687a.07.07 0 0 0-.033-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z" /></svg>
          </a>
        </div>

        <div className="glass capsule flex items-center gap-3 py-2 px-6">
          <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          <span className="text-sm font-medium tracking-wide">fitrahidayaat@gmail.com</span>
        </div>
      </footer>

      {/* Background Subtle Gradient */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/5 blur-[100px] rounded-full" />
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SocialLinkProps {
  href: string;
  label: string;
  className?: string;
}

export function SocialLink({ href, label, className }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "px-6 md:px-8 py-2 md:py-3 rounded-full border border-border/60 text-[10px] md:text-sm font-bold tracking-widest hover:bg-foreground hover:text-background transition-all duration-300 active:scale-95 whitespace-nowrap uppercase",
        className
      )}
    >
      {label}
    </a>
  );
}

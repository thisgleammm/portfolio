---
name: Portfolio - Muhammad Gleam Mulyawan
description: High-performance portfolio design system with crisp typography and subtle crimson accent
colors:
  primary: "#a52b2a"
  primary-dark: "#bd3742"
  neutral-bg: "#f5f4ef"
  neutral-fg: "#30302e"
  neutral-muted: "#f7f7f7"
  border: "#eaeaea"
typography:
  display:
    fontFamily: "var(--font-geist-sans), Inter, sans-serif"
    fontSize: "clamp(2rem, 5vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  body:
    fontFamily: "var(--font-geist-sans), Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  mono:
    fontFamily: "var(--font-geist-mono), monospace"
    fontSize: "0.875rem"
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.neutral-fg}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
---

# Design System: Portfolio - Muhammad Gleam Mulyawan

## 1. Overview

**Creative North Star: "The Engineering Precision Lab"**

A refined, performance-focused personal portfolio interface for a full-stack engineer. Built on a clean neutral foundation with high-contrast typography, strict spatial discipline, and deliberate crimson accent highlights (`oklch(0.45 0.15 27.5)`).

The design emphasizes clarity, smooth scroll transitions (Lenis + GSAP), and functional aesthetics over generic decoration. Glassmorphism is used sparingly for floating capsules and sticky navigation.

**Key Characteristics:**
- High-contrast, clean neutral background (`oklch(0.948 0.0053 106.5)`)
- Crisp variable typography with Geist Sans and Geist Mono
- Deep crimson accent used exclusively for focus, primary actions, and key status badges
- Capsule pill components and micro-borders (`1px solid var(--accent-muted)`)

## 2. Colors

A restrained palette of warm-neutral surfaces paired with a strong crimson accent.

### Primary
- **Deep Crimson / Rust** (`#a52b2a` / `oklch(0.45 0.15 27.5)`): Reserved for primary calls to action, focus rings, active links, and prominent badges.

### Neutral
- **Off-White Canvas** (`#f5f4ef` / `oklch(0.948 0.0053 106.5)`): Main light mode background.
- **Deep Slate Ink** (`#30302e` / `oklch(0.22 0.008 106.5)`): Primary body text and dark mode background.
- **Subtle Muted Surface** (`#f7f7f7` / `oklch(0.97 0 0)`): Card backgrounds and secondary containers.
- **Soft Border** (`#eaeaea` / `oklch(0.922 0 0)`): Subtle 1px structural dividing lines.

### Named Rules
**The Rarity Accent Rule.** The primary crimson accent must appear on ≤10% of any visible screen area. Its functional clarity comes from selective restraint.

## 3. Typography

**Display & Body Font:** Geist Sans (`var(--font-geist-sans)`)
**Code & Accent Font:** Geist Mono (`var(--font-geist-mono)`)

### Hierarchy
- **Display** (600/700 weight, `clamp(2rem, 5vw, 4rem)`, line-height 1.1, tracking `-0.03em`): Hero headlines and major section titles.
- **Headline** (600 weight, 1.5rem–2rem, line-height 1.2): Card and component headers.
- **Body** (400 weight, 1rem, line-height 1.6): Standard prose (capped at 65–75ch for optimal reading).
- **Label / Code** (Geist Mono, 500 weight, 0.875rem, letter-spacing `0.02em`): Badges, metrics, code snippets, timestamps.

## 4. Elevation

The system is primarily flat with subtle borders and glassmorphic overlays.

### Elevation Principles
- **Flat Surface Default:** Containers rely on subtle 1px borders (`var(--border)` or `var(--accent-muted)`) rather than heavy drop shadows.
- **Glass Overlay:** Sticky navigation and floating pills use `backdrop-filter: blur(8px)` with semi-transparent background (`rgba(255, 255, 255, 0.7)` light / `oklch(0.205 0 0 / 70%)` dark).

### Named Rules
**The Border Over Shadow Rule.** Depth is established through subtle 1px structural borders and color tinting rather than heavy ambient box-shadows.

## 5. Components

### Buttons
- **Shape:** 8px rounded corner (`--radius-md` = `0.625rem * 0.8`).
- **Primary:** `bg-primary` (`#a52b2a`), `text-primary-foreground` (`#ffffff`), hover opacity transition.
- **Outline:** `border-border`, `bg-background`, hover `bg-muted`.

### Capsule Pills
- **Style:** Fully rounded (`rounded-full`), `border: 1px solid var(--accent-muted)`, padding `0.5rem 1.25rem`. Used for tech stack tags, status indicators, and chip controls.

### Cards & Containers
- **Corner Radius:** 10px (`var(--radius)`).
- **Background:** `bg-card` with 1px border.

### Navigation Bar
- **Style:** Floating glass container (`.glass`), sticky top, subtle blur backdrop.

## 6. Do's and Don'ts

### Do:
- **Do** maintain a strict 65–75ch line length limit on long prose blocks.
- **Do** use Geist Mono for technical metrics, dates, and code references.
- **Do** ensure crimson accents stand out by avoiding secondary bright colors.

### Don't:
- **Don't** use heavy wide drop shadows (blur ≥ 16px) combined with borders.
- **Don't** use tight display letter-spacing less than `-0.04em`.
- **Don't** add decorative text gradients (`background-clip: text`); use crisp solid colors.

import * as React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gleam.web.id"),
  title: {
    default: "Muhammad Gleam Mulyawan | Software Engineer",
    template: "%s | Muhammad Gleam Mulyawan",
  },
  description: "Portfolio of Muhammad Gleam Mulyawan, a full-stack web and mobile developer specialized in high-performance and aesthetic applications.",
  keywords: ["Software Engineer", "Full-Stack Developer", "Next.js", "Laravel", "Python", "ML Integration"],
  authors: [{ name: "Muhammad Gleam Mulyawan" }],
  creator: "Muhammad Gleam Mulyawan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gleam.web.id",
    siteName: "Muhammad Gleam Mulyawan Portfolio",
    title: "Muhammad Gleam Mulyawan | Software Engineer",
    description: "Full-stack web and mobile developer focused on engineering functional and efficient systems.",
    images: [
      {
        url: "/og-image.png", // Ensure this exists in public/
        width: 1200,
        height: 630,
        alt: "Muhammad Gleam Mulyawan Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Gleam Mulyawan | Software Engineer",
    description: "Full-stack web and mobile developer focused on engineering functional and efficient systems.",
    creator: "@thisgleam",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://gleam.web.id",
  },
};

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { ScrollProgress } from "@/components/scroll-progress";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary/20 selection:text-primary`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://clerk.gleam.web.id" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://clerk.gleam.web.id" />
        <link rel="preconnect" href="https://avatars.githubusercontent.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://avatars.githubusercontent.com" />
      </head>
      <body className="relative min-h-full flex flex-col">
        <ScrollProgress />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Muhammad Gleam Mulyawan",
              "url": "https://gleam.web.id",
              "jobTitle": "Software Engineer",
              "sameAs": [
                "https://github.com/thisgleammm",
                "https://linkedin.com/in/thisgleam/",
                "https://instagram.com/thisgleam/"
              ],
              "description": "Full-stack engineer specialized in high-performance web applications, computer vision, and ML integration.",
              "knowsAbout": [
                "Software Engineering",
                "Full-Stack Development",
                "Next.js",
                "Laravel",
                "Python",
                "Computer Vision"
              ]
            }),
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >

          <SmoothScroll>
            {children}
            <Analytics />
            <SpeedInsights />
          </SmoothScroll>
        </ThemeProvider>

      </body>
    </html>
    </ClerkProvider>
  );
}

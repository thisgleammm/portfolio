import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 className="text-4xl font-black tracking-tighter uppercase mb-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-black tracking-tight uppercase mb-4 text-primary">{children}</h2>
    ),
    p: ({ children }) => (
      <p className="text-md md:text-lg text-muted-foreground leading-relaxed mb-6">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-6 space-y-2">{children}</ul>
    ),
    li: ({ children }) => (
      <li className="text-muted-foreground">{children}</li>
    ),
    code: ({ children }) => (
      <code className="bg-zinc-800 text-primary px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
    ),
    ...components,
  }
}

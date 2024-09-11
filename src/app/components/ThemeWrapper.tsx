'use client'

import { ThemeProvider } from 'next-themes'

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <div className="min-h-screen text-white">
        {children}
      </div>
    </ThemeProvider>
  )
}
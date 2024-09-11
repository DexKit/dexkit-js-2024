'use client'

import { ThemeProvider } from 'next-themes'
import { useState, useEffect } from 'react'

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="min-h-screen text-white">{children}</div>
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen text-white">
        {children}
      </div>
    </ThemeProvider>
  )
}
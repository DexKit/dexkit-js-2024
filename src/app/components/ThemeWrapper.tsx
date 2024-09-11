'use client'

import { usePathname } from 'next/navigation'
import { ThemeProvider } from './ThemeProvider'

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isBlogPage = pathname.startsWith('/blog')

  return (
    <ThemeProvider attribute="class" defaultTheme={isBlogPage ? 'dark' : 'light'} enableSystem>
      <body className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-600 min-h-screen text-white">
        {children}
      </body>
    </ThemeProvider>
  )
}
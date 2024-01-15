"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ThemeProvider as NextThemesProvider } from "next-themes"

let AutoRefresh = function AutoRefresh({ children }: { children: React.ReactNode }) {
  return children
}

if (process.env.NODE_ENV === "development") {
  AutoRefresh = function AutoRefresh({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    useEffect(() => {
      console.log("[AutoRefresh] connecting to ws")
      const ws = new WebSocket("ws://localhost:3001")
      ws.onmessage = (event) => {
        console.log("[AutoRefresh] received message:", event)
        if (event.data === "refresh") {
          console.log("[AutoRefresh] refreshing")
          router.refresh()
        }
      }
      return () => {
        console.log("[AutoRefresh] closing ws")
        ws.close()
      }
    }, [router])
    return children
  }
}

export const ThemeProvider = NextThemesProvider

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AutoRefresh>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </AutoRefresh>
  )
}

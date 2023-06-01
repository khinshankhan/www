"use client"

import React, { type ReactNode } from "react"
import { ThemeProvider } from "next-themes"
import { TooltipProvider } from "@radix-ui/react-tooltip"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  )
}

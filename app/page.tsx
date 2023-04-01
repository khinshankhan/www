import React from "react"
import { ThemeToggle } from "@/components/toggles"

export default function Page() {
  return (
    <main className="text-center">
      <p className="text-red-600 dark:text-sky-400">hello there</p>
      <p className="text-sky-600 dark:text-red-400">general kenobi</p>
      <ThemeToggle />
    </main>
  )
}

"use client"

import React from "react"
import { AppShell } from "@/components/layout/app-shell"
import { DuoLayout } from "@/components/layout/duo-layout"
import { WithSidebar } from "@/components/layout/with-sidebar"

const title = "Projects"
const description =
  "A collection of my tinkering, experiments, and explorations from the creative nebula and beyond -- a sidequest within a sidequest, endlessly unfolding."

export default function Page() {
  return (
    <AppShell>
      <DuoLayout
        title={title}
        description={description}
        ghPath={"/src/app/(duo)/projects/page.tsx"}
      >
        <WithSidebar sidebar={null} direction="right">
          <div className="mx-auto min-w-full">
            <div className="prose text-foreground-muted max-w-none">
              <p>Coming soon...</p>
            </div>
          </div>
        </WithSidebar>
      </DuoLayout>
    </AppShell>
  )
}

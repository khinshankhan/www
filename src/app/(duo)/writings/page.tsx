"use client"

import React from "react"
import { AppShell } from "@/components/layout/app-shell"
import { DuoLayout } from "@/components/layout/duo-layout"
import { WithSidebar } from "@/components/layout/with-sidebar"

const title = "Writings"
const description =
  "A collection of my ramblings, thoughts, and half-baked explorations -- a sidequest that gets updated once in a blue moon."

export default function Page() {
  return (
    <AppShell>
      <DuoLayout
        title={title}
        description={description}
        ghPath={"/src/app/(duo)/writings/page.tsx"}
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

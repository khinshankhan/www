"use client"

import React from "react"
import { AppShell } from "@/components/layout/app-shell"
import { DuoLayout } from "@/components/layout/duo-layout"
import { WithSidebar } from "@/components/layout/with-sidebar"

const title = "About"
const description =
  "Exploring the intersections of the online and offline worlds with curiosity, creativity, and a dash of adventure."

export default function Page() {
  return (
    <AppShell>
      <DuoLayout title={title} description={description} ghPath={"/src/app/(duo)/about/page.tsx"}>
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

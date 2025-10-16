"use client"

import React from "react"
import { AppShell } from "@/components/layout/app-shell"
import { DuoLayout } from "@/components/layout/duo-layout"
import { WithSidebar } from "@/components/layout/with-sidebar"

const title = "Connect"
const description =
  "A hub to connect with me — links, socials, and a space to say hello. Whether it's to collaborate, chat, or share ideas, I'd love to hear from you!"

export default function Page() {
  return (
    <AppShell>
      <DuoLayout title={title} description={description} ghPath={"/src/app/(duo)/connect/page.tsx"}>
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

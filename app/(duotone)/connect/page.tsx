import React from "react"
import { DuotoneLayout } from "@/components/layouts/duotone"
import { Shell } from "@/components/layouts/elements/shell"
import { WithSidebar } from "@/components/layouts/with-sidebar"

const title = "Connect"
const description =
  "A hub to connect with me -- links, socials, and a space to say hello. Whether it's to collaborate, chat, or share ideas, I'd love to hear from you!"
const ghPath = "/app/(duotone)/connect/page.tsx"

export default function Page() {
  return (
    <Shell>
      <DuotoneLayout title={title} description={description} ghPath={ghPath}>
        <WithSidebar sidebar={null} direction="right">
          <div className="mx-auto min-w-full">
            <div className="prose max-w-none text-foreground-muted">
              <p>Coming soon...</p>
            </div>
          </div>
        </WithSidebar>
      </DuotoneLayout>
    </Shell>
  )
}

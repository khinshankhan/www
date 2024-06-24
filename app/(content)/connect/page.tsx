import React from "react"
import { Callout } from "@/components/callout"
import { Link } from "@/components/primitives/link"

export default async function Connect() {
  return (
    <main className="flex flex-col gap-4">
      <Callout variant="note" heading="Work in Progress">
        <p>
          {"I'm"} currently in the process of rewriting my website. You can view the progress on{" "}
          <Link href="https://github.com/khinshankhan/www">GitHub</Link>. This process will take
          some time. Stay tuned... coming soon!
        </p>
      </Callout>
    </main>
  )
}

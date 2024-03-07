import React from "react"
import { Callout } from "@/components/blocks/callout"
import { Link } from "@/components/primitives/link"

export default function Connect() {
  return (
    <main>
      <Callout variant="note" heading="Work in Progress">
        <p>
          I'm in the process of rewriting my website. You can view the progress on{" "}
          <Link href="https://github.com/khinshankhan/www">GitHub</Link>. It'll take some time, so
          this is a placeholder until then! Soon <sup>TM</sup>
        </p>
      </Callout>
    </main>
  )
}

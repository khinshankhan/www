import React, { type ReactNode } from "react"
import { Link } from "@/components/ui"

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}

      <div className="bg-theme-primary pb-8">
        <div className="page-container">
          <div className="mt-4 text-center">
            Hey there, congrats on making it all the way down here. Do you want chat about the
            content you just read? Maybe about work I'm planning or you'd like to see? Wondering
            where's the disqus or utterances chat? I'm experimenting with building a community, so
            please{" "}
            <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">join my discord server</Link>.
          </div>
        </div>
      </div>
    </>
  )
}

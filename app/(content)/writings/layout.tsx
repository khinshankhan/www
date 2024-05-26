import React, { Fragment } from "react"

export default function WritingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <div className="grow bg-content text-content-foreground">{children}</div>
      <div className="bg-background text-foreground">hiya</div>
    </Fragment>
  )
}

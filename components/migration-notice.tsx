import React, { type ReactNode } from "react"
import { Link } from "@/components/ui"
import { Callout, CalloutProps } from "@/components/callout"
import Emoji from "@/components/emoji"

interface MigrationProps extends Omit<CalloutProps, "children"> {
  children?: ReactNode
}

export default function MigrationNotice({ children, ...props }: MigrationProps) {
  return (
    <div className="align-center flex w-full flex-row justify-center text-left">
      <div className="w-[60ch]">
        <Callout variant="info" heading="Work in Progress" {...props}>
          {children}
          {!children && (
            <>
              <span>
                {`I'm in the process of rewriting my website. You can view the progress on`}{" "}
                <Link href="https://github.com/khinshankhan/anchorage">GitHub</Link>
                {`It'll take some time, so this is a placeholder until then! Soon`}{" "}
              </span>
              <sup>
                <Emoji name=":tm:" />
              </sup>
            </>
          )}
        </Callout>
      </div>
    </div>
  )
}

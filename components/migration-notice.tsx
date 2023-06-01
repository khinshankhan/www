import React, { type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui"
import Emoji from "@/components/emoji"
import { InformationCircle } from "@/components/icons"

interface MigrationNoticeProps {
  className?: string
  children?: ReactNode
}
export default function MigrationNotice({ className = "", children }: MigrationNoticeProps) {
  return (
    <div className={cn("align-center flex flex-row justify-center", className)}>
      <div className="max-w-[60ch] border p-4">
        <Icon>
          <InformationCircle className="stroke-sky-8" />
        </Icon>{" "}
        {children}
        {!children && (
          <>
            <span>
              {`I'm in the process of rewriting my website. It'll take some time, so this is a placeholder until then! Soon`}{" "}
            </span>
            <Emoji name=":construction:" />
          </>
        )}
      </div>
    </div>
  )
}

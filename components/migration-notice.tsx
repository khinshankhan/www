import React, { type ReactNode } from "react"
import { Icon } from "@/components/ui"
import Emoji from "@/components/emoji"
import { InformationCircle } from "@/components/icons"

export default function MigrationNotice({ children }: { children?: ReactNode }) {
  return (
    <div className="align-center flex flex-row justify-center">
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

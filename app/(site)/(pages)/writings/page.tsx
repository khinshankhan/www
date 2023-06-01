import React from "react"
import Emoji from "@/components/emoji"
import MigrationNotice from "@/components/migration-notice"

export default function Writings() {
  return (
    <MigrationNotice>
      <span>
        {`I'm in the process of converting my previous articles from org mode to mdx. It'll take some time, so articles won't be here for a while... soon`}{" "}
      </span>
      <Emoji name=":writing_hand:" />
    </MigrationNotice>
  )
}

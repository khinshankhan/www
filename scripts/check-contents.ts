import chokidar from "chokidar"
import { z } from "zod"
import { getAllContentData, getContentData } from "../lib/content"

function checkContents(watchFlag: boolean = false) {
  let triedFilePaths: string[] = []

  function getContentDataWrapper(filePath: string) {
    try {
      triedFilePaths.push(filePath)
      return getContentData(filePath)
    } catch (err) {
      if (!(err instanceof z.ZodError)) throw err

      err.errors.forEach((err) => {
        console.error(
          `[INVALID CONTENT] ${filePath}: ${err.message} - [content.${err.path.join(".")}]`
        )
      })

      throw err
    }
  }

  const validContentData = getAllContentData(getContentDataWrapper)

  const invalidFilesCount = triedFilePaths.length - validContentData.length
  if (invalidFilesCount > 0) {
    const errorMessage = `[INVALID CONTENT] detected ${invalidFilesCount} bad file(s)`
    console.log(errorMessage)

    // if not watching, don't let ci cd build pass
    if (!watchFlag) {
      throw new Error(errorMessage)
    }
  }

  if (!watchFlag) {
    console.log(`[check-contents.ts] All ${validContentData.length} content file(s) are valid`)
  }
}

const watchFlag = process.argv.includes("--watch")
if (watchFlag) {
  chokidar.watch("./content", { persistent: true }).on("all", (event, path) => {
    if (["add", "change"].includes(event)) {
      console.log("[check-contents.ts]", event, path)
      checkContents(watchFlag)
    }
  })
} else {
  checkContents(watchFlag)
}

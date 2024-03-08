import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { z } from "zod"
import { getAllContentData, getContentData } from "../lib/content"

let triedFilePaths: string[] = []
function getContentDataWrapper(filePath: string) {
  try {
    triedFilePaths.push(filePath)
    return getContentData(filePath)
  } catch (err) {
    if (!(err instanceof z.ZodError)) throw err

    err.errors.forEach((err) => {
      console.error(
        `[INVALID CONTENT] error parsing content data for ${filePath}: ${
          err.message
        } - Path: [content.${err.path.join(".")}]`
      )
    })

    throw err
  }
}

function checkContents() {
  const validContentData = getAllContentData(getContentDataWrapper)

  if (triedFilePaths.length != validContentData.length) {
    console.log(
      `[INVALID CONTENT] detected ${triedFilePaths.length - validContentData.length} bad files`
    )
  }
}

checkContents()

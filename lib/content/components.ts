import {
  contentMdxComponentLoaders,
  type MDXComponents,
} from "@/.generated/content/components.manifest"
import type { ContentData } from "./schema"

interface ContentMdxComponentModule {
  default?: MDXComponents
}

export async function getContentMdxComponents(contentData: ContentData): Promise<MDXComponents> {
  const loadComponents = contentMdxComponentLoaders[contentData.slug]

  if (!loadComponents) {
    return {}
  }

  const articleModule = (await loadComponents()) as ContentMdxComponentModule & MDXComponents
  return articleModule.default ?? articleModule
}

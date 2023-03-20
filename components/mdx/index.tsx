import type { MDXComponents } from "mdx/types"

import { Link } from "components/ui"
import { Emoji } from "components/emoji"

const A: MDXComponents["a"] = ({ href = "#", ...props }) => <Link href={href} {...props} />

export const MdxComponents: MDXComponents = {
  A,
  a: A,
  Emoji,
}

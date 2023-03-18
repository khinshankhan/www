import type { MDXComponents } from "mdx/types"

import { Link } from "components/ui"

const A: MDXComponents["a"] = ({ href = "#", ...props }) => <Link href={href} {...props} />

export const MdxComponents: MDXComponents = {
  A,
  a: A,
}

import type { MDXComponents } from "mdx/types"
import { useMDXComponent } from "next-contentlayer/hooks"
import { Link, typographyVariants } from "@/components/ui"

const A: MDXComponents["a"] = ({ href = "#", ...props }) => <Link href={href} {...props} />
const getHeading = (variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") => {
  const Component = variant

  const Heading: MDXComponents["h1"] = ({ className = "", ...props }) => (
    <Component className={typographyVariants({ variant, className })} {...props} />
  )
  return Heading
}

const MdxComponents: MDXComponents = {
  a: A,
  h1: getHeading("h1"),
  h2: getHeading("h2"),
  h3: getHeading("h3"),
  h4: getHeading("h4"),
  h5: getHeading("h5"),
  h6: getHeading("h6"),
}

interface MdxProps {
  code: string
}
export function MdxContent({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return <Component components={MdxComponents} />
}

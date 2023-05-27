import { useMDXComponent } from "next-contentlayer/hooks"

interface MdxProps {
  code: string
}

export function MdxContent({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return <Component components={{}} />
}

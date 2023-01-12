import type { MDXComponents } from "mdx/types";
import type { DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";
import { useRef, cloneElement } from "react";
import { Box } from "components/primitives";
import Emoji from "components/Emoji";
import { Link, FullImage } from "components/primitives";
import { CopyToClipboardToggle } from "components/toggle";

const A: MDXComponents["a"] = ({ href = "#", ...props }) => <Link href={href} {...props} />;

const Img: MDXComponents["img"] = ({ title, alt = "", src = "/placeholder.png" }) => (
  <FullImage title={title} alt={alt} src={src} />
);

const Pre = (props: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) => {
  const ref = useRef<HTMLElement>(null);

  return (
    <pre {...props}>
      <CopyToClipboardToggle ctx={ref} />
      {cloneElement(props.children as ReactElement, { ref })}
    </pre>
  );
};

interface IAnchorHeadingProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}
const AnchorHeading = ({ as = "h1", children, ref, ...props }: IAnchorHeadingProps) => {
  const { id } = props;

  if (!id) {
    return <Box {...props}>{children}</Box>;
  }
  return (
    <Box as={as} {...props}>
      <Link href={`#${id}`} className="anchor" isInternal={true} isFile={false}>
        {children}
      </Link>
    </Box>
  );
};

export const MdxComponents: MDXComponents = {
  Emoji,
  a: A,
  img: Img,
  pre: Pre,
  h1: (props) => <AnchorHeading as="h1" {...props} />,
  h2: (props) => <AnchorHeading as="h2" {...props} />,
  h3: (props) => <AnchorHeading as="h3" {...props} />,
  h4: (props) => <AnchorHeading as="h4" {...props} />,
  h5: (props) => <AnchorHeading as="h5" {...props} />,
  h6: (props) => <AnchorHeading as="h6" {...props} />,
};

export default MdxComponents;

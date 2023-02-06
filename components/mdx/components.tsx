import type { MDXComponents } from "mdx/types";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { Box, Link } from "components/primitives";
import Emoji from "components/emoji";
import { Pre, Codex } from "./code";

const A: MDXComponents["a"] = ({ href = "#", ...props }) => <Link href={href} {...props} />;

const Img: MDXComponents["img"] = ({ title, alt = "", src = "/placeholder.png" }) => (
  <img title={title} alt={alt} src={src} />
);

export interface IAnchorHeadingProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}
// yeet ref for type of link when spreading
export const AnchorHeading = ({ as = "h1", children, ref, ...props }: IAnchorHeadingProps) => {
  const { id } = props;

  if (!id) {
    return (
      <Box as={as} {...props}>
        {children}
      </Box>
    );
  }
  return (
    <Box as={as} {...props}>
      <a href={`#${id}`} className="anchor">
        {children}
      </a>
    </Box>
  );
};

export const MdxComponents: MDXComponents = {
  Emoji,
  a: A,
  img: Img,
  pre: Pre,
  Codex,
  h1: (props) => <AnchorHeading as="h1" {...props} />,
  h2: (props) => <AnchorHeading as="h2" {...props} />,
  h3: (props) => <AnchorHeading as="h3" {...props} />,
  h4: (props) => <AnchorHeading as="h4" {...props} />,
  h5: (props) => <AnchorHeading as="h5" {...props} />,
  h6: (props) => <AnchorHeading as="h6" {...props} />,
};

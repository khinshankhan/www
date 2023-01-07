import type { MDXComponents } from "mdx/types";
import type { DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";
import { useRef, cloneElement } from "react";
import Emoji from "components/Emoji";
import Link from "components/Link";
import Image from "components/Image";
import { CopyToClipboardToggle } from "components/toggle";

const A: MDXComponents["a"] = ({ href = "#", ...props }) => <Link href={href} {...props} />;

const Img: MDXComponents["img"] = ({ title, alt = "", src = "/placeholder.png" }) => (
  <Image title={title} alt={alt} src={src} />
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

export const MdxComponents: MDXComponents = {
  Emoji,
  a: A,
  img: Img,
  pre: Pre,
};

export default MdxComponents;

import type { MDXComponents } from "mdx/types";
import type { RefObject, DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";
import { useState, useEffect, useRef, cloneElement } from "react";
import Emoji from "components/Emoji";
import Link from "components/Link";
import Image from "components/Image";
import { IconButton } from "lib/theme/components";
import { CopyIcon, CheckIcon } from "@radix-ui/react-icons";

const A: MDXComponents["a"] = ({ href = "#", ...props }) => <Link href={href} {...props} />;

const Img: MDXComponents["img"] = ({ title, alt = "", src = "/placeholder.png" }) => (
  <Image title={title} alt={alt} src={src} />
);

const CopyToClipboardButton = ({ ctx }: { ctx: RefObject<HTMLElement> }) => {
  const [clicked, setClick] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setClick(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [clicked, setClick]);

  async function onClick() {
    await navigator.clipboard.writeText(ctx.current?.textContent ?? "Failed to copy");
    setClick(true);
  }

  const Icon = clicked ? CheckIcon : CopyIcon;
  const text = clicked ? "Copied!" : "Click to copy code";
  const color = clicked ? "$green10" : "$text";
  return (
    <IconButton aria-label={text} onClick={onClick} css={{ float: "right", color }}>
      <Icon style={{ color: "inherit" }} />
    </IconButton>
  );
};

const Pre = (props: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) => {
  const ref = useRef<HTMLElement>(null);

  return (
    <pre {...props}>
      <CopyToClipboardButton ctx={ref} />
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

import type { MDXComponents } from "mdx/types";
import Emoji from "components/Emoji";
import Link from "components/Link";
import Image from "components/Image";

const A: MDXComponents["a"] = ({ href = "#", ...props }) => <Link href={href} {...props} />;

const Img: MDXComponents["img"] = ({ title, alt = "", src = "/placeholder.png" }) => (
  <Image title={title} alt={alt} src={src} />
);

export const MdxComponents: MDXComponents = {
  Emoji,
  a: A,
  img: Img,
};

export default MdxComponents;

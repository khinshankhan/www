import type { MDXComponents } from "mdx/types";
import type { DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";
import { useRef, cloneElement } from "react";
import { braidArrays } from "lib/utils/array";
import { extractEmoji } from "lib/utils/regex";
import { Box } from "components/primitives";
import Emoji from "components/Emoji";
import { Link, FullImage } from "components/primitives";
import { CopyToClipboardToggle } from "components/toggles";

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

export interface IAnchorHeadingProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}
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
  h1: (props) => <AnchorHeading as="h1" {...props} />,
  h2: (props) => <AnchorHeading as="h2" {...props} />,
  h3: (props) => <AnchorHeading as="h3" {...props} />,
  h4: (props) => <AnchorHeading as="h4" {...props} />,
  h5: (props) => <AnchorHeading as="h5" {...props} />,
  h6: (props) => <AnchorHeading as="h6" {...props} />,
};

// HACK: weird unicode I'll probably never use
const weird = `⏧`;
// subtitles aren't too fancy, one liner + possible emoji
export const EmojiFauxRehype = (subtitle: string, jsx = true) => {
  const matches = [...subtitle.matchAll(extractEmoji)];

  const emptied = matches
    .reduce((str, match) => str.replace(match[1], weird), subtitle)
    .split(weird)
    // NOTE: consective emoji should have a space between them
    .filter((str) => str !== "");
  const texts = jsx
    ? emptied.map((text, index) => (
        <span key={`text-${index}`} dangerouslySetInnerHTML={{ __html: text }} />
      ))
    : emptied;

  const replaceWith = matches.map((match, index) =>
    jsx ? <Emoji key={`emoji-${index}`} text={match[2]} /> : match[2]
  );

  const braided = braidArrays(texts, replaceWith);
  return jsx ? braided : braided.join("");
};

export default MdxComponents;

import React from "react";
import { Alert, Box, ListItem, OrderedList, Text, UnorderedList } from "@chakra-ui/react";
import { MDXComponents } from "mdx/types";
import Code from "src/components/Code";
import { Headings, Link } from "src/components/common";
import { codeToCode, getPreCodeMeta, getCodeProps } from "src/utils/code";

const MdxP: MDXComponents["p"] = Text;

const MdxH1: MDXComponents["h1"] = ({ children }) => <Headings.h1>{children}</Headings.h1>;
const MdxH2: MDXComponents["h2"] = ({ children }) => <Headings.h2>{children}</Headings.h2>;
const MdxH3: MDXComponents["h3"] = ({ children }) => <Headings.h3>{children}</Headings.h3>;
const MdxH4: MDXComponents["h4"] = ({ children }) => <Headings.h4>{children}</Headings.h4>;
const MdxH5: MDXComponents["h5"] = ({ children }) => <Headings.h5>{children}</Headings.h5>;
const MdxH6: MDXComponents["h6"] = ({ children }) => <Headings.h6>{children}</Headings.h6>;

const MdxBlockquote: MDXComponents["blockquote"] = ({ children }) => (
  <Alert
    as="blockquote"
    mt="4"
    role="none"
    status="warning"
    variant="left-accent"
    rounded="4px"
    my="1.5rem"
  >
    {children}
  </Alert>
);

const MdxUl: MDXComponents["ul"] = ({ children }) => <UnorderedList>{children}</UnorderedList>;

const MdxOl: MDXComponents["ol"] = ({ children }) => <OrderedList>{children}</OrderedList>;

const MdxLi: MDXComponents["li"] = ({ children }) => <ListItem>{children}</ListItem>;

const MdxStrong: MDXComponents["strong"] = ({ ref, ...props }) => (
  <Box as="strong" fontWeight="semibold" {...props} />
);

// TODO
const MdxPre: MDXComponents["pre"] = ({ children, ...props }) => {
  // TODO: no idea, a pre block that's not a codeblock is possible
  // I'm fairly confident in these types...
  if (!(children as any)?.props?.className || (children as any)?.props?.className === ``) {
    <pre {...props}>{children}</pre>;
  }

  const meta = getPreCodeMeta((children as any)!.props!.className);

  // TODO: maybe insert title + copy button around here?
  return (
    <div className="gatsby-highlight">
      <pre {...props} className={`language-${meta.language}`}>
        {children}
      </pre>
    </div>
  );
};

const MdxCode: MDXComponents["code"] = ({ className, children }) => {
  // NOTE: no idea if it children won't be a string at this point but this seems to always be the case

  if (!className) {
    // TODO: actually utilize the language for highlighting?
    const { language, content } = codeToCode({ children: children as string });

    return (
      <Box as="span">
        <Box as="code" className={`language-${language}`}>
          {content}
        </Box>
      </Box>
    );
  }

  const codeProps = getCodeProps({
    className,
    children: children as string,
  });
  return <Code {...codeProps} />;
};

const MdxHr: MDXComponents["hr"] = () => (
  <Box pt="10" mb="10" borderBottom={1} borderStyle="solid" borderColor="dividerColor" />
);

const MdxA: MDXComponents["a"] = ({ href = `#`, children }) => <Link href={href}>{children}</Link>;

const MdxImg: MDXComponents["img"] = ({ title, alt, src, children }) => (
  <div>
    <figure>
      <span
        style={{
          display: `block`,
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: `1325px`,
        }}
      >
        <img
          src={src}
          alt={alt || `This is an image from ${src}`}
          title={title || ``}
          style={{
            width: `100%`,
            height: `100%`,
            margin: 0,
            top: 0,
            left: 0,
          }}
        />
      </span>
      {(children || title) && <Box as="figcaption">{children || title}</Box>}
    </figure>
  </div>
);

const mdxComponents: MDXComponents = {
  p: MdxP,
  h1: MdxH1,
  h2: MdxH2,
  h3: MdxH3,
  h4: MdxH4,
  h5: MdxH5,
  h6: MdxH6,
  blockquote: MdxBlockquote,
  ul: MdxUl,
  ol: MdxOl,
  li: MdxLi,
  pre: MdxPre,
  code: MdxCode,
  // NOTE: this didn't do anything?
  // inlineCode: MdxInlineCode,
  strong: MdxStrong,
  hr: MdxHr,
  a: MdxA,
  img: MdxImg,

  MdxImg,
  Headings,
  Alert,
  UnorderedList,
  OrderedList,
  ListItem,
};

export default mdxComponents;

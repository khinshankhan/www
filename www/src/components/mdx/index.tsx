import React from "react";
import { Alert, Box, ListItem, OrderedList, Text, UnorderedList } from "@chakra-ui/react";
import { MDXComponents } from "mdx/types";
import { Headings, Link } from "src/components/common";

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

const MdxHr: MDXComponents["hr"] = () => (
  <Box pt="10" mb="10" borderBottom={1} borderStyle="solid" borderColor="dividerColor" />
);

const MdxA: MDXComponents["a"] = ({ href = `#`, children }) => <Link href={href}>{children}</Link>;

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
  strong: MdxStrong,
  hr: MdxHr,
  a: MdxA,

  Headings,
  Alert,
  UnorderedList,
  OrderedList,
  ListItem,
};

export default mdxComponents;

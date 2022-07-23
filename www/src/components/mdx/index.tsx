import React from "react";
import { Alert, Box, ListItem, OrderedList, Text, UnorderedList } from "@chakra-ui/react";
import { MDXProviderComponentsProp } from "@mdx-js/react";
import { Heading, Headings, Link, InternalLink, ExternalLink } from "src/components/common";

const mdxComponents: MDXProviderComponentsProp = {
  p: Text,
  ...Headings,
  blockquote: (props) => (
    <Alert
      mt="4"
      role="none"
      status="warning"
      variant="left-accent"
      as="blockquote"
      rounded="4px"
      my="1.5rem"
      {...props}
    />
  ),
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  strong: (props) => <Box as="strong" fontWeight="semibold" {...props} />,
  hr: () => <Box pt="10" mb="10" borderBottom={1} borderStyle="solid" borderColor="dividerColor" />,
  a: Link,

  // shorthands
  Heading,
  InternalLink,
  ExternalLink,
};

export default mdxComponents;

import React from "react";
import * as Chakra from "@chakra-ui/react";
import type { AlertProps, BoxProps } from "@chakra-ui/react";
import { Link, InternalLink, ExternalLink } from "src/components/common/Link";
import Headings from "../common/Heading/Headings";

const { Alert, Box, ListItem, OrderedList, Text, UnorderedList } = Chakra;

const mdxComponents = {
  ...Chakra,
  p: Text,
  ...Headings,
  blockquote: (props: AlertProps) => (
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
  strong: (props: BoxProps) => <Box as="strong" fontWeight="semibold" {...props} />,
  hr: () => <Box pt="10" mb="10" borderBottom={1} borderStyle="solid" borderColor="dividerColor" />,
  a: Link,
  InternalLink,
  ExternalLink,
};

export default mdxComponents;

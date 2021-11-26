import React from "react";
import { Box, Text, LinkOverlay, LinkBox } from "@chakra-ui/react";
import headings from "src/components/mdx/headings";
import Link from "src/components/mdx/Link";

const WritingListItem = ({ node, ...props }) => (
  <LinkBox
    pb="5"
    _hover={{
      color: `gray.400`,
    }}
    {...props}
  >
    <Box as="article" pl="5" pb="3" borderWidth="1px" rounded="md">
      <headings.h3
        color="#BB72EC"
        _hover={{
          color: `#F40057`,
          textDecoration: `none`,
        }}
      >
        <LinkOverlay as={Link} href={node.slug}>
          {node.frontmatter.title}
        </LinkOverlay>
      </headings.h3>
      <Box as="time" dateTime={node.frontmatter.planted}>
        {node.frontmatter.humanDatePlanted} &middot; {node.timeToRead} min read
      </Box>
      <Text>{node.excerpt}</Text>
    </Box>
  </LinkBox>
);

const WritingList = ({ nodes }) => (
  <>
    {nodes.map((node) => (
      <WritingListItem key={node.node.id} node={node.node} />
    ))}
  </>
);

export default WritingList;

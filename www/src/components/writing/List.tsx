import React from "react";
import { Box, Text, LinkOverlay, LinkBox } from "@chakra-ui/react";
import headings from "src/components/mdx/headings";

const WritingListItem = ({ node, ...props }) => (
  <LinkBox pb="5" {...props}>
    <Box as="article" pl="5" pb="3" borderWidth="1px" rounded="md">
      <headings.h3>
        <LinkOverlay href={`writing/${node.slug}`}>
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

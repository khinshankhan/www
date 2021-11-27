import React from "react";
import {
  Box,
  Text,
  LinkOverlay,
  LinkBox,
  useColorModeValue,
} from "@chakra-ui/react";
import headings from "src/components/mdx/headings";
import Link from "src/components/mdx/Link";
import { IWritingNodeWrapper, IWritingNode } from "src/queries/WritingNodes";

type IWritingListItemProps = {
  node: IWritingNode;
  [key: string]: any;
};

const WritingListItem = ({ node, ...props }: IWritingListItemProps) => {
  const bg = useColorModeValue(`#FFFFFF`, `#1A202C`);
  const bgHover = useColorModeValue(`#DDDDDD`, `#1E2430`);
  const colorHover = useColorModeValue(`gray.500`, `gray.400`);

  return (
    <LinkBox
      pb="5"
      _hover={{
        color: colorHover,
      }}
      {...props}
    >
      <Box
        as="article"
        pl="5"
        pb="3"
        borderWidth="1px"
        rounded="md"
        bg={bg}
        _hover={{ background: bgHover }}
      >
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
          {node.frontmatter.humanDatePlanted} &middot; {node.timeToRead} min
          read
        </Box>
        <Text>{node.excerpt}</Text>
      </Box>
    </LinkBox>
  );
};

type IWritingListProps = {
  nodes: IWritingNodeWrapper[];
};

const WritingList = ({ nodes }: IWritingListProps) => (
  <>
    {nodes.map((node) => (
      <WritingListItem key={node.node.id} node={node.node} />
    ))}
  </>
);

export default WritingList;

import React, { FC } from "react";
import { VStack, Text } from "@chakra-ui/react";
import { Heading, Link } from "src/components/common";
import { ContentContainer } from "src/components/layouts";
import type { WritingNode } from "src/queries/writing";
import { WritingCard } from "./Card";

interface IWritingListProps {
  nodes: WritingNode[];
  // TODO: move this out
  tags: { [key: string]: boolean };
  toggle: (tag: string) => void;
}

const NoMatches = () => (
  <VStack pl="5" pr="5" pt="1" pb="3" mb="5">
    <Heading variant="h2" as="h2">
      No writings seem to match the selected search!
    </Heading>
    <Text>May try different filters or search terms?</Text>

    <br />

    <Text>
      (If you're looking for the hint, try going to <Link href="/">home</Link> and looking for
      numbers!)
    </Text>
  </VStack>
);

export const WritingList: FC<IWritingListProps> = ({ nodes, tags, toggle }) => (
  <ContentContainer w="100%" maxW="95%">
    {nodes.length > 0 ? (
      nodes.map((node) => <WritingCard key={node.id} node={node} tags={tags} toggle={toggle} />)
    ) : (
      <NoMatches />
    )}
  </ContentContainer>
);

export default WritingList;

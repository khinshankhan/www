import React, { FC } from "react";
import { LinkBox, LinkOverlay, Box, Text, HStack } from "@chakra-ui/react";
import { InternalLink, Heading, Tag } from "src/components/common";
import { WritingCardNode } from "src/types/queries";

interface IWritingTags {
  tags: string[];
}

const WritingTags = ({ tags }: IWritingTags) => (
  <HStack wrap="wrap">
    {tags.map((tag) => (
      <Tag key={tag} tag={tag} />
    ))}
  </HStack>
);

interface IWritingCardProps {
  node: WritingCardNode;
}

export const WritingCard: FC<IWritingCardProps> = ({
  node: {
    fields: { slug },
    frontmatter: { title, spoiler, planted, tended },
    timeToRead,
  },
}) => {
  const subtitle = spoiler ?? `A little surprise reading 😊`;

  return (
    <LinkBox as="article" p="5" borderWidth="1px" borderColor="bgContrast" rounded="md" mb={5}>
      <Heading.h1 variant="h3" mt={2} mb={3}>
        <LinkOverlay as={InternalLink} href={slug}>
          {title}
        </LinkOverlay>
      </Heading.h1>

      <Box>
        <Text as="em" fontSize={{ base: `sm`, sm: `md`, md: `lg` }}>
          <Box as="time" dateTime={tended}>
            🌦️ {tended}
          </Box>
          {` `}
          &middot;{` `}
          <Box as="time" dateTime={planted}>
            🌱 {planted}
          </Box>
          {` `}
          &middot; {timeToRead} min read
        </Text>
      </Box>

      <WritingTags tags={[`tag1`, `tag2`, `tag3`]} />

      <Text mb={3} mt={2}>
        {subtitle}
      </Text>
    </LinkBox>
  );
};

export default WritingCard;

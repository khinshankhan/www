import React, { FC, useState } from "react";
import { LinkBox, LinkOverlay, Box, Text, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { InternalLink, Heading, Tag, ITagProps } from "src/components/common";
import { WritingCardNode } from "src/types/queries";

interface IWritingTags {
  tags: string[];
  tagProps?: ITagProps | {};
}

const WritingTags = ({ tags, tagProps = {} }: IWritingTags) => (
  <HStack wrap="wrap">
    {tags.map((tag) => (
      <Tag key={tag} tag={tag} {...tagProps} />
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
  const [innerHover, setInnerHover] = useState(false);
  const activateInnerHover = () => setInnerHover(true);
  const deactivateInnerHover = () => setInnerHover(false);

  const subtitle = spoiler ?? `A little surprise reading 😊`;

  return (
    <LinkBox
      as={motion.article}
      p="5"
      borderWidth="1px"
      borderColor="bgContrast"
      rounded="md"
      mb={5}
      bgColor="green.50"
      _hover={{ ...(!innerHover && { bgColor: `orange.100` }) }}
      whileHover={{ ...(!innerHover && { translateX: 15 }) }}
    >
      <Heading.h2 variant="h3" mt={2} mb={3}>
        <LinkOverlay as={InternalLink} href={slug}>
          {title}
        </LinkOverlay>
      </Heading.h2>

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

      <WritingTags
        tags={[`tag1`, `tag2`, `tag3`]}
        tagProps={{ onHoverStart: activateInnerHover, onHoverEnd: deactivateInnerHover }}
      />

      <Text mb={3} mt={2}>
        {subtitle}
      </Text>
    </LinkBox>
  );
};

export default WritingCard;

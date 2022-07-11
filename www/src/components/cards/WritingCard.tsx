import React, { FC, useState } from "react";
import { Box, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { InternalLink, Heading, TagList } from "src/components/common";
import { WritingCardNode } from "src/types/queries";

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
  const [tagFocus, setTagFocus] = useState(false);
  const activateTagFocus = () => setTagFocus(true);
  const deactivateTagFocus = () => setTagFocus(false);

  const tagHandler = (tag: string) => console.log({ tag });

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
      _hover={{ ...(!tagFocus && { bgColor: `orange.100` }) }}
      _focusWithin={{ ...(!tagFocus && { bgColor: `orange.100` }) }}
      whileHover={{ ...(!tagFocus && { translateX: 15 }) }}
    >
      <Heading.h2 fontFamily="title" mt={2} mb={3}>
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

      <Box
        onMouseEnter={activateTagFocus}
        onMouseLeave={deactivateTagFocus}
        onFocus={activateTagFocus}
        onBlur={deactivateTagFocus}
      >
        <TagList
          tagProps={{ handler: tagHandler }}
          tags={[
            `tag1`,
            `tag2`,
            `tag3`,
            `tag4`,
            `tag5`,
            `tag6`,
            `tag7`,
            `tag8`,
            `tag9`,
            `tag12`,
            `tag13`,
            `tag14`,
            `tag15`,
            `tag16`,
            `tag17`,
          ]}
        />
      </Box>

      <Text mb={3} mt={2}>
        {subtitle}
      </Text>
    </LinkBox>
  );
};

export default WritingCard;

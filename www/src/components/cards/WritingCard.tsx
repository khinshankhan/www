import React, { FC, MouseEvent, useState, useMemo } from "react";
import { useToken, Box, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { InternalLink, Heading, TagList, TagHandler } from "src/components/common";
import { cardStyles } from "src/theme/custom/styles";
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
  const [internal] = useToken(`colors`, [`internal`]);

  const writingCardStyles = useMemo(
    () => cardStyles({ cardType: `writing`, internal }),
    [internal]
  );
  const { _hover, _focusWithin, sx } = writingCardStyles;

  const [tagFocused, setTagFocused] = useState(false);
  const activateTagFocused = () => setTagFocused(true);
  const deactivateTagFocused = () => setTagFocused(false);

  const [tagHovered, setTagHovered] = useState(false);
  const activateTagHovered = () => setTagHovered(true);
  const deactivateTagHovered = () => setTagHovered(false);

  const tagFocus = tagFocused || tagHovered;

  // NOTE: removes 'sticky' focus caused by synthetic event
  const removeStickyFocus = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.blur();
    deactivateTagFocused();
  };

  const tagHandler: TagHandler = (tag) => {
    console.log({ tag });
  };

  const subtitle = spoiler ?? `A little surprise reading 😊`;

  return (
    <LinkBox
      as={motion.article}
      p="5"
      borderWidth={4}
      borderColor="inactiveCardBorder"
      rounded="md"
      mb={5}
      bgColor="inactiveCardBg"
      _hover={{
        ...(!tagFocus && _hover),
      }}
      _focusWithin={{
        ...(!tagFocus && _focusWithin),
      }}
      sx={sx}
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
        onMouseEnter={activateTagHovered}
        onMouseLeave={deactivateTagHovered}
        onMouseDown={removeStickyFocus}
        onFocus={activateTagFocused}
        onBlur={deactivateTagFocused}
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

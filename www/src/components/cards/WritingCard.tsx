import React, { FC, useMemo } from "react";
import { useToken, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import { InternalLink, Heading } from "src/components/common";
import { cardStyles } from "src/theme/custom/styles";
import { WritingCardNode } from "src/types/queries";

interface IWritingCardProps {
  node: WritingCardNode;
}

export const WritingCard: FC<IWritingCardProps> = ({
  node: {
    fields: { slug },
    frontmatter: { title, spoiler },
    excerpt,
  },
}) => {
  const [internal] = useToken(`colors`, [`internal`]);

  const writingCardStyles = useMemo(() => cardStyles({ internal }), [internal]);
  const { _hover, _focusWithin, sx } = writingCardStyles;

  const subtitle = spoiler ?? `A little surprise reading 😊`;

  return (
    <LinkBox
      as="article"
      maxW="sm"
      p="5"
      borderWidth={4}
      borderColor="inactiveCardBorder"
      rounded="md"
      mb={5}
      bgColor="inactiveCardBg"
      _hover={_hover}
      _focusWithin={_focusWithin}
      sx={sx}
    >
      <Heading.h2 fontFamily="title" mt={2} mb={3}>
        <LinkOverlay as={InternalLink} href={slug}>
          {title}
        </LinkOverlay>
      </Heading.h2>

      <Text color="blueGray.500" mb={3} mt={2}>
        {subtitle}
      </Text>
      <Text mb={3} mt={2}>
        {excerpt}
      </Text>
    </LinkBox>
  );
};

export default WritingCard;

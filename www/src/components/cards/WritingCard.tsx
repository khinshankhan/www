import React, { FC, useMemo } from "react";
import { useToken, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import { InternalLink, Heading } from "src/components/common";
import { cardStyles } from "src/theme/styles/card";
import { WritingCardNode } from "src/types/queries";

interface IWritingCardProps {
  node: WritingCardNode;
}

export const WritingCard: FC<IWritingCardProps> = ({
  node: {
    fields: { slug, subtitle },
    frontmatter: { title },
    excerpt,
  },
}) => {
  const [internal] = useToken(`colors`, [`internal`]);

  const writingCardStyles = useMemo(() => cardStyles({ internal }), [internal]);
  const { _hover, _focusWithin, sx } = writingCardStyles;

  return (
    <LinkBox
      as="article"
      width="full"
      rounded="xl"
      boxShadow="lg"
      justifyContent="space-between"
      p={7}
      bg="inactiveCardBg"
      _hover={_hover}
      _focusWithin={_focusWithin}
      sx={sx}
    >
      <Heading.h2 fontFamily="title" mt={2} mb={3}>
        <LinkOverlay as={InternalLink} href={slug}>
          {title}
        </LinkOverlay>
      </Heading.h2>
      <Text color="spoilerText" mb={3} mt={2}>
        {subtitle}
      </Text>
      <Text mb={3} mt={2}>
        {excerpt}
      </Text>
    </LinkBox>
  );
};

export default WritingCard;

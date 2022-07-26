import React, { FC, useMemo } from "react";
import { useToken, Box, Image, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import { InternalLink, Heading } from "src/components/common";
import { cardStyles } from "src/theme/styles/card";
import { WritingCardNode } from "src/types/queries";
import { normalizeCover } from "src/utils/image";
import Badges, { checkBadges } from "./Badges";

interface IWritingCardProps {
  node: WritingCardNode;
}

export const WritingCard: FC<IWritingCardProps> = ({
  node: {
    fields: { slug, subtitle, status },
    frontmatter: { title, planted, tended, cover },
    excerpt,
  },
}) => {
  const [internal] = useToken(`colors`, [`internal`]);

  const writingCardStyles = useMemo(() => cardStyles({ internal }), [internal]);
  const { _hover, _focusWithin, sx } = writingCardStyles;

  const img = normalizeCover(cover);
  const badges = checkBadges(planted, tended, status);
  const { newBadge, updatedBadge, statusBadge } = badges;

  return (
    <LinkBox
      as="article"
      width="full"
      rounded="xl"
      boxShadow="lg"
      overflow="hidden"
      justifyContent="space-between"
      _hover={_hover}
      _focusWithin={_focusWithin}
      sx={sx}
    >
      <Image src={img.src} alt={img.alt} />
      <Box p={7} pt={1}>
        <Box display="block">
          <Heading.h2 display="inline" fontFamily="title" mt={2} mb={3}>
            <LinkOverlay as={InternalLink} href={slug}>
              {title}
            </LinkOverlay>
          </Heading.h2>
          {(newBadge || updatedBadge || statusBadge) && (
            <Box display="inline" style={{ float: `right` }}>
              <Badges status={status} {...badges} />
            </Box>
          )}
        </Box>
        <Text color="spoilerText" mb={2}>
          {subtitle}
        </Text>
        <Text mt={2} noOfLines={2}>
          {excerpt}
        </Text>
      </Box>
    </LinkBox>
  );
};

export default WritingCard;

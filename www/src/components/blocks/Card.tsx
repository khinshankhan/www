import React, { FC, ReactNode, Children } from "react";
import { Text, LinkOverlay, LinkBox, useColorModeValue } from "@chakra-ui/react";
import { Link } from "src/components/common";
import Heading from "src/components/common/Heading";

interface ICardProps {
  href: string;
  title?: string | ReactNode;
  middle?: string | ReactNode;
  body?: string | ReactNode;
}

export const Card: FC<ICardProps> = ({ href, title, middle, body, children, ...props }) => {
  const bg = useColorModeValue(`#FFFFFF`, `#1A202C`);
  const bgHover = useColorModeValue(`#DDDDDD`, `#1E2430`);
  const colorHover = useColorModeValue(`gray.500`, `gray.400`);

  const arrayChildren = children ? Children.toArray(children) : [];

  let cardTitle = title;
  let cardMiddle = middle;
  let cardBody = body;
  switch (arrayChildren.length) {
    case 3:
      [cardTitle, cardMiddle, cardBody] = arrayChildren;
      break;
    case 2:
      [cardMiddle, cardBody] = arrayChildren;
      break;
    case 1:
      [cardBody] = arrayChildren;
      break;
    case 0:
      if (!title || !middle || !body) {
        console.error({ title, middle, body });
        throw new Error(`Null values provided`);
      }
      break;
    default:
      console.error({ children });
      throw new Error(`Invalid number of children`);
  }

  const focusingStyles = {
    background: bgHover,
    color: colorHover,
  };

  return (
    <LinkBox
      pl="5"
      pr="5"
      pt="1"
      pb="3"
      mb="5"
      borderWidth="1px"
      rounded="md"
      background={bg}
      _hover={focusingStyles}
      _focusWithin={focusingStyles}
      {...props}
    >
      <Heading.h3 fontFamily="body" color="inherit">
        <LinkOverlay as={Link} href={href}>
          {cardTitle}
        </LinkOverlay>
      </Heading.h3>
      {cardMiddle}
      <Text>{cardBody}</Text>
    </LinkBox>
  );
};

export default Card;

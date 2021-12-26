import React from "react";
import { chakra, Icon, Link as ChakraLink, Text } from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";
import {
  BsArrowDownSquare as ArrowDownSquare,
  BsArrowUpRightSquare as ArrowUpRightSquare,
} from "react-icons/bs";
import { urlsAreOnSameOrigin } from "src/utils/url";

// TODO: handle title
export type ILinkProps = {
  href: string;
  title?: string;
  children?: string;
};

// TODO: decide how to handle href-less links
const Link = ({ href, children, ...props }: ILinkProps) => {
  // lifted off of gatsby-plugin-catch-links
  const destination = document.createElement(`a`);
  destination.href = href;
  const origin = document.createElement(`a`);
  origin.href = window.location.href;
  const sameOrigin = urlsAreOnSameOrigin(origin, destination);

  const file = /\.[0-9a-z]+$/i.test(href);
  const relative = sameOrigin && !file;

  const LinkComponent = relative ? GatsbyLink : chakra.a;
  // TODO: potentially have an icon for every type of link
  // and have aria text for the icon for accessibility purposes
  const VisualIcon = sameOrigin && file ? ArrowDownSquare : ArrowUpRightSquare;

  return (
    <ChakraLink
      as={LinkComponent}
      to={relative ? href : undefined}
      href={!relative ? href : undefined}
      target={!relative ? `_blank` : undefined}
      rel={!relative ? `noreferrer noopener` : undefined}
      {...props}
    >
      {children}
      {` `}
      <Text as="sup" color="inherit">
        {` `}
        {!relative && <Icon as={VisualIcon} boxSize="0.9rem" />}
      </Text>
    </ChakraLink>
  );
};

export default Link;

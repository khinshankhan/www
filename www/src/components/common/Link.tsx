import React from "react";
import { chakra, Icon, Link as ChakraLink, Text } from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";
import {
  BsArrowDownSquare as ArrowDownSquare,
  BsArrowUpRightSquare as ArrowUpRightSquare,
} from "react-icons/bs";
import * as url from "src/utils/url";

// TODO: handle title
export type ILinkProps = {
  href: string;
  isFile?: boolean;
  title?: string;
  // HACK: this is just a lazy fix
  // these types should be discerned properly later
  children?: any;
  [key: string]: any;
};

// TODO: decide how to handle href-less links
const Link = ({ href, isFile = false, children, ...props }: ILinkProps) => {
  const sameOrigin = url.onSameOrigin(href, window.location.href);
  const file = isFile || url.isUrlFile(href);
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
      {!relative && (
        <Text as="sup" color="inherit">
          {` `}
          <Icon as={VisualIcon} boxSize="0.9rem" />
        </Text>
      )}
    </ChakraLink>
  );
};

export default Link;

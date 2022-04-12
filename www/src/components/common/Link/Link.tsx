import React from "react";
import { Icon, Text } from "@chakra-ui/react";
import {
  BsArrowDownSquare as ArrowDownSquare,
  BsArrowUpRightSquare as ArrowUpRightSquare,
} from "react-icons/bs";
import * as url from "src/utils/url";
import ExternalLink from "./ExternalLink";
import InternalLink from "./InternalLink";

// TODO: handle title
export type ILinkProps = {
  href: string;
  isFile?: boolean | undefined;
  title?: string;
  // HACK: this is just a lazy fix
  // these types should be discerned properly later
  children?: any;
  [key: string]: any;
};

// TODO: decide how to handle href-less links
export const Link = ({ href, isFile = undefined, children, ...props }: ILinkProps) => {
  const sameOrigin = url.onSameOrigin(href, window.location.href);
  const file = isFile ?? url.isUrlFile(href);
  const relative = sameOrigin && !file;

  const LinkComponent = relative ? InternalLink : ExternalLink;
  // TODO: potentially have an icon for every type of link
  // and have aria text for the icon for accessibility purposes
  const VisualIcon = sameOrigin && file ? ArrowDownSquare : ArrowUpRightSquare;

  const linkProps = {
    href,
    ...(!relative && { target: `_blank`, rel: `noreferrer noopener` }),
  };
  return (
    <>
      <LinkComponent {...linkProps} {...props}>
        {children}
      </LinkComponent>
      {!relative && (
        <Text as="sup" color="inherit" textDecoration="none">
          {` `}
          <Icon as={VisualIcon} boxSize="0.9rem" />
        </Text>
      )}
    </>
  );
};

export default Link;

import React from "react";
import { Icon, Text } from "@chakra-ui/react";
import {
  BsArrowDownSquare as ArrowDownSquare,
  BsArrowUpRightSquare as ArrowUpRightSquare,
} from "react-icons/bs";
import * as url from "src/utils/url";
import ExternalLink from "./ExternalLink";
import InternalLink from "./InternalLink";

export type ILinkProps = {
  href: string;
  isFile?: boolean | undefined;
  // TODO: handle title
  title?: string;
  children?: any;
  // HACK: this is just a lazy fix
  // these types should be discerned properly later
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
  const VisualIcon = file ? ArrowDownSquare : ArrowUpRightSquare;

  // TODO: probably a better way to cleanly do this
  // apply props only if they match the link type
  // since these aren't legitimate props on a DOM element
  const {
    isActive = false,
    allowActiveStyle = true,
    activeStyle = null,
    matchFullPath = true,
    matchExcludeParams = false,
    ...generalLinkProps
  } = props;
  const linkProps = {
    ...(relative && {
      isActive,
      allowActiveStyle,
      activeStyle,
      matchFullPath,
      matchExcludeParams,
    }),
  };

  return (
    <>
      <LinkComponent
        href={href}
        target={!relative ? `_blank` : undefined}
        rel={!relative ? `noreferrer noopener` : undefined}
        variant={sameOrigin ? `internal` : `external`}
        {...generalLinkProps}
        {...linkProps}
      >
        {children}
      </LinkComponent>
      {!relative && (
        <Text as="sup" color={sameOrigin ? `internal` : `external`} textDecoration="none">
          {` `}
          <Icon as={VisualIcon} boxSize="0.9rem" />
        </Text>
      )}
    </>
  );
};

export default Link;

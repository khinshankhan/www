import React, { ReactNode } from "react";
import { Icon } from "@chakra-ui/react";
import { FaAnchor as Anchor } from "react-icons/fa";
import { Link } from "src/components/common/Link";
import { HeadingsTag } from "./Headings";

type HeadingAnchorProps = {
  href?: string;
  icon?: any;
  children: ReactNode;
  [key: string]: any;
};

export type HeadingsAnchorTag = (props: HeadingAnchorProps) => JSX.Element;

/* eslint-disable indent, prettier/prettier */
const HeadingAnchor = (HeadingTag: HeadingsTag) => ({
  children,
  href = `?anchor=true`,
  icon = Anchor,
  ...props
}: HeadingAnchorProps) => (
  <HeadingTag>
    <Link
      href={href}
      aria-label={`Create anchor link to this point in the page`}
      variant="internal"
      matchExcludeParams
      {...props}
    >
      {icon && <Icon as={icon} fontSize="inherit" h={{ base: 4, lg: 5 }} color="internal" />}
      {children}
    </Link>
  </HeadingTag>
);

export default HeadingAnchor;

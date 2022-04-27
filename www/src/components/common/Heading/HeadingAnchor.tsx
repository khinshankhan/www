import React, { ReactNode } from "react";
import { Icon } from "@chakra-ui/react";
import { FaAnchor as Anchor } from "react-icons/fa";
import { Link } from "src/components/common/Link";
import { HeadingsTag } from "./Headings";

type HeadingAnchorProps = {
  children: ReactNode;
  icon?: any;
  [key: string]: any;
};

export type HeadingsAnchorTag = (props: HeadingAnchorProps) => JSX.Element;

/* eslint-disable indent */
const HeadingAnchor =
  (HeadingTag: HeadingsTag) =>
  ({ children, icon = Anchor, ...props }: HeadingAnchorProps) =>
    (
      <HeadingTag>
        <Link href={`/`} variant="internal" {...props}>
          {icon && <Icon as={icon} fontSize="inherit" h={[4, null, null, 5]} color="internal" />}
          {children}
        </Link>
      </HeadingTag>
    );

export default HeadingAnchor;

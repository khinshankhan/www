import React, { ReactNode } from "react";
import { Icon } from "@chakra-ui/react";
import { FaAnchor as Anchor } from "react-icons/fa";
import Link from "src/components/common/Link";
import { HeadingsTag } from "./Headings";

type HeadingAnchorProps = {
  children: ReactNode;
  [key: string]: any;
};

/* eslint-disable indent */
const HeadingAnchor =
  (HeadingTag: HeadingsTag) =>
  ({ children, ...props }: HeadingAnchorProps) =>
    (
      <HeadingTag>
        <Link href={`/`} variant="internal" {...props}>
          <Icon as={Anchor} fontSize="inherit" h={[4, 5, null, 6]} color="internal" />
          {children}
        </Link>
      </HeadingTag>
    );

export default HeadingAnchor;

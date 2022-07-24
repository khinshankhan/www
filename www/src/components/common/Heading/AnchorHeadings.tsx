import React, { ReactNode } from "react";
import { Icon } from "@chakra-ui/react";
import { FaAnchor as Anchor } from "react-icons/fa";
import { Link } from "src/components/common/Link";
import Headings from "./Headings";
import { headingsOptions, HeadingsOptions } from "./shared";

type HeadingAnchorProps = {
  href?: string;
  icon?: any;
  children: ReactNode;
  [key: string]: any;
};

export type HeadingsAnchorTag = (props: HeadingAnchorProps) => JSX.Element;

/* eslint-disable indent, prettier/prettier */
const HeadingAnchor = (HeadingTag: HeadingsOptions) => {
  const HeadingComponent = Headings[HeadingTag];

  return ({ children, href = `?anchor=true`, icon = Anchor, ...props }: HeadingAnchorProps) => (
    <HeadingComponent>
      <Link
        href={href}
        aria-label={`Create anchor link to this point in the page`}
        matchExcludeParams
        {...props}
      >
        {icon && (
          <Icon
            as={icon}
            fontSize="inherit"
            h={{ base: 4, lg: 5, xl: 6 }}
            color="internalDecoration"
            sx={{
              "*:focus > &": {
                color: `internal`,
              },
              "*:hover > &": {
                color: `internal`,
              },
            }}
          />
        )}
        {children}
      </Link>
    </HeadingComponent>
  );
};

export const AnchorHeadings = headingsOptions.reduce(
  (stored, curr) => ({
    ...stored,
    [curr]: HeadingAnchor(curr),
  }),
  {} as Record<HeadingsOptions, HeadingsAnchorTag>
);

export default AnchorHeadings;

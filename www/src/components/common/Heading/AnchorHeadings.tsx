import React, { ReactNode } from "react";
import { IconProps, Icon } from "@chakra-ui/react";
import { FaAnchor as Anchor } from "react-icons/fa";
import { Link, ILinkProps } from "src/components/common/Link";
import Headings from "./Headings";
import type { HeadingProps, HeadingsOptions } from "./shared";
import { headingsOptions } from "./shared";

interface IHeadingAnchorProps extends HeadingProps {
  href?: string;
  linkProps?: ILinkProps;
  icon?: any;
  iconProps?: IconProps;
  children: ReactNode;
}

export type HeadingsAnchorTag = (props: IHeadingAnchorProps) => JSX.Element;

/* eslint-disable indent, prettier/prettier */
const HeadingAnchor = (HeadingTag: HeadingsOptions) => {
  const HeadingComponent = Headings[HeadingTag];

  return ({ children, href = `?anchor=true`, icon = Anchor, ...props }: IHeadingAnchorProps) => (
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

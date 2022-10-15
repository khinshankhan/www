import React, { ReactNode } from "react";
import { IconProps, Icon } from "@chakra-ui/react";
import { FaAnchor as AnchorIcon } from "react-icons/fa";
import { Link, ILinkProps } from "src/components/common/Link";
import Headings from "./Headings";
import type { HeadingProps, HeadingsOptions } from "./shared";
import { headingsOptions } from "./shared";

export interface IHeadingAnchorProps extends HeadingProps {
  href?: string;
  linkProps?: ILinkProps;
  iconBefore?: boolean;
  icon?: any;
  iconProps?: IconProps;
  children: ReactNode;
}

export type HeadingsAnchorTag = (props: IHeadingAnchorProps) => JSX.Element;

/* eslint-disable indent, prettier/prettier */
const HeadingAnchor = (HeadingTag: HeadingsOptions) => {
  const HeadingComponent = Headings[HeadingTag];

  return ({
    children,
    href = `?anchor=true`,
    iconBefore = false,
    icon = AnchorIcon,
    linkProps,
    ...props
  }: IHeadingAnchorProps) => {
    const Anchor = icon && (
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
    );

    return (
      <HeadingComponent {...props}>
        <Link
          href={href}
          aria-label={`Create anchor link to this point in the page`}
          matchExcludeParams
          {...linkProps}
        >
          {iconBefore && Anchor}
          {children}
          {!iconBefore && Anchor}
        </Link>
      </HeadingComponent>
    );
  };
};

export const AnchorHeadings = headingsOptions.reduce(
  (stored, curr) => ({
    ...stored,
    [curr]: HeadingAnchor(curr),
  }),
  {} as Record<HeadingsOptions, HeadingsAnchorTag>
);

export default AnchorHeadings;

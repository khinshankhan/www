import React, { FC } from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { GatsbyLinkProps, Link as GatsbyLink } from "gatsby";
import LinkStyles from "src/theme/components/link";
import { matchLink } from "src/utils/url";

type FixedGatsbyLinkProps = Omit<GatsbyLinkProps<{}>, "ref" | "to">;

export interface IInternalLinkProps extends Omit<FixedGatsbyLinkProps, "activeStyle"> {
  href: string;

  isActive?: boolean;
  allowActiveStyle?: boolean;
  activeStyle?: FixedGatsbyLinkProps["activeStyle"] | null;

  matchFullPath?: boolean;
  matchExcludeParams?: boolean;

  children?: any;
  [key: string]: any;
}

export const InternalLink: FC<IInternalLinkProps> = ({
  href,
  isActive = false,
  allowActiveStyle = true,
  activeStyle = null,
  matchFullPath = true,
  matchExcludeParams = false,
  ...props
}) => {
  const activateStyles =
    isActive ||
    (allowActiveStyle &&
      matchLink({
        link1: href,
        link2: window.location.href,
        fullPath: matchFullPath,
        excludeParams: matchExcludeParams,
      }));
  const activeStyles = activateStyles && (activeStyle ?? LinkStyles.variants.internal._active);
  return <ChakraLink as={GatsbyLink} to={href} variant="internal" {...activeStyles} {...props} />;
};

export default InternalLink;

import type { FCC } from "types/react";
import React from "react";
import type { LinkProps } from "next/link";
import { default as NextLink } from "next/link";
import clsx from "clsx";
import { Icon } from "lib/theme/components";
import { ArrowTopRightIcon, DownloadIcon } from "@radix-ui/react-icons";
import * as url from "lib/utils/url";

interface ILinkProps extends LinkProps {
  isInternal?: boolean | undefined;
  isExternal?: boolean | undefined;
  isFile?: boolean | undefined;
  className?: string;
}

export const Link: FCC<ILinkProps> = ({
  href,
  isInternal: isInternalProp = undefined,
  isExternal: isExternalProp = undefined,
  isFile: isFileProp = undefined,
  className = "",
  children,
  ...props
}) => {
  const isExternal =
    (isInternalProp && !isInternalProp) ?? isExternalProp ?? !url.isRelative(href.toString());
  const isFile = isFileProp ?? url.isUrlFile(href.toString());
  const relative = !isExternal && !isFile;

  const VisualIcon = (
    <Icon className={clsx("link-icon", isFile ? "small-bottom" : "sup")}>
      {isFile ? <DownloadIcon /> : <ArrowTopRightIcon />}
    </Icon>
  );

  if (!isExternal) {
    return (
      <NextLink href={href} passHref legacyBehavior {...props}>
        <a href={href.toString()} download={isFile} className={className} {...props}>
          {children}
          {!relative && VisualIcon}
        </a>
      </NextLink>
    );
  }
  return (
    <a
      href={href.toString()}
      target="_blank"
      rel="noreferrer noopener"
      download={isFile}
      className={className}
      {...props}
    >
      {children}
      {!relative && VisualIcon}
    </a>
  );
};

export default Link;

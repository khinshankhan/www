import type { FCC } from "types/react";
import React from "react";
import type { LinkProps } from "next/link";
import { default as NextLink } from "next/link";
import clsx from "clsx";
import { Icon } from "lib/theme/components";
import { ExternalLinkIcon, DownloadIcon } from "@radix-ui/react-icons";
import * as url from "lib/utils/url";

interface ILinkProps extends LinkProps {
  isInternal?: boolean | undefined;
  isExternal?: boolean | undefined;
  isFile?: boolean | undefined;
}

export const Link: FCC<ILinkProps> = ({
  isInternal: isInternalProp = undefined,
  isExternal: isExternalProp = undefined,
  isFile: isFileProp = undefined,
  href,
  children,
  ...props
}) => {
  const isExternal =
    (isInternalProp && !isInternalProp) ?? isExternalProp ?? !url.isRelative(href.toString());
  const isFile = isFileProp ?? url.isUrlFile(href.toString());
  const relative = !isExternal && !isFile;

  const VisualIcon = (
    <Icon className={clsx("link-icon", isFile ? "small-bottom" : "sup")}>
      {isFile ? <DownloadIcon /> : <ExternalLinkIcon />}
    </Icon>
  );

  if (!isExternal) {
    return (
      <NextLink href={href} download={isFile} {...props}>
        {children}
        {!relative && VisualIcon}
      </NextLink>
    );
  }
  return (
    <a
      href={href.toString()}
      target="_blank"
      rel="noreferrer noopener"
      download={isFile}
      {...props}
    >
      {children}
      {!relative && VisualIcon}
    </a>
  );
};

export default Link;

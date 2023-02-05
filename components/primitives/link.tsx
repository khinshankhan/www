import type { FCC } from "types/react";
import React from "react";
import type { LinkProps } from "next/link";
import { default as NextLink } from "next/link";
import clsx from "clsx";
import { Icon } from "./icon";
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

  const aProps = {
    className: className,
    download: isFile,
    ...(isExternal && {
      target: "_blank",
      rel: "noreferrer noopener",
    }),
  };

  if (!isExternal) {
    return (
      <NextLink href={href} passHref legacyBehavior {...props}>
        <a {...aProps}>
          {children}
          {!relative && VisualIcon}
        </a>
      </NextLink>
    );
  }
  return (
    <a href={href.toString()} {...aProps} {...props}>
      {children}
      {!relative && VisualIcon}
    </a>
  );
};

export default Link;

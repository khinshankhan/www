import React, { FC, useState } from "react";
import { IconButtonProps, IconButton } from "@chakra-ui/react";
import * as url from "src/utils/url";

interface ISocialMediaIconProps extends IconButtonProps {
  href: string;
}

export const SocialMediaIcon: FC<ISocialMediaIconProps> = ({ href, ...props }) => {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const sameOrigin = url.onSameOrigin(href, window.location.href);
  const file = url.isUrlFile(href);
  const relative = sameOrigin && !file;

  const linkProps = relative && {
    target: `_blank`,
    rel: `noreferrer noopener`,
  };

  const focusing = focused || hovered;
  const focusingProps = focusing && {
    bg: `rgba(0, 0, 0, 0.12)`,
    color: relative ? `internal` : `external`,
  };

  return (
    <IconButton
      as="a"
      href={href}
      color="bgContrast"
      onMouseEnter={() => setFocused(true)}
      onMouseLeave={() => setFocused(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      {...linkProps}
      {...focusingProps}
      {...props}
    />
  );
};

export default SocialMediaIcon;

import React, { FC } from "react";
import { ButtonGroupProps, IconButtonProps, ButtonGroup, IconButton } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaDiscord, FaRss } from "react-icons/fa";
import * as url from "src/utils/url";

interface ISocialMediaIconProps extends IconButtonProps {
  href: string;
}

const SocialMediaIcon: FC<ISocialMediaIconProps> = ({ href, ...props }) => {
  const sameOrigin = url.onSameOrigin(href, window.location.href);
  const file = url.isUrlFile(href);
  const relative = sameOrigin && !file;

  const linkProps = relative && {
    target: `_blank`,
    rel: `noreferrer noopener`,
  };

  return (
    <IconButton
      as="a"
      href={href}
      _hover={{ bg: `rgba(0, 0, 0, 0.12)`, color: relative ? `internal` : `external` }}
      {...linkProps}
      {...props}
    />
  );
};

// TODO: get back to this after more of site is complete
// add in more accessibility?
// change for more obvious focus colors
// source icons from config?
// replace rss link with local path
// replace discord link with discord server link
const SocialMediaLinks = ({ _hover, ...props }: ButtonGroupProps) => (
  <ButtonGroup variant="ghost" colorScheme="bgContrast" {...props}>
    <SocialMediaIcon
      href="https://github.com/khinshankhan"
      aria-label="GitHub"
      icon={<FaGithub fontSize="20px" />}
    />
    <SocialMediaIcon
      href="https://linkedin.com/in/khinshankhan"
      aria-label="LinkedIn"
      icon={<FaLinkedin fontSize="20px" />}
    />
    <SocialMediaIcon
      as="a"
      href="/soon"
      aria-label="Discord"
      icon={<FaDiscord fontSize="20px" />}
    />
    <SocialMediaIcon href="/soon" aria-label="Rss" icon={<FaRss fontSize="20px" />} />
  </ButtonGroup>
);

export default SocialMediaLinks;

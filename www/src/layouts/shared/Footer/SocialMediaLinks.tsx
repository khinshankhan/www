import * as React from "react";
import { ButtonGroup, ButtonGroupProps, IconButton } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaDiscord, FaRss } from "react-icons/fa";

// TODO: get back to this after more of site is complete
// add in more accessibility?
// change for more obvious focus colors
// source icons from config?
// replace rss link with local path
// replace discord link with discord server link
const SocialMediaLinks = (props: ButtonGroupProps) => (
  <ButtonGroup variant="ghost" color="gray.600" {...props}>
    <IconButton
      as="a"
      href="https://github.com/kkhan01"
      target="_blank"
      rel="noreferrer noopener"
      aria-label="GitHub"
      icon={<FaGithub fontSize="20px" />}
    />
    <IconButton
      as="a"
      href="https://linkedin.com/in/khinshankhan"
      target="_blank"
      rel="noreferrer noopener"
      aria-label="LinkedIn"
      icon={<FaLinkedin fontSize="20px" />}
    />
    <IconButton
      as="a"
      href="https://discordapp.com/users/356260437567995914/"
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Discord"
      icon={<FaDiscord fontSize="20px" />}
    />
    <IconButton
      as="a"
      href="https://khinshankhan.com/feed.xml"
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Rss"
      icon={<FaRss fontSize="20px" />}
    />
  </ButtonGroup>
);

export default SocialMediaLinks;

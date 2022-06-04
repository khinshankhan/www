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
  <ButtonGroup variant="ghost" colorScheme="bgContrast" {...props}>
    <IconButton
      as="a"
      href="https://github.com/khinshankhan"
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
    <IconButton as="a" href="/soon" aria-label="Discord" icon={<FaDiscord fontSize="20px" />} />
    <IconButton as="a" href="/soon" aria-label="Rss" icon={<FaRss fontSize="20px" />} />
  </ButtonGroup>
);

export default SocialMediaLinks;

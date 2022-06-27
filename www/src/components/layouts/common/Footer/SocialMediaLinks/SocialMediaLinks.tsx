import React, { FC } from "react";
import { ButtonGroupProps, ButtonGroup } from "@chakra-ui/react";
import { SocialsObject } from "src/data/useFooterData";
import SocialMediaIcon from "./SocialMediaIcon";
import SocialsLookup from "./SocialsLookup";

interface ISocialMediaLinksProps extends ButtonGroupProps {
  socials: SocialsObject[];
}

// TODO: get back to this after more of site is complete
// replace rss link with local path
// replace discord link with discord server link
const SocialMediaLinks: FC<ISocialMediaLinksProps> = ({ socials, _hover, ...props }) => (
  <ButtonGroup variant="ghost" colorScheme="bgContrast" {...props}>
    {socials.map(({ socialType, link }) => {
      const socialInfo = SocialsLookup[socialType];
      const { aria, icon: SocialIcon, fontSize, href: createLink } = socialInfo;
      // not the cleanest but '' = eliminate, '!' = 404
      if (link == null) return null;
      const href = link === `!` ? `/404` : createLink(link);

      return (
        <SocialMediaIcon
          key={socialType + href}
          href={href}
          aria-label={aria}
          icon={<SocialIcon fontSize={fontSize ?? `20px`} />}
        />
      );
    })}
  </ButtonGroup>
);

export default SocialMediaLinks;

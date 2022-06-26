import React, { FC } from "react";
import { ButtonGroupProps, ButtonGroup } from "@chakra-ui/react";
import { Socials, SocialsList } from "src/data/useFooterData";
import SocialMediaIcon from "./SocialMediaIcon";
import SocialsLookup from "./SocialsLookup";

type CleanedSocial = { socialType: Socials; link: string };

interface ISocialMediaLinksProps extends ButtonGroupProps {
  socials: SocialsList;
}

// TODO: get back to this after more of site is complete
// add in more accessibility?
// change for more obvious focus colors
// source icons from config?
// replace rss link with local path
// replace discord link with discord server link
const SocialMediaLinks: FC<ISocialMediaLinksProps> = ({ socials, _hover, ...props }) => {
  const cleanedSocials = socials.reduce((stored, social) => {
    // typescript is being weird here, it recognize [string, string | null][]
    // item type in filter but coerces to any for activeSocial's, so we'll just
    // enforce the type
    const activeSocial = Object.entries(social).filter(([, link]) => !!link) as [Socials, string][];

    if (activeSocial.length === 0) return stored;
    return [
      ...stored,
      {
        socialType: activeSocial[0][0],
        link: activeSocial[0][1],
      },
    ];
  }, [] as CleanedSocial[]);

  return (
    <ButtonGroup variant="ghost" colorScheme="bgContrast" {...props}>
      {cleanedSocials.map(({ socialType, link }) => {
        const socialInfo = SocialsLookup[socialType];
        const { aria, icon: SocialIcon, fontSize, href: createLink } = socialInfo;
        // not the cleanest but '' = eliminate, '!' = 404
        const href = link === `!` ? `/404` : createLink(link);

        return (
          <SocialMediaIcon
            href={href}
            aria-label={aria}
            icon={<SocialIcon fontSize={fontSize ?? `20px`} />}
          />
        );
      })}
    </ButtonGroup>
  );
};

export default SocialMediaLinks;

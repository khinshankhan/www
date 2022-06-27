import { IconType } from "react-icons";
import { FaGithub, FaLinkedin, FaDiscord, FaRss } from "react-icons/fa";
import { Socials } from "src/data/useFooterData";

type SocialsLookupType = {
  [key in Socials]: {
    aria: string;
    icon: IconType;
    // NOTE: most icons will just work with 20px
    fontSize?: string;
    href: (info: string) => string;
  };
};

const SocialsLookup: SocialsLookupType = {
  discord: {
    aria: `Open Discord`,
    icon: FaDiscord,
    // TODO: figure this out
    href: () => ``,
  },
  github: {
    aria: `Open Github`,
    icon: FaGithub,
    href: (username: string) => `https://github.com/${username}`,
  },
  linkedin: {
    aria: `Open LinkedIn`,
    icon: FaLinkedin,
    href: (username: string) => `https://linkedin.com/in/${username}`,
  },
  rss: {
    aria: `Navigate to RSS Feed`,
    icon: FaRss,
    // TODO: figure this out
    href: (url: string) => url,
  },
};

export default SocialsLookup;

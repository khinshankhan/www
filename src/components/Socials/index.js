import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import * as Icons from "./Icons";

const Index = ({ theme }) => {
  const { site } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          socials {
            github
            linkedin
            discord
            rssfeed
          }
        }
      }
    }
  `);

  const socials = site.siteMetadata.socials;
  const SocialIcons = Object.keys(socials).map((social) => {
    const Icon = Icons[social];
    return <Icon link={socials[social]} key={social} />;
  });

  return <>{SocialIcons}</>;
};

export default Index;

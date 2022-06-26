import { graphql, useStaticQuery } from "gatsby";

export type Socials = "discord" | "github" | "linkedin" | "rss";
export type SocialsObject = {
  [key in Socials]: string | null;
};
export type SocialsList = SocialsObject[];

type Props = {
  dataConfig: {
    meta: {
      fullname: string;
      startYear: number;
    };
    navs: {
      footer: {
        socials: SocialsList;
      };
    };
  };
};

const useFooterData = () => {
  const data = useStaticQuery<Props>(graphql`
    query {
      dataConfig {
        meta {
          fullname
          startYear
        }
        navs {
          footer {
            socials {
              github
              linkedin
              rss
              discord
            }
          }
        }
      }
    }
  `);

  return data.dataConfig;
};

export default useFooterData;

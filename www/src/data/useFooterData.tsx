import { graphql, useStaticQuery } from "gatsby";

export type Socials = "discord" | "github" | "linkedin" | "rss";
export type SocialsObject = {
  link: string | null;
  socialType: Socials;
};

type Props = {
  dataConfig: {
    meta: {
      fullname: string;
      startYear: number;
    };
    navs: {
      footer: {
        socials: SocialsObject[];
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
              link
              socialType
            }
          }
        }
      }
    }
  `);

  return data.dataConfig;
};

export default useFooterData;

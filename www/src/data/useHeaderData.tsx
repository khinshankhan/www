import { graphql, useStaticQuery } from "gatsby";

export type PagesObject = {
  label: string;
  href: string;
};

type Props = {
  dataConfig: {
    navs: {
      header: {
        pages: PagesObject[];
      };
    };
  };
};

const useHeaderData = () => {
  const data = useStaticQuery<Props>(graphql`
    query {
      dataConfig {
        navs {
          header {
            pages {
              href
              label
            }
          }
        }
      }
    }
  `);

  return data.dataConfig;
};

export default useHeaderData;

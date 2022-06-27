import { graphql, useStaticQuery } from "gatsby";

type Props = {
  dataConfig: {
    pages: {
      index: {
        taglines: string[];
        roles: string;
      };
    };
  };
};

const useIndexData = () => {
  const data = useStaticQuery<Props>(graphql`
    query {
      dataConfig {
        pages {
          index {
            taglines
            roles
          }
        }
      }
    }
  `);

  return data.dataConfig.pages.index;
};

export default useIndexData;

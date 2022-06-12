import { graphql, useStaticQuery } from "gatsby";

type Props = {
  dataConfig: {
    pages: {
      home: {
        taglines: string[];
        roles: string;
      };
    };
  };
};

const useHomeData = () => {
  const data = useStaticQuery<Props>(graphql`
    query {
      dataConfig {
        pages {
          home {
            taglines
            roles
          }
        }
      }
    }
  `);

  return data.dataConfig.pages.home;
};

export default useHomeData;

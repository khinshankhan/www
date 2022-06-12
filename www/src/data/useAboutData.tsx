import { graphql, useStaticQuery } from "gatsby";

type Props = {
  dataConfig: {
    pages: {
      about: {
        taglines: string[];
        roles: string;
      };
    };
  };
};

const useAboutData = () => {
  const data = useStaticQuery<Props>(graphql`
    query {
      dataConfig {
        pages {
          about {
            taglines
          }
        }
      }
    }
  `);

  return data.dataConfig.pages.about;
};

export default useAboutData;

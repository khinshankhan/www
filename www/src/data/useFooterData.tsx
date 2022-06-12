import { graphql, useStaticQuery } from "gatsby";

type Props = {
  dataConfig: {
    meta: {
      fullname: string;
      startYear: number;
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
      }
    }
  `);

  return data.dataConfig;
};

export default useFooterData;

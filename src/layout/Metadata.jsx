import React from "react";
import { Helmet } from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";

const Metadata = () => {
  const { file } = useStaticQuery(graphql`
    {
      file(
        name: { eq: "logo" }
        ext: { eq: ".svg" }
        sourceInstanceName: { eq: "assets" }
      ) {
        publicURL
      }
    }
  `);

  return (
    <Helmet
      // Workaround for https://github.com/nfl/react-helmet/issues/315
      defer={false}
    >
      <link rel="icon" href={file.publicURL} type="image/svg+xml" sizes="any" />
    </Helmet>
  );
};

export default Metadata;

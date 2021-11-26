import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Layout from "src/layouts/Single";
import { Heading } from "@chakra-ui/react";
import WritingList from "src/components/writing/List";

const Writing = () => {
  const data = useStaticQuery(graphql`
    {
      allMdx(
        filter: { fields: { source: { eq: "writing" } } }
        sort: { fields: frontmatter___planted, order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              planted
              humanDatePlanted: planted(formatString: "MMM Do, YYYY")
            }
            slug
            excerpt(truncate: true, pruneLength: 300)
            timeToRead
            id
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <>
        <Heading as="h1" pb="5">
          Writings
        </Heading>
        <WritingList nodes={data.allMdx.edges} />
      </>
    </Layout>
  );
};

export default Writing;

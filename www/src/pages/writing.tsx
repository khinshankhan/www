import React, { FC } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import { PageProps, graphql } from "gatsby";
import { WritingCard } from "src/components/cards";
import { PageLayout as Layout } from "src/components/layouts";
import { WritingCardNode } from "src/types/queries";

interface WritingPageQuery {
  allMdx: {
    nodes: WritingCardNode[];
  };
}

const Writing: FC<PageProps<WritingPageQuery>> = ({
  data: {
    allMdx: { nodes },
  },
}) => (
  <Layout title="Writing" taglines={[`My thoughts and ideas`]}>
    <SimpleGrid
      alignContent={`center`}
      justifyItems={`center`}
      columns={{ base: 1, md: 2, "2xl": 3 }}
      spacing={10}
    >
      {nodes.map((node) => (
        <WritingCard key={node.fields.slug} node={node} />
      ))}
    </SimpleGrid>
  </Layout>
);

export default Writing;

// TODO: check if there's a way to add params to page query
// else filter non published nodes
export const query = graphql`
  {
    allMdx(
      filter: { fields: { layout: { eq: "article" } } }
      sort: { fields: frontmatter___planted, order: DESC }
    ) {
      nodes {
        fields {
          slug
          status
          subtitle
        }
        frontmatter {
          title
          planted
          tended
          tags
        }
        excerpt
      }
    }
  }
`;

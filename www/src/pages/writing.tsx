import React, { FC } from "react";
import { PageProps, graphql } from "gatsby";
import { InternalLink } from "src/components/common";
import { PageLayout as Layout } from "src/components/layouts";
import { WritingCardNode } from "src/types/queries";

interface WritingPageQuery {
  allMdx: {
    nodes: WritingCardNode[];
  };
}

const Index: FC<PageProps<WritingPageQuery>> = ({
  data: {
    allMdx: { nodes },
  },
}) => (
  <Layout title="Writing" taglines={[`My thoughts and ideas`]}>
    {nodes.map((n) => {
      const {
        fields: { slug },
        frontmatter: { title, spoiler },
      } = n;

      const subtitle = spoiler ?? `A little surprise reading 😊`;

      return (
        <div key={slug}>
          <InternalLink href={slug}>
            <p>{title}</p>
            <p style={{ marginLeft: 10 }}>{subtitle}</p>
          </InternalLink>
        </div>
      );
    })}
  </Layout>
);

export default Index;

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
        }
        frontmatter {
          title
          spoiler
          planted
          tended
          tags
        }
      }
    }
  }
`;

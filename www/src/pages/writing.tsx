import React, { FC } from "react";
import { PageProps, graphql } from "gatsby";
import { PageLayout as Layout } from "src/components/layouts";
import { MdxQuery, WritingCardNodes } from "src/types/queries";

const Index: FC<PageProps<MdxQuery<WritingCardNodes>>> = ({ data }) => (
  <Layout title="Writing" taglines={[`My thoughts and ideas`]}>
    {data.allMdx.nodes.map((n) => (
      <div key={n.id}>{n.frontmatter.title}</div>
    ))}
  </Layout>
);

export default Index;

export const query = graphql`
  {
    allMdx {
      nodes {
        frontmatter {
          title
          spoiler
        }
        id
        excerpt
      }
    }
  }
`;

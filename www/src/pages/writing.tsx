import React, { FC } from "react";
import { PageProps, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { PageLayout as Layout } from "src/components/layouts";
import { MdxQuery, WritingPageNodes } from "src/types/queries";

const Index: FC<PageProps<MdxQuery<WritingPageNodes>>> = ({
  data: {
    allMdx: { nodes },
  },
}) => (
  <Layout title="Writing" taglines={[`My thoughts and ideas`]}>
    {nodes.map((n) => {
      const {
        body,
        frontmatter: { title, spoiler },
        id,
      } = n;

      /* const { title, spoiler } = n.frontmatter; */

      const subtitle = spoiler ?? `A little surprise reading 😊`;

      return (
        <div key={id}>
          <p>{title}</p>
          <p style={{ marginLeft: 10 }}>{subtitle}</p>
          <div style={{ marginLeft: 50 }}>
            <MDXRenderer>{body}</MDXRenderer>
          </div>
        </div>
      );
    })}
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
        body
        id
      }
    }
  }
`;

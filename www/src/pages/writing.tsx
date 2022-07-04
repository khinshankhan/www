import React, { FC } from "react";
import { PageProps, graphql } from "gatsby";
import { PageLayout as Layout } from "src/components/layouts";
import { MdxQuery, WritingCardNodes } from "src/types/queries";

const Index: FC<PageProps<MdxQuery<WritingCardNodes>>> = ({
  data: {
    allMdx: { nodes },
  },
}) => (
  <Layout title="Writing" taglines={[`My thoughts and ideas`]}>
    {nodes.map((n) => {
      const { title, spoiler } = n.frontmatter;
      const subtitle = spoiler ?? `A little surprise reading 😊`;

      return (
        <div key={n.id}>
          <p>{title}</p>
          <p style={{ marginLeft: 10 }}>{subtitle}</p>
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
        id
      }
    }
  }
`;

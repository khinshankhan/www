import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { PageLayout as Layout } from "src/components/layouts";
import MdxComponents from "src/components/mdx";
import { normalizeElements, fancyFirstLetter } from "src/theme/custom/styles";

// TODO: get to more elaborate types
interface IPropsProps {
  data: any;
  pageContext: any;
  location: any;
}

// TODO: use taglines and fallback on spoiler?
// maybe make it a field
const Article = ({ data, pageContext, location }: IPropsProps) => {
  console.log({ data, pageContext, location });

  const {
    mdx: { fields, frontmatter, body },
  } = data;

  return (
    <Layout
      title={frontmatter.title}
      taglines={[fields.subtitle]}
      topProps={{
        sx: { ...normalizeElements, ...fancyFirstLetter },
      }}
    >
      <MDXProvider components={MdxComponents}>
        <MDXRenderer>{body}</MDXRenderer>
      </MDXProvider>
    </Layout>
  );
};

export default Article;

export const query = graphql`
  query Article($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      fields {
        subtitle
      }
      frontmatter {
        title
      }
      body
    }
  }
`;

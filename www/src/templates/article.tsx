import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { graphql } from "gatsby";
import { PageLayout as Layout } from "src/components/layouts";
import MdxComponents from "src/components/mdx";
import { normalizeElements, fancyFirstLetter } from "src/theme/styles/mdx";
import type { FCC } from "src/types/react";

// TODO: get to more elaborate types
interface IPropsProps {
  data: any;
  pageContext: {
    slug: string;
    parentTitle: string;
    parentSlug: string;
  };
  location: any;
}

// TODO: use taglines and fallback on spoiler?
// maybe make it a field
const Article: FCC<IPropsProps> = ({ data, pageContext, children }) => {
  const {
    mdx: { fields, frontmatter },
  } = data;

  const backInfo = {
    href: pageContext.parentSlug,
    children: pageContext.parentTitle,
  };

  return (
    <Layout
      title={frontmatter.title}
      taglines={[fields.subtitle]}
      topProps={{
        sx: { ...normalizeElements, ...fancyFirstLetter },
      }}
      backInfo={backInfo}
    >
      <MDXProvider components={MdxComponents}>{children}</MDXProvider>
    </Layout>
  );
};

export default Article;

export const query = graphql`
  query ($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      fields {
        subtitle
      }
      frontmatter {
        title
      }
    }
  }
`;

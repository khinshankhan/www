import React from "react";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { components } from "src/components/mdx";
import Layout from "src/layouts/Single";
import headings from "src/components/mdx/h";

const Prose = ({ data, pageContext, location }) => {
  console.log({ data, pageContext, location });

  const { mdx } = data;
  const { body, frontmatter } = mdx;

  return (
    <Layout>
      <headings.h1>{frontmatter.title}</headings.h1>
      <br />
      <MDXProvider components={components}>
        <MDXRenderer>{body}</MDXRenderer>
      </MDXProvider>
    </Layout>
  );
};

export default Prose;

export const query = graphql`
  query Prose($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
      }
      body
    }
  }
`;

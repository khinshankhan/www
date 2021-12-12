import React from "react";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { components } from "src/components/mdx";
import Layout from "src/layouts/Single";
import Heading from "src/components/common/Heading";
import { chakra } from "@chakra-ui/react";
import GlobalStyles from "src/styles/global";

// TODO: get to more elaborate types
interface IPropsProps {
  data: any;
  pageContext: any;
  location: any;
}

const Prose = ({ data, pageContext, location }: IPropsProps) => {
  console.log({ data, pageContext, location });

  const { mdx } = data;
  const { body, frontmatter } = mdx;

  return (
    <Layout>
      <Heading.h1>{frontmatter.title}</Heading.h1>
      <br />
      <chakra.div __css={GlobalStyles}>
        <MDXProvider components={components}>
          <MDXRenderer>{body}</MDXRenderer>
        </MDXProvider>
      </chakra.div>
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

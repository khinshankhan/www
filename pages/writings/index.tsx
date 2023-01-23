import type { NextPage, InferGetStaticPropsType } from "next";
import React from "react";
import { PageLayout as Layout } from "components/layout";
import { listedWritings } from "lib/contentlayer";
import ArticleList from "components/lists/Article";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Writing: NextPage<Props> = ({ articles }) => (
  <Layout title="Writings" subtitle="my thoughts and ideas">
    <ArticleList articles={articles} />
  </Layout>
);

export const getStaticProps = async () => {
  const articles = listedWritings.map((article) => {
    return {
      title: article.title,
      subtitle: article.subtitle.code,
      slug: article.slug,
      tags: article.computed.tags as string[],
    };
  });

  return { props: { articles } };
};

export default Writing;

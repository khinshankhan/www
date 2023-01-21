import type { NextPage, InferGetStaticPropsType } from "next";
import React from "react";
import { PageLayout as Layout } from "components/layout";
import { allPages } from "contentlayer/generated";
import ArticleList from "components/lists/Article";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Writing: NextPage<Props> = ({ articles }) => (
  <Layout title="Writing" subtitle="my thoughts and ideas">
    <ArticleList articles={articles} />
  </Layout>
);

export const getStaticProps = async () => {
  const articles = allPages.map((article) => ({
    title: article.title,
    subtitle: article.subtitle,
    slug: article.slug,
  }));

  /*   console.log({uno: allPages[0], dos: allPages[1].body.code}) */

  return { props: { articles } };
};

export default Writing;

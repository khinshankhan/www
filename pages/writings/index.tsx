import type { NextPage, InferGetStaticPropsType } from "next";
import React from "react";
import type { Computed } from "lib/contentlayer";
import { listedWritings } from "lib/contentlayer";
import { Listing as Layout } from "components/layouts";
import type { IArticleListProps } from "components/lists";
import { ArticleList } from "components/lists";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const articles = listedWritings.map((article) => {
    const computed = article.computed as Computed;
    return {
      slug: article.slug,
      ...computed,
    } satisfies IArticleListProps as IArticleListProps;
  });

  return { props: { articles } };
};

const Writing: NextPage<Props> = ({ articles }) => {
  return (
    <Layout title="Writings" subtitle={`My thoughts and ideas <Emoji text=":blush:" />`}>
      <ArticleList articles={articles} />
    </Layout>
  );
};

export default Writing;

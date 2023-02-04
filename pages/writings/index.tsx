import type { NextPage, InferGetStaticPropsType } from "next";
import React from "react";
import type { Computed } from "lib/contentlayer";
import { listedWritings } from "lib/contentlayer";
import { Listing as Layout } from "components/layouts";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const articles = listedWritings.map((article) => {
    return article.computed as Computed;
  });

  return { props: { articles } };
};

const Writing: NextPage<Props> = ({ articles }) => {
  console.log({ articles });
  return (
    <Layout title="Writings" subtitle="My thoughts and ideas">
      {JSON.stringify(articles)}
    </Layout>
  );
};

export default Writing;

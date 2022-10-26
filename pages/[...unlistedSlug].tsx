import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { Unlisted } from "contentlayer/generated";
import { allUnlisteds } from "contentlayer/generated";

export const getStaticPaths = () => {
  const paths = allUnlisteds.map((p) => ({
    params: { unlistedSlug: p.slug!.split(`/`) },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  article: Unlisted;
}> = async ({ params }) => {
  const slug = (params?.unlistedSlug as string[])!.join(`/`);
  const article = allUnlisteds.find((doc) => doc!.slug === slug);

  if (!article) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      article,
    },
  };
};

export default function ArticlePage({ article }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <h1>{article.title}</h1>;
}

import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { Listed } from "contentlayer/generated";
import { allListedWritings } from "lib/contentlayer";

export const getStaticPaths = () => {
  const paths = allListedWritings.map((p) => ({
    params: { slug: p.slug!.split(`/`) },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  article: Listed;
}> = async ({ params }) => {
  const slug = (params?.slug as string[])!.join(`/`);
  const article = allListedWritings.find((doc) => doc!.slug === slug);

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

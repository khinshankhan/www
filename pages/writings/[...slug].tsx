import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { Writing } from "contentlayer/generated";
import { allWritingArticles as pages } from "lib/contentlayer";
import { useLiveReload, useMDXComponent } from "next-contentlayer/hooks";
import { MdxComponents, EmojiFauxRehype } from "components/mdx";
import { default as Layout } from "templates/Article";
import type { HeadingInfo } from "components/sidebars";
import { Toc } from "components/sidebars";

const prefix = `writings`;

export const getStaticPaths = () => {
  const paths = pages.map((p) => ({
    // NOTE: remove first part of path since next will add it in based on location in pages
    params: { slug: p.slug!.split(`/`).slice(1) },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  page: Writing;
}> = async ({ params }) => {
  // unknown case
  if (!params?.slug) {
    return {
      notFound: true,
    };
  }

  let slug = !Array.isArray(params.slug) ? params.slug : params.slug.join(`/`);
  // add back prefix to match slug
  slug = `${prefix}/${slug}`;
  const page = pages.find((doc) => doc!.slug === slug);

  if (!page) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      page,
    },
  };
};

export default function PageView({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
  useLiveReload();
  const MDXContent = useMDXComponent(page?.body?.code || "");
  return (
    <Layout
      title={page.title}
      subtitle={EmojiFauxRehype(page.subtitle)}
      sidebar={<Toc headings={page.computed.headings as HeadingInfo[]} />}
    >
      {MDXContent && <MDXContent components={MdxComponents} />}
    </Layout>
  );
}

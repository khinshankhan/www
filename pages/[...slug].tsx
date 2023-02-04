import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { Computed } from "lib/contentlayer";
import type { Page } from "contentlayer/generated";
import { allPages as pages } from "contentlayer/generated";
import { useLiveReload, useMDXComponent } from "next-contentlayer/hooks";
import { Prose } from "components/layouts";

export const getStaticPaths = () => {
  const paths = pages.map((p) => ({
    params: { slug: p.slug!.split(`/`) },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  page: Page;
}> = async ({ params }) => {
  // unknown case
  if (!params?.slug) {
    return {
      notFound: true,
    };
  }

  const slug = !Array.isArray(params.slug) ? params.slug : params.slug.join(`/`);
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

  const computed = page.computed as Computed;
  return <Prose {...computed}>{MDXContent && <MDXContent components={{}} />}</Prose>;
}

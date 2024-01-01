import { getAllContentData, getContentData } from "@/lib/mdx";
import { ContentPageLayout } from "@/components/layouts/content";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Divider } from "@/components/primitives/divider";
import { getToc } from "@/lib/toc";

export async function generateStaticParams() {
  const slugsParts = getAllContentData().map((contentData) => {
    return {
      slug: contentData.slug.split("/"),
    };
  });

  return slugsParts;
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = params;
  const slugPath = slug.join("/");

  // TODO: turn this to support `"**/page*.md"` when dealing with i18n
  // eg page.es.md will be spanish
  const filePath = `${slugPath}/page.md`;
  const fullFilePath = `content/${filePath}`;

  const contentData = getContentData(filePath);
  if (!contentData) {
    notFound();
  }

  const toc = await getToc(contentData.content);

  return (
    <ContentPageLayout
      title={contentData.frontmatter.title}
      subtitle={contentData.frontmatter.subtitle}
      filePath={fullFilePath}
      toc={toc}
      showToc={
        // TODO: determine via frontmatter
        true
      }
    >
      <main className="">
        <div>Content goes here for {fullFilePath}</div>
        <Divider className="my-10" />

        <MDXRemote
          source={contentData.content}
          options={{
            mdxOptions: {
              useDynamicImport: true,
              remarkPlugins: [],
              rehypePlugins: [],
            },
          }}
        />
      </main>
    </ContentPageLayout>
  );
}

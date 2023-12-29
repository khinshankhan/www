import { getAllContentData, getContentData } from "@/lib/mdx";
import { ContentPageLayout } from "@/components/layouts/content";
import { notFound } from "next/navigation";

export const dynamicParams = false;

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

  return (
    <ContentPageLayout
      title={contentData.frontmatter.title}
      subtitle={contentData.frontmatter.subtitle}
      filePath={fullFilePath}
    >
      <main className="">
        <div>Content goes here for {fullFilePath}</div>
        <div>{contentData.content}</div>
      </main>
    </ContentPageLayout>
  );
}

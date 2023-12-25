import { ContentPageLayout } from "@/components/layouts/content";

export default async function Page() {
  return (
    <ContentPageLayout
      title="Writings"
      subtitle="My thoughts and ideas"
      filePath="app/(content)/writings/page.tsx"
    >
      <main className="">Content goes here</main>
    </ContentPageLayout>
  );
}

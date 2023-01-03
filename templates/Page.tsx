import type { FCC } from "types/react";
import React from "react";
import { PageLayout } from "components/layout";

interface IArticleProps {
  title?: string;
  subtitle?: string;
  intersect?: boolean;
}

export const Page: FCC<IArticleProps> = ({ children, ...props }) => {
  return (
    <PageLayout {...props}>
      <article id="content">{children}</article>
    </PageLayout>
  );
};

export default Page;

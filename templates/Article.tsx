import type { FCC } from "types/react";
import React from "react";
import type { IPageLayoutProps } from "components/layout";
import { PageLayout } from "components/layout";

export const Article: FCC<IPageLayoutProps> = ({ children, ...props }) => {
  return (
    <PageLayout {...props}>
      <article id="content">{children}</article>
    </PageLayout>
  );
};

export default Article;

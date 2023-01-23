import type { FCC } from "types/react";
import React from "react";
import { useMDXComponent } from "next-contentlayer/hooks";
import { SubtitleMDXComponents } from "components/mdx";
import type { IPageLayoutProps } from "components/layout";
import { PageLayout } from "components/layout";

export const Article: FCC<IPageLayoutProps> = ({ children, subtitle, ...props }) => {
  const Subtitle = useMDXComponent(subtitle as string);

  return (
    <PageLayout subtitle={<Subtitle components={SubtitleMDXComponents} />} {...props}>
      <article id="content">{children}</article>
    </PageLayout>
  );
};

export default Article;

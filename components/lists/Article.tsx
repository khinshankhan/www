import type { ElementType, FC } from "react";
import React from "react";
import type { CSS } from "@stitches/react";
import { styled } from "lib/theme";
import { Box, Link } from "components/primitives";

interface Article {
  title: string;
  subtitle: string;
  slug: string;
}

type IArticleCardProps = Article & {
  as?: ElementType;
  css?: CSS;
};

export const ArticleCard: FC<IArticleCardProps> = ({ title, subtitle, slug, ...props }) => (
  <Box {...props}>
    <h3>
      <Link isInternal isFile={false} href={slug}>
        {title}
      </Link>
    </h3>
    <h4>{subtitle}</h4>
  </Box>
);

const Li = styled("li", {
  border: "1px solid #ccc",
  borderRadius: "16px",
  padding: "12px",
  marginBottom: "20px",
});

const Ul = styled("ul", {});
export const ArticleList: FC<{ articles: Article[] }> = ({ articles }) => (
  <>
    {articles.map((article) => (
      <Ul key={article.slug}>
        <ArticleCard as={Li} {...article} />
      </Ul>
    ))}
  </>
);

export default ArticleList;

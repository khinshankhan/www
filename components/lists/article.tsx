import type { ElementType, FC } from "react";
import React from "react";
import type { Computed } from "lib/contentlayer";
import type { CSS } from "@stitches/react";
import { styled, theme, selectMedia } from "lib/theme";
import { Box, Link } from "components/primitives";
import { emojiFauxRehype } from "components/mdx";

interface IArticleCardProps extends Computed {
  as?: ElementType;
  css?: CSS;
  slug: string;
}

export const ArticleCard: FC<IArticleCardProps> = ({ slug, frontmatter, ...props }) => {
  const { title, subtitle } = frontmatter;
  const formattedSubtitle = emojiFauxRehype(subtitle, true);

  return (
    <Box className="link-box" {...props}>
      <h3>
        <Link isInternal isFile={false} href={slug} className="link-overlay">
          {title}
        </Link>
      </h3>
      <h4>{formattedSubtitle}</h4>
    </Box>
  );
};

// this styles the actual card
const Li = styled("li", {
  border: `1px solid ${theme.colors.link.toString()}`,
  borderRadius: "16px",
  padding: "12px",
  marginBottom: "20px",
  [selectMedia("at")]: {
    backgroundColor: theme.colors.ghostBg,
    border: `1px solid ${theme.colors.linkActive.toString()}`,
    boxShadow: `
rgb(255 255 255 / 20%) 0px 0px 15px,
rgb(255 255 255 / 15%) 0px 0px 3px 1px`,
  },
});

const Ul = styled("ul", {
  listStyle: "none !important",
});

export interface IArticleListProps extends Computed {
  slug: string;
}

export const ArticleList: FC<{ articles: IArticleListProps[] }> = ({ articles }) => (
  <>
    {articles.map((article) => (
      <Ul key={article.slug}>
        <ArticleCard as={Li} {...article} />
      </Ul>
    ))}
  </>
);

export default ArticleList;

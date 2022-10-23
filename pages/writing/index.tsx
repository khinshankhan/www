import { compareAsc, format, parseISO } from "date-fns";
import type { NextPage, InferGetStaticPropsType } from "next";
import { allArticles } from "contentlayer/generated";

type Props = InferGetStaticPropsType<typeof getStaticProps>;
type Article = InferGetStaticPropsType<typeof getStaticProps>["articles"][number];

const ArticleCard = (article: Article) => (
  <div>
    <h2>{article.title}</h2>

    <time dateTime={article.planted}>
      Planted date: {format(parseISO(article.planted), `MM/dd/yyyy`)}
    </time>
    <br />
    <time dateTime={article.tended}>
      Tended date: {format(parseISO(article.tended), `MM/dd/yyyy`)}
    </time>
    <br />
    <div>
      <pre>{JSON.stringify(article, null, 2)}</pre>
    </div>
  </div>
);

const Writing: NextPage<Props> = ({ articles }) => (
  <div>
    <h1>Posts:</h1>
    <div>
      {articles.map((article) => (
        <ArticleCard key={article.slug} {...article} />
      ))}
    </div>
  </div>
);

export const getStaticProps = async () => {
  let articles = allArticles
    .map((article) => ({
      title: article.title,
      subtitle: article.subtitle,
      slug: article.slug,
      // chop of tz info since it's wrong (Z)
      planted: article.planted.slice(0, -1),
      tended: article.tended.slice(0, -1),
      tags: article.tags,
      status: article.status,
    }))
    .sort(
      (a, b) =>
        compareAsc(new Date(b.planted), new Date(a.planted)) ||
        compareAsc(new Date(b.tended), new Date(a.tended)) ||
        b.title.localeCompare(a.title)
    );

  // TODO: add back in for production
  if (process.env.NODE_ENV === `production`) {
    articles = articles.filter((article) => article.status === `published`);
  }

  return { props: { articles } };
};

export default Writing;

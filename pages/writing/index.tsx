import { compareDesc, format, parseISO } from "date-fns";
import type { NextPage, InferGetStaticPropsType } from "next";
import { allArticles } from "contentlayer/generated";

type Props = InferGetStaticPropsType<typeof getStaticProps>;
type Article = InferGetStaticPropsType<typeof getStaticProps>["articles"][number];

const ArticleCard = ({ planted, tended, title }: Article) => (
  <div>
    <time dateTime={planted}>{format(parseISO(planted), `MM/dd/yyyy`)}</time>
    <br />
    <time dateTime={tended}>{format(parseISO(tended), `MM/dd/yyyy`)}</time>

    <h2>{title}</h2>
  </div>
);

const Writing: NextPage<Props> = ({ articles }) => (
  <div>
    <h1>Posts:</h1>
    <div>
      {articles.map((article) => (
        <ArticleCard key={article.title} {...article} />
      ))}
    </div>
  </div>
);

const getStaticProps = async () => {
  const articles = allArticles
    .map((article) => ({
      title: article.title,
      subtitle: article.subtitle,
      // chop of tz info since it's wrong (Z)
      planted: article.planted.slice(0, -1),
      tended: article.tended.slice(0, -1),
      tags: article.tags,
    }))
    .sort(
      (a, b) =>
        compareDesc(new Date(a.planted), new Date(b.planted)) ||
        compareDesc(new Date(a.tended), new Date(b.tended)) ||
        b.title.localeCompare(a.title)
    );

  // TODO: add back in for production
  /* if (process.env.NODE_ENV === "production") {
   *   articles.filter((article) => article.status !== `draft`);
   * }
   */

  return { props: { articles } };
};

export default Writing;

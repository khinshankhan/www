import type { Listed, Unlisted } from "contentlayer/generated";
import { allContextuals, allListeds, allUnlisteds } from "contentlayer/generated";

// all articles under listed
export const allListedWritings =
  process.env.NODE_ENV !== `production`
    ? allListeds
    : allListeds.filter((doc) => doc.status === `published`);

// contextual /projects should have listing pages for projects
// all the projects listings together form listedProjects
const listedProjects = allContextuals.filter((doc) => doc.slug?.startsWith(`/projects`));
export const allListedProjects =
  process.env.NODE_ENV !== `production`
    ? listedProjects
    : listedProjects.filter((doc) => doc.status === `published`);

export const categories = (() => {
  // documents that have an article layout but arent contextual are context-able
  // there may be future cases of contextual being context-able, but not now
  const articles = [...allListeds, ...allUnlisteds];
  const m = new Map<string, (Listed | Unlisted)[]>();

  articles.forEach((article) =>
    article.categories?.forEach((category) => {
      m.set(category, [...(m.get(category) || []), article]);
    })
  );

  return m;
})();

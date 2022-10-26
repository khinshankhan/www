import type { Listed, Unlisted } from "contentlayer/generated";
import { allContextuals, allListeds, allUnlisteds } from "contentlayer/generated";

// all articles under listed
export const allListedWritings =
  process.env.NODE_ENV !== `production`
    ? allListeds
    : allListeds.filter((doc) => doc.status === `published`);

// contextual /projects should have listing pages for projects
// all the projects listings together form listedProjects
const listedProjects = allContextuals.filter((doc) => doc.slug.startsWith(`/projects`));
export const allListedProjects =
  process.env.NODE_ENV !== `production`
    ? listedProjects
    : listedProjects.filter((doc) => doc.status === `published`);

// used mostly for back button/ breadcrumbs
type slugContext = { title: string; parentTitle: string; parentSlug: string };
export const parentLookup = (() => {
  const m = new Map<string, slugContext>([
    [`/`, { title: `Home`, parentTitle: `Home`, parentSlug: `/` }],
    [`/writing`, { title: `Writing`, parentTitle: `Home`, parentSlug: `/` }],
    [`/projects`, { title: `Projects`, parentTitle: `Home`, parentSlug: `/` }],
  ]);

  const docs = [...allContextuals, ...allListeds, ...allUnlisteds].sort((a, b) =>
    a.slug.localeCompare(b.slug as string)
  );
  docs.forEach((doc) => {
    let parentSlug = doc.slug as string;
    while (!m.has(parentSlug)) {
      parentSlug = parentSlug.split(`/`).slice(0, -1).join(`/`);
      if (parentSlug === ``) {
        parentSlug = `/`;
      }
    }

    // guranteed to find at least base case of /, so we can use null assertion
    const parent = m.get(parentSlug)!;
    m.set(doc.slug as string, {
      title: doc.title,
      parentTitle: parent.title,
      parentSlug: parent.parentSlug,
    });
  });

  return m;
})();

export const categories = (() => {
  // documents that have an article layout but arent contextual are context-able
  // there may be future cases of contextual being context-able, but not now
  const articles = [...allListeds, ...allUnlisteds];
  const m = new Map<string, (Listed | Unlisted)[]>();

  articles.forEach((article) =>
    article.categories?.forEach((category) => {
      m.set(category, [...(m.get(category) ?? []), article]);
    })
  );

  return m;
})();

import type { Writing, Project } from "contentlayer/generated";
import { allWritings, allProjects, allPages } from "contentlayer/generated";

export const allWritingArticles =
  process.env.NODE_ENV !== `production`
    ? allWritings
    : allWritings.filter((doc) => doc.status === `published`);

export const allProjectArticles =
  process.env.NODE_ENV !== `production`
    ? allProjects
    : allProjects.filter((doc) => doc.status === `published`);

export const allListedWritings = [...allWritingArticles, ...allProjectArticles];

export const categories = (() => {
  // documents that have an article layout but arent contextual are context-able
  // there may be future cases of contextual being context-able, but not now
  const docs = [...allListedWritings];
  const m = new Map<string, (Writing | Project)[]>();

  docs.forEach((doc) =>
    doc.categories?.forEach((category) => {
      m.set(category, [...(m.get(category) ?? []), doc]);
    })
  );

  return m;
})();

// used mostly for back button/ breadcrumbs
type slugContext = { title: string; parentTitle: string; parentSlug: string };
export const parentLookup = (() => {
  // base cases should be pages not created from mdx files
  const m = new Map<string, slugContext>([
    [`/`, { title: `Home`, parentTitle: `Home`, parentSlug: `/` }],
    [`/writing`, { title: `Writing`, parentTitle: `Home`, parentSlug: `/` }],
    [`/projects`, { title: `Projects`, parentTitle: `Home`, parentSlug: `/` }],
  ]);

  const docs = [...allListedWritings, ...allPages].sort((a, b) =>
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

/* TODO: this will come probably post partiy
 *
 * contextual /projects should have listing pages for projects
 * all the projects listings together form listedProjects
 * stretch: list how many articles are associated with each listed project(?)
 *   could be as simple as going through listed projects and looking at parent lookup
 */
// const projectContextuals = allContextuals.filter((doc) => doc.slug.startsWith(`/projects`));
// export const allListedProjects =
//   process.env.NODE_ENV !== `production`
//     ? projectContextuals
//     : projectContextuals.filter((doc) => doc.status === `published`);

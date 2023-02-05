import { allWritings } from "contentlayer/generated";
export * from "./fields";

const isProd = process.env.NODE_ENV === "production";

export const allWritingArticles = isProd
  ? allWritings.filter((doc) => doc.status === `published`)
  : allWritings;

// export const allProjectArticles = isProd
//   ? allProjects.filter((doc) => doc.status === `published`)
//   : allProjects;

export const listedWritings = [
  ...allWritingArticles,
  // ...allProjectArticles
];

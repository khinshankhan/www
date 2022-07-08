type Layouts = `article`;

// TODO: add to build command or dotenv
export const isProd = process.env.STAGE === `production`;

const layoutFilter = (layout: Layouts) => `layout: {eq: "${layout}"}`;
const draftFilter = (status: string) => `status: {eq: "${status}"}`;

const fieldFilters = (layout: Layouts, status: string) =>
  [layoutFilter(layout), ...(isProd ? [draftFilter(status)] : [])].join(`, `);

export const queryFilter = `{fields: {${fieldFilters(`article`, `published`)}}}`;

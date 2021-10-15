import { GatsbyNode } from "gatsby";

const replacePath = (_path: string) =>
  _path === `/` ? _path : _path.replace(/\/$/, ``);

const onCreatePage: GatsbyNode["onCreatePage"] = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  return new Promise((resolve) => {
    const oldPage = { ...page };
    page.path = replacePath(page.path);
    if (page.path !== oldPage.path) {
      deletePage(oldPage);
      createPage(page);
    }
    resolve();
  });
};

export default onCreatePage;

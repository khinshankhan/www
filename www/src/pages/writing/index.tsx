import React from "react";
import { Heading } from "src/components/common";
import Layout from "src/components/layouts/Page";
import { WritingCard } from "src/components/writing";

const WRITING_NODE1 = {
  id: `one`,
  frontmatter: {
    title: `First`,
  },
  excerpt: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae mi id diam finibus tincidunt. Cras rutrum nunc vitae porta maximus. Proin nisi dui, luctus ut urna sit amet, vulputate aliquet erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum orci non ligula mattis, nec consectetur magna malesuada. Praesent vel fringilla tellus. Sed faucibus, nisl sit amet porta viverra, ipsum orci faucibus metus, at lobortis lectus nulla quis tortor.`,
  fields: {
    slug: `/soon`,
    tags: [`first`, `post`, `r`],
  },
};

const WRITING_NODE2 = {
  id: `two`,
  frontmatter: {
    title: `Second`,
  },
  excerpt: `Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras aliquet nibh metus, eu dapibus nunc vestibulum et. Curabitur nec hendrerit dolor. Integer dictum libero a mauris hendrerit, et pellentesque diam lacinia. Integer tincidunt dignissim purus, at interdum odio porttitor a. Suspendisse blandit nisl sed est fringilla consequat. Vivamus sed blandit ligula. Vivamus aliquam venenatis enim eu lacinia. Nullam et finibus ante, vel posuere ligula. Nulla iaculis purus sed sem faucibus, tempor interdum odio malesuada. Donec felis purus, semper sit amet nunc sit amet, placerat imperdiet ante. Duis dapibus lacus tortor, vel placerat lectus bibendum blandit. Curabitur non porta orci. Duis non turpis a eros auctor semper a sit amet metus. Pellentesque auctor felis et porttitor sagittis.`,
  fields: {
    slug: `/soon`,
    tags: [`second`, `post`, `s`, `t`],
  },
};

const WRITING_NODE3 = {
  id: `three`,
  frontmatter: {
    title: `Third`,
  },
  excerpt: `Nullam at massa in erat vestibulum auctor. Ut a leo faucibus, interdum libero eu, facilisis metus. Nam imperdiet varius lectus, aliquet bibendum neque maximus egestas. Ut non cursus odio. Curabitur posuere volutpat aliquet. Vestibulum ut risus facilisis, porttitor mi sed, blandit ipsum. Nunc ullamcorper consectetur hendrerit. Pellentesque iaculis ligula nec justo vehicula, nec convallis lorem pulvinar. Nam eleifend lorem non odio auctor mattis.`,
  fields: {
    slug: `/soon`,
    tags: [`third`, `post`, `s`],
  },
};

const WRITING_NODE4 = {
  id: `four`,
  frontmatter: {
    title: `Fourth`,
  },
  excerpt: `Duis placerat justo sit amet tortor malesuada porta. Ut placerat lacus quis mauris dictum condimentum. Cras accumsan, turpis finibus placerat pellentesque, felis ex aliquam libero, quis pharetra neque risus vitae nisi. In mattis nunc at ipsum consectetur faucibus. Suspendisse condimentum pharetra augue. Vivamus luctus dolor at ante facilisis, eget egestas augue ornare. Sed viverra porttitor diam, et congue dolor maximus in. Donec id porttitor eros.`,
  fields: {
    slug: `/soon`,
    tags: [`fourth`, `post`, `s`],
  },
};

const WRITING_NODE5 = {
  id: `five`,
  frontmatter: {
    title: `Fifth`,
  },
  excerpt: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae mi id diam finibus tincidunt. Cras rutrum nunc vitae porta maximus. Proin nisi dui, luctus ut urna sit amet, vulputate aliquet erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum orci non ligula mattis, nec consectetur magna malesuada. Praesent vel fringilla tellus. Sed faucibus, nisl sit amet porta viverra, ipsum orci faucibus metus, at lobortis lectus nulla quis tortor.`,
  fields: {
    slug: `/soon`,
    tags: [`fifth`, `post`, `t`],
  },
};

const WRITING_NODES = [WRITING_NODE1, WRITING_NODE2, WRITING_NODE3, WRITING_NODE4, WRITING_NODE5];

const Index = () => (
  <Layout>
    <Heading.h1>Writing</Heading.h1>
    <>
      {WRITING_NODES.map((node) => (
        <WritingCard key={node.id} node={node} />
      ))}
    </>
  </Layout>
);

export default Index;

import React, { useState } from "react";
import Layout from "src/layouts/Single";
import { SearchInfoProvider } from "src/contexts/SearchInfo";
import headings from "src/components/mdx/headings";
import WritingList from "src/components/writing/List";
import { ListCleanedWritingNodes } from "src/queries/WritingNodes";
import Search from "src/components/Search";

const Body = () => {
  const [data] = useState(ListCleanedWritingNodes());
  const [nodes, setNodes] = useState(data);

  return (
    <SearchInfoProvider>
      <Search nodes={data} setNodes={setNodes} pb="5" />
      <WritingList nodes={nodes} />
    </SearchInfoProvider>
  );
};

const Writing = () => (
  <Layout>
    <headings.h1 pb="5">Writings</headings.h1>
    <Body />
  </Layout>
);

export default Writing;

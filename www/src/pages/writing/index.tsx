import React, { useState } from "react";
import Heading from "src/components/common/Heading";
import Search from "src/components/Search";
import WritingList from "src/components/writing/List";
import { SearchInfoProvider } from "src/contexts/SearchInfo";
import Layout from "src/layouts/Single";
import { ListCleanedWritingNodes } from "src/queries/WritingNodes";

const Body = () => {
  const [data] = useState(ListCleanedWritingNodes());
  const [nodes, setNodes] = useState(data);

  return (
    <SearchInfoProvider>
      <Search nodes={data} setNodes={setNodes} mb="5" />
      <WritingList nodes={nodes} />
    </SearchInfoProvider>
  );
};

const Writing = () => (
  <Layout>
    <Heading.h1 pb="5">Writings</Heading.h1>
    <Body />
  </Layout>
);

export default Writing;

import React, { useState } from "react";
import Layout from "src/layouts/Single";
import { Heading } from "@chakra-ui/react";
import WritingList from "src/components/writing/List";
import { ListWritingNodes } from "src/queries/WritingNodes";
import Search from "src/components/Search";

const Writing = () => {
  const data = ListWritingNodes();
  const [nodes, setNodes] = useState(data.allMdx.edges);

  return (
    <Layout>
      <>
        <Heading as="h1" pb="5">
          Writings
        </Heading>
        <Search nodes={data.allMdx.edges} setNodes={setNodes} pb="5" />
        <WritingList nodes={nodes} />
      </>
    </Layout>
  );
};

export default Writing;

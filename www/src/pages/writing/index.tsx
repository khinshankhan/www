import React from "react";
import Layout from "src/layouts/Single";
import { Heading } from "@chakra-ui/react";
import WritingList from "src/components/writing/List";
import { ListWritingNodes } from "src/queries/WritingNodes";
import Search from "src/components/Search";

const Writing = () => {
  const data = ListWritingNodes();

  return (
    <Layout>
      <>
        <Heading as="h1" pb="5">
          Writings
        </Heading>
        <Search pb="5" />
        <WritingList nodes={data.allMdx.edges} />
      </>
    </Layout>
  );
};

export default Writing;

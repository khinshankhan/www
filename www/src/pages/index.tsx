import React from "react";
import { Center } from "@chakra-ui/react";
import { Heading } from "src/components/common";
import { BaseLayout as Layout } from "src/components/layouts";

const Index = () => (
  <Layout>
    <Center as={Heading.h1} pt={`70px`}>
      Hello there!
    </Center>
  </Layout>
);

export default Index;

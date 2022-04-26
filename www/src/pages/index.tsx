import React from "react";
import { chakra, Center, Text, VStack } from "@chakra-ui/react";
import { Heading } from "src/components/common";
import Layout from "src/components/layouts/Centered";

// TODO: fetch name from site meta
const name = `Khinshan`;

const Index = () => (
  <Layout>
    <Center as={Heading.h1} align="center">
      <VStack>
        <chakra.span>Hello there 👋</chakra.span>
        <chakra.span>I'm {name}!</chakra.span>
      </VStack>
    </Center>

    <Center as={Heading.h2} align="center">
      I'm a software engineer.
    </Center>

    <Text align="center" fontSize={[`lg`, `xl`]}>
      Wasn't too sure what to put on a homepage, so I put what would interest me: this site
      currently has{` `}
      <Text display="inline-block" color="internal" fontSize="inherit">
        0
      </Text>
      {` `}
      easter eggs!
    </Text>
  </Layout>
);

export default Index;

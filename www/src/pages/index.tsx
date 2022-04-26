import React from "react";
import { chakra, Center, Text, VStack } from "@chakra-ui/react";
import { Heading } from "src/components/common";
import Layout from "src/components/layouts/Centered";

// TODO: fetch name from site meta
const Index = () => (
  <Layout>
    <Center as={Heading.h1} align="center" fontSize={[`4xl`, null, null, null, `5xl`]}>
      <VStack>
        <chakra.span>Hello hello 👋</chakra.span>
        <chakra.span>I'm Khinshan!</chakra.span>
      </VStack>
    </Center>

    <Center as={Heading.h2} align="center" fontSize={[`3xl`, null, null, null, `4xl`]}>
      I'm a software engineer.
    </Center>

    <Text align="center" fontSize={`xl`}>
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

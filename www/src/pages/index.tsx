import React from "react";
import { chakra, Center, Button, Text, VStack } from "@chakra-ui/react";
import { Heading } from "src/components/common";
import { CenteredLayout as Layout } from "src/components/layouts";
import Seo from "src/components/Seo";

// TODO: fetch name from site meta
const name = `Khinshan`;

const Index = () => (
  <Layout>
    <Seo />
    <Center as={Heading.h1} align="center">
      <VStack>
        <chakra.span>Hello there 👋</chakra.span>
        <chakra.span>I&apos;m {name}!</chakra.span>
      </VStack>
    </Center>

    <Center as={Heading.h2} align="center">
      I&apos;m a software engineer.
    </Center>

    <Text align="center" variant="dashboard">
      Wasn&apos;t too sure what to put on a homepage, so I put what would interest me: this site
      currently has
      <Button variant="ghost" color="internal" fontSize="inherit">
        0
      </Button>
      easter eggs!
    </Text>
  </Layout>
);

export default Index;

import React from "react";
import { Center, Text } from "@chakra-ui/react";
import { Heading, Link } from "src/components/common";
import { CenteredLayout as Layout } from "src/components/layouts";
import Seo from "src/components/Seo";

const Index = () => (
  <Layout>
    <Seo title="Soon" />
    <Center as={Heading.h1} align="center">
      Oops, looks like this page isn&apos;t quite ready yet!
    </Center>

    <Center as={Heading.h2} align="center">
      Coming soon&trade;, probably.
    </Center>

    <Text align="center" fontSize={{ base: `lg`, sm: `xl` }}>
      In the meantime, here&apos;s a link back to <Link href="/">home</Link> &#58;&#41;
    </Text>
  </Layout>
);

export default Index;

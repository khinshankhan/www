import React from "react";
import Layout from "src/layouts/Centered";
import { Center } from "@chakra-ui/react";
import Heading from "src/components/common/Heading";
import Link from "src/components/common/Link";

const Index = () => (
  <Layout>
    <Center as={Heading.h1} align="center">
      Whoops, page is WIP!
    </Center>
    <Center as={Heading.h2} mt="5" align="center">
      Howsa 'bout going {` `} <Link href="/home">home</Link>?
    </Center>
  </Layout>
);

export default Index;

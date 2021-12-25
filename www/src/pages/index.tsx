import React from "react";
import { Center } from "@chakra-ui/react";
import FancySpan from "src/components/common/FancySpan";
import Heading from "src/components/common/Heading";
import Layout from "src/layouts/Centered";

// TODO: make a debounce clicking easter egg
const StarterEgg = () => <FancySpan>0</FancySpan>;

const StarterEggText = () => (
  <Heading.h4 mt="20" align="center">
    Wasn't too sure what to put on a homepage, so I put what would interest me: this site has
    {` `}
    <StarterEgg />
    {` `}easter eggs!
  </Heading.h4>
);

const Index = () => (
  <Layout>
    <Center as={Heading.h1} align="center">
      Heyy, I'm Khinshan! 👋
    </Center>
    <Center as={Heading.h2} mt="5" align="center">
      I'm a software engineer.
    </Center>
    <StarterEggText />
  </Layout>
);

export default Index;

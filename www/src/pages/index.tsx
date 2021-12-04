import React from "react";
import Layout from "src/layouts/Single";
import useMobile from "src/hooks/useMobile";
import { Container, Center } from "@chakra-ui/react";
import headings from "src/components/mdx/headings";
import FancySpan from "src/components/common/FancySpan";

// TODO: make a debounce clicking easter egg
const StarterEgg = () => <FancySpan>0</FancySpan>;

const StarterEggText = () => (
  <headings.h4 mt="20" align="center">
    Wasn't too sure what to put on a homepage, so I put what would interest me:
    this site has
    {` `}
    <StarterEgg />
    {` `}easter eggs!
  </headings.h4>
);

const Index = () => {
  const mobilep = useMobile();

  const fromTop = mobilep ? `20%` : `30%`;

  return (
    <Layout>
      <Container position="absolute" top={fromTop}>
        <Center as={headings.h1} align="center">
          Heyy, I'm Khinshan! 👋
        </Center>
        <Center as={headings.h2} mt="5" align="center">
          I'm a software engineer.
        </Center>
        <StarterEggText />
      </Container>
    </Layout>
  );
};
export default Index;

import React from "react";
import { ButtonProps, chakra, Button, Container, Text, SlideFade, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Heading } from "src/components/common";
import { CenteredLayout as Layout } from "src/components/layouts";
import useIndexData from "src/data/useIndexData";

interface IEasterEggButton extends ButtonProps {
  eggCount?: number;
}

const EasterEggButton = ({ eggCount = 0, ...props }: IEasterEggButton) => (
  <Button {...props}>{eggCount}</Button>
);

const Index = () => {
  // TODO: let roles be an array and have a typewriter effect for it
  const { taglines, roles } = useIndexData();

  return (
    <Layout>
      <Container variant="page">
        <SlideFade in>
          <Heading.h1 align="center" fontFamily="title">
            <VStack>
              {taglines.map((tagline) => (
                <chakra.span key={tagline}>{tagline}</chakra.span>
              ))}
            </VStack>
          </Heading.h1>
        </SlideFade>

        <SlideFade in>
          <Heading.h2 align="center" pt={{ base: 14, xs: 16 }} pb={{ base: 8, xs: 10 }}>
            I&apos;m a {roles}.
          </Heading.h2>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
            <Text variant="dashboard" align="center">
              Wasn&apos;t too sure what to put on a homepage, so I put what would interest me: this
              site currently has
              <EasterEggButton variant="ghost" color="internal" fontSize="inherit" />
              easter eggs!
            </Text>
          </motion.div>
        </SlideFade>
      </Container>
    </Layout>
  );
};

export default Index;

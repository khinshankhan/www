import React from "react";
import { Box, Center, Grid, GridItem, Text } from "@chakra-ui/react";
import { Logo } from "src/assets";

const Index = () => (
  <Grid
    templateAreas={`"left right"`}
    gridTemplateColumns="1fr 400px"
    w="1200"
    h="630px"
    color="blackAlpha.700"
    fontWeight="bold"
    border="1px solid salmon"
  >
    <GridItem area="left" m="5">
      hello
    </GridItem>
    <GridItem bg="bgOpaque" area={`right`} zIndex="2">
      <Center mt={5}>
        <Box
          position="absolute"
          top={0}
          bottom={0}
          right={0}
          width="300px"
          background="bgOpaque"
          transform="skew(-30deg)"
          transformOrigin="top"
          zIndex="1"
        />
        <Box
          position="absolute"
          top={0}
          bottom={0}
          right={0}
          width="300px"
          background="bgOpaque"
          transform="skew(30deg)"
          transformOrigin="bottom"
          zIndex="1"
        />
        <Box bg="bgOpaque" position="absolute" zIndex="2" top={50} bottom={0} right={45}>
          <Center>
            <Logo size="100" />
          </Center>
          <Text textAlign="center" variant="dashboard" mt={15}>
            Khinshan Khan
          </Text>
          <Text textAlign="center" mt={1}>
            A dev up to good 😊
          </Text>
        </Box>
      </Center>
    </GridItem>
  </Grid>
);

export default Index;

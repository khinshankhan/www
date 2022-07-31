import React from "react";
import { Container, Grid, GridItem } from "@chakra-ui/react";

const Index = () => (
  <Container variant="page">
    <br />
    <Grid
      templateAreas={`"left right"`}
      gridTemplateColumns={`1fr 400px`}
      w="1200"
      h="630px"
      color="blackAlpha.700"
      fontWeight="bold"
      border="1px solid salmon"
    >
      <GridItem area={`left`} m="5">
        hello
      </GridItem>
      <GridItem bg="bgOpaque" area={`right`} zIndex="2">
        hello 2
      </GridItem>
    </Grid>
  </Container>
);

export default Index;

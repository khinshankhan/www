import React from "react";
import { Box, Center, Grid, GridItem, Text } from "@chakra-ui/react";
import { Logo } from "src/assets";
import { Heading } from "src/components/common";

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
    <GridItem
      area={`left`}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      m="7"
      my="10"
    >
      <Box>
        <Text display="inline">👉 </Text>
        <Text
          display="inline"
          textDecoration="underline"
          textDecorationColor="internalFocusDecoration"
        >{`https://uptogood.dev`}</Text>
      </Box>

      <Box>
        <Box w="63ch">
          <Heading.h3 color="blackAlpha.800">New Years Resolution 2022</Heading.h3>
          <Text color="spoilerText" mt={3}>
            Because last year's was so successful
          </Text>
        </Box>
      </Box>

      <Box>
        <Text>75 min read</Text>
      </Box>
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

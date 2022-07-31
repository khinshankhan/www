import React, { FC } from "react";
import { chakra, Box, Center, Grid, GridItem, Text } from "@chakra-ui/react";
import { Logo } from "src/assets";
import { Heading } from "src/components/common";
import { minToEmoji } from "src/utils/time";

export interface ICreatePreviewProps {
  title: string;
  subtitle: string;
  url: string;
  timeToRead?: number;
}

export const Preview: FC<ICreatePreviewProps> = ({ title, subtitle, url, timeToRead }) => (
  <Grid
    templateAreas={`"left right"`}
    gridTemplateColumns="1fr 400px"
    w="1200"
    h="630px"
    color="blackAlpha.700"
    fontWeight="bold"
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
        <Text display="inline" color="black">
          👉{` `}
        </Text>
        <Text
          display="inline"
          textDecoration="underline"
          textDecorationColor="internalFocusDecoration"
        >
          {url}
        </Text>
      </Box>

      <Box>
        <Box w="63ch">
          <Heading.h3 color="blackAlpha.800">{title}</Heading.h3>
          <Text color="spoilerText" mt={3}>
            {subtitle}
          </Text>
        </Box>
      </Box>

      <Box>
        <Text>
          {timeToRead != null ? (
            <chakra.span>
              <chakra.span color="black">
                {minToEmoji(timeToRead)} {` `}
              </chakra.span>
              {timeToRead} min read
            </chakra.span>
          ) : (
            <chakra.span>
              A nice read
              <chakra.span color="black">{` `} 🙃</chakra.span>
            </chakra.span>
          )}
        </Text>
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
            A dev up to [no] good <chakra.span color="black">😊</chakra.span>
          </Text>
        </Box>
      </Center>
    </GridItem>
  </Grid>
);

export default Preview;

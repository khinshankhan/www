import React, { ReactNode } from "react";
import { Flex, Grid } from "@chakra-ui/react";
import Header from "./Shared/Header";

interface IHomeLayoutProps {
  children?: ReactNode;
}

const HomeLayout = ({ children }: IHomeLayoutProps): JSX.Element => (
  <Grid gridTemplateRows="64px auto" minHeight="100vh" margin={4}>
    <Header />
    <Flex justify="center">{children}</Flex>
    <Flex as="footer" align="center" justify="center" color="gray.400">
      All Rights Reserved
    </Flex>
  </Grid>
);

export default HomeLayout;

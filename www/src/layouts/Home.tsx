import React, { ReactNode } from "react";
import { Flex, Grid } from "@chakra-ui/react";
import Header from "./Shared/Header";

interface IHomeLayoutProps {
  children?: ReactNode;
}

const HomeLayout = ({ children }: IHomeLayoutProps): JSX.Element => (
  <>
    <Grid gridTemplateRows="64px" margin={4} minHeight="90vh">
      <Header />
      <Flex justify="center">{children}</Flex>
    </Grid>
    <Flex as="footer" align="center" justify="center" color="gray.400">
      All Rights Reserved
    </Flex>
  </>
);

export default HomeLayout;

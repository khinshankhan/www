import React, { Fragment, ReactNode } from "react";
import { Flex } from "@chakra-ui/react";
import Header from "./Shared/Header";

interface IHomeLayoutProps {
  children?: ReactNode;
}

const HomeLayout = ({ children }: IHomeLayoutProps): JSX.Element => (
  <>
    <Header />
    <Fragment>{children}</Fragment>
    <Flex as="footer" align="center" justify="center" color="gray.400">
      All Rights Reserved
    </Flex>
  </>
);

export default HomeLayout;

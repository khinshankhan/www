import type { FCC } from "types/react";
import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { media, theme } from "lib/theme";
import { Flex } from "components/primitives";
import Headroom from "react-headroom";
import Header from "./header";
import Footer from "./footer";

export const BaseLayout: FCC = ({ children }) => {
  const router = useRouter();
  const contentBg = router.pathname !== "/";

  return (
    <Fragment>
      <Flex
        flexDirection="column"
        css={{
          minHeight: "96vh",
          [media("xsMax")]: {
            minHeight: "87vh",
          },
          backgroundColor: contentBg ? theme.colors.contentBg : theme.colors.bg,
        }}
      >
        <Headroom
          wrapperStyle={{
            backgroundColor: theme.colors.bg.toString(),
          }}
        >
          <Header />
        </Headroom>

        {children}
      </Flex>
      <Footer />
    </Fragment>
  );
};

export default BaseLayout;

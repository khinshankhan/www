import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import theme from "lib/theme";
import FontFace from "lib/wrappers/FontFace";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme} resetCSS portalZIndex={40}>
        <Component {...pageProps} />
      </ChakraProvider>
      <FontFace />
    </>
  );
}

export default MyApp;

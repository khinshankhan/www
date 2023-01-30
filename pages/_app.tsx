import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { ResetStyles, GlobalStyles, darkTheme } from "lib/theme";
import { BaseLayout as Layout } from "components/layouts";

export default function App({ Component, pageProps }: AppProps) {
  ResetStyles();
  GlobalStyles();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      value={{ light: "light", dark: darkTheme.className }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

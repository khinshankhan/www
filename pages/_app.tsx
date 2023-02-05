import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { ResetStyles, GlobalStyles, darkTheme } from "lib/theme";
import { TooltipProvider } from "@radix-ui/react-tooltip";
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
      <TooltipProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TooltipProvider>
    </ThemeProvider>
  );
}

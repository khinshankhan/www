import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { GlobalStyles, darkTheme } from "lib/theme";
import { TooltipProvider } from "@radix-ui/react-tooltip";

export default function App({ Component, pageProps }: AppProps) {
  GlobalStyles();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      value={{
        light: "light",
        dark: darkTheme.className,
      }}
    >
      <TooltipProvider>
        <Component {...pageProps} />
      </TooltipProvider>
    </ThemeProvider>
  );
}

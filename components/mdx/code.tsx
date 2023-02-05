import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { Flex } from "components/primitives";
import { CopyToClipboardToggle } from "components/toggles";

export const Pre = (props: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) => {
  // @ts-expect-error
  const lang: string = props["data-language"];
  // @ts-expect-error
  const theme: string = props["data-theme"];
  // @ts-expect-error
  const raw: string = props["data-raw"];
  // @ts-expect-error
  const filename: string | undefined = props["data-filename"];

  const filenameProps = {
    ...(!!filename && { "data-filename": filename }),
  };

  const Title = () =>
    filename ? (
      <div data-filename={filename} data-rehype-pretty-code-title="" data-theme={theme}>
        {filename}
      </div>
    ) : (
      <Flex
        data-rehype-pretty-code-title=""
        data-theme={theme}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <span>{lang}</span>
        <CopyToClipboardToggle text={raw} />
      </Flex>
    );

  const Subtitle = () =>
    filename ? (
      <Flex
        data-filename={filename}
        data-rehype-pretty-code-meta=""
        data-theme={theme}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <span>{lang}</span>
        <CopyToClipboardToggle text={raw} />
      </Flex>
    ) : null;

  return (
    <>
      <Title />
      <Subtitle />
      <pre {...filenameProps} data-language={lang} data-theme={theme}>
        {props.children}
      </pre>
    </>
  );
};

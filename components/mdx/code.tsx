import type { FCC } from "types/react";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import React, { Children, useState } from "react";
import clsx from "clsx";
import * as Popover from "@radix-ui/react-popover";
import { Button, Box, Flex, SimplePopover } from "components/primitives";
import { CopyToClipboardToggle } from "components/toggles";
import { existPredicate, uniquePredicate } from "lib/utils/array";

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
      <Box
        data-filename={filename}
        data-rehype-pretty-code-title=""
        data-theme={theme}
        css={{
          wordWrap: "break-word",
          overflowWrap: "break-word",
          WebkitHyphens: "auto",
          MozHyphens: "auto",
          MsHyphens: "auto",
          hyphens: "auto",
        }}
      >
        <span> {filename}</span>
      </Box>
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

export const Codex: FCC = ({ children }) => {
  const filenames = Children.toArray(children)
    .map((child) => {
      // @ts-expect-error
      const filename: string | null = child?.props?.["data-filename"] ?? null;
      return filename;
    })
    .filter(existPredicate)
    .filter(uniquePredicate);

  const [selected, setSelected] = useState(filenames[0]);
  const changeSelectedFile = (event: React.MouseEvent<HTMLButtonElement>) => {
    const filename = event.currentTarget.dataset.filename;
    if (filename) {
      setSelected(filename);
    }
  };

  const activeAttribute = `[data-filename]:not([data-filename="${selected}"])`;
  return (
    <>
      <SimplePopover
        trigger={
          <Button
            aria-label="Choose different displayed code block"
            css={{
              marginBottom: "10px",
            }}
          >
            Choose file
          </Button>
        }
      >
        <ul>
          {filenames.map((filename) => (
            <li key={filename}>
              <Button
                as={Popover.Close}
                data-filename={filename}
                onClick={changeSelectedFile}
                variant="link"
                className={clsx(selected === filename && "on")}
              >
                {filename}
              </Button>
            </li>
          ))}
        </ul>
      </SimplePopover>
      <Box
        data-codex=""
        data-active-filename={""}
        css={{
          [activeAttribute]: {
            display: "none",
          },
        }}
      >
        {children}
      </Box>
    </>
  );
};

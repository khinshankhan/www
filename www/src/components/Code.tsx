import React from "react";
import { Box } from "@chakra-ui/react";
import type { Language } from "prism-react-renderer";
import Highlight, { defaultProps } from "prism-react-renderer";
import type { FCC } from "src/types/react";

interface ICodeProps {
  content: string;
  language: string;
  diff: boolean;
  linesToHighlight: number[];
}

// NOTE: loosely based off https://prince.dev/prism-react-renderer except I have css written for gatsby-remark-prismjs,
// so I have to write the rnederition like that
// Basically copied whatever was outputted on commit 3e444df5c057195084dae0cc86a2544866abcb19

const Code: FCC<ICodeProps> = ({ content, language }) => {
  const code = content.trimEnd();

  return (
    <Highlight {...defaultProps} code={code} language={language as Language}>
      {({ tokens, getLineProps, getTokenProps }) => {
        console.log({ tokens, getLineProps, getTokenProps });
        return (
          <Box as="code" className={`language-${language}`}>
            {tokens.map((line) => (
              <div>
                {line.map((token, key) => {
                  const tokenProps = { ...getTokenProps({ token, key }), style: {} };
                  console.log({ tokenProps });
                  return <span key={tokenProps.children} {...tokenProps} />;
                })}
              </div>
            ))}
          </Box>
        );
      }}
    </Highlight>
  );
};

export default Code;

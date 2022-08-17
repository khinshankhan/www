import React, { Fragment } from "react";
import { chakra, Box } from "@chakra-ui/react";
import type { Language } from "prism-react-renderer";
import Highlight, { defaultProps } from "prism-react-renderer";
import type { FCC } from "src/types/react";

interface ICodeProps {
  content: string;
  language: string;
  linesToHighlight: number[];
  diff: boolean;
}

// NOTE: loosely based off https://prince.dev/prism-react-renderer except I have css written for gatsby-remark-prismjs,
// so I have to write the rnederition like that
// Basically copied whatever was outputted on commit 3e444df5c057195084dae0cc86a2544866abcb19

const Code: FCC<ICodeProps> = ({ content, language, linesToHighlight, diff }) => {
  const code = content.trimEnd();

  const shouldHighlightLine = (i: number) => linesToHighlight.includes(i);

  const languageClass = `language-${language}`;

  return (
    <Highlight {...defaultProps} code={code} language={language as Language}>
      {({ tokens, getTokenProps }) => (
        <Box as="code" className={languageClass}>
          {tokens.map((line, i) => {
            const hlClassName = shouldHighlightLine(i + 1) ? `gatsby-highlight-code-line` : ``;

            const cleanedLine =
              line[0].content === `` && line[0].types[0] === `plain` ? line.slice(1) : line;

            let diffClassName = ``;
            if (diff) {
              if (cleanedLine[0].content === `+`) {
                diffClassName = `inserted-sign inserted`;
              } else if (cleanedLine[0].content === `-`) {
                diffClassName = `deleted-sign deleted`;
              } else {
                diffClassName = `unchanged`;
              }
            }

            // HACK: this is so the diff highlight is encompassed by a line highlight if both are active
            const doubleHighlight = hlClassName !== `` && diffClassName !== ``;

            const divProps = doubleHighlight
              ? { className: [hlClassName, languageClass].join(` `).trim() }
              : { className: [hlClassName, diffClassName, languageClass].join(` `).trim() };
            const diffSpanProps = doubleHighlight
              ? { className: [diffClassName, languageClass].join(` `).trim() }
              : {};
            const DiffSpan = doubleHighlight ? chakra.span : Fragment;

            return (
              <Box as="div" {...divProps}>
                <DiffSpan {...diffSpanProps}>
                  {cleanedLine.map((token, key) => {
                    const tokenProps = { ...getTokenProps({ token, key }), style: {} };
                    let tokenClassName = tokenProps.className;
                    if (diff) {
                      if (token.content === `+`) {
                        tokenClassName = `token prefix inserted`;
                      } else if (token.content === `-`) {
                        tokenClassName = `token prefix deleted`;
                      }
                    }

                    return (
                      <span key={tokenProps.children} {...tokenProps} className={tokenClassName} />
                    );
                  })}
                </DiffSpan>
              </Box>
            );
          })}
        </Box>
      )}
    </Highlight>
  );
};

export default Code;

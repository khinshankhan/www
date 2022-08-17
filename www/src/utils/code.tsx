import rangeParser from "parse-numeric-range";
import { spaceSplit } from "./string";

const DELIMITER = `±`;

interface ICodeToCodeProps {
  children: string;
}
export const codeToCode = ({ children }: ICodeToCodeProps) => {
  const [givenLanguage, ...givenContent] = children.split(DELIMITER);

  let language = `text`;
  let content = givenLanguage;
  // a language was provided
  if (givenContent.length !== 0) {
    language = givenLanguage;
    // rejoin any wrongfully split code fragments
    content = givenContent.join(DELIMITER);
  }

  return { language, content };
};

// https://prince.dev/highlight-with-react
const linesRe = /{([\d,-]+)}/;

const calculateLinesToHighlight = (meta: string) => {
  const strlineNumbers = linesRe.exec(meta);
  if (!strlineNumbers || strlineNumbers.length === 0) return [];

  return rangeParser(strlineNumbers[0]);
};

export const getPreCodeMeta = (className: string) => {
  const metaInfo = spaceSplit(className);
  if (!metaInfo || metaInfo.length === 0) throw new Error(`Invalid code meta passed in!`);

  const [langStr, ...rest] = metaInfo;
  let language = langStr;
  let diff = false;

  if (language.startsWith(`language-`)) {
    language = language.slice(9);
  }

  if (language.startsWith(`diff-`)) {
    diff = true;
    language = language.slice(5);
  }

  let linesToHighlight: number[] = [];

  // TODO: account for other meta properties
  rest.forEach((e) => {
    if (linesRe.test(e)) {
      linesToHighlight = calculateLinesToHighlight(e);
    }
  });

  return { language, diff, linesToHighlight };
};

interface IPreCodeToCodeProps {
  className?: string;
  children: string;
}

export const preCodeToCode = ({ className, children }: IPreCodeToCodeProps) => {
  if (!className || className === ``) {
    return codeToCode({ children });
  }

  return { ...getPreCodeMeta(className), content: children };
};

import rangeParser from "parse-numeric-range";

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

  return { language, content, diff: false, linesToHighlight: [] as number[] };
};

// based off https://stackoverflow.com/a/1757107
const metaRe = /:(?=(?:[^"]*"[^"]*")*[^"]*$)/g;

export const getPreCodeMeta = (className: string) => {
  const metaInfo = className.split(metaRe);
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

  const info = rest.reduce(
    (stored, current) => {
      const [start] = current.split(`=`);

      // loosely based on https://prince.dev/highlight-with-react
      // planning on just having a bunch of if statements to deal with 'parsing'
      if (start === `h`) {
        return { ...stored, linesToHighlight: rangeParser(current.slice(2)) };
      }
      if (start === `title`) return { ...stored, title: current.slice(6) };

      return stored;
    },
    { title: null as string | null, linesToHighlight: [] as number[] }
  );

  return { language, diff, ...info };
};

interface IPreCodeToCodeProps {
  className?: string;
  children: string;
}

export const getCodeProps = ({ className, children }: IPreCodeToCodeProps) => {
  if (!className || className === ``) {
    return codeToCode({ children });
  }

  return { ...getPreCodeMeta(className), content: children };
};

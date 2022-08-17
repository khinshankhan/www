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

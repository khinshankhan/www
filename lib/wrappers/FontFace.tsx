import React from "react";

interface IUseFontFace {
  name: string;
  file: string;
  weights?: number[];
  format?: string;
}
export const createFontFace = ({
  name,
  file,
  weights = [100, 200, 300, 400, 500, 600, 700, 800, 900],
  format = "wolf2",
}: IUseFontFace) =>
  weights
    .map(
      (weight) => `
      @font-face {
        font-family: '${name}';
        font-style: normal;
        font-weight: ${weight};
        font-display: block;
        src: url(${file}) format('${format}');
      }
    `
    )
    .join(``);

export const getFontFaceString = () => {
  const MonaSans = createFontFace({ name: `Mona Sans`, file: `/fonts/Mona-Sans.woff2` });
  const Inter = createFontFace({ name: `Inter`, file: `/fonts/Inter-roman.var.woff2` });

  return `
        ${MonaSans}
        ${Inter}
      `;
};

export const FontFace = () => <style dangerouslySetInnerHTML={{ __html: getFontFaceString() }} />;

export default FontFace;

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
  format = "woff2",
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
  // https://gwfh.mranftl.com/fonts/noto-serif?subsets=latin,latin-ext
  return `
/* noto-serif-regular - latin-ext_latin */
@font-face {
  font-family: 'Noto Serif';
  font-style: normal;
  font-weight: 400;
  src: local(''),
       url('/fonts/noto-serif-v21-latin-ext_latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('/fonts/noto-serif-v21-latin-ext_latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* noto-serif-italic - latin-ext_latin */
@font-face {
  font-family: 'Noto Serif';
  font-style: italic;
  font-weight: 400;
  src: local(''),
       url('/fonts/noto-serif-v21-latin-ext_latin-italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('/fonts/noto-serif-v21-latin-ext_latin-italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* noto-serif-700 - latin-ext_latin */
@font-face {
  font-family: 'Noto Serif';
  font-style: normal;
  font-weight: 700;
  src: local(''),
       url('/fonts/noto-serif-v21-latin-ext_latin-700.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('/fonts/noto-serif-v21-latin-ext_latin-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* noto-serif-700italic - latin-ext_latin */
@font-face {
  font-family: 'Noto Serif';
  font-style: italic;
  font-weight: 700;
  src: local(''),
       url('/fonts/noto-serif-v21-latin-ext_latin-700italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('/fonts/noto-serif-v21-latin-ext_latin-700italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
      `;
};

export const FontFace = () => <style dangerouslySetInnerHTML={{ __html: getFontFaceString() }} />;

export default FontFace;

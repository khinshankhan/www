import React from "react";

const useVariableFont = (name: string, file: string) =>
  [100, 200, 300, 400, 500, 600, 700, 800, 900].map(
    (weight) => `
      @font-face {
        font-family: "${name}";
        font-style: normal;
        font-weight: ${weight};
        font-display: block;
        src: url(${file}) format("woff2");
      }
`
  ).join(`

  `);

const FontFace = () => {
  const MonaSans = useVariableFont(`Mona Sans`, `/fonts/Mona-Sans.woff2`);
  const Inter = useVariableFont(`Inter`, `/fonts/Inter-roman.var.woff2`);

  return (
    <style jsx global>
      {`
        ${MonaSans}
        ${Inter}
      `}
    </style>
  );
};

export default FontFace;

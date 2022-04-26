import React from "react";
import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Circular';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: local('Circular'), url('fonts/circular-std-medium-500.ttf?v=0.01') format('truetype');
      }

      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: local('Inter'), url('fonts/Inter-Medium.ttf?v=0.01') format('truetype');
      }
      `}
  />
);

export default Fonts;

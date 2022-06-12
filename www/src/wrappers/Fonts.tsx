import React from "react";
import { css, Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={css`
      /* Inter UI */
      @font-face {
        font-family: "Inter";
        font-weight: 400 700;
        font-display: swap;
        font-style: normal;
        font-named-instance: "Regular";
        src: url(/fonts/Inter-roman.var.woff2?f=inter-roman&v=3.19) format("woff2");
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
          U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      /* Crimson Pro */
      @font-face {
        font-family: "Crimson Pro";
        font-style: normal;
        font-weight: 600 800;
        font-display: swap;
        src: url(/fonts/Crimson-Pro.var.woff2?f=crimson-pro&v=1) format("woff2");
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
          U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      /* Butler */
      @font-face {
        font-family: "Butler";
        src: url(/fonts/Butler/Butler-UltraLight.woff2?f=butler&v=1) format("woff2"),
          url(/fonts/Butler/Butler-UltraLight.woff?f=butler&v=1) format("woff");
        font-weight: 200;
        font-style: normal;
      }

      @font-face {
        font-family: "Butler";
        src: url(/fonts/Butler/Butler-Medium.woff2?f=butler&v=1) format("woff2"),
          url(/fonts/Butler/Butler-Medium.woff?f=butler&v=1) format("woff");
        font-weight: 500;
        font-style: normal;
      }

      @font-face {
        font-family: "Butler";
        src: url(/fonts/Butler/Butler-Light.woff2?f=butler&v=1) format("woff2"),
          url(/fonts/Butler/Butler-Light.woff?f=butler&v=1) format("woff");
        font-weight: 300;
        font-style: normal;
      }

      @font-face {
        font-family: "Butler";
        src: url(/fonts/Butler/Butler-Black.woff2?f=butler&v=1) format("woff2"),
          url(/fonts/Butler/Butler-Black.woff?f=butler&v=1) format("woff");
        font-weight: 900;
        font-style: normal;
      }

      @font-face {
        font-family: "Butler";
        src: url(/fonts/Butler/Butler-Bold.woff2?f=butler&v=1) format("woff2"),
          url(/fonts/Butler/Butler-Bold.woff?f=butler&v=1) format("woff");
        font-weight: bold;
        font-style: normal;
      }

      @font-face {
        font-family: "Butler";
        src: url(/fonts/Butler/Butler-ExtraBold.woff2?f=butler&v=1) format("woff2"),
          url(/fonts/Butler/Butler-ExtraBold.woff?f=butler&v=1) format("woff");
        font-weight: 800;
        font-style: normal;
      }

      @font-face {
        font-family: "Butler";
        src: url(/fonts/Butler/Butler.woff2?f=butler&v=1) format("woff2"),
          url(/fonts/Butler/Butler.woff?f=butler&v=1) format("woff");
        font-weight: normal;
        font-style: normal;
      }
    `}
  />
);

export default Fonts;

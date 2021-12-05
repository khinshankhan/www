import React from "react";
import { IconButton, useColorModeValue } from "@chakra-ui/react";

interface IKLogoProps {
  kLogoFg?: string;
  kLogoBg?: string;
  kLogoBorder?: string;
  size?: number;
}

const KLogo = ({
  kLogoFg = `white`,
  kLogoBg = `black`,
  kLogoBorder = `black`,
  size = 70,
}: IKLogoProps) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox={`0 0 460 460`}
    preserveAspectRatio="xMidYMid meet"
  >
    <rect height="100%" width="100%" fill={kLogoFg} />
    <g transform={`translate(0,460) scale(0.1,-0.1)`} fill={kLogoBg} stroke="none">
      <path
        d={`M0 2300 l0 -2300 2300 0 2300 0 0 2300 0 2300 -2300 0 -2300 0 0 -2300z
              m1578 810 l22 -21 0 -650 c0 -637 0 -650 19 -639 11 5 40 41 66 80 25 38
              50 72 56 75 5 4 9 231 9 571 0 551 0 564 20 584 28 28 84 27 104 -2 14 -20
              16 -81 16 -470 0 -247 3 -448 8 -448 4 0 34 39 67 86 128 183 154 220 167
              234 7 9 31 42 53 75 22 33 45 65 50 71 6 6 48 66 95 134 47 67 108 153 135
              191 28 38 62 87 77 109 24 34 33 40 65 40 46 0 73 -24 73 -64 0 -31 -6 -41
              -160 -261 -27 -38 -68 -97 -91 -130 -23 -33 -52 -72 -63 -86 -12 -15 -29
              -37 -38 -50 -9 -13 -75 -107 -146 -209 -154 -219 -215 -305 -260 -366 -31
              -43 -33 -49 -30 -124 l3 -79 64 92 c36 51 71 99 78 107 7 8 32 43 55 77 24
              34 84 119 133 188 125 175 174 243 220 309 22 32 68 96 102 142 35 47 81
              110 103 142 21 31 54 77 71 102 18 25 52 74 77 110 53 77 78 99 113 100 34
              0 69 -34 69 -68 0 -23 -37 -93 -59 -112 -3 -3 -24 -32 -46 -64 -22 -33 -44
              -64 -50 -70 -6 -6 -28 -38 -50 -71 -22 -33 -44 -65 -50 -71 -5 -7 -18 -22
              -27 -35 -142 -199 -178 -250 -178 -255 0 -8 58 -83 81 -106 10 -10 32 -39
              50 -64 18 -26 39 -55 48 -65 9 -10 35 -44 59 -76 23 -32 75 -101 115 -153
              258 -338 267 -350 267 -382 0 -44 -25 -68 -70 -68 -35 0 -41 5 -118 108
              -45 59 -94 122 -109 141 -16 19 -35 44 -43 57 -23 34 -132 178 -140 184 -3
              3 -17 21 -30 40 -13 19 -31 43 -39 52 -21 22 -29 32 -76 98 -22 30 -43 60
              -48 65 -4 6 -15 19 -23 30 -10 13 -17 16 -20 8 -3 -6 -21 -32 -40 -57 l-34
              -45 83 -103 c45 -57 102 -129 127 -162 25 -32 63 -82 85 -110 145 -189 165
              -219 165 -247 0 -43 -34 -73 -76 -66 -35 6 -48 19 -116 107 -102 134 -170
              223 -222 290 -32 41 -74 97 -93 123 -20 26 -38 46 -40 43 -5 -4 -138 -190
              -163 -226 -46 -67 -154 -217 -193 -268 -43 -55 -52 -62 -83 -62 -61 0 -74
              24 -74 141 0 89 -2 100 -15 89 -8 -7 -15 -17 -15 -22 0 -19 -144 -199 -171
              -213 -37 -20 -45 -19 -69 7 -20 22 -20 31 -20 822 0 730 1 801 17 818 22
              24 74 23 101 -2z`}
      />
    </g>
    <rect
      x="10"
      y="10"
      height="440"
      width="440"
      fill="none"
      stroke={kLogoBorder}
      strokeWidth="20"
    />
  </svg>
);

const Logo = (props: IKLogoProps): JSX.Element => {
  const bg = useColorModeValue(`white`, `var(--chakra-colors-gray-800)`);
  const bgContrast = useColorModeValue(`black`, `white`);
  const kLogoFg = bgContrast;
  const kLogoBg = bg;
  const kLogoBorder = bgContrast;

  const kLogoProps: IKLogoProps = { kLogoFg, kLogoBg, kLogoBorder, ...props };
  return (
    <IconButton
      aria-label={`Navigate to homepage`}
      variant="ghost"
      icon={<KLogo {...kLogoProps} />}
    />
  );
};

export default Logo;

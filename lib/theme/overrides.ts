import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

// https://type-scale.com/
// 1.250 Major Third Type Scale, base 16 px
const baseFontSize = 16
const fontScale = 1.25
const fontPrecision = 1000
function roundFontSize(fontSize: number) {
  return Math.round(fontSize * fontPrecision) / fontPrecision
}

function getFontSize(exponent: number) {
  const baseRemSize = baseFontSize / 16

  const fontSize = baseRemSize * Math.pow(fontScale, exponent)
  const fontRounded = roundFontSize(fontSize)
  return fontRounded
}

function getFontSizeWithUnit(exponent: number) {
  return `${getFontSize(exponent)}rem`
}

function average(a: number, b: number) {
  return (a + b) / 2
}

function averageFontSize(exponent1: number, exponent2: number): string {
  const avgSize = average(getFontSize(exponent1), getFontSize(exponent2))
  const fontRounded = roundFontSize(avgSize)
  return `${fontRounded}rem`
}

export const overrides = {
  fontFamily: {
    heading: ["var(--font-heading)", ...defaultTheme.fontFamily.sans],
    body: ["var(--font-body)", ...defaultTheme.fontFamily.sans],
    mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
  },
  fontSize: {
    [-4]: [getFontSizeWithUnit(-4), { lineHeight: "1rem" }],
    [-3]: [getFontSizeWithUnit(-3), { lineHeight: "1rem" }],
    [-2]: [getFontSizeWithUnit(-2), { lineHeight: "1rem" }],
    [-1]: [getFontSizeWithUnit(-1), { lineHeight: "1.25rem" }],
    0: [getFontSizeWithUnit(0), { lineHeight: "1.5rem" }],
    1: [getFontSizeWithUnit(1), { lineHeight: "1.75rem" }],
    [1.5]: [averageFontSize(1, 2), { lineHeight: "1.75rem" }],
    2: [getFontSizeWithUnit(2), { lineHeight: "1.75rem" }],
    [2.5]: [averageFontSize(2, 3), { lineHeight: "1.75rem" }],
    3: [getFontSizeWithUnit(3), { lineHeight: "2rem" }],
    [3.5]: [averageFontSize(3, 4), { lineHeight: "2rem" }],
    4: [getFontSizeWithUnit(4), { lineHeight: "2.25rem" }],
    [4.5]: [averageFontSize(4, 5), { lineHeight: "2.25rem" }],
    5: [getFontSizeWithUnit(5), { lineHeight: "2.5rem" }],
    [5.5]: [averageFontSize(5, 6), { lineHeight: "2.5rem" }],
    6: [getFontSizeWithUnit(6), { lineHeight: "1" }],
    [6.5]: [averageFontSize(6, 7), { lineHeight: "1" }],
    7: [getFontSizeWithUnit(7), { lineHeight: "1" }],
    8: [getFontSizeWithUnit(8), { lineHeight: "1" }],
    9: [getFontSizeWithUnit(9), { lineHeight: "1" }],
    10: [getFontSizeWithUnit(10), { lineHeight: "1" }],
  },
  fontWeight: {
    thin: "100",
    extralight: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  },
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
  lineHeight: {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
    3: ".75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    7: "1.75rem",
    8: "2rem",
    9: "2.25rem",
    10: "2.5rem",
  },
} satisfies Config["theme"]

export default overrides

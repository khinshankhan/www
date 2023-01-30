import { styled, theme, selectMedia } from "lib/theme";

export const IconButton = styled("button", {
  display: "inline-block",
  lineHeight: 0,
  borderWidth: 0,
  padding: "10px",
  borderRadius: theme.radii.pill,
  color: theme.colors.logoFg,
  background: theme.colors.transparent,
  [selectMedia("at")]: {
    background: theme.colors.ghostBg,
  },
  cursor: "pointer",
});

export default IconButton;

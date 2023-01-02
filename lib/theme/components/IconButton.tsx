import { styled } from "../stitches.config";

export const IconButton = styled("button", {
  display: "inline-block",
  lineHeight: 0,
  borderWidth: 0,
  padding: "10px",
  borderRadius: "$pill",
  background: "transparent",
  "&:focus, &:focus-visible, &:hover": {
    background: "$iconBg",
  },
});

export default IconButton;

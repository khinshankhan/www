import { chakra } from "@chakra-ui/react";

const FancySpan = chakra(chakra.span, {
  baseStyle: {
    color: `#BB72EC`,
    _hover: {
      color: `#F40057`,
      textDecoration: `underline`,
    },
  },
});

export default FancySpan;

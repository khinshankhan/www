import { useMediaQuery } from "@chakra-ui/react";

export const useMobile = (): { [key: string]: boolean } => {
  const [isExtraSmall, isMobile] = useMediaQuery([`(max-width: 400px)`, `(max-width: 768px)`]);

  return { isExtraSmall, isMobile };
};

export default useMobile;

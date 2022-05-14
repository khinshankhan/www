import { useMediaQuery } from "@chakra-ui/react";

export const useMobile = (): { [key: string]: boolean } => {
  const [isMobile] = useMediaQuery(`(max-width: 768px)`);

  return { isMobile };
};

export default useMobile;

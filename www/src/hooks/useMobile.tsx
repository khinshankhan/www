import { useMediaQuery } from "@chakra-ui/react";

export const useMobile = (): boolean => {
  const [isSmallerThan768] = useMediaQuery(`(max-width: 768px)`);
  return isSmallerThan768;
};

export default useMobile;

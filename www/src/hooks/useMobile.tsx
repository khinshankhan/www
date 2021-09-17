import { useMediaQuery } from "@chakra-ui/react";

const useMobile = (): boolean => {
  const [isSmallerThan600] = useMediaQuery(`(max-width: 600px)`);
  return isSmallerThan600;
};

export default useMobile;

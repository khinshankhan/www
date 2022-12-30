import { media } from "lib/theme";
import { useMediaQuery } from "./useMediaQuery";

export const useMobile = (): { [key: string]: boolean } => {
  const match = useMediaQuery(media.md);

  return { isMobile: !match };
};

export default useMobile;

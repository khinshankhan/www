import { config } from "lib/theme";
import { useMediaQuery } from "./useMediaQuery";

export const useMobile = (): { [key: string]: boolean } => {
  const match = useMediaQuery(config.media.isMobile);

  return { isMobile: !match };
};

export default useMobile;

import { config } from "lib/theme";
import { useMediaQuery } from "./use-media-query";

export const useIsBreakpoint = (bp: keyof typeof config.media) => {
  const match = useMediaQuery(config.media[bp]);

  return { [bp]: !match };
};

export const useMobile = () => {
  const match = useIsBreakpoint("isMobile");

  return match;
};

export default useMobile;

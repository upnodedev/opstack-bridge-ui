import { useEffect, useMemo, useState } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
//@ts-ignore
import tailwindConfig from "../../tailwind.config.js";
const fullConfig = resolveConfig(tailwindConfig);

type WindowSize = {
  width: number | undefined;
  height: number | undefined;
};
export const useIsMobile = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobileSize = useMemo(() => {
    if (windowSize.width)
      return (
        windowSize.width <
        Number((fullConfig.theme.screens.lg as string).split("px")[0])
      );
    return 0;
  }, [windowSize]);
  return isMobileSize;
};

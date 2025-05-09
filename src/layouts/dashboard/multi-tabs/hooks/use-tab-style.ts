import { up, useMediaQuery } from "@/hooks";
import { useSettings } from "@/store/settingStore";
import { themeVars } from "@/theme/theme.css";
import { rgbAlpha } from "@/utils/theme";
import { type CSSProperties, useMemo } from "react";
import { ThemeLayout } from "#/enum";

export function useMultiTabsStyle() {
  const { themeLayout } = useSettings();
  const isPc = useMediaQuery(up("md"));

  return useMemo(() => {
    const style: CSSProperties = {
      position: "fixed",
      right: 0,
      backgroundColor: rgbAlpha(
        themeVars.colors.background.defaultChannel,
        0.9
      ),
      transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      width: "100%",
    };

    if (themeLayout === ThemeLayout.Horizontal) {
    } else if (isPc) {
    }

    return style;
  }, [themeLayout, isPc]);
}

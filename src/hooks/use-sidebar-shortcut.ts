import { useEffect, useCallback } from "react";
import { useSettings, useSettingActions } from "@/store/settingStore";
import { ThemeLayout } from "#/enum";

export function useSidebarShortcut() {
  const settings = useSettings();
  const { themeLayout } = settings;
  const { setSettings } = useSettingActions();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Ctrl + B để toggle sidebar
      if (e.ctrlKey && (e.key === "b" || e.key === "B")) {
        e.preventDefault();
        e.stopPropagation();

        // Chỉ toggle khi không phải horizontal layout
        if (themeLayout !== ThemeLayout.Horizontal) {
          const isMinimized = themeLayout === ThemeLayout.Mini;
          const newLayout = isMinimized
            ? ThemeLayout.Vertical
            : ThemeLayout.Mini;

          setSettings({
            ...settings,
            themeLayout: newLayout,
          });
        }
      }
    },
    [settings, themeLayout, setSettings]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, { capture: true });
    window.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => {
      document.removeEventListener("keydown", handleKeyDown, { capture: true });
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, [handleKeyDown]);
}

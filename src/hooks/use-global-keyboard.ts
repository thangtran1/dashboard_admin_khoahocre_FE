import { useEffect } from "react";
import { useSettings, useSettingActions } from "@/store/settingStore";
import { ThemeLayout } from "#/enum";

export function useGlobalKeyboard() {
  const settings = useSettings();
  const { setSettings } = useSettingActions();

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Bỏ qua nếu đang focus vào input, textarea, hoặc contenteditable
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.contentEditable === "true"
      ) {
        return;
      }

      // Ctrl + B để toggle sidebar
      if (e.ctrlKey && (e.key === "b" || e.key === "B")) {
        e.preventDefault();
        e.stopPropagation();

        const currentLayout = settings.themeLayout;

        // Chỉ toggle khi không phải horizontal layout
        if (currentLayout !== ThemeLayout.Horizontal) {
          const isMinimized = currentLayout === ThemeLayout.Mini;
          const newLayout = isMinimized
            ? ThemeLayout.Vertical
            : ThemeLayout.Mini;

          setSettings({
            ...settings,
            themeLayout: newLayout,
          });
        }
      }
    };

    // Sử dụng addEventListener với các options khác nhau để đảm bảo capture
    const options = { capture: true, passive: false };

    document.addEventListener("keydown", handleGlobalKeyDown, options);
    window.addEventListener("keydown", handleGlobalKeyDown, options);

    // Thêm listener cho body để đảm bảo
    document.body.addEventListener("keydown", handleGlobalKeyDown, options);

    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown, options);
      window.removeEventListener("keydown", handleGlobalKeyDown, options);
      document.body.removeEventListener(
        "keydown",
        handleGlobalKeyDown,
        options
      );
    };
  }, [settings, setSettings]);
}

import { useEffect, useRef, useState } from "react";
import { useSettings } from "@/store/settingStore";
import { ThemeLayout } from "#/enum";
import { cn } from "@/utils";
import { Icon } from "@/components/icon";
import { useTranslation } from "react-i18next";

interface SidebarToastProps {
  duration?: number; // Thời gian toast hiển thị (ms)
}

export function SidebarToast({ duration = 2000 }: SidebarToastProps) {
  const { t } = useTranslation();
  const { themeLayout } = useSettings();

  const [showToast, setShowToast] = useState(false);
  const [visible, setVisible] = useState(false);
  const [previousLayout, setPreviousLayout] =
    useState<ThemeLayout>(themeLayout);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Hiển thị toast khi toggle Vertical ↔ Mini
  useEffect(() => {
    const isVerticalOrMini = [ThemeLayout.Vertical, ThemeLayout.Mini].includes(
      themeLayout
    );
    const wasVerticalOrMini = [ThemeLayout.Vertical, ThemeLayout.Mini].includes(
      previousLayout
    );

    if (themeLayout === ThemeLayout.Horizontal) {
      setShowToast(false);
      setPreviousLayout(themeLayout);
      return;
    }

    if (
      themeLayout !== previousLayout &&
      isVerticalOrMini &&
      wasVerticalOrMini
    ) {
      setVisible(true);
      setShowToast(true);

      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        setShowToast(false);
      }, duration);
    }

    setPreviousLayout(themeLayout);
  }, [themeLayout, previousLayout, duration]);

  if (!visible) return null;

  const isMinimized = themeLayout === ThemeLayout.Mini;

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-[9999] flex items-center gap-3 min-w-[200px]",
        "bg-background border border-border rounded-lg shadow-lg p-3",
        "transition-all duration-300 ease-in-out transform origin-bottom-right",
        showToast
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-2 opacity-0 scale-95"
      )}
      onTransitionEnd={() => {
        // Khi animation kết thúc và toast đang ẩn, remove DOM
        if (!showToast) setVisible(false);
      }}
    >
      {/* Icon trạng thái */}
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          isMinimized
            ? "bg-orange-100 text-orange-600"
            : "bg-green-100 text-green-600"
        )}
      >
        <Icon
          icon={
            isMinimized ? "line-md:menu-fold-left" : "line-md:menu-unfold-right"
          }
          size={16}
        />
      </div>

      {/* Nội dung toast */}
      <div className="flex-1">
        <p className="text-sm font-medium text-text-primary">
          {isMinimized
            ? t("siderbar-labels.sidebar-minimized")
            : t("siderbar-labels.sidebar-maximized")}
        </p>
        <p className="text-xs text-text-secondary">
          {t("siderbar-labels.press-ctrl-b")}
        </p>
      </div>

      {/* Nút đóng */}
      <button
        onClick={() => {
          setShowToast(false);
          if (timerRef.current) clearTimeout(timerRef.current);
        }}
        className="text-text-secondary hover:text-text-primary transition-colors"
      >
        <Icon icon="line-md:close-small" size={16} />
      </button>
    </div>
  );
}

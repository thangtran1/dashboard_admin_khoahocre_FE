import { Icon } from "@/components/icon";
import { useSettings, useSettingActions } from "@/store/settingStore";
import { Button } from "@/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";
import { ThemeLayout } from "#/enum";
import { useState } from "react";
import { cn } from "@/utils";
import { useTranslation } from "react-i18next";

export default function SidebarToggle() {
  const { t } = useTranslation();
  const settings = useSettings();
  const { themeLayout } = settings;
  const { setSettings } = useSettingActions();
  const [isAnimating, setIsAnimating] = useState(false);

  // Chỉ hiển thị khi không phải layout horizontal
  if (themeLayout === ThemeLayout.Horizontal) return null;

  const isMinimized = themeLayout === ThemeLayout.Mini;

  const toggleSidebar = () => {
    setIsAnimating(true);

    setSettings({
      ...settings,
      themeLayout: isMinimized ? ThemeLayout.Vertical : ThemeLayout.Mini,
    });

    setTimeout(() => setIsAnimating(false), 300);
  };

  const iconName = isMinimized
    ? "line-md:menu-unfold-right"
    : "line-md:menu-fold-left";

  const tooltipText = isMinimized
    ? t("sys.sidebar.expand-sidebar")
    : t("sys.sidebar.collapse-sidebar");

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={cn(
            "relative hover:bg-muted/80 transition-all duration-200 group",
            "hover:scale-105 active:scale-95 shadow-sm",
            "border border-transparent hover:border-border/50",
            isAnimating && "animate-pulse",
            isMinimized &&
              "bg-background/80 backdrop-blur-sm shadow-lg border-border"
          )}
        >
          <Icon
            icon={iconName}
            size={18}
            className={cn(
              "text-text-secondary group-hover:text-text-primary transition-all duration-200",
              isAnimating && "animate-spin",
              isMinimized && "text-primary"
            )}
          />

          {/* Hiệu ứng ripple khi click */}
          <div className="absolute inset-0 rounded-md bg-primary/10 scale-0 group-active:scale-100 transition-transform duration-150" />

          {/* Badge nhỏ để chỉ trạng thái - chỉ hiển thị khi không mini */}
          {!isMinimized && (
            <div
              className={cn(
                "absolute -top-1 -right-1 w-2 h-2 rounded-full transition-all duration-200",
                "bg-green-500 opacity-60 group-hover:opacity-100"
              )}
            />
          )}

          {/* Indicator đặc biệt cho mini mode */}
          {isMinimized && (
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full animate-pulse" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent
        side={isMinimized ? "right" : "bottom"}
        className="text-xs"
      >
        <div className="flex flex-col items-center gap-1">
          <p>{tooltipText}</p>
          <p className="text-muted-foreground text-[10px]">
            {isMinimized
              ? t("sys.sidebar.sidebar-minimized-description")
              : t("sys.sidebar.sidebar-maximized-description")}
          </p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

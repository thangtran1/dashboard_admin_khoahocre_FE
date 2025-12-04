import { varFade } from "@/components/admin/animate/variants/fade";
import { Icon } from "@/components/icon";
import Logo from "@/ui/logo";
import { NavHorizontal, NavMini, NavVertical } from "@/components/admin/nav";
import { down, useMediaQuery } from "@/hooks";
import { useRouteToMenu } from "@/router/hooks";
import { usePermissionRoutes } from "@/router/hooks";
import { menuFilter } from "@/router/utils";
import { useSettings } from "@/store/settingStore";
import { Button } from "@/ui/button";
import { ScrollArea, ScrollBar } from "@/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/ui/sheet";
import { cn } from "@/utils";
import { m } from "motion/react";
import { useMemo } from "react";
import { ThemeLayout } from "#/enum";
import SidebarToggle from "@/layouts/dashboard/nav-bar/sidebar-toggle";

interface Props {
  className?: string;
}

export default function NavBar({ className }: Props) {
  const { themeLayout } = useSettings();

  const routeToMenuFn = useRouteToMenu();
  const permissionRoutes = usePermissionRoutes();

  const menuList = useMemo(() => {
    const menuRoutes = menuFilter(permissionRoutes);
    const result = routeToMenuFn(menuRoutes);

    return [
      {
        items: result,
      },
    ];
  }, [routeToMenuFn, permissionRoutes]);

  const isMobile = useMediaQuery(down("md"));

  if (isMobile)
    return (
      <Sheet modal={false}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Icon icon="local:ic-menu" size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="[&>button]:hidden px-2">
          <div className="flex gap-2 px-2 h-[var(--layout-header-height)] items-center">
            <Logo />
          </div>
          <ScrollArea className="h-full">
            <NavVertical data={menuList} />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    );
  if (themeLayout === ThemeLayout.Horizontal)
    return (
      <nav
        data-slot="slash-layout-nav"
        className={cn("w-screen bg-background z-app-bar", className)}
      >
        <ScrollArea className="min-w-screen whitespace-nowrap px-2 bg-background">
          <NavHorizontal data={menuList} />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </nav>
    );

  // Vertical and Mini
  return (
    <nav
      data-slot="slash-layout-nav"
      className={cn(
        "hidden md:block fixed inset-y-0 left-0 flex-col h-full bg-background z-app-bar border-r border-dashed sidebar-transition sidebar-nav hw-accelerated",
        className
      )}
    >
      <div
        className={cn(
          "relative flex items-center justify-between py-4 px-2 h-[var(--layout-header-height)]",
          {
            "justify-center": themeLayout === ThemeLayout.Mini,
          }
        )}
      >
        <div className="flex items-center gap-2">
          <Logo hideText={true} />
          {themeLayout !== ThemeLayout.Mini && (
            <m.span
              className="text-xl font-bold text-primary sidebar-text-transition"
              variants={varFade().in}
            >
              Admin Dashboard
            </m.span>
          )}
        </div>

        {/* Toggle button - luôn hiển thị ở góc phải */}
        <div
          className={cn(
            "flex items-center transition-all duration-200",
            themeLayout === ThemeLayout.Mini
              ? "absolute -right-3 top-1/2 transform -translate-y-1/2"
              : ""
          )}
        >
          <SidebarToggle />
        </div>
      </div>

      <ScrollArea
        className={cn(
          "h-[calc(100vh-var(--layout-header-height))] px-2 bg-background sidebar-transition",
          {
            "w-[var(--layout-nav-width)]": themeLayout === ThemeLayout.Vertical,
            "w-[var(--layout-nav-width-mini)]":
              themeLayout === ThemeLayout.Mini,
          }
        )}
      >
        <m.div
          key={themeLayout}
          variants={varFade().in}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2 }}
        >
          {themeLayout === ThemeLayout.Vertical ? (
            <NavVertical data={menuList} />
          ) : (
            <NavMini data={menuList} />
          )}
        </m.div>
      </ScrollArea>
    </nav>
  );
}

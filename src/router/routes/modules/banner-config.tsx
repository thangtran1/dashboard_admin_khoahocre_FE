import { Icon } from "@/components/icon";
import { LineLoading } from "@/components/loading";
import { Suspense, lazy } from "react";
import { Outlet } from "react-router";
import type { AppRouteObject } from "#/router";

const ManagerBannerConfig = lazy(
  () => import("@/pages/banner-config/manager-banner-config/index")
);

const bannerConfig: AppRouteObject = {
  order: 3,
  path: "banner-config",
  element: (
    <Suspense fallback={<LineLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: "sys.menu.banner-config",
    icon: (
      <Icon
        icon="solar:widget-5-bold-duotone"
        className="ant-menu-item-icon"
        size="24"
      />
    ),
    key: "/banner-config",
  },
  children: [
    {
      path: "manager-banner-config",
      element: (
        <Suspense fallback={<LineLoading />}>
          <ManagerBannerConfig />
        </Suspense>
      ),
      meta: {
        label: "sys.banner-config.manager-banner",
        key: "/banner-config/manager-banner-config",
      },
    },
  ],
};

export default bannerConfig;

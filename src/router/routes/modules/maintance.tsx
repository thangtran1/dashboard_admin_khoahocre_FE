import { Suspense, lazy } from "react";
import { Outlet } from "react-router";

import { Icon } from "@/components/icon";
import { LineLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

const MaintenceSystemPage = lazy(() => import("@/pages/maintenance/index"));
const CreatedNewMaintenance = lazy(
  () => import("@/pages/maintenance/created-new-maintenance")
);

const maintenance: AppRouteObject = {
  order: 2,
  path: "maintenance",
  element: (
    <Suspense fallback={<LineLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: "sys.menu.maintenance",
    icon: (
      <Icon
        icon="local:ic-management"
        className="ant-menu-item-icon"
        size="24"
      />
    ),
    key: "/maintenance",
  },
  children: [
    {
      path: "",
      element: (
        <Suspense fallback={<LineLoading />}>
          <MaintenceSystemPage />
        </Suspense>
      ),
      meta: {
        label: "sys.menu.maintenance-maintenance",
        key: "/maintenance",
      },
    },
    {
      path: "created-new-maintenance",
      element: (
        <Suspense fallback={<LineLoading />}>
          <CreatedNewMaintenance />
        </Suspense>
      ),
      meta: {
        label: "sys.menu.created-new-maintenance",
        key: "/maintenance/created-new-maintenance",
        hideMenu: true,
      },
    },
  ],
};

export default maintenance;
import { Suspense, lazy } from "react";
import { Outlet } from "react-router";

import { Icon } from "@/components/icon";
import { LineLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

// Lazy load components
const ManagementUserPage = lazy(() => import("@/pages/management/user"));

const management: AppRouteObject = {
  order: 2,
  path: "management",
  element: (
    <Suspense fallback={<LineLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: "sys.menu.management",
    icon: (
      <Icon
        icon="local:ic-management"
        className="ant-menu-item-icon"
        size="24"
      />
    ),
    key: "/management",
  },
  children: [
    {
      path: "user",
      element: (
        <Suspense fallback={<LineLoading />}>
          <ManagementUserPage />
        </Suspense>
      ),
      meta: {
        label: "sys.menu.management-user",
        key: "/management/user",
      },
    },
  ],
};

export default management;

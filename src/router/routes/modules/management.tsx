import { Suspense } from "react";
import { Navigate, Outlet } from "react-router";

import { Icon } from "@/components/icon";
import { LineLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

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
      index: true,
      element: <Navigate to="user" replace />,
    },
    {
      path: "user",
      meta: { label: "sys.menu.user.index", key: "/management/user" },
      children: [
        {
          index: true,
          element: <Navigate to="profile" replace />,
        },
      ],
    },
  ],
};

export default management;

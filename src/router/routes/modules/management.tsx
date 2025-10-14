import { Suspense, lazy } from "react";
import { Outlet } from "react-router";

import { Icon } from "@/components/icon";
import { LineLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";
import BannerConfigPage from "@/pages/management/manager-banner-config";
import ManagerChatUser from "@/pages/management/manager-chat-user/manager-chat-user";
import DatabaseManagement from "@/pages/management/database";

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
    {
      path: "manager-banner-config",
      element: (
        <Suspense fallback={<LineLoading />}>
          <BannerConfigPage />
        </Suspense>
      ),
      meta: {
        label: "sys.banner-config.manager-banner",
        key: "/management/manager-banner-config",
      },
    },
    {
      path: "manager-chat-user",
      element: (
        <Suspense fallback={<LineLoading />}>
          <ManagerChatUser />
        </Suspense>
      ),
      meta: {
        label: "sys.menu.manager-chat-user",
        key: "/management/manager-chat-user",
      },
    },
    {
      path: "database",
      element: (
        <Suspense fallback={<LineLoading />}>
          <DatabaseManagement />
        </Suspense>
      ),
      meta: {
        label: "sys.database.title",
        key: "/management/database",
      },
    },
  ],
};

export default management;

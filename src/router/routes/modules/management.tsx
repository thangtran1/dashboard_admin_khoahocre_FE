import { Suspense, lazy } from "react";
import { Outlet } from "react-router";

import { Icon } from "@/components/icon";
import { LineLoading } from "@/components/common/loading";

import type { AppRouteObject } from "#/router";
import BannerConfigPage from "@/pages/admin/management/banner-config";
import ManagerChatUser from "@/pages/admin/management/chat-user/manager-chat-user";
import DatabaseManagement from "@/pages/admin/management/database";

// Lazy load components
const ManagementUserPage = lazy(() => import("@/pages/admin/management/user"));
const CreatedNewUserPage = lazy(
  () => import("@/pages/admin/management/user/created-new-user")
);
const UserDetailPage = lazy(() => import("@/pages/admin/management/user/[id]"));

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
      path: "user/created-new-user",
      element: (
        <Suspense fallback={<LineLoading />}>
          <CreatedNewUserPage />
        </Suspense>
      ),
      meta: {
        label: "sys.menu.created-new-user",
        key: "/management/user/created-new-user",
        hideMenu: true,
      },
    },
    {
      path: "user/:userId",
      element: (
        <Suspense fallback={<LineLoading />}>
          <UserDetailPage />
        </Suspense>
      ),
      meta: {
        label: "sys.menu.user-detail",
        key: "/management/user/:userId",
        hideMenu: true,
      },
    },
    {
      path: "banner-config",
      element: (
        <Suspense fallback={<LineLoading />}>
          <BannerConfigPage />
        </Suspense>
      ),
      meta: {
        label: "sys.banner-config.manager-banner",
        key: "/management/banner-config",
      },
    },
    {
      path: "chat-user",
      element: (
        <Suspense fallback={<LineLoading />}>
          <ManagerChatUser />
        </Suspense>
      ),
      meta: {
        label: "sys.menu.manager-chat-user",
        key: "/management/chat-user",
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

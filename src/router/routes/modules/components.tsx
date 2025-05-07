import { Icon } from "@/components/icon";
import { LineLoading } from "@/components/loading";
import { Suspense } from "react";
import { Outlet } from "react-router";
import type { AppRouteObject } from "#/router";

const components: AppRouteObject = {
  order: 3,
  path: "components",
  element: (
    <Suspense fallback={<LineLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: "sys.menu.components",
    icon: (
      <Icon
        icon="solar:widget-5-bold-duotone"
        className="ant-menu-item-icon"
        size="24"
      />
    ),
    key: "/components",
  },
};

export default components;

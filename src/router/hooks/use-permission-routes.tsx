import { Icon } from "@/components/icon";
import { LineLoading } from "@/components/common/loading";
import { useUserPermission, useUserInfo } from "@/store/userStore";
import { Badge } from "@/ui/badge";
import { flattenTrees } from "@/utils/tree";
import { isEmpty } from "ramda";
import { Suspense, lazy, useMemo } from "react";
import { Navigate, Outlet } from "react-router";
import type { Permission } from "#/entity";
import { BasicStatus, PermissionType } from "#/enum";
import type { AppRouteObject } from "#/router";
import { getRoutesFromModules } from "../utils";

const ENTRY_PATH = "/src/pages";
const PAGES = import.meta.glob("/src/pages/**/*.tsx");
const loadComponentFromPath = (path: string) => PAGES[`${ENTRY_PATH}${path}`];

function buildCompleteRoute(
  permission: Permission,
  flattenedPermissions: Permission[],
  segments: string[] = []
): string {
  segments.unshift(permission.route);

  if (!permission.parentId) {
    return `/${segments.join("/")}`;
  }

  const parent = flattenedPermissions.find((p) => p.id === permission.parentId);
  if (!parent) {
    console.warn(`Parent permission not found for ID: ${permission.parentId}`);
    return `/${segments.join("/")}`;
  }

  return buildCompleteRoute(parent, flattenedPermissions, segments);
}

function NewFeatureTag() {
  return (
    <Badge variant="info">
      <Icon icon="solar:bell-bing-bold-duotone" size={14} />
      New
    </Badge>
  );
}

const createBaseRoute = (
  permission: Permission,
  completeRoute: string
): AppRouteObject => {
  const {
    route,
    label,
    icon,
    order,
    hide,
    hideTab,
    status,
    frameSrc,
    newFeature,
  } = permission;

  const baseRoute: AppRouteObject = {
    path: route,
    meta: {
      label,
      key: completeRoute,
      hideMenu: !!hide,
      hideTab,
      disabled: status === BasicStatus.DISABLE,
    },
  };

  if (order) baseRoute.order = order;
  if (baseRoute.meta) {
    if (icon) baseRoute.meta.icon = icon;
    if (frameSrc) baseRoute.meta.frameSrc = frameSrc;
    if (newFeature) baseRoute.meta.info = <NewFeatureTag />;
  }

  return baseRoute;
};

const createCatalogueRoute = (
  permission: Permission,
  flattenedPermissions: Permission[]
): AppRouteObject => {
  const baseRoute = createBaseRoute(
    permission,
    buildCompleteRoute(permission, flattenedPermissions)
  );

  if (baseRoute.meta) {
    baseRoute.meta.hideTab = true;
  }

  const { parentId, children = [] } = permission;
  if (!parentId) {
    baseRoute.element = (
      <Suspense fallback={<LineLoading />}>
        <Outlet />
      </Suspense>
    );
  }

  baseRoute.children = transformPermissionsToRoutes(
    children,
    flattenedPermissions
  );

  if (!isEmpty(children)) {
    baseRoute.children.unshift({
      index: true,
      element: <Navigate to={children[0].route} replace />,
    });
  }

  return baseRoute;
};

const createMenuRoute = (
  permission: Permission,
  flattenedPermissions: Permission[]
): AppRouteObject => {
  const baseRoute = createBaseRoute(
    permission,
    buildCompleteRoute(permission, flattenedPermissions)
  );

  if (permission.component) {
    const Element = lazy(loadComponentFromPath(permission.component) as any);

    if (permission.frameSrc) {
      baseRoute.element = <Element src={permission.frameSrc} />;
    } else {
      baseRoute.element = (
        <Suspense fallback={<LineLoading />}>
          <Element />
        </Suspense>
      );
    }
  }

  return baseRoute;
};

function transformPermissionsToRoutes(
  permissions: Permission[],
  flattenedPermissions: Permission[]
): AppRouteObject[] {
  return permissions.map((permission) => {
    if (permission.type === PermissionType.CATALOGUE) {
      return createCatalogueRoute(permission, flattenedPermissions);
    }
    return createMenuRoute(permission, flattenedPermissions);
  });
}

// const ROUTE_MODE = import.meta.env.VITE_APP_ROUTER_MODE;
export function usePermissionRoutes() {
  const permissions = useUserPermission();
  const user = useUserInfo();

  return useMemo(() => {
    // Admin có thể truy cập tất cả routes - không cần kiểm tra permissions
    if (user && (user.role as any) === "admin") {
      return getRoutesFromModules();
    }

    // Nếu ROUTE_MODE là "module", return getRoutesFromModules()
    // if (ROUTE_MODE === "module") {
    //   return getRoutesFromModules();
    // }

    if (!permissions) return [];

    const flattenedPermissions = flattenTrees(permissions);
    return transformPermissionsToRoutes(permissions, flattenedPermissions);
  }, [permissions, user]);
}

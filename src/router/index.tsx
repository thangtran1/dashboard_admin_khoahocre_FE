import DashboardLayout from "@/layouts/dashboard";
import PageError from "@/pages/sys/error/PageError";
import LoginPage from "@/pages/sys/login";
import ProtectedRoute from "@/router/components/protected-route";
import { usePermissionRoutes } from "@/router/hooks";
import { ERROR_ROUTE } from "@/router/routes/error-routes";
import { ErrorBoundary } from "react-error-boundary";
import { Navigate, type RouteObject, createHashRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import type { AppRouteObject } from "#/router";
import ResetPassword from "@/pages/sys/login/resetPassword";
import UserHomePage from "@/pages/user";
import UserLayout from "@/layouts/user/user-layout";
import BlogGridPage from "@/pages/user/blog";

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

const PUBLIC_ROUTE: AppRouteObject = {
  path: "/login",
  element: (
    <ErrorBoundary FallbackComponent={PageError}>
      <LoginPage />
    </ErrorBoundary>
  ),
};

const NO_MATCHED_ROUTE: AppRouteObject = {
  path: "*",
  element: <Navigate to="/404" replace />,
};

export default function Router() {
  const permissionRoutes = usePermissionRoutes();

  const PROTECTED_ROUTE: AppRouteObject = {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to={HOMEPAGE} replace /> },
      ...permissionRoutes,
    ],
  };
  const RESET_PASSWORD_ROUTE: AppRouteObject = {
    path: "/reset-password",
    element: (
      <ErrorBoundary FallbackComponent={PageError}>
        <ResetPassword />
      </ErrorBoundary>
    ),
  };

  const APP_HOMEPAGE_USER: AppRouteObject = {
    path: "/",
    element: (
      <ErrorBoundary FallbackComponent={PageError}>
        <UserLayout />
      </ErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: <UserHomePage />, // Hiện trang chính
      },
      {
        path: "blog",
        element: <BlogGridPage />, // Trang blog (nội dung thay đổi)
      },
      // Thêm các route con khác tại đây
    ],
  };

  const routes = [
    APP_HOMEPAGE_USER,
    RESET_PASSWORD_ROUTE,
    PUBLIC_ROUTE,
    PROTECTED_ROUTE,
    ERROR_ROUTE,
    NO_MATCHED_ROUTE,
  ] as RouteObject[];

  const router = createHashRouter(routes);

  return <RouterProvider router={router} />;
}

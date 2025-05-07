import { Suspense, lazy } from "react";
import { Outlet } from "react-router";

import { LineLoading } from "@/components/loading";

import ProtectedRoute from "../components/protected-route";

import type { AppRouteObject } from "#/router";

const Page403 = lazy(() => import("@/pages/sys/error/Page403"));
const Page404 = lazy(() => import("@/pages/sys/error/Page404"));
const Page500 = lazy(() => import("@/pages/sys/error/Page500"));

export const ERROR_ROUTE: AppRouteObject = {
  element: (
    <ProtectedRoute>
      <Suspense fallback={<LineLoading />}>
        <Outlet />
      </Suspense>
    </ProtectedRoute>
  ),
  children: [
    { path: "403", element: <Page403 /> },
    { path: "404", element: <Page404 /> },
    { path: "500", element: <Page500 /> },
  ],
};

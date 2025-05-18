import DashboardLayout from "@/layouts/dashboard";
import PageError from "@/pages/sys/error/PageError";
import LoginPage from "@/pages/sys/login";
import ProtectedRoute from "@/router/components/protected-route";
import { usePermissionRoutes } from "@/router/hooks";
import { ERROR_ROUTE } from "@/router/routes/error-routes";
import { ErrorBoundary } from "react-error-boundary";
import { Navigate, type RouteObject, createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import type { AppRouteObject } from "#/router";
import ResetPassword from "@/pages/sys/login/resetPassword";
import UserHomePage from "@/pages/user";
import UserLayout from "@/layouts/user/user-layout";
import BlogGridPage from "@/pages/user/blog/blog";
import BlogDetail from "@/pages/user/blog/blogDetail";
import TipsAiPage from "@/pages/user/tips-ai/tips-ai";
import TipsAiDetail from "@/pages/user/tips-ai/tips-ai-detail";
import YoutubePage from "@/pages/user/youtube/youtube";
import YoutubeDetail from "@/pages/user/youtube/youtube-detail";
import CartPage from "@/pages/user/cart";
import CheckoutPage from "@/pages/user/checkout";
import CheckoutConfirmPage from "@/pages/user/checkout/confirm";
import CheckoutSuccessPage from "@/pages/user/checkout/success";
import ListTopicsPage from "@/pages/user/listTopics/list-topics";
import ListTopicsDetail from "@/pages/user/listTopics/list-topics-detail";
import WishList from "@/pages/user/wishList";
import UserProfile from "@/pages/user/profile";
import Introduce from "@/pages/user/information/introduce";
import Contact from "@/pages/user/information/contact";

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
      { index: true, element: <UserHomePage /> },
      {
        path: "blog",
        children: [
          { index: true, element: <BlogGridPage /> },
          { path: ":id", element: <BlogDetail /> },
        ],
      },
      {
        path: "tips-ai",
        children: [
          { index: true, element: <TipsAiPage /> },
          { path: ":id", element: <TipsAiDetail /> },
        ],
      },
      {
        path: "youtube",
        children: [
          { index: true, element: <YoutubePage /> },
          { path: ":id", element: <YoutubeDetail /> },
        ],
      },
      {
        path: "list-topics",
        children: [
          { index: true, element: <ListTopicsPage /> },
          { path: ":id", element: <ListTopicsDetail /> },
        ],
      },
      {
        path: "cart",
        children: [{ index: true, element: <CartPage /> }],
      },
      {
        path: "thanh-toan",
        children: [
          { index: true, element: <CheckoutPage /> }, // điền form
          { path: "xac-nhan", element: <CheckoutConfirmPage /> }, // xác nhận
          { path: "thanh-cong", element: <CheckoutSuccessPage /> }, // kết thúc
        ],
      },
      {
        path: "wish-list",
        children: [{ index: true, element: <WishList /> }],
      },
      {
        path: "ho-so",
        children: [{ index: true, element: <UserProfile /> }],
      },
      {
        path: "gioi-thieu",
        children: [{ index: true, element: <Introduce /> }],
      },
      {
        path: "contact",
        children: [{ index: true, element: <Contact /> }],
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

  const router = createBrowserRouter(routes);
  // thêm dấu # createHashRouter

  return <RouterProvider router={router} />;
}

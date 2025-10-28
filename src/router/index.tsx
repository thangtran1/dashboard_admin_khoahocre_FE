import DashboardLayout from "@/layouts/dashboard";
import PageError from "@/pages/admin/sys/error/PageError";
import LoginPage from "@/pages/admin/sys/login";
import { usePermissionRoutes } from "@/router/hooks";
import { ERROR_ROUTE } from "@/router/routes/error-routes";
import { ErrorBoundary } from "react-error-boundary";
import { Navigate, type RouteObject, createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import type { AppRouteObject } from "#/router";
import ResetPassword from "@/pages/admin/sys/login/resetPassword";
import GoogleSuccess from "@/pages/admin/sys/login/google-success";
import GoogleError from "@/pages/admin/sys/login/google-error";
import GitHubSuccess from "@/pages/admin/sys/login/github-success";
import GitHubError from "@/pages/admin/sys/login/github-error";
import ProfilePage from "@/pages/admin/profile";
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
import { BuyCourse } from "@/pages/user/information/buyCourse";
import { ClearCache } from "@/pages/user/clear-cache";
import NewCoursesDetail from "@/pages/user/new-courses/new-courses-detail";
import NewCoursesPage from "@/pages/user/new-courses/new-courses";
import MarketPage from "@/pages/user/market/market";
import MarketDetail from "@/pages/user/market/market-detail";
import GroupBuyPage from "@/pages/user/group-buy/group-buy";
import GroupBuyDetail from "@/pages/user/group-buy/group-buy-detail";
import ProtectedRoute from "./components/protected-route";
import MaintenanceGuard from "./components/maintenance-guard";

const { VITE_APP_ADMIN: HOMEPAGE, VITE_API_URL_MAINTENANCE: MAIN_APP } =
  import.meta.env;

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
      // Profile route - không hiển thị trong sidebar
      {
        path: "profile",
        element: (
          <ErrorBoundary FallbackComponent={PageError}>
            <ProfilePage />
          </ErrorBoundary>
        ),
      },
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

  const AUTH_ROUTES: AppRouteObject[] = [
    {
      path: "/auth/google/success",
      element: (
        <ErrorBoundary FallbackComponent={PageError}>
          <GoogleSuccess />
        </ErrorBoundary>
      ),
    },
    {
      path: "/auth/google/error",
      element: (
        <ErrorBoundary FallbackComponent={PageError}>
          <GoogleError />
        </ErrorBoundary>
      ),
    },
    {
      path: "/auth/github/success",
      element: (
        <ErrorBoundary FallbackComponent={PageError}>
          <GitHubSuccess />
        </ErrorBoundary>
      ),
    },
    {
      path: "/auth/github/error",
      element: (
        <ErrorBoundary FallbackComponent={PageError}>
          <GitHubError />
        </ErrorBoundary>
      ),
    },
  ];

  const APP_HOMEPAGE_USER: AppRouteObject = {
    path: "/",
    element: (
      <MaintenanceGuard redirectUrl={MAIN_APP}>
        <ErrorBoundary FallbackComponent={PageError}>
          <UserLayout />
        </ErrorBoundary>
      </MaintenanceGuard>
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
        path: "new-courses",
        children: [
          { index: true, element: <NewCoursesPage /> },
          { path: ":id", element: <NewCoursesDetail /> },
        ],
      },
      {
        path: "market",
        children: [
          { index: true, element: <MarketPage /> },
          { path: ":id", element: <MarketDetail /> },
        ],
      },
      {
        path: "group-buy",
        children: [
          { index: true, element: <GroupBuyPage /> },
          { path: ":id", element: <GroupBuyDetail /> },
        ],
      },
      {
        path: "cart",
        children: [{ index: true, element: <CartPage /> }],
      },
      {
        path: "thanh-toan",
        children: [
          { index: true, element: <CheckoutPage /> },
          { path: "xac-nhan", element: <CheckoutConfirmPage /> },
          { path: "thanh-cong", element: <CheckoutSuccessPage /> },
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
      {
        path: "buy-course",
        children: [{ index: true, element: <BuyCourse /> }],
      },
      {
        path: "clear-cache",
        children: [{ index: true, element: <ClearCache /> }],
      },
    ],
  };

  const routes = [
    PUBLIC_ROUTE,
    RESET_PASSWORD_ROUTE,
    ...AUTH_ROUTES,
    APP_HOMEPAGE_USER,
    PROTECTED_ROUTE,
    ERROR_ROUTE,
    NO_MATCHED_ROUTE,
  ] as RouteObject[];

  const router = createBrowserRouter(routes);
  // thêm dấu # createHashRouter vd http://localhost:/#/3000/

  return <RouterProvider router={router} />;
}

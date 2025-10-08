// import { Suspense } from "react";
// import { Navigate, Outlet } from "react-router";

// import { Icon } from "@/components/icon";
// import { LineLoading } from "@/components/loading";

// import type { AppRouteObject } from "#/router";

// const management: AppRouteObject = {
//   order: 2,
//   path: "management",
//   element: (
//     <Suspense fallback={<LineLoading />}>
//       <Outlet />
//     </Suspense>
//   ),
//   meta: {
//     label: "sys.menu.management",
//     icon: (
//       <Icon
//         icon="local:ic-management"
//         className="ant-menu-item-icon"
//         size="24"
//       />
//     ),
//     key: "/management",
//   },
//   children: [
//     {
//       index: true,
//       element: <Navigate to="user" replace />,
//     },
//     {
//       path: "user",
//       meta: { label: "sys.menu.user.index", key: "/management/user" },
//       children: [
//         {
//           index: true,
//           element: <Navigate to="profile" replace />,
//         },
//       ],
//     },
//   ],
// };

// export default management;

// Bỏ check permission và trả về tất cả routes

import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router";

import { Icon } from "@/components/icon";
import { LineLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

// Lazy load components
const UserProfile = lazy(() => import("@/pages/management/user/profile"));
const ManagementCourses = lazy(
  () => import("@/pages/management/system/management-courses")
);
const CreatedCourses = lazy(
  () => import("@/pages/management/system/created-courses")
);
const SystemUser = lazy(() => import("@/pages/management/system/user"));
const Category = lazy(() => import("@/pages/management/system/category"));
const Teacher = lazy(() => import("@/pages/management/system/teacher"));

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
        {
          path: "profile",
          element: (
            <Suspense fallback={<LineLoading />}>
              <UserProfile />
            </Suspense>
          ),
          meta: {
            label: "sys.menu.user.profile",
            key: "/management/user/profile",
          },
        },
      ],
    },
    {
      path: "system",
      meta: { label: "sys.menu.system.index", key: "/management/system" },
      children: [
        {
          index: true,
          element: <Navigate to="management-courses" replace />,
        },
        {
          path: "management-courses",
          element: (
            <Suspense fallback={<LineLoading />}>
              <ManagementCourses />
            </Suspense>
          ),
          meta: {
            label: "Quản lý khóa học",
            key: "/management/system/management-courses",
          },
        },
        {
          path: "created-courses",
          element: (
            <Suspense fallback={<LineLoading />}>
              <CreatedCourses />
            </Suspense>
          ),
          meta: {
            label: "Tạo bài viết",
            key: "/management/system/created-courses",
          },
        },
        {
          path: "user",
          element: (
            <Suspense fallback={<LineLoading />}>
              <SystemUser />
            </Suspense>
          ),
          meta: {
            label: "sys.menu.system.user",
            key: "/management/system/user",
          },
        },
        {
          path: "category",
          element: (
            <Suspense fallback={<LineLoading />}>
              <Category />
            </Suspense>
          ),
          meta: { label: "Danh mục", key: "/management/system/category" },
        },
        {
          path: "teacher",
          element: (
            <Suspense fallback={<LineLoading />}>
              <Teacher />
            </Suspense>
          ),
          meta: {
            label: "Danh sách giảng viên",
            key: "/management/system/teacher",
          },
        },
      ],
    },
  ],
};

export default management;

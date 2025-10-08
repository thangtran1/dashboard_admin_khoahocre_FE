// import { Icon } from "@/components/icon";
// import { LineLoading } from "@/components/loading";
// import { Suspense } from "react";
// import { Outlet } from "react-router";
// import type { AppRouteObject } from "#/router";

// const chat: AppRouteObject = {
//   order: 3,
//   path: "chat",
//   element: (
//     <Suspense fallback={<LineLoading />}>
//       <Outlet />
//     </Suspense>
//   ),
//   meta: {
//     label: "sys.menu.chat",
//     icon: (
//       <Icon
//         icon="solar:widget-5-bold-duotone"
//         className="ant-menu-item-icon"
//         size="24"
//       />
//     ),
//     key: "/chat",
//   },
// };

// export default chat;

import { Icon } from "@/components/icon";
import { LineLoading } from "@/components/loading";
import { Suspense, lazy } from "react";
import { Outlet } from "react-router";
import type { AppRouteObject } from "#/router";

// Lazy load components
const ManagerChatUser = lazy(() => import("@/pages/chat/manager-chat-user"));

const chat: AppRouteObject = {
  order: 3,
  path: "chat",
  element: (
    <Suspense fallback={<LineLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: "sys.menu.chat",
    icon: (
      <Icon
        icon="solar:widget-5-bold-duotone"
        className="ant-menu-item-icon"
        size="24"
      />
    ),
    key: "/chat",
  },
  children: [
    {
      path: "manager-chat-user",
      element: (
        <Suspense fallback={<LineLoading />}>
          <ManagerChatUser />
        </Suspense>
      ),
      meta: {
        label: "sys.menu.manager-chat-user",
        key: "/chat/manager-chat-user",
      },
    },
  ],
};

export default chat;

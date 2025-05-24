// import useUserStore from "@/store/userStore";
import { faker } from "@faker-js/faker";

// import { BasicStatus, PermissionType } from "#/enum";

// const DASHBOARD_PERMISSION = {
//   id: "9100714781927703",
//   parentId: "",
//   label: "sys.menu.dashboard",
//   name: "Dashboard",
//   icon: "local:ic-analysis",
//   type: PermissionType.CATALOGUE,
//   route: "dashboard",
//   order: 1,
//   children: [
//     {
//       id: "8426999229400979",
//       parentId: "9100714781927703",
//       label: "sys.menu.workbench",
//       name: "Workbench",
//       type: PermissionType.MENU,
//       route: "workbench",
//       component: "/dashboard/workbench/index.tsx",
//     },
//     {
//       id: "9710971640510357",
//       parentId: "9100714781927703",
//       label: "sys.menu.analysis",
//       name: "Analysis",
//       type: PermissionType.MENU,
//       route: "analysis",
//       component: "/dashboard/analysis/index.tsx",
//     },
//   ],
// };

// const COMPONENTS_PERMISSION = {
//   id: "2271615060673773",
//   parentId: "",
//   label: "sys.menu.components",
//   name: "Components",
//   icon: "solar:widget-5-bold-duotone",
//   type: PermissionType.CATALOGUE,
//   route: "components",
//   order: 3,
//   children: [
//     {
//       id: "2501920741714350",
//       parentId: "2271615060673773",
//       label: "sys.menu.i18n",
//       name: "Multi Language",
//       type: PermissionType.MENU,
//       route: "i18n",
//       component: "/components/multi-language/index.tsx",
//     },
//     {
//       id: "7749726274771764",
//       parentId: "2271615060673773",
//       label: "sys.menu.chart",
//       name: "Chart",
//       type: PermissionType.MENU,
//       route: "chart",
//       component: "/components/chart/index.tsx",
//     },
//   ],
// };

// export const PERMISSION_LIST = [DASHBOARD_PERMISSION, COMPONENTS_PERMISSION];

// const ADMIN_ROLE = {
//   id: "4281707933534332",
//   name: "Admin",
//   label: "admin",
//   status: BasicStatus.ENABLE,
//   order: 1,
//   desc: "Super Admin",
//   permission: PERMISSION_LIST,
// };
// const TEST_ROLE = {
//   id: "9931665660771476",
//   name: "Test",
//   label: "test",
//   status: BasicStatus.ENABLE,
//   order: 2,
//   desc: "test",
//   permission: [DASHBOARD_PERMISSION, COMPONENTS_PERMISSION],
// };
// export const ROLE_LIST = [ADMIN_ROLE, TEST_ROLE];

export const DEFAULT_USER = {
  id: "b34719e1-ce46-457e-9575-99505ecee828",
  username: "admin",
  email: "admin@slash.com",
  avatar: faker.image.avatarGitHub(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.recent(),
  password: "demo1234",
  // role: ADMIN_ROLE,
  // permissions: ADMIN_ROLE.permission,
};
export const TEST_USER = {
  id: "efaa20ea-4dc5-47ee-a200-8a899be29494",
  username: "test",
  password: "demo1234",
  email: "test@slash.com",
  avatar: faker.image.avatarGitHub(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.recent(),
  // role: TEST_ROLE,
  // permissions: TEST_ROLE.permission,
};
export const USER_LIST = [DEFAULT_USER];

// if (import.meta.hot) {
//   import.meta.hot.accept((newModule) => {
//     if (!newModule) return;

//     const { DEFAULT_USER, TEST_USER, PERMISSION_LIST } = newModule;

//     const {
//       userInfo,
//       actions: { setUserInfo },
//     } = useUserStore.getState();

//     if (!userInfo?.username) return;

//     const newUserInfo =
//       userInfo.username === DEFAULT_USER.username ? DEFAULT_USER : TEST_USER;

//     setUserInfo(newUserInfo);
//   });
// }

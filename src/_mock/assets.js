import useUserStore from "@/store/userStore";
import { faker } from "@faker-js/faker";

import { BasicStatus, PermissionType } from "#/enum";

export const ORG_LIST = [
  {
    id: "1",
    name: "East China Branch",
    status: "enable",
    desc: faker.lorem.words(),
    order: 1,
    children: [
      {
        id: "1-1",
        name: "R&D Department",
        status: "disable",
        desc: "",
        order: 1,
      },
      {
        id: "1-2",
        name: "Marketing Department",
        status: "enable",
        desc: "",
        order: 2,
      },
      {
        id: "1-3",
        name: "Finance Department",
        status: "enable",
        desc: "",
        order: 3,
      },
    ],
  },
  {
    id: "2",
    name: "South China Branch",
    status: "enable",
    desc: faker.lorem.words(),
    order: 2,
    children: [
      {
        id: "2-1",
        name: "R&D Department",
        status: "disable",
        desc: "",
        order: 1,
      },
      {
        id: "2-2",
        name: "Marketing Department",
        status: "enable",
        desc: "",
        order: 2,
      },
      {
        id: "2-3",
        name: "Finance Department",
        status: "enable",
        desc: "",
        order: 3,
      },
    ],
  },
];

/**
 * User permission mock
 */
const DASHBOARD_PERMISSION = {
  id: "9100714781927703",
  parentId: "",
  label: "sys.menu.dashboard",
  name: "Dashboard",
  icon: "local:ic-analysis",
  type: PermissionType.CATALOGUE,
  route: "dashboard",
  order: 1,
  children: [
    {
      id: "8426999229400979",
      parentId: "9100714781927703",
      label: "sys.menu.workbench",
      name: "Workbench",
      type: PermissionType.MENU,
      route: "workbench",
      component: "/dashboard/workbench/index.tsx",
    },
    {
      id: "9710971640510357",
      parentId: "9100714781927703",
      label: "sys.menu.analysis",
      name: "Analysis",
      type: PermissionType.MENU,
      route: "analysis",
      component: "/dashboard/analysis/index.tsx",
    },
  ],
};
const MANAGEMENT_PERMISSION = {
  id: "0901673425580518",
  parentId: "",
  label: "sys.menu.management",
  name: "Management",
  icon: "local:ic-management",
  type: PermissionType.CATALOGUE,
  route: "management",
  order: 2,
  children: [
    {
      id: "2781684678535711",
      parentId: "0901673425580518",
      label: "sys.menu.user.index",
      name: "User",
      type: PermissionType.CATALOGUE,
      route: "user",
      children: [
        {
          id: "2516598794787938",
          parentId: "2781684678535711",
          label: "sys.menu.user.profile",
          name: "Profile",
          type: PermissionType.MENU,
          route: "profile",
          component: "/management/user/profile/index.tsx",
        },
      ],
    },
    {
      id: "0249937641030250",
      parentId: "0901673425580518",
      label: "sys.menu.system.index",
      name: "System",
      type: PermissionType.CATALOGUE,
      route: "system",
      children: [
        {
          id: "1689241785490759",
          parentId: "0249937641030250",
          label: "sys.menu.system.role",
          name: "Role",
          type: PermissionType.MENU,
          route: "role",
          component: "/management/system/role/index.tsx",
        },
        {
          id: "0157880245365433",
          parentId: "0249937641030250",
          label: "sys.menu.system.user",
          name: "User",
          type: PermissionType.MENU,
          route: "user",
          component: "/management/system/user/index.tsx",
        },
        {
          id: "0157880245365434",
          parentId: "0249937641030250",
          label: "sys.menu.system.user_detail",
          name: "User Detail",
          type: PermissionType.MENU,
          route: "user/:id",
          component: "/management/system/user/detail.tsx",
          hide: true,
        },
      ],
    },
  ],
};
const COMPONENTS_PERMISSION = {
  id: "2271615060673773",
  parentId: "",
  label: "sys.menu.components",
  name: "Components",
  icon: "solar:widget-5-bold-duotone",
  type: PermissionType.CATALOGUE,
  route: "components",
  order: 3,
  children: [
    {
      id: "2501920741714350",
      parentId: "2271615060673773",
      label: "sys.menu.i18n",
      name: "Multi Language",
      type: PermissionType.MENU,
      route: "i18n",
      component: "/components/multi-language/index.tsx",
    },
    {
      id: "7749726274771764",
      parentId: "2271615060673773",
      label: "sys.menu.chart",
      name: "Chart",
      type: PermissionType.MENU,
      route: "chart",
      component: "/components/chart/index.tsx",
    },
  ],
};

const MENU_LEVEL_PERMISSION = {
  id: "0194818428516575",
  parentId: "",
  label: "sys.menu.menulevel.index",
  name: "Menu Level",
  icon: "local:ic-menulevel",
  type: PermissionType.CATALOGUE,
  route: "menu-level",
  order: 5,
  children: [
    {
      id: "0144431332471389",
      parentId: "0194818428516575",
      label: "sys.menu.menulevel.1a",
      name: "Menu Level 1a",
      type: PermissionType.MENU,
      route: "menu-level-1a",
      component: "/menu-level/menu-level-1a/index.tsx",
    },
    {
      id: "7572529636800586",
      parentId: "0194818428516575",
      label: "sys.menu.menulevel.1b.index",
      name: "Menu Level 1b",
      type: PermissionType.CATALOGUE,
      route: "menu-level-1b",
      children: [
        {
          id: "3653745576583237",
          parentId: "7572529636800586",
          label: "sys.menu.menulevel.1b.2a",
          name: "Menu Level 2a",
          type: PermissionType.MENU,
          route: "menu-level-2a",
          component: "/menu-level/menu-level-1b/menu-level-2a/index.tsx",
        },
        {
          id: "4873136353891364",
          parentId: "7572529636800586",
          label: "sys.menu.menulevel.1b.2b.index",
          name: "Menu Level 2b",
          type: PermissionType.CATALOGUE,
          route: "menu-level-2b",
          children: [
            {
              id: "4233029726998055",
              parentId: "4873136353891364",
              label: "sys.menu.menulevel.1b.2b.3a",
              name: "Menu Level 3a",
              type: PermissionType.MENU,
              route: "menu-level-3a",
              component:
                "/menu-level/menu-level-1b/menu-level-2b/menu-level-3a/index.tsx",
            },
          ],
        },
      ],
    },
  ],
};
const ERRORS_PERMISSION = {
  id: "9406067785553476",
  parentId: "",
  label: "sys.menu.error.index",
  name: "Error",
  icon: "bxs:error-alt",
  type: PermissionType.CATALOGUE,
  route: "error",
  order: 6,
  children: [
    {
      id: "8557056851997154",
      parentId: "9406067785553476",
      label: "sys.menu.error.403",
      name: "403",
      type: PermissionType.MENU,
      route: "403",
      component: "/sys/error/Page403.tsx",
    },
    {
      id: "5095669208159005",
      parentId: "9406067785553476",
      label: "sys.menu.error.404",
      name: "404",
      type: PermissionType.MENU,
      route: "404",
      component: "/sys/error/Page404.tsx",
    },
    {
      id: "0225992135973772",
      parentId: "9406067785553476",
      label: "sys.menu.error.500",
      name: "500",
      type: PermissionType.MENU,
      route: "500",
      component: "/sys/error/Page500.tsx",
    },
  ],
};

export const PERMISSION_LIST = [
  DASHBOARD_PERMISSION,
  MANAGEMENT_PERMISSION,
  COMPONENTS_PERMISSION,
  MENU_LEVEL_PERMISSION,
  ERRORS_PERMISSION,
];

/**
 * User role mock
 */
const ADMIN_ROLE = {
  id: "4281707933534332",
  name: "Admin",
  label: "admin",
  status: BasicStatus.ENABLE,
  order: 1,
  desc: "Super Admin",
  permission: PERMISSION_LIST,
};
const TEST_ROLE = {
  id: "9931665660771476",
  name: "Test",
  label: "test",
  status: BasicStatus.ENABLE,
  order: 2,
  desc: "test",
  permission: [DASHBOARD_PERMISSION, COMPONENTS_PERMISSION],
};
export const ROLE_LIST = [ADMIN_ROLE, TEST_ROLE];

/**
 * User data mock
 */
export const DEFAULT_USER = {
  id: "b34719e1-ce46-457e-9575-99505ecee828",
  username: "admin",
  email: "admin@slash.com",
  avatar: faker.image.avatarGitHub(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.recent(),
  password: "demo1234",
  role: ADMIN_ROLE,
  permissions: ADMIN_ROLE.permission,
};
export const TEST_USER = {
  id: "efaa20ea-4dc5-47ee-a200-8a899be29494",
  username: "test",
  password: "demo1234",
  email: "test@slash.com",
  avatar: faker.image.avatarGitHub(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.recent(),
  role: TEST_ROLE,
  permissions: TEST_ROLE.permission,
};
export const USER_LIST = [DEFAULT_USER, TEST_USER];

if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    if (!newModule) return;

    const { DEFAULT_USER, TEST_USER, PERMISSION_LIST } = newModule;

    const {
      userInfo,
      actions: { setUserInfo },
    } = useUserStore.getState();

    if (!userInfo?.username) return;

    const newUserInfo =
      userInfo.username === DEFAULT_USER.username ? DEFAULT_USER : TEST_USER;

    setUserInfo(newUserInfo);

    console.log("[HMR] User permissions updated:", {
      username: newUserInfo.username,
      permissions: newUserInfo.permissions,
    });
  });
}

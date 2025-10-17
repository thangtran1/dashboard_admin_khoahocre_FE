import { Tabs } from "antd";
import { Card, CardContent, CardTitle } from "@/ui/card";
import { Separator } from "@/ui/separator";
import { Icon } from "@/components/icon";
import { useTranslation } from "react-i18next";

import { useUserTabs } from "./hooks/useUserTabs";
import { useUserManagement } from "./hooks/useUserManagement";
import ActiveUsersTab from "./components/ActiveUsersTab";
import DeletedUsersTab from "./components/DeletedUsersTab";

export default function UserManagement() {
  const { t } = useTranslation();
  const { activeTab, handleTabChange } = useUserTabs();

  // Get stats from active users hook
  const { stats } = useUserManagement(false);

  const tabItems = [
    {
      key: "active",
      label: (
        <span className="flex items-center gap-2">
          <Icon icon="lucide:users" className="h-4 w-4" />
          {t("sys.user-management.active-users-tab")}
        </span>
      ),
      children: <ActiveUsersTab />,
    },
    {
      key: "deleted",
      label: (
        <span className="flex items-center gap-2">
          <Icon icon="lucide:trash-2" className="h-4 w-4" />
          {t("sys.user-management.deleted-users-tab")}
        </span>
      ),
      children: <DeletedUsersTab />,
    },
  ];

  return (
    <div className="bg-card text-card-foreground px-6 flex flex-col gap-6 rounded-xl border shadow-sm">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex pt-4 items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Icon icon="lucide:users" className="h-7 w-7 text-primary" />
              {t("sys.user-management.title")}
            </CardTitle>
            <p className="text-muted-foreground mt-1">
              {t("sys.user-management.description")}
            </p>
          </div>
        </div>

        <Separator />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    {t("sys.user-management.total-users")}
                  </p>
                  <p className="text-2xl font-bold text-blue-900">
                    {stats.total}
                  </p>
                </div>
                <div className="p-2 bg-blue-500 rounded-full">
                  <Icon icon="lucide:users" className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-800">
                    {t("sys.user-management.active-users")}
                  </p>
                  <p className="text-2xl font-bold text-green-900">
                    {stats.active}
                  </p>
                </div>
                <div className="p-2 bg-green-500 rounded-full">
                  <Icon
                    icon="lucide:user-check"
                    className="h-5 w-5 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-800">
                    {t("sys.user-management.admin-users")}
                  </p>
                  <p className="text-2xl font-bold text-red-900">
                    {stats.admins}
                  </p>
                </div>
                <div className="p-2 bg-red-500 rounded-full">
                  <Icon icon="lucide:shield" className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-800">
                    {t("sys.user-management.new-users-this-month")}
                  </p>
                  <p className="text-2xl font-bold text-purple-900">
                    {stats.newUsersThisMonth}
                  </p>
                </div>
                <div className="p-2 bg-purple-500 rounded-full">
                  <Icon
                    icon="lucide:user-plus"
                    className="h-5 w-5 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs
          activeKey={activeTab}
          onChange={(key) => handleTabChange(key as "active" | "deleted")}
          items={tabItems}
          size="large"
          className="user-management-tabs"
        />
      </div>
    </div>
  );
}

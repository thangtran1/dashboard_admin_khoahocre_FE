import { Tabs, Button } from "antd";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { Card, CardContent, CardTitle } from "@/ui/card";
import { Separator } from "@/ui/separator";
import { Icon } from "@/components/icon";
import { useTranslation } from "react-i18next";
import { MaintenanceTabKey, useMaintenceTabs } from "./hooks/useMaintenceTabs";
import { useMaintence } from "./hooks/useMaintence";
import MaintenanceAllTab from "./components/MaintenanceAllTab";
import { Link } from "react-router";
import MaintenanceScheduledTab from "./components/MaintenanceScheduledTab";

export default function MaintenceSystemPage() {
  const { t } = useTranslation();
  const { activeTab, handleTabChange } = useMaintenceTabs();

  const { stats, refreshData, loading } = useMaintence(false);

  const tabItems = [
    {
      key: "all",
      label: (
        <span className="flex items-center gap-2">
          <Icon icon="lucide:list" className="h-4 w-4" />
          {t("sys.maintenance.maintenance-all")}
        </span>
      ),
      children: <MaintenanceAllTab />,
    },
    {
      key: "scheduled",
      label: (
        <span className="flex items-center gap-2">
          <Icon icon="lucide:calendar-clock" className="h-4 w-4" />
          {t("sys.maintenance.maintenance-scheduled")}
        </span>
      ),
      children: <MaintenanceScheduledTab />,
    },
  ];

  return (
    <div className="bg-card text-card-foreground px-6 flex flex-col gap-6 rounded-xl border shadow-sm">
      <div className="space-y-6">
        <div className="flex pt-4 items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Icon icon="lucide:wrench" className="h-7 w-7 text-primary" />
              {t("sys.maintenance.title")}
            </CardTitle>
            <p className="text-muted-foreground mt-1">
              {t("sys.maintenance.description")}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              color="cyan"
              variant="outlined"
              icon={<ReloadOutlined />}
              onClick={refreshData}
              size="large"
              loading={loading}
            >
              {t("sys.maintenance.refresh")}
            </Button>
            <Link to="/maintenance/created-new-maintenance">
              <Button
                type="primary"
                size="large"
                icon={<PlusOutlined />}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {t("sys.maintenance.add-maintenance")}
              </Button>
            </Link>
          </div>
        </div>

        <Separator />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    {t("sys.maintenance.total-maintenance")}
                  </p>
                  <p className="text-2xl font-bold text-blue-900">
                    {stats.total}
                  </p>
                </div>
                <div className="p-2 bg-blue-500 rounded-full">
                  <Icon icon="lucide:wrench" className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-cyan-800">
                    {t("sys.maintenance.scheduled-maintenance")}
                  </p>
                  <p className="text-2xl font-bold text-cyan-900">
                    {stats.scheduled}
                  </p>
                </div>
                <div className="p-2 bg-cyan-500 rounded-full">
                  <Icon
                    icon="lucide:calendar-clock"
                    className="h-5 w-5 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-800">
                    {t("sys.maintenance.in-progress-maintenance")}
                  </p>
                  <p className="text-2xl font-bold text-orange-900">
                    {stats.inProgress}
                  </p>
                </div>
                <div className="p-2 bg-orange-500 rounded-full">
                  <Icon icon="lucide:settings" className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-800">
                    {t("sys.maintenance.completed-maintenance")}
                  </p>
                  <p className="text-2xl font-bold text-green-900">
                    {stats.completed}
                  </p>
                </div>
                <div className="p-2 bg-green-500 rounded-full">
                  <Icon
                    icon="lucide:check-circle"
                    className="h-5 w-5 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-800">
                    {t("sys.maintenance.new-maintenance-this-month")}
                  </p>
                  <p className="text-2xl font-bold text-purple-900">
                    {stats.newThisMonth}
                  </p>
                </div>
                <div className="p-2 bg-purple-500 rounded-full">
                  <Icon
                    icon="lucide:plus-circle"
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
          onChange={(key) => handleTabChange(key as MaintenanceTabKey)}
          items={tabItems}
          size="large"
          className="maintenance-tabs"
        />
      </div>
    </div>
  );
}

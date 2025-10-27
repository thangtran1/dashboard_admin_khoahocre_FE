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

    const { refreshData, loading } = useMaintence(false);

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

        <Separator className="mb-0" />

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

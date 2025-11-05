import { Card, CardHeader, CardTitle } from "@/ui/card";
import ChartColumnStacked from "./view/chart-column-Stacked";
import ChartColumnMultiple from "./view/chart-column-multiple";
import MaintenanceChart from "../../dashboard/workbench/maintenance-chart";
import UserActivityChart from "../../dashboard/workbench/user-activity-chart";
import BannerChart from "../../dashboard/workbench/banner-chart";
import StatusUserChart from "../../dashboard/workbench/status-user-chart";
import ChartNotification from "./view/chart-notification";

export default function ChartPage() {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MaintenanceChart />
        <UserActivityChart />
        <BannerChart />
        <ChartColumnMultiple />
        <div className="col-span-1 md:col-span-2">
          <StatusUserChart />
        </div>
        <ChartNotification />

        <Card title="Column Stacked">
          <CardHeader>
            <CardTitle>Column Stacked</CardTitle>
          </CardHeader>
          <ChartColumnStacked />
        </Card>
      </div>
    </div>
  );
}

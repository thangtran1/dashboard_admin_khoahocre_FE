import BannerCard from "./banner-card";
import BannerChart from "../../components/chart/view/banner-chart";
import { Applications, Conversion } from "./conversion_applications";
import MaintenanceChart from "../../components/chart/view/maintenance-chart";
import UserActivityChart from "../../components/chart/view/user-activity-chart";
import StatusUserChart from "../../components/chart/view/status-user-chart";
import ChartColumnMultiple from "../../components/chart/view/chart-column-multiple";
import ChartNotification from "../../components/chart/view/chart-notification";
function Workbench() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="flex-1 md:flex-2">
          <BannerCard />
        </div>
        <div className="flex-1">
          <div className="flex flex-col justify-between h-full">
            <Conversion />
            <Applications />
          </div>
        </div>
      </div>
      <StatusUserChart />
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex-1">
        <BannerChart />
        </div>
        <div className="flex-1">
          <UserActivityChart />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex-1">
          <MaintenanceChart />
        </div>
        <div className="flex-1">
          <ChartColumnMultiple />
        </div>
      </div>
      <ChartNotification />
    </div>
  );
}

export default Workbench;

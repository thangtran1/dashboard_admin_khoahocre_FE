import BannerCard from "./banner-card";
import BannerChart from "./banner-chart";
import { Applications, Conversion } from "./conversion_applications";
import MaintenanceChart from "./maintenance-chart";
import UserActivityChart from "./user-activity-chart";
import StatusUserChart from "./status-user-chart";
import ChartColumnMultiple from "../../components/chart/view/chart-column-multiple";
function Workbench() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="flex-1 md:flex-2">
          <BannerCard />
        </div>
        <div className="flex-1">
          <div className="flex flex-col justify-between h-full gap-2">
            <Conversion />
            <Applications />
          </div>
        </div>
      </div>
      <StatusUserChart />
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex-1">
          <MaintenanceChart />
        </div>
        <div className="flex-1">
          <UserActivityChart />
        </div>
      </div>
      <div>
        <div className="flex-1">
          <BannerChart />
        </div>
      </div>
      <ChartColumnMultiple />
    </div>
  );
}

export default Workbench;

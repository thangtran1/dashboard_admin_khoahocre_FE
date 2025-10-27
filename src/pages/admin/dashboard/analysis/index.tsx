import glass_bag from "@/assets/images/glass/ic_glass_bag.png";
import glass_buy from "@/assets/images/glass/ic_glass_buy.png";
import glass_message from "@/assets/images/glass/ic_glass_message.png";
import glass_users from "@/assets/images/glass/ic_glass_users.png";
import { themeVars } from "@/theme/theme.css";
import AnalysisCard from "./analysis-card";

function Analysis() {
  return (
    <div className="bg-card text-card-foreground p-3 flex flex-col gap-6 rounded-xl border shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalysisCard
          cover={glass_bag}
          title="714k"
          subtitle="Weekly Sales"
          style={{
            color: themeVars.colors.palette.success.dark,
            backgroundColor: `rgba(${themeVars.colors.palette.success.defaultChannel} / .2)`,
          }}
        />
        <AnalysisCard
          cover={glass_users}
          title="1.35m"
          subtitle="New Users"
          style={{
            color: themeVars.colors.palette.info.dark,
            backgroundColor: `rgba(${themeVars.colors.palette.info.defaultChannel} / .2)`,
          }}
        />
        <AnalysisCard
          cover={glass_buy}
          title="1.72m"
          subtitle="New Orders"
          style={{
            color: themeVars.colors.palette.warning.dark,
            backgroundColor: `rgba(${themeVars.colors.palette.warning.defaultChannel} / .2)`,
          }}
        />
        <AnalysisCard
          cover={glass_message}
          title="234"
          subtitle="Bug Reports"
          style={{
            color: themeVars.colors.palette.error.dark,
            backgroundColor: `rgba(${themeVars.colors.palette.error.defaultChannel} / .2)`,
          }}
        />
      </div>
    </div>
  );
}

export default Analysis;

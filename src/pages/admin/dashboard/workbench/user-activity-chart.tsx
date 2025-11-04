import { useEffect, useState } from "react";
import { Chart, useChart } from "@/components/admin/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import {
  statsActivityLog,
  ActivityLogPeriod,
  ActivityLogStats,
} from "@/api/services/activity-logApi";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function UserActivityChart() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState<ActivityLogPeriod>(
    ActivityLogPeriod.WEEK
  );
  const [stats, setStats] = useState<ActivityLogStats>({
    labels: [],
    series: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await statsActivityLog.getActivityStats(period);
        let data = response;

        if (period === ActivityLogPeriod.DAY) {
          data.labels = data.labels.map((h) => `${h}h`);
        } else if (
          period === ActivityLogPeriod.WEEK ||
          period === ActivityLogPeriod.MONTH
        ) {
          data.labels = data.labels.map((d) => d);
        } else if (period === ActivityLogPeriod.YEAR) {
          data.labels = data.labels.map((y) => y);
        }

        setStats(data);
      } catch (error) {
        console.error("Error fetching activity stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [period]);

  return (
    <Card className="flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{t("sys.chart.user-activity")}</span>
          <Select
            onValueChange={(value) => setPeriod(value as ActivityLogPeriod)}
            defaultValue={period.toString()}
          >
            <SelectTrigger>
              <SelectValue defaultValue={period.toString()} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ActivityLogPeriod.DAY}>
                {t("sys.chart.day")}
              </SelectItem>
              <SelectItem value={ActivityLogPeriod.WEEK}>
                {t("sys.chart.week")}
              </SelectItem>
              <SelectItem value={ActivityLogPeriod.MONTH}>
                {t("sys.chart.month")}
              </SelectItem>
              <SelectItem value={ActivityLogPeriod.YEAR}>
                {t("sys.chart.year")}
              </SelectItem>
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        ) : (
          <ChartArea stats={stats} />
        )}
      </CardContent>
    </Card>
  );
}

function ChartArea({ stats }: { stats: ActivityLogStats }) {
  const { t } = useTranslation();
  const chartOptions = useChart({
    colors: ["#1890ff", "#ff4d4f"],
    xaxis: {
      type: "category",
      categories: stats.labels,
    },
    legend: {
      show: true,
      position: "top", // hoặc "bottom"
      markers: {
        strokeWidth: 2, // màu cho icon
        offsetX: -5, // 👈 khoảng cách giữa icon và chữ
      },
    },
  });

  return (
    <Chart
      type="area"
      series={stats.series.map((series, index) => ({
        name: index === 0 ? t("sys.chart.login") : t("sys.chart.logout"),
        data: series.data as number[],
      }))}
      options={chartOptions}
      height={300}
    />
  );
}

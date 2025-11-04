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
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  BannerStats,
  BannerStatsPeriod,
  statsBanner,
} from "@/api/services/bannerApi";

export default function BannerChart() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState<BannerStatsPeriod>(
    BannerStatsPeriod.WEEK
  );
  const [stats, setStats] = useState<BannerStats>({
    labels: [],
    series: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await statsBanner.getBannerStats(period);
        let data = response;

        // 🎯 Hiển thị label trực quan
        if (period === BannerStatsPeriod.DAY) {
          data.labels = data.labels.map((h) => `${h}h`);
        } else if (
          period === BannerStatsPeriod.WEEK ||
          period === BannerStatsPeriod.MONTH
        ) {
          data.labels = data.labels.map((d) => d);
        } else if (period === BannerStatsPeriod.YEAR) {
          data.labels = data.labels.map((y) => y);
        }

        setStats(data);
      } catch (error) {
        console.error("Error fetching banner stats:", error);
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
          <span>{t("sys.chart.banner-stats")}</span>
          <Select
            onValueChange={(value) => setPeriod(value as BannerStatsPeriod)}
            defaultValue={period.toString()}
          >
            <SelectTrigger>
              <SelectValue defaultValue={period.toString()} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={BannerStatsPeriod.DAY}>
                {t("sys.chart.day")}
              </SelectItem>
              <SelectItem value={BannerStatsPeriod.WEEK}>
                {t("sys.chart.week")}
              </SelectItem>
              <SelectItem value={BannerStatsPeriod.MONTH}>
                {t("sys.chart.month")}
              </SelectItem>
              <SelectItem value={BannerStatsPeriod.YEAR}>
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

// 🧭 Khu vực hiển thị biểu đồ
function ChartArea({ stats }: { stats: BannerStats }) {
  const { t } = useTranslation();
  const chartOptions = useChart({
    colors: ["#1890ff", "#52c41a", "#ff4d4f"],
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
      series={[
        {
          name: t("sys.chart.total-banner"),
          data: stats.series[0]?.data || [],
        },
        {
          name: t("sys.chart.active-banner"),
          data: stats.series[1]?.data || [],
        },
        {
          name: t("sys.chart.inactive-banner"),
          data: stats.series[2]?.data || [],
        },
      ]}
      options={chartOptions}
      height={300}
    />
  );
}

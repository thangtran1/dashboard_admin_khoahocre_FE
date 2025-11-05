import { useEffect, useState } from "react";
import { Chart, useChart } from "@/components/admin/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { useTranslation } from "react-i18next";
import { ResponseStats, statsMaintenance } from "@/api/services/chartApt";

export default function MaintenanceChart() {
  const { t } = useTranslation();
  const [stats, setStats] = useState<ResponseStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await statsMaintenance.getMaintenanceStats();
        setStats(response);
      } catch (error) {
        console.error("Error fetching maintenance stats:", error);
        setStats({ labels: [], series: [] });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("sys.chart.total-maintenance")}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-center text-muted">{t("sys.chart.loading")}</p>
        ) : stats && stats.series.length > 0 ? (
          <ChartDonut stats={stats} key={JSON.stringify(stats.series)} />
        ) : (
          <p className="text-center text-muted">{t("sys.chart.no-data")}</p>
        )}
      </CardContent>
    </Card>
  );
}

function ChartDonut({ stats }: { stats: ResponseStats }) {
  const { t, i18n } = useTranslation();

  const seriesValues = stats.series.slice(1).map((s) => s.data?.[0] ?? 0);

  const chartOptions = useChart({
    labels: [
      t("sys.chart.active-maintenance"),
      t("sys.chart.in_progress"),
      t("sys.chart.completed"),
      t("sys.chart.cancelled"),
      t("sys.chart.scheduled"),
    ],
    colors: ["#28C76F", "#FF7F50", "#FFC107", "#FF4D4F", "#FF7F50"],
    stroke: { show: false },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      markers: { strokeWidth: 2, offsetX: -5 },
    },
    tooltip: { fillSeriesColor: false },
    chart: { width: 240 },
    plotOptions: {
      pie: {
        donut: {
          size: "90%",
          labels: {
            total: {
              label: t("sys.chart.total"), // đổi ngôn ngữ
              formatter: () => {
                // sum
                return (stats.series[0]?.data?.[0] ?? 0).toString();
              },
              fontSize: "12px",
            },
            value: {
              fontSize: "18px",
              fontWeight: 700,
            },
          },
        },
      },
    },
  });

  return (
    <Chart
      key={i18n.language} // re-render khi đổi ngôn ngữ
      type="donut"
      series={seriesValues}
      options={chartOptions}
      height={360}
    />
  );
}

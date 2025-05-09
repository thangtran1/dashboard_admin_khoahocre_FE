import { Button } from "@/ui/button";
import { Card, CardHeader, CardTitle } from "@/ui/card";
import ChartArea from "./view/chart-area";
import ChartColumnStacked from "./view/chart-column-Stacked";
import ChartColumnMultiple from "./view/chart-column-multiple";
import ChartColumnNegative from "./view/chart-column-negative";
import ChartColumnSingle from "./view/chart-column-single";
import ChartDonut from "./view/chart-donut";
import ChartLine from "./view/chart-line";
import ChartRadial from "./view/chart-radial";

export default function ChartPage() {
  return (
    <>
      <Button variant="link" asChild>
        <a href="https://apexcharts.com" target="_blank" rel="noreferrer">
          https://apexcharts.com
        </a>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Area">
          <CardHeader>
            <CardTitle>Area</CardTitle>
          </CardHeader>
          <ChartArea />
        </Card>
        <Card title="Line">
          <CardHeader>
            <CardTitle>Line</CardTitle>
          </CardHeader>
          <ChartLine />
        </Card>
        <Card title="Column Single">
          <CardHeader>
            <CardTitle>Column Single</CardTitle>
          </CardHeader>
          <ChartColumnSingle />
        </Card>
        <Card title="Column Multiple">
          <CardHeader>
            <CardTitle>Column Multiple</CardTitle>
          </CardHeader>
          <ChartColumnMultiple />
        </Card>
        <Card title="Column Stacked">
          <CardHeader>
            <CardTitle>Column Stacked</CardTitle>
          </CardHeader>
          <ChartColumnStacked />
        </Card>
        <Card title="Column Negative">
          <CardHeader>
            <CardTitle>Column Negative</CardTitle>
          </CardHeader>
          <ChartColumnNegative />
        </Card>
        <Card title="Donut">
          <CardHeader>
            <CardTitle>Donut</CardTitle>
          </CardHeader>
          <ChartDonut />
        </Card>
        <Card title="Radial Bar">
          <CardHeader>
            <CardTitle>Radial Bar</CardTitle>
          </CardHeader>
          <ChartRadial />
        </Card>
      </div>
    </>
  );
}

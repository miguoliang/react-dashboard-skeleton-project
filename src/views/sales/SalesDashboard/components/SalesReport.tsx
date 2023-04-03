import React from "react";
import { Button, Card } from "components/ui";
import { Chart } from "components/shared";

const SalesReport = ({
  className,
  data = {
    series: [],
    categories: [],
  },
}: {
  className?: string;
  data: {
    series: number[];
    categories: string[];
  };
}) => {
  return (
    <Card className={className}>
      <div className="flex items-center justify-between">
        <h4>Sales Report</h4>
        <Button size="sm">Export Report</Button>
      </div>
      <Chart
        series={data.series}
        xAxis={data.categories}
        height="380px"
        customOptions={{ legend: { show: false } }}
      />
    </Card>
  );
};

export default SalesReport;

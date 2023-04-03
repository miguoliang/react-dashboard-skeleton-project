import React from "react";
import { Card } from "components/ui";
import { Chart } from "components/shared";
import { Overview as OverviewData } from "../../../../mock/data/cryptoData";

const Overview = ({
  data,
  className,
}: {
  data?: OverviewData;
  className?: string;
}) => {
  return (
    <Card className={className}>
      <h4>Statistic</h4>
      <div className="mt-4">
        {data && (
          <Chart series={data.series} xAxis={data.date} height="350px" />
        )}
      </div>
    </Card>
  );
};

export default Overview;

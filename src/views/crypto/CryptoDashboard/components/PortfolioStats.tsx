import React, { useState } from "react";
import { Card, Segment, SegmentItem } from "components/ui";
import { Chart } from "components/shared";
import NumberFormat from "react-number-format";
import isEmpty from "lodash/isEmpty";
import { cryptoDashboardData } from "../../../../mock/data/cryptoData";

const PortfolioStats = ({
  data,
  className,
}: {
  data: (typeof cryptoDashboardData)["portfolioStatsData"];
  className?: string;
}) => {
  const [timeRange, setTimeRange] = useState<string[]>(["month"]);

  return (
    <Card className={className}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <p>Portfolio Balance</p>
          <h4 className="font-bold">
            {!isEmpty(data) && (
              <NumberFormat
                displayType="text"
                value={
                  data[timeRange[0]].series[0].data[
                    data[timeRange[0]].series[0].data.length - 1
                  ]
                }
                prefix="$"
                thousandSeparator
              />
            )}
          </h4>
        </div>
        <Segment
          value={timeRange}
          onChange={(val: string[]) => setTimeRange(val)}
          size="sm"
        >
          <SegmentItem value="week">Week</SegmentItem>
          <SegmentItem value="month">Month</SegmentItem>
          <SegmentItem value="year">Year</SegmentItem>
        </Segment>
      </div>
      {!isEmpty(data) && (
        <Chart
          series={data[timeRange[0]].series}
          xAxis={data[timeRange[0]].timeRange}
          height="350px"
          customOptions={{ legend: { show: false } }}
        />
      )}
    </Card>
  );
};

export default PortfolioStats;

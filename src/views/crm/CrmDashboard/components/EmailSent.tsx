import React from "react";
import { Card, Progress } from "components/ui";

const ProgressInfo = ({ percent }: { percent: number }) => {
  return (
    <div>
      <h3 className="font-bold">{percent}%</h3>
      <p>Opened</p>
    </div>
  );
};

const EmailSent = ({
  data = { percent: 0 },
  className,
}: {
  data: { percent: number };
  className?: string;
}) => {
  return (
    <Card className={className}>
      <h4>Email Sent</h4>
      <div className="mt-6">
        <Progress
          variant="circle"
          percent={data.percent}
          width={200}
          className="flex justify-center"
          strokeWidth={4}
          customInfo={<ProgressInfo percent={data.percent} />}
        />
      </div>
      <div className="text-center mt-6">
        <p className="font-semibold">Performance</p>
        <h4 className="font-bold">Average</h4>
      </div>
    </Card>
  );
};

export default EmailSent;

import React from "react";
import { Button, Card, TimeLine, TimeLineItem } from "components/ui";
import { useNavigate } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import TimelineAvatar from "views/account/ActivityLog/components/TimelineAvatar";
import Event from "views/account/ActivityLog/components/Event";
import { LogEvent } from "../../../../mock/data/accountData";

const Activities = ({ data }: { data: LogEvent[] }) => {
  const navigate = useNavigate();

  const onViewAllActivity = () => {
    navigate("/app/account/activity-log");
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h4>Activities</h4>
        <Button onClick={onViewAllActivity} size="sm">
          View All
        </Button>
      </div>
      <div className="mt-6">
        <TimeLine>
          {isEmpty(data) ? (
            <TimeLineItem>No Activities</TimeLineItem>
          ) : (
            data.map((event, index) => (
              <TimeLineItem
                key={event.type + index}
                media={<TimelineAvatar data={event} />}
              >
                <Event compact data={event} />
              </TimeLineItem>
            ))
          )}
        </TimeLine>
      </div>
    </Card>
  );
};

export default Activities;

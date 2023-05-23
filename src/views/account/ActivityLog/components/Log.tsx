import React, { useEffect } from "react";
import { Button, TimeLine, TimeLineItem } from "components/ui";
import { Loading } from "components/shared";
import Event from "./Event";
import TimelineAvatar from "./TimelineAvatar";
import { filterLogs, getLogs, setActivityIndex } from "../store/dataSlice";
import isEmpty from "lodash/isEmpty";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { Log as LogData } from "../../../../mock/data/accountData";

const Log = () => {
  const dispatch = useAppDispatch();
  const logs = useAppSelector((state) => state.accountActivityLog.data.logs);
  const loading = useAppSelector(
    (state) => state.accountActivityLog.data.loading,
  );
  const loadMoreLoading = useAppSelector(
    (state) => state.accountActivityLog.data.loadMoreLoading,
  );
  const loadable = useAppSelector(
    (state) => state.accountActivityLog.data.loadable,
  );
  const selectedType = useAppSelector(
    (state) => state.accountActivityLog.state.selectedType,
  );
  const activityIndex = useAppSelector(
    (state) => state.accountActivityLog.data.activityIndex,
  );

  useEffect(() => {
    dispatch(filterLogs({ filter: selectedType, activityIndex }));
  }, []);

  const onLoadMore = () => {
    const nextIndex = activityIndex + 1;
    dispatch(setActivityIndex(nextIndex));
    dispatch(getLogs({ filter: selectedType, activityIndex: nextIndex }));
  };

  return (
    <Loading loading={loading}>
      <div className="max-w-[900px]">
        {logs.map((log: LogData) => (
          <div className="mb-8" key={log.id}>
            <div className="mb-4 font-semibold uppercase">
              {dayjs.unix(log.date).format("dddd, DD MMMM")}
            </div>
            <TimeLine>
              {isEmpty(log.events) ? (
                <TimeLineItem>No Activities</TimeLineItem>
              ) : (
                log.events.map((event, index) => (
                  <TimeLineItem
                    key={event.type + index}
                    media={<TimelineAvatar data={event} />}
                  >
                    <div className="mt-1">
                      <Event data={event} />
                    </div>
                  </TimeLineItem>
                ))
              )}
            </TimeLine>
          </div>
        ))}
        <div className="text-center">
          {loadable ? (
            <Button loading={loadMoreLoading} onClick={onLoadMore}>
              Load More
            </Button>
          ) : (
            "No more activity to load"
          )}
        </div>
      </div>
    </Loading>
  );
};

export default Log;

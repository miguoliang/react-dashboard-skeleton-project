import React from "react";
import { TabList, TabNav, Tabs } from "components/ui";
import { labelList } from "./utils";
import { setSelectedTab } from "./store/stateSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";

const QuickFilterTab = () => {
  const dispatch = useAppDispatch();

  const selectedTab = useAppSelector(
    (state) => state.scrumBoard.state.selectedTab
  );

  const handleTabChange = (val: string) => {
    dispatch(setSelectedTab(val));
  };

  return (
    <Tabs value={selectedTab} variant="pill" onChange={handleTabChange}>
      <TabList>
        <TabNav value="All">All</TabNav>
        {labelList.map((tab, index) => (
          <TabNav key={`${tab}-${index}`} value={tab}>
            {tab}
          </TabNav>
        ))}
      </TabList>
    </Tabs>
  );
};

export default QuickFilterTab;

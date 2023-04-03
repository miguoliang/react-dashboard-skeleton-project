import React, { useEffect, useRef } from "react";
import { TabContent, TabList, TabNav, Tabs } from "components/ui";
import { AdaptableCard } from "components/shared";
import {
  getMarketData,
  initialTableData,
  setMarketData,
  setSelectedTab,
  setTableData,
} from "./store/dataSlice";
import reducer from "./store";
import { injectReducer } from "store/index";
import cloneDeep from "lodash/cloneDeep";
import AllTable from "./components/AllTable";
import SpotTable from "./components/SpotTable";
import FuturesTable from "./components/FuturesTable";
import TradeDialog from "./components/TradeDialog";
import QueryInput from "./components/QueryInput";
import { useAppDispatch, useAppSelector } from "store/hooks";

injectReducer("cryptoMarket", reducer);

const Market = () => {
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const data = useAppSelector((state) => state.cryptoMarket.data.marketData);

  const loading = useAppSelector((state) => state.cryptoMarket.data.loading);

  const selectedTab = useAppSelector(
    (state) => state.cryptoMarket.data.selectedTab
  );

  const tableData = useAppSelector(
    (state) => state.cryptoMarket.data.tableData
  );

  useEffect(() => {
    fetchData();
  }, [dispatch, selectedTab, tableData]);

  const fetchData = () => {
    dispatch(getMarketData({ tab: selectedTab, ...tableData }));
  };

  const handleTabChange = (val: string) => {
    dispatch(setMarketData([]));
    dispatch(setSelectedTab(val));
    dispatch(setTableData(initialTableData));
  };

  const handleInputChange = (val: string) => {
    const newTableData = cloneDeep(tableData);
    newTableData.query = val;
    newTableData.pageIndex = 1;
    if (typeof val === "string" && val.length > 1) {
      dispatch(setTableData(newTableData));
    }

    if (typeof val === "string" && val.length === 0) {
      dispatch(setTableData(newTableData));
    }
  };

  return (
    <>
      <AdaptableCard>
        <Tabs value={selectedTab} variant="pill" onChange={handleTabChange}>
          <div className="flex lg:items-center justify-between flex-col lg:flex-row gap-4">
            <TabList>
              <TabNav value="all">All</TabNav>
              <TabNav value="spot">Spot</TabNav>
              <TabNav value="futures">Futures</TabNav>
            </TabList>
            <QueryInput ref={inputRef} onInputChange={handleInputChange} />
          </div>
          <div className="mt-4">
            <TabContent value="all">
              <AllTable {...{ data, loading, tableData }} />
            </TabContent>
            <TabContent value="spot">
              <SpotTable {...{ data, loading, tableData }} />
            </TabContent>
            <TabContent value="futures">
              <FuturesTable {...{ data, loading, tableData }} />
            </TabContent>
          </div>
        </Tabs>
      </AdaptableCard>
      <TradeDialog />
    </>
  );
};

export default Market;

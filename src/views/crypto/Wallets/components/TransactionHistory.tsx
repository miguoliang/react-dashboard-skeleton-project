import React, { useEffect } from "react";
import {
  getTransactionHistoryData,
  initialTableData,
  setSelectedTab,
  setTableData,
  setTransactionHistoryData,
} from "../store/dataSlice";
import { Card, TabContent, TabList, TabNav, Tabs } from "components/ui";
import OrderTable from "./OrderTable";
import DepositWithdrawalTable from "./DepositWithdrawalTable";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { SortingState } from "@tanstack/react-table";

const TransactionHistory = () => {
  const dispatch = useAppDispatch();

  const data = useAppSelector(
    (state) => state.cryptoWallets.data.transactionHistoryData
  );

  const loading = useAppSelector(
    (state) => state.cryptoWallets.data.transactionHistoryLoading
  );

  const selectedTab = useAppSelector(
    (state) => state.cryptoWallets.data.selectedTab
  );

  const tableData = useAppSelector(
    (state) => state.cryptoWallets.data.tableData
  ) as {
    pageIndex: number;
    pageSize: number;
    sort: SortingState;
    total: number;
  };

  useEffect(() => {
    dispatch(getTransactionHistoryData({ tab: selectedTab, ...tableData }));
  }, [dispatch, selectedTab, tableData]);

  const handleTabChange = (val: string) => {
    dispatch(setTransactionHistoryData([]));
    dispatch(setSelectedTab(val));
    dispatch(setTableData(initialTableData));
  };

  return (
    <Card>
      <h4 className="mb-4">Transaction History</h4>
      <Tabs value={selectedTab} variant="pill" onChange={handleTabChange}>
        <TabList>
          <TabNav value="trade">Trade</TabNav>
          <TabNav value="deposit">Deposit</TabNav>
          <TabNav value="withdraw">Withdraw</TabNav>
        </TabList>
        <div className="mt-4">
          <TabContent value="trade">
            <OrderTable data={data} loading={loading} pagingData={tableData} />
          </TabContent>
          <TabContent value="deposit">
            <DepositWithdrawalTable
              data={data}
              loading={loading}
              pagingData={tableData}
            />
          </TabContent>
          <TabContent value="withdraw">
            <DepositWithdrawalTable
              data={data}
              loading={loading}
              pagingData={tableData}
            />
          </TabContent>
        </div>
      </Tabs>
    </Card>
  );
};

export default TransactionHistory;

import React from "react";
import { TabContent, TabList, TabNav, Tabs } from "components/ui";
import BuyForm from "./BuyForm";
import SellForm from "./SellForm";

const TradeForm = (props: {
  onSell: (values: any, setSubmitting: (v: boolean) => void) => void;
  onBuy: (values: any, setSubmitting: (v: boolean) => void) => void;
  amount: number;
  symbol: string;
}) => {
  return (
    <Tabs defaultValue="buy">
      <TabList>
        <TabNav value="buy">Buy</TabNav>
        <TabNav value="sell">Sell</TabNav>
      </TabList>
      <div className="py-6">
        <TabContent value="buy">
          <BuyForm {...props} />
        </TabContent>
        <TabContent value="sell">
          <SellForm {...props} />
        </TabContent>
      </div>
    </Tabs>
  );
};

export default TradeForm;

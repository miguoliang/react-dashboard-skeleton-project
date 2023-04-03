import React, { useState } from "react";
import { Dialog } from "components/ui";
import { setSelectedRow, toggleTradeDialog } from "../store/stateSlice";
import TradeForm from "views/crypto/TradeForm";
import ProceedTrade from "views/crypto/ProceedTrade";
import isEmpty from "lodash/isEmpty";
import { useAppDispatch, useAppSelector } from "store/hooks";

const TradeDialog = () => {
  const dispatch = useAppDispatch();

  const tradeDialogOpen = useAppSelector(
    (state) => state.cryptoMarket.state.tradeDialogOpen,
  );
  const selectedRow = useAppSelector(
    (state) => state.cryptoMarket.state.selectedRow,
  );

  const [showProceed, setShowProceed] = useState({});
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [status, setStatus] = useState("");

  const onDialogClose = () => {
    dispatch(toggleTradeDialog(false));
    setTimeout(() => {
      dispatch(setSelectedRow({}));
      setShowProceed({});
      setConfirmLoading(false);
      setStatus("");
    }, 500);
  };

  const handleTrade = (
    values: any,
    setSubmitting: (v: boolean) => void,
    trade: string,
  ) => {
    setSubmitting(true);
    setTimeout(() => {
      setShowProceed({ ...values, type: trade });
      setConfirmLoading(false);
      setStatus("");
    }, 500);
  };

  const handleConfirm = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setStatus("SUCCESS");
    }, 1000);
  };

  return (
    <Dialog
      isOpen={tradeDialogOpen}
      onRequestClose={onDialogClose}
      onClose={onDialogClose}
      closable={!status}
      width={400}
    >
      <h5 className="mb-4">
        {isEmpty(showProceed) && !status && `Trade ${selectedRow.symbol}`}
        {!isEmpty(showProceed) && !status && "Order preview"}
      </h5>
      {isEmpty(showProceed) ? (
        <TradeForm
          amount={selectedRow.price}
          symbol={selectedRow.symbol}
          onBuy={(values, setSubmitting) =>
            handleTrade(values, setSubmitting, "BUY")
          }
          onSell={(values, setSubmitting) =>
            handleTrade(values, setSubmitting, "SELL")
          }
        />
      ) : (
        <ProceedTrade
          onConfirm={handleConfirm}
          loading={confirmLoading}
          status={status}
          {...showProceed}
        />
      )}
    </Dialog>
  );
};

export default TradeDialog;

import React, { useState } from "react";
import { Card, Dialog } from "components/ui";
import TradeForm from "views/crypto/TradeForm";
import ProceedTrade from "views/crypto/ProceedTrade";
import { toggleTradeDialog } from "../store/stateSlice";
import isEmpty from "lodash/isEmpty";
import { useAppDispatch, useAppSelector } from "store/hooks";

const FastTrade = ({ className }: { className?: string }) => {
  const dispatch = useAppDispatch();

  const tradeDialogOpen = useAppSelector(
    (state) => state.cryptoDashboard.state.tradeDialogOpen
  );

  const [status, setStatus] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [showProceed, setShowProceed] = useState({});

  const handleTrade = (
    values: any,
    setSubmitting: (_: boolean) => void,
    trade: string
  ) => {
    setTimeout(() => {
      setSubmitting(false);
      dispatch(toggleTradeDialog(true));
      setShowProceed({ ...values, type: trade });
      setConfirmLoading(false);
      setStatus("");
    }, 500);
  };

  const onDialogClose = () => {
    dispatch(toggleTradeDialog(false));
    setTimeout(() => {
      setShowProceed({});
      setConfirmLoading(false);
      setStatus("");
    }, 300);
  };

  const handleConfirm = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setStatus("SUCCESS");
    }, 1000);
  };

  return (
    <>
      <Card className={className}>
        <TradeForm
          amount={29877.3}
          symbol="BTC"
          onBuy={(values: any, setSubmitting: (_: boolean) => void) =>
            handleTrade(values, setSubmitting, "BUY")
          }
          onSell={(values: any, setSubmitting: (_: boolean) => void) =>
            handleTrade(values, setSubmitting, "SELL")
          }
        />
      </Card>
      <Dialog
        isOpen={tradeDialogOpen}
        onRequestClose={onDialogClose}
        onClose={onDialogClose}
        width={400}
      >
        <h5 className="mb-4">
          {!isEmpty(showProceed) && !status && "Order preview"}
        </h5>
        {!isEmpty(showProceed) && (
          <ProceedTrade
            onConfirm={handleConfirm}
            loading={confirmLoading}
            status={status}
            {...showProceed}
          />
        )}
      </Dialog>
    </>
  );
};

export default FastTrade;

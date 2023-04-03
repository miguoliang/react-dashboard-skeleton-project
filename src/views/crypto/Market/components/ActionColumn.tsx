import React, { useCallback } from "react";
import { Button } from "components/ui";
import { setSelectedRow, toggleTradeDialog } from "../store/stateSlice";
import { useAppDispatch } from "store/hooks";

const ActionColumn = ({ row }: { row: any }) => {
  const dispatch = useAppDispatch();

  const onTrade = useCallback(() => {
    dispatch(toggleTradeDialog(true));
    dispatch(setSelectedRow(row));
  }, [dispatch, row]);

  return (
    <div className="ltr:text-right rtl:text-left">
      <Button size="sm" onClick={onTrade}>
        Trade
      </Button>
    </div>
  );
};

export default ActionColumn;

import React from "react";
import { Notification, toast } from "components/ui";
import { ConfirmDialog } from "components/shared";
import {
  setDeleteMode,
  setSelectedRow,
  setSelectedRows,
} from "../store/stateSlice";
import { deleteOrders, getOrders } from "../store/dataSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";

const OrderDeleteConfirmation = () => {
  const dispatch = useAppDispatch();
  const selectedRows = useAppSelector(
    (state) => state.salesOrderList.state.selectedRows
  );
  const selectedRow = useAppSelector(
    (state) => state.salesOrderList.state.selectedRow
  );
  const deleteMode = useAppSelector(
    (state) => state.salesOrderList.state.deleteMode
  );
  const tableData = useAppSelector(
    (state) => state.salesOrderList.data.tableData
  );

  const onDialogClose = () => {
    dispatch(setDeleteMode(""));

    if (deleteMode === "single") {
      dispatch(setSelectedRow([]));
    }
  };

  const onDelete = async () => {
    dispatch(setDeleteMode(""));

    if (deleteMode === "single") {
      const success = await deleteOrders({ id: selectedRow });
      deleteSucceed(success as boolean, 1);
      dispatch(setSelectedRow([]));
    }

    if (deleteMode === "batch") {
      const success = await deleteOrders({ id: selectedRows });
      deleteSucceed(success as boolean, selectedRows.length);
      dispatch(setSelectedRows([]));
    }
  };

  const deleteSucceed = (success: boolean, orders: number) => {
    if (success) {
      dispatch(getOrders(tableData));
      toast.push(
        <Notification
          title={"Successfuly Deleted"}
          type="success"
          duration={2500}
        >
          {deleteMode === "single" && "Order "}
          {deleteMode === "batch" && `${orders} orders `}
          successfuly deleted
        </Notification>,
        {
          placement: "top-center",
        }
      );
    }
  };

  return (
    <ConfirmDialog
      isOpen={deleteMode === "single" || deleteMode === "batch"}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      type="danger"
      title="Delete product"
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmButtonColor="red-600"
    >
      <p>
        Are you sure you want to delete this order? All record related to this
        order will be deleted as well. This action cannot be undone.
      </p>
    </ConfirmDialog>
  );
};

export default OrderDeleteConfirmation;

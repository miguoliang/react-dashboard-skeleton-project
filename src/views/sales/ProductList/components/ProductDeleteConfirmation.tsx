import React from "react";
import { Notification, toast } from "components/ui";
import { ConfirmDialog } from "components/shared";
import { toggleDeleteConfirmation } from "../store/stateSlice";
import { deleteProduct, getProducts } from "../store/dataSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";

const ProductDeleteConfirmation = () => {
  const dispatch = useAppDispatch();
  const dialogOpen = useAppSelector(
    (state) => state.salesProductList.state.deleteConfirmation,
  );
  const selectedProduct = useAppSelector(
    (state) => state.salesProductList.state.selectedProduct,
  );
  const tableData = useAppSelector(
    (state) => state.salesProductList.data.tableData,
  );

  const onDialogClose = () => {
    dispatch(toggleDeleteConfirmation(false));
  };

  const onDelete = async () => {
    dispatch(toggleDeleteConfirmation(false));
    await deleteProduct({ id: selectedProduct });

    dispatch(getProducts(tableData));
    toast.push(
      <Notification
        title={"Successfuly Deleted"}
        type="success"
        duration={2500}
      >
        Product successfuly deleted
      </Notification>,
      {
        placement: "top-center",
      },
    );
  };

  return (
    <ConfirmDialog
      isOpen={dialogOpen}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      type="danger"
      title="Delete product"
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmButtonColor="red-600"
    >
      <p>
        Are you sure you want to delete this product? All record related to this
        product will be deleted as well. This action cannot be undone.
      </p>
    </ConfirmDialog>
  );
};

export default ProductDeleteConfirmation;

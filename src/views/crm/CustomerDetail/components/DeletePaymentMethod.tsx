import React from "react";
import { updatePaymentMethodData } from "../store/dataSlice";
import { closeDeletePaymentMethodDialog } from "../store/stateSlice";
import cloneDeep from "lodash/cloneDeep";
import { ConfirmDialog } from "components/shared";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { PaymentMethod } from "../../../../mock/data/usersData";

const DeletePaymentMethod = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(
    (state) => state.crmCustomerDetails.data.paymentMethodData
  );
  const dialogOpen = useAppSelector(
    (state) => state.crmCustomerDetails.state.deletePaymentMethodDialog
  );
  const selectedCard = useAppSelector(
    (state) => state.crmCustomerDetails.state.selectedCard
  );

  const onDelete = () => {
    let newData = cloneDeep(data);
    newData = newData.filter(
      (payment: PaymentMethod) =>
        payment.last4Number !== selectedCard.last4Number
    );
    dispatch(closeDeletePaymentMethodDialog());
    dispatch(updatePaymentMethodData(newData));
  };

  const onDialogClose = () => {
    dispatch(closeDeletePaymentMethodDialog());
  };

  return (
    <ConfirmDialog
      isOpen={dialogOpen}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      type="danger"
      title="Remove payment method"
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmButtonColor="red-600"
    >
      <p> Are you sure you want to remove this payment method? </p>
    </ConfirmDialog>
  );
};

export default DeletePaymentMethod;

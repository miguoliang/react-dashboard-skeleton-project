import React, { useRef } from "react";
import { Button, Drawer } from "components/ui";
import CustomerEditContent from "./CustomerEditContent";
import { setDrawerClose, setSelectedCustomer } from "../store/stateSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { FormikProps } from "formik";

const DrawerFooter = ({
  onSaveClick,
  onCancel,
}: {
  onSaveClick: () => void;
  onCancel: () => void;
}) => {
  return (
    <div className="text-right w-full">
      <Button size="sm" className="mr-2" onClick={onCancel}>
        Cancel
      </Button>
      <Button size="sm" variant="solid" onClick={onSaveClick}>
        Save
      </Button>
    </div>
  );
};

const CustomerEditDialog = () => {
  const dispatch = useAppDispatch();
  const drawerOpen = useAppSelector(
    (state) => state.crmCustomers.state.drawerOpen
  );

  const onDrawerClose = () => {
    dispatch(setDrawerClose());
    dispatch(setSelectedCustomer({}));
  };

  const formikRef = useRef<FormikProps<any>>(null);

  const formSubmit = () => {
    formikRef.current?.submitForm();
  };

  return (
    <Drawer
      isOpen={drawerOpen}
      onClose={onDrawerClose}
      onRequestClose={onDrawerClose}
      closable={false}
      bodyClass="p-0"
      footer={
        <DrawerFooter onCancel={onDrawerClose} onSaveClick={formSubmit} />
      }
    >
      <CustomerEditContent ref={formikRef} />
    </Drawer>
  );
};

export default CustomerEditDialog;

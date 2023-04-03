import React, { useRef } from "react";
import { Button, Drawer } from "components/ui";
import { closeEditCustomerDetailDialog } from "../store/stateSlice";
import { putCustomer, updateProfileData } from "../store/dataSlice";
import CustomerForm from "views/crm/CustomerForm";
import cloneDeep from "lodash/cloneDeep";
import dayjs from "dayjs";
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

const EditCustomerProfile = () => {
  const dispatch = useAppDispatch();

  const formikRef = useRef<FormikProps<any>>(null);

  const dialogOpen = useAppSelector(
    (state) => state.crmCustomerDetails.state.editCustomerDetailDialog
  );
  const customer = useAppSelector(
    (state) => state.crmCustomerDetails.data.profileData
  );

  const onDrawerClose = () => {
    dispatch(closeEditCustomerDetailDialog());
  };

  const formSubmit = () => {
    formikRef.current?.submitForm();
  };

  const onFormSubmit = (values: any) => {
    const clonedData = cloneDeep(customer);
    const {
      name,
      birthday,
      email,
      img,
      location,
      title,
      phoneNumber,
      facebook,
      twitter,
      pinterest,
      linkedIn,
    } = values;

    const basicInfo = { name, email, img };
    const personalInfo = {
      location,
      title,
      birthday: dayjs(birthday).format("DD/MM/YYYY"),
      phoneNumber,
      facebook,
      twitter,
      pinterest,
      linkedIn,
    };
    clonedData.personalInfo = {
      ...clonedData.personalInfo,
      ...personalInfo,
    };
    const newData = { ...clonedData, ...basicInfo };
    dispatch(updateProfileData(newData));
    dispatch(putCustomer(newData));
    onDrawerClose();
  };

  return (
    <Drawer
      isOpen={dialogOpen}
      onClose={onDrawerClose}
      onRequestClose={onDrawerClose}
      closable={false}
      bodyClass="p-0"
      footer={
        <DrawerFooter onCancel={onDrawerClose} onSaveClick={formSubmit} />
      }
    >
      <CustomerForm
        ref={formikRef}
        onFormSubmit={onFormSubmit}
        customer={customer}
      />
    </Drawer>
  );
};

export default EditCustomerProfile;

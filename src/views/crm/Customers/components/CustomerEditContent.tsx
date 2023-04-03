import React, { forwardRef } from "react";
import { putCustomer, setCustomerList } from "../store/dataSlice";
import { setDrawerClose } from "../store/stateSlice";
import cloneDeep from "lodash/cloneDeep";
import isEmpty from "lodash/isEmpty";
import CustomerForm from "views/crm/CustomerForm";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { FormikProps } from "formik";
import { UserDetail } from "mock/data/usersData";

const CustomerEditContent = forwardRef<FormikProps<any>, {}>((_, ref) => {
  const dispatch = useAppDispatch();

  const customer = useAppSelector(
    (state) => state.crmCustomers.state.selectedCustomer
  );
  const data = useAppSelector((state) => state.crmCustomers.data.customerList);
  const { id } = customer;

  const onFormSubmit = (values: any) => {
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
    let newData = cloneDeep(data);
    let editedCustomer;
    newData = newData.map((elm: UserDetail) => {
      if (elm.id === id) {
        elm = { ...elm, ...basicInfo };
        elm.personalInfo = { ...elm.personalInfo, ...personalInfo };
        editedCustomer = elm;
      }
      return elm;
    });
    if (!isEmpty(editedCustomer)) {
      console.log("editedCustomer", editedCustomer);
      typeof editedCustomer !== "undefined" &&
        dispatch(putCustomer(editedCustomer));
    }
    dispatch(setDrawerClose());
    dispatch(setCustomerList(newData));
  };

  return (
    <CustomerForm ref={ref} onFormSubmit={onFormSubmit} customer={customer} />
  );
});

export default CustomerEditContent;

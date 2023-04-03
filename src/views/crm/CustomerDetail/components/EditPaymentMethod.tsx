import React from "react";
import { Button, Dialog, FormContainer, FormItem, Input } from "components/ui";
import { Field, FieldInputProps, Form, Formik, FormikProps } from "formik";
import { updatePaymentMethodData } from "../store/dataSlice";
import { closeEditPaymentMethodDialog } from "../store/stateSlice";
import cloneDeep from "lodash/cloneDeep";
import { FormNumericInput } from "components/shared";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { PaymentMethod } from "../../../../mock/data/usersData";

const validationSchema = Yup.object().shape({
  cardHolderName: Yup.string().required("Card holder name required"),
  ccNumber: Yup.string()
    .required("Credit card number required")
    .matches(
      /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
      "Invalid credit card number"
    ),
  cardExpiry: Yup.string()
    .required("Card holder name required")
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, "Invalid Date"),
  code: Yup.string()
    .required()
    .matches(/^[0-9]{3}$/, "Invalid CVV"),
});

function limit(val: string, max: string) {
  if (val.length === 1 && val[0] > max[0]) {
    val = "0" + val;
  }

  if (val.length === 2) {
    if (Number(val) === 0) {
      val = "01";
    } else if (val > max) {
      val = max;
    }
  }

  return val;
}

function cardExpiryFormat(val: string) {
  const month = limit(val.substring(0, 2), "12");
  const date = limit(val.substring(2, 4), "31");

  return month + (date.length ? "/" + date : "");
}

const EditPaymentMethod = () => {
  const dispatch = useAppDispatch();

  const card = useAppSelector(
    (state) => state.crmCustomerDetails.state.selectedCard
  );
  const data = useAppSelector(
    (state) => state.crmCustomerDetails.data.paymentMethodData
  );
  const dialogOpen = useAppSelector(
    (state) => state.crmCustomerDetails.state.editPaymentMethodDialog
  );
  const selectedCard = useAppSelector(
    (state) => state.crmCustomerDetails.state.selectedCard
  );

  const onUpdateCreditCard = (values: {
    cardHolderName: string;
    ccNumber: string;
    cardExpiry: string;
  }) => {
    let newData = cloneDeep(data);
    const { cardHolderName, ccNumber, cardExpiry } = values;

    const updatedCard = {
      cardHolderName,
      last4Number: ccNumber.substr(ccNumber.length - 4),
      expYear: cardExpiry.substr(cardExpiry.length - 2),
      expMonth: cardExpiry.substring(0, 2),
    };

    newData = newData.map((payment: PaymentMethod) => {
      if (payment.last4Number === selectedCard.last4Number) {
        payment = { ...payment, ...updatedCard };
      }
      return payment;
    });

    onDialogClose();
    dispatch(updatePaymentMethodData(newData));
  };

  const onDialogClose = () => {
    dispatch(closeEditPaymentMethodDialog());
  };

  return (
    <Dialog
      isOpen={dialogOpen}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <h4>Edit Credit Card</h4>
      <div className="mt-6">
        <Formik
          initialValues={{
            cardHolderName: card.cardHolderName || "",
            ccNumber: "",
            cardExpiry: card.expMonth + card.expYear || "",
            code: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            onUpdateCreditCard(values);
            setSubmitting(false);
          }}
        >
          {({ touched, errors }) => (
            <Form>
              <FormContainer>
                <FormItem
                  label="Card holder name"
                  invalid={Boolean(
                    errors.cardHolderName && touched.cardHolderName
                  )}
                  errorMessage={errors.cardHolderName}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="cardHolderName"
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  label="Credit Card Number"
                  invalid={Boolean(errors.ccNumber && touched.ccNumber)}
                  errorMessage={errors.ccNumber}
                >
                  <Field name="ccNumber">
                    {({
                      field,
                      form,
                    }: {
                      field: FieldInputProps<string>;
                      form: FormikProps<any>;
                    }) => {
                      return (
                        <FormNumericInput
                          form={form}
                          field={field}
                          placeholder="•••• •••• •••• ••••"
                          format="#### #### #### ####"
                          onValueChange={(e) => {
                            form.setFieldValue(field.name, e.value);
                          }}
                        />
                      );
                    }}
                  </Field>
                </FormItem>
                <div className="grid grid-cols-2 gap-4">
                  <FormItem
                    label="Expiration date"
                    invalid={Boolean(errors.cardExpiry && touched.cardExpiry)}
                    errorMessage={errors.cardExpiry}
                  >
                    <Field name="cardExpiry">
                      {({
                        field,
                        form,
                      }: {
                        field: FieldInputProps<string>;
                        form: FormikProps<any>;
                      }) => {
                        return (
                          <FormNumericInput
                            form={form}
                            field={field}
                            placeholder="••/••"
                            format={cardExpiryFormat}
                            defaultValue={form.values.cardExpiry}
                            onValueChange={(e) => {
                              form.setFieldValue(field.name, e.value);
                            }}
                          />
                        );
                      }}
                    </Field>
                  </FormItem>
                  <FormItem
                    label="CVV"
                    invalid={Boolean(errors.code && touched.code)}
                    errorMessage={errors.code}
                  >
                    <Field name="code">
                      {({
                        field,
                        form,
                      }: {
                        field: FieldInputProps<string>;
                        form: FormikProps<any>;
                      }) => {
                        return (
                          <FormNumericInput
                            form={form}
                            field={field}
                            placeholder="•••"
                            format="###"
                            onValueChange={(e) => {
                              form.setFieldValue(field.name, e.value);
                            }}
                          />
                        );
                      }}
                    </Field>
                  </FormItem>
                </div>
                <FormItem className="mb-0 text-right">
                  <Button block variant="solid" type="submit">
                    Update
                  </Button>
                </FormItem>
              </FormContainer>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
};

export default EditPaymentMethod;

import React from "react";
import {
  Avatar,
  Button,
  FormContainer,
  FormItem,
  InputGroup,
  Select,
} from "components/ui";
import { FormNumericInput } from "components/shared";
import { Field, FieldInputProps, Form, Formik, FormikProps } from "formik";
import { components, ControlProps, OptionProps } from "react-select";
import { HiCheck } from "react-icons/hi";
import { Currency, currencyList } from "./options.data";
import * as Yup from "yup";

const { Control } = components;

const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .min(1, "Min amount 1")
    .required("Please enter an amount"),
  price: Yup.number().required("Price cannot be 0"),
});

const CryptoSelectOption = ({
  innerProps,
  label,
  data,
  isSelected,
}: OptionProps<Currency>) => {
  return (
    <div
      className={`cursor-pointer flex items-center justify-between p-2 ${
        isSelected
          ? "bg-gray-100 dark:bg-gray-500"
          : "hover:bg-gray-50 dark:hover:bg-gray-600"
      }`}
      {...innerProps}
    >
      <div className="flex items-center">
        <Avatar shape="circle" size={20} src={data.img} />
        <span className="ml-2 rtl:mr-2">{label}</span>
      </div>
      {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
    </div>
  );
};

const CryptoControl = ({ children, ...props }: ControlProps<Currency>) => {
  const selected = props.getValue()[0];
  return (
    <Control {...props}>
      {
        <Avatar
          className="ltr:ml-4 rtl:mr-4"
          shape="circle"
          size={18}
          src={selected.img}
        />
      }
      {children}
    </Control>
  );
};

const SellForm = (props: {
  onSell: (values: any, setSubmitting: (_: boolean) => void) => void;
  amount: number;
  symbol: string;
}) => {
  const { onSell, amount, symbol } = props;

  return (
    <div>
      <Formik
        initialValues={{
          amount: amount,
          price: 1,
          cryptoSymbol: symbol,
          rate: amount,
        }}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSell(values, setSubmitting);
        }}
      >
        {({ values, touched, errors, isSubmitting }) => (
          <Form>
            <FormContainer>
              <FormItem
                label="Price"
                invalid={Boolean(errors.price && touched.price)}
                errorMessage={errors.price}
              >
                <InputGroup>
                  <Field name="price">
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
                          placeholder="YOU SELL"
                          onValueChange={(e) => {
                            console.log(form, field);
                            form.setFieldValue(field.name, e.floatValue);
                            form.setFieldValue(
                              "amount",
                              (e.floatValue ?? 1 * form.values.rate).toFixed(2)
                            );
                          }}
                          value={field.value}
                        />
                      );
                    }}
                  </Field>
                  <Field name="cryptoSymbol">
                    {({
                      field,
                      form,
                    }: {
                      field: FieldInputProps<string>;
                      form: FormikProps<any>;
                    }) => (
                      <Select<Currency>
                        className="min-w-[120px]"
                        components={{
                          Option: CryptoSelectOption,
                          Control: CryptoControl,
                        }}
                        field={field}
                        form={form}
                        options={currencyList}
                        value={currencyList.filter(
                          (currency) => currency.value === values.cryptoSymbol
                        )}
                        onChange={(currency) => {
                          form.setFieldValue(field.name, currency?.value);
                          form.setFieldValue("rate", currency?.rate);
                          form.setFieldValue(
                            "amount",
                            currency && currency.rate < 1 ? 1 : currency?.rate
                          );
                        }}
                      />
                    )}
                  </Field>
                </InputGroup>
              </FormItem>
              <FormItem
                label="Amount"
                invalid={Boolean(errors.amount && touched.amount)}
                errorMessage={errors.amount}
              >
                <Field name="amount">
                  {({
                    field,
                    form,
                  }: {
                    field: FieldInputProps<string>;
                    form: FormikProps<any>;
                  }) => {
                    return (
                      <FormNumericInput
                        thousandSeparator={true}
                        form={form}
                        field={field}
                        placeholder="YOU RECEIVE"
                        onValueChange={(e) => {
                          form.setFieldValue(field.name, e.floatValue);
                        }}
                        value={field.value}
                        suffix="USD"
                        readOnly
                      />
                    );
                  }}
                </Field>
              </FormItem>
              <Button
                block
                variant="solid"
                loading={isSubmitting}
                type="submit"
              >
                Sell
              </Button>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SellForm;

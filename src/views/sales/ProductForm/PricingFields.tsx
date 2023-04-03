import React from "react";
import { AdaptableCard } from "components/shared";
import { FormItem, Input } from "components/ui";
import NumberFormat, { NumberFormatProps } from "react-number-format";
import {
  Field,
  FieldInputProps,
  FormikErrors,
  FormikProps,
  FormikTouched,
  FormikValues,
} from "formik";
import { InputProps } from "../../../components/ui/Input/Input";

const PriceInput = (props: InputProps) => {
  return <Input {...props} value={props.field?.value} prefix="$" />;
};

const NumberInput = (props: InputProps) => {
  return <Input {...props} value={props.field?.value} />;
};

const TaxRateInput = (props: InputProps) => {
  return <Input {...props} value={props.field?.value} />;
};

const NumberFormatInput = ({
  onValueChange,
  ...rest
}: NumberFormatProps<InputProps>) => {
  return (
    <NumberFormat
      customInput={Input}
      type="text"
      onValueChange={onValueChange}
      autoComplete="off"
      {...rest}
    />
  );
};

const PricingFields = (props: {
  touched: FormikTouched<any>;
  errors: FormikErrors<any>;
  values: FormikValues;
}) => {
  const { touched, errors } = props;

  return (
    <AdaptableCard className="mb-4" divider>
      <h5>Pricing</h5>
      <p className="mb-6">Section to config product sales information</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <FormItem
            label="SKU"
            invalid={Boolean(errors.stock && touched.stock)}
            errorMessage={errors.stock}
          >
            <Field name="stock">
              {({
                field,
                form,
              }: {
                field: FieldInputProps<string>;
                form: FormikProps<any>;
              }) => {
                return (
                  <NumberFormatInput
                    form={form}
                    field={field}
                    placeholder="Stock"
                    customInput={NumberInput}
                    onValueChange={(e) => {
                      form.setFieldValue(field.name, e.value);
                    }}
                  />
                );
              }}
            </Field>
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Price"
            invalid={Boolean(errors.price && touched.price)}
            errorMessage={errors.price}
          >
            <Field name="price">
              {({
                field,
                form,
              }: {
                field: FieldInputProps<string>;
                form: FormikProps<any>;
              }) => {
                return (
                  <NumberFormatInput
                    form={form}
                    field={field}
                    placeholder="Price"
                    customInput={PriceInput}
                    onValueChange={(e) => {
                      form.setFieldValue(field.name, e.value);
                    }}
                  />
                );
              }}
            </Field>
          </FormItem>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <FormItem
            label="Bulk Discount Price"
            invalid={Boolean(
              errors.bulkDiscountPrice && touched.bulkDiscountPrice
            )}
            errorMessage={errors.bulkDiscountPrice}
          >
            <Field name="bulkDiscountPrice">
              {({
                field,
                form,
              }: {
                field: FieldInputProps<string>;
                form: FormikProps<any>;
              }) => {
                return (
                  <NumberFormatInput
                    form={form}
                    field={field}
                    placeholder="Bulk Discount Price"
                    customInput={PriceInput}
                    onValueChange={(e) => {
                      form.setFieldValue(field.name, e.value);
                    }}
                  />
                );
              }}
            </Field>
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Tax Rate(%)"
            invalid={Boolean(errors.taxRate && touched.taxRate)}
            errorMessage={errors.taxRate}
          >
            <Field name="taxRate">
              {({
                field,
                form,
              }: {
                field: FieldInputProps<string>;
                form: FormikProps<any>;
              }) => {
                return (
                  <NumberFormatInput
                    form={form}
                    field={field}
                    placeholder="Tax Rate"
                    customInput={TaxRateInput}
                    isAllowed={({ floatValue }) =>
                      Boolean(floatValue && floatValue <= 100)
                    }
                    onValueChange={(e) => {
                      form.setFieldValue(field.name, e.value);
                    }}
                  />
                );
              }}
            </Field>
          </FormItem>
        </div>
      </div>
    </AdaptableCard>
  );
};

export default PricingFields;

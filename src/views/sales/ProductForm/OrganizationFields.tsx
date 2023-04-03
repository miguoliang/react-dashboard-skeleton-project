import React from "react";
import { AdaptableCard } from "components/shared";
import { FormItem, Input, Select } from "components/ui";
import CreatableSelect from "react-select/creatable";
import {
  Field,
  FieldInputProps,
  FormikErrors,
  FormikProps,
  FormikTouched,
  FormikValues,
} from "formik";

export const categories = [
  { label: "Bags", value: "bags" },
  { label: "Cloths", value: "cloths" },
  { label: "Devices", value: "devices" },
  { label: "Shoes", value: "shoes" },
  { label: "Watches", value: "watches" },
];

export const tags = [
  { label: "trend", value: "trend" },
  { label: "unisex", value: "unisex" },
];

const OrganizationFields = (props: {
  values: FormikValues;
  touched: FormikTouched<any>;
  errors: FormikErrors<any>;
}) => {
  const { values, touched, errors } = props;

  return (
    <AdaptableCard className="mb-4" divider isLastChild>
      <h5>Organizations</h5>
      <p className="mb-6">Section to config the product attribute</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <FormItem
            label="Category"
            invalid={Boolean(errors.category && touched.category)}
            errorMessage={errors.category}
          >
            <Field name="category">
              {({
                field,
                form,
              }: {
                field: FieldInputProps<any>;
                form: FormikProps<any>;
              }) => (
                <Select
                  field={field}
                  form={form}
                  options={categories}
                  value={categories.filter(
                    (category) => category.value === values.category
                  )}
                  onChange={(option) =>
                    form.setFieldValue(field.name, option?.value)
                  }
                />
              )}
            </Field>
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Tags"
            invalid={Boolean(errors.tags && touched.tags)}
            errorMessage={errors.tags}
          >
            <Field name="tags">
              {({
                field,
                form,
              }: {
                field: FieldInputProps<any>;
                form: FormikProps<any>;
              }) => (
                <Select
                  componentAs={CreatableSelect}
                  isMulti
                  field={field}
                  form={form}
                  options={tags}
                  value={values.tags}
                  onChange={(option) => form.setFieldValue(field.name, option)}
                />
              )}
            </Field>
          </FormItem>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <FormItem
            label="Brand"
            invalid={Boolean(errors.brand && touched.brand)}
            errorMessage={errors.brand}
          >
            <Field
              type="text"
              autoComplete="off"
              name="brand"
              placeholder="Brand"
              component={Input}
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Vendor"
            invalid={Boolean(errors.vendor && touched.vendor)}
            errorMessage={errors.vendor}
          >
            <Field
              type="text"
              autoComplete="off"
              name="vendor"
              placeholder="Vendor"
              component={Input}
            />
          </FormItem>
        </div>
      </div>
    </AdaptableCard>
  );
};

export default OrganizationFields;

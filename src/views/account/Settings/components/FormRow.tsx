import React from "react";
import classNames from "classnames";
import { FormItem } from "components/ui";
import { FormikErrors, FormikTouched } from "formik";

const FormRow = (props: {
  label: string;
  children: React.ReactNode;
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
  name: string;
  border?: boolean;
  alignCenter?: boolean;
}) => {
  const {
    label,
    children,
    errors,
    touched,
    name,
    border = true,
    alignCenter = true,
  } = props;

  return (
    <div
      className={classNames(
        "grid md:grid-cols-3 gap-4 py-8",
        border && "border-b border-gray-200 dark:border-gray-600",
        alignCenter && "items-center"
      )}
    >
      <div className="font-semibold">{label}</div>
      <div className="col-span-2">
        <FormItem
          className="mb-0 max-w-[700px]"
          invalid={Boolean(errors[name] && touched[name])}
          errorMessage={errors[name]}
        >
          {children}
        </FormItem>
      </div>
    </div>
  );
};

export default FormRow;

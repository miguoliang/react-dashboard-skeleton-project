import React from "react";
import { Button, FormContainer, FormItem } from "components/ui";
import { FormNumericInput } from "components/shared";
import { Field, FieldInputProps, Form, Formik, FormikProps } from "formik";

const WithForm = () => {
  return (
    <Formik
      initialValues={{
        amount: 0,
      }}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        setSubmitting(true);
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
          resetForm();
        }, 400);
      }}
    >
      {({ touched, errors, isSubmitting }) => (
        <Form>
          <FormContainer layout="inline">
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
                  console.log("form", form);
                  return (
                    <FormNumericInput
                      thousandSeparator={true}
                      form={form}
                      field={field}
                      placeholder="Amount"
                      decimalScale={2}
                      onValueChange={(e) => {
                        form.setFieldValue(field.name, e.floatValue);
                      }}
                      value={field.value}
                      suffix="USD"
                    />
                  );
                }}
              </Field>
            </FormItem>
            <FormItem>
              <Button variant="solid" loading={isSubmitting} type="submit">
                Submit
              </Button>
            </FormItem>
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};

export default WithForm;

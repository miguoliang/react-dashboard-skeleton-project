import React from "react";
import { FormContainer, Segment, SegmentItem } from "components/ui";
import FormDescription from "./FormDescription";
import FormRow from "./FormRow";
import {
  Field,
  FieldProps,
  Form,
  Formik,
  FormikErrors,
  FormikProps,
  FormikTouched,
  FormikValues,
} from "formik";
import isLastChild from "utils/isLastChild";
import { HiGlobeAlt, HiMail, HiOutlineDeviceMobile } from "react-icons/hi";
import { Button, useToast } from "@chakra-ui/react";

const generalNotificationForm = [
  { label: "News", name: "news" },
  { label: "Account activity", name: "accountActivity" },
  { label: "New device used to sign in", name: "signIn" },
  { label: "Reminders", name: "reminders" },
];

const projectNotificationForm = [
  { label: "Somone mentions you", name: "mentioned" },
  { label: "Somone replies to your message", name: "replies" },
  { label: "Task status updated", name: "taskUpdate" },
  { label: "Task assigned to you", name: "assigned" },
];

const salesNotificationForm = [
  { label: "New product", name: "newProduct" },
  { label: "New order placed", name: "newOrder" },
];

const Selector = ({
  form,
  values,
  name,
}: {
  form: FormikProps<any>;
  values: FormikValues;
  name: string;
}) => {
  const onSelected = (
    selected: string,
    setFieldValue: (name: string, selected: string) => void,
    name: string,
  ) => {
    setFieldValue(name, selected);
  };

  return (
    <Segment
      value={values[name]}
      selectionType="multiple"
      onChange={(selected: string[]) =>
        selected.forEach((item) => onSelected(item, form.setFieldValue, name))
      }
    >
      <SegmentItem
        className="flex items-center justify-center"
        type="button"
        value="email"
      >
        <HiMail className="text-xl" />
        <span className="hidden sm:block ltr:ml-2 rtl:mr-2">Email</span>
      </SegmentItem>
      <SegmentItem
        className="flex items-center justify-center"
        type="button"
        value="browser"
      >
        <HiGlobeAlt className="text-xl" />
        <span className="hidden sm:block  ltr:ml-2 rtl:mr-2">Browser</span>
      </SegmentItem>
      <SegmentItem
        className="flex items-center justify-center"
        type="button"
        value="app"
      >
        <HiOutlineDeviceMobile className="text-xl" />
        <span className="hidden sm:block  ltr:ml-2 rtl:mr-2">App</span>
      </SegmentItem>
    </Segment>
  );
};

const Rows = ({
  rows,
  validators,
  values,
}: {
  rows: {
    label: string;
    name: string;
  }[];
  validators: { touched: FormikTouched<any>; errors: FormikErrors<any> };
  values: FormikValues;
}) => {
  return (
    <>
      {rows.map((row, index) => (
        <FormRow
          key={row.name}
          name={row.name}
          label={row.label}
          {...validators}
          border={!isLastChild(rows, index)}
        >
          <Field name={row.name}>
            {({ form }: FieldProps) => (
              <Selector form={form} values={values} name={row.name} />
            )}
          </Field>
        </FormRow>
      ))}
    </>
  );
};

const NotificationSetting = ({
  data = {
    news: [],
    accountActivity: [],
    signIn: [],
    reminders: [],
    mentioned: [],
    replies: [],
    taskUpdate: [],
    assigned: [],
    newProduct: [],
    newOrder: [],
  },
}: {
  data?: Record<string, string[]>;
}) => {
  const toast = useToast();
  const onFormSubmit = (values: any, setSubmitting: (_: boolean) => void) => {
    toast({
      title: "Notification setting updated",
      status: "success",
      position: "top",
    });
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={data}
      enableReinitialize
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        setTimeout(() => {
          onFormSubmit(values, setSubmitting);
        }, 1000);
      }}
    >
      {({ values, touched, errors, isSubmitting, resetForm }) => {
        const validatorProps = { touched, errors };
        return (
          <Form>
            <FormContainer>
              <FormDescription
                title="General Notification"
                desc="Select how you'll be notified when the following changes occur."
              />
              <Rows
                rows={generalNotificationForm}
                validators={validatorProps}
                values={values}
              />
              <FormDescription
                className="mt-6"
                title="Project Notification"
                desc="Select how you'll be notified when the project related events happended."
              />
              <Rows
                rows={projectNotificationForm}
                validators={validatorProps}
                values={values}
              />
              <FormDescription
                className="mt-6"
                title="Sales Notification"
                desc="Select how you'll be notified when any products & order updated."
              />
              <Rows
                rows={salesNotificationForm}
                validators={validatorProps}
                values={values}
              />
              <div className="mt-4 ltr:text-right">
                <Button
                  className="ltr:mr-2 rtl:ml-2"
                  type="button"
                  onClick={() => resetForm()}
                >
                  Reset
                </Button>
                <Button variant="solid" isLoading={isSubmitting} type="submit">
                  {isSubmitting ? "Updating" : "Update"}
                </Button>
              </div>
            </FormContainer>
          </Form>
        );
      }}
    </Formik>
  );
};

export default NotificationSetting;

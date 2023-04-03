import React from "react";
import {
  Badge,
  Button,
  Dialog,
  FormContainer,
  FormItem,
  hooks,
  Input,
  Select,
} from "components/ui";
import { eventColors } from "components/shared/CalendarView";
import { closeDialog } from "../store/stateSlice";
import {
  Field,
  FieldInputProps,
  Form,
  Formik,
  FormikProps,
  FormikValues,
} from "formik";
import { HiCheck } from "react-icons/hi";
import { components, ControlProps } from "react-select";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "store/hooks";
import DatePicker from "components/ui/DatePicker";
import { Event } from "mock/data/crmData";

const { Control } = components;

const { useUniqueId } = hooks;

const colorKeys = Object.keys(eventColors);

const colorOptions = colorKeys.map((color) => {
  return { value: color, label: color, color: eventColors[color].dot };
});

const CustomSelectOption = ({
  innerProps,
  label,
  data,
  isSelected,
}: {
  innerProps: Omit<JSX.IntrinsicElements["div"], "className">;
  label: string;
  data: any;
  isSelected: boolean;
}) => {
  return (
    <div
      className={`flex items-center justify-between p-2 ${
        isSelected
          ? "bg-gray-100 dark:bg-gray-500"
          : "hover:bg-gray-50 dark:hover:bg-gray-600"
      }`}
      {...innerProps}
    >
      <div className="flex items-center">
        <Badge className={data.color} />
        <span className="ml-2 rtl:mr-2 capitalize">{label}</span>
      </div>
      {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
    </div>
  );
};

const CustomControl = ({ children, ...props }: ControlProps<any>) => {
  const selected = props.getValue()[0];
  return (
    <Control className="capitalize" {...props}>
      {selected && <Badge className={`${selected.color} ltr:ml-4 rtl:mr-4`} />}
      {children}
    </Control>
  );
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Event title Required"),
  startDate: Yup.string().required("Start Date Required"),
  endDate: Yup.string(),
  color: Yup.string().required("Color Required"),
});

const EventDialog = ({
  submit,
}: {
  submit?: (event: Event, type: "NEW" | "EDIT" | "DELETE") => void;
}) => {
  const dispatch = useAppDispatch();

  const open = useAppSelector((state) => state.crmCalendar.state.dialogOpen);
  const selected = useAppSelector((state) => state.crmCalendar.state.selected);
  const newId = useUniqueId("event-");

  const handleDialogClose = () => {
    dispatch(closeDialog());
  };

  const handleSubmit = (
    values: FormikValues,
    setSubmitting: (_: boolean) => void
  ) => {
    setSubmitting(false);
    const eventData: Event = {
      id: selected.id || newId,
      title: values.title,
      start: values.startDate,
      eventColor: values.color,
    };
    if (values.endDate) {
      eventData.end = values.endDate;
    }
    submit?.(eventData, selected.type);
    dispatch(closeDialog());
  };

  return (
    <Dialog
      isOpen={open}
      onClose={handleDialogClose}
      onRequestClose={handleDialogClose}
    >
      <h5 className="mb-4">
        {selected.type === "NEW" ? "Add New Event" : "Edit Event"}
      </h5>
      <div>
        <Formik
          enableReinitialize
          initialValues={{
            title: selected.title || "",
            startDate: selected.start || "",
            endDate: selected.end || "",
            color: selected.eventColor || colorOptions[0].value,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
          }}
        >
          {({ values, touched, errors }) => (
            <Form>
              <FormContainer>
                <FormItem
                  label="User Name"
                  invalid={Boolean(errors.title && touched.title)}
                  errorMessage={errors.title}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="title"
                    placeholder="Please enter title"
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  label="Start Date"
                  invalid={Boolean(errors.startDate && touched.startDate)}
                  errorMessage={errors.startDate}
                >
                  <Field name="startDate" placeholder="Date">
                    {({
                      field,
                      form,
                    }: {
                      field: FieldInputProps<string>;
                      form: FormikProps<any>;
                    }) => (
                      <DatePicker
                        field={field}
                        form={form}
                        value={field.value}
                        onChange={(date) => {
                          form.setFieldValue(field.name, date);
                        }}
                      />
                    )}
                  </Field>
                </FormItem>
                <FormItem
                  label="End Date"
                  invalid={Boolean(errors.endDate && touched.endDate)}
                  errorMessage={errors.endDate}
                >
                  <Field name="endDate" placeholder="Date">
                    {({
                      field,
                      form,
                    }: {
                      field: FieldInputProps<string>;
                      form: FormikProps<any>;
                    }) => (
                      <DatePicker
                        field={field}
                        form={form}
                        value={field.value}
                        onChange={(date) => {
                          form.setFieldValue(field.name, date);
                        }}
                      />
                    )}
                  </Field>
                </FormItem>
                <FormItem
                  label="Prefered"
                  asterisk={true}
                  invalid={Boolean(errors.color && touched.color)}
                  errorMessage={errors.color}
                >
                  <Field name="color">
                    {({
                      field,
                      form,
                    }: {
                      field: FieldInputProps<string>;
                      form: FormikProps<any>;
                    }) => (
                      <Select<(typeof colorOptions)[number]>
                        field={field}
                        form={form}
                        options={colorOptions}
                        value={colorOptions.filter(
                          (option) => option.value === values.color
                        )}
                        onChange={(option) =>
                          form.setFieldValue(field.name, option?.value)
                        }
                        components={{
                          Option: CustomSelectOption,
                          Control: CustomControl,
                        }}
                      />
                    )}
                  </Field>
                </FormItem>
                <FormItem className="mb-0 text-right rtl:text-left">
                  <Button variant="solid" type="submit">
                    Submit
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

export default EventDialog;

import React from "react";
import { Avatar, FormItem, Input, Upload } from "components/ui";
import {
  HiCake,
  HiLocationMarker,
  HiMail,
  HiOutlineUser,
  HiPhone,
  HiUserCircle,
} from "react-icons/hi";
import {
  Field,
  FieldInputProps,
  FieldProps,
  FormikErrors,
  FormikProps,
  FormikTouched,
} from "formik";
import DatePicker from "components/ui/DatePicker";

const PersonalInfoForm = (props: {
  touched: FormikTouched<any>;
  errors: FormikErrors<any>;
}) => {
  const { touched, errors } = props;

  const onSetFormFile = (
    form: FormikProps<any>,
    field: FieldInputProps<string>,
    file: File[] | FileList
  ) => {
    form.setFieldValue(field.name, URL.createObjectURL(file[0]));
  };

  return (
    <>
      <FormItem
        invalid={Boolean(errors.upload && touched.upload)}
        errorMessage={errors.upload}
      >
        <Field name="img">
          {({ field, form, meta }: FieldProps) => {
            const avatarProps = field.value ? { src: field.value } : {};
            return (
              <div className="flex justify-center">
                <Upload
                  className="cursor-pointer"
                  onChange={(files) => onSetFormFile(form, field, files)}
                  onFileRemove={(files) => onSetFormFile(form, field, files)}
                  showList={false}
                  uploadLimit={1}
                  field={field}
                  form={form}
                  meta={meta}
                >
                  <Avatar
                    className="border-2 border-white dark:border-gray-800 shadow-lg"
                    size={100}
                    shape="circle"
                    icon={<HiOutlineUser />}
                    {...avatarProps}
                  />
                </Upload>
              </div>
            );
          }}
        </Field>
      </FormItem>
      <FormItem
        label="Name"
        invalid={Boolean(errors.name && touched.name)}
        errorMessage={errors.name}
      >
        <Field
          type="text"
          autoComplete="off"
          name="name"
          placeholder="Name"
          component={Input}
          prefix={<HiUserCircle className="text-xl" />}
        />
      </FormItem>
      <FormItem
        label="Email"
        invalid={Boolean(errors.email && touched.email)}
        errorMessage={errors.email}
      >
        <Field
          type="email"
          autoComplete="off"
          name="email"
          placeholder="Email"
          component={Input}
          prefix={<HiMail className="text-xl" />}
        />
      </FormItem>
      <FormItem
        label="Location"
        invalid={Boolean(errors.location && touched.location)}
        errorMessage={errors.location}
      >
        <Field
          type="text"
          autoComplete="off"
          name="location"
          placeholder="Location"
          component={Input}
          prefix={<HiLocationMarker className="text-xl" />}
        />
      </FormItem>
      <FormItem
        label="Phone Number"
        invalid={Boolean(errors.phoneNumber && touched.phoneNumber)}
        errorMessage={errors.phoneNumber}
      >
        <Field
          type="text"
          autoComplete="off"
          name="phoneNumber"
          placeholder="Phone Number"
          component={Input}
          prefix={<HiPhone className="text-xl" />}
        />
      </FormItem>
      <FormItem
        label="Title"
        invalid={Boolean(errors.title && touched.title)}
        errorMessage={errors.title}
      >
        <Field
          type="text"
          autoComplete="off"
          name="title"
          placeholder="Title"
          component={Input}
          prefix={<HiPhone className="text-xl" />}
        />
      </FormItem>
      <FormItem
        label="Birthday"
        invalid={Boolean(errors.birthday && touched.birthday)}
        errorMessage={errors.birthday}
      >
        <Field name="birthday" placeholder="Date">
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
              inputPrefix={<HiCake className="text-xl" />}
              onChange={(date) => {
                form.setFieldValue(field.name, date);
              }}
            />
          )}
        </Field>
      </FormItem>
    </>
  );
};

export default PersonalInfoForm;

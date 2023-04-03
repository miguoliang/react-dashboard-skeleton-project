import React, { useState } from "react";
import {
  FormContainer,
  FormItem,
  Input,
  Notification,
  toast,
} from "components/ui";
import { Field, FieldInputProps, Form, Formik, FormikProps } from "formik";
import { RichTextEditor } from "components/shared";
import { toggleNewMessageDialog, updateReply } from "../store/stateSlice";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import { useAppDispatch } from "store/hooks";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title Required"),
  to: Yup.string().required("Receiver Required"),
  cc: Yup.string(),
  bcc: Yup.string(),
  message: Yup.string(),
});

const MailEditor = (props: {
  mode: "new" | "reply";
  mail?: any;
  ref: {
    formikRef: React.MutableRefObject<FormikProps<any> | null>;
    editorRef?: React.MutableRefObject<ReactQuill | null>;
  };
}) => {
  const { mode, mail, ref } = props;

  const { formikRef, editorRef } = ref;

  const dispatch = useAppDispatch();

  const [showCC, setShowCC] = useState(false);
  const [showBcc, setShowBcc] = useState(false);

  const onCcClick = () => {
    setShowCC(!showCC);
  };

  const onBccClick = () => {
    setShowBcc(!showBcc);
  };

  const onSend = () => {
    toast.push(<Notification type="success" title="Mail Sent" />, {
      placement: "top-center",
    });

    if (mode === "reply") {
      dispatch(updateReply(false));
    }

    if (mode === "new") {
      dispatch(toggleNewMessageDialog(false));
    }
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        title: mode === "reply" ? `Re: ${mail?.title}` : "",
        to: mode === "reply" ? mail?.from || "" : "",
        cc: "",
        bcc: "",
        message: "",
      }}
      validationSchema={validationSchema}
      onSubmit={() => onSend()}
    >
      {({ touched, errors }) => (
        <Form>
          <FormContainer>
            <FormItem
              className={mode === "reply" ? "!hidden" : ""}
              label="Title"
              labelClass="!justify-start"
              invalid={Boolean(errors.title && touched.title)}
              errorMessage={errors.title}
            >
              <Field autoComplete="off" name="title" component={Input} />
            </FormItem>
            <FormItem
              className={mode === "reply" ? "!hidden" : ""}
              label="To"
              labelClass="!justify-start"
              invalid={Boolean(errors.to && touched.to)}
              errorMessage={errors.to}
            >
              <Field
                autoComplete="off"
                name="to"
                component={Input}
                suffix={
                  <div className="flex">
                    <span
                      className="cursor-pointer select-none hover:underline ltr:mr-2 rtl:ml-2"
                      onClick={onCcClick}
                    >
                      Cc
                    </span>
                    <span
                      className="cursor-pointer select-none hover:underline"
                      onClick={onBccClick}
                    >
                      Bcc
                    </span>
                  </div>
                }
              />
            </FormItem>
            <FormItem
              className={!showCC ? "!hidden" : ""}
              label="Cc"
              labelClass="!justify-start"
              invalid={Boolean(errors.cc && touched.cc)}
              errorMessage={errors.cc}
            >
              <Field autoComplete="off" name="cc" component={Input} />
            </FormItem>
            <FormItem
              className={!showBcc ? "!hidden" : ""}
              label="Bcc"
              labelClass="!justify-start"
              invalid={Boolean(errors.bcc && touched.bcc)}
              errorMessage={errors.bcc}
            >
              <Field autoComplete="off" name="bcc" component={Input} />
            </FormItem>
            <FormItem
              label={mode === "new" ? "Message" : ""}
              className="mb-0"
              labelClass="!justify-start"
              invalid={Boolean(errors.message && touched.message)}
              errorMessage={errors.message}
            >
              <Field name="message">
                {({
                  field,
                  form,
                }: {
                  field: FieldInputProps<string>;
                  form: FormikProps<any>;
                }) => (
                  <RichTextEditor
                    ref={editorRef}
                    value={field.value}
                    onChange={(val) => form.setFieldValue(field.name, val)}
                  />
                )}
              </Field>
            </FormItem>
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};

export default MailEditor;

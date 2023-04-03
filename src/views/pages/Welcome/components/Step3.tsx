import React from "react";
import {
  Button,
  FormContainer,
  FormItem,
  Segment,
  SegmentItem,
} from "components/ui";
import { Field, FieldInputProps, Form, Formik, FormikProps } from "formik";
import { SegmentItemOption } from "components/shared";
import {
  HiArrowSmLeft,
  HiOutlineAcademicCap,
  HiOutlineCode,
  HiOutlineCube,
  HiOutlinePencil,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
} from "react-icons/hi";
import { noop } from "lodash";

const roles: {
  value: string;
  label: string;
  icon: React.ReactNode;
  disabled?: boolean;
}[] = [
  {
    value: "softwareEngineer",
    label: "Software Engineer",
    icon: <HiOutlineCode />,
  },
  {
    value: "productManager",
    label: "Product Manager",
    icon: <HiOutlineCube />,
  },
  { value: "designer", label: "Designer", icon: <HiOutlinePencil /> },
  { value: "qaTester", label: "QA Tester", icon: <HiOutlineShieldCheck /> },
  {
    value: "skateHolder",
    label: "Skate Holder",
    icon: <HiOutlineAcademicCap />,
  },
  { value: "other", label: "Others", icon: <HiOutlineSparkles /> },
];

const Step3 = ({
  onNext,
  onBack,
}: {
  onNext?: () => void;
  onBack?: () => void;
}) => {
  const onSetFieldValue = (
    form: FormikProps<any>,
    field: FieldInputProps<string>,
    val: string
  ) => {
    form.setFieldValue(field.name, val[0]);
    onNext?.();
  };

  return (
    <div className="text-center">
      <h3 className="mb-2">What is your role in the organization?</h3>
      <div className="mt-8 max-w-[600px] lg:min-w-[600px] mx-auto">
        <Formik
          initialValues={{
            role: "",
          }}
          onSubmit={noop}
        >
          {({ touched, errors }) => {
            return (
              <Form>
                <FormContainer>
                  <FormItem
                    invalid={Boolean(errors.role && touched.role)}
                    errorMessage={errors.role}
                  >
                    <Field name="role">
                      {({
                        field,
                        form,
                      }: {
                        field: FieldInputProps<string>;
                        form: FormikProps<any>;
                      }) => (
                        <Segment
                          value={[field.value]}
                          onChange={(val: string[]) =>
                            onSetFieldValue(form, field, val[0])
                          }
                        >
                          <div className="grid grid-cols-2 gap-4 w-full">
                            {roles.map((item) => (
                              <SegmentItem
                                value={item.value}
                                key={item.value}
                                disabled={item.disabled}
                              >
                                {({
                                  ref,
                                  active,
                                  onSegmentItemClick,
                                  disabled,
                                }) => {
                                  return (
                                    <SegmentItemOption
                                      hoverable
                                      ref={ref}
                                      active={active}
                                      disabled={disabled}
                                      onSegmentItemClick={onSegmentItemClick}
                                      className="bg-white dark:bg-gray-800"
                                    >
                                      <div className="flex items-center gap-3">
                                        <span className="text-2xl">
                                          {item.icon}
                                        </span>
                                        <h6>{item.label}</h6>
                                      </div>
                                    </SegmentItemOption>
                                  );
                                }}
                              </SegmentItem>
                            ))}
                          </div>
                        </Segment>
                      )}
                    </Field>
                  </FormItem>
                  <Button
                    variant="plain"
                    onClick={onBack}
                    type="button"
                    icon={<HiArrowSmLeft />}
                    block
                  >
                    Back
                  </Button>
                </FormContainer>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Step3;

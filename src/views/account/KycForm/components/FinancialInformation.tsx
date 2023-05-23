import React from "react";
import {
  Button,
  Checkbox,
  FormContainer,
  FormItem,
  Input,
  Select,
} from "components/ui";
import {
  Field,
  FieldInputProps,
  Form,
  Formik,
  FormikProps,
  getIn,
} from "formik";
import NumberFormat, { NumberFormatProps } from "react-number-format";
import {
  annualIncomeOptions,
  NoTinReasonOption,
  noTinReasonOption,
  occupationOptions,
  sourceOfWealthOptions,
} from "../constants";
import { Country, countryList } from "constants/countries.constant";
import * as Yup from "yup";
import { InputProps } from "../../../../components/ui/Input/Input";
import { FunctionType } from "constants/types";

const excludedOccupation = ["unemployed", "student", "retired"];

const validationSchema = Yup.object().shape({
  taxResident: Yup.string().required(
    "Please select your country of tax resident",
  ),
  tin: Yup.string().when("noTin", {
    is: false,
    then: Yup.string().required(
      "Please enter your Taxpayer Identification number (TIN)",
    ),
    otherwise: (schema) => schema,
  }),
  noTinReason: Yup.string().when("noTin", {
    is: true,
    then: Yup.string().required("Please indicate your reason"),
    otherwise: (schema) => schema,
  }),
  noTin: Yup.bool(),
  occupation: Yup.string().required("Please choose your occupation"),
  annualIncome: Yup.string().required(
    "Please tell us your annual income range",
  ),
  sourceOfWealth: Yup.string().required(
    "Please tell us the source of funds use in this account",
  ),
  companyInformation: Yup.object().when("occupation", {
    is: (value: string) => value && !excludedOccupation.includes(value),
    then: Yup.object().shape({
      companyName: Yup.string().required("Please enter your company name"),
      contactNumber: Yup.string().required(
        "Please enter your company contact number",
      ),
      country: Yup.string().required("Please select country"),
      addressLine1: Yup.string().required("Please enter your address"),
      addressLine2: Yup.string(),
      city: Yup.string().required("Please enter your city"),
      state: Yup.string().required("Please enter your state"),
      zipCode: Yup.string().required("Please enter zip code"),
    }),
    otherwise: (schema) => schema,
  }),
});

const NumberInput = (props: InputProps) => {
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

const FinancialInformation = ({
  data = {
    taxResident: "",
    tin: "",
    noTin: false,
    noTinReason: "",
    occupation: "",
    annualIncome: "",
    sourceOfWealth: "",
    companyInformation: {
      companyName: "",
      contactNumber: "",
      country: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
    },
  },
  onNextChange,
  onBackChange,
  currentStepStatus,
}: {
  data?: {
    taxResident: string;
    tin: string;
    noTin: boolean;
    noTinReason: string;
    occupation: string;
    annualIncome: string;
    sourceOfWealth: string;
    companyInformation: {
      companyName: string;
      contactNumber: string;
      country: string;
      addressLine1: string;
      addressLine2: string;
      city: string;
      state: string;
      zipCode: string;
    };
  };
  onNextChange?: FunctionType;
  onBackChange?: FunctionType;
  currentStepStatus?: any;
}) => {
  const onNext = (values: any, setSubmitting: any) => {
    onNextChange?.(values, "financialInformation", setSubmitting);
  };

  const onBack = () => {
    onBackChange?.();
  };

  return (
    <>
      <div className="mb-8">
        <h3 className="mb-2">Financial Information</h3>
        <p>
          Fill in your financial information to help us speed up the verication
          process.
        </p>
      </div>
      <Formik
        initialValues={data}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          setTimeout(() => {
            onNext(values, setSubmitting);
          }, 1000);
        }}
      >
        {({ values, touched, errors, isSubmitting }) => {
          return (
            <Form>
              <FormContainer>
                <div>
                  <h5 className="mb-4">Tax Information</h5>
                  <div className="md:grid grid-cols-2 gap-4">
                    <FormItem
                      label="Tax resident of"
                      invalid={Boolean(
                        errors.taxResident && touched.taxResident,
                      )}
                      errorMessage={errors.taxResident}
                    >
                      <Field name="taxResident">
                        {({
                          field,
                          form,
                        }: {
                          field: FieldInputProps<Country>;
                          form: FormikProps<any>;
                        }) => (
                          <Select<Country>
                            placeholder="Tax resident of"
                            field={field}
                            form={form}
                            options={countryList}
                            value={countryList.filter(
                              (country) => country.value === values.taxResident,
                            )}
                            onChange={(country) =>
                              form.setFieldValue(field.name, country?.value)
                            }
                          />
                        )}
                      </Field>
                    </FormItem>
                    {values.noTin ? (
                      <FormItem
                        label="Please provide an appropriate reason if no TIN"
                        invalid={Boolean(
                          errors.noTinReason && touched.noTinReason,
                        )}
                        errorMessage={errors.noTinReason}
                      >
                        <Field name="noTinReason">
                          {({
                            field,
                            form,
                          }: {
                            field: FieldInputProps<string>;
                            form: FormikProps<any>;
                          }) => (
                            <Select<NoTinReasonOption>
                              placeholder="Select reason"
                              field={field}
                              form={form}
                              options={noTinReasonOption}
                              value={noTinReasonOption.filter(
                                (reason) =>
                                  reason.value === +values.noTinReason,
                              )}
                              onChange={(reason) =>
                                form.setFieldValue(field.name, reason?.value)
                              }
                            />
                          )}
                        </Field>
                      </FormItem>
                    ) : (
                      <FormItem
                        label="Taxpayer Identification number (TIN)"
                        invalid={Boolean(errors.tin && touched.tin)}
                        errorMessage={errors.tin}
                      >
                        <Field
                          type="text"
                          autoComplete="off"
                          name="tin"
                          placeholder="TIN"
                          component={Input}
                        />
                      </FormItem>
                    )}
                  </div>
                </div>
                <FormItem>
                  <Field
                    name="noTin"
                    component={Checkbox}
                    children="Check this if no TIN number is available"
                  />
                </FormItem>
                <div>
                  <h5 className="mb-4">Employment Information</h5>
                  <FormItem
                    label="Occupation"
                    invalid={Boolean(errors.occupation && touched.occupation)}
                    errorMessage={errors.occupation}
                  >
                    <Field name="occupation">
                      {({
                        field,
                        form,
                      }: {
                        field: FieldInputProps<string>;
                        form: FormikProps<any>;
                      }) => (
                        <Select
                          placeholder="Occupation"
                          field={field}
                          form={form}
                          options={occupationOptions}
                          value={occupationOptions.filter(
                            (status) => status.value === values.occupation,
                          )}
                          onChange={(status) =>
                            form.setFieldValue(field.name, status?.value)
                          }
                        />
                      )}
                    </Field>
                  </FormItem>
                  {values.occupation &&
                    !excludedOccupation.includes(values.occupation) && (
                      <div>
                        <div className="md:grid grid-cols-2 gap-4">
                          <FormItem
                            label="Full company name"
                            invalid={
                              getIn(errors, "companyInformation.companyName") &&
                              getIn(touched, "companyInformation.companyName")
                            }
                            errorMessage={getIn(
                              errors,
                              "companyInformation.companyName",
                            )}
                          >
                            <Field
                              type="text"
                              autoComplete="off"
                              name="companyInformation.companyName"
                              placeholder="Full company name"
                              component={Input}
                            />
                          </FormItem>
                          <FormItem
                            label="Employer Contact Number"
                            invalid={Boolean(
                              errors.companyInformation &&
                                errors.companyInformation.contactNumber &&
                                touched.companyInformation?.contactNumber,
                            )}
                            errorMessage={
                              errors.companyInformation &&
                              errors.companyInformation.contactNumber
                            }
                          >
                            <Field name="companyInformation.contactNumber">
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
                                    customInput={NumberInput}
                                    placeholder="Employer Contact Number"
                                    onValueChange={(e) => {
                                      form.setFieldValue(field.name, e.value);
                                    }}
                                  />
                                );
                              }}
                            </Field>
                          </FormItem>
                        </div>
                        <div className="md:grid grid-cols-2 gap-4">
                          <FormItem
                            label="Country"
                            invalid={
                              getIn(errors, "companyInformation.country") &&
                              getIn(touched, "companyInformation.country")
                            }
                            errorMessage={getIn(
                              errors,
                              "companyInformation.country",
                            )}
                          >
                            <Field name="companyInformation.country">
                              {({
                                field,
                                form,
                              }: {
                                field: FieldInputProps<string>;
                                form: FormikProps<any>;
                              }) => (
                                <Select
                                  placeholder="Country"
                                  field={field}
                                  form={form}
                                  options={countryList}
                                  value={countryList.filter(
                                    (c) =>
                                      c.value ===
                                      getIn(
                                        values,
                                        "companyInformation.country",
                                      ),
                                  )}
                                  onChange={(c) =>
                                    form.setFieldValue(field.name, c?.value)
                                  }
                                />
                              )}
                            </Field>
                          </FormItem>
                          <FormItem
                            label="Address Line 1"
                            invalid={
                              getIn(
                                errors,
                                "companyInformation.addressLine1",
                              ) &&
                              getIn(touched, "companyInformation.addressLine1")
                            }
                            errorMessage={getIn(
                              errors,
                              "companyInformation.addressLine1",
                            )}
                          >
                            <Field
                              type="text"
                              autoComplete="off"
                              name="companyInformation.addressLine1"
                              placeholder="Company address line 1"
                              component={Input}
                            />
                          </FormItem>
                        </div>
                        <div className="md:grid grid-cols-2 gap-4">
                          <FormItem
                            label="Address Line 2"
                            invalid={
                              getIn(
                                errors,
                                "companyInformation.addressLine2",
                              ) &&
                              getIn(touched, "companyInformation.addressLine2")
                            }
                            errorMessage={getIn(
                              errors,
                              "companyInformation.addressLine2",
                            )}
                          >
                            <Field
                              type="text"
                              autoComplete="off"
                              name="companyInformation.addressLine2"
                              placeholder="Company address line 2"
                              component={Input}
                            />
                          </FormItem>
                          <FormItem
                            label="City"
                            invalid={
                              getIn(errors, "companyInformation.city") &&
                              getIn(touched, "companyInformation.city")
                            }
                            errorMessage={getIn(
                              errors,
                              "companyInformation.city",
                            )}
                          >
                            <Field
                              type="text"
                              autoComplete="off"
                              name="companyInformation.city"
                              placeholder="City"
                              component={Input}
                            />
                          </FormItem>
                        </div>
                        <div className="md:grid grid-cols-2 gap-4">
                          <FormItem
                            label="State"
                            invalid={
                              getIn(errors, "companyInformation.state") &&
                              getIn(touched, "companyInformation.state")
                            }
                            errorMessage={getIn(
                              errors,
                              "companyInformation.state",
                            )}
                          >
                            <Field
                              type="text"
                              autoComplete="off"
                              name="companyInformation.state"
                              placeholder="State"
                              component={Input}
                            />
                          </FormItem>
                          <FormItem
                            label="Zip Code"
                            invalid={
                              getIn(errors, "companyInformation.zipCode") &&
                              getIn(touched, "companyInformation.zipCode")
                            }
                            errorMessage={getIn(
                              errors,
                              "companyInformation.zipCode",
                            )}
                          >
                            <Field
                              type="text"
                              autoComplete="off"
                              name="companyInformation.zipCode"
                              placeholder="Zip Code"
                              component={Input}
                            />
                          </FormItem>
                        </div>
                      </div>
                    )}
                  <div className="md:grid grid-cols-2 gap-4">
                    <FormItem
                      label="Annual Income"
                      invalid={Boolean(
                        errors.annualIncome && touched.annualIncome,
                      )}
                      errorMessage={errors.annualIncome}
                    >
                      <Field name="annualIncome">
                        {({
                          field,
                          form,
                        }: {
                          field: FieldInputProps<string>;
                          form: FormikProps<any>;
                        }) => (
                          <Select
                            placeholder="Annual Income"
                            field={field}
                            form={form}
                            options={annualIncomeOptions}
                            value={annualIncomeOptions.filter(
                              (status) => status.value === values.annualIncome,
                            )}
                            onChange={(status) =>
                              form.setFieldValue(field.name, status?.value)
                            }
                          />
                        )}
                      </Field>
                    </FormItem>
                    <FormItem
                      label="Source of Wealth"
                      invalid={Boolean(
                        errors.sourceOfWealth && touched.sourceOfWealth,
                      )}
                      errorMessage={errors.sourceOfWealth}
                    >
                      <Field name="sourceOfWealth">
                        {({
                          field,
                          form,
                        }: {
                          field: FieldInputProps<string>;
                          form: FormikProps<any>;
                        }) => (
                          <Select
                            placeholder="Source of Wealth"
                            field={field}
                            form={form}
                            options={sourceOfWealthOptions}
                            value={sourceOfWealthOptions.filter(
                              (status) =>
                                status.value === values.sourceOfWealth,
                            )}
                            onChange={(status) =>
                              form.setFieldValue(field.name, status?.value)
                            }
                          />
                        )}
                      </Field>
                    </FormItem>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" onClick={onBack}>
                    Back
                  </Button>
                  <Button loading={isSubmitting} variant="solid" type="submit">
                    {currentStepStatus === "complete" ? "Save" : "Next"}
                  </Button>
                </div>
              </FormContainer>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default FinancialInformation;

import React, { useCallback } from "react";
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
  FormikErrors,
  FormikProps,
  FormikTouched,
  FormikValues,
} from "formik";
import get from "lodash/get";
import { Country, countryList } from "constants/countries.constant";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  country: Yup.string().required("Please select country"),
  addressLine1: Yup.string().required("Please enter your address"),
  addressLine2: Yup.string(),
  city: Yup.string().required("Please enter your city"),
  state: Yup.string().required("Please enter your state"),
  zipCode: Yup.string().required("Please enter zip code"),
  sameCorrespondenceAddress: Yup.bool(),
  correspondenceAddress: Yup.object().when("sameCorrespondenceAddress", {
    is: false,
    then: Yup.object().shape({
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

const AddressForm = (props: {
  countryName: string;
  addressLine1Name: string;
  addressLine2Name: string;
  cityName: string;
  stateName: string;
  zipCodeName: string;
  values: FormikValues;
  touched: FormikTouched<any>;
  errors: FormikErrors<any>;
}) => {
  const {
    values,
    touched,
    errors,
    countryName,
    addressLine1Name,
    addressLine2Name,
    cityName,
    stateName,
    zipCodeName,
  } = props;

  const getError = useCallback(
    (name: string) => {
      return get(errors, name);
    },
    [errors]
  );

  const getTouched = useCallback(
    (name: string) => {
      return get(touched, name);
    },
    [touched]
  );

  return (
    <>
      <div className="md:grid grid-cols-2 gap-4">
        <FormItem
          label="Country"
          invalid={Boolean(getError(countryName) && getTouched(countryName))}
          errorMessage={getError(countryName)}
        >
          <Field name={countryName}>
            {({
              field,
              form,
            }: {
              field: FieldInputProps<Country[]>;
              form: FormikProps<any>;
            }) => (
              <Select<Country>
                placeholder="Country"
                field={field}
                form={form}
                options={countryList}
                value={countryList.filter(
                  (c) => c.value === get(values, countryName)
                )}
                onChange={(c) => form.setFieldValue(field.name, c?.value)}
              />
            )}
          </Field>
        </FormItem>
        <FormItem
          label="Address Line 1"
          invalid={Boolean(
            getError(addressLine1Name) && getTouched(addressLine1Name)
          )}
          errorMessage={getError(addressLine1Name)}
        >
          <Field
            type="text"
            autoComplete="off"
            name={addressLine1Name}
            placeholder="Address Line 1"
            component={Input}
          />
        </FormItem>
      </div>
      <div className="md:grid grid-cols-2 gap-4">
        <FormItem
          label="Address Line 2"
          invalid={Boolean(
            getError(addressLine2Name) && getTouched(addressLine2Name)
          )}
          errorMessage={getError(addressLine2Name)}
        >
          <Field
            type="text"
            autoComplete="off"
            name={addressLine2Name}
            placeholder="Address Line 2"
            component={Input}
          />
        </FormItem>
        <FormItem
          label="City"
          invalid={Boolean(getError(cityName) && getTouched(cityName))}
          errorMessage={getError(cityName)}
        >
          <Field
            type="text"
            autoComplete="off"
            name={cityName}
            placeholder="City"
            component={Input}
          />
        </FormItem>
      </div>
      <div className="md:grid grid-cols-2 gap-4">
        <FormItem
          label="State"
          invalid={Boolean(getError(stateName) && getTouched(stateName))}
          errorMessage={getError(stateName)}
        >
          <Field
            type="text"
            autoComplete="off"
            name={stateName}
            placeholder="State"
            component={Input}
          />
        </FormItem>
        <FormItem
          label="Zip Code"
          invalid={Boolean(getError(zipCodeName) && getTouched(zipCodeName))}
          errorMessage={getError(zipCodeName)}
        >
          <Field
            type="text"
            autoComplete="off"
            name={zipCodeName}
            placeholder="Zip Code"
            component={Input}
          />
        </FormItem>
      </div>
    </>
  );
};

const AddressInformation = ({
  data = {
    country: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    sameCorrespondenceAddress: true,
    correspondenceAddress: {
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
  data?: any;
  onNextChange?: (values: any, step: string, setSubmitting: any) => void;
  onBackChange?: () => void;
  currentStepStatus?: string;
}) => {
  const onNext = (values: any, setSubmitting: any) => {
    onNextChange?.(values, "addressInformation", setSubmitting);
  };

  const onCheck = (
    value: any,
    field: FieldInputProps<any>,
    form: FormikProps<any>
  ) => {
    form.setFieldValue(field.name, value);
  };

  const onBack = () => {
    onBackChange?.();
  };

  return (
    <>
      <div className="mb-8">
        <h3 className="mb-2">Address Information</h3>
        <p>
          Enter your address information help us to speed up the verication
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
          const formProps = { values, touched, errors };
          return (
            <Form>
              <FormContainer>
                <h5 className="mb-4">Permanent Address</h5>
                <AddressForm
                  countryName="country"
                  addressLine1Name="addressLine1"
                  addressLine2Name="addressLine2"
                  cityName="city"
                  stateName="state"
                  zipCodeName="zipCode"
                  {...formProps}
                />
                <FormItem>
                  <Field name="sameCorrespondenceAddress">
                    {({
                      field,
                      form,
                    }: {
                      field: FieldInputProps<any>;
                      form: FormikProps<any>;
                    }) => (
                      <Checkbox
                        checked={values.sameCorrespondenceAddress}
                        onChange={(val) => onCheck(val, field, form)}
                      >
                        Correspondence address is same as above
                      </Checkbox>
                    )}
                  </Field>
                </FormItem>
                {!values.sameCorrespondenceAddress && (
                  <>
                    <h5 className="mb-4">Correspondence Address</h5>
                    <AddressForm
                      countryName="correspondenceAddress.country"
                      addressLine1Name="correspondenceAddress.addressLine1"
                      addressLine2Name="correspondenceAddress.addressLine2"
                      cityName="correspondenceAddress.city"
                      stateName="correspondenceAddress.state"
                      zipCodeName="correspondenceAddress.zipCode"
                      {...formProps}
                    />
                  </>
                )}
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

export default AddressInformation;

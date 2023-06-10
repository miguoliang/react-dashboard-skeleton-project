import React from "react";
import { Checkbox, FormContainer, FormItem, hooks, Input } from "components/ui";
import { Field, FieldInputProps, Form, Formik, FormikProps } from "formik";
import { HiCalendar, HiCreditCard, HiInformationCircle } from "react-icons/hi";
import NumberFormat, { NumberFormatProps } from "react-number-format";
import * as Yup from "yup";
import { InputProps } from "../../../../components/ui/Input/Input";
import { PaymentMethod } from "../../../../mock/data/accountData";
import { Button, Tooltip } from "@chakra-ui/react";

const { useUniqueId } = hooks;

const CreditCardInput = (props: InputProps) => {
  return <Input {...props} suffix={<HiCreditCard className="text-lg" />} />;
};

const CardExpiryInput = (props: InputProps) => {
  return <Input {...props} suffix={<HiCalendar className="text-lg" />} />;
};

const CvvInput = (props: InputProps) => {
  return (
    <Input
      {...props}
      suffix={
        <Tooltip title="The CVV/CVC code is located on the back of your credit/debit card on the right side of the white signature strip">
          <HiInformationCircle className="cursor-pointer text-lg" />
        </Tooltip>
      }
    />
  );
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

const validationSchema = Yup.object().shape({
  cardHolderName: Yup.string().required("Card holder name required"),
  ccNumber: Yup.string()
    .required("Credit card number required")
    .matches(
      /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
      "Invalid credit card number",
    ),
  cardExpiry: Yup.string()
    .required("Card holder name required")
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, "Invalid Date"),
  code: Yup.string()
    .required()
    .matches(/^[0-9]{3}$/, "Invalid CVV"),
  primary: Yup.bool(),
});

function limit(val: string, max: string) {
  if (val.length === 1 && val[0] > max[0]) {
    val = "0" + val;
  }

  if (val.length === 2) {
    if (Number(val) === 0) {
      val = "01";
    } else if (val > max) {
      val = max;
    }
  }

  return val;
}

function cardExpiryFormat(val: string) {
  const month = limit(val.substring(0, 2), "12");
  const date = limit(val.substring(2, 4), "31");

  return month + (date.length ? "/" + date : "");
}

const CreditCardForm = ({
  card,
  type,
  onUpdate,
}: {
  card: PaymentMethod;
  type: string;
  onUpdate: (card: PaymentMethod) => void;
}) => {
  const newId = useUniqueId("cc-");

  const handleUpdate = (values: {
    cardHolderName: string;
    ccNumber: string;
    cardExpiry: string;
    code: string;
    primary: boolean;
  }) => {
    const { cardHolderName, ccNumber, cardExpiry, primary } = values;
    const { cardType, cardId } = card;
    let updatedCard: PaymentMethod = {
      last4Number: ccNumber.substr(ccNumber.length - 4),
      expYear: cardExpiry.substr(cardExpiry.length - 2),
      expMonth: cardExpiry.substring(0, 2),
      cardHolderName,
      primary,
      cardId: "",
      cardType: "",
    };

    if (type === "EDIT") {
      updatedCard = {
        ...updatedCard,
        cardId,
        cardType,
      };
    }

    if (type === "NEW") {
      updatedCard = {
        ...updatedCard,
        cardId: newId,
        cardType: "VISA",
      };
    }
    console.log("updatedCard", updatedCard);
    onUpdate(updatedCard);
  };

  return (
    <Formik
      initialValues={{
        cardHolderName: card.cardHolderName || "",
        ccNumber: "",
        cardExpiry: card.expMonth + card.expYear || "",
        code: "",
        primary: card.primary || false,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleUpdate(values);
        setSubmitting(false);
      }}
    >
      {({ touched, errors }) => (
        <Form>
          <FormContainer>
            <FormItem
              label="Card holder name"
              invalid={Boolean(errors.cardHolderName && touched.cardHolderName)}
              errorMessage={errors.cardHolderName}
            >
              <Field
                type="text"
                autoComplete="off"
                name="cardHolderName"
                component={Input}
              />
            </FormItem>
            <FormItem
              label="Credit Card Number"
              invalid={Boolean(errors.ccNumber && touched.ccNumber)}
              errorMessage={errors.ccNumber}
            >
              <Field name="ccNumber">
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
                      placeholder="•••• •••• •••• ••••"
                      customInput={CreditCardInput}
                      format="#### #### #### ####"
                      onValueChange={(e) => {
                        form.setFieldValue(field.name, e.value);
                      }}
                    />
                  );
                }}
              </Field>
            </FormItem>
            <div className="grid grid-cols-2 gap-4">
              <FormItem
                label="Expiration date"
                invalid={Boolean(errors.cardExpiry && touched.cardExpiry)}
                errorMessage={errors.cardExpiry}
              >
                <Field name="cardExpiry">
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
                        placeholder="••/••"
                        format={cardExpiryFormat}
                        customInput={CardExpiryInput}
                        defaultValue={form.values.cardExpiry}
                        onValueChange={(e) => {
                          form.setFieldValue(field.name, e.value);
                        }}
                      />
                    );
                  }}
                </Field>
              </FormItem>
              <FormItem
                label="CVV"
                invalid={Boolean(errors.code && touched.code)}
                errorMessage={errors.code}
              >
                <Field name="code">
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
                        placeholder="•••"
                        customInput={CvvInput}
                        format="###"
                        onValueChange={(e) => {
                          form.setFieldValue(field.name, e.value);
                        }}
                      />
                    );
                  }}
                </Field>
              </FormItem>
            </div>
            <FormItem>
              <Field
                name="primary"
                component={Checkbox}
                children="Set this card as primary"
              />
            </FormItem>
            <FormItem className="mb-0 text-right">
              <Button display="block" variant="solid" type="submit">
                Update
              </Button>
            </FormItem>
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};

export default CreditCardForm;

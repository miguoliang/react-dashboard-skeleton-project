import React, { useState } from "react";
import {
  Button,
  FormContainer,
  FormItem,
  Input,
  InputGroup,
} from "components/ui";
import { Field, Form, Formik } from "formik";
import { Layout as LayoutType } from "components/ui/utils/constant";

const options: {
  label: string;
  value: LayoutType;
}[] = [
  { label: "Vertical", value: "vertical" },
  { label: "Horizontal", value: "horizontal" },
  { label: "Inline", value: "inline" },
];

const Layout = () => {
  const [layout, setLayout] = useState<LayoutType>("vertical");

  const onLayoutSelect = (val: LayoutType) => {
    setLayout(val);
  };

  return (
    <div>
      <InputGroup className="mb-6">
        {options.map((opt) => (
          <Button
            key={opt.value}
            onClick={() => onLayoutSelect(opt.value)}
            active={layout === opt.value}
          >
            {opt.label}
          </Button>
        ))}
      </InputGroup>
      <Formik
        initialValues={{
          name: "",
          email: "",
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          <FormContainer layout={layout}>
            <FormItem label="Name">
              <Field
                type="text"
                name="name"
                placeholder="Please enter your name"
                component={Input}
              />
            </FormItem>
            <FormItem label="Email">
              <Field
                type="email"
                name="email"
                placeholder="Please enter your email"
                component={Input}
              />
            </FormItem>
            <FormItem>
              <Button type="submit">Submit</Button>
            </FormItem>
          </FormContainer>
        </Form>
      </Formik>
    </div>
  );
};

export default Layout;

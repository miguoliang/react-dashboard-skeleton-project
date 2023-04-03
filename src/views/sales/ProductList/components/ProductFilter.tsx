import React, { forwardRef, useRef, useState } from "react";
import { HiOutlineFilter, HiOutlineSearch } from "react-icons/hi";
import {
  getProducts,
  initialTableData,
  setFilterData,
} from "../store/dataSlice";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Drawer,
  FormContainer,
  FormItem,
  Input,
  Radio,
  RadioGroup,
} from "components/ui";
import {
  Field,
  FieldInputProps,
  Form,
  Formik,
  FormikProps,
  FormikValues,
} from "formik";
import { useAppDispatch, useAppSelector } from "store/hooks";

const FilterForm = forwardRef<
  FormikProps<any>,
  {
    onSubmitComplete?: () => void;
  }
>(({ onSubmitComplete }, ref) => {
  const dispatch = useAppDispatch();

  const filterData = useAppSelector(
    (state) => state.salesProductList.data.filterData
  );

  const handleSubmit = (values: FormikValues) => {
    onSubmitComplete?.();
    dispatch(setFilterData(values));
    dispatch(getProducts(initialTableData));
  };

  return (
    <Formik
      innerRef={ref}
      enableReinitialize
      initialValues={filterData}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ values, touched, errors }) => (
        <Form>
          <FormContainer>
            <FormItem
              invalid={Boolean(errors.name && touched.name)}
              errorMessage={errors.name}
            >
              <h6 className="mb-4">Included text</h6>
              <Field
                type="text"
                autoComplete="off"
                name="name"
                placeholder="Keyword"
                component={Input}
                prefix={<HiOutlineSearch className="text-lg" />}
              />
            </FormItem>
            <FormItem
              invalid={Boolean(errors.category && touched.category)}
              errorMessage={errors.category}
            >
              <h6 className="mb-4">Product Category</h6>
              <Field name="category">
                {({
                  field,
                  form,
                }: {
                  field: FieldInputProps<string>;
                  form: FormikProps<any>;
                }) => (
                  <>
                    <CheckboxGroup
                      vertical
                      onChange={(options) =>
                        form.setFieldValue(field.name, options)
                      }
                      value={values.category}
                    >
                      <Checkbox className="mb-3" name={field.name} value="bags">
                        Bags{" "}
                      </Checkbox>
                      <Checkbox
                        className="mb-3"
                        name={field.name}
                        value="cloths"
                      >
                        Cloths{" "}
                      </Checkbox>
                      <Checkbox
                        className="mb-3"
                        name={field.name}
                        value="devices"
                      >
                        Devices{" "}
                      </Checkbox>
                      <Checkbox
                        className="mb-3"
                        name={field.name}
                        value="shoes"
                      >
                        Shoes{" "}
                      </Checkbox>
                      <Checkbox name={field.name} value="watches">
                        Watches{" "}
                      </Checkbox>
                    </CheckboxGroup>
                  </>
                )}
              </Field>
            </FormItem>
            <FormItem
              invalid={Boolean(errors.status && touched.status)}
              errorMessage={errors.status}
            >
              <h6 className="mb-4">Product Category</h6>
              <Field name="status">
                {({
                  field,
                  form,
                }: {
                  field: FieldInputProps<string>;
                  form: FormikProps<any>;
                }) => (
                  <>
                    <CheckboxGroup
                      vertical
                      onChange={(options) =>
                        form.setFieldValue(field.name, options)
                      }
                      value={values.status}
                    >
                      <Checkbox className="mb-3" name={field.name} value={0}>
                        In Stock{" "}
                      </Checkbox>
                      <Checkbox className="mb-3" name={field.name} value={1}>
                        Limited{" "}
                      </Checkbox>
                      <Checkbox className="mb-3" name={field.name} value={2}>
                        Out Of Stock{" "}
                      </Checkbox>
                    </CheckboxGroup>
                  </>
                )}
              </Field>
            </FormItem>
            <FormItem
              invalid={Boolean(errors.productStatus && touched.productStatus)}
              errorMessage={errors.productStatus}
            >
              <h6 className="mb-4">Product Status</h6>
              <Field name="productStatus">
                {({
                  field,
                  form,
                }: {
                  field: FieldInputProps<string>;
                  form: FormikProps<any>;
                }) => (
                  <RadioGroup
                    vertical
                    value={values.productStatus}
                    onChange={(val) => form.setFieldValue(field.name, val)}
                  >
                    <Radio value={0}>Published</Radio>
                    <Radio value={1}>Disabled</Radio>
                    <Radio value={2}>Archive</Radio>
                  </RadioGroup>
                )}
              </Field>
            </FormItem>
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
});

const DrawerFooter = ({
  onSaveClick,
  onCancel,
}: {
  onSaveClick: () => void;
  onCancel: () => void;
}) => {
  return (
    <div className="text-right w-full">
      <Button size="sm" className="mr-2" onClick={onCancel}>
        Cancel
      </Button>
      <Button size="sm" variant="solid" onClick={onSaveClick}>
        Query
      </Button>
    </div>
  );
};

const ProductFilter = () => {
  const formikRef = useRef<FormikProps<any>>(null);

  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => {
    setIsOpen(true);
  };

  const onDrawerClose = () => {
    setIsOpen(false);
  };

  const formSubmit = () => {
    formikRef.current?.submitForm();
  };

  return (
    <>
      <Button
        size="sm"
        className="block md:inline-block ltr:md:ml-2 rtl:md:mr-2 md:mb-0 mb-4"
        icon={<HiOutlineFilter />}
        onClick={() => openDrawer()}
      >
        Filter
      </Button>
      <Drawer
        title="Filter"
        isOpen={isOpen}
        onClose={onDrawerClose}
        onRequestClose={onDrawerClose}
        footer={
          <DrawerFooter onCancel={onDrawerClose} onSaveClick={formSubmit} />
        }
      >
        <FilterForm ref={formikRef} onSubmitComplete={onDrawerClose} />
      </Drawer>
    </>
  );
};

export default ProductFilter;

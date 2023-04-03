import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  FormContainer,
  FormItem,
  hooks,
  Input,
  Select,
} from "components/ui";
import NewTaskField from "./NewTaskField";
import {
  Field,
  FieldInputProps,
  Form,
  Formik,
  FormikHelpers,
  FormikProps,
} from "formik";
import { HiCheck } from "react-icons/hi";
import { components, MultiValueGenericProps, OptionProps } from "react-select";
import { getMembers, putProject } from "../store/dataSlice";
import { toggleNewProjectDialog } from "../store/stateSlice";
import cloneDeep from "lodash/cloneDeep";
import * as Yup from "yup";
import { Member, Project } from "../../../../mock/data/projectData";
import { useAppDispatch, useAppSelector } from "store/hooks";

const { MultiValueLabel } = components;

const { useUniqueId } = hooks;

const CustomSelectOption = ({
  innerProps,
  label,
  data,
  isSelected,
}: OptionProps<Member>) => {
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
        <Avatar shape="circle" size={20} src={data.img} />
        <span className="ml-2 rtl:mr-2">{label}</span>
      </div>
      {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
    </div>
  );
};

const CustomControlMulti = ({
  children,
  data,
  ...props
}: MultiValueGenericProps<Member>) => {
  const { img } = data;
  return (
    <MultiValueLabel data={data} {...props}>
      <div className="inline-flex items-center">
        <Avatar className="mr-2 rtl:ml-2" shape="circle" size={15} src={img} />
        {children}
      </div>
    </MultiValueLabel>
  );
};

const validationSchema = Yup.object().shape({
  title: Yup.string().min(3, "Too Short!").required("Title required"),
  content: Yup.string().required("Title required"),
  assignees: Yup.array().min(1, "Assignee required"),
  rememberMe: Yup.bool(),
});

const NewProjectForm = () => {
  const dispatch = useAppDispatch();

  const members = useAppSelector((state) => state.projectList.data.allMembers);

  const newId = useUniqueId("project-");

  const [taskCount, setTaskCount] = useState<{
    totalTask?: number;
    completedTask?: number;
  }>({});

  useEffect(() => {
    dispatch(getMembers());
  }, [dispatch]);

  const handleAddNewTask = (count: {
    totalTask?: number;
    completedTask?: number;
  }) => {
    setTaskCount(count);
  };

  const onSubmit = (formValue: any, setSubmitting: (_: boolean) => void) => {
    setSubmitting(true);

    const { title, content, assignees } = formValue;

    const { totalTask = 0, completedTask = 0 } = taskCount;

    const member = cloneDeep(assignees as any[]).map((assignee) => {
      assignee.name = assignee.label;
      return assignee;
    }) as Member[];

    const values: Project = {
      id: newId,
      name: title,
      desc: content,
      totalTask,
      completedTask,
      progression: (completedTask / totalTask) * 100 || 0,
      member,
    };
    dispatch(putProject(values));
    dispatch(toggleNewProjectDialog(false));
  };

  return (
    <Formik
      initialValues={{
        title: "",
        content: "",
        assignees: [],
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }: FormikHelpers<any>) => {
        onSubmit(values, setSubmitting);
      }}
    >
      {({ touched, errors, values }) => (
        <Form>
          <FormContainer>
            <FormItem
              label="Title"
              invalid={Boolean(errors.title && touched.title)}
              errorMessage={errors.title}
            >
              <Field
                type="text"
                autoComplete="off"
                name="title"
                placeholder="Enter title"
                component={Input}
              />
            </FormItem>
            <FormItem
              label="Assignees"
              invalid={Boolean(errors.assignees && touched.assignees)}
              errorMessage={errors.assignees}
            >
              <Field name="assignees">
                {({
                  field,
                  form,
                }: {
                  field: FieldInputProps<string>;
                  form: FormikProps<any>;
                }) => (
                  <Select<Member, true>
                    isMulti
                    className="min-w-[120px]"
                    components={{
                      Option: CustomSelectOption,
                      MultiValueLabel: CustomControlMulti,
                    }}
                    field={field}
                    form={form}
                    options={members}
                    value={values.assignees}
                    onChange={(member) => {
                      form.setFieldValue(field.name, member);
                    }}
                  />
                )}
              </Field>
            </FormItem>
            <FormItem
              label="Content"
              invalid={Boolean(errors.content && touched.content)}
              errorMessage={errors.content}
            >
              <Field
                textArea
                type="text"
                autoComplete="off"
                name="content"
                placeholder="Enter content"
                component={Input}
              />
            </FormItem>
            <NewTaskField onAddNewTask={handleAddNewTask} />
            <Button block variant="solid" type="submit">
              Submit
            </Button>
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};

export default NewProjectForm;

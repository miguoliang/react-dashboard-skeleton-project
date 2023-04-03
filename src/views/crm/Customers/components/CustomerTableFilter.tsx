import React from "react";
import { Badge, Select } from "components/ui";
import { setFilterData } from "../store/dataSlice";
import { components, ControlProps } from "react-select";
import { HiCheck } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { SelectChangeHandler } from "../../../../components/ui/Select/Select";

const { Control } = components;

type OptionType = {
  value: string;
  label: string;
  color: string;
};

const options: OptionType[] = [
  { value: "", label: "All", color: "bg-gray-500" },
  { value: "active", label: "Active", color: "bg-emerald-500" },
  { value: "blocked", label: "Blocked", color: "bg-red-500" },
];

const CustomSelectOption = ({
  innerProps,
  label,
  data,
  isSelected,
}: {
  innerProps: JSX.IntrinsicElements["div"];
  label: string;
  data: {
    color: string;
  };
  isSelected: boolean;
}) => {
  return (
    <div
      className={`flex items-center justify-between p-2 cursor-pointer ${
        isSelected
          ? "bg-gray-100 dark:bg-gray-500"
          : "hover:bg-gray-50 dark:hover:bg-gray-600"
      }`}
      {...innerProps}
    >
      <div className="flex items-center gap-2">
        <Badge innerClass={data.color} />
        <span>{label}</span>
      </div>
      {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
    </div>
  );
};

const CustomControl = ({ children, ...props }: ControlProps<OptionType>) => {
  const selected = props.getValue()[0];
  return (
    <Control {...props}>
      {<Badge className="ltr:ml-4 rtl:mr-4" innerClass={selected.color} />}
      {children}
    </Control>
  );
};

const CustomerTableFilter = () => {
  const dispatch = useAppDispatch();

  const { status } = useAppSelector(
    (state) => state.crmCustomers.data.filterData
  );

  const onStatusFilterChange: SelectChangeHandler<OptionType> = (selected) => {
    dispatch(setFilterData({ status: selected?.value }));
  };

  return (
    <Select<OptionType>
      options={options}
      size="sm"
      className="mb-4 min-w-[130px]"
      onChange={onStatusFilterChange}
      components={{
        Option: CustomSelectOption,
        Control: CustomControl,
      }}
      value={options.filter((option) => option.value === status)}
    />
  );
};

export default CustomerTableFilter;

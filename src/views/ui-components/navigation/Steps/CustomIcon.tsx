import React from "react";
import { Spinner, StepItem, Steps } from "components/ui";
import {
  HiOutlineClipboardCheck,
  HiOutlineDocumentSearch,
  HiOutlineLogin,
} from "react-icons/hi";

const CustomIcon = () => {
  return (
    <div>
      <Steps current={1}>
        <StepItem title="Login" customIcon={<HiOutlineLogin />} />
        <StepItem title="Order Placed" customIcon={<Spinner />} />
        <StepItem title="In Review" customIcon={<HiOutlineDocumentSearch />} />
        <StepItem title="Approved" customIcon={<HiOutlineClipboardCheck />} />
      </Steps>
    </div>
  );
};

export default CustomIcon;

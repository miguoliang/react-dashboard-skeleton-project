import React from "react";
import "dayjs/locale/ko";
import DatePicker from "components/ui/DatePicker";

const Localization = () => {
  return <DatePicker locale="ko" defaultValue={new Date()} inputFormat="LL" />;
};

export default Localization;

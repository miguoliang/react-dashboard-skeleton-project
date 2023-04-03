import React, { useState } from "react";
import { FormNumericInput } from "components/shared";
import { NumberFormatValues } from "react-number-format";

const Simple = () => {
  const [value, setValue] = useState<number>(0);

  const handleValueChange = (e: NumberFormatValues) => {
    console.log(e);
    setValue(e.floatValue ?? 0);
  };

  return <FormNumericInput onValueChange={handleValueChange} value={value} />;
};

export default Simple;

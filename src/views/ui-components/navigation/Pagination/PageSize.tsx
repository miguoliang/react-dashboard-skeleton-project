import React, { useState } from "react";
import { Pagination, Select } from "components/ui";

export type PageSizeOption = {
  value: number;
  label: string;
};

const options: PageSizeOption[] = [
  { value: 5, label: "5 / page" },
  { value: 10, label: "10 / page" },
  { value: 20, label: "20 / page" },
  { value: 50, label: "50 / page" },
];

const PageSize = () => {
  const [pageSize, setPageSize] = useState(options[0].value);

  return (
    <div className="flex items-center">
      <Pagination displayTotal pageSize={pageSize} total={100} />
      <div style={{ minWidth: 120 }}>
        <Select<PageSizeOption>
          size="sm"
          isSearchable={false}
          defaultValue={options[0]}
          options={options}
          onChange={(option) => setPageSize(option?.value || 5)}
        />
      </div>
    </div>
  );
};

export default PageSize;

import React from "react";
import { Pagination } from "components/ui";
import { PaginationChangeHandler } from "../../../../components/ui/Pagination/Pagers";

const Basic = () => {
  const onPaginationChange: PaginationChangeHandler = (page) => {
    console.log("onPaginationChange", page);
  };

  return (
    <div>
      <Pagination onChange={onPaginationChange} />
    </div>
  );
};

export default Basic;

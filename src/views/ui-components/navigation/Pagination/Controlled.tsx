import React, { useState } from "react";
import { Pagination } from "components/ui";
import { PaginationChangeHandler } from "../../../../components/ui/Pagination/Pagers";

const Controlled = () => {
  const [page, setPage] = useState(60);

  const onPaginationChange: PaginationChangeHandler = (val) => {
    setPage(val.pageIndex);
  };

  return (
    <div>
      <Pagination
        total={100}
        currentPage={page}
        onChange={onPaginationChange}
      />
    </div>
  );
};

export default Controlled;

import { PaginationResponse } from "../../models/pagination";

function createPaginationResponse<T>(content: T[]): PaginationResponse<T> {
  return {
    content: content,
    pageable: {
      sort: [],
      offset: 0,
      pageSize: content.length,
      pageNumber: 0,
      paged: true,
      unpaged: false,
    },
    last: true,
    totalElements: content.length,
    totalPages: 1,
    size: content.length,
    number: 0,
    numberOfElements: content.length,
    first: true,
    empty: false,
    sort: [],
  };
}

export default createPaginationResponse;

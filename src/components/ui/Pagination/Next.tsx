import React, { MouseEventHandler } from "react";
import classNames from "classnames";
import { HiChevronRight } from "react-icons/hi";

const Next = (props: {
  currentPage: number;
  pageCount: number;
  pagerClass: {
    default: string;
    disabled: string;
    inactive: string;
  };
  onNext: (e: React.MouseEvent) => void;
}) => {
  const { currentPage, pageCount, pagerClass, onNext } = props;

  const disabled = currentPage === pageCount || pageCount === 0;

  const onNextClick: MouseEventHandler = (e) => {
    e.preventDefault();
    if (disabled) {
      return;
    }
    onNext(e);
  };

  const pagerNextClass = classNames(
    pagerClass.default,
    "pagination-pager-next",
    disabled ? pagerClass.disabled : pagerClass.inactive,
  );

  return (
    <span className={pagerNextClass} onClick={onNextClick}>
      <HiChevronRight />
    </span>
  );
};

export default Next;

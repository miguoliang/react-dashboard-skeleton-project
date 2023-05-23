import React, { MouseEventHandler } from "react";
import classNames from "classnames";
import { HiChevronLeft } from "react-icons/hi";

const Prev = (props: {
  currentPage: number;
  pagerClass: {
    default: string;
    disabled: string;
    inactive: string;
  };
  onPrev: (e: React.MouseEvent) => void;
}) => {
  const { currentPage, pagerClass, onPrev } = props;

  const disabled = currentPage <= 1;

  const onPrevClick: MouseEventHandler = (e) => {
    if (disabled) {
      return;
    }
    onPrev(e);
  };

  const pagerPrevClass = classNames(
    pagerClass.default,
    "pagination-pager-prev",
    disabled ? pagerClass.disabled : pagerClass.inactive,
  );

  return (
    <span className={pagerPrevClass} onClick={onPrevClick}>
      <HiChevronLeft />
    </span>
  );
};

export default Prev;

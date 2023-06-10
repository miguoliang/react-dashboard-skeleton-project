import React from "react";
import classNames from "classnames";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Button } from "@chakra-ui/react";

type HeaderProps = {
  hasNext: boolean;
  hasPrevious: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onNextLevel?: () => void;
  className?: string;
  label?: string;
  nextLevelDisabled?: boolean;
  style?: React.CSSProperties;
  nextLabel?: string;
  previousLabel?: string;
  preventLevelFocus?: boolean;
  renderCenter?: boolean;
  preventFocus?: boolean;
  children?: React.ReactNode;
};

const Header = (props: HeaderProps) => {
  const {
    hasNext,
    hasPrevious,
    onNext,
    onPrevious,
    onNextLevel,
    className,
    label,
    nextLevelDisabled,
    nextLabel,
    previousLabel,
    preventLevelFocus = false,
    renderCenter = false,
    preventFocus,
    children,
    ...rest
  } = props;

  const headerLabel = (
    <button
      className="picker-header-label"
      disabled={nextLevelDisabled}
      onClick={onNextLevel}
      tabIndex={preventLevelFocus ? -1 : 0}
      onMouseDown={(event) => preventFocus && event.preventDefault()}
      type="button"
    >
      {label}
    </button>
  );

  const renderChildren = children ? children : headerLabel;

  return (
    <div
      className={classNames(
        className,
        "picker-header flex items-center justify-between mb-2",
      )}
      {...rest}
    >
      {!renderCenter && renderChildren}
      <div
        className={classNames(
          renderCenter && "justify-between w-full",
          "flex items-center rtl:flex-row-reverse",
        )}
      >
        <Button
          type="button"
          variant="ghost"
          className={classNames(
            !hasPrevious && renderCenter && "opacity-0 cursor-default",
          )}
          size="sm"
          leftIcon={<HiChevronLeft />}
          disabled={!hasPrevious}
          onClick={onPrevious}
          aria-label={previousLabel}
          onMouseDown={(event) => preventFocus && event.preventDefault()}
        />
        {renderCenter && renderChildren}
        <Button
          type="button"
          variant="ghost"
          className={classNames(
            !hasNext && renderCenter && "opacity-0 cursor-default",
          )}
          size="sm"
          leftIcon={<HiChevronRight />}
          disabled={!hasNext}
          onClick={onNext}
          aria-label={nextLabel}
          onMouseDown={(event) => preventFocus && event.preventDefault()}
        />
      </div>
    </div>
  );
};

export default Header;

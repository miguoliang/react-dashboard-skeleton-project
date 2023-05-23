import React, { MouseEvent, ReactNode } from "react";
import classNames from "classnames";
import { useConfig } from "../ConfigProvider";
import { FunctionType } from "constants/types";

export type CardProps = {
  id?: string;
  bordered?: boolean;
  clickable?: boolean;
  bodyClass?: string;
  headerClass?: string;
  footerClass?: string;
  headerBorder?: boolean;
  footerBorder?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  onClick?: FunctionType;
  headerExtra?: ReactNode;
  children?: ReactNode;
  className?: string;
};

const Card = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { cardBordered } = useConfig();

  const {
    children,
    className,
    clickable = false,
    onClick,
    bordered = cardBordered || false,
    bodyClass,
    header,
    headerClass,
    headerBorder = true,
    headerExtra,
    footer,
    footerClass,
    footerBorder = true,
    ...rest
  } = props;

  const cardClass = classNames(
    "card",
    className,
    bordered ? `card-border` : `card-shadow`,
    clickable && "cursor-pointer user-select-none",
  );

  const cardBodyClass = classNames("card-body", bodyClass);
  const cardHeaderClass = classNames(
    "card-header",
    headerBorder && "card-header-border",
    headerExtra && "card-header-extra",
    headerClass,
  );
  const cardFooterClass = classNames(
    "card-footer",
    footerBorder && `card-footer-border`,
    footerClass,
  );

  const renderHeader = () => {
    if (typeof header === "string") {
      return <h4>{header}</h4>;
    }
    return <>{header}</>;
  };

  const onCardClick = (e: MouseEvent<HTMLDivElement>) => {
    onClick?.(e);
  };

  return (
    <div className={cardClass} ref={ref} {...rest} onClick={onCardClick}>
      {header && (
        <div className={cardHeaderClass}>
          {renderHeader()}
          {headerExtra && <span>{headerExtra}</span>}
        </div>
      )}
      <div className={cardBodyClass}>{children}</div>
      {footer && <div className={cardFooterClass}>{footer}</div>}
    </div>
  );
});

export default Card;

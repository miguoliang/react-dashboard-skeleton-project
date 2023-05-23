import React, { PropsWithoutRef } from "react";
import classNames from "classnames";
import { Card } from "components/ui";
import { RootState } from "store";
import { useAppSelector } from "store/hooks";

type AdaptableCardProps = Partial<{
  leftSideBorder: boolean;
  rightSideBorder: boolean;
  divider: boolean;
  shadow: boolean;
  isLastChild: boolean;
  bodyClass: string;
}> &
  PropsWithoutRef<JSX.IntrinsicElements["div"]>;

const AdaptableCard = (props: AdaptableCardProps) => {
  const {
    className,
    children,
    bodyClass,
    leftSideBorder,
    rightSideBorder,
    divider,
    shadow,
    isLastChild,
    ...rest
  } = props;

  const type = useAppSelector((state: RootState) => state.theme.layout.type);

  return (
    <Card
      className={classNames(
        className,
        type === "modern" && "border-0",
        type === "modern" &&
          rightSideBorder &&
          "ltr:border-r-0 rtl:border-l-0 ltr:md:border-r rtl:md:border-l md:border-gray-200 md:dark:border-gray-600 rounded-tr-none rounded-br-none rtl:rounded-tr-none rtl:rounded-br-none",
        type === "modern" &&
          leftSideBorder &&
          "ltr:border-l-0 rtl:border-r-0 ltr:md:border-l rtl:md:border-r md:border-gray-200 md:dark:border-gray-600 rounded-tl-none rounded-bl-none rtl:rounded-tl-none rtl:rounded-bl-none",
        type === "modern" &&
          divider &&
          `${
            !isLastChild ? "border-b pb-6" : ""
          } py-4 md:border-gray-200 md:dark:border-gray-600 rounded-br-none rounded-bl-none`,
        type !== "modern" && shadow && "rounded-none shadow-none border-0",
      )}
      {...rest}
      bodyClass={classNames(
        type === "modern" ? "card-gutterless" : "",
        bodyClass,
      )}
    >
      {children}
    </Card>
  );
};

export default AdaptableCard;

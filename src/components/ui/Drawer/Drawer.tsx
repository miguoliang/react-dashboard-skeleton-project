import React, { MouseEventHandler, ReactNode } from "react";
import classNames from "classnames";
import Modal from "react-modal";
import ReactModal from "react-modal";
import { motion } from "framer-motion";
import { CloseButton } from "@chakra-ui/react";

type DrawerProps = Partial<{
  placement: "top" | "right" | "bottom" | "left";
  width: number;
  height: number;
  closable: boolean;
  title: string | ReactNode;
  footer: string | ReactNode;
  headerClass: string;
  footerClass: string;
  bodyClass: string;
  showBackdrop: boolean;
  lockScroll: boolean;
  bodyOpenClassName: string;
  portalClassName: string;
  overlayClassName: string;
  onClose: MouseEventHandler;
  className: string;
}> &
  Omit<ReactModal.Props, "className">;

const Drawer = (props: DrawerProps) => {
  const {
    children,
    className,
    closable = true,
    width = 400,
    height = 400,
    isOpen,
    onClose,
    closeTimeoutMS = 300,
    placement = "right",
    bodyOpenClassName,
    portalClassName,
    overlayClassName,
    title,
    footer,
    headerClass,
    footerClass,
    bodyClass,
    showBackdrop = true,
    lockScroll = true,
    ...rest
  } = props;

  const onCloseClick: MouseEventHandler = (e) => {
    onClose?.(e);
  };

  const renderCloseButton = <CloseButton onClick={onCloseClick} />;

  const getStyle = () => {
    return placement === "left" || placement === "right"
      ? {
          dimensionClass: "vertical",
          contentStyle: { width },
          motionStyle: {
            [placement]: `-${width}${typeof width === "number" && "px"}`,
          },
        }
      : {
          dimensionClass: "horizontal",
          contentStyle: { height },
          motionStyle: {
            [placement]: `-${height}${typeof height === "number" && "px"}`,
          },
        };
  };

  const { dimensionClass, contentStyle, motionStyle } = getStyle();

  return (
    <Modal
      className={{
        base: classNames("drawer", className),
        afterOpen: "drawer-after-open",
        beforeClose: "drawer-before-close",
      }}
      overlayClassName={{
        base: classNames(
          "drawer-overlay",
          overlayClassName,
          !showBackdrop && "bg-transparent",
        ),
        afterOpen: "drawer-overlay-after-open",
        beforeClose: "drawer-overlay-before-close",
      }}
      portalClassName={classNames("drawer-portal", portalClassName)}
      bodyOpenClassName={classNames(
        "drawer-open",
        lockScroll && "drawer-lock-scroll",
        bodyOpenClassName,
      )}
      ariaHideApp={false}
      isOpen={isOpen}
      closeTimeoutMS={closeTimeoutMS}
      {...rest}
    >
      <motion.div
        className={classNames("drawer-content", dimensionClass)}
        style={contentStyle}
        initial={motionStyle}
        animate={{
          [placement]: isOpen ? 0 : motionStyle[placement],
        }}
      >
        {title || closable ? (
          <div className={classNames("drawer-header", headerClass)}>
            {typeof title === "string" ? (
              <h4>{title}</h4>
            ) : (
              <span>{title}</span>
            )}
            {closable && renderCloseButton}
          </div>
        ) : null}
        <div className={classNames("drawer-body", bodyClass)}>{children}</div>
        {footer && (
          <div className={classNames("drawer-footer", footerClass)}>
            {footer}
          </div>
        )}
      </motion.div>
    </Modal>
  );
};

export default Drawer;

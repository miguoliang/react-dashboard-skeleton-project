import React, { MouseEventHandler } from "react";
import Modal from "react-modal";
import classNames from "classnames";
import { motion } from "framer-motion";
import { theme } from "twin.macro";
import useWindowSize from "../hooks/useWindowSize";
import { FunctionType } from "constants/types";
import { CloseButton } from "@chakra-ui/react";

export type DialogProps = Partial<{
  closable: boolean;
  width: string | number;
  height: string | number;
  onClose: FunctionType;
  contentClassName: string;
}> &
  Modal.Props;
const Dialog = (props: DialogProps) => {
  const currentSize = useWindowSize();

  const {
    children,
    className,
    closable = true,
    width = 520,
    height,
    style,
    isOpen,
    onClose,
    bodyOpenClassName,
    portalClassName,
    overlayClassName,
    contentClassName,
    closeTimeoutMS = 150,
    ...rest
  } = props;

  const onCloseClick: MouseEventHandler = (e) => {
    onClose?.(e);
  };

  const renderCloseButton = (
    <CloseButton
      onClick={onCloseClick}
      className="ltr:right-6 rtl:left-6"
      position="absolute"
    />
  );

  const contentStyle = {
    content: {
      inset: "unset",
    },
    ...style,
  };

  contentStyle.content.width = width;

  if (
    currentSize.width <=
    parseInt(theme`screens.sm`.split(/ /)[0].replace(/\D/g, ""))
  ) {
    contentStyle.content.width = "auto";
  }

  if (height !== undefined) {
    contentStyle.content.height = height;
  }

  const defaultDialogContentClass = "dialog-content";

  const dialogClass = classNames(defaultDialogContentClass, contentClassName);

  return (
    <Modal
      className={{
        base: classNames("dialog", getClassName(className)),
        afterOpen: "dialog-after-open",
        beforeClose: "dialog-before-close",
      }}
      overlayClassName={{
        base: classNames("dialog-overlay", getClassName(overlayClassName)),
        afterOpen: "dialog-overlay-after-open",
        beforeClose: "dialog-overlay-before-close",
      }}
      portalClassName={classNames(
        "dialog-portal",
        getClassName(portalClassName),
      )}
      bodyOpenClassName={classNames(
        "dialog-open",
        getClassName(bodyOpenClassName),
      )}
      ariaHideApp={false}
      isOpen={isOpen}
      style={{ ...contentStyle }}
      closeTimeoutMS={closeTimeoutMS}
      {...rest}
    >
      <motion.div
        className={dialogClass}
        initial={{ transform: "scale(0.9)" }}
        animate={{
          transform: isOpen ? "scale(1)" : "scale(0.9)",
        }}
      >
        {closable && renderCloseButton}
        {children}
      </motion.div>
    </Modal>
  );
};

function getClassName(
  className?: string | Modal.Classes | null,
  type?: keyof Modal.Classes,
): string {
  if (className === null) {
    return "";
  } else if (typeof className === "string") {
    return className;
  } else if (typeof className === "undefined") {
    return "";
  } else {
    return className[type || "base"];
  }
}

export default Dialog;

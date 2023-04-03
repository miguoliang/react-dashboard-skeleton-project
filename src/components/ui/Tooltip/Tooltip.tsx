import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import { Manager, Popper, Reference } from "react-popper";
import { AnimatePresence, motion } from "framer-motion";
import { Portal } from "react-portal";
import { FunctionType } from "constants/types";
import * as PopperJS from "@popperjs/core";
import Arrow from "./Arrow";

const PopperElement = (props: {
  title: string | ReactNode;
  forceUpdate: FunctionType;
  open: boolean;
}) => {
  const { title, forceUpdate, open } = props;
  useEffect(() => {
    if (open) {
      forceUpdate();
    }
  }, [open]);
  return <span>{title}</span>;
};

export type TooltipProps = {
  title: string | ReactNode;
  placement?: PopperJS.Placement;
  wrapperClass?: string;
  isOpen?: boolean;
  children: ReactNode;
};

const Tooltip = (props: TooltipProps) => {
  const {
    children,
    title,
    placement = "top",
    wrapperClass,
    isOpen = false,
    ...rest
  } = props;

  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setArrowElement(arrowRef.current);
  }, []);

  const [tooltipOpen, setTooltipOpen] = useState(isOpen);
  const tooltipNode = useRef();
  const tooltipBackground = "gray-800";
  const tooltipDarkBackground = "black";
  const defaultTooltipClass = `tooltip bg-${tooltipBackground} dark:bg-${tooltipDarkBackground}`;
  const toggleTooltip = useCallback(
    (bool: boolean) => {
      if (!isOpen) {
        setTooltipOpen(bool);
      }
    },
    [isOpen],
  );

  // @ts-ignore
  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <span
            className={classNames("tooltip-wrapper", wrapperClass)}
            ref={ref}
            onMouseEnter={() => toggleTooltip(true)}
            onMouseLeave={() => toggleTooltip(false)}
          >
            {children}
          </span>
        )}
      </Reference>
      {tooltipOpen && (
        <Portal>
          <Popper
            placement={placement}
            innerRef={(node) => (tooltipNode.current = node)}
            modifiers={[
              {
                name: "arrow",
                options: { element: arrowElement },
              },
              { name: "offset", options: { offset: [0, 7] } },
            ]}
            strategy={"fixed"}
          >
            {({ ref, style, ...popperProps }) => (
              <AnimatePresence>
                (
                <motion.div
                  className={defaultTooltipClass}
                  ref={ref}
                  style={style}
                  initial={{
                    opacity: 0,
                    visibility: "hidden",
                  }}
                  animate={{
                    opacity: 1,
                    visibility: "visible",
                  }}
                  transition={{
                    duration: 0.15,
                    type: "tween",
                  }}
                >
                  <PopperElement
                    open={tooltipOpen}
                    title={title}
                    {...rest}
                    {...popperProps}
                  />
                  <Arrow
                    ref={arrowRef}
                    placement={placement}
                    color={tooltipBackground}
                    colorDark={tooltipDarkBackground}
                  />
                </motion.div>
                )
              </AnimatePresence>
            )}
          </Popper>
        </Portal>
      )}
    </Manager>
  );
};

export default Tooltip;

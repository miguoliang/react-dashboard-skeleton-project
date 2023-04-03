import React, {
  FunctionComponentElement,
  isValidElement,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import chainedFunction from "../utils/chainedFunction";
import { motion } from "framer-motion";
import { getPlacementTransition } from "./transition";
import { Placement } from "../utils/constant";
import { createRoot } from "react-dom/client";

type ToastProps = {
  onClose?: () => void;
  className?: string;
  triggerByToast?: boolean;
  root: HTMLDivElement;
} & React.HTMLAttributes<HTMLDivElement>;

type Message = {
  key: string;
  visible: boolean;
  node: FunctionComponentElement<ToastProps>;
};

const useMessages = (msgKey?: string) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const getKey = useCallback(
    (key?: string) => {
      if (typeof key === "undefined" && messages.length) {
        key = messages[messages.length - 1].key;
      }
      return key;
    },
    [messages]
  );

  const push = useCallback(
    (message: Message) => {
      const key = msgKey || "_" + Math.random().toString(36).substr(2, 12);
      setMessages([...messages, { ...message, key, visible: true }]);
      return key;
    },
    [messages, msgKey]
  );

  const removeAll = useCallback(() => {
    setMessages(messages.map((msg) => ({ ...msg, visible: false })));
    setTimeout(() => {
      setMessages([]);
    }, 50);
  }, [messages]);

  const remove = useCallback(
    (key: string) => {
      setMessages(
        messages.map((elm) => {
          if (elm.key === getKey(key)) {
            elm.visible = false;
          }
          return elm;
        })
      );

      setTimeout(() => {
        setMessages(messages.filter((msg) => msg.visible));
      }, 50);
    },
    [messages, getKey]
  );

  return { messages, push, removeAll, remove };
};

export type ToastWrapperProps = {
  placement?: Placement;
  offsetX?: number;
  offsetY?: number;
  transitionType?: "scale" | "fade" | "none";
  block?: boolean;
  messageKey?: string;
  callback?: (element: HTMLDivElement | null) => void;
  wrapper?: HTMLDivElement | (() => HTMLDivElement);
};

export const ToastWrapper = React.forwardRef<
  {
    root: HTMLDivElement | null;
    removeAll?: () => void;
    push?: (message: Message) => string;
    remove?: (key: string) => void;
  },
  ToastWrapperProps
>((props, ref) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const {
    transitionType = "scale",
    placement = "top-end",
    offsetX = 30,
    offsetY = 30,
    messageKey,
    block = false,
    callback,
    ...rest
  } = props;

  const { push, removeAll, remove, messages } = useMessages(messageKey);

  useImperativeHandle(ref, () => {
    return { root: rootRef.current, push, removeAll, remove };
  });

  const placementTransition = getPlacementTransition({
    offsetX,
    offsetY,
    placement,
    transitionType,
  });

  const toastProps: ToastProps = {
    triggerByToast: true,
    root: rootRef.current!,
  };

  const messageElements = messages.map((item) => {
    return (
      <motion.div
        key={item.key}
        className={"toast-wrapper"}
        initial={placementTransition.variants.initial}
        variants={placementTransition.variants}
        animate={item.visible ? "animate" : "exit"}
        transition={{ duration: 0.15, type: "tween" }}
      >
        {isValidElement(item.node)
          ? React.cloneElement<ToastProps>(item.node, {
              ...toastProps,
              onClose: chainedFunction(item.node.props.onClose, () =>
                remove(item.key)
              ),
              className: classNames(item.node.props.className),
            })
          : null}
      </motion.div>
    );
  });

  return (
    <div
      style={placementTransition.default}
      {...rest}
      ref={(thisRef) => {
        rootRef.current = thisRef;
        callback?.(thisRef);
      }}
      className={classNames("toast", block && "w-full")}
    >
      {messageElements}
    </div>
  );
});

export const ToastWrapperInstance = (props: ToastWrapperProps) => {
  const { wrapper, ...rest } = props;

  const wrapperRef = React.createRef<ToastProps>();

  const wrapperElement =
    (typeof wrapper === "function" ? wrapper() : wrapper) || document.body;
  return new Promise<[React.RefObject<ToastProps>, () => void]>((resolve) => {
    const renderCallback = () => {
      resolve([wrapperRef, unmount]);
    };

    function renderElement(element: ReactNode) {
      const mountElement = document.createElement("div");

      wrapperElement.appendChild(mountElement);

      const root = createRoot(mountElement);

      root.render(element);

      // @ts-ignore
      wrapperElement.__root = root;

      return root;
    }

    const { unmount } = renderElement(
      <ToastWrapper {...rest} ref={wrapperRef} callback={renderCallback} />
    );
  });
};

export const toastDefaultProps: ToastWrapperProps = {
  placement: "top-end",
  offsetX: 30,
  offsetY: 30,
  transitionType: "scale",
  block: false,
};

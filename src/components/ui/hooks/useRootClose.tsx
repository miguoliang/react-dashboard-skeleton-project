import { useCallback, useEffect } from "react";
import { findDOMNode } from "react-dom";

const domContains = (context: any, node: any): boolean => {
  if (context.contains) {
    return context.contains(node);
  } else if (context.compareDocumentPosition) {
    return context === node || !!(context.compareDocumentPosition(node) & 16);
  }
  if (node) {
    do {
      if (node === context) {
        return true;
      }
    } while ((node = node.parentNode));
  }
  return false;
};

const getRefTarget = (ref: React.Ref<Element>) => {
  return ref && ("current" in ref ? ref.current : ref);
};

function getDOMNode(elementOrRef?: any) {
  const element =
    elementOrRef?.root || elementOrRef?.child || getRefTarget(elementOrRef);

  if (element?.nodeType && typeof element?.nodeName === "string") {
    return element;
  }

  return findDOMNode(element);
}

function isModifiedEvent(e?: KeyboardEvent | MouseEvent) {
  return !!(e?.metaKey || e?.altKey || e?.ctrlKey || e?.shiftKey);
}

function onEventListener(
  target: Element,
  eventType: any,
  listener: (this: Element, ev: any) => any,
  options = false,
) {
  target.addEventListener(eventType, listener, options);

  return {
    off() {
      target.removeEventListener(eventType, listener, options);
    },
  };
}

function useRootClose(
  onRootClose: (event: MouseEvent | KeyboardEvent) => void,
  {
    disabled,
    triggerTarget,
    overlayTarget,
  }: {
    disabled: boolean;
    triggerTarget: HTMLElement | React.RefObject<HTMLElement>;
    overlayTarget: HTMLElement | React.RefObject<HTMLElement>;
  },
) {
  const handleDocumentMouseDown = useCallback(
    (event: MouseEvent | KeyboardEvent) => {
      const triggerElement = getDOMNode(triggerTarget);
      const overlayElement = getDOMNode(overlayTarget);

      if (triggerElement && domContains(triggerElement, event.target)) {
        return;
      }

      if (overlayElement && domContains(overlayElement, event.target)) {
        return;
      }

      if (isModifiedEvent(event)) {
        return;
      } else if (event instanceof MouseEvent && event.button !== 0) {
        return;
      }

      onRootClose(event);
    },
    [onRootClose, triggerTarget, overlayTarget],
  );

  useEffect(() => {
    const currentTarget = getDOMNode(triggerTarget);

    if (disabled || !currentTarget) return;

    const doc = () =>
      (currentTarget && currentTarget.ownerDocument) || document;
    const onDocumentMouseDownListener = onEventListener(
      doc(),
      "mousedown",
      handleDocumentMouseDown,
      true,
    );

    return () => {
      onDocumentMouseDownListener.off();
    };
  }, [triggerTarget, disabled, onRootClose, handleDocumentMouseDown]);
}

export default useRootClose;

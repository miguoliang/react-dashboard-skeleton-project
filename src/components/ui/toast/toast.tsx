import {
  toastDefaultProps,
  ToastWrapperInstance,
  ToastWrapperProps,
} from "./ToastWrapper";
import { Placement } from "../utils/constant";
import { ReactNode, RefObject } from "react";

const defaultWrapperId = "default";
const wrappers = new Map();

function castPlacement(placement?: Placement): Placement | undefined {
  if (placement) {
    if (/top\b/.test(placement)) {
      return "top-full";
    } else if (/bottom\b/.test(placement)) {
      return "bottom-full";
    }
  }
}

async function createWrapper(wrapperId: string, props: ToastWrapperProps) {
  const [wrapper] = await ToastWrapperInstance(props);

  wrappers.set(wrapperId || defaultWrapperId, wrapper);

  return wrapper;
}

function getWrapper(wrapperId: string) {
  if (wrappers.size === 0) {
    return null;
  }
  return wrappers.get(wrapperId || defaultWrapperId);
}

const toast = (message: string) => toast.push(message);

toast.push = (message: ReactNode, options = toastDefaultProps) => {
  let id = options.placement ?? "top-full";
  if (options.block) {
    id = castPlacement(options.placement) ?? "top-full";
  }

  const wrapper = getWrapper(id);

  if (wrapper?.current) {
    return wrapper.current.push(message);
  }

  return createWrapper(id, options).then((ref: RefObject<any>) => {
    return ref.current?.push(message);
  });
};

toast.remove = (key: string) => {
  wrappers.forEach((elm) => elm.current.remove(key));
};

toast.removeAll = () => {
  wrappers.forEach((elm) => elm.current.removeAll());
};

export default toast;

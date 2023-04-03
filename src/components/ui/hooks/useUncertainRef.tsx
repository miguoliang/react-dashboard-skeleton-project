import { ForwardedRef, useRef } from "react";

export default function useUncertainRef<T>(ref?: ForwardedRef<T>) {
  return ref ?? useRef<T>();
}

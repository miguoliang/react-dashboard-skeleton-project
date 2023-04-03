import { useCallback, useEffect, useRef } from "react";
import { FunctionType } from "../../../constants/types";

function useTimeout(fn?: FunctionType, ms = 0, open = true) {
  const timeout = useRef<any>();

  const clear = useCallback(() => {
    timeout.current && clearTimeout(timeout.current);
  }, []);

  const set = useCallback(() => {
    timeout.current = open ? setTimeout(() => fn?.(), ms) : 0;
  }, [ms, fn, open]);

  useEffect(() => {
    set();
    return clear;
  }, [fn, ms, open, clear, set]);

  return { clear, reset: set };
}

export default useTimeout;

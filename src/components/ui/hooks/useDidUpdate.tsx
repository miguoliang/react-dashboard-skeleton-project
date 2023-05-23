import { useEffect, useRef } from "react";
import { FunctionType } from "../../../constants/types";

export default function useDidUpdate(
  callback: FunctionType,
  dependencies: any[],
) {
  const mounted = useRef(false);

  useEffect(
    () => () => {
      mounted.current = false;
    },
    [],
  );

  useEffect(() => {
    if (mounted.current) {
      return callback();
    }

    mounted.current = true;
    return undefined;
  }, dependencies);
}

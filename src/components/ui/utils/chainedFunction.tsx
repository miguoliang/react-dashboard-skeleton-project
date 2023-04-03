import { FunctionType } from "constants/types";
import { flow } from "lodash";

export default function chainedFunction(
  ...funcs: Array<FunctionType | null | undefined>
): FunctionType | undefined {
  return funcs
    .filter((f): f is FunctionType => f !== null && f !== undefined)
    .reduce((acc: FunctionType | undefined, f: FunctionType): FunctionType => {
      if (typeof f !== "function") {
        throw new Error("Argument only accept functions, undefined, or null.");
      }

      if (acc === undefined) {
        return f;
      }

      return flow(acc, f);
    }, undefined);
}

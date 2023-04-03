import { createContext, useContext } from "react";
import { Size } from "../utils/constant";

const SegmentContext = createContext<{
  size?: Size;
  value?: string[];
  onActive?: (value: string[]) => void;
  onDeactivate?: (value: string) => void;
  selectionType?: "single" | "multiple";
}>({});

export const SegmentContextProvider = SegmentContext.Provider;

export const SegmentContextConsumer = SegmentContext.Consumer;

export function useSegment() {
  return useContext(SegmentContext);
}

export default SegmentContext;

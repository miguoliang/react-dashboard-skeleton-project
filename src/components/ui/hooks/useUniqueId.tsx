import { useRef } from "react";
import uniqueId from "lodash/uniqueId";
import createUID from "../utils/createUid";

export default function useUniqueId(prefix: string, len?: number) {
  const idRef = useRef<string>();

  if (!idRef.current) {
    idRef.current = `${uniqueId(prefix)}-${createUID(len ?? 5)}`;
  }

  return idRef.current;
}

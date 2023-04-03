import { useEffect } from "react";
import { setDirection } from "store/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { TextDirection } from "../../components/ui/utils/constant";

function useDirection() {
  const direction = useAppSelector((state) => state.theme.direction);

  const dispatch = useAppDispatch();
  const updateDirection = (dir: TextDirection) => dispatch(setDirection(dir));

  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute("dir", direction);
  }, [direction]);

  return [direction, updateDirection];
}

export default useDirection;

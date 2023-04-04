import React, { LazyExoticComponent, useCallback, useEffect } from "react";
import { setLayout, setPreviousLayout } from "store/theme/themeSlice";
import { setCurrentRouteKey } from "store/base/commonSlice";
import { useLocation } from "react-router-dom";
import { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "store/hooks";

type AppRouteProps = {
  component: LazyExoticComponent<(props: Record<string, any>) => JSX.Element>;
  routeKey: string;
} & Record<string, any>;

const AppRoute = ({
  component: Component,
  routeKey,
  ...props
}: AppRouteProps) => {
  const location = useLocation();

  const dispatch = useAppDispatch();

  const layoutType = useAppSelector(
    (state: RootState) => state.theme.layout.type
  );
  const previousLayout = useAppSelector(
    (state: RootState) => state.theme.layout.previousType
  );

  const handleLayoutChange = useCallback(() => {
    dispatch(setCurrentRouteKey(routeKey));
    if (props.layout && props.layout !== layoutType) {
      dispatch(setPreviousLayout(layoutType));
      dispatch(setLayout(props.layout));
    }

    if (!props.layout && previousLayout && layoutType !== previousLayout) {
      dispatch(setLayout(layoutType));
      dispatch(setPreviousLayout(previousLayout));
    }
  }, [dispatch, layoutType, previousLayout, props.layout, routeKey]);

  useEffect(() => {
    handleLayoutChange();
  }, [location, handleLayoutChange]);

  return <Component {...props} />;
};

export default AppRoute;

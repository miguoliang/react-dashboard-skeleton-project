import { combineReducers } from "redux";
import theme from "./theme/themeSlice";
import locale from "./locale/localeSlice";
import base from "./base";

const rootReducer = combineReducers({
  theme,
  base,
  locale,
});

export default rootReducer;

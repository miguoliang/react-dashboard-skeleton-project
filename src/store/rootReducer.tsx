import { combineReducers } from "redux";
import theme from "./theme/themeSlice";
import locale from "./locale/localeSlice";
import auth from "./auth";
import base from "./base";

const rootReducer = combineReducers({
  theme,
  auth,
  base,
  locale,
});

export default rootReducer;

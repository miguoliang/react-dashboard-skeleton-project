import rootReducer from "./rootReducer";
import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import theme from "./theme/themeSlice";
import auth from "./auth";
import base from "./base";
import locale from "./locale/localeSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import { PERSIST_STORE_NAME } from "constants/app.constant";

const persistConfig = {
  key: PERSIST_STORE_NAME,
  keyPrefix: "",
  storage,
  whitelist: ["auth"],
};

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat([]),
  devTools: import.meta.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

const asyncReducers: { [key: string]: Reducer } = {};

export function injectReducer(key: string, reducer: Reducer) {
  asyncReducers[key] = reducer;
  store.replaceReducer(
    persistReducer(
      persistConfig,
      combineReducers({
        theme,
        auth,
        base,
        locale,
        ...asyncReducers,
      }),
    ),
  );
  persistor.persist();
}

export default store;

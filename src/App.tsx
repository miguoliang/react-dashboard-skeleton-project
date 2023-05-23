import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store, { persistor } from "./store";
import Layout from "./components/layout";
import mockServer from "./mock";
import appConfig from "./configs/app.config";
import "./locales";
import Theme from "./components/template/Theme";
import { PersistGate } from "redux-persist/integration/react";
import { AuthProvider } from "react-oidc-context";
import { oidcConfig } from "./configs/oidc.config";

const environment = import.meta.env.NODE_ENV;

/**
 * Set enableMock(Default false) to true at configs/app.config.js
 * If you wish to enable mock api
 */
if (environment !== "production" && appConfig.enableMock) {
  mockServer({ environment });
}

function App() {
  return (
    <AuthProvider {...oidcConfig}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Theme>
              <Layout />
            </Theme>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </AuthProvider>
  );
}

export default App;
